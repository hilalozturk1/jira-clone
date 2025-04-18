"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TaskStatus } from "../types";
import { updateTaskSchema } from "../schemas";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeftIcon, Loader } from "lucide-react";

import { useGetTask } from "../api/use-get-task";
import { useUpdateTask } from "../api/use-update-task";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";

import { useTaskId } from "@/features/workspaces/hooks/use-task-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/date-picker";
import { MemberAvatar } from "@/features/members/components/members-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

interface EditTaskFormProps {
  onCancel?: boolean;
}

const EditTaskForm = ({ onCancel }: EditTaskFormProps) => {
  const router = useRouter();

  const taskId = useTaskId();
  const workspaceId = useWorkspaceId();

  const [statusValue, setStatusValue] = useState("");
  const [projectIdValue, setProjectIdValue] = useState("");
  const [dueDateValue, setDueDateValue] = useState<Date>();

  const { data: taskData, isLoading: isLoadingTask } = useGetTask({ taskId });

  const { mutate: updateTask, isPending } = useUpdateTask();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });

  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(
      updateTaskSchema.omit({ workspaceId: true, description: true })
    ),
    defaultValues: {
      ...taskData?.task,
      dueDate: taskData?.task?.dueDate
        ? new Date(taskData?.task?.dueDate)
        : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof updateTaskSchema>) => {
    updateTask({
      form: {
        ...values,
        workspaceId,
        status: statusValue ? statusValue : taskData?.task.status,
        projectId: projectIdValue ? projectIdValue : taskData?.task.projectId,
        dueDate: dueDateValue ? dueDateValue : taskData?.task.dueDate,
      },
      param: { taskId: taskData?.task?.$id || "" },
    });
  };

  const projectOptions = projects?.projects && projects?.projects.documents.map((project) => ({
    id: project.$id,
    name: project?.name,
    imageUrl: project?.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingTask && isLoadingMembers && isLoadingProjects;

  if (isLoading || isPending) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    taskData?.task && (
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-semibold items-center">
            <Button
              size="md"
              variant="ghost"
              onClick={() =>
                router.push(
                  `/workspaces/${workspaceId}/projects/${taskData?.task?.projectId}`
                )
              }
            >
              <ArrowLeftIcon className="size-4 mr-2" />
              Back
            </Button>
            <span>Update task</span>
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <Separator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                          type="text"
                          placeholder="..."
                          defaultValue={taskData?.task?.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="dueDate"
                  control={form.control}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          className="bg-transparent"
                          placeholder="..."
                          value={
                            dueDateValue
                              ? dueDateValue
                              : new Date(taskData.task.dueDate)
                          }
                          onChange={(e) => {
                            setDueDateValue(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="assigneeId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AssigneeId</FormLabel>
                      <Select
                        defaultValue={taskData?.task?.assigneeId}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {memberOptions ? (
                            memberOptions.map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                <div>
                                  <MemberAvatar
                                    className="size-6"
                                    name={member.name}
                                  />
                                  {member.name}
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <div>Data doesn&apost;t exist.</div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="status"
                  control={form.control}
                  disabled={isPending}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={setStatusValue}
                        defaultValue={
                          !isLoadingTask && statusValue
                            ? statusValue
                            : taskData?.task?.status
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={TaskStatus.BACKLOG}>
                            Backlog
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_PROGRESS}>
                            In Progress
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_REVIEW}>
                            In Review
                          </SelectItem>
                          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="projectId"
                  control={form.control}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>ProjectId</FormLabel>
                      <Select
                        onValueChange={setProjectIdValue}
                        defaultValue={
                          projectIdValue
                            ? projectIdValue
                            : taskData?.task?.projectId
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select projectId" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectOptions ? (
                            projectOptions.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                <div>
                                  <WorkspaceAvatar
                                    className="size-6"
                                    imageClassName="h-6 w-6"
                                    name={project.name}
                                    image={project.imageUrl}
                                  />
                                  {project.name}
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <div>Data doesn&apost;t exist.</div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="pb-7">
                <Separator />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  className={cn(!onCancel && "invisible")}
                  size="md"
                  disabled={isPending}
                  onClick={
                    onCancel
                      ? () => {
                          router.push("/");
                        }
                      : () => {}
                  }
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" className="" size="md">
                  Update Task
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    )
  );
};

export default EditTaskForm;
