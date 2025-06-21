
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText, ArrowLeft, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlobalHeader } from "@/components/GlobalHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

// Dados simulados para o contrato específico
const contratoDetalhes = {
  proposta: "0498051",
  cpfCnpj: "02883931470",
  nomeRazaoSocial: "CLIENTE TESTE",
  parceiro: "TESTE MICHEL",
  dataInclusao: "19/06/2025 05:23:39",
  situacao: "Aberta",
  valorFinanciado: "1,31",
  valorTotalDivida: "2,00",
  prazo: "1",
  valorTotalPago: "0,00"
};

// Dados das parcelas
const parcelas = [
  {
    parcela: "001",
    situacao: "Aberta",
    vencimentoOriginal: "01/04/2027",
    vencimentoAtual: "01/04/2027",
    valorOriginal: "2,00",
    saldoAtual: "1,36",
    ordemPagamento: ""
  }
];

// Dados simulados para o extrato
const extratoData = [
  {
    vencimentoAtual: "01/04/2027",
    dataPagamento: "",
    parcelaRs: "2,00",
    multaRs: "0,00",
    jurosRs: "0,00",
    moraRs: "0,00",
    tarifasRs: "0,00",
    abatimentoRs: "0,00",
    parcelaAtualizadaRs: "1,36",
    pagoRs: "0,00",
    descontoRs: "0,00",
    saldoRs: "1,36",
    informarFundo: "Não",
    usuario: ""
  }
];

export function ContratoDetalhesContent() {
  const navigate = useNavigate();
  const { numero } = useParams();
  
  // Estados para controlar os modais
  const [extratoOpen, setExtratoOpen] = useState(false);
  const [prorrogarOpen, setProrrogarOpen] = useState(false);
  const [abatimentoOpen, setAbatimentoOpen] = useState(false);
  const [pagamentoOpen, setPagamentoOpen] = useState(false);
  const [baixaOpen, setBaixaOpen] = useState(false);

  // Estados para os formulários
  const [novoVencimento, setNovoVencimento] = useState("");
  const [motivoAlteracao, setMotivoAlteracao] = useState("");
  const [tipoLancamento, setTipoLancamento] = useState("");
  const [valorLancamento, setValorLancamento] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const [descricaoLancamento, setDescricaoLancamento] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [valorCorrente, setValorCorrente] = useState("1,36");
  const [valorPagamento, setValorPagamento] = useState("");
  const [valorDesconto, setValorDesconto] = useState("");
  const [motivoPagamento, setMotivoPagamento] = useState("");
  const [descricaoPagamento, setDescricaoPagamento] = useState("");

  const handleVoltar = () => {
    navigate("/visualizar-contratos");
  };

  const handleCancelarAgenda = () => {
    console.log("Cancelar agenda clicado");
  };

  const handleExportarExcel = () => {
    console.log("Exportando para Excel...");
  };

  const handleCobrancas = () => {
    console.log("Cobranças clicado");
  };

  const handleSalvarProrrogacao = () => {
    console.log("Salvando prorrogação:", { novoVencimento, motivoAlteracao });
    setProrrogarOpen(false);
    setNovoVencimento("");
    setMotivoAlteracao("");
  };

  const handleEfetuarLancamento = () => {
    console.log("Efetuando lançamento:", { tipoLancamento, valorLancamento, dataLancamento, descricaoLancamento });
    setAbatimentoOpen(false);
    setTipoLancamento("");
    setValorLancamento("");
    setDataLancamento("");
    setDescricaoLancamento("");
  };

  const handleEfetuarPagamento = () => {
    console.log("Efetuando pagamento:", { dataPagamento, valorPagamento, valorDesconto, motivoPagamento, descricaoPagamento });
    setPagamentoOpen(false);
    setDataPagamento("");
    setValorPagamento("");
    setValorDesconto("");
    setMotivoPagamento("");
    setDescricaoPagamento("");
  };

  const handleGerarPix = () => {
    console.log("Gerando PIX parcial");
    setBaixaOpen(false);
  };

  const handleGerarBoleto = () => {
    console.log("Gerando boleto parcial");
    setBaixaOpen(false);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title={`Agenda de Recebíveis - Contrato: ${numero}`} 
        subtitle="Detalhes do contrato e agenda de recebíveis"
      />

      <main className="p-6">
        {/* Botão Voltar */}
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={handleVoltar}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Detalhes do Contrato */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-600">Número da Proposta:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.proposta}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">CPF/CNPJ:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.cpfCnpj}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Nome/Razão Social:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.nomeRazaoSocial}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Parceiro:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.parceiro}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Data de Inclusão:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.dataInclusao}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Situação:</label>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                {contratoDetalhes.situacao}
              </span>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Financiado:</label>
              <p className="text-lg font-semibold text-slate-900">R$ {contratoDetalhes.valorFinanciado}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Total Dívida:</label>
              <p className="text-lg font-semibold text-slate-900">R$ {contratoDetalhes.valorTotalDivida}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Prazo:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.prazo}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Total Pago:</label>
              <p className="text-lg font-semibold text-slate-900">R$ {contratoDetalhes.valorTotalPago}</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleCancelarAgenda}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Cancelar Agenda
            </Button>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center space-x-3 mb-6">
          <Button 
            onClick={handleExportarExcel}
            variant="outline" 
            className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar para Excel
          </Button>
          
          <Button 
            onClick={handleCobrancas}
            variant="outline" 
            className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Cobranças
          </Button>
        </div>

        {/* Tabela de Parcelas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="text-slate-700 font-semibold">
                  <input type="checkbox" className="rounded border-slate-300" />
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">Parcela</TableHead>
                <TableHead className="text-slate-700 font-semibold">Situação</TableHead>
                <TableHead className="text-slate-700 font-semibold">Vencimento Original</TableHead>
                <TableHead className="text-slate-700 font-semibold">Vencimento Atual</TableHead>
                <TableHead className="text-slate-700 font-semibold">Valor Original da Parcela R$</TableHead>
                <TableHead className="text-slate-700 font-semibold">Saldo Atual da Parcela R$</TableHead>
                <TableHead className="text-slate-700 font-semibold">Ordem Pagamento</TableHead>
                <TableHead className="text-slate-700 font-semibold">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parcelas.map((parcela, index) => (
                <TableRow key={index} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell>
                    <input type="checkbox" className="rounded border-slate-300" />
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{parcela.parcela}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {parcela.situacao}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">{parcela.vencimentoOriginal}</TableCell>
                  <TableCell className="text-slate-600">{parcela.vencimentoAtual}</TableCell>
                  <TableCell className="font-medium text-slate-900">{parcela.valorOriginal}</TableCell>
                  <TableCell className="font-medium text-slate-900">{parcela.saldoAtual}</TableCell>
                  <TableCell className="text-slate-600">{parcela.ordemPagamento || "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-md z-50">
                        <DropdownMenuItem onClick={() => setExtratoOpen(true)} className="cursor-pointer">
                          Extrato
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setProrrogarOpen(true)} className="cursor-pointer">
                          Prorrogar Vencimento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAbatimentoOpen(true)} className="cursor-pointer">
                          Acréscimo / Abatimento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPagamentoOpen(true)} className="cursor-pointer">
                          Pagamento Manual
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setBaixaOpen(true)} className="cursor-pointer">
                          Baixa Parcial
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Saldo Total */}
        <div className="flex justify-end mt-4">
          <div className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
            <span className="text-sm font-medium text-slate-700">Saldo Total: R$ 1,36</span>
          </div>
        </div>

        {/* Modal Extrato */}
        <Dialog open={extratoOpen} onOpenChange={setExtratoOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Extrato Parcela: 001 - Contrato: {numero}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-slate-600">Data Original de Vencimento:</label>
                  <p className="text-sm font-semibold">01/04/2027</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Valor Original da Parcela:</label>
                  <p className="text-sm font-semibold">R$ 2,00</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Data Atual de Vencimento:</label>
                  <p className="text-sm font-semibold">01/04/2027</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Valor Atual da Parcela:</label>
                  <p className="text-sm font-semibold">R$ 1,36</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Data Corrente:</label>
                  <p className="text-sm font-semibold">21/06/2025</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 underline">Valor Corrente</label>
                  <p className="text-sm font-semibold">R$ 1,36</p>
                </div>
              </div>

              <div className="flex justify-start">
                <Button onClick={handleExportarExcel} variant="outline" className="border-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar para Excel
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-100">
                      <TableHead className="text-xs">Vencimento Atual</TableHead>
                      <TableHead className="text-xs">Data de Pagamento</TableHead>
                      <TableHead className="text-xs">Parcela R$</TableHead>
                      <TableHead className="text-xs">Multa R$</TableHead>
                      <TableHead className="text-xs">Juros R$</TableHead>
                      <TableHead className="text-xs">Mora R$</TableHead>
                      <TableHead className="text-xs">Tarifas R$</TableHead>
                      <TableHead className="text-xs">Abatimento R$</TableHead>
                      <TableHead className="text-xs">Parcela Atualizada R$</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extratoData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs">{item.vencimentoAtual}</TableCell>
                        <TableCell className="text-xs">{item.dataPagamento || "-"}</TableCell>
                        <TableCell className="text-xs">{item.parcelaRs}</TableCell>
                        <TableCell className="text-xs">{item.multaRs}</TableCell>
                        <TableCell className="text-xs">{item.jurosRs}</TableCell>
                        <TableCell className="text-xs">{item.moraRs}</TableCell>
                        <TableCell className="text-xs">{item.tarifasRs}</TableCell>
                        <TableCell className="text-xs">{item.abatimentoRs}</TableCell>
                        <TableCell className="text-xs">{item.parcelaAtualizadaRs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-5 gap-4 text-sm font-medium bg-slate-50 p-2 rounded">
                <div>Total Multa: R$ 0,00</div>
                <div>Total Juros: R$ 0,00</div>
                <div>Total Mora: R$ 0,00</div>
                <div>Total Tarifas: R$ 0,00</div>
                <div>Total Abatimento: R$ 0,00</div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setExtratoOpen(false)}>Fechar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Prorrogar Vencimento */}
        <Dialog open={prorrogarOpen} onOpenChange={setProrrogarOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Prorrogar Vencimento - Parcela: 001
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="novoVencimento">Novo Vencimento</Label>
                <Input
                  id="novoVencimento"
                  type="date"
                  value={novoVencimento}
                  onChange={(e) => setNovoVencimento(e.target.value)}
                  placeholder="01/04/2027"
                />
              </div>
              
              <div>
                <Label htmlFor="motivoAlteracao">Motivo da Alteração</Label>
                <Textarea
                  id="motivoAlteracao"
                  value={motivoAlteracao}
                  onChange={(e) => setMotivoAlteracao(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setProrrogarOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSalvarProrrogacao} className="bg-blue-600 hover:bg-blue-700">
                  Salvar Novo Vencimento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Acréscimo / Abatimento */}
        <Dialog open={abatimentoOpen} onOpenChange={setAbatimentoOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Acréscimo / Abatimento - Parcela: 001
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="valorLancamento">Valor Lançamento</Label>
                <Input
                  id="valorLancamento"
                  type="number"
                  step="0.01"
                  value={valorLancamento}
                  onChange={(e) => setValorLancamento(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dataLancamento">Data de Lançamento</Label>
                <Input
                  id="dataLancamento"
                  type="date"
                  value={dataLancamento}
                  onChange={(e) => setDataLancamento(e.target.value)}
                  defaultValue="2025-06-21"
                />
              </div>
              
              <div>
                <Label htmlFor="tipoLancamento">Tipo de Lançamento</Label>
                <Select value={tipoLancamento} onValueChange={setTipoLancamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abatimento">Abatimento</SelectItem>
                    <SelectItem value="acrescimo">Acréscimo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="descricaoLancamento">Descrição do Lançamento</Label>
                <Textarea
                  id="descricaoLancamento"
                  value={descricaoLancamento}
                  onChange={(e) => setDescricaoLancamento(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setAbatimentoOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEfetuarLancamento} className="bg-blue-600 hover:bg-blue-700">
                  Efetuar Lançamento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Pagamento Manual */}
        <Dialog open={pagamentoOpen} onOpenChange={setPagamentoOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Pagamento Manual - Parcela: 001
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="dataPagamento">Data de Pagamento</Label>
                <Input
                  id="dataPagamento"
                  type="date"
                  value={dataPagamento}
                  onChange={(e) => setDataPagamento(e.target.value)}
                  defaultValue="2025-06-21"
                />
              </div>

              <div>
                <Label htmlFor="valorCorrente">Valor Corrente</Label>
                <Input
                  id="valorCorrente"
                  value={valorCorrente}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Label htmlFor="valorPagamento">Valor Pagamento</Label>
                <Input
                  id="valorPagamento"
                  type="number"
                  step="0.01"
                  value={valorPagamento}
                  onChange={(e) => setValorPagamento(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="valorDesconto">Valor Desconto</Label>
                <Input
                  id="valorDesconto"
                  type="number"
                  step="0.01"
                  value={valorDesconto}
                  onChange={(e) => setValorDesconto(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="motivoPagamento">Motivo Pagamento</Label>
                <Select value={motivoPagamento} onValueChange={setMotivoPagamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parcial">Parcial</SelectItem>
                    <SelectItem value="liquidacao">Liquidação</SelectItem>
                    <SelectItem value="cancelamento">Cancelamento</SelectItem>
                    <SelectItem value="fraude">Fraude</SelectItem>
                    <SelectItem value="obito">Óbito</SelectItem>
                    <SelectItem value="pre-pagamento">Pré Pagamento</SelectItem>
                    <SelectItem value="renegociacao">Renegociação</SelectItem>
                    <SelectItem value="alienacao">Alienação para Terceiros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="descricaoPagamento">Descrição do Pagamento</Label>
                <Textarea
                  id="descricaoPagamento"
                  value={descricaoPagamento}
                  onChange={(e) => setDescricaoPagamento(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setPagamentoOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEfetuarPagamento} className="bg-blue-600 hover:bg-blue-700">
                  Efetuar Pagamento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Baixa Parcial */}
        <Dialog open={baixaOpen} onOpenChange={setBaixaOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Baixa Parcial - Parcela: 001
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cedidoPara">Cedido para</Label>
                  <Input id="cedidoPara" />
                </div>
                <div>
                  <Label htmlFor="carteira">Carteira</Label>
                  <Input id="carteira" defaultValue="HML_CANC_FGTS_SCD" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="saldoAtualParcela">Saldo Atual da Parcela</Label>
                  <Input id="saldoAtualParcela" defaultValue="1,36" />
                </div>
                <div>
                  <Label htmlFor="valorCalculado">Valor Calculado</Label>
                  <Input id="valorCalculado" defaultValue="1,36" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataVencimentoAtual">Data de Vencimento Atual</Label>
                  <Input id="dataVencimentoAtual" type="date" defaultValue="2027-04-01" />
                </div>
                <div>
                  <Label htmlFor="descapitalizacao">Descapitalização</Label>
                  <Input id="descapitalizacao" defaultValue="0,64" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chavePix">Chave Pix</Label>
                  <Input id="chavePix" defaultValue="fbf47a1c-491c-4a3e-aff6-f" />
                </div>
                <div>
                  <Label htmlFor="valorBaixa">Valor da Baixa</Label>
                  <Input id="valorBaixa" className="border-red-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                  <Input id="dataVencimento" type="date" defaultValue="2025-06-21" />
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" className="min-h-[80px]" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setBaixaOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleGerarPix} className="bg-blue-600 hover:bg-blue-700">
                  Gerar Pix Parcial
                </Button>
                <Button onClick={handleGerarBoleto} className="bg-blue-600 hover:bg-blue-700">
                  Gerar Boleto Parcial
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
