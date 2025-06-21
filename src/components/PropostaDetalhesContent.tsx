
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PropostaHeader } from "./proposta-detalhes/PropostaHeader";
import { ExpandableSection } from "./proposta-detalhes/ExpandableSection";
import { GridDataDisplay } from "./proposta-detalhes/GridDataDisplay";
import { DocumentsTable } from "./proposta-detalhes/DocumentsTable";
import { AnalysisItemsTable } from "./proposta-detalhes/AnalysisItemsTable";
import { PropostaSummaryCard } from "./proposta-detalhes/PropostaSummaryCard";
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
    numero: numero || "004935629",
    cliente: "TESTE LUCCA",
    cpf: "422.817.188-59",
    dataEnvio: "05/06/2025",
    valorSolicitado: "R$ 500,00",
    situacao: "Em análise",
    parceiro: "Parceiro Exemplo",
    status: "Ativa"
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
    { nome: "TESTE LUCCA", email: "teste@email.com", documento: "422.817.188-59", celular: "(11) 99999-9999", identificador: "ID123" }
  ];

  const dadosCliente = {
    "Nome": "TESTE LUCCA",
    "Documento Federal": "422.817.188-59",
    "Data de Nascimento": "15/03/1985",
    "RG": "12.345.678-9",
    "Sexo": "Masculino",
    "Escolaridade": "Superior Completo",
    "Nome da Mãe": "MARIA TESTE",
    "Estado Civil": "Solteiro",
    "Nacionalidade": "Brasileira",
    "E-mail": "teste@email.com",
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
    { tipo: "PIX", chave: "422.817.188-59", principal: "Sim" },
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
    <div className="flex-1 bg-gray-50 min-h-screen">
      <PropostaHeader 
        numero={propostaData.numero}
        status={propostaData.situacao}
        onVoltar={handleVoltar}
      />

      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Card de Resumo da Proposta */}
        <PropostaSummaryCard propostaData={propostaData} />

        {/* Seções Expansíveis em Duas Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpandableSection
            title="Valores da Operação"
            isOpen={expandedSections.valoresOperacao}
            onToggle={() => toggleSection('valoresOperacao')}
          >
            <GridDataDisplay data={valoresOperacao} columns={1} />
          </ExpandableSection>

          <ExpandableSection
            title="Ajuda Analista"
            isOpen={expandedSections.ajudaAnalista}
            onToggle={() => toggleSection('ajudaAnalista')}
          >
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="text-sm font-medium text-gray-600 block mb-2">Campo de texto preenchido pelo analista:</label>
              <p className="text-gray-900 leading-relaxed">Cliente aprovado após análise completa dos documentos e verificação de renda. Todos os requisitos foram atendidos.</p>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Dados do Cliente"
            isOpen={expandedSections.dadosCliente}
            onToggle={() => toggleSection('dadosCliente')}
          >
            <GridDataDisplay data={dadosCliente} columns={1} />
          </ExpandableSection>

          <ExpandableSection
            title="Endereço do Cliente"
            isOpen={expandedSections.endereco}
            onToggle={() => toggleSection('endereco')}
          >
            <GridDataDisplay data={enderecoCliente} columns={1} />
          </ExpandableSection>

          <ExpandableSection
            title="Referências Bancárias"
            isOpen={expandedSections.referenciasBancarias}
            onToggle={() => toggleSection('referenciasBancarias')}
          >
            <GridDataDisplay data={referenciasBancarias} columns={1} />
          </ExpandableSection>

          <ExpandableSection
            title="Conta de Pagamento da Proposta"
            isOpen={expandedSections.contaPagamento}
            onToggle={() => toggleSection('contaPagamento')}
          >
            <GridDataDisplay data={contaPagamento} columns={1} />
          </ExpandableSection>
        </div>

        {/* Seções que ocupam toda a largura */}
        <div className="space-y-6">
          <ExpandableSection
            title="Itens da Análise (Resolvido: 2 de 2)"
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
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
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
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Assinantes (CCB Digital)"
            isOpen={expandedSections.assinantes}
            onToggle={() => toggleSection('assinantes')}
          >
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Nome</TableHead>
                    <TableHead className="font-medium">Email</TableHead>
                    <TableHead className="font-medium">Documento Federal</TableHead>
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
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Outros Métodos de Pagamento"
            isOpen={expandedSections.outrosPagamentos}
            onToggle={() => toggleSection('outrosPagamentos')}
          >
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
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
            </div>
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
