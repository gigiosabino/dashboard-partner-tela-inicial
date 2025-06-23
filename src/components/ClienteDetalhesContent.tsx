
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ClienteDetalhesContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data para o cliente
  const [clienteData, setClienteData] = useState({
    // Dados Pessoais
    nome: "JORGE LUIZ SARAIVA DA COSTA",
    documento: "327.937.152-04",
    dataNascimento: "15/03/1985",
    rg: "12.345.678-9",
    sexo: "Masculino",
    escolaridade: "Superior Completo",
    nomeMae: "MARIA COSTA",
    estadoCivil: "Solteiro",
    nacionalidade: "Brasileira",
    
    // Dados de Contato
    email: "jorge@email.com",
    telefone: "(11) 99999-9999",
    
    // Endereços
    enderecos: [
      {
        id: "1",
        cep: "01234-567",
        logradouro: "Rua das Flores, 123",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        complemento: "Apto 45",
        principal: true
      },
      {
        id: "2",
        cep: "04567-890",
        logradouro: "Av. Paulista, 1000",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        complemento: "Sala 1001",
        principal: false
      }
    ],
    
    // Dados Bancários
    dadosBancarios: [
      {
        id: "1",
        numeroBanco: "001",
        nomeBanco: "Banco do Brasil",
        agencia: "1234-5",
        conta: "12345-6",
        tipoConta: "Corrente",
        contaPagamento: true
      },
      {
        id: "2",
        numeroBanco: "237",
        nomeBanco: "Banco Bradesco",
        agencia: "9876-5",
        conta: "54321-0",
        tipoConta: "Poupança",
        contaPagamento: false
      }
    ],

    // Limites de Crédito
    limitesCredito: [
      {
        id: "1",
        numeroLimite: "LIM001234",
        dataInclusao: "15/12/2024",
        dataInicioVigencia: "01/01/2025",
        dataFimVigencia: "31/12/2025",
        tipoContrato: "CAPITAL DE GIRO",
        valorConcedido: "R$ 1.500,00",
        percentualJurosConcedido: "1,50",
        prazoMinimoVencimento: "20",
        prazoMaximoVencimento: "60",
        tipoTarifa: "Valor fixo",
        tarifa: "R$ 500,00",
        parcelaMinima: "R$ 150,00",
        parcelaMaxima: "R$ 300,00",
        modalidade: "CDC",
        observacoes: "Limite aprovado para pessoa física"
      },
      {
        id: "2",
        numeroLimite: "LIM005678",
        dataInclusao: "20/11/2024",
        dataInicioVigencia: "01/12/2024",
        dataFimVigencia: "30/11/2025",
        tipoContrato: "CARTÃO DE CRÉDITO",
        valorConcedido: "R$ 2.500,00",
        percentualJurosConcedido: "2,80",
        prazoMinimoVencimento: "30",
        prazoMaximoVencimento: "90",
        tipoTarifa: "Percentual",
        tarifa: "1,2%",
        parcelaMinima: "R$ 200,00",
        parcelaMaxima: "R$ 500,00",
        modalidade: "ROT",
        observacoes: "Limite complementar aprovado"
      }
    ]
  });

  const handleSave = () => {
    // Aqui seria feita a chamada para a API para salvar os dados
    toast({
      title: "Dados salvos com sucesso!",
      description: "As informações do cliente foram atualizadas.",
    });
    setIsEditing(false);
  };

  const handleVoltar = () => {
    navigate('/clientes-cadastrados');
  };

  const updateEndereco = (index: number, field: string, value: string) => {
    const newEnderecos = [...clienteData.enderecos];
    newEnderecos[index] = { ...newEnderecos[index], [field]: value };
    setClienteData({ ...clienteData, enderecos: newEnderecos });
  };

  const updateDadoBancario = (index: number, field: string, value: string) => {
    const newDadosBancarios = [...clienteData.dadosBancarios];
    newDadosBancarios[index] = { ...newDadosBancarios[index], [field]: value };
    setClienteData({ ...clienteData, dadosBancarios: newDadosBancarios });
  };

  const updateLimiteCredito = (index: number, field: string, value: string) => {
    const newLimitesCredito = [...clienteData.limitesCredito];
    newLimitesCredito[index] = { ...newLimitesCredito[index], [field]: value };
    setClienteData({ ...clienteData, limitesCredito: newLimitesCredito });
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoltar}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detalhes do Cliente</h1>
              <p className="text-gray-600">{clienteData.nome}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        <Tabs defaultValue="pessoais" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="contato">Dados de Contato</TabsTrigger>
            <TabsTrigger value="enderecos">Endereços</TabsTrigger>
            <TabsTrigger value="bancarios">Dados Bancários</TabsTrigger>
            <TabsTrigger value="limites">Limites de Crédito</TabsTrigger>
          </TabsList>

          <TabsContent value="pessoais">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={clienteData.nome}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, nome: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="documento">Documento Federal</Label>
                    <Input
                      id="documento"
                      value={clienteData.documento}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, documento: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      value={clienteData.dataNascimento}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, dataNascimento: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rg">RG</Label>
                    <Input
                      id="rg"
                      value={clienteData.rg}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, rg: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sexo">Sexo</Label>
                    <Input
                      id="sexo"
                      value={clienteData.sexo}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, sexo: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="escolaridade">Escolaridade</Label>
                    <Input
                      id="escolaridade"
                      value={clienteData.escolaridade}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, escolaridade: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomeMae">Nome da Mãe</Label>
                    <Input
                      id="nomeMae"
                      value={clienteData.nomeMae}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, nomeMae: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estadoCivil">Estado Civil</Label>
                    <Input
                      id="estadoCivil"
                      value={clienteData.estadoCivil}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, estadoCivil: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nacionalidade">Nacionalidade</Label>
                    <Input
                      id="nacionalidade"
                      value={clienteData.nacionalidade}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, nacionalidade: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contato">
            <Card>
              <CardHeader>
                <CardTitle>Dados de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={clienteData.email}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone Celular</Label>
                    <Input
                      id="telefone"
                      value={clienteData.telefone}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, telefone: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enderecos">
            <Card>
              <CardHeader>
                <CardTitle>Endereços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clienteData.enderecos.map((endereco, index) => (
                    <div key={endereco.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Endereço {index + 1}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${endereco.principal ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {endereco.principal ? 'Principal' : 'Secundário'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>CEP</Label>
                          <Input 
                            value={endereco.cep} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'cep', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Logradouro</Label>
                          <Input 
                            value={endereco.logradouro} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'logradouro', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Bairro</Label>
                          <Input 
                            value={endereco.bairro} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'bairro', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Cidade</Label>
                          <Input 
                            value={endereco.cidade} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'cidade', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Estado</Label>
                          <Input 
                            value={endereco.estado} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'estado', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Complemento</Label>
                          <Input 
                            value={endereco.complemento} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'complemento', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bancarios">
            <Card>
              <CardHeader>
                <CardTitle>Dados Bancários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clienteData.dadosBancarios.map((banco, index) => (
                    <div key={banco.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Conta {index + 1}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${banco.contaPagamento ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {banco.contaPagamento ? 'Conta Pagamento' : 'Conta Secundária'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Número do Banco</Label>
                          <Input 
                            value={banco.numeroBanco} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'numeroBanco', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Nome do Banco</Label>
                          <Input 
                            value={banco.nomeBanco} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'nomeBanco', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Agência</Label>
                          <Input 
                            value={banco.agencia} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'agencia', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Conta</Label>
                          <Input 
                            value={banco.conta} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'conta', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Tipo de Conta</Label>
                          <Input 
                            value={banco.tipoConta} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'tipoConta', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limites">
            <Card>
              <CardHeader>
                <CardTitle>Limites de Crédito Importados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clienteData.limitesCredito.map((limite, index) => (
                    <div key={limite.id} className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-blue-900">Limite {index + 1}</h4>
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                          {limite.numeroLimite}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-blue-800">Data de Inclusão</Label>
                          <Input 
                            value={limite.dataInclusao} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'dataInclusao', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Data Início Vigência</Label>
                          <Input 
                            value={limite.dataInicioVigencia} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'dataInicioVigencia', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Data Fim Vigência</Label>
                          <Input 
                            value={limite.dataFimVigencia} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'dataFimVigencia', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Tipo de Contrato</Label>
                          <Input 
                            value={limite.tipoContrato} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'tipoContrato', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Valor Concedido</Label>
                          <Input 
                            value={limite.valorConcedido} 
                            disabled={!isEditing} 
                            className="bg-white font-medium"
                            onChange={(e) => updateLimiteCredito(index, 'valorConcedido', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Percentual de Juros Concedido (%)</Label>
                          <Input 
                            value={limite.percentualJurosConcedido} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'percentualJurosConcedido', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Prazo Mínimo para Vencimento</Label>
                          <Input 
                            value={limite.prazoMinimoVencimento} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'prazoMinimoVencimento', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Prazo Máximo para Vencimento</Label>
                          <Input 
                            value={limite.prazoMaximoVencimento} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'prazoMaximoVencimento', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Tipo de Tarifa (TC)</Label>
                          <Input 
                            value={limite.tipoTarifa} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'tipoTarifa', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Tarifa (TC)</Label>
                          <Input 
                            value={limite.tarifa} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'tarifa', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Parcela Mínima</Label>
                          <Input 
                            value={limite.parcelaMinima} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'parcelaMinima', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Parcela Máxima</Label>
                          <Input 
                            value={limite.parcelaMaxima} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'parcelaMaxima', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-blue-800">Modalidade</Label>
                          <Input 
                            value={limite.modalidade} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'modalidade', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                          <Label className="text-blue-800">Observações</Label>
                          <Input 
                            value={limite.observacoes} 
                            disabled={!isEditing} 
                            className="bg-white"
                            onChange={(e) => updateLimiteCredito(index, 'observacoes', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
