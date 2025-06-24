
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
import { X, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Empresa {
  id: string;
  cnpj: string;
  razaoSocial: string;
  ativa: boolean;
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
      cnpj: "12.345.678/0001-90",
      razaoSocial: "BMP Tecnologia e Serviços LTDA",
      ativa: true
    },
    {
      id: "2", 
      cnpj: "98.765.432/0001-10",
      razaoSocial: "BMP Consultoria Empresarial LTDA",
      ativa: true
    },
    {
      id: "3",
      cnpj: "11.222.333/0001-44",
      razaoSocial: "BMP Soluções Financeiras LTDA", 
      ativa: true
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
      description: `Você foi direcionado para ${empresa?.razaoSocial}`,
    });
    
    // Aqui você faria a troca do contexto da empresa
    console.log("Alterando para empresa:", empresa);
    
    onOpenChange(false);
    setEmpresaSelecionada("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium">Alterar Empresa</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Selecione a empresa:</Label>
            
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
                        {empresa.razaoSocial}
                      </Label>
                    </div>
                    <p className="text-xs text-slate-600">CNPJ: {empresa.cnpj}</p>
                    {empresa.ativa && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Ativa
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
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
