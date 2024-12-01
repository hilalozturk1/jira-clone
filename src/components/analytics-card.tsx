import { cn } from "@/lib/utils";

import { FaCaretDown, FaCaretUp, FaMinus } from "react-icons/fa";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface AnalyticsCardProps {
  title: string;
  value: number;
  variant: "up" | "down" | "";
  increaseValue: number;
}

export const AnalyticsCard = ({
  title,
  value,
  variant,
  increaseValue,
}: AnalyticsCardProps) => {
  const increaseValueColor =
    variant === "up"
      ? "text-green-300"
      : variant === "down"
      ? "text-red-400"
      : "";

  const Icon =
    variant === "up" ? FaCaretUp : variant === "down" ? FaCaretDown : FaMinus;

  return (
    <Card className="shadow-none border-r-2 border-y-0 border-l-0 w-full">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
            <span>{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            <Icon
              className={cn(
                increaseValueColor,
                increaseValue === 0 ? "size-3" : "size-4"
              )}
            />
            <span className={cn(increaseValueColor, "font-medium")}>
              {increaseValue !== 0 && increaseValue}
            </span>
          </div>
        </div>
        <CardTitle>This Month</CardTitle>
        {value}
      </CardHeader>
    </Card>
  );
};
