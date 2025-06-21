
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
import { User, FileText, DollarSign, Building, CreditCard, AlertCircle, Edit, Send } from "lucide-react";

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
    operacao: false,
    cliente1: false,
    assinantes: false,
    cliente2: false,
    cliente3: false,
    dadosPessoais: false,
    dadosBancarios: false,
    enderecos: false
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <Tabs defaultValue="dados-operacao" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
        <TabsTrigger value="dados-operacao" className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Operação
        </TabsTrigger>
        <TabsTrigger value="dados-cliente" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Cliente
        </TabsTrigger>
        <TabsTrigger value="pagamentos" className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Pagamentos
        </TabsTrigger>
        <TabsTrigger value="analise" className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Análise
        </TabsTrigger>
        <TabsTrigger value="documentos" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Documentos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dados-operacao" className="mt-6">
        <div className="space-y-4">
          {/* Seção Operação - Largura completa */}
          <ExpandableSection
            title="Operação"
            isOpen={expandedSections["operacao"]}
            onToggle={() => toggleSection("operacao")}
          >
            <div className="grid grid-cols-4 gap-6">
              {Object.entries(valoresOperacao).map(([key, value], index) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">{key}</label>
                  <p className="text-gray-900 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* 4 abas em linha */}
          <div className="grid grid-cols-4 gap-4">
            <ExpandableSection
              title="Cliente"
              isOpen={expandedSections["cliente1"]}
              onToggle={() => toggleSection("cliente1")}
            >
              <div className="space-y-4">
                <GridDataDisplay data={dadosCliente} columns={1} />
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Endereço</h4>
                  <GridDataDisplay data={enderecoCliente} columns={1} />
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Referências Bancárias</h4>
                  <GridDataDisplay data={referenciasBancarias} columns={1} />
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Itens da Análise</h4>
                  <AnalysisItemsTable items={itensAnalise} />
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Propostas Anteriores</h4>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-medium">Número</TableHead>
                        <TableHead className="font-medium">Data</TableHead>
                        <TableHead className="font-medium">Situação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {propostasAnteriores.map((proposta, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">#{proposta.numero}</TableCell>
                          <TableCell>{proposta.dataCriacao}</TableCell>
                          <TableCell>
                            <Badge variant={proposta.situacao === "Finalizada" ? "default" : "destructive"} className="rounded">
                              {proposta.situacao}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title="Assinantes"
              isOpen={expandedSections["assinantes"]}
              onToggle={() => toggleSection("assinantes")}
            >
              <div className="space-y-3">
                {assinantes.map((assinante, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div>
                          <label className="font-medium text-gray-600">Nome:</label>
                          <p className="text-gray-900">{assinante.nome}</p>
                        </div>
                        <div>
                          <label className="font-medium text-gray-600">Email:</label>
                          <p className="text-gray-900">{assinante.email}</p>
                        </div>
                        <div>
                          <label className="font-medium text-gray-600">Documento:</label>
                          <p className="text-gray-900">{assinante.documento}</p>
                        </div>
                        <div>
                          <label className="font-medium text-gray-600">Celular:</label>
                          <p className="text-gray-900">{assinante.celular}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Edit className="w-3 h-3" />
                          Editar
                        </Button>
                        <Button size="sm" variant="default" className="flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          Reenviar Link
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableSection>

            <ExpandableSection
              title="Cliente"
              isOpen={expandedSections["cliente2"]}
              onToggle={() => toggleSection("cliente2")}
            >
              <GridDataDisplay data={enderecoCliente} columns={1} />
            </ExpandableSection>

            <ExpandableSection
              title="Cliente"
              isOpen={expandedSections["cliente3"]}
              onToggle={() => toggleSection("cliente3")}
            >
              <GridDataDisplay data={referenciasBancarias} columns={1} />
            </ExpandableSection>
          </div>

          {/* Seção Dados pessoais - Largura completa */}
          <ExpandableSection
            title="Dados pessoais"
            isOpen={expandedSections["dadosPessoais"]}
            onToggle={() => toggleSection("dadosPessoais")}
          >
            <div className="grid grid-cols-4 gap-6">
              {Object.entries(dadosCliente).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">{key}</label>
                  <p className="text-gray-900 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* 2 seções em linha - Dados bancários e Endereços */}
          <div className="grid grid-cols-2 gap-4">
            <ExpandableSection
              title="Dados bancários"
              isOpen={expandedSections["dadosBancarios"]}
              onToggle={() => toggleSection("dadosBancarios")}
            >
              <GridDataDisplay data={referenciasBancarias} columns={1} />
            </ExpandableSection>

            <ExpandableSection
              title="Endereços"
              isOpen={expandedSections["enderecos"]}
              onToggle={() => toggleSection("enderecos")}
            >
              <GridDataDisplay data={enderecoCliente} columns={1} />
            </ExpandableSection>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="dados-cliente" className="mt-6">
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

        <Card className="mt-6">
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

      <TabsContent value="analise" className="mt-6">
        <div className="space-y-6">
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
