
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const bancos = [
  { codigo: "341", nome: "Itaú Unibanco" },
  { codigo: "033", nome: "Santander" },
  { codigo: "237", nome: "Bradesco" },
  { codigo: "104", nome: "Caixa Econômica Federal" },
  { codigo: "001", nome: "Banco do Brasil" }
];

interface BankSelectionFieldProps {
  selectedBanco: string;
  onSelect: (codigo: string) => void;
}

export function BankSelectionField({ selectedBanco, onSelect }: BankSelectionFieldProps) {
  const [open, setOpen] = useState(false);

  const getBancoDisplay = (codigo: string) => {
    const banco = bancos.find(b => b.codigo === codigo);
    return banco ? `${banco.codigo} - ${banco.nome}` : "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Banco:</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedBanco
              ? getBancoDisplay(selectedBanco)
              : "Selecione ou busque um banco..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar banco por nome ou código..." />
            <CommandList>
              <CommandEmpty>Nenhum banco encontrado.</CommandEmpty>
              <CommandGroup>
                {bancos.map((banco) => (
                  <CommandItem
                    key={banco.codigo}
                    value={`${banco.codigo} ${banco.nome}`}
                    onSelect={() => {
                      onSelect(banco.codigo);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedBanco === banco.codigo ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {banco.codigo} - {banco.nome}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
