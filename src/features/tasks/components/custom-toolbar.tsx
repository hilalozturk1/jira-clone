import moment from "moment";

import { Button } from "@/components/ui/button";

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
  return (
    <div className="flex">
      <Button onClick={() => onNavigate("PREV")} variant="outline" size="icon">
        <ChevronLeftIcon className="size-4" />
      </Button>
      <Button
        onClick={() => onNavigate("TODAY")}
        variant="outline"
        className="lgw-full mx-2"
      >
        <CalendarIcon className="size-4" />
        {moment(date).format("LL")}
      </Button>
      <Button onClick={() => onNavigate("NEXT")} variant="outline" size="icon">
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export default CustomToolbar;
