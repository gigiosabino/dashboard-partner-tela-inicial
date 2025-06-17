import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw, Download, ChevronDown, ChevronRight } from "lucide-react";
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

// Dados mockados para demonstração
const propostas = [
  {
    numero: "056939510",
    dataCriacao: "11/06/2025",
    vendedor: "Jonathan Marks Nevis",
    cliente: "IZABELA MARIA PEREIRA DE AZEVEDO",
    documento: "077.445.417-23",
    valorSolicitado: "R$ 20.000,00",
    valorAprovado: "R$ 20.000,00",
    parcelas: "36",
    situacao: "Cedida"
  },
  {
    numero: "056441261",
    dataCriacao: "05/06/2025",
    vendedor: "Willian Buthi",
    cliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 1.000,00",
    valorAprovado: "R$ 0,00",
    parcelas: "4",
    situacao: "Cancelada"
  },
  {
    numero: "056411663",
    dataCriacao: "04/06/2025",
    vendedor: "Nadia Nicacio",
    cliente: "BETANIA MARIA SILVA DE LIRA",
    documento: "066742374500",
    valorSolicitado: "R$ 2.946.000,00",
    valorAprovado: "R$ 0,00",
    parcelas: "4",
    situacao: "Cancelada"
  },
  {
    numero: "056386138",
    dataCriacao: "04/06/2025",
    vendedor: "Willian Buthi",
    cliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 117.500,00",
    valorAprovado: "R$ 0,00",
    parcelas: "18",
    situacao: "Cancelada"
  },
  {
    numero: "056363241",
    dataCriacao: "04/06/2025",
    vendedor: "Jonathan Marks Nevis",
    cliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 1.000,00",
    valorAprovado: "R$ 0,00",
    parcelas: "5",
    situacao: "Em Análise"
  },
  {
    numero: "056362606",
    dataCriacao: "04/06/2025",
    vendedor: "Bruna Clevelares Moretto",
    cliente: "FABY MODA FITNESS & CASUAL LTDA",
    documento: "24.110.339/0001-09",
    valorSolicitado: "R$ 7.000,00",
    valorAprovado: "R$ 7.000,00",
    parcelas: "24",
    situacao: "Cedida"
  }
];

const splits = {
  "056939510": [
    {
      campoId: "TED1",
      previsaoPagamento: "-",
      situacao: "Liberado",
      valor: "R$ 15.000,00",
      banco: "341 - Itaú",
      agencia: "1234",
      conta: "12345-6",
      dig: "7",
      favorecido: "IZABELA MARIA PEREIRA DE AZEVEDO",
      codBarras: "-"
    },
    {
      campoId: "BOLETO1",
      previsaoPagamento: "25/06/2025",
      situacao: "Pendente pagamento",
      valor: "R$ 5.000,00",
      banco: "-",
      agencia: "-",
      conta: "-",
      dig: "-",
      favorecido: "FINANCEIRA ABC LTDA",
      codBarras: "34191234567890123456789012345678901234567890"
    }
  ],
  "056441261": [
    {
      campoId: "TED1",
      previsaoPagamento: "-",
      situacao: "Pago",
      valor: "R$ 1.000,00",
      banco: "033 - Santander",
      agencia: "5678",
      conta: "98765-4",
      dig: "3",
      favorecido: "BMP MONEY PLUS",
      codBarras: "-"
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Cedida":
      return "bg-green-500";
    case "Em Análise":
      return "bg-yellow-500";
    case "Cancelada":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getSplitStatusColor = (status: string) => {
  switch (status) {
    case "Liberado":
      return "text-green-600";
    case "Pago":
      return "text-blue-600";
    case "Pendente pagamento":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

export function AtualizarDadosBancariosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");

  const handleRefresh = () => {
    console.log("Atualizando listagem...");
  };

  const toggleRowExpansion = (numero: string) => {
    setExpandedRows(prev => 
      prev.includes(numero) 
        ? prev.filter(n => n !== numero)
        : [...prev, numero]
    );
  };

  const BankUpdateModal = ({ trigger }: { trigger: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Atualizar Dados Bancários</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-2">Banco:</label>
            <Input
              placeholder="125 - 274 - MONEY PLUS SCM EPP"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Conta:</label>
            <Select value={selectedAccountType} onValueChange={setSelectedAccountType}>
              <SelectTrigger>
                <SelectValue placeholder="Conta Pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conta-corrente">Conta Corrente</SelectItem>
                <SelectItem value="conta-poupanca">Conta Poupança</SelectItem>
                <SelectItem value="conta-pagamento">Conta Pagamento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Agência:</label>
              <Input placeholder="0001" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dígito da agência:</label>
              <Input placeholder="8" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Conta:</label>
              <Input placeholder="0035949" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dígito da conta:</label>
              <Input placeholder="7" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Documento Federal Pagamento:</label>
            <Input placeholder="24596406000147" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nome Pagamento:</label>
            <Input placeholder="TESTE CAMILA" />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">FECHAR</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">ATUALIZAR</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Atualização de Dados Bancários</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Top Section - Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleRefresh} className="border-gray-300 hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>

              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>

            {/* Campo de busca */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Pesquisar" 
                className="pl-10 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12"></TableHead>
                <TableHead className="font-semibold text-gray-700">Número CCB</TableHead>
                <TableHead className="font-semibold text-gray-700">Situação</TableHead>
                <TableHead className="font-semibold text-gray-700">Tipo de contrato</TableHead>
                <TableHead className="font-semibold text-gray-700">Vendedor</TableHead>
                <TableHead className="font-semibold text-gray-700">Cliente</TableHead>
                <TableHead className="font-semibold text-gray-700">Solicitado</TableHead>
                <TableHead className="font-semibold text-gray-700">Aprovado</TableHead>
                <TableHead className="font-semibold text-gray-700">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propostas.map((proposta) => (
                <>
                  <TableRow key={proposta.numero} className="hover:bg-gray-50">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(proposta.numero)}
                        className="p-1"
                      >
                        {expandedRows.includes(proposta.numero) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">#{proposta.numero}</div>
                        <div className="text-sm text-gray-500">{proposta.dataCriacao}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(proposta.situacao)}`}></div>
                        <span className="text-sm">{proposta.situacao}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">CG</TableCell>
                    <TableCell className="text-sm">{proposta.vendedor}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{proposta.cliente}</div>
                        <div className="text-sm text-gray-500">{proposta.documento}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{proposta.valorSolicitado}</div>
                        <div className="text-sm text-gray-500">Em {proposta.parcelas} parcelas</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{proposta.valorAprovado}</div>
                        <div className="text-sm text-gray-500">Em {proposta.parcelas} parcelas</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <BankUpdateModal
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          >
                            Atualizar
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded Splits Row */}
                  {expandedRows.includes(proposta.numero) && splits[proposta.numero as keyof typeof splits] && (
                    <TableRow>
                      <TableCell colSpan={9} className="bg-gray-50 p-0">
                        <div className="p-4">
                          <h4 className="font-semibold mb-3 text-gray-700">Splits da Proposta</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-xs">Campo ID</TableHead>
                                <TableHead className="text-xs">Previsão Pagamento</TableHead>
                                <TableHead className="text-xs">Situação</TableHead>
                                <TableHead className="text-xs">Valor</TableHead>
                                <TableHead className="text-xs">Banco</TableHead>
                                <TableHead className="text-xs">Agência</TableHead>
                                <TableHead className="text-xs">Conta</TableHead>
                                <TableHead className="text-xs">Dig</TableHead>
                                <TableHead className="text-xs">Favorecido</TableHead>
                                <TableHead className="text-xs">Cód. Barras</TableHead>
                                <TableHead className="text-xs">Ações</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {splits[proposta.numero as keyof typeof splits].map((split, index) => (
                                <TableRow key={index} className="text-sm">
                                  <TableCell className="font-medium">{split.campoId}</TableCell>
                                  <TableCell>{split.previsaoPagamento}</TableCell>
                                  <TableCell className={getSplitStatusColor(split.situacao)}>
                                    {split.situacao}
                                  </TableCell>
                                  <TableCell>{split.valor}</TableCell>
                                  <TableCell>{split.banco}</TableCell>
                                  <TableCell>{split.agencia}</TableCell>
                                  <TableCell>{split.conta}</TableCell>
                                  <TableCell>{split.dig}</TableCell>
                                  <TableCell>{split.favorecido}</TableCell>
                                  <TableCell className="font-mono text-xs">
                                    {split.codBarras !== "-" ? split.codBarras : "-"}
                                  </TableCell>
                                  <TableCell>
                                    {split.situacao === "Pendente pagamento" && (
                                      <Button size="sm" variant="outline" className="text-xs">
                                        Atualizar
                                      </Button>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
