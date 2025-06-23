
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, MapPin, Phone, Mail, Calendar, FileText, CreditCard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function ClienteDetalhesContent() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data para o cliente
  const cliente = {
    id: id,
    documento: "327.937.152-04",
    nome: "JORGE LUIZ SARAIVA DA COSTA",
    dataNascimento: "15/03/1985",
    email: "jorge@email.com",
    telefone: "(11) 99999-9999",
    endereco: {
      logradouro: "Rua das Flores, 123",
      complemento: "Apto 45",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP",
      cep: "01234-567"
    },
    status: "Ativo",
    dataInclusao: "10/01/2024",
    ultimaAtualizacao: "15/06/2024"
  };

  // Mock data para limites de crédito importados
  const limitesCredito = [
    {
      id: 1,
      tipoContrato: "CAPITAL DE GIRO",
      valorConcedido: "R$ 1.500,00",
      percentualJuros: "1,50%",
      prazoMinimo: "20",
      prazoMaximo: "60",
      tipoTarifa: "Valor fixo",
      tarifa: "R$ 500,00",
      parcelaMinima: "1",
      parcelaMaxima: "6",
      dataImportacao: "15/06/2024"
    },
    {
      id: 2,
      tipoContrato: "CREDIÁRIO",
      valorConcedido: "R$ 3.000,00",
      percentualJuros: "2,00%",
      prazoMinimo: "30",
      prazoMaximo: "90",
      tipoTarifa: "Porcentagem",
      tarifa: "3,50%",
      parcelaMinima: "2",
      parcelaMaxima: "12",
      dataImportacao: "10/06/2024"
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/clientes-cadastrados")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detalhes do Cliente</h1>
              <p className="text-gray-600">Informações completas do cliente selecionado</p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Editar Cliente
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
            <TabsTrigger value="limites">Limites de Crédito</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{cliente.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <FileText className="h-4 w-4" />
                      {cliente.documento}
                    </CardDescription>
                  </div>
                  <Badge variant={cliente.status === "Ativo" ? "default" : "secondary"}>
                    {cliente.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Data de Nascimento</p>
                      <p className="text-sm text-gray-600">{cliente.dataNascimento}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">E-mail</p>
                      <p className="text-sm text-gray-600">{cliente.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Telefone</p>
                      <p className="text-sm text-gray-600">{cliente.telefone}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <h3 className="font-semibold">Endereço</h3>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="text-sm">{cliente.endereco.logradouro}</p>
                    {cliente.endereco.complemento && (
                      <p className="text-sm text-gray-600">{cliente.endereco.complemento}</p>
                    )}
                    <p className="text-sm">
                      {cliente.endereco.bairro}, {cliente.endereco.cidade} - {cliente.endereco.uf}
                    </p>
                    <p className="text-sm text-gray-600">CEP: {cliente.endereco.cep}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Data de Inclusão</p>
                    <p className="text-gray-600">{cliente.dataInclusao}</p>
                  </div>
                  <div>
                    <p className="font-medium">Última Atualização</p>
                    <p className="text-gray-600">{cliente.ultimaAtualizacao}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Limites de Crédito Importados
                </CardTitle>
                <CardDescription>
                  Visualize os limites de crédito importados para este cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {limitesCredito.map((limite) => (
                  <Card key={limite.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="bg-blue-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-blue-700">
                          {limite.tipoContrato}
                        </CardTitle>
                        <Badge variant="outline">
                          Importado em {limite.dataImportacao}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Valor concedido:</label>
                          <p className="text-sm font-semibold text-green-600">{limite.valorConcedido}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Percentual de juros concedido:</label>
                          <p className="text-sm">{limite.percentualJuros}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Prazo mínimo para Vencimento (em dias):</label>
                          <p className="text-sm">{limite.prazoMinimo}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Prazo máximo para Vencimento (em dias):</label>
                          <p className="text-sm">{limite.prazoMaximo}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Tipo de Tarifa (TC):</label>
                          <p className="text-sm">{limite.tipoTarifa}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Tarifa (TC):</label>
                          <p className="text-sm">{limite.tarifa}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Parcela Mínima:</label>
                          <p className="text-sm">{limite.parcelaMinima}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Parcela Máxima:</label>
                          <p className="text-sm">{limite.parcelaMaxima}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {limitesCredito.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum limite de crédito importado para este cliente.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>
                  Acompanhe o histórico de atividades e alterações do cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>Histórico de atividades será implementado em breve.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
