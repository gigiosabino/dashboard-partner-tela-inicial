
import { useState } from "react";

export function useExpandedSections() {
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

  return { expandedSections, toggleSection };
}
