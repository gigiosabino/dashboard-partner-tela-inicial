import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Upload,
  Download,
  FileText,
  Trash2,
  RefreshCw,
  Edit,
  FileSpreadsheet,
} from "lucide-react";

export function NovaImportacaoContent() {
  const [importacaoErros, setImportacaoErros] = useState([
    {
      id: "IMP001",
      documentoFederal: "12345678901",
      descricaoErro: "Tipo de pessoa inválida para o Documento Federal informado",
      situacao: "Erro",
    },
    {
      id: "IMP002",
      documentoFederal: "98765432109",
      descricaoErro: "Os prazo máximo das parcelas devem ser menor ou igual que 36",
      situacao: "Erro",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      console.log("Importando arquivo:", selectedFile.name);
      setIsImportModalOpen(false);
      setSelectedFile(null);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setImportacaoErros(importacaoErros.filter(item => item.id !== id));
  };

  const handleDeleteAllErrors = () => {
    setImportacaoErros([]);
  };

  const handleRefresh = () => {
    console.log("Atualizando listagem de erros...");
  };

  const handleDownloadTemplate = () => {
    console.log("Baixando planilha modelo...");
  };

  const handleDownloadManual = () => {
    console.log("Baixando manual de importação...");
  };

  const handleExportErrors = () => {
    console.log("Exportando erros para Excel...");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GlobalHeader title="Nova Importação" subtitle="Importar limite de crédito para clientes" />
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Nova Importação</h2>
            </div>

            {/* Cards de Status */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Erros</CardTitle>
                  <div className="h-4 w-4 bg-red-500 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{importacaoErros.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sucesso</CardTitle>
                  <div className="h-4 w-4 bg-green-500 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">0</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendente</CardTitle>
                  <div className="h-4 w-4 bg-yellow-500 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">0</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <div className="h-4 w-4 bg-blue-500 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{importacaoErros.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-2">
              <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Importar Arquivo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileSelect}
                      />
                    </div>
                    {selectedFile && (
                      <p className="text-sm text-gray-600">
                        Arquivo selecionado: {selectedFile.name}
                      </p>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsImportModalOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleImport} disabled={!selectedFile}>
                        Importar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleDownloadTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Baixar Planilha
              </Button>

              <Button variant="outline" onClick={handleDownloadManual}>
                <FileText className="w-4 h-4 mr-2" />
                Baixar Manual
              </Button>

              <Button variant="outline" onClick={handleExportErrors}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exportar Excel
              </Button>

              <Button variant="outline" onClick={handleDeleteAllErrors}>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Erros
              </Button>

              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>

            {/* Tabela de Erros */}
            <Card>
              <CardHeader>
                <CardTitle>Importações com Erro</CardTitle>
                <CardDescription>
                  Lista de importações que apresentaram erro durante o processamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID da Importação</TableHead>
                      <TableHead>Documento Federal</TableHead>
                      <TableHead>Descrição do Erro</TableHead>
                      <TableHead>Situação</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importacaoErros.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.documentoFederal}</TableCell>
                        <TableCell>{item.descricaoErro}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            {item.situacao}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditItem(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Modal de Edição */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Importação Pessoa</DialogTitle>
                </DialogHeader>
                {editingItem && (
                  <div className="space-y-8">
                    {/* Seção Pessoa */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="bg-blue-50">
                        <CardTitle className="text-lg text-blue-700">Pessoa</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">CPF/CNPJ *</label>
                            <Input value={editingItem.documentoFederal} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Pessoa *</label>
                            <Select defaultValue="pessoa-juridica">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pessoa-fisica">Pessoa Física</SelectItem>
                                <SelectItem value="pessoa-juridica">Pessoa Jurídica</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Nome/Razão Social *</label>
                            <Input placeholder="Nome Modelo Teste" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Nome fantasia</label>
                            <Input />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">E-mail</label>
                            <Input placeholder="emailTeste@emails.com.br" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Telefone Fixo</label>
                            <Input placeholder="(11) 3435-3208" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Telefone Celular</label>
                            <Input placeholder="(11) 94178-9929" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção Pessoa Endereço */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="bg-blue-50">
                        <CardTitle className="text-lg text-blue-700">Pessoa Endereço</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">CEP *</label>
                            <Input placeholder="65.095-361" />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Logradouro *</label>
                            <Input placeholder="Rua Major Palma" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">N° Logradouro *</label>
                            <Input placeholder="1787" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Complemento</label>
                            <Input placeholder="CJ 10" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Bairro</label>
                            <Input placeholder="Floresta" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Cidade</label>
                            <Input placeholder="Guarulhos" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">UF</label>
                            <Select defaultValue="SP">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SP">SP</SelectItem>
                                <SelectItem value="RJ">RJ</SelectItem>
                                <SelectItem value="MG">MG</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção Solicitação Análise de Crédito */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="bg-blue-50">
                        <CardTitle className="text-lg text-blue-700">Solicitação Análise de Crédito</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Situação Inicial *</label>
                            <Select defaultValue="capital-de-giro">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="capital-de-giro">CAPITAL DE GIRO</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Operação</label>
                            <Select defaultValue="capital-de-giro">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="capital-de-giro">CAPITAL DE GIRO</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Valor solicitado *</label>
                            <Input placeholder="R$ 1.500,00" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Percentual de juros considerado *</label>
                            <Input placeholder="1,50 %" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Prazo mínimo para Vencimento (em dias) *</label>
                            <Input placeholder="10" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Prazo máximo para Vencimento (em dias) *</label>
                            <Input placeholder="90" />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Tarifa (TA) *</label>
                            <Select defaultValue="porcentagem">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="porcentagem">Porcentagem</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Tarifa (TA) *</label>
                            <Input placeholder="2,00 %" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Parcela Mínima *</label>
                            <Input placeholder="50" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Parcela Máxima *</label>
                            <Input placeholder="50" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção Assinante */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="bg-blue-50">
                        <CardTitle className="text-lg text-blue-700">Assinante</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Documento Federal *</label>
                            <Input placeholder="590.496.170-14" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Nome *</label>
                            <Input placeholder="modelo teste" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Telefone/Celular *</label>
                            <Input placeholder="(11) 99999-9999" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">E-mail</label>
                            <Input placeholder="modelo@teste.com.br" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Data de Nascimento *</label>
                            <Input type="date" defaultValue="2001-04-01" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Papel *</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="assinante">Assinante</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Estado Civil *</label>
                            <Select defaultValue="casado">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="casado">Casado</SelectItem>
                                <SelectItem value="solteiro">Solteiro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">RG</label>
                            <Input placeholder="29.108-440" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Banco</label>
                            <Input placeholder="IBES" />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Logradouro</label>
                            <Input placeholder="Rua Presidente John Kennedy" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">N° Logradouro</label>
                            <Input placeholder="127" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Complemento</label>
                            <Input />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Cidade</label>
                            <Input placeholder="Vila Velha" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">UF</label>
                            <Input placeholder="ES" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Ordem Assinatura *</label>
                            <Input placeholder="1" />
                          </div>
                          <div></div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                        CANCELAR
                      </Button>
                      <Button onClick={() => setIsEditModalOpen(false)} className="bg-blue-600 hover:bg-blue-700">
                        SALVAR
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
