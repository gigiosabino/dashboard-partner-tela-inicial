import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandableSection } from "./ExpandableSection";
import { GridDataDisplay } from "./GridDataDisplay";
import { DocumentsTable } from "./DocumentsTable";
import { AnalysisItemsTable } from "./AnalysisItemsTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, FileText, DollarSign, Building, CreditCard, AlertCircle } from "lucide-react";

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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

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
          {/* Primeira linha - Operação completa */}
          <ExpandableSection
            title="Operação"
            isOpen={expandedSections["valores-operacao"]}
            onToggle={() => toggleSection("valores-operacao")}
          >
            <GridDataDisplay data={valoresOperacao} columns={2} />
          </ExpandableSection>

          {/* Segunda linha - 4 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ExpandableSection
              title="Cliente"
              isOpen={expandedSections["cliente-1"]}
              onToggle={() => toggleSection("cliente-1")}
            >
              <GridDataDisplay data={dadosCliente} columns={1} />
            </ExpandableSection>

            <ExpandableSection
              title="Assinantes"
              isOpen={expandedSections["assinantes"]}
              onToggle={() => toggleSection("assinantes")}
            >
              <div className="space-y-3">
                {assinantes.map((assinante, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Nome:</span>
                        <p className="text-gray-900">{assinante.nome}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900">{assinante.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Documento:</span>
                        <p className="text-gray-900">{assinante.documento}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Celular:</span>
                        <p className="text-gray-900">{assinante.celular}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableSection>

            <ExpandableSection
              title="Cliente"
              isOpen={expandedSections["cliente-2"]}
              onToggle={() => toggleSection("cliente-2")}
            >
              <GridDataDisplay data={enderecoCliente} columns={1} />
            </ExpandableSection>

            <ExpandableSection
              title="Cliente"
              isOpen={expandedSections["cliente-3"]}
              onToggle={() => toggleSection("cliente-3")}
            >
              <GridDataDisplay data={referenciasBancarias} columns={1} />
            </ExpandableSection>
          </div>

          {/* Terceira linha - 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ExpandableSection
              title="Dados pessoais"
              isOpen={expandedSections["dados-pessoais"]}
              onToggle={() => toggleSection("dados-pessoais")}
            >
              <GridDataDisplay data={dadosCliente} columns={1} />
            </ExpandableSection>

            <ExpandableSection
              title="Endereços"
              isOpen={expandedSections["enderecos"]}
              onToggle={() => toggleSection("enderecos")}
            >
              <GridDataDisplay data={enderecoCliente} columns={1} />
            </ExpandableSection>
          </div>

          {/* Quarta linha - 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ExpandableSection
              title="Dados bancários"
              isOpen={expandedSections["dados-bancarios"]}
              onToggle={() => toggleSection("dados-bancarios")}
            >
              <GridDataDisplay data={referenciasBancarias} columns={1} />
            </ExpandableSection>

            <ExpandableSection
              title="Ajuda Analista"
              isOpen={expandedSections["ajuda-analista"]}
              onToggle={() => toggleSection("ajuda-analista")}
            >
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="text-sm font-medium text-gray-600 block mb-2">Campo de texto preenchido pelo analista:</label>
                <p className="text-gray-900 leading-relaxed">Cliente aprovado após análise completa dos documentos e verificação de renda. Todos os requisitos foram atendidos.</p>
              </div>
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
                Assinantes CCB Digital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assinantes.map((assinante, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Nome:</span>
                        <p className="text-gray-900">{assinante.nome}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900">{assinante.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Documento:</span>
                        <p className="text-gray-900">{assinante.documento}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Celular:</span>
                        <p className="text-gray-900">{assinante.celular}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {outrosPagamentos.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Outros Métodos de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Tipo</TableHead>
                    <TableHead className="font-medium">Chave/Dados</TableHead>
                    <TableHead className="font-medium">Banco</TableHead>
                    <TableHead className="font-medium">Agência</TableHead>
                    <TableHead className="font-medium">Conta</TableHead>
                    <TableHead className="font-medium">Principal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outrosPagamentos.map((pagamento, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{pagamento.tipo}</TableCell>
                      <TableCell>{pagamento.chave || '-'}</TableCell>
                      <TableCell>{pagamento.banco || '-'}</TableCell>
                      <TableCell>{pagamento.agencia || '-'}</TableCell>
                      <TableCell>{pagamento.conta || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={pagamento.principal === "Sim" ? "default" : "secondary"} className="rounded">
                          {pagamento.principal}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
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
                Documentos do Cliente
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
