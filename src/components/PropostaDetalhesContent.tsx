
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ArrowLeft, FileText, User, MapPin, Building, Phone, CreditCard, Car, Settings, Bell, CheckCircle, AlertCircle, Clock } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

// Configuração dos blocos com ícones
const blocosConfig = [
  {
    titulo: "Assinantes (CCB Digital)",
    icone: FileText,
    fullWidth: true,
    categoria: "assinantes"
  },
  {
    titulo: "Dados do Cliente",
    icone: User,
    categoria: "cliente"
  },
  {
    titulo: "Endereço",
    icone: MapPin,
    categoria: "endereco"
  },
  {
    titulo: "Profissional",
    icone: Building,
    categoria: "profissional"
  },
  {
    titulo: "Contatos",
    icone: Phone,
    categoria: "contatos"
  },
  {
    titulo: "Referências",
    icone: User,
    categoria: "referencias"
  },
  {
    titulo: "Referências Bancárias",
    icone: CreditCard,
    categoria: "bancarias"
  },
  {
    titulo: "Conta de Pagamento da Proposta",
    icone: CreditCard,
    categoria: "pagamento"
  },
  {
    titulo: "Outros Pagamentos da Proposta",
    icone: CreditCard,
    categoria: "outros_pagamentos"
  },
  {
    titulo: "Documentos do Cliente",
    icone: FileText,
    categoria: "docs_cliente"
  },
  {
    titulo: "Documentos da Proposta",
    icone: FileText,
    categoria: "docs_proposta"
  },
  {
    titulo: "Complemento Loja",
    icone: Building,
    categoria: "loja"
  },
  {
    titulo: "Observações do analista",
    icone: FileText,
    categoria: "observacoes"
  },
  {
    titulo: "Itens da Análise",
    icone: CheckCircle,
    categoria: "analise"
  },
  {
    titulo: "Boletos da Proposta",
    icone: FileText,
    categoria: "boletos"
  },
  {
    titulo: "Custos e Serviços Complementares",
    icone: CreditCard,
    categoria: "custos"
  },
  {
    titulo: "Avalistas",
    icone: User,
    categoria: "avalistas"
  },
  {
    titulo: "Veículos",
    icone: Car,
    categoria: "veiculos"
  },
  {
    titulo: "Campos Adicionais",
    icone: Settings,
    categoria: "adicionais"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "bg-green-100 text-green-800 border-green-200";
    case "Em Análise":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Rejeitada":
      return "bg-red-100 text-red-800 border-red-200";
    case "Pendente":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Aprovada":
      return CheckCircle;
    case "Em Análise":
      return Clock;
    case "Rejeitada":
      return AlertCircle;
    case "Pendente":
      return Clock;
    default:
      return AlertCircle;
  }
};

export function PropostaDetalhesContent() {
  const { numero } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blocosAbertos, setBlocosAbertos] = useState<Record<string, boolean>>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reenviarModalOpen, setReenviarModalOpen] = useState(false);
  const [emailEdit, setEmailEdit] = useState(assinante.email);
  const [celularEdit, setCelularEdit] = useState(assinante.celular);
  const [isReenviando, setIsReenviando] = useState(false);

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
    console.log('Salvando:', { email: emailEdit, celular: celularEdit });
    setEditModalOpen(false);
  };

  const handleReenviarVia = async (metodo: string) => {
    setIsReenviando(true);
    
    try {
      const response = await fetch(`/api/reenviar-link-assinatura`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propostaNumero: numero,
          assinanteId: assinante.identificador,
          metodo: metodo.toLowerCase(),
          email: assinante.email,
          celular: assinante.celular
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao reenviar via ${metodo}`);
      }

      toast({
        title: "Sucesso",
        description: "Link de assinatura reenviado com sucesso",
        variant: "default",
      });
      
      setReenviarModalOpen(false);
      
    } catch (error) {
      console.error('Erro ao reenviar link:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao reenviar link de assinatura",
        variant: "destructive",
      });
    } finally {
      setIsReenviando(false);
    }
  };

  const StatusIcon = getStatusIcon(propostaDetalhes.status);

  const renderBlocoContent = (bloco: any) => {
    if (bloco.categoria === "assinantes") {
      return (
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
                <TableCell className="font-medium">{assinante.nome}</TableCell>
                <TableCell>{assinante.email}</TableCell>
                <TableCell>{assinante.documento}</TableCell>
                <TableCell>{assinante.celular}</TableCell>
                <TableCell>{assinante.identificador}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEditarAssinante}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    EDITAR
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleReenviarLink}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    REENVIAR LINK
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    }

    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 italic">
          Conteúdo de {bloco.titulo} será exibido aqui quando implementado.
        </p>
      </div>
    );
  };

  const renderBloco = (bloco: any) => {
    const IconComponent = bloco.icone;
    const isOpen = blocosAbertos[bloco.categoria];

    return (
      <Card key={bloco.categoria} className="shadow-sm hover:shadow-md transition-shadow">
        <Collapsible>
          <CollapsibleTrigger
            className="w-full"
            onClick={() => toggleBloco(bloco.categoria)}
          >
            <CardHeader className="hover:bg-gray-50 transition-colors cursor-pointer">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{bloco.titulo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Atualizar
                  </Button>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <Separator className="mb-4" />
              {renderBlocoContent(bloco)}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span className="hover:text-blue-600 cursor-pointer">Propostas</span> 
              <span className="mx-2">/</span> 
              <span className="text-gray-900 font-medium">Analisar Proposta</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>COMENTÁRIOS</span>
            </Button>
            <Badge className={`${getStatusColor(propostaDetalhes.status)} flex items-center space-x-1 px-3 py-1`}>
              <StatusIcon className="w-3 h-3" />
              <span>{propostaDetalhes.status}</span>
            </Badge>
            <Badge variant="outline" className="border-gray-300">Normal</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Cabeçalho da proposta */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleVoltar} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Proposta #{propostaDetalhes.numero}
            </h1>
            <p className="text-sm text-gray-600 mt-1">{propostaDetalhes.data}</p>
          </div>
        </div>

        {/* Informações principais em cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-gray-900">{propostaDetalhes.nomeCliente}</p>
              <p className="text-sm text-gray-600">{propostaDetalhes.cpfCnpj}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Valor Solicitado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{propostaDetalhes.valorSolicitado}</p>
              <p className="text-sm text-gray-600">TC: {propostaDetalhes.tc}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Limite Aprovado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{propostaDetalhes.limiteAprovado}</p>
              <p className="text-sm text-gray-600">IOF: {propostaDetalhes.iof}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Parcelas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-gray-900">{propostaDetalhes.parcelas}</p>
              <p className="text-sm text-gray-600">Total: {propostaDetalhes.valorTotalDivida}</p>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes financeiros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span>Detalhes Financeiros</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Parceiro</label>
                <p className="text-sm font-semibold">{propostaDetalhes.parceiro}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor Financiado</label>
                <p className="text-sm font-semibold">{propostaDetalhes.valorFinanciado}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Taxa a.m. / a.a.</label>
                <p className="text-sm font-semibold">{propostaDetalhes.taxaAm}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">CET a.m./a.a.</label>
                <p className="text-sm font-semibold">{propostaDetalhes.cetAm}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bloco de assinantes (largura total) */}
        <div className="space-y-4">
          {blocosConfig
            .filter(bloco => bloco.fullWidth)
            .map(bloco => renderBloco(bloco))}
        </div>

        {/* Blocos organizados em duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {blocosConfig
              .filter(bloco => !bloco.fullWidth)
              .slice(0, Math.ceil(blocosConfig.filter(bloco => !bloco.fullWidth).length / 2))
              .map(bloco => renderBloco(bloco))}
          </div>
          <div className="space-y-4">
            {blocosConfig
              .filter(bloco => !bloco.fullWidth)
              .slice(Math.ceil(blocosConfig.filter(bloco => !bloco.fullWidth).length / 2))
              .map(bloco => renderBloco(bloco))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-4 bg-white">
        <p className="text-sm text-gray-500 text-center">© 2025 - Sistema de Gestão de Propostas</p>
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
            <DialogDescription>
              Escolha como deseja reenviar o link de assinatura para {assinante.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 py-6">
            <Button 
              variant="outline"
              onClick={() => handleReenviarVia('Email')}
              disabled={isReenviando}
              className="flex-1 justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 h-12"
            >
              {isReenviando ? 'ENVIANDO...' : 'EMAIL'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleReenviarVia('WhatsApp')}
              disabled={isReenviando}
              className="flex-1 justify-center border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 h-12"
            >
              {isReenviando ? 'ENVIANDO...' : 'WHATSAPP'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleReenviarVia('SMS')}
              disabled={isReenviando}
              className="flex-1 justify-center border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 h-12"
            >
              {isReenviando ? 'ENVIANDO...' : 'SMS'}
            </Button>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setReenviarModalOpen(false)}
              disabled={isReenviando}
            >
              CANCELAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
