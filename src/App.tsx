
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
