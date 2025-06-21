import { useParams, useNavigate } from "react-router-dom";
import { PropostaHeader } from "./proposta-detalhes/PropostaHeader";
import { PropostaSummaryCard } from "./proposta-detalhes/PropostaSummaryCard";
import { PropostaTabsContent } from "./proposta-detalhes/PropostaTabsContent";

export function PropostaDetalhesContent() {
  const { numero } = useParams();
  const navigate = useNavigate();

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
        <PropostaSummaryCard propostaData={propostaData} />
        
        <PropostaTabsContent
          valoresOperacao={valoresOperacao}
          dadosCliente={dadosCliente}
          enderecoCliente={enderecoCliente}
          referenciasBancarias={referenciasBancarias}
          contaPagamento={contaPagamento}
          itensAnalise={itensAnalise}
          propostasAnteriores={propostasAnteriores}
          assinantes={assinantes}
          outrosPagamentos={outrosPagamentos}
          documentosCliente={documentosCliente}
          documentosProposta={documentosProposta}
          onDownloadDocument={handleDownloadDocument}
        />
      </main>
    </div>
  );
}
