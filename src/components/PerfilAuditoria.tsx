
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users } from "lucide-react";

interface UsuarioPerfil {
  id: string;
  nome: string;
  email: string;
  perfis: string[];
}

export function PerfilAuditoria() {
  // Mock de usuários com diferentes perfis
  const usuarios: UsuarioPerfil[] = [
    {
      id: "1",
      nome: "João Silva",
      email: "joao@empresa.com",
      perfis: ["Manager", "Auditoria"]
    },
    {
      id: "2", 
      nome: "Maria Santos",
      email: "maria@empresa.com",
      perfis: ["Manager"]
    },
    {
      id: "3",
      nome: "Pedro Costa",
      email: "pedro@empresa.com", 
      perfis: ["Basic"]
    }
  ];

  const getPerfilColor = (perfil: string) => {
    switch (perfil) {
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "Auditoria":
        return "bg-purple-100 text-purple-800";
      case "Basic":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Perfis de Acesso - Auditoria</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Regras do Perfil Auditoria:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Apenas usuários com perfil "Manager" podem ser vinculados ao perfil "Auditoria"</li>
              <li>• O menu "Relatórios de Serviços Integrados" é visível apenas para usuários com perfil "Auditoria"</li>
              <li>• Usuários "Manager" podem criar e editar usuários com perfis: Manager, Basic e Auditoria</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Usuários e Perfis</span>
            </h4>
            <div className="space-y-3">
              {usuarios.map((usuario) => (
                <div key={usuario.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{usuario.nome}</p>
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    {usuario.perfis.map((perfil) => (
                      <Badge key={perfil} className={getPerfilColor(perfil)}>
                        {perfil}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
