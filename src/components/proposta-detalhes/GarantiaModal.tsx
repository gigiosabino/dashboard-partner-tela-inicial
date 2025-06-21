
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Garantia {
  id: string;
  grupo: string;
  subgrupo: string;
  valor: string;
  codigoGarantia?: string;
  codigoIdentificador?: string;
  valorTotal?: string;
  indicaProcessoConstituicao?: boolean;
  descricao?: string;
  [key: string]: any;
}

interface GarantiaModalProps {
  garantia: Garantia | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GarantiaModal({ garantia, open, onOpenChange }: GarantiaModalProps) {
  if (!garantia) return null;

  const renderBensImoveis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codigoGarantia">Código Garantia</Label>
          <Input
            id="codigoGarantia"
            value="e407efb2-cfa4-411c-97c7-2e9ea4309c61"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="codigoIdentificador">Código Identificador</Label>
          <Input
            id="codigoIdentificador"
            value="0b033c4e-8731-4a48-98ef-344e1c14d7a7"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grupo">Grupo</Label>
          <Input
            id="grupo"
            value="Bens Imóveis"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipoGarantia">Tipo Garantia</Label>
          <Input
            id="tipoGarantia"
            value="Prédio comercial"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="valorTotal">Valor Total da Garantia</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm">R$</span>
          <Input
            id="valorTotal"
            value="13.330,00"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações Imóvel</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="matriculaImovel">Matrícula do Imóvel</Label>
            <Input id="matriculaImovel" value="1234" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomeCartorio">Nome Cartório</Label>
            <Input id="nomeCartorio" placeholder="Nome cartório" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidadeCartorio">Cidade do Cartório</Label>
            <Input id="cidadeCartorio" placeholder="Cidade cartório" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numeroCadastroCartorio">Número de Cadastro do Cartório</Label>
            <Input id="numeroCadastroCartorio" value="9876" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="valorLeilao">Valor Leilão</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">R$</span>
              <Input id="valorLeilao" value="10.000,00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="areaTotalImovel">Área Total do Imóvel</Label>
            <div className="flex items-center gap-4">
              <Input id="areaTotalImovel" value="42" className="flex-1" />
              <div className="flex items-center space-x-2">
                <input type="radio" id="m2" name="area" defaultChecked />
                <Label htmlFor="m2">m2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="ha" name="area" />
                <Label htmlFor="ha">ha</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input id="cep" value="04.211-001" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rua">Rua</Label>
            <Input id="rua" value="Rua do logradouro" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro</Label>
            <Input id="bairro" value="Ipiranga" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numero">Número</Label>
            <Input id="numero" value="1234" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complemento">Complemento</Label>
            <Input id="complemento" value="12" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="uf">UF</Label>
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
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" value="São Paulo" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricaoImovel">Descrição</Label>
          <Textarea id="descricaoImovel" placeholder="string" className="min-h-[100px]" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onOpenChange(false)}>OK</Button>
      </div>
    </div>
  );

  const renderBensRurais = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codigoGarantia">Código Garantia</Label>
          <Input
            id="codigoGarantia"
            value="04fe963e-8d50-4159-8945-b0369f10663e"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="codigoIdentificador">Código Identificador</Label>
          <Input
            id="codigoIdentificador"
            value="2c49d937-356c-4681-945c-68bdbded7450"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grupo">Grupo</Label>
          <Input
            id="grupo"
            value="Bens Rurais"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipoGarantia">Tipo Garantia</Label>
          <Input
            id="tipoGarantia"
            value="Alienação Fiduciária"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="valorTotal">Valor Total da Garantia</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm">R$</span>
            <Input
              id="valorTotal"
              value="10.000,00"
              className="flex-1"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <Checkbox id="indicaProcesso" />
          <Label htmlFor="indicaProcesso">Indica Processo de Constituição</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea id="descricao" placeholder="Descrição" className="min-h-[100px]" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações dos Produtos</h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Safra</TableHead>
              <TableHead>Características</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Unidade Medida</TableHead>
              <TableHead>Acondicionamento</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead>Produção</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>CPR01681</TableCell>
              <TableCell>LEITE IN NATURA</TableCell>
              <TableCell>9258 - LEITE IN NATURA PADRÃO BÁSICO</TableCell>
              <TableCell>186 - 2023/2023</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Locais de Produção</h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Nome</TableHead>
              <TableHead>Matrícula</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>UF</TableHead>
              <TableHead>Cartório</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Fazenda são joão</TableCell>
              <TableCell>123</TableCell>
              <TableCell>Cesario Lange</TableCell>
              <TableCell>SP</TableCell>
              <TableCell>Cartório Y</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onOpenChange(false)}>OK</Button>
      </div>
    </div>
  );

  const renderBensMoveisMaquinas = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codigoGarantia">Código Garantia</Label>
          <Input
            id="codigoGarantia"
            value="60537415-53b9-4a87-85f9-9f89b0d6d5a5"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="codigoIdentificador">Código Identificador</Label>
          <Input
            id="codigoIdentificador"
            value="2dc31212-a869-4eaa-b4f8-47ea502d11a1"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grupo">Grupo</Label>
          <Input
            id="grupo"
            value="Bens Móveis"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipoGarantia">Tipo Garantia</Label>
          <Input
            id="tipoGarantia"
            value="Máquinas e equipamentos"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="valorTotal">Valor Total da Garantia</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm">R$</span>
          <Input
            id="valorTotal"
            value="10.000,00"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações Bens</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="marcaFabricante">Marca / Fabricante</Label>
            <Input id="marcaFabricante" value="Chevrolet" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo</Label>
            <Input id="modelo" value="Onix" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numeroSerie">Número de Série</Label>
            <Input id="numeroSerie" value="987.654.321" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numeroNotaFiscal">Número nota fiscal</Label>
            <Input id="numeroNotaFiscal" value="123.456.789" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricaoBens">Descrição</Label>
          <Textarea id="descricaoBens" value="TESTEEEEE" className="min-h-[100px]" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onOpenChange(false)}>OK</Button>
      </div>
    </div>
  );

  const renderBensMoveiVeiculo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codigoGarantia">Código Garantia</Label>
          <Input
            id="codigoGarantia"
            value="9f361fd8-81be-4474-8923-b75643c4ac38"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="codigoIdentificador">Código Identificador</Label>
          <Input
            id="codigoIdentificador"
            value="793770c2-b0b6-4bb0-be87-956a7988deae"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grupo">Grupo</Label>
          <Input
            id="grupo"
            value="Bens Imóveis"
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipoGarantia">Tipo Garantia</Label>
          <Input
            id="tipoGarantia"
            value="Veículo automotor terrestre, caminhão, automóvel, moto etc"
            readOnly
            className="bg-gray-100"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações Veículo</h3>
        
        <div className="space-y-2">
          <Label htmlFor="informacoesVeiculo">Informações Veículo</Label>
          <Input
            id="informacoesVeiculo"
            value="Caminhões e Micro-Ônibus"
            readOnly
            className="bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="marca">Marca</Label>
            <Input id="marca" value="Chevrolet" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo</Label>
            <Input id="modelo" value="Onix" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="anoFabMod">Ano Fab/Mod</Label>
            <Input id="anoFabMod" value="2021/2021" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="valorFipe">Valor Fipe</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">R$</span>
              <Input id="valorFipe" value="45.000,00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ufLicenciamento">UF Licenciamento</Label>
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

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tipoVeiculo">Tipo Veículo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="particular">Particular</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="placa">Placa</Label>
            <Input id="placa" value="DMA4C96" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="renavam">Renavam</Label>
            <Input id="renavam" value="312.321.321.321" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chassi">Chassi</Label>
            <Input id="chassi" value="31233123123JT2hk3P2JNJ3k" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoChassi">Tipo Chassi</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="remarcado">Remarcado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoRestricaoGravame">Tipo Restrição Gravame</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alienacao">Alienação Fiduciária</SelectItem>
                <SelectItem value="reserva">Reserva de Domínio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cor">Cor</Label>
            <Input id="cor" value="Vermelho" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kmVeiculo">KM Veículo</Label>
            <Input id="kmVeiculo" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informações de Financiamento</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="saldoFinanciamento">Saldo Financiamento</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">R$</span>
                <Input id="saldoFinanciamento" value="0,00" />
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Checkbox id="financiado" />
              <Label htmlFor="financiado">Financiado</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricaoVeiculo">Descrição</Label>
          <Textarea id="descricaoVeiculo" value="TESTEEEEE" className="min-h-[100px]" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onOpenChange(false)}>OK</Button>
      </div>
    </div>
  );

  const renderModalContent = () => {
    if (garantia.grupo === "Bens Imóveis" && garantia.subgrupo === "Prédio comercial") {
      return renderBensImoveis();
    }
    
    if (garantia.grupo === "Bens Rurais" && garantia.subgrupo === "Alienação Fiduciária") {
      return renderBensRurais();
    }
    
    if (garantia.grupo === "Bens Móveis" && garantia.subgrupo === "Máquinas e equipamentos") {
      return renderBensMoveisMaquinas();
    }
    
    if (garantia.grupo === "Bens Móveis" && garantia.subgrupo === "Veículo automotor terrestre, caminhão, automóvel, moto etc") {
      return renderBensMoveiVeiculo();
    }

    // Fallback para outros tipos
    return (
      <div className="space-y-4">
        <p>Detalhes da garantia: {garantia.grupo} - {garantia.subgrupo}</p>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>OK</Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Detalhes Garantia</DialogTitle>
        </DialogHeader>
        {renderModalContent()}
      </DialogContent>
    </Dialog>
  );
}
