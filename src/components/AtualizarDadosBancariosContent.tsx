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
  const [contaCorrente, setContaCorrente] = useState("");
  const [digitoConta, setDigitoConta] = useState("");
  const [documentoBeneficiario, setDocumentoBeneficiario] = useState("");
  const [nomeBeneficiario, setNomeBeneficiario] = useState("");
  const [bancoSearch, setBancoSearch] = useState("");

  const toggleRow = (numero: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(numero)) {
      newExpanded.delete(numero);
    } else {
      newExpanded.add(numero);
    }
    setExpandedRows(newExpanded);
  };

  const handleSalvar = () => {
    console.log("Salvando dados bancários:", {
      banco: selectedBanco,
      tipoConta,
      agencia,
      digitoAgencia,
      contaCorrente,
      digitoConta,
      documentoBeneficiario,
      nomeBeneficiario
    });
    alert("Dados bancários atualizados com sucesso!");
  };

  const handleSalvarSplit = (splitId: string) => {
    console.log("Salvando dados bancários do split:", splitId);
    alert("Dados bancários do split atualizados com sucesso!");
  };

  const filteredBancos = bancos.filter(banco => 
    banco.nome.toLowerCase().includes(bancoSearch.toLowerCase()) ||
    banco.codigo.includes(bancoSearch) ||
    `${banco.codigo} - ${banco.nome}`.toLowerCase().includes(bancoSearch.toLowerCase())
  );

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
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros por Período
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-96 bg-white p-4 border-slate-200 shadow-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">Data Inicial</label>
                      <Input type="date" className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">Data Final</label>
                      <Input type="date" className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600" />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                        Limpar
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                {filteredPropostas.length} proposta(s) encontrada(s)
              </span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por número da proposta, CPF ou nome" 
                className="pl-10 border-slate-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Propostas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="w-12 text-slate-700 font-semibold"></TableHead>
                <TableHead className="text-slate-700 font-semibold">Número CCB</TableHead>
                <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                <TableHead className="text-slate-700 font-semibold">Data Tentativa Pagamento</TableHead>
                <TableHead className="text-slate-700 font-semibold">Nome Cliente</TableHead>
                <TableHead className="text-slate-600 font-semibold">Documento Federal Cliente</TableHead>
                <TableHead className="text-slate-700 font-semibold">Nome Beneficiário</TableHead>
                <TableHead className="text-slate-600 font-semibold">Documento Federal Beneficiário</TableHead>
                <TableHead className="text-slate-700 font-semibold">Valor a ser Pago</TableHead>
                <TableHead className="text-slate-700 font-semibold">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPropostas.map((proposta) => (
                <>
                  <TableRow key={proposta.numeroCCB} className="hover:bg-slate-50 border-b border-slate-100">
                    <TableCell>
                      {proposta.temSplit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRow(proposta.numeroCCB)}
                          className="p-1 text-slate-600 hover:bg-slate-100"
                        >
                          {expandedRows.has(proposta.numeroCCB) ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-blue-700">#{proposta.numeroCCB}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        proposta.status === "Pendente pagamento" 
                          ? "bg-red-50 text-red-700 border border-red-200" 
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {proposta.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-700">{proposta.dataTentativaPagamento}</TableCell>
                    <TableCell className="text-slate-700">{proposta.nomeCliente}</TableCell>
                    <TableCell className="text-slate-600">{proposta.documentoCliente}</TableCell>
                    <TableCell className="text-slate-700">{proposta.nomeBeneficiario}</TableCell>
                    <TableCell className="text-slate-600">{proposta.documentoBeneficiario}</TableCell>
                    <TableCell className="font-medium text-slate-900">{proposta.valorPagar}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md" size="sm">
                            Atualizar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl border-slate-200 shadow-xl">
                          <DialogHeader>
                            <DialogTitle>Atualizar Dados Bancários - #{proposta.numeroCCB}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium">Banco:</label>
                              <div className="space-y-2">
                                <Input
                                  placeholder="Buscar banco por nome, número ou código"
                                  value={bancoSearch}
                                  onChange={(e) => setBancoSearch(e.target.value)}
                                />
                                <Select value={selectedBanco} onValueChange={setSelectedBanco}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o banco" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {filteredBancos.map((banco) => (
                                      <SelectItem key={banco.codigo} value={banco.codigo}>
                                        {banco.codigo} - {banco.nome}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Conta Corrente:</label>
                                <Input
                                  placeholder="Digite a conta"
                                  value={contaCorrente}
                                  onChange={(e) => setContaCorrente(e.target.value)}
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-2">Dígito da Conta:</label>
                                <Input
                                  placeholder="Digite o dígito"
                                  value={digitoConta}
                                  onChange={(e) => setDigitoConta(e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Documento Federal do Beneficiário:</label>
                              <Input
                                placeholder="Digite o documento"
                                value={documentoBeneficiario}
                                onChange={(e) => setDocumentoBeneficiario(e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Nome do Beneficiário:</label>
                              <Input
                                placeholder="Digite o nome do beneficiário"
                                value={nomeBeneficiario}
                                onChange={(e) => setNomeBeneficiario(e.target.value)}
                              />
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                              <Button variant="outline">Cancelar</Button>
                              <Button 
                                onClick={handleSalvar}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Salvar
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>

                  {/* Splits expandidos com bordas */}
                  {expandedRows.has(proposta.numeroCCB) && proposta.splits && (
                    <TableRow>
                      <TableCell colSpan={10} className="bg-slate-50 p-0">
                        <div className="p-4">
                          <h4 className="font-medium text-slate-900 mb-3">Splits da Proposta:</h4>
                          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-slate-50 border-b border-slate-200">
                                  <TableHead className="text-slate-700 font-semibold">ID</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Previsão de Pagamento</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Situação</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Valor</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Banco</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Agência</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Conta</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Favorecido</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Código de Barras</TableHead>
                                  <TableHead className="text-slate-700 font-semibold">Ação</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {proposta.splits.map((split, index) => (
                                  <TableRow 
                                    key={split.id} 
                                    className={`hover:bg-slate-50 ${
                                      index === 0 ? 'border-t border-slate-200' : ''
                                    } ${
                                      index === proposta.splits.length - 1 ? 'border-b border-slate-200' : 'border-b border-slate-100'
                                    }`}
                                  >
                                    <TableCell className="font-medium text-blue-700">{split.id}</TableCell>
                                    <TableCell className="text-slate-700">{split.previsaoPagamento || "-"}</TableCell>
                                    <TableCell>
                                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${
                                        split.situacao === "Pago" ? "bg-green-50 text-green-700 border-green-200" :
                                        split.situacao === "Liberado" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                        "bg-yellow-50 text-yellow-700 border-yellow-200"
                                      }`}>
                                        {split.situacao}
                                      </span>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">{split.valor}</TableCell>
                                    <TableCell className="text-slate-700">{split.banco || "-"}</TableCell>
                                    <TableCell className="text-slate-700">{split.agencia || "-"}</TableCell>
                                    <TableCell className="text-slate-700">{split.conta || "-"}</TableCell>
                                    <TableCell className="text-slate-700">{split.favorecido}</TableCell>
                                    <TableCell>
                                      {split.codBarras ? (
                                        <span className="text-xs font-mono text-slate-600" title={split.codBarras}>
                                          {split.codBarras.substring(0, 15)}...
                                        </span>
                                      ) : (
                                        <span className="text-slate-500">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md" size="sm">
                                            Atualizar
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl border-slate-200 shadow-xl">
                                          <DialogHeader>
                                            <DialogTitle>Atualizar Dados Bancários - Split {split.id}</DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                              <label className="block text-sm font-medium">Banco:</label>
                                              <div className="space-y-2">
                                                <Input
                                                  placeholder="Buscar banco por nome, número ou código"
                                                  value={bancoSearch}
                                                  onChange={(e) => setBancoSearch(e.target.value)}
                                                />
                                                <Select value={selectedBanco} onValueChange={setSelectedBanco}>
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o banco" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    {filteredBancos.map((banco) => (
                                                      <SelectItem key={banco.codigo} value={banco.codigo}>
                                                        {banco.codigo} - {banco.nome}
                                                      </SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
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

                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <label className="block text-sm font-medium mb-2">Conta Corrente:</label>
                                                <Input
                                                  placeholder="Digite a conta"
                                                  value={contaCorrente}
                                                  onChange={(e) => setContaCorrente(e.target.value)}
                                                />
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium mb-2">Dígito da Conta:</label>
                                                <Input
                                                  placeholder="Digite o dígito"
                                                  value={digitoConta}
                                                  onChange={(e) => setDigitoConta(e.target.value)}
                                                />
                                              </div>
                                            </div>

                                            <div>
                                              <label className="block text-sm font-medium mb-2">Documento Federal do Beneficiário:</label>
                                              <Input
                                                placeholder="Digite o documento"
                                                value={documentoBeneficiario}
                                                onChange={(e) => setDocumentoBeneficiario(e.target.value)}
                                              />
                                            </div>

                                            <div>
                                              <label className="block text-sm font-medium mb-2">Nome do Beneficiário:</label>
                                              <Input
                                                placeholder="Digite o nome do beneficiário"
                                                value={nomeBeneficiario}
                                                onChange={(e) => setNomeBeneficiario(e.target.value)}
                                              />
                                            </div>

                                            <div className="flex justify-end space-x-2 pt-4">
                                              <Button variant="outline">Cancelar</Button>
                                              <Button 
                                                onClick={() => handleSalvarSplit(split.id)}
                                                className="bg-blue-600 hover:bg-blue-700"
                                              >
                                                Salvar
                                              </Button>
                                            </div>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
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
