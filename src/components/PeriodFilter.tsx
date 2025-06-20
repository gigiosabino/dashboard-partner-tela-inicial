
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { DateRangePicker } from "./DateRangePicker";

interface PeriodFilterProps {
  onPeriodChange: (period: string) => void;
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  selectedPeriod: string;
}

export function PeriodFilter({ onPeriodChange, onDateRangeChange, selectedPeriod }: PeriodFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-600" />
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-30-days">Últimos 30 dias</SelectItem>
            <SelectItem value="last-3-months">Últimos 3 meses</SelectItem>
            <SelectItem value="last-6-months">Últimos 6 meses</SelectItem>
            <SelectItem value="last-12-months">Últimos 12 meses</SelectItem>
            <SelectItem value="current-year">Ano atual</SelectItem>
            <SelectItem value="previous-year">Ano anterior</SelectItem>
            <SelectItem value="custom">Período personalizado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {selectedPeriod === "custom" && (
        <DateRangePicker onDateRangeChange={onDateRangeChange} />
      )}
    </div>
  );
}
