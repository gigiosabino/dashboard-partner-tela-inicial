
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";

interface PropostaHeaderProps {
  numero: string;
  status: string;
  onVoltar: () => void;
}

export function PropostaHeader({ numero, status, onVoltar }: PropostaHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <Button 
            variant="outline" 
            onClick={onVoltar}
            className="border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Proposta #{numero}
            </h1>
            <p className="text-sm text-slate-600">Detalhes completos da proposta contratada</p>
          </div>
        </div>
        <Badge className="bg-green-50 text-green-700 border-green-200 text-sm px-3 py-1">
          {status}
        </Badge>
      </div>
    </header>
  );
}
