
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Minus } from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const propostas = [
  {
    numero: "056939510",
    dataEnv: "05/06/2025",
    nomeCliente: "IZABELA MARIA PEREIRA DE AZEVEDO",
    documento: "077.445.417-23",
    valorSolicitado: "R$ 20.000,00",
    splits: [
      {
        id: "TED1",
        nome: "TED1",
        previsaoPagamento: null,
        situacao: "Pendente pagamento",
        valor: "R$ 15.000,00",
        banco: "341 - Itaú",
        agencia: "1234",
        conta: "56789-0",
        dig: "0",
        favorecido: "IZABELA MARIA PEREIRA",
        codBarras: null,
        tipo: "TED"
      },
      {
        id: "BOLETO1",
        nome: "BOLETO1", 
        previsaoPagamento: "25/06/2025",
        situacao: "Liberado",
        valor: "R$ 5.000,00",
        banco: null,
        agencia: null,
        conta: null,
        dig: null,
        favorecido: "EMPRESA XYZ LTDA",
        codBarras: "34191.23456 78901.234567 89012.345678 9 12340000050000",
        tipo: "BOLETO"
      }
    ]
  },
  {
    numero: "056441261",
    dataEnv: "04/06/2025", 
    nomeCliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 1.000,00",
    splits: [
      {
        id: "TED2",
        nome: "TED2",
        previsaoPagamento: null,
        situacao: "Pago",
        valor: "R$ 1.000,00",
        banco: "033 - Santander",
        agencia: "5678",
        conta: "12345-6",
        dig: "6",
        favorecido: "BMP MONEY PLUS",
        codBarras: null,
        tipo: "TED"
      }
    ]
  }
];

const bancos = [
  { codigo: "341", nome: "Itaú Unibanco" },
  { codigo: "033", nome: "Santander" },
  { codigo: "237", nome: "Bradesco" },
  { codigo: "104", nome: "Caixa Econômica Federal" },
  { codigo: "001", nome: "Banco do Brasil" }
];

export function AtualizarDadosBancariosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedBanco, setSelectedBanco] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  const [agencia, setAgencia] = useState("");
  const [digitoAgencia, setDigitoAgencia] = useState("");
  const [documentoFederal, setDocumentoFederal] = useState("");
  const [nomePagamento, setNomePagamento] = useState("");

  const toggleRow = (numero: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(numero)) {
      newExpanded.delete(numero);
    } else {
      newExpanded.add(numero);
    }
    setExpandedRows(newExpanded);
  };

  const handleAtualizar = (numeroProposta: string) => {
    console.log("Atualizando dados bancários da proposta:", numeroProposta);
  };

  const handleAtualizarSplit = (splitId: string) => {
    console.log("Atualizando split:", splitId);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader title="Atualização de Dados Bancários" subtitle="Gerencie a atualização de dados bancários das propostas" />

      {/* Main Content */}
      <main className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-96 bg-white p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option>Todas</option>
                        <option>Pendente</option>
                        <option>Atualizada</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        Limpar
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span className="text-sm text-gray-600">{propostas.length} proposta(s) encontrada(s)</span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por CPF, CNPJ ou número da proposta" 
                className="pl-10 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Propostas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Propostas para Atualização</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {propostas.map((proposta) => (
              <div key={proposta.numero} className="bg-white">
                {/* Linha principal da proposta */}
                <div className="flex items-center p-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-3 flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(proposta.numero)}
                      className="p-1"
                    >
                      {expandedRows.has(proposta.numero) ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                      <div>
                        <span className="text-blue-600 font-medium">#{proposta.numero}</span>
                      </div>
                      <div>
                        <span className="text-sm">{proposta.dataEnv}</span>
                      </div>
                      <div>
                        <span className="text-blue-600 text-sm">{proposta.nomeCliente}</span>
                      </div>
                      <div>
                        <span className="text-sm">{proposta.documento}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">{proposta.valorSolicitado}</span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                          Atualizar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Atualizar Dados Bancários - #{proposta.numero}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Banco:</label>
                              <Select value={selectedBanco} onValueChange={setSelectedBanco}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o banco" />
                                </SelectTrigger>
                                <SelectContent>
                                  {bancos.map((banco) => (
                                    <SelectItem key={banco.codigo} value={banco.codigo}>
                                      {banco.codigo} - {banco.nome}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Tipo de Conta:</label>
                              <Select value={tipoConta} onValueChange={setTipoConta}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="corrente">Conta Corrente</SelectItem>
                                  <SelectItem value="poupanca">Conta Poupança</SelectItem>
                                  <SelectItem value="pagamento">Conta Pagamento</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Agência:</label>
                              <Input
                                placeholder="Digite a agência"
                                value={agencia}
                                onChange={(e) => setAgencia(e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Dígito da Agência:</label>
                              <Input
                                placeholder="Digite o dígito"
                                value={digitoAgencia}
                                onChange={(e) => setDigitoAgencia(e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Documento Federal Pagamento:</label>
                            <Input
                              placeholder="Digite o documento"
                              value={documentoFederal}
                              onChange={(e) => setDocumentoFederal(e.target.value)}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Nome Pagamento:</label>
                            <Input
                              placeholder="Digite o nome para pagamento"
                              value={nomePagamento}
                              onChange={(e) => setNomePagamento(e.target.value)}
                            />
                          </div>

                          <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="outline">Cancelar</Button>
                            <Button 
                              onClick={() => handleAtualizar(proposta.numero)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Salvar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Splits expandidos */}
                {expandedRows.has(proposta.numero) && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    <div className="p-4">
                      {/* Cabeçalho das colunas dos splits */}
                      <div className="grid grid-cols-12 gap-3 items-center text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 px-4">
                        <div className="col-span-1">Split</div>
                        <div className="col-span-1">Previsão</div>
                        <div className="col-span-1">Situação</div>
                        <div className="col-span-1">Valor</div>
                        <div className="col-span-1">Banco</div>
                        <div className="col-span-1">Agência</div>
                        <div className="col-span-1">Conta</div>
                        <div className="col-span-1">Dígito</div>
                        <div className="col-span-2">Favorecido</div>
                        <div className="col-span-1">Código</div>
                        <div className="col-span-1">Ação</div>
                      </div>

                      <div className="space-y-3">
                        {proposta.splits.map((split) => (
                          <div key={split.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <div className="grid grid-cols-12 gap-3 items-center text-sm">
                              <div className="col-span-1">
                                <span className="font-medium text-blue-600">{split.nome}</span>
                              </div>
                              
                              <div className="col-span-1">
                                <span className="text-gray-600">{split.previsaoPagamento || "-"}</span>
                              </div>
                              
                              <div className="col-span-1">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                  split.situacao === "Pago" ? "bg-green-100 text-green-800" :
                                  split.situacao === "Liberado" ? "bg-blue-100 text-blue-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {split.situacao}
                                </span>
                              </div>
                              
                              <div className="col-span-1">
                                <span className="font-medium">{split.valor}</span>
                              </div>
                              
                              <div className="col-span-1">
                                <span className="text-gray-600">{split.banco || "-"}</span>
                              </div>
                              
                              <div className="col-span-1">
                                <span className="text-gray-600">{split.agencia || "-"}</span>
                              </div>
                              
                              <div className="col-span-1">
                                <span className="text-gray-600">{split.conta || "-"}</span>
                              </div>
                              
                              <div className="col-span-1">
                                <span className="text-gray-600">{split.dig || "-"}</span>
                              </div>
                              
                              <div className="col-span-2">
                                <span className="text-gray-600">{split.favorecido}</span>
                              </div>
                              
                              <div className="col-span-1">
                                {split.codBarras ? (
                                  <span className="text-xs font-mono text-gray-600 truncate block" title={split.codBarras}>
                                    {split.codBarras.substring(0, 15)}...
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </div>
                              
                              <div className="col-span-1 flex justify-end">
                                {split.situacao === "Pendente pagamento" && (
                                  <Button
                                    onClick={() => handleAtualizarSplit(split.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                    size="sm"
                                  >
                                    Atualizar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
