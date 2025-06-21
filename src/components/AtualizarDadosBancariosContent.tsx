
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import { FiltersSection } from "./atualizar-dados-bancarios/FiltersSection";
import { PropostasTable } from "./atualizar-dados-bancarios/PropostasTable";

const propostas = [
  {
    numeroCCB: "056939510",
    status: "Pendente pagamento",
    dataTentativaPagamento: "05/06/2025",
    nomeCliente: "IZABELA MARIA PEREIRA DE AZEVEDO",
    documentoCliente: "077.445.417-23",
    nomeBeneficiario: "IZABELA MARIA PEREIRA DE AZEVEDO",
    documentoBeneficiario: "077.445.417-23",
    valorPagar: "R$ 20.000,00",
    temSplit: true,
    splits: [
      {
        id: "TED1",
        previsaoPagamento: null,
        situacao: "Pendente pagamento",
        valor: "R$ 15.000,00",
        banco: "341 - Itaú",
        agencia: "1234-5",
        conta: "56789-0",
        favorecido: "IZABELA MARIA PEREIRA",
        codBarras: null,
        tipo: "TED"
      },
      {
        id: "BOLETO1",
        previsaoPagamento: "25/06/2025",
        situacao: "Liberado",
        valor: "R$ 5.000,00",
        banco: null,
        agencia: null,
        conta: null,
        favorecido: "EMPRESA XYZ LTDA",
        codBarras: "34191.23456 78901.234567 89012.345678 9 12340000050000",
        tipo: "BOLETO"
      }
    ]
  },
  {
    numeroCCB: "056441261",
    status: "Liberada",
    dataTentativaPagamento: "04/06/2025",
    nomeCliente: "BMP MONEY PLUS",
    documentoCliente: "123.983.910-35",
    nomeBeneficiario: "BMP MONEY PLUS",
    documentoBeneficiario: "123.983.910-35",
    valorPagar: "R$ 1.000,00",
    temSplit: true,
    splits: [
      {
        id: "TED2",
        previsaoPagamento: null,
        situacao: "Pendente pagamento",
        valor: "R$ 1.000,00",
        banco: "033 - Santander",
        agencia: "5678-9",
        conta: "12345-6",
        favorecido: "BMP MONEY PLUS",
        codBarras: null,
        tipo: "TED"
      }
    ]
  }
];

export function AtualizarDadosBancariosContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSalvar = () => {
    alert("Dados bancários atualizados com sucesso!");
  };

  const handleSalvarSplit = (splitId: string) => {
    console.log("Salvando dados bancários do split:", splitId);
    alert("Dados bancários do split atualizados com sucesso!");
  };

  const filteredPropostas = propostas.filter(proposta =>
    proposta.numeroCCB.includes(searchTerm) ||
    proposta.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposta.documentoCliente.includes(searchTerm)
  );

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title="Atualização de Dados Bancários" 
        subtitle="Propostas com status 'Pendente pagamento' ou splits pendentes" 
      />

      <main className="p-6">
        <FiltersSection 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          proposalCount={filteredPropostas.length}
        />

        <PropostasTable 
          propostas={filteredPropostas}
          onSave={handleSalvar}
          onSaveSplit={handleSalvarSplit}
        />
      </main>
    </div>
  );
}
