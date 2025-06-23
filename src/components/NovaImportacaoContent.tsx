
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Editar Importação</DialogTitle>
                </DialogHeader>
                {editingItem && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">ID da Importação:</label>
                      <Input value={editingItem.id} readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Documento Federal:</label>
                      <Input value={editingItem.documentoFederal} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição do Erro:</label>
                      <Input value={editingItem.descricaoErro} />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setIsEditModalOpen(false)}>
                        Salvar
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
