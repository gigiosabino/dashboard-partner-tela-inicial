import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ClienteDetalhesContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data baseado no ID - exemplo de CNPJ com assinantes
  const getClienteData = (clienteId: string) => {
    if (clienteId === "4") {
      return {
        // Dados da Empresa (CNPJ)
        nome: "Nome do cliente",
        documento: "12.345.678/0001-00",
        dataNascimento: "01/06/2015", // Data de abertura da empresa
        rg: "",
        sexo: "",
        escolaridade: "",
        nomeMae: "",
        estadoCivil: "",
        nacionalidade: "Brasileira",
        
        // Dados de Contato
        email: "cliente@email.com",
        telefone: "(11) 3456-7890",
        
        // Endereços
        enderecos: [
          {
            id: "1",
            cep: "01310-100",
            logradouro: "Endereço do cliente, 1578",
            bairro: "Bela Vista",
            cidade: "São Paulo",
            estado: "SP",
            complemento: "Conj. 1405",
            principal: true
          }
        ],
        
        // Dados Bancários
        dadosBancarios: [
          {
            id: "1",
            numeroBanco: "237",
            nomeBanco: "Banco Bradesco",
            agencia: "0532-1",
            conta: "123456-7",
            tipoConta: "Corrente",
            contaPagamento: true
          }
        ],

        // Limites de Crédito
        limitesCredito: [
          {
            id: "1",
            numeroLimite: "LIM987654",
            dataInclusao: "10/12/2024",
            dataInicioVigencia: "01/01/2025",
            dataFimVigencia: "31/12/2025",
            tipoContrato: "CAPITAL DE GIRO",
            valorConcedido: "R$ 50.000,00",
            percentualJurosConcedido: "2,30",
            prazoMinimoVencimento: "30",
            prazoMaximoVencimento: "180",
            tipoTarifa: "Percentual",
            tarifa: "2,5%",
            parcelaMinima: "R$ 500,00",
            parcelaMaxima: "R$ 2.000,00",
            modalidade: "CDC",
            observacoes: "Limite aprovado para pessoa jurídica"
          }
        ],

        // Assinantes (somente para CNPJ)
        assinantes: [
          {
            id: "1",
            documentoFederal: "123.456.789-10",
            nome: "Nome do cliente",
            telefone: "(11) 99123-4567",
            email: "cliente@email.com",
            dataNascimento: "15/03/1980",
            papel: "Sócio Administrador",
            estadoCivil: "Casado",
            rg: "12.345.678-9",
            banco: "Banco do Brasil",
            endereco: {
              logradouro: "Endereço do cliente",
              numero: "456",
              complemento: "Apto 201",
              bairro: "Centro",
              cidade: "São Paulo",
              estado: "SP",
              cep: "01234-567"
            },
            ordemAssinatura: "1"
          },
          {
            id: "2",
            documentoFederal: "123.456.789-10",
            nome: "Nome do cliente",
            telefone: "(11) 99987-6543",
            email: "cliente@email.com",
            dataNascimento: "22/07/1985",
            papel: "Sócia",
            estadoCivil: "Solteira",
            rg: "98.765.432-1",
            banco: "Itaú",
            endereco: {
              logradouro: "Endereço do cliente",
              numero: "1000",
              complemento: "Cobertura",
              bairro: "Bela Vista",
              cidade: "São Paulo",
              estado: "SP",
              cep: "01310-100"
            },
            ordemAssinatura: "2"
          }
        ]
      };
    }
    
    // Retorna dados padrão para CPF
    return {
      // Dados Pessoais
      nome: "Nome do cliente",
      documento: "123.456.789-10",
      dataNascimento: "15/03/1985",
      rg: "12.345.678-9",
      sexo: "Masculino",
      escolaridade: "Superior Completo",
      nomeMae: "Nome da mãe do cliente",
      estadoCivil: "Solteiro",
      nacionalidade: "Brasileira",
      
      // Dados de Contato
      email: "cliente@email.com",
      telefone: "(11) 99999-9999",
      
      // Endereços
      enderecos: [
        {
          id: "1",
          cep: "01234-567",
          logradouro: "Endereço do cliente, 123",
          bairro: "Centro",
          cidade: "São Paulo",
          estado: "SP",
          complemento: "Apto 45",
          principal: true
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
        }
      ],

      assinantes: []
    };
  };

  const [clienteData, setClienteData] = useState(getClienteData(id || "1"));

  // Verifica se é CNPJ
  const isCNPJ = clienteData.documento.includes("/");

  const handleSave = () => {
    // Aqui seria feita a chamada para a API para salvar os dados
    toast({
      title: "Dados salvos com sucesso!",
      description: "As informações do cliente foram atualizadas.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restaura os dados originais cancelando as alterações
    setClienteData(getClienteData(id || "1"));
    setIsEditing(false);
    toast({
      title: "Edição cancelada",
      description: "As alterações foram descartadas.",
    });
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

  const updateAssinante = (index: number, field: string, value: string) => {
    const newAssinantes = [...clienteData.assinantes];
    if (field.includes('endereco.')) {
      const enderecoField = field.split('.')[1];
      newAssinantes[index] = { 
        ...newAssinantes[index], 
        endereco: { ...newAssinantes[index].endereco, [enderecoField]: value }
      };
    } else {
      newAssinantes[index] = { ...newAssinantes[index], [field]: value };
    }
    setClienteData({ ...clienteData, assinantes: newAssinantes });
  };

  const tabsCount = isCNPJ ? 6 : 5;
  const gridCols = isCNPJ ? "grid-cols-6" : "grid-cols-5";

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
                  onClick={handleCancel}
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
          <TabsList className={`grid w-full ${gridCols}`}>
            <TabsTrigger value="pessoais">{isCNPJ ? 'Dados da Empresa' : 'Dados Pessoais'}</TabsTrigger>
            <TabsTrigger value="contato">Dados de Contato</TabsTrigger>
            <TabsTrigger value="enderecos">Endereços</TabsTrigger>
            <TabsTrigger value="bancarios">Dados Bancários</TabsTrigger>
            <TabsTrigger value="limites">Limites de Crédito</TabsTrigger>
            {isCNPJ && <TabsTrigger value="assinantes">Assinantes</TabsTrigger>}
          </TabsList>

          <TabsContent value="pessoais">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{isCNPJ ? 'Dados da Empresa' : 'Dados Pessoais'}</CardTitle>
              </CardHeader>
              <div className="px-6">
                <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[2px]" />
              </div>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">{isCNPJ ? 'Razão Social' : 'Nome Completo'}</Label>
                    <Input
                      id="nome"
                      value={clienteData.nome}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, nome: e.target.value})}
                      className={!isEditing ? "bg-gray-100" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="documento">Documento Federal</Label>
                    <Input
                      id="documento"
                      value={clienteData.documento}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, documento: e.target.value})}
                      className={!isEditing ? "bg-gray-100" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataNascimento">{isCNPJ ? 'Data de Abertura' : 'Data de Nascimento'}</Label>
                    <Input
                      id="dataNascimento"
                      value={clienteData.dataNascimento}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, dataNascimento: e.target.value})}
                      className={!isEditing ? "bg-gray-100" : ""}
                    />
                  </div>
                  {!isCNPJ && (
                    <>
                      <div>
                        <Label htmlFor="rg">RG</Label>
                        <Input
                          id="rg"
                          value={clienteData.rg}
                          disabled={!isEditing}
                          onChange={(e) => setClienteData({...clienteData, rg: e.target.value})}
                          className={!isEditing ? "bg-gray-100" : ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sexo">Sexo</Label>
                        <Input
                          id="sexo"
                          value={clienteData.sexo}
                          disabled={!isEditing}
                          onChange={(e) => setClienteData({...clienteData, sexo: e.target.value})}
                          className={!isEditing ? "bg-gray-100" : ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="escolaridade">Escolaridade</Label>
                        <Input
                          id="escolaridade"
                          value={clienteData.escolaridade}
                          disabled={!isEditing}
                          onChange={(e) => setClienteData({...clienteData, escolaridade: e.target.value})}
                          className={!isEditing ? "bg-gray-100" : ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nomeMae">Nome da Mãe</Label>
                        <Input
                          id="nomeMae"
                          value={clienteData.nomeMae}
                          disabled={!isEditing}
                          onChange={(e) => setClienteData({...clienteData, nomeMae: e.target.value})}
                          className={!isEditing ? "bg-gray-100" : ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="estadoCivil">Estado Civil</Label>
                        <Input
                          id="estadoCivil"
                          value={clienteData.estadoCivil}
                          disabled={!isEditing}
                          onChange={(e) => setClienteData({...clienteData, estadoCivil: e.target.value})}
                          className={!isEditing ? "bg-gray-100" : ""}
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <Label htmlFor="nacionalidade">Nacionalidade</Label>
                    <Input
                      id="nacionalidade"
                      value={clienteData.nacionalidade}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, nacionalidade: e.target.value})}
                      className={!isEditing ? "bg-gray-100" : ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contato">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Dados de Contato</CardTitle>
              </CardHeader>
              <div className="px-6">
                <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[2px]" />
              </div>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={clienteData.email}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, email: e.target.value})}
                      className={!isEditing ? "bg-gray-100" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone Celular</Label>
                    <Input
                      id="telefone"
                      value={clienteData.telefone}
                      disabled={!isEditing}
                      onChange={(e) => setClienteData({...clienteData, telefone: e.target.value})}
                      className={!isEditing ? "bg-gray-100" : ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enderecos">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Endereços</CardTitle>
              </CardHeader>
              <div className="px-6">
                <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[2px]" />
              </div>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {clienteData.enderecos.map((endereco, index) => (
                    <div key={endereco.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Endereço {index + 1}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${endereco.principal ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {endereco.principal ? 'Principal' : 'Secundário'}
                        </span>
                      </div>
                      <div className="px-2 mb-4">
                        <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[1px]" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>CEP</Label>
                          <Input 
                            value={endereco.cep} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'cep', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Logradouro</Label>
                          <Input 
                            value={endereco.logradouro} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'logradouro', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Bairro</Label>
                          <Input 
                            value={endereco.bairro} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'bairro', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Cidade</Label>
                          <Input 
                            value={endereco.cidade} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'cidade', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Estado</Label>
                          <Input 
                            value={endereco.estado} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'estado', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Complemento</Label>
                          <Input 
                            value={endereco.complemento} 
                            disabled={!isEditing}
                            onChange={(e) => updateEndereco(index, 'complemento', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
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
              <CardHeader className="pb-3">
                <CardTitle>Dados Bancários</CardTitle>
              </CardHeader>
              <div className="px-6">
                <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[2px]" />
              </div>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {clienteData.dadosBancarios.map((banco, index) => (
                    <div key={banco.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Conta {index + 1}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${banco.contaPagamento ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {banco.contaPagamento ? 'Conta Pagamento' : 'Conta Secundária'}
                        </span>
                      </div>
                      <div className="px-2 mb-4">
                        <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[1px]" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Número do Banco</Label>
                          <Input 
                            value={banco.numeroBanco} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'numeroBanco', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Nome do Banco</Label>
                          <Input 
                            value={banco.nomeBanco} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'nomeBanco', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Agência</Label>
                          <Input 
                            value={banco.agencia} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'agencia', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Conta</Label>
                          <Input 
                            value={banco.conta} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'conta', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Tipo de Conta</Label>
                          <Input 
                            value={banco.tipoConta} 
                            disabled={!isEditing}
                            onChange={(e) => updateDadoBancario(index, 'tipoConta', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
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
              <CardHeader className="pb-3">
                <CardTitle>Limites de Crédito Importados</CardTitle>
              </CardHeader>
              <div className="px-6">
                <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[2px]" />
              </div>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {clienteData.limitesCredito.map((limite, index) => (
                    <div key={limite.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">{limite.modalidade}</h4>
                      </div>
                      <div className="px-2 mb-4">
                        <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[1px]" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Label>Data de Inclusão</Label>
                          <Input 
                            value={limite.dataInclusao} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'dataInclusao', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Data Início Vigência</Label>
                          <Input 
                            value={limite.dataInicioVigencia} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'dataInicioVigencia', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Data Fim Vigência</Label>
                          <Input 
                            value={limite.dataFimVigencia} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'dataFimVigencia', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Tipo de Contrato</Label>
                          <Input 
                            value={limite.tipoContrato} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'tipoContrato', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Valor Concedido</Label>
                          <Input 
                            value={limite.valorConcedido} 
                            disabled={!isEditing} 
                            className={`font-medium ${!isEditing ? "bg-gray-100" : ""}`}
                            onChange={(e) => updateLimiteCredito(index, 'valorConcedido', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Percentual de Juros Concedido (%)</Label>
                          <Input 
                            value={limite.percentualJurosConcedido} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'percentualJurosConcedido', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Prazo Mínimo para Vencimento</Label>
                          <Input 
                            value={limite.prazoMinimoVencimento} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'prazoMinimoVencimento', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Prazo Máximo para Vencimento</Label>
                          <Input 
                            value={limite.prazoMaximoVencimento} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'prazoMaximoVencimento', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Tipo de Tarifa (TC)</Label>
                          <Input 
                            value={limite.tipoTarifa} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'tipoTarifa', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Tarifa (TC)</Label>
                          <Input 
                            value={limite.tarifa} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'tarifa', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Parcela Mínima</Label>
                          <Input 
                            value={limite.parcelaMinima} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'parcelaMinima', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Parcela Máxima</Label>
                          <Input 
                            value={limite.parcelaMaxima} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'parcelaMaxima', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div>
                          <Label>Modalidade</Label>
                          <Input 
                            value={limite.modalidade} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'modalidade', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                          <Label>Observações</Label>
                          <Input 
                            value={limite.observacoes} 
                            disabled={!isEditing} 
                            onChange={(e) => updateLimiteCredito(index, 'observacoes', e.target.value)}
                            className={!isEditing ? "bg-gray-100" : ""}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isCNPJ && (
            <TabsContent value="assinantes">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Assinantes Cadastrados</CardTitle>
                </CardHeader>
                <div className="px-6">
                  <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[2px]" />
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {clienteData.assinantes.map((assinante, index) => (
                      <div key={assinante.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Assinante {index + 1} - {assinante.papel}</h4>
                          <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            Ordem: {assinante.ordemAssinatura}
                          </span>
                        </div>
                        <div className="px-2 mb-4">
                          <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[1px]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <Label>Documento Federal</Label>
                            <Input 
                              value={assinante.documentoFederal} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'documentoFederal', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>Nome</Label>
                            <Input 
                              value={assinante.nome} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'nome', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>Telefone/Celular</Label>
                            <Input 
                              value={assinante.telefone} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'telefone', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>E-mail</Label>
                            <Input 
                              value={assinante.email} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'email', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>Data de Nascimento</Label>
                            <Input 
                              value={assinante.dataNascimento} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'dataNascimento', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>Papel</Label>
                            <Input 
                              value={assinante.papel} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'papel', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>Estado Civil</Label>
                            <Input 
                              value={assinante.estadoCivil} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'estadoCivil', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>RG</Label>
                            <Input 
                              value={assinante.rg} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'rg', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                          <div>
                            <Label>Banco</Label>
                            <Input 
                              value={assinante.banco} 
                              disabled={!isEditing} 
                              onChange={(e) => updateAssinante(index, 'banco', e.target.value)}
                              className={!isEditing ? "bg-gray-100" : ""}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="font-medium mb-3">Endereço do Assinante</h5>
                          <div className="px-2 mb-4">
                            <Separator className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 h-[1px]" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <Label>Logradouro</Label>
                              <Input 
                                value={assinante.endereco.logradouro} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'endereco.logradouro', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                            <div>
                              <Label>Número</Label>
                              <Input 
                                value={assinante.endereco.numero} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'endereco.numero', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                            <div>
                              <Label>Complemento</Label>
                              <Input 
                                value={assinante.endereco.complemento || ""} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'endereco.complemento', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                            <div>
                              <Label>Bairro</Label>
                              <Input 
                                value={assinante.endereco.bairro} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'endereco.bairro', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                            <div>
                              <Label>Cidade</Label>
                              <Input 
                                value={assinante.endereco.cidade} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'endereco.cidade', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                            <div>
                              <Label>Estado</Label>
                              <Input 
                                value={assinante.endereco.estado} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'endereco.estado', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                            <div>
                              <Label>CEP</Label>
                              <Input 
                                value={assinante.endereco.cep} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'endereco.cep', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                            <div>
                              <Label>Ordem Assinatura</Label>
                              <Input 
                                value={assinante.ordemAssinatura} 
                                disabled={!isEditing} 
                                onChange={(e) => updateAssinante(index, 'ordemAssinatura', e.target.value)}
                                className={!isEditing ? "bg-gray-100" : ""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
