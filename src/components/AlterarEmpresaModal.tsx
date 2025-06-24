
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Empresa {
  id: string;
  nomeEmpresa: string;
  codigoParametro: string;
}

interface AlterarEmpresaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlterarEmpresaModal({ open, onOpenChange }: AlterarEmpresaModalProps) {
  const [empresaSelecionada, setEmpresaSelecionada] = useState("");
  const { toast } = useToast();

  // Dados simulados das empresas vinculadas ao usuário
  const empresas: Empresa[] = [
    {
      id: "1",
      nomeEmpresa: "BMP Tecnologia e Serviços LTDA",
      codigoParametro: "BMP_TECH_001"
    },
    {
      id: "2", 
      nomeEmpresa: "BMP Consultoria Empresarial LTDA",
      codigoParametro: "BMP_CONS_002"
    },
    {
      id: "3",
      nomeEmpresa: "BMP Soluções Financeiras LTDA", 
      codigoParametro: "BMP_FIN_003"
    },
    {
      id: "4",
      nomeEmpresa: "BMP Desenvolvimento de Software LTDA",
      codigoParametro: "BMP_DEV_004"
    },
    {
      id: "5",
      nomeEmpresa: "BMP Investimentos e Participações LTDA",
      codigoParametro: "BMP_INV_005"
    }
  ];

  const handleAlterarEmpresa = () => {
    if (!empresaSelecionada) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma empresa.",
        variant: "destructive",
      });
      return;
    }

    const empresa = empresas.find(e => e.id === empresaSelecionada);
    
    toast({
      title: "Empresa alterada",
      description: `Você foi direcionado para ${empresa?.nomeEmpresa}`,
    });
    
    // Aqui você faria a troca do contexto da empresa
    console.log("Alterando para empresa:", empresa);
    
    onOpenChange(false);
    setEmpresaSelecionada("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Alterar Empresa</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Selecione a empresa:</Label>
            
            <div className="max-h-80 overflow-y-auto">
              <RadioGroup value={empresaSelecionada} onValueChange={setEmpresaSelecionada}>
                {empresas.map((empresa) => (
                  <div key={empresa.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50">
                    <RadioGroupItem value={empresa.id} id={empresa.id} className="mt-1" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <Label 
                          htmlFor={empresa.id} 
                          className="text-sm font-medium cursor-pointer"
                        >
                          {empresa.nomeEmpresa}
                        </Label>
                      </div>
                      <p className="text-xs text-slate-600">{empresa.codigoParametro}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAlterarEmpresa}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Alterar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
