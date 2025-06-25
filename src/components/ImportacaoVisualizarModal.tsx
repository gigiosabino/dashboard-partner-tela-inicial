
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, AlertCircle, Building2, MapPin, FileText, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

// Dados organizados em blocos conforme solicitado
const dadosImportacao = {
  empresa: {
    titulo: "Dados da Empresa",
    icone: Building2,
    cor: "bg-blue-50 border-blue-200",
    corIcone: "text-blue-600",
    campos: [
      { campo: "CNPJ da empresa", valor: "12.345.678/0001-00", status: "sucesso" },
      { campo: "Cadastrar empresa?", valor: "Sim", status: "sucesso" },
      { campo: "Razão social", valor: "Nome do cliente LTDA", status: "sucesso" },
      { campo: "Nome fantasia", valor: "Nome do cliente", status: "sucesso" },
      { campo: "Email da empresa", valor: "contato@cliente.com.br", status: "sucesso" },
      { campo: "Telefone fixo da empresa", valor: "(11) 3333-4444", status: "sucesso" },
      { campo: "Telefone celular da empresa", valor: "(11) 99999-8888", status: "sucesso" }
    ]
  },
  endereco: {
    titulo: "Endereço da Empresa",
    icone: MapPin,
    cor: "bg-green-50 border-green-200",
    corIcone: "text-green-600",
    campos: [
      { campo: "Cadastrar endereço da empresa?", valor: "Sim", status: "sucesso" },
      { campo: "CEP da empresa", valor: "01234-567", status: "sucesso" },
      { campo: "Logradouro da empresa", valor: "Rua das Empresas", status: "sucesso" },
      { campo: "Número do logradouro da empresa", valor: "123", status: "sucesso" },
      { campo: "Complemento do endereço da empresa", valor: "Sala 101", status: "sucesso" },
      { campo: "Bairro da empresa", valor: "Centro", status: "sucesso" },
      { campo: "Cidade da empresa", valor: "São Paulo", status: "sucesso" },
      { campo: "UF da empresa", valor: "SP", status: "sucesso" }
    ]
  },
  contrato: {
    titulo: "Condições do Contrato",
    icone: FileText,
    cor: "bg-purple-50 border-purple-200",
    corIcone: "text-purple-600",
    campos: [
      { campo: "Cadastrar condições do contrato?", valor: "Sim", status: "sucesso" },
      { campo: "Limite de crédito concedido", valor: "R$ 500.000,00", status: "sucesso" },
      { campo: "Taxa de juros", valor: "2,50%", status: "sucesso" },
      { campo: "Tipo de tarifa (TC)", valor: "Percentual", status: "sucesso" },
      { campo: "Tarifa (TC)", valor: "1,5%", status: "sucesso" },
      { campo: "Prazo mínimo para vencimento (em dias)", valor: "30", status: "sucesso" },
      { campo: "Prazo máximo para vencimento (em dias)", valor: "360", status: "sucesso" }
    ]
  },
  assinante: {
    titulo: "Dados do Assinante",
    icone: User,
    cor: "bg-orange-50 border-orange-200",
    corIcone: "text-orange-600",
    campos: [
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
    ]
  }
};

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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Sucesso</Badge>;
      case "erro":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">Erro</Badge>;
      case "aviso":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">Aviso</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Sucesso</Badge>;
    }
  };

  const renderBlocoCard = (bloco: any, key: string) => {
    const IconeComponente = bloco.icone;
    return (
      <Card key={key} className={`${bloco.cor} shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
            <div className={`p-2 rounded-lg bg-white ${bloco.corIcone}`}>
              <IconeComponente className="h-5 w-5" />
            </div>
            {bloco.titulo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {bloco.campos.map((item: any, index: number) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(item.status)}
                    <span className="font-medium text-gray-900 text-sm">{item.campo}</span>
                  </div>
                  <p className="text-gray-700 text-sm ml-6 break-words">{item.valor}</p>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl bg-white max-h-[90vh] w-[95vw]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Detalhes da Importação
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Visualize todos os campos importados e seus respectivos status
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações da Importação */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{importacao.nomeArquivo}</div>
                  <div className="text-sm text-gray-600 mt-1">Nome do Arquivo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{importacao.dataImportacao}</div>
                  <div className="text-sm text-gray-600 mt-1">Data/Hora</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{importacao.registrosProcessados}</div>
                  <div className="text-sm text-gray-600 mt-1">Registros Processados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{importacao.registrosComErro}</div>
                  <div className="text-sm text-gray-600 mt-1">Registros com Erro</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campos Importados */}
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderBlocoCard(dadosImportacao.empresa, "empresa")}
              {renderBlocoCard(dadosImportacao.endereco, "endereco")}
              {renderBlocoCard(dadosImportacao.contrato, "contrato")}
              {renderBlocoCard(dadosImportacao.assinante, "assinante")}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
