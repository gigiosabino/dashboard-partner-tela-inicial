
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
    campoAuxiliar1: "Valor Campo 1",
    campoAuxiliar2: "Valor Campo 2",
    campoAuxiliar3: "Valor Campo 3",
    campoAuxiliar4: "Valor Campo 4",
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
    valorTotalCredito: "R$ 807,53"
  };

  const valoresOperacao = {
    codigoOperacao: "12345",
    codigoVersaoCCB: "V1.0",
    tipoIndiceFinan: "CDI",
    percIndiceFinan: "100%",
    percIOFAdicional: "0,38%",
    dtPrimeiroVencto: "15/05/25",
    vlrOutrasDespesas: "R$ 0,00",
    vlrOutrosServicos: "R$ 0,00",
    vlrSeguro: "R$ 0,00",
    vlrCorban: "R$ 0,00",
    vlrAvaliacao: "R$ 0,00",
    vlrDespachante: "R$ 0,00",
    vlrRegistro: "R$ 0,00",
    vlrServTerceiro: "R$ 0,00",
    vlrRegistroCartorio: "R$ 0,00",
    vlrBlindagem: "R$ 0,00",
    vlrAcessorios: "R$ 0,00",
    vlrVistoria: "R$ 0,00",
    vlrCertiDocs: "R$ 0,00",
    tipoProcesso: "Automatico",
    numeroCCB: "CCB123456"
  };

  const itensAnalise = [
    { resolvido: true, descricao: "Verificação de renda", conferido: true, status: "Aprovado", alerta: "Nenhum", automacao: "Sim" },
    { resolvido: true, descricao: "Validação de documentos", conferido: true, status: "Aprovado", alerta: "Nenhum", automacao: "Sim" }
  ];

  const propostasAnteriores = [
    { numero: "056939509", dataCriacao: "01/06/2025", produto: "Crédito Pessoal", valorSolicitado: "R$ 5.000,00", situacao: "Finalizada" },
    { numero: "056939508", dataCriacao: "15/05/2025", produto: "Financiamento", valorSolicitado: "R$ 3.000,00", situacao: "Cancelada" }
  ];

  const assinantes = [
    { nome: "IZABELA MARIA PEREIRA DE AZEVEDO", email: "izabela@email.com", documento: "077.445.417-23", celular: "(11) 99999-9999", identificador: "ID123" }
  ];

  const dadosCliente = {
    nome: "IZABELA MARIA PEREIRA DE AZEVEDO",
    documentoFederal: "077.445.417-23",
    dataNascimento: "15/03/1985",
    rg: "12.345.678-9",
    sexo: "Feminino",
    escolaridade: "Superior Completo",
    nomeMae: "MARIA PEREIRA DE AZEVEDO",
    estadoCivil: "Solteira",
    nacionalidade: "Brasileira",
    email: "izabela@email.com",
    telefoneCelular: "(11) 99999-9999"
  };

  const enderecos = [
    {
      logradouro: "Rua das Flores, 123",
      cep: "01234-567",
      alteradoEm: "05/06/2025",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP",
      desde: "01/01/2020",
      tipoEndereco: "Residencial",
      enderecoPrincipal: true,
      enderecoCorrespondencia: true
    }
  ];

  const referenciasBancarias = [
    {
      banco: "Banco do Brasil",
      agenciaConta: "1234-5 / 12345-6",
      alteradoEm: "05/06/2025",
      contaPagamento: true,
      tipoConta: "Conta Corrente"
    }
  ];

  const contaPagamento = {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    contaCorrente: "12345-6",
    tipoConta: "Conta Corrente"
  };

  const outrosPagamentos = [
    {
      campoId: "SPLIT001",
      previsaoPagamento: "15/06/2025",
      situacao: "Pendente",
      valor: "R$ 100,00",
      banco: "Itaú",
      agencia: "5678",
      conta: "98765",
      digitoConta: "4",
      favorecido: "EMPRESA XYZ LTDA",
      codigoBarras: "12345678901234567890123456789012345678901234"
    }
  ];

  const documentosCliente = [
    { tipo: "RG", nome: "rg_frente.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "CPF", nome: "cpf.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "Comprovante de Renda", nome: "comprovante_renda.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "Comprovante de Residência", nome: "comprovante_residencia.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" }
  ];

  const documentosProposta = [
    { tipo: "CCB", nome: "ccb_assinada.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "Contrato", nome: "contrato_financiamento.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" },
    { tipo: "Termo de Aceite", nome: "termo_aceite.pdf", dataInclusao: "05/06/2025", validoAte: "05/06/2026" }
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
                <div>
                  <label className="text-sm font-medium text-slate-600">Tipo de Contrato</label>
                  <p className="text-slate-900">{propostaData.tipoContrato}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Parcelas / Valor Aprovado</label>
                  <p className="text-slate-900">{propostaData.numParcelas} {propostaData.valorParcela}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Valor Total do Crédito</label>
                  <p className="text-slate-900 font-semibold">{propostaData.valorTotalCredito}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Campo Auxiliar 2</label>
                  <p className="text-slate-900">{propostaData.campoAuxiliar2}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Campo Auxiliar 4</label>
                  <p className="text-slate-900">{propostaData.campoAuxiliar4}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seções Expandíveis */}
        <div className="space-y-4">
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
                      <p className="text-slate-900">{valoresOperacao.codigoOperacao}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Código Versão CCB</label>
                      <p className="text-slate-900">{valoresOperacao.codigoVersaoCCB}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Tipo Índice Financeiro</label>
                      <p className="text-slate-900">{valoresOperacao.tipoIndiceFinan}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Perc Índice Financeiro</label>
                      <p className="text-slate-900">{valoresOperacao.percIndiceFinan}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Perc IOF Adicional</label>
                      <p className="text-slate-900">{valoresOperacao.percIOFAdicional}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Data Primeiro Vencimento</label>
                      <p className="text-slate-900">{valoresOperacao.dtPrimeiroVencto}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Outras Despesas</label>
                      <p className="text-slate-900">{valoresOperacao.vlrOutrasDespesas}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Outros Serviços</label>
                      <p className="text-slate-900">{valoresOperacao.vlrOutrosServicos}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Seguro</label>
                      <p className="text-slate-900">{valoresOperacao.vlrSeguro}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Corban</label>
                      <p className="text-slate-900">{valoresOperacao.vlrCorban}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Avaliação</label>
                      <p className="text-slate-900">{valoresOperacao.vlrAvaliacao}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Despachante</label>
                      <p className="text-slate-900">{valoresOperacao.vlrDespachante}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Registro</label>
                      <p className="text-slate-900">{valoresOperacao.vlrRegistro}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Serviço Terceiro</label>
                      <p className="text-slate-900">{valoresOperacao.vlrServTerceiro}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Registro Cartório</label>
                      <p className="text-slate-900">{valoresOperacao.vlrRegistroCartorio}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Blindagem</label>
                      <p className="text-slate-900">{valoresOperacao.vlrBlindagem}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Acessórios</label>
                      <p className="text-slate-900">{valoresOperacao.vlrAcessorios}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Vistoria</label>
                      <p className="text-slate-900">{valoresOperacao.vlrVistoria}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Valor Certificação Documentos</label>
                      <p className="text-slate-900">{valoresOperacao.vlrCertiDocs}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Tipo Processo</label>
                      <p className="text-slate-900">{valoresOperacao.tipoProcesso}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Número CCB</label>
                      <p className="text-slate-900">{valoresOperacao.numeroCCB}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Ajuda Analista */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.ajudaAnalista}
              onOpenChange={() => toggleSection('ajudaAnalista')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Ajuda Analista</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.ajudaAnalista ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-slate-600">Campo de texto preenchido pelo analista:</label>
                    <p className="text-slate-900 mt-2">Cliente aprovado após análise completa dos documentos e verificação de renda. Todos os requisitos foram atendidos.</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Itens da Análise */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.itensAnalise}
              onOpenChange={() => toggleSection('itensAnalise')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Itens da Análise (Resolvido: 2 de 2) ✔</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.itensAnalise ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resolvido?</TableHead>
                        <TableHead>Descrição Script</TableHead>
                        <TableHead>Conferido?</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Alerta</TableHead>
                        <TableHead>Automação</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itensAnalise.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge variant={item.resolvido ? "default" : "destructive"}>
                              {item.resolvido ? "Sim" : "Não"}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell>
                            <Badge variant={item.conferido ? "default" : "secondary"}>
                              {item.conferido ? "Sim" : "Não"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-50 text-green-700 border-green-200">
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.alerta}</TableCell>
                          <TableCell>{item.automacao}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="border-slate-300 hover:bg-slate-50">
                              Editar
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

          {/* Propostas Anteriores */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.propostasAnteriores}
              onOpenChange={() => toggleSection('propostasAnteriores')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Propostas Anteriores</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.propostasAnteriores ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número da Proposta</TableHead>
                        <TableHead>Data de Criação</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead>Valor Solicitado</TableHead>
                        <TableHead>Situação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {propostasAnteriores.map((proposta, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">#{proposta.numero}</TableCell>
                          <TableCell>{proposta.dataCriacao}</TableCell>
                          <TableCell>{proposta.produto}</TableCell>
                          <TableCell>{proposta.valorSolicitado}</TableCell>
                          <TableCell>
                            <Badge variant={proposta.situacao === "Finalizada" ? "default" : "destructive"}>
                              {proposta.situacao}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Complemento Loja */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.complementoLoja}
              onOpenChange={() => toggleSection('complementoLoja')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Complemento Loja</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.complementoLoja ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Código Operação</label>
                    <p className="text-slate-900">{valoresOperacao.codigoOperacao}</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Avalistas */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.avalistas}
              onOpenChange={() => toggleSection('avalistas')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Avalistas</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.avalistas ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-slate-600">Nenhum avalista cadastrado para esta proposta.</p>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Veículos */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.veiculos}
              onOpenChange={() => toggleSection('veiculos')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Veículos</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.veiculos ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-slate-600">Nenhum veículo cadastrado para esta proposta.</p>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Garantias */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.garantias}
              onOpenChange={() => toggleSection('garantias')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Garantias</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.garantias ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-slate-600">Nenhuma garantia cadastrada para esta proposta.</p>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Assinantes (CCB Digital) */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.assinantes}
              onOpenChange={() => toggleSection('assinantes')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Assinantes (CCB Digital)</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.assinantes ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Documento Federal</TableHead>
                        <TableHead>Celular</TableHead>
                        <TableHead>Identificador</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assinantes.map((assinante, index) => (
                        <TableRow key={index}>
                          <TableCell>{assinante.nome}</TableCell>
                          <TableCell>{assinante.email}</TableCell>
                          <TableCell>{assinante.documento}</TableCell>
                          <TableCell>{assinante.celular}</TableCell>
                          <TableCell>{assinante.identificador}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                      <p className="text-slate-900">{dadosCliente.nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Documento Federal</label>
                      <p className="text-slate-900">{dadosCliente.documentoFederal}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Data de Nascimento</label>
                      <p className="text-slate-900">{dadosCliente.dataNascimento}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">RG</label>
                      <p className="text-slate-900">{dadosCliente.rg}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Sexo</label>
                      <p className="text-slate-900">{dadosCliente.sexo}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Escolaridade</label>
                      <p className="text-slate-900">{dadosCliente.escolaridade}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Nome da Mãe</label>
                      <p className="text-slate-900">{dadosCliente.nomeMae}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Estado Civil</label>
                      <p className="text-slate-900">{dadosCliente.estadoCivil}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Nacionalidade</label>
                      <p className="text-slate-900">{dadosCliente.nacionalidade}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">E-mail</label>
                      <p className="text-slate-900">{dadosCliente.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Telefone Celular</label>
                      <p className="text-slate-900">{dadosCliente.telefoneCelular}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Endereço */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.endereco}
              onOpenChange={() => toggleSection('endereco')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Endereço</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.endereco ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {enderecos.map((endereco, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-slate-600">Logradouro</label>
                        <p className="text-slate-900">{endereco.logradouro}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">CEP</label>
                        <p className="text-slate-900">{endereco.cep}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Alterado em</label>
                        <p className="text-slate-900">{endereco.alteradoEm}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Bairro</label>
                        <p className="text-slate-900">{endereco.bairro}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Cidade</label>
                        <p className="text-slate-900">{endereco.cidade}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">UF</label>
                        <p className="text-slate-900">{endereco.uf}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Desde</label>
                        <p className="text-slate-900">{endereco.desde}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Tipo de Endereço</label>
                        <p className="text-slate-900">{endereco.tipoEndereco}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Endereço Principal?</label>
                        <Badge variant={endereco.enderecoPrincipal ? "default" : "secondary"}>
                          {endereco.enderecoPrincipal ? "Sim" : "Não"}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Endereço para Correspondência?</label>
                        <Badge variant={endereco.enderecoCorrespondencia ? "default" : "secondary"}>
                          {endereco.enderecoCorrespondencia ? "Sim" : "Não"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Referências Bancárias */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.referenciasBancarias}
              onOpenChange={() => toggleSection('referenciasBancarias')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Referências Bancárias</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.referenciasBancarias ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {referenciasBancarias.map((referencia, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-slate-600">Banco</label>
                        <p className="text-slate-900">{referencia.banco}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Agência/Conta</label>
                        <p className="text-slate-900">{referencia.agenciaConta}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Alterado em</label>
                        <p className="text-slate-900">{referencia.alteradoEm}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Conta Pagamento?</label>
                        <Badge variant={referencia.contaPagamento ? "default" : "secondary"}>
                          {referencia.contaPagamento ? "Sim" : "Não"}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Tipo de Conta</label>
                        <p className="text-slate-900">{referencia.tipoConta}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Conta de Pagamento da Proposta */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.contaPagamento}
              onOpenChange={() => toggleSection('contaPagamento')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Conta de Pagamento da Proposta</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.contaPagamento ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Banco</label>
                      <p className="text-slate-900">{contaPagamento.banco}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Agência (com dígito)</label>
                      <p className="text-slate-900">{contaPagamento.agencia}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Conta Corrente (com dígito)</label>
                      <p className="text-slate-900">{contaPagamento.contaCorrente}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Tipo de Conta</label>
                      <p className="text-slate-900">{contaPagamento.tipoConta}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Outros Pagamentos da Proposta (splits) */}
          <Card className="border-slate-200 shadow-sm">
            <Collapsible 
              open={expandedSections.outrosPagamentos}
              onOpenChange={() => toggleSection('outrosPagamentos')}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Outros Pagamentos da Proposta (splits)</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                      expandedSections.outrosPagamentos ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campo ID</TableHead>
                        <TableHead>Previsão de Pagamento</TableHead>
                        <TableHead>Situação</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Banco</TableHead>
                        <TableHead>Agência</TableHead>
                        <TableHead>Conta</TableHead>
                        <TableHead>Dígito da Conta</TableHead>
                        <TableHead>Favorecido</TableHead>
                        <TableHead>Código de Barras</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {outrosPagamentos.map((pagamento, index) => (
                        <TableRow key={index}>
                          <TableCell>{pagamento.campoId}</TableCell>
                          <TableCell>{pagamento.previsaoPagamento}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{pagamento.situacao}</Badge>
                          </TableCell>
                          <TableCell>{pagamento.valor}</TableCell>
                          <TableCell>{pagamento.banco}</TableCell>
                          <TableCell>{pagamento.agencia}</TableCell>
                          <TableCell>{pagamento.conta}</TableCell>
                          <TableCell>{pagamento.digitoConta}</TableCell>
                          <TableCell>{pagamento.favorecido}</TableCell>
                          <TableCell className="max-w-40 truncate">{pagamento.codigoBarras}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

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
        </div>
      </main>
    </div>
  );
}
