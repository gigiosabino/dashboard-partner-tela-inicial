
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonthYearPickerProps {
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const months = [
  { value: "01", label: "JANEIRO" },
  { value: "02", label: "FEVEREIRO" },
  { value: "03", label: "MARÇO" },
  { value: "04", label: "ABRIL" },
  { value: "05", label: "MAIO" },
  { value: "06", label: "JUNHO" },
  { value: "07", label: "JULHO" },
  { value: "08", label: "AGOSTO" },
  { value: "09", label: "SETEMBRO" },
  { value: "10", label: "OUTUBRO" },
  { value: "11", label: "NOVEMBRO" },
  { value: "12", label: "DEZEMBRO" }
];

export function MonthYearPicker({ value, onSelect, placeholder, disabled }: MonthYearPickerProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);

  const handleYearChange = (direction: 'prev' | 'next') => {
    setSelectedYear(prev => direction === 'prev' ? prev - 1 : prev + 1);
  };

  const handleMonthSelect = (monthValue: string) => {
    const value = `${selectedYear}-${monthValue}`;
    onSelect(value);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    const [year, month] = value.split('-');
    const monthObj = months.find(m => m.value === month);
    return `${monthObj?.label} ${year}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {getDisplayValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white border shadow-lg" align="start">
        <div className="p-4">
          {/* Year selector */}
          <div className="flex items-center justify-between mb-4 bg-gray-700 text-white p-2 rounded">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleYearChange('prev')}
              className="text-white hover:bg-gray-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold">{selectedYear}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleYearChange('next')}
              className="text-white hover:bg-gray-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1">
            {months.map((month) => (
              <Button
                key={month.value}
                variant="ghost"
                className="h-12 text-xs font-medium hover:bg-gray-100 border"
                onClick={() => handleMonthSelect(month.value)}
              >
                {month.label}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
