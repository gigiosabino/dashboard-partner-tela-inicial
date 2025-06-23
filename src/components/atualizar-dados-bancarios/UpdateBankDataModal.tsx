
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { BankSelectionField } from "./BankSelectionField";

interface UpdateBankDataModalProps {
  title: string;
  onSave: () => void;
}

export function UpdateBankDataModal({ title, onSave }: UpdateBankDataModalProps) {
  const [selectedBanco, setSelectedBanco] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  const [agencia, setAgencia] = useState("");
  const [digitoAgencia, setDigitoAgencia] = useState("");
  const [contaCorrente, setContaCorrente] = useState("");
  const [digitoConta, setDigitoConta] = useState("");
  const [documentoBeneficiario, setDocumentoBeneficiario] = useState("");
  const [nomeBeneficiario, setNomeBeneficiario] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    console.log("Salvando dados bancários:", {
      banco: selectedBanco,
      tipoConta,
      agencia,
      digitoAgencia,
      contaCorrente,
      digitoConta,
      documentoBeneficiario,
      nomeBeneficiario
    });
    onSave();
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Reset form
    setSelectedBanco("");
    setTipoConta("");
    setAgencia("");
    setDigitoAgencia("");
    setContaCorrente("");
    setDigitoConta("");
    setDocumentoBeneficiario("");
    setNomeBeneficiario("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md" size="sm">
          Atualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl border-slate-200 shadow-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <BankSelectionField 
            selectedBanco={selectedBanco}
            onSelect={setSelectedBanco}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Conta:</label>
              <Select value={tipoConta} onValueChange={setTipoConta}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corrente">Conta Corrente</SelectItem>
                  <SelectItem value="poupanca">Conta Poupança</SelectItem>
                  <SelectItem value="pagamento">Conta Pagamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Agência:</label>
              <Input
                placeholder="Digite a agência"
                value={agencia}
                onChange={(e) => setAgencia(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Dígito da Agência:</label>
              <Input
                placeholder="Digite o dígito"
                value={digitoAgencia}
                onChange={(e) => setDigitoAgencia(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Conta Corrente:</label>
              <Input
                placeholder="Digite a conta"
                value={contaCorrente}
                onChange={(e) => setContaCorrente(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Dígito da Conta:</label>
              <Input
                placeholder="Digite o dígito"
                value={digitoConta}
                onChange={(e) => setDigitoConta(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Documento Federal do Beneficiário:</label>
            <Input
              placeholder="Digite o documento"
              value={documentoBeneficiario}
              onChange={(e) => setDocumentoBeneficiario(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nome do Beneficiário:</label>
            <Input
              placeholder="Digite o nome do beneficiário"
              value={nomeBeneficiario}
              onChange={(e) => setNomeBeneficiario(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
