import { AnalyticsTypes } from "../features/tasks/types";

import { AnalyticsCard } from "./analytics-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AnalyticsProps {
  data: AnalyticsTypes | undefined;
}

export const Analytics = ({ data }: AnalyticsProps) => {
  return (
    data && (
      <ScrollArea className="w-full whitespace-nowrap border-none shirink-0">
        <div className="w-full flex felx-row">
          <div className="flex items-center flex-1">
            <AnalyticsCard
              title="Total Tasks"
              value={data.thisMonthTaskCount}
              variant={
                data.thisMonthMinusLastMonth >= 1
                  ? "up"
                  : data.thisMonthMinusLastMonth < 0
                  ? "down"
                  : ""
              }
              increaseValue={data.thisMonthMinusLastMonth}
            />
          </div>
          {/**
           *   <div className="flex items-center flex-1">
            <AnalyticsCard
              title="Assigned Tasks"
              value={data.thisMonthAssignedCount}
              variant={
                data.thisMonthMinusLastMonthAssigned >= 1
                  ? "up"
                  : data.thisMonthMinusLastMonthAssigned < 0
                  ? "down"
                  : ""
              }
              increaseValue={data.thisMonthMinusLastMonthAssigned}
            />
          </div>*/}
          <div className="flex items-center flex-1">
            <AnalyticsCard
              title="Completed Tasks"
              value={data.thisMonthCompletedCount}
              variant={
                data.thisMonthMinusLastMonthCompleted >= 1
                  ? "up"
                  : data.thisMonthMinusLastMonthCompleted < 0
                  ? "down"
                  : ""
              }
              increaseValue={data.thisMonthMinusLastMonthCompleted}
            />
          </div>
          <div className="flex items-center flex-1">
            <AnalyticsCard
              title="OverDue Tasks"
              value={data.thisMonthOverdueCount}
              variant={
                data.thisMonthMinusLastMonthOverdue >= 1
                  ? "up"
                  : data.thisMonthMinusLastMonthOverdue < 0
                  ? "down"
                  : ""
              }
              increaseValue={data.thisMonthMinusLastMonthOverdue}
            />
          </div>
          <div className="flex items-center flex-1">
            <AnalyticsCard
              title="Incompleted Tasks"
              value={data.thisMontIncompletedCount}
              variant={
                data.thisMonthMinusLastMonthIncompleted >= 1
                  ? "up"
                  : data.thisMonthMinusLastMonthIncompleted < 0
                  ? "down"
                  : ""
              }
              increaseValue={data.thisMonthMinusLastMonthIncompleted}
            />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    )
  );
};
