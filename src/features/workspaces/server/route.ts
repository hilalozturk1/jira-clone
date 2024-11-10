import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { createWorkSpaceSchema } from "../schemas";

import { ID } from "node-appwrite";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";


const app = new Hono().post(
  "/",
  zValidator("json", createWorkSpaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { name } = c.req.valid("json");
    const workspaces = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      {
        name,
      }
    );
    return c.json({ data: workspaces });
  }
);

export default app;
