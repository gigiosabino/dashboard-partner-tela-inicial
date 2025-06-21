
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RelatoriosServicos from "./pages/RelatoriosServicos";
import Propostas from "./pages/Propostas";
import PropostaDetalhes from "./pages/PropostaDetalhes";
import GestaoAcessos from "./pages/GestaoAcessos";
import RelatoriosCaas from "./pages/RelatoriosCaas";
import AtualizarDadosBancarios from "./pages/AtualizarDadosBancarios";
import HistoricoEnvio from "./pages/HistoricoEnvio";
import ReenvioCallbacks from "./pages/ReenvioCallbacks";
import ConfiguracaoCallbacks from "./pages/ConfiguracaoCallbacks";
import FormalizacaoGarantias from "./pages/FormalizacaoGarantias";
import FormalizacaoDetalhes from "./pages/FormalizacaoDetalhes";
import Mensageria from "./pages/Mensageria";
import CancelarProposta from "./pages/CancelarProposta";
import ReenviarLinkAssinatura from "./pages/ReenviarLinkAssinatura";
import ConsultarRegistroBoleto from "./pages/ConsultarRegistroBoleto";
import ConsultaProposta from "./pages/ConsultaProposta";
import VisualizarContratos from "./pages/VisualizarContratos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/relatorios-servicos" element={<RelatoriosServicos />} />
          <Route path="/propostas" element={<Propostas />} />
          <Route path="/propostas/:numero" element={<PropostaDetalhes />} />
          <Route path="/gestao-acessos" element={<GestaoAcessos />} />
          <Route path="/relatorios-caas" element={<RelatoriosCaas />} />
          <Route path="/atualizar-dados-bancarios" element={<AtualizarDadosBancarios />} />
          <Route path="/historico-envio" element={<HistoricoEnvio />} />
          <Route path="/reenvio-callbacks" element={<ReenvioCallbacks />} />
          <Route path="/configuracao-callbacks" element={<ConfiguracaoCallbacks />} />
          <Route path="/formalizacao-garantias" element={<FormalizacaoGarantias />} />
          <Route path="/formalizacao-garantias/:numero" element={<FormalizacaoDetalhes />} />
          <Route path="/mensageria" element={<Mensageria />} />
          <Route path="/cancelar-proposta" element={<CancelarProposta />} />
          <Route path="/reenviar-link-assinatura" element={<ReenviarLinkAssinatura />} />
          <Route path="/consultar-registro-boleto" element={<ConsultarRegistroBoleto />} />
          <Route path="/consulta-proposta" element={<ConsultaProposta />} />
          <Route path="/visualizar-contratos" element={<VisualizarContratos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
