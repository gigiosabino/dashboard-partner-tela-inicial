
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PropostaHeader } from "./proposta-detalhes/PropostaHeader";
import { MainInfoCard } from "./proposta-detalhes/MainInfoCard";
import { ExpandableSection } from "./proposta-detalhes/ExpandableSection";
import { GridDataDisplay } from "./proposta-detalhes/GridDataDisplay";
import { DocumentsTable } from "./proposta-detalhes/DocumentsTable";
import { AnalysisItemsTable } from "./proposta-detalhes/AnalysisItemsTable";
import { useExpandedSections } from "@/hooks/useExpandedSections";

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

  const contaPagamento = {
    "Banco": "Banco do Brasil",
    "Agência (com dígito)": "1234-5",
    "Conta Corrente (com dígito)": "12345-6",
    "Tipo de Conta": "Conta Corrente"
  };

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
      <PropostaHeader 
        numero={propostaData.numero}
        status={propostaData.status}
        onVoltar={handleVoltar}
      />

      <main className="p-6 space-y-6">
        <MainInfoCard propostaData={propostaData} />

        <div className="space-y-4">
          <ExpandableSection
            title="Valores da Operação"
            isOpen={expandedSections.valoresOperacao}
            onToggle={() => toggleSection('valoresOperacao')}
          >
            <GridDataDisplay data={valoresOperacao} />
          </ExpandableSection>

          <ExpandableSection
            title="Ajuda Analista"
            isOpen={expandedSections.ajudaAnalista}
            onToggle={() => toggleSection('ajudaAnalista')}
          >
            <div className="bg-slate-50 p-4 rounded-lg">
              <label className="text-sm font-medium text-slate-600">Campo de texto preenchido pelo analista:</label>
              <p className="text-slate-900 mt-2">Cliente aprovado após análise completa dos documentos e verificação de renda. Todos os requisitos foram atendidos.</p>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Itens da Análise (Resolvido: 2 de 2) ✔"
            isOpen={expandedSections.itensAnalise}
            onToggle={() => toggleSection('itensAnalise')}
          >
            <AnalysisItemsTable items={itensAnalise} />
          </ExpandableSection>

          <ExpandableSection
            title="Propostas Anteriores"
            isOpen={expandedSections.propostasAnteriores}
            onToggle={() => toggleSection('propostasAnteriores')}
          >
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
          </ExpandableSection>

          <ExpandableSection
            title="Assinantes (CCB Digital)"
            isOpen={expandedSections.assinantes}
            onToggle={() => toggleSection('assinantes')}
          >
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
          </ExpandableSection>

          <ExpandableSection
            title="Dados do Cliente"
            isOpen={expandedSections.dadosCliente}
            onToggle={() => toggleSection('dadosCliente')}
          >
            <GridDataDisplay data={dadosCliente} />
          </ExpandableSection>

          <ExpandableSection
            title="Conta de Pagamento da Proposta"
            isOpen={expandedSections.contaPagamento}
            onToggle={() => toggleSection('contaPagamento')}
          >
            <GridDataDisplay data={contaPagamento} columns={4} />
          </ExpandableSection>

          <ExpandableSection
            title="Documentos do Cliente"
            isOpen={expandedSections.documentosCliente}
            onToggle={() => toggleSection('documentosCliente')}
          >
            <DocumentsTable documents={documentosCliente} onDownload={handleDownloadDocument} />
          </ExpandableSection>

          <ExpandableSection
            title="Documentos da Proposta"
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
