
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FiltersSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  proposalCount: number;
}

export function FiltersSection({ searchTerm, onSearchChange, proposalCount }: FiltersSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros por Período
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-96 bg-white p-4 border-slate-200 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-700">Data Inicial</label>
                  <Input type="date" className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-700">Data Final</label>
                  <Input type="date" className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600" />
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                    Limpar
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <span className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
            {proposalCount} proposta(s) encontrada(s)
          </span>
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Buscar por número da proposta, CPF ou nome" 
            className="pl-10 border-slate-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
