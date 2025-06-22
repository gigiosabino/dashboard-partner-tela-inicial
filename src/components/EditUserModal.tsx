
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string | string[];
  status: string;
  ultimoAcesso: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  usuario: Usuario | null;
  onSave: (usuario: Usuario) => void;
}

const perfilOptions = ["Basic", "Manager", "Auditoria", "Import"];

export function EditUserModal({ isOpen, onClose, usuario, onSave }: EditUserModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfis, setPerfis] = useState<string[]>([]);

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      // Handle both string and array formats
      const userPerfis = Array.isArray(usuario.perfil) ? usuario.perfil : [usuario.perfil];
      setPerfis(userPerfis);
    }
  }, [usuario]);

  const handlePerfilChange = (perfil: string, checked: boolean) => {
    if (checked) {
      setPerfis(prev => [...prev, perfil]);
    } else {
      setPerfis(prev => prev.filter(p => p !== perfil));
    }
  };

  const handleSave = () => {
    if (usuario) {
      const updatedUsuario = {
        ...usuario,
        nome,
        email,
        perfil: perfis,
      };
      onSave(updatedUsuario);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setNome("");
    setEmail("");
    setPerfis([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do usuário"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Perfis</Label>
            <div className="space-y-2">
              {perfilOptions.map((perfil) => (
                <div key={perfil} className="flex items-center space-x-2">
                  <Checkbox
                    id={perfil}
                    checked={perfis.includes(perfil)}
                    onCheckedChange={(checked) => handlePerfilChange(perfil, checked as boolean)}
                  />
                  <Label htmlFor={perfil} className="text-sm font-normal">
                    {perfil}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
