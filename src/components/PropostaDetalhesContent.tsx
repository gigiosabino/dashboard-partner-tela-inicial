
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PropostaHeader } from "./proposta-detalhes/PropostaHeader";
import { ExpandableSection } from "./proposta-detalhes/ExpandableSection";
import { GridDataDisplay } from "./proposta-detalhes/GridDataDisplay";
import { DocumentsTable } from "./proposta-detalhes/DocumentsTable";
import { AnalysisItemsTable } from "./proposta-detalhes/AnalysisItemsTable";
import { useExpandedSections } from "@/hooks/useExpandedSections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PropostaDetalhesContent() {
  const { numero } = useParams();
  const navigate = useNavigate();
  const { expandedSections, toggleSection } = useExpandedSections();

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
    "Código Operação": "12345",
    "Código Versão CCB": "V1.0",
    "Tipo Índice Financeiro": "CDI",
    "Perc Índice Financeiro": "100%",
    "Perc IOF Adicional": "0,38%",
    "Data Primeiro Vencimento": "15/05/25",
    "Valor Outras Despesas": "R$ 0,00",
    "Valor Outros Serviços": "R$ 0,00",
    "Valor Seguro": "R$ 0,00",
    "Valor Corban": "R$ 0,00",
    "Valor Avaliação": "R$ 0,00",
    "Valor Despachante": "R$ 0,00",
    "Valor Registro": "R$ 0,00",
    "Valor Serviço Terceiro": "R$ 0,00",
    "Valor Registro Cartório": "R$ 0,00",
    "Valor Blindagem": "R$ 0,00",
    "Valor Acessórios": "R$ 0,00",
    "Valor Vistoria": "R$ 0,00",
    "Valor Certificação Documentos": "R$ 0,00",
    "Tipo Processo": "Automatico",
    "Número CCB": "CCB123456"
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
    "Nome": "IZABELA MARIA PEREIRA DE AZEVEDO",
    "Documento Federal": "077.445.417-23",
    "Data de Nascimento": "15/03/1985",
    "RG": "12.345.678-9",
    "Sexo": "Feminino",
    "Escolaridade": "Superior Completo",
    "Nome da Mãe": "MARIA PEREIRA DE AZEVEDO",
    "Estado Civil": "Solteira",
    "Nacionalidade": "Brasileira",
    "E-mail": "izabela@email.com",
    "Telefone Celular": "(11) 99999-9999"
  };

  const enderecoCliente = {
    "CEP": "01234-567",
    "Logradouro": "Rua das Flores, 123",
    "Bairro": "Centro",
    "Cidade": "São Paulo",
    "Estado": "SP",
    "Complemento": "Apto 45"
  };

  const referenciasBancarias = {
    "Banco Principal": "Banco do Brasil",
    "Agência": "1234-5",
    "Conta": "12345-6",
    "Tempo de Relacionamento": "5 anos",
    "Movimentação Média": "R$ 3.500,00"
  };

  const contaPagamento = {
    "Banco": "Banco do Brasil",
    "Agência (com dígito)": "1234-5",
    "Conta Corrente (com dígito)": "12345-6",
    "Tipo de Conta": "Conta Corrente"
  };

  const outrosPagamentos = [
    { tipo: "PIX", chave: "077.445.417-23", principal: "Sim" },
    { tipo: "TED", banco: "Banco Itaú", agencia: "9876", conta: "54321-0", principal: "Não" }
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
    <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <PropostaHeader 
        numero={propostaData.numero}
        status={propostaData.status}
        onVoltar={handleVoltar}
      />

      <main className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Card de Informações Principais - Design Moderno */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <CardTitle className="text-3xl font-bold flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">#</span>
              </div>
              Proposta {propostaData.numero}
              <Badge className="bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded-2xl">
                {propostaData.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Valores Principais */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
                  <label className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Valor Aprovado</label>
                  <p className="text-3xl font-bold text-emerald-800 mt-2">{propostaData.valorAprovado}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                  <label className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Valor da Parcela</label>
                  <p className="text-2xl font-bold text-blue-800 mt-2">{propostaData.valorParcela}</p>
                </div>
              </div>

              {/* Detalhes da Operação */}
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="text-sm font-medium text-slate-600">Tipo de Operação</label>
                  <p className="text-slate-900 font-semibold">{propostaData.tipoOperacao}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="text-sm font-medium text-slate-600">Modelo</label>
                  <p className="text-slate-900 font-semibold">{propostaData.modelo}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="text-sm font-medium text-slate-600">Parcelas</label>
                  <p className="text-slate-900 font-semibold">{propostaData.numParcelas}x</p>
                </div>
              </div>

              {/* Taxas e CET */}
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <label className="text-sm font-medium text-amber-700">Taxa Mensal</label>
                  <p className="text-amber-900 font-semibold">{propostaData.taxaMensal}%</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <label className="text-sm font-medium text-amber-700">Taxa Anual</label>
                  <p className="text-amber-900 font-semibold">{propostaData.taxaAnual}%</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <label className="text-sm font-medium text-orange-700">CET Anual</label>
                  <p className="text-orange-900 font-semibold">{propostaData.cetAnual}%</p>
                </div>
              </div>

              {/* Datas e Parceiro */}
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <label className="text-sm font-medium text-purple-700">1º Vencimento</label>
                  <p className="text-purple-900 font-semibold">{propostaData.primeiroVencimento}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <label className="text-sm font-medium text-purple-700">Parceiro</label>
                  <p className="text-purple-900 font-semibold">{propostaData.parceiro}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <label className="text-sm font-medium text-purple-700">Vendedor</label>
                  <p className="text-purple-900 font-semibold">{propostaData.vendedor}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seções Expansíveis com Design Moderno */}
        <div className="space-y-6">
          <ExpandableSection
            title="💰 Valores da Operação"
            isOpen={expandedSections.valoresOperacao}
            onToggle={() => toggleSection('valoresOperacao')}
          >
            <GridDataDisplay data={valoresOperacao} />
          </ExpandableSection>

          <ExpandableSection
            title="🤝 Ajuda Analista"
            isOpen={expandedSections.ajudaAnalista}
            onToggle={() => toggleSection('ajudaAnalista')}
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
              <label className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Campo de texto preenchido pelo analista:</label>
              <p className="text-slate-900 mt-3 leading-relaxed">Cliente aprovado após análise completa dos documentos e verificação de renda. Todos os requisitos foram atendidos.</p>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="✅ Itens da Análise (Resolvido: 2 de 2)"
            isOpen={expandedSections.itensAnalise}
            onToggle={() => toggleSection('itensAnalise')}
          >
            <AnalysisItemsTable items={itensAnalise} />
          </ExpandableSection>

          <ExpandableSection
            title="📋 Propostas Anteriores"
            isOpen={expandedSections.propostasAnteriores}
            onToggle={() => toggleSection('propostasAnteriores')}
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold">Número da Proposta</TableHead>
                    <TableHead className="font-semibold">Data de Criação</TableHead>
                    <TableHead className="font-semibold">Produto</TableHead>
                    <TableHead className="font-semibold">Valor Solicitado</TableHead>
                    <TableHead className="font-semibold">Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propostasAnteriores.map((proposta, index) => (
                    <TableRow key={index} className="hover:bg-slate-50">
                      <TableCell className="font-medium">#{proposta.numero}</TableCell>
                      <TableCell>{proposta.dataCriacao}</TableCell>
                      <TableCell>{proposta.produto}</TableCell>
                      <TableCell>{proposta.valorSolicitado}</TableCell>
                      <TableCell>
                        <Badge variant={proposta.situacao === "Finalizada" ? "default" : "destructive"} className="rounded-full">
                          {proposta.situacao}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="✍️ Assinantes (CCB Digital)"
            isOpen={expandedSections.assinantes}
            onToggle={() => toggleSection('assinantes')}
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold">Nome</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Documento Federal</TableHead>
                    <TableHead className="font-semibold">Celular</TableHead>
                    <TableHead className="font-semibold">Identificador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assinantes.map((assinante, index) => (
                    <TableRow key={index} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{assinante.nome}</TableCell>
                      <TableCell>{assinante.email}</TableCell>
                      <TableCell>{assinante.documento}</TableCell>
                      <TableCell>{assinante.celular}</TableCell>
                      <TableCell>{assinante.identificador}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="👤 Dados do Cliente"
            isOpen={expandedSections.dadosCliente}
            onToggle={() => toggleSection('dadosCliente')}
          >
            <GridDataDisplay data={dadosCliente} />
          </ExpandableSection>

          <ExpandableSection
            title="🏠 Endereço do Cliente"
            isOpen={expandedSections.endereco}
            onToggle={() => toggleSection('endereco')}
          >
            <GridDataDisplay data={enderecoCliente} columns={3} />
          </ExpandableSection>

          <ExpandableSection
            title="🏦 Referências Bancárias"
            isOpen={expandedSections.referenciasBancarias}
            onToggle={() => toggleSection('referenciasBancarias')}
          >
            <GridDataDisplay data={referenciasBancarias} columns={3} />
          </ExpandableSection>

          <ExpandableSection
            title="💳 Conta de Pagamento da Proposta"
            isOpen={expandedSections.contaPagamento}
            onToggle={() => toggleSection('contaPagamento')}
          >
            <GridDataDisplay data={contaPagamento} columns={4} />
          </ExpandableSection>

          <ExpandableSection
            title="💰 Outros Métodos de Pagamento"
            isOpen={expandedSections.outrosPagamentos}
            onToggle={() => toggleSection('outrosPagamentos')}
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold">Tipo</TableHead>
                    <TableHead className="font-semibold">Chave/Dados</TableHead>
                    <TableHead className="font-semibold">Banco</TableHead>
                    <TableHead className="font-semibold">Agência</TableHead>
                    <TableHead className="font-semibold">Conta</TableHead>
                    <TableHead className="font-semibold">Principal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outrosPagamentos.map((pagamento, index) => (
                    <TableRow key={index} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{pagamento.tipo}</TableCell>
                      <TableCell>{pagamento.chave || '-'}</TableCell>
                      <TableCell>{pagamento.banco || '-'}</TableCell>
                      <TableCell>{pagamento.agencia || '-'}</TableCell>
                      <TableCell>{pagamento.conta || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={pagamento.principal === "Sim" ? "default" : "secondary"} className="rounded-full">
                          {pagamento.principal}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="📄 Documentos do Cliente"
            isOpen={expandedSections.documentosCliente}
            onToggle={() => toggleSection('documentosCliente')}
          >
            <DocumentsTable documents={documentosCliente} onDownload={handleDownloadDocument} />
          </ExpandableSection>

          <ExpandableSection
            title="📋 Documentos da Proposta"
            isOpen={expandedSections.documentosProposta}
            onToggle={() => toggleSection('documentosProposta')}
          >
            <DocumentsTable documents={documentosProposta} onDownload={handleDownloadDocument} />
          </ExpandableSection>
        </div>
      </main>
    </div>
  );
}
