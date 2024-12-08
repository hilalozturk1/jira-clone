import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID, TASKS_ID } from "@/config";

import { createProjectSchema, updateProjectSchema } from "../schema";
import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { Project } from "../types";
import { TaskStatus } from "@/features/tasks/types";
import { toast } from "sonner";
import { responses } from "../../../../assets/responses";

type TResponse =
  | {
      total: number;
      documents: Project[];
    }
  | undefined;

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({
            projects: { total: 0, documents: [] },
            status: responses.general.zoderror.status,
            message: responses.general.zoderror.message,
          });
        }
      }
    ),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { workspaceId } = c.req.valid("query");

      if (!workspaceId) {
        return c.json({
          projects: { total: 0, documents: [] },
          status: responses.general.notfound.status,
          message: responses.general.notfound.message,
        });
      }

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({
          projects: { total: 0, documents: [] },
          status: responses.general.membernotfound.status,
          message: responses.general.membernotfound.message,
        });
      }

      let projects: TResponse;

      try {
        projects = await databases.listDocuments<Project>(
          DATABASE_ID,
          PROJECTS_ID,
          [
            Query.equal("workspaceId", workspaceId),
            Query.orderDesc("$createdAt"),
          ]
        );
      } catch (error: any) {
        return c.json({
          projects: projects,
          status:
            error === "Not Found"
              ? responses.general.notfound.status
              : error === "Internal Server Error"
              ? responses.general.servererror.status
              : error === "Bad Request"
              ? responses.general.badrequest.status
              : responses.projects.error.status,
          message:
            error === "Not Found"
              ? responses.general.notfound.message
              : error === "Internal Server Error"
              ? responses.general.servererror.message
              : error === "Bad Request"
              ? responses.general.badrequest.message
              : responses.projects.error.message,
        });
      }

      return c.json({
        projects: { total: projects.total, documents: projects.documents },
        status: responses.projects.success.status,
        message: responses.projects.success.message,
      });
    }
  )
  .get("/:projectId", sessionMiddleware, async (c, next) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const { projectId } = c.req.param();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    if (!project.workspaceId) {
      c.json({ error: "Missing workspaceId" }, 400);
    }

    /*    
    try {
      verifySession(c, next);
    } catch (e: unknown) {
      console.log('e :>> ', e);
      toast.error("error")
      throw new HTTPException(401, { message: "message", cause: e });
    }
*/
    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      toast.error("error");
      c.json({ error: "Unauthorized Member not found" }, 401);
    }

    return c.json({ data: project });
  })
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", createProjectSchema),
    async (c, next) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image, workspaceId } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        c.json({ error: "Unauthorized" });
      }

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const project = await databases.createDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          imageUrl: uploadedImageUrl,
          workspaceId,
        }
      );

      return c.json({ data: project });
    }
  )
  .patch(
    "/:projectId",
    sessionMiddleware,
    zValidator("form", updateProjectSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { projectId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const project = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      );

      const member = await getMember({
        databases,
        workspaceId: project.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      let uploadedImageUrl: string | undefined | null;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      } else if (image === undefined) {
        uploadedImageUrl = null;
      } else {
        uploadedImageUrl = image;
      }

      const updatedProject = await databases.updateDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId,
        {
          name,
          imageUrl: uploadedImageUrl,
        }
      );
      return c.json({ data: updatedProject });
    }
  )
  .delete("/:projectId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { projectId } = c.req.param();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      c.json({ error: "Unauthorized" });
    }

    await databases.deleteDocument(DATABASE_ID, PROJECTS_ID, projectId);

    return c.json({ data: { $id: projectId } });
  })
  .get("/:projectId/analytics", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const { projectId } = c.req.param();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    if (!project.workspaceId) {
      c.json({ error: "Missing workspaceId" }, 400);
    }

    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      c.json({ error: "Unauthorized" }, 401);
    }

    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    const thisMonthTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    );

    const lastMonthTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    );

    const taskCount = thisMonthTasks.total;
    const taskDifference = taskCount - lastMonthTasks.total;

    const thisMonthAssignedTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.equal("assigneeId", member?.$id ? member?.$id : ""),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    );

    const lastMonthAssignedTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.equal("assigneeId", member?.$id ? member?.$id : ""),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    );

    const assignedTaskCount = thisMonthAssignedTasks.total;
    const assignedTaskDifference =
      assignedTaskCount - lastMonthAssignedTasks.total;

    const thisMonthIncompleteTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.notEqual("status", TaskStatus.DONE),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    );

    const lastMonthIncompleteTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.notEqual("status", TaskStatus.DONE),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    );

    const incompleteTaskCount = thisMonthIncompleteTasks.total;
    const incompleteTaskDifference =
      incompleteTaskCount - lastMonthIncompleteTasks.total;

    const completedTaskCount =
      thisMonthTasks.total - thisMonthIncompleteTasks.total;
    const completedTaskDifference =
      completedTaskCount -
      (lastMonthTasks.total - lastMonthIncompleteTasks.total);

    const thisMonthOverdueTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.lessThan("dueDate", now.toISOString()),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    );

    const lastMonthOverdueTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("projectId", projectId),
        Query.lessThan("dueDate", now.toISOString()),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    );

    const overdueCount = thisMonthOverdueTasks.total;
    const overdueTaskDifference = overdueCount - lastMonthOverdueTasks.total;

    return c.json({
      data: {
        thisMonthTaskCount: taskCount,
        thisMonthAssignedCount: assignedTaskCount,
        thisMonthCompletedCount: completedTaskCount,
        thisMontIncompletedCount: incompleteTaskCount,
        thisMonthOverdueCount: overdueCount,
        thisMonthMinusLastMonth: taskDifference,
        thisMonthMinusLastMonthAssigned: assignedTaskDifference,
        thisMonthMinusLastMonthCompleted: completedTaskDifference,
        thisMonthMinusLastMonthIncompleted: incompleteTaskDifference,
        thisMonthMinusLastMonthOverdue: overdueTaskDifference,
      },
    });
  });

export default app;
