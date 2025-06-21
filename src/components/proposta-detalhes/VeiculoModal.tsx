
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Veiculo {
  id: string;
  placa: string;
  chassi: string;
  anoFab: string;
  anoMod: string;
  descricao: string;
  proprietario: string;
  cpfCnpj: string;
  marca: string;
  modelo: string;
  versao: string;
  valorFipe: string;
  valorVeiculo: string;
  zeroKm: boolean;
  km: string;
  cor: string;
  tipoChissi: string;
  tipoRestricao: string;
  renavam: string;
  ufLicenciamento: string;
  numeroGravame: string;
  financiado: boolean;
  saldo: string;
  tipoPlaca: string;
  tipoVeiculo: string;
  pendenciaGravame: string;
  identificador: string;
  houveConsultaRenave: boolean;
}

interface VeiculoModalProps {
  veiculo: Veiculo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VeiculoModal({ veiculo, open, onOpenChange }: VeiculoModalProps) {
  const { toast } = useToast();

  const handleSalvar = () => {
    console.log('Salvando dados do veículo:', veiculo);
    toast({
      title: "Sucesso",
      description: "Dados do veículo atualizados com sucesso",
      variant: "default",
    });
    onOpenChange(false);
  };

  if (!veiculo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Editar Veículo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Primeira linha - Proprietário e CPF/CNPJ */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proprietario">Proprietário</Label>
              <Input
                id="proprietario"
                defaultValue={veiculo.proprietario}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpfCnpj">CPF/CNPJ Proprietário</Label>
              <Input
                id="cpfCnpj"
                defaultValue={veiculo.cpfCnpj}
                className="bg-gray-100"
              />
            </div>
          </div>

          {/* Segunda linha - Placa, UF, Marca */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="placa">Placa</Label>
              <Input
                id="placa"
                defaultValue={veiculo.placa}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ufPlaca">UF da Placa</Label>
              <Select defaultValue="SP">
                <SelectTrigger className="bg-gray-100">
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
              <Label htmlFor="marca">Marca</Label>
              <Input
                id="marca"
                defaultValue={veiculo.marca}
                className="bg-gray-100"
              />
            </div>
          </div>

          {/* Terceira linha - Modelo, Versão, Ano Fab, Ano Mod */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input
                id="modelo"
                defaultValue={veiculo.modelo}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="versao">Versão</Label>
              <Input
                id="versao"
                defaultValue={veiculo.versao}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anoFab">Ano Fab</Label>
              <Input
                id="anoFab"
                defaultValue={veiculo.anoFab}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anoMod">Ano Mod</Label>
              <Input
                id="anoMod"
                defaultValue={veiculo.anoMod}
                className="bg-gray-100"
              />
            </div>
          </div>

          {/* Quarta linha - Valor FIPE, Valor do Veículo, Zero KM, KM */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorFipe">Valor FIPE</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <Input
                  id="valorFipe"
                  defaultValue={veiculo.valorFipe.replace('R$ ', '')}
                  className="pl-8 bg-gray-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorVeiculo">Valor do Veículo</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <Input
                  id="valorVeiculo"
                  defaultValue={veiculo.valorVeiculo.replace('R$ ', '')}
                  className="pl-8 bg-gray-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Zero KM</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="zeroKm"
                  defaultChecked={veiculo.zeroKm}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="km">KM</Label>
              <Input
                id="km"
                defaultValue={veiculo.km}
                className="bg-gray-100"
              />
            </div>
          </div>

          {/* Quinta linha - Cor, Chassi, Tipo Chassi, Tipo Restrição */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cor">Cor</Label>
              <Input
                id="cor"
                defaultValue={veiculo.cor}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chassi">Chassi</Label>
              <Input
                id="chassi"
                defaultValue={veiculo.chassi}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoChassi">Tipo Chassi</Label>
              <Select defaultValue="2 - Normal">
                <SelectTrigger className="bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2 - Normal">2 - Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoRestricao">Tipo Restrição</Label>
              <Select defaultValue="Selecione">
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opcao1">Opção 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sexta linha - Renavam, UF Licenciamento, Número Gravame, Financiado */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="renavam">Renavam</Label>
              <Input
                id="renavam"
                defaultValue={veiculo.renavam}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ufLicenciamento">UF do Licenciamento</Label>
              <Select defaultValue="SP">
                <SelectTrigger className="bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SP">SP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeroGravame">Número de Gravame</Label>
              <Input
                id="numeroGravame"
                defaultValue={veiculo.numeroGravame}
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label>Financiado</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="financiado"
                  defaultChecked={veiculo.financiado}
                />
              </div>
            </div>
          </div>

          {/* Sétima linha - Saldo, Tipo Placa, Tipo Veículo */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="saldo">Saldo</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <Input
                  id="saldo"
                  defaultValue={veiculo.saldo.replace('R$ ', '')}
                  className="pl-8 bg-gray-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoPlaca">Tipo Placa</Label>
              <Select defaultValue="Carro">
                <SelectTrigger className="bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Carro">Carro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoVeiculo">Tipo Veículo</Label>
              <Select defaultValue="Particular">
                <SelectTrigger className="bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Particular">Particular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Oitava linha - Identificador */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="identificador">Identificador</Label>
              <Input
                id="identificador"
                defaultValue={veiculo.identificador}
                className="bg-gray-100"
              />
            </div>
          </div>

          {/* Nona linha - Pendência Gravame */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pendenciaGravame">Pendência Gravame</Label>
              <Textarea
                id="pendenciaGravame"
                defaultValue={veiculo.pendenciaGravame}
                className="bg-gray-100 min-h-[100px]"
              />
            </div>
          </div>

          {/* Décima linha - Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="houveConsultaRenave"
              defaultChecked={veiculo.houveConsultaRenave}
            />
            <Label htmlFor="houveConsultaRenave">Houve consulta Renave?</Label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
