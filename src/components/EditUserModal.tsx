
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  status: string;
  ultimoAcesso: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  usuario: Usuario | null;
  onSave: (usuario: Usuario) => void;
}

export function EditUserModal({ isOpen, onClose, usuario, onSave }: EditUserModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setPerfil(usuario.perfil);
    }
  }, [usuario]);

  const handleSave = () => {
    if (usuario) {
      const updatedUsuario = {
        ...usuario,
        nome,
        email,
        perfil,
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
    setPerfil("");
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
            <Label htmlFor="perfil">Perfil</Label>
            <Select value={perfil} onValueChange={setPerfil}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Auditoria">Auditoria</SelectItem>
                <SelectItem value="Import">Import</SelectItem>
              </SelectContent>
            </Select>
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
