
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ClientesCadastradosContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data para clientes
  const clientes = [
    {
      id: "1",
      documento: "327.937.152-04",
      nome: "JORGE LUIZ SARAIVA DA COSTA",
      dataNascimento: "15/03/1985",
      email: "jorge@email.com",
      telefone: "(11) 99999-9999"
    },
    {
      id: "2",
      documento: "422.817.188-59",
      nome: "TESTE LUCCA",
      dataNascimento: "22/08/1990",
      email: "teste@email.com",
      telefone: "(11) 98888-8888"
    },
    {
      id: "3",
      documento: "123.456.789-10",
      nome: "MARIA SILVA SANTOS",
      dataNascimento: "10/12/1988",
      email: "maria@email.com",
      telefone: "(11) 97777-7777"
    }
  ];

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (clienteId: string) => {
    navigate(`/clientes-cadastrados/${clienteId}`);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes Cadastrados</h1>
            <p className="text-gray-600">Gerencie os clientes cadastrados no sistema</p>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os clientes cadastrados
            </CardDescription>
            <div className="flex items-center space-x-2 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, documento ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento Federal</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone Celular</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="font-medium">{cliente.documento}</TableCell>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{cliente.dataNascimento}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleViewDetails(cliente.id)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                      >
                        <Eye className="h-4 w-4" />
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredClientes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum cliente encontrado com os critérios de busca.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
