
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Download, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const dadosCliente = {
  nome: "TESTE LUCCA",
  cpf: "422.817.188-59",
  dataNasc: "12/07/1995",
  rg: "-",
  escolaridade: "-",
  nomeMae: "-",
  sexo: "M",
  estadoCivil: "-",
  nacionalidade: "Brasileiro",
  email: "rafael.prestes@moneyp.com.br",
  telefoneFixo1: "11 93019-1818",
  telefoneFixo2: "-",
  telefoneCelular1: "-",
  telefoneCelular2: "-"
};

const documentosCliente = [
  {
    conferido: false,
    nome: "CNH",
    tipo: "CNH",
    extensao: "pdf",
    data: "11/06/2025 09:18",
    validoAte: "11/06/2025"
  }
];

const documentosProposta = [
  {
    conferido: false,
    nome: "1234",
    tipo: "CCB",
    extensao: "pdf",
    data: "06/06/2025 14:34",
    validoAte: "-"
  },
  {
    conferido: false,
    nome: "CCB",
    tipo: "CCB",
    extensao: "pdf",
    data: "06/06/2025 10:08",
    validoAte: "-"
  }
];

const pendencias = [
  "- Falta enviar o RG e o Extrato bancário do avalista",
  "- CNH do emitente está ilegível."
];

export function FormalizacaoDetalhesContent() {
  const navigate = useNavigate();
  const { numero } = useParams();
  const [possuiPendenciasCliente, setPossuiPendenciasCliente] = useState(true);
  const [possuiPendenciasProposta, setPossuiPendenciasProposta] = useState(true);
  const [maloteEntregue, setMaloteEntregue] = useState(false);

  const handleVoltar = () => {
    navigate("/formalizacao-garantias");
  };

  const handleSalvarPendencias = () => {
    console.log("Salvando pendências...");
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleVoltar} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Proposta #{numero} - TESTE LUCCA
              </h1>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-800">Pendente</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Dados do Cliente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Dados do Cliente</h2>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-700">Nome</label>
              <p className="text-blue-600">{dadosCliente.nome}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">(CPF/CNPJ)</label>
              <p>{dadosCliente.cpf}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Data Nasc.</label>
              <p>{dadosCliente.dataNasc}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">RG</label>
              <p>{dadosCliente.rg}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Escolaridade</label>
              <p>{dadosCliente.escolaridade}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Nome Mãe</label>
              <p>{dadosCliente.nomeMae}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Sexo</label>
              <p>{dadosCliente.sexo}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Estado Civil</label>
              <p>{dadosCliente.estadoCivil}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Nacionalidade</label>
              <p>{dadosCliente.nacionalidade}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">E-mail</label>
              <p>{dadosCliente.email}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Telefone Fixo 1</label>
              <p>{dadosCliente.telefoneFixo1}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Telefone Fixo 2</label>
              <p>{dadosCliente.telefoneFixo2}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Telefone Celular 1</label>
              <p>{dadosCliente.telefoneCelular1}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Telefone Celular 2</label>
              <p>{dadosCliente.telefoneCelular2}</p>
            </div>
          </div>
        </div>

        {/* Pendências */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Pendências</h2>
          <div className="space-y-2 mb-4">
            {pendencias.map((pendencia, index) => (
              <p key={index} className="text-sm text-red-600">{pendencia}</p>
            ))}
          </div>
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={possuiPendenciasCliente}
                onCheckedChange={setPossuiPendenciasCliente}
              />
              <label className="text-sm">Possui pendências por parte dos documentos do cliente?</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={possuiPendenciasProposta}
                onCheckedChange={setPossuiPendenciasProposta}
              />
              <label className="text-sm">Possui pendências por parte dos documentos da proposta?</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={maloteEntregue}
                onCheckedChange={setMaloteEntregue}
              />
              <label className="text-sm">Malote entregue na BMP?</label>
            </div>
          </div>
          <Button 
            onClick={handleSalvarPendencias}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Salvar Pendências
          </Button>
        </div>

        {/* Documentos do Cliente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Documentos do Cliente</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Novo
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conferido?</TableHead>
                <TableHead>Nome Arquivo</TableHead>
                <TableHead>Tipo Documento</TableHead>
                <TableHead>Extensão</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Válido até</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosCliente.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="w-3 h-3 border-2 border-red-500 rounded-full"></div>
                  </TableCell>
                  <TableCell>{doc.nome}</TableCell>
                  <TableCell className="text-blue-600">{doc.tipo}</TableCell>
                  <TableCell>{doc.extensao}</TableCell>
                  <TableCell>{doc.data}</TableCell>
                  <TableCell>{doc.validoAte}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Documentos da Proposta */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Documentos da Proposta</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Novo
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conferido?</TableHead>
                <TableHead>Nome Arquivo</TableHead>
                <TableHead>Tipo Documento</TableHead>
                <TableHead>Extensão</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Válido até</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosProposta.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="w-3 h-3 border-2 border-red-500 rounded-full"></div>
                  </TableCell>
                  <TableCell>{doc.nome}</TableCell>
                  <TableCell className="text-blue-600">{doc.tipo}</TableCell>
                  <TableCell>{doc.extensao}</TableCell>
                  <TableCell>{doc.data}</TableCell>
                  <TableCell>{doc.validoAte}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
