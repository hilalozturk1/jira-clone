import { Models } from "node-appwrite";

export enum TaskStatus {
  ALL = "ALL",
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  projectId: string;
  position: number;
  dueDate: string;
  description?: string;
};

export type AnalyticsTypes = {
  thisMonthTaskCount: any;
  thisMonthAssignedCount: any;
  thisMonthCompletedCount: any;
  thisMontIncompletedCount: any;
  thisMonthOverdueCount: any;
  thisMonthMinusLastMonth: any;
  thisMonthMinusLastMonthAssigned: any;
  thisMonthMinusLastMonthCompleted: any;
  thisMonthMinusLastMonthIncompleted: any;
  thisMonthMinusLastMonthOverdue: any;
} | undefined;
