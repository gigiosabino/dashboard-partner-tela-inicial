import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandableSection } from "./ExpandableSection";
import { GridDataDisplay } from "./GridDataDisplay";
import { DocumentsTable } from "./DocumentsTable";
import { AnalysisItemsTable } from "./AnalysisItemsTable";
import { SplitsTable } from "../atualizar-dados-bancarios/SplitsTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, FileText, DollarSign, Building, CreditCard, AlertCircle, Edit, Send, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VeiculosTable } from "./VeiculosTable";
import { GarantiasTable } from "./GarantiasTable";

interface PropostaTabsContentProps {
  valoresOperacao: Record<string, string | number>;
  dadosCliente: Record<string, string | number>;
  enderecoCliente: Record<string, string | number>;
  referenciasBancarias: Record<string, string | number>;
  contaPagamento: Record<string, string | number>;
  itensAnalise: any[];
  propostasAnteriores: any[];
  assinantes: any[];
  outrosPagamentos: any[];
  documentosCliente: any[];
  documentosProposta: any[];
  onDownloadDocument: (documentName: string) => void;
}

export function PropostaTabsContent({
  valoresOperacao,
  dadosCliente,
  enderecoCliente,
  referenciasBancarias,
  contaPagamento,
  itensAnalise,
  propostasAnteriores,
  assinantes,
  outrosPagamentos,
  documentosCliente,
  documentosProposta,
  onDownloadDocument
}: PropostaTabsContentProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    operacao: false
  });
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reenviarModalOpen, setReenviarModalOpen] = useState(false);
  const [selectedAssinante, setSelectedAssinante] = useState<any>(null);
  const [editedAssinante, setEditedAssinante] = useState<any>({});
  const [isReenviando, setIsReenviando] = useState(false);
  const { toast } = useToast();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleEditAssinante = (assinante: any) => {
    setSelectedAssinante(assinante);
    setEditedAssinante({ ...assinante });
    setEditModalOpen(true);
  };

  const handleReenviarLink = (assinante: any) => {
    setSelectedAssinante(assinante);
    setReenviarModalOpen(true);
  };

  const handleSaveAssinante = () => {
    // Simular salvamento
    console.log('Salvando dados do assinante:', editedAssinante);
    toast({
      title: "Sucesso",
      description: "Dados do assinante atualizados com sucesso",
      variant: "default",
    });
    setEditModalOpen(false);
    setSelectedAssinante(null);
  };

  const handleReenviarVia = async (metodo: string) => {
    setIsReenviando(true);
    
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Sucesso",
        description: `Link de assinatura reenviado via ${metodo} para ${selectedAssinante?.nome}`,
        variant: "default",
      });
      
      setReenviarModalOpen(false);
      setSelectedAssinante(null);
      
    } catch (error) {
      console.error('Erro ao reenviar link:', error);
      toast({
        title: "Erro",
        description: "Erro ao reenviar link de assinatura",
        variant: "destructive",
      });
    } finally {
      setIsReenviando(false);
    }
  };

  // Dados mockados dos splits para exemplo
  const splitsData = [
    {
      id: "12345",
      previsaoPagamento: "2025-07-15",
      situacao: "Liberado",
      valor: "R$ 250,00",
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "12345-6",
      favorecido: "TESTE LUCCA",
      codBarras: null,
      tipo: "TED"
    },
    {
      id: "12346",
      previsaoPagamento: "2025-08-15",
      situacao: "Pendente",
      valor: "R$ 250,00",
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "12345-6",
      favorecido: "TESTE LUCCA",
      codBarras: null,
      tipo: "TED"
    }
  ];

  const handleSaveSplit = (splitId: string) => {
    console.log(`Salvando dados do split: ${splitId}`);
    toast({
      title: "Sucesso",
      description: "Dados bancários do split atualizados com sucesso",
      variant: "default",
    });
  };

  // Dados mockados dos veículos para exemplo
  const veiculosData = [
    {
      id: "1",
      placa: "DMA4C96",
      chassi: "NEM035187320001234",
      anoFab: "2021",
      anoMod: "2021",
      descricao: "CHEVROLET ONIX 1.0 TB AT",
      proprietario: "MARCOS FERNANDES",
      cpfCnpj: "422.817.188-59",
      marca: "CHEVROLET",
      modelo: "ONIX",
      versao: "1.0 TB AT",
      valorFipe: "R$ 76.800,00",
      valorVeiculo: "R$ 78.000,00",
      zeroKm: false,
      km: "26584",
      cor: "VERMELHO",
      tipoChissi: "2 - Normal",
      tipoRestricao: "Selecione",
      renavam: "23097728690",
      ufLicenciamento: "SP",
      numeroGravame: "0",
      financiado: false,
      saldo: "R$ 0,00",
      tipoPlaca: "Carro",
      tipoVeiculo: "Particular",
      pendenciaGravame: "",
      identificador: "b156b365-8264-4c04-b113-46d907b2ceb6",
      houveConsultaRenave: false
    }
  ];

  // Dados mockados das garantias para exemplo
  const garantiasData = [
    {
      id: "1",
      grupo: "Bens Imóveis",
      subgrupo: "Prédio comercial",
      valor: "R$ 13.330,00"
    },
    {
      id: "2",
      grupo: "Bens Rurais",
      subgrupo: "Alienação Fiduciária",
      valor: "R$ 10.000,00"
    },
    {
      id: "3",
      grupo: "Bens Móveis",
      subgrupo: "Máquinas e equipamentos",
      valor: "R$ 10.000,00"
    },
    {
      id: "4",
      grupo: "Bens Móveis",
      subgrupo: "Veículo automotor terrestre, caminhão, automóvel, moto etc",
      valor: "R$ 45.000,00"
    }
  ];

  return (
    <>
      <Tabs defaultValue="operacao" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="operacao" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Operação
          </TabsTrigger>
          <TabsTrigger value="cliente" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Cliente
          </TabsTrigger>
          <TabsTrigger value="assinantes" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Assinantes
          </TabsTrigger>
          <TabsTrigger value="garantias" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Garantias
          </TabsTrigger>
          <TabsTrigger value="pagamentos" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="documentos" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="operacao" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Dados da operação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GridDataDisplay data={valoresOperacao} columns={4} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cliente" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GridDataDisplay data={dadosCliente} columns={1} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GridDataDisplay data={enderecoCliente} columns={1} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Referências Bancárias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GridDataDisplay data={referenciasBancarias} columns={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Itens da Análise (Resolvido: {itensAnalise.filter(item => item.resolvido).length} de {itensAnalise.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnalysisItemsTable items={itensAnalise} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Propostas Anteriores
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assinantes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Assinantes CCB Digital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Nome</TableHead>
                    <TableHead className="font-medium">E-mail</TableHead>
                    <TableHead className="font-medium">Documento</TableHead>
                    <TableHead className="font-medium">Celular</TableHead>
                    <TableHead className="font-medium">Identificador</TableHead>
                    <TableHead className="font-medium">Ações</TableHead>
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
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditAssinante(assinante)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReenviarLink(assinante)}
                            className="flex items-center gap-1"
                          >
                            <Send className="w-4 h-4" />
                            Reenviar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="garantias" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Veículos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VeiculosTable veiculos={veiculosData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Garantias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GarantiasTable garantias={garantiasData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Conta Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GridDataDisplay data={contaPagamento} columns={1} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Dados do Split
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SplitsTable splits={splitsData} onSaveSplit={handleSaveSplit} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentos" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documentos da Pessoa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentsTable documents={documentosCliente} onDownload={onDownloadDocument} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documentos da Proposta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentsTable documents={documentosProposta} onDownload={onDownloadDocument} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para editar assinante */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Editar Dados do Assinante</DialogTitle>
            <DialogDescription className="text-gray-600">
              Altere os dados do assinante conforme necessário
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={editedAssinante.nome || ''}
                onChange={(e) => setEditedAssinante(prev => ({ ...prev, nome: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={editedAssinante.email || ''}
                onChange={(e) => setEditedAssinante(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documento">Documento</Label>
              <Input
                id="documento"
                value={editedAssinante.documento || ''}
                onChange={(e) => setEditedAssinante(prev => ({ ...prev, documento: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input
                id="celular"
                value={editedAssinante.celular || ''}
                onChange={(e) => setEditedAssinante(prev => ({ ...prev, celular: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAssinante}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para reenviar link */}
      <Dialog open={reenviarModalOpen} onOpenChange={setReenviarModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Notificar Assinante</DialogTitle>
            <DialogDescription className="text-gray-600">
              Escolha como deseja reenviar o link de assinatura para {selectedAssinante?.nome}
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
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              CANCELAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
