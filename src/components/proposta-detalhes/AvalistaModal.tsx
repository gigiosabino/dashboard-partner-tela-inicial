
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Avalista {
  id: string;
  documentoFederal: string;
  nome: string;
  [key: string]: any;
}

interface AvalistaModalProps {
  avalista: Avalista | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AvalistaModal({ avalista, open, onOpenChange }: AvalistaModalProps) {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Sucesso",
      description: "Dados do avalista salvos com sucesso",
      variant: "default",
    });
    onOpenChange(false);
  };

  if (!avalista) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900 text-lg font-semibold">
            Editar Avalista
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Identificação Geral */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Identificação Geral</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpfCnpj" className="text-xs">CPF/CNPJ *</Label>
                <Input id="cpfCnpj" defaultValue={avalista.documentoFederal} className="text-sm" />
              </div>
              <div>
                <Label htmlFor="nome" className="text-xs">Nome/Razão *</Label>
                <Input id="nome" defaultValue={avalista.nome} className="text-sm" />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="cep" className="text-xs">CEP</Label>
                <Input id="cep" placeholder="00000-000" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="logradouro" className="text-xs">Logradouro</Label>
                <Input id="logradouro" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="numero" className="text-xs">Número</Label>
                <Input id="numero" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="complemento" className="text-xs">Complemento</Label>
                <Input id="complemento" className="text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bairro" className="text-xs">Bairro</Label>
                <Input id="bairro" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="cidade" className="text-xs">Cidade</Label>
                <Input id="cidade" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="uf" className="text-xs">UF</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="SP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">SP</SelectItem>
                    <SelectItem value="rj">RJ</SelectItem>
                    <SelectItem value="mg">MG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Pessoa Física */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Pessoa Física</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="dataNascimento" className="text-xs">Data Nascimento</Label>
                <Input id="dataNascimento" type="date" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="sexo" className="text-xs">Sexo</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Masculino</SelectItem>
                    <SelectItem value="f">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rg" className="text-xs">RG</Label>
                <Input id="rg" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="orgaoEmissor" className="text-xs">Órgão Emissor</Label>
                <Input id="orgaoEmissor" className="text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="ufEmissaoRg" className="text-xs">UF Emissão RG</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">SP</SelectItem>
                    <SelectItem value="rj">RJ</SelectItem>
                    <SelectItem value="mg">MG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dataEmissaoRg" className="text-xs">Data Emissão RG</Label>
                <Input id="dataEmissaoRg" type="date" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="nomeMae" className="text-xs">Nome Mãe</Label>
                <Input id="nomeMae" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="nomePai" className="text-xs">Nome Pai</Label>
                <Input id="nomePai" className="text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="estadoCivil" className="text-xs">Estado Civil</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solteiro">Solteiro</SelectItem>
                    <SelectItem value="casado">Casado</SelectItem>
                    <SelectItem value="divorciado">Divorciado</SelectItem>
                    <SelectItem value="viuvo">Viúvo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="escolaridade" className="text-xs">Escolaridade</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundamental">Fundamental</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="superior">Superior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="profissao" className="text-xs">Profissão</Label>
                <Input id="profissao" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="nacionalidade" className="text-xs">Nacionalidade</Label>
                <Input id="nacionalidade" defaultValue="BRASILEIRA" className="text-sm" />
              </div>
            </div>
          </div>

          {/* Dados do Cônjuge */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Dados do Cônjuge</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="cpfConjuge" className="text-xs">CPF</Label>
                <Input id="cpfConjuge" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="nomeConjuge" className="text-xs">Nome</Label>
                <Input id="nomeConjuge" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="rgConjuge" className="text-xs">RG</Label>
                <Input id="rgConjuge" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="rendaConjuge" className="text-xs">Renda</Label>
                <Input id="rendaConjuge" className="text-sm" />
              </div>
            </div>
          </div>

          {/* Dados Profissionais */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Dados Profissionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="empresa" className="text-xs">Empresa</Label>
                <Input id="empresa" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="cargo" className="text-xs">Cargo</Label>
                <Input id="cargo" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="rendaMensal" className="text-xs">Renda Mensal</Label>
                <Input id="rendaMensal" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="dataAdmissao" className="text-xs">Data de Admissão</Label>
                <Input id="dataAdmissao" type="date" className="text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="telefoneComercial" className="text-xs">Telefone Comercial</Label>
                <Input id="telefoneComercial" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="telefoneResidencial" className="text-xs">Telefone Residencial</Label>
                <Input id="telefoneResidencial" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="telefoneCelular" className="text-xs">Telefone Celular</Label>
                <Input id="telefoneCelular" defaultValue={avalista.telefone} className="text-sm" />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs">E-mail</Label>
                <Input id="email" type="email" defaultValue={avalista.email} className="text-sm" />
              </div>
            </div>
          </div>

          {/* Bancos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Bancos</h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="banco1" className="text-xs">Agência</Label>
                <Input id="banco1" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="conta1" className="text-xs">Conta</Label>
                <Input id="conta1" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="abertura1" className="text-xs">Abertura</Label>
                <Input id="abertura1" type="date" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="gerente1" className="text-xs">Gerente</Label>
                <Input id="gerente1" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="telefone1" className="text-xs">Telefone</Label>
                <Input id="telefone1" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="tipoTelefone1" className="text-xs">Tipo</Label>
                <Input id="tipoTelefone1" className="text-sm" />
              </div>
            </div>
          </div>

          {/* Referências Pessoais e Comerciais */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Referências Pessoais e Comerciais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nomeRef1" className="text-xs">Nome</Label>
                <Input id="nomeRef1" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="parentescoRef1" className="text-xs">Parentesco</Label>
                <Input id="parentescoRef1" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="telefoneRef1" className="text-xs">Telefone</Label>
                <Input id="telefoneRef1" className="text-sm" />
              </div>
            </div>
          </div>

          {/* Patrimônio (Bens Móveis e Imóveis) */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Patrimônio (Bens Móveis e Imóveis)</h3>
            <Textarea placeholder="Descreva o patrimônio..." className="text-sm min-h-[80px]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
