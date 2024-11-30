import { z } from "zod";

import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Required"),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  workspaceId: z.string(),
  projectId: z.string(),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  name: z.string().min(1, "Required").optional(),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }).optional(),
  workspaceId: z.string().optional(),
  projectId: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().trim().min(1, "Required").optional(),
  description: z.string().optional(),
});
