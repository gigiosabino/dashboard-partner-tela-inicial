
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ImportacaoVisualizarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importacao: {
    id: string;
    nomeArquivo: string;
    dataImportacao: string;
    status: string;
    registrosProcessados: number;
    registrosComErro: number;
  } | null;
}

// Dados mockados dos campos importados
const camposImportados = [
  { campo: "CNPJ da empresa", valor: "12.345.678/0001-00", status: "sucesso" },
  { campo: "Cadastrar empresa?", valor: "Sim", status: "sucesso" },
  { campo: "Razão social", valor: "Nome do cliente LTDA", status: "sucesso" },
  { campo: "Nome fantasia", valor: "Nome do cliente", status: "sucesso" },
  { campo: "Email da empresa", valor: "contato@cliente.com.br", status: "sucesso" },
  { campo: "Telefone fixo da empresa", valor: "(11) 3333-4444", status: "sucesso" },
  { campo: "Telefone celular da empresa", valor: "(11) 99999-8888", status: "sucesso" },
  { campo: "Cadastrar endereço da empresa?", valor: "Sim", status: "sucesso" },
  { campo: "CEP da empresa", valor: "01234-567", status: "sucesso" },
  { campo: "Logradouro da empresa", valor: "Rua das Empresas", status: "sucesso" },
  { campo: "Número do logradouro da empresa", valor: "123", status: "sucesso" },
  { campo: "Complemento do endereço da empresa", valor: "Sala 101", status: "sucesso" },
  { campo: "Bairro da empresa", valor: "Centro", status: "sucesso" },
  { campo: "Cidade da empresa", valor: "São Paulo", status: "sucesso" },
  { campo: "UF da empresa", valor: "SP", status: "sucesso" },
  { campo: "Cadastrar condições do contrato?", valor: "Sim", status: "sucesso" },
  { campo: "Limite de crédito concedido", valor: "R$ 500.000,00", status: "sucesso" },
  { campo: "Taxa de juros", valor: "2,50%", status: "sucesso" },
  { campo: "Tipo de tarifa (TC)", valor: "Percentual", status: "sucesso" },
  { campo: "Tarifa (TC)", valor: "1,5%", status: "sucesso" },
  { campo: "Prazo mínimo para vencimento (em dias)", valor: "30", status: "sucesso" },
  { campo: "Prazo máximo para vencimento (em dias)", valor: "360", status: "sucesso" },
  { campo: "Cadastrar assinante?", valor: "Sim", status: "sucesso" },
  { campo: "CPF do assinante", valor: "123.456.789-10", status: "sucesso" },
  { campo: "Nome do assinante", valor: "Nome do cliente", status: "sucesso" },
  { campo: "Email do assinante", valor: "assinante@cliente.com.br", status: "erro" },
  { campo: "Celular do assinante", valor: "(11) 99999-7777", status: "sucesso" },
  { campo: "Data de nascimento do assinante", valor: "01/01/1980", status: "sucesso" },
  { campo: "Papel do assinante", valor: "Sócio", status: "sucesso" },
  { campo: "CEP do assinante", valor: "12345-678", status: "sucesso" },
  { campo: "Bairro do assinante", valor: "Vila Nova", status: "sucesso" },
  { campo: "Logradouro do endereço do assinante", valor: "Rua dos Assinantes", status: "sucesso" },
  { campo: "Número do logradouro do assinante", valor: "456", status: "sucesso" },
  { campo: "Complemento do endereço do assinante", valor: "Apto 202", status: "sucesso" },
  { campo: "UF do endereço do assinante", valor: "SP", status: "sucesso" },
  { campo: "Cidade do endereço do assinante", valor: "São Paulo", status: "sucesso" },
  { campo: "Ordem de assinatura", valor: "1", status: "sucesso" },
  { campo: "Estado civil do assinante", valor: "Casado", status: "aviso" }
];

export function ImportacaoVisualizarModal({ 
  open, 
  onOpenChange, 
  importacao 
}: ImportacaoVisualizarModalProps) {
  if (!importacao) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sucesso":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "erro":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "aviso":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sucesso":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sucesso</Badge>;
      case "erro":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Erro</Badge>;
      case "aviso":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Aviso</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sucesso</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Detalhes da Importação
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Visualize todos os campos importados do arquivo: {importacao.nomeArquivo}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Informações da Importação</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Data/Hora:</span>
                <p className="font-medium">{importacao.dataImportacao}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-medium">{importacao.status}</p>
              </div>
              <div>
                <span className="text-gray-600">Registros:</span>
                <p className="font-medium">{importacao.registrosProcessados}</p>
              </div>
              <div>
                <span className="text-gray-600">Erros:</span>
                <p className="font-medium text-red-600">{importacao.registrosComErro}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Campos Importados</h3>
            <ScrollArea className="h-[400px] border rounded-lg">
              <div className="p-4 space-y-3">
                {camposImportados.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(item.status)}
                        <span className="font-medium text-gray-900">{item.campo}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{item.valor}</p>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
