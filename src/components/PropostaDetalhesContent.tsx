
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PropostaDetalhesContent() {
  const { numero } = useParams();
  const navigate = useNavigate();
  
  // Estados para controlar as seções expandíveis
  const [expandedSections, setExpandedSections] = useState({
    valoresOperacao: false,
    ajudaAnalista: false,
    itensAnalise: false,
    propostasAnteriores: false,
    complementoLoja: false,
    avalistas: false,
    veiculos: false,
    garantias: false,
    assinantes: false,
    dadosCliente: false,
    endereco: false,
    referenciasBancarias: false,
    contaPagamento: false,
    outrosPagamentos: false,
    documentosCliente: false,
    documentosProposta: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDownloadDocument = (documentName: string) => {
    // Implementar lógica de download
    console.log(`Baixando documento: ${documentName}`);
  };

  const handleVoltar = () => {
    navigate('/propostas');
  };

  // Dados mockados para exemplo
  const propostaData = {
    numero: numero || "056939510",
    status: "Aprovada",
    tarifaCadastro: "R$ 0,00",
    iof: "R$ 7,53",
    valorDivida: "R$ 807,53",
    campoAuxiliar1: "Valor 1",
    campoAuxiliar3: "Valor 3",
    tipoOperacao: "Financiamento",
    modelo: "PRICE",
    taxaMensal: "7,90000",
    taxaAnual: "149,03",
    fluxo: "Regular",
    valorSolicitado: "R$ 800,00",
    vendedor: "Integração Banqi",
    numParcelas: "5",
    primeiroVencimento: "15/05/25",
    parceiro: "BANQI",
    valorAprovado: "R$ 800,00",
    cetAnual: "166,16",
    tipoContrato: "CPD - CP DIGITAL",
    valorParcela: "R$ 190,92",
    valorTotalCredito: "R$ 807,53",
    campoAuxiliar2: "Valor 2",
    campoAuxiliar4: "Valor 4"
  };

  const documentosCliente = [
    { tipo: "RG", nome: "rg_frente.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "CPF", nome: "cpf.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "Comprovante de Renda", nome: "comprovante_renda.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" }
  ];

  const documentosProposta = [
    { tipo: "CCB", nome: "ccb_assinada.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "Contrato", nome: "contrato_financiamento.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" }
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <Button 
              variant="outline" 
              onClick={handleVoltar}
              className="border-slate-300 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Proposta #{propostaData.numero}
              </h1>
              <p className="text-sm text-slate-600">Detalhes completos da proposta contratada</p>
            </div>
          </div>
          <Badge className="bg-green-50 text-green-700 border-green-200 text-sm px-3 py-1">
            {propostaData.status}
          </Badge>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Informações Principais */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
            <CardTitle className="text-slate-900">Informações Principais</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Número da Proposta</label>
                  <p className="text-slate-900 font-medium">#{propostaData.numero}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Tarifa Cadastro / IOF</label>
                  <p className="text-slate-900">{propostaData.tarifaCadastro} / {propostaData.iof}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Valor da Dívida</label>
                  <p className="text-slate-900 font-semibold">{propostaData.valorDivida}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Campo Auxiliar 1</label>
                  <p className="text-slate-900">{propostaData.campoAuxiliar1}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Campo Auxiliar 3</label>
                  <p className="text-slate-900">{propostaData.campoAuxiliar3}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Tipo de Operação / Modelo</label>
                  <p className="text-slate-900">{propostaData.tipoOperacao} / {propostaData.modelo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Taxa a.m. / a.a.</label>
                  <p className="text-slate-900">{propostaData.taxaMensal} / {propostaData.taxaAnual}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Fluxo</label>
                  <p className="text-slate-900">{propostaData.fluxo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Valor Solicitado</label>
                  <p className="text-slate-900 font-semibold">{propostaData.valorSolicitado}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Vendedor</label>
                  <p className="text-slate-900">{propostaData.vendedor}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Parcelas / Valor Solicitado</label>
                  <p className="text-slate-900">{propostaData.numParcelas}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">1º Vencimento</label>
                  <p className="text-slate-900">{propostaData.primeiroVencimento}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Parceiro/Correspondente</label>
                  <p className="text-slate-900">{propostaData.parceiro}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Valor Aprovado</label>
                  <p className="text-slate-900 font-semibold">{propostaData.valorAprovado}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">CET Anual</label>
                  <p className="text-slate-900">{propostaData.cetAnual}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seções Expandíveis */}
        <div className="space-y-4">
          {/* Documentos do Cliente */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.documentosCliente}
              onOpenChange={() => toggleSection('documentosCliente')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Documentos do Cliente</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.documentosCliente ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo do Documento</TableHead>
                        <TableHead>Nome do Documento</TableHead>
                        <TableHead>Data de Inclusão</TableHead>
                        <TableHead>Válido até</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documentosCliente.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{doc.tipo}</TableCell>
                          <TableCell>{doc.nome}</TableCell>
                          <TableCell>{doc.dataInclusao}</TableCell>
                          <TableCell>{doc.validoAte}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadDocument(doc.nome)}
                              className="border-slate-300 hover:bg-slate-50"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Documentos da Proposta */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.documentosProposta}
              onOpenChange={() => toggleSection('documentosProposta')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Documentos da Proposta</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.documentosProposta ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo do Documento</TableHead>
                        <TableHead>Nome do Documento</TableHead>
                        <TableHead>Data de Inclusão</TableHead>
                        <TableHead>Válido até</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documentosProposta.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{doc.tipo}</TableCell>
                          <TableCell>{doc.nome}</TableCell>
                          <TableCell>{doc.dataInclusao}</TableCell>
                          <TableCell>{doc.validoAte}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadDocument(doc.nome)}
                              className="border-slate-300 hover:bg-slate-50"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Valores da Operação */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.valoresOperacao}
              onOpenChange={() => toggleSection('valoresOperacao')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Valores da Operação</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.valoresOperacao ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Código Operação</label>
                      <p className="text-slate-900">12345</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Código Versão CCB</label>
                      <p className="text-slate-900">V1.0</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Tipo Índice Financeiro</label>
                      <p className="text-slate-900">CDI</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Outras Despesas</label>
                      <p className="text-slate-900">R$ 0,00</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Seguro</label>
                      <p className="text-slate-900">R$ 0,00</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Número CCB</label>
                      <p className="text-slate-900">CCB123456</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Dados do Cliente */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.dadosCliente}
              onOpenChange={() => toggleSection('dadosCliente')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Dados do Cliente</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.dadosCliente ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Nome</label>
                      <p className="text-slate-900">IZABELA MARIA PEREIRA DE AZEVEDO</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Documento Federal</label>
                      <p className="text-slate-900">077.445.417-23</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Data de Nascimento</label>
                      <p className="text-slate-900">15/03/1985</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">RG</label>
                      <p className="text-slate-900">12.345.678-9</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Sexo</label>
                      <p className="text-slate-900">Feminino</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">E-mail</label>
                      <p className="text-slate-900">izabela@email.com</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      </main>
    </div>
  );
}
