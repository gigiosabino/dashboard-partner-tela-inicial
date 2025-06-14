
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleStartDateChange = (date: Date | undefined) => {
    const newStartDate = date || null;
    setStartDate(newStartDate);
    onDateRangeChange(newStartDate, endDate);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    const newEndDate = date || null;
    setEndDate(newEndDate);
    onDateRangeChange(startDate, newEndDate);
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !startDate && !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && endDate ? (
              `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`
            ) : startDate ? (
              `${format(startDate, "dd/MM/yyyy")} - Selecione data final`
            ) : (
              "Selecionar período personalizado"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <div className="p-3">
              <p className="text-sm font-medium mb-2">Data inicial</p>
              <Calendar
                mode="single"
                selected={startDate || undefined}
                onSelect={handleStartDateChange}
                className={cn("p-3 pointer-events-auto")}
              />
            </div>
            <div className="p-3 border-l">
              <p className="text-sm font-medium mb-2">Data final</p>
              <Calendar
                mode="single"
                selected={endDate || undefined}
                onSelect={handleEndDateChange}
                disabled={(date) => startDate ? date < startDate : false}
                className={cn("p-3 pointer-events-auto")}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
