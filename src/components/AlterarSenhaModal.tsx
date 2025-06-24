
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AlterarSenhaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlterarSenhaModal({ open, onOpenChange }: AlterarSenhaModalProps) {
  const [novaSenha, setNovaSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showRepetirSenha, setShowRepetirSenha] = useState(false);
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    const errors = [];
    if (!/[a-z]/.test(password)) {
      errors.push("* Senha deve conter ao menos um caractere minúsculo.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("* Senha deve conter ao menos um caractere maiúsculo.");
    }
    if (!/\d/.test(password)) {
      errors.push("* Senha deve conter ao menos um número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("* Senha deve conter ao menos um caractere especial.");
    }
    if (password.length < 8 || password.length > 20) {
      errors.push("* Senha deve conter entre 8 e 20 caracteres.");
    }
    return errors;
  };

  const handleAtualizarSenha = () => {
    const errors = validatePassword(novaSenha);
    
    if (errors.length > 0) {
      toast({
        title: "Erro na validação",
        description: "Verifique os critérios da senha.",
        variant: "destructive",
      });
      return;
    }

    if (novaSenha !== repetirSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    // Simular atualização da senha
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi alterada com sucesso.",
    });
    
    setNovaSenha("");
    setRepetirSenha("");
    onOpenChange(false);
  };

  const passwordErrors = validatePassword(novaSenha);
  const hasErrors = passwordErrors.length > 0 && novaSenha.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Alterar Senha</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nova-senha">Nova senha</Label>
            <div className="relative">
              <Input
                id="nova-senha"
                type={showNovaSenha ? "text" : "password"}
                placeholder="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNovaSenha(!showNovaSenha)}
              >
                {showNovaSenha ? (
                  <EyeOff className="h-4 w-4 text-slate-400" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repetir-senha">Repetir senha</Label>
            <div className="relative">
              <Input
                id="repetir-senha"
                type={showRepetirSenha ? "text" : "password"}
                placeholder="Repetir senha"
                value={repetirSenha}
                onChange={(e) => setRepetirSenha(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowRepetirSenha(!showRepetirSenha)}
              >
                {showRepetirSenha ? (
                  <EyeOff className="h-4 w-4 text-slate-400" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleAtualizarSenha}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
          >
            ATUALIZAR SENHA
          </Button>

          {hasErrors && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-red-700 space-y-1">
                    {passwordErrors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
