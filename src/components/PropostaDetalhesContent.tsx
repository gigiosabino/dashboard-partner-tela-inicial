

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Dados mockados da proposta
const propostaDetalhes = {
  numero: "004944577",
  data: "13/06/2025 15:28:20",
  status: "Aprovada",
  nomeCliente: "GIOVANNI SABINO 2",
  cpfCnpj: "419.854.578-22",
  valorSolicitado: "R$ 5.000,00",
  tc: "R$ 100,00",
  limiteAprovado: "R$ 99.999.999.999,99",
  iof: "R$ 15,00",
  parceiro: "GIOVANNI LTDA",
  valorFinanciado: "R$ 5.115,00",
  taxaAm: "3% / 42.58%",
  cetAm: "0% / 0%",
  parcelas: "2 / R$ 580,00",
  valorTotalDivida: "R$ 1.160,00"
};

// Dados do assinante
const assinante = {
  nome: "TESTE 2",
  email: "giovanni.carlo@moneyp.com.br",
  documento: "419.854.578-22",
  celular: "(11) 99225-3437",
  identificador: "4198457822"
};

// Bloco que ficará em largura total
const blocoLarguraTotal = "Assinantes (CCB Digital)";

// Blocos organizados em duas colunas
const blocosColuna1 = [
  "Complemento Loja",
  "Observações do analista",
  "Itens da Análise",
  "Boletos da Proposta",
  "Custos e Serviços Complementares",
  "Avalistas",
  "Veículos",
  "Campos Adicionais"
];

const blocosColuna2 = [
  "Dados do Cliente",
  "Endereço",
  "Profissional",
  "Contatos",
  "Referências",
  "Referências Bancárias",
  "Conta de Pagamento da Proposta",
  "Outros Pagamentos da Proposta",
  "Documentos do Cliente",
  "Documentos da Proposta"
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "bg-green-100 text-green-800";
    case "Em Análise":
      return "bg-yellow-100 text-yellow-800";
    case "Rejeitada":
      return "bg-red-100 text-red-800";
    case "Pendente":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function PropostaDetalhesContent() {
  const { numero } = useParams();
  const navigate = useNavigate();
  const [blocosAbertos, setBlocosAbertos] = useState<Record<string, boolean>>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reenviarModalOpen, setReenviarModalOpen] = useState(false);
  const [emailEdit, setEmailEdit] = useState(assinante.email);
  const [celularEdit, setCelularEdit] = useState(assinante.celular);

  const toggleBloco = (bloco: string) => {
    setBlocosAbertos(prev => ({
      ...prev,
      [bloco]: !prev[bloco]
    }));
  };

  const handleVoltar = () => {
    navigate('/propostas');
  };

  const handleEditarAssinante = () => {
    setEditModalOpen(true);
  };

  const handleReenviarLink = () => {
    setReenviarModalOpen(true);
  };

  const handleSalvarEdicao = () => {
    // Aqui seria implementada a lógica de salvar
    console.log('Salvando:', { email: emailEdit, celular: celularEdit });
    setEditModalOpen(false);
  };

  const handleReenviarVia = (metodo: string) => {
    // Aqui seria implementada a lógica de reenvio
    console.log('Reenviando via:', metodo);
    setReenviarModalOpen(false);
  };

  const renderBlocoLarguraTotal = (bloco: string) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Collapsible>
        <CollapsibleTrigger
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          onClick={() => toggleBloco(bloco)}
        >
          <span className="font-medium text-gray-900">{bloco}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-600 cursor-pointer">Atualizar</span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-500 transition-transform ${
                blocosAbertos[bloco] ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-6 pb-4">
          <div className="border-t pt-4">
            {bloco === "Assinantes (CCB Digital)" ? (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Celular</TableHead>
                      <TableHead>Identificador</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{assinante.nome}</TableCell>
                      <TableCell>{assinante.email}</TableCell>
                      <TableCell>{assinante.documento}</TableCell>
                      <TableCell>{assinante.celular}</TableCell>
                      <TableCell>{assinante.identificador}</TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleEditarAssinante}
                        >
                          EDITAR
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleReenviarLink}
                        >
                          REENVIAR LINK DE ASSINATURA
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Conteúdo de {bloco} será exibido aqui quando implementado.
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  const renderBlocoColuna = (blocos: string[]) => (
    <div className="space-y-4">
      {blocos.map((bloco) => (
        <div key={bloco} className="bg-white rounded-lg shadow overflow-hidden">
          <Collapsible>
            <CollapsibleTrigger
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => toggleBloco(bloco)}
            >
              <span className="font-medium text-gray-900">{bloco}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-blue-600 cursor-pointer">Atualizar</span>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    blocosAbertos[bloco] ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-4">
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  Conteúdo de {bloco} será exibido aqui quando implementado.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Propostas</span> &gt; <span>Analisar Proposta</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              COMENTÁRIOS
            </Button>
            <Badge className={getStatusColor(propostaDetalhes.status)}>
              {propostaDetalhes.status}
            </Badge>
            <Badge variant="outline">Normal</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" onClick={handleVoltar}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Número da proposta: {propostaDetalhes.numero}
            </h1>
            <p className="text-sm text-gray-600">{propostaDetalhes.data}</p>
          </div>
        </div>

        {/* Informações principais da proposta */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nome/Razão Social</label>
                <p className="text-sm">{propostaDetalhes.nomeCliente}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor solicitado</label>
                <p className="text-sm">{propostaDetalhes.valorSolicitado}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Taxa a.m. / a.a.</label>
                <p className="text-sm">{propostaDetalhes.taxaAm}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">CPF/CNPJ</label>
                <p className="text-sm">{propostaDetalhes.cpfCnpj}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">TC</label>
                <p className="text-sm">{propostaDetalhes.tc}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">CET a.m./a.a.</label>
                <p className="text-sm">{propostaDetalhes.cetAm}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Limite aprovado</label>
                <p className="text-sm">{propostaDetalhes.limiteAprovado}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">IOF</label>
                <p className="text-sm">{propostaDetalhes.iof}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Parcelas / Valor parcela</label>
                <p className="text-sm">{propostaDetalhes.parcelas}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Parceiro</label>
                <p className="text-sm">{propostaDetalhes.parceiro}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor financiado</label>
                <p className="text-sm">{propostaDetalhes.valorFinanciado}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor total da dívida</label>
                <p className="text-sm">{propostaDetalhes.valorTotalDivida}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco de largura total */}
        <div className="space-y-4">
          {renderBlocoLarguraTotal(blocoLarguraTotal)}
        </div>

        {/* Blocos colapsáveis em duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderBlocoColuna(blocosColuna1)}
          {renderBlocoColuna(blocosColuna2)}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-4 mt-auto">
        <p className="text-sm text-gray-500">© 2025</p>
      </footer>

      {/* Modal para editar assinante */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Assinante</DialogTitle>
            <DialogDescription>
              Altere os dados do assinante {assinante.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right font-medium">
                E-mail
              </label>
              <Input
                id="email"
                value={emailEdit}
                onChange={(e) => setEmailEdit(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="celular" className="text-right font-medium">
                Celular
              </label>
              <Input
                id="celular"
                value={celularEdit}
                onChange={(e) => setCelularEdit(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSalvarEdicao}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para reenviar link */}
      <Dialog open={reenviarModalOpen} onOpenChange={setReenviarModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Notificar Assinante</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 py-6">
            <Button 
              variant="outline"
              onClick={() => handleReenviarVia('E-mail')}
              className="flex-1 justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 h-12"
            >
              EMAIL
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleReenviarVia('WhatsApp')}
              className="flex-1 justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 h-12"
            >
              WHATSAPP
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleReenviarVia('SMS')}
              className="flex-1 justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 h-12"
            >
              SMS
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReenviarModalOpen(false)}>
              CANCELAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

