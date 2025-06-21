
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandableSection } from "./ExpandableSection";
import { GridDataDisplay } from "./GridDataDisplay";
import { DocumentsTable } from "./DocumentsTable";
import { AnalysisItemsTable } from "./AnalysisItemsTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, FileText, DollarSign, Building, CreditCard, AlertCircle, Edit, Send, Users } from "lucide-react";

interface PropostaTabsContentProps {
  valoresOperacao: Record<string, string | number>;
  dadosCliente: Record<string, string | number>;
  enderecoCliente: Record<string, string | number>;
  referenciasBancarias: Record<string, string | number>;
  contaPagamento: Record<string, string | number>;
  itensAnalise: any[];
  propostasAnteriores: any[];
  assinantes: any[];
  outrosPagamentos: any[];
  documentosCliente: any[];
  documentosProposta: any[];
  onDownloadDocument: (documentName: string) => void;
}

export function PropostaTabsContent({
  valoresOperacao,
  dadosCliente,
  enderecoCliente,
  referenciasBancarias,
  contaPagamento,
  itensAnalise,
  propostasAnteriores,
  assinantes,
  outrosPagamentos,
  documentosCliente,
  documentosProposta,
  onDownloadDocument
}: PropostaTabsContentProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    operacao: false
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <Tabs defaultValue="operacao" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
        <TabsTrigger value="operacao" className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Operação
        </TabsTrigger>
        <TabsTrigger value="cliente" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Cliente
        </TabsTrigger>
        <TabsTrigger value="assinantes" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Assinantes
        </TabsTrigger>
        <TabsTrigger value="pagamentos" className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Pagamentos
        </TabsTrigger>
        <TabsTrigger value="documentos" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Documentos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="operacao" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Dados da Operação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GridDataDisplay data={valoresOperacao} columns={4} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="cliente" className="mt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GridDataDisplay data={dadosCliente} columns={1} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GridDataDisplay data={enderecoCliente} columns={1} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Referências Bancárias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GridDataDisplay data={referenciasBancarias} columns={3} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Itens da Análise (Resolvido: {itensAnalise.filter(item => item.resolvido).length} de {itensAnalise.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnalysisItemsTable items={itensAnalise} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Propostas Anteriores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Número da Proposta</TableHead>
                    <TableHead className="font-medium">Data de Criação</TableHead>
                    <TableHead className="font-medium">Produto</TableHead>
                    <TableHead className="font-medium">Valor Solicitado</TableHead>
                    <TableHead className="font-medium">Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propostasAnteriores.map((proposta, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">#{proposta.numero}</TableCell>
                      <TableCell>{proposta.dataCriacao}</TableCell>
                      <TableCell>{proposta.produto}</TableCell>
                      <TableCell>{proposta.valorSolicitado}</TableCell>
                      <TableCell>
                        <Badge variant={proposta.situacao === "Finalizada" ? "default" : "destructive"} className="rounded">
                          {proposta.situacao}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="assinantes" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Assinantes CCB Digital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Nome</TableHead>
                  <TableHead className="font-medium">E-mail</TableHead>
                  <TableHead className="font-medium">Documento</TableHead>
                  <TableHead className="font-medium">Celular</TableHead>
                  <TableHead className="font-medium">Identificador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assinantes.map((assinante, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{assinante.nome}</TableCell>
                    <TableCell>{assinante.email}</TableCell>
                    <TableCell>{assinante.documento}</TableCell>
                    <TableCell>{assinante.celular}</TableCell>
                    <TableCell>{assinante.identificador}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pagamentos" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Conta Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GridDataDisplay data={contaPagamento} columns={1} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Outros Métodos de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              {outrosPagamentos.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium">Tipo</TableHead>
                      <TableHead className="font-medium">Chave/Dados</TableHead>
                      <TableHead className="font-medium">Principal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outrosPagamentos.map((pagamento, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{pagamento.tipo}</TableCell>
                        <TableCell>{pagamento.chave || `${pagamento.banco} - ${pagamento.conta}`}</TableCell>
                        <TableCell>
                          <Badge variant={pagamento.principal === "Sim" ? "default" : "secondary"} className="rounded">
                            {pagamento.principal}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhum método adicional cadastrado</p>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="documentos" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos da Pessoa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentsTable documents={documentosCliente} onDownload={onDownloadDocument} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos da Proposta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentsTable documents={documentosProposta} onDownload={onDownloadDocument} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
