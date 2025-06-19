
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ReenviarLinkAssinaturaContent() {
  const [numeroProposta, setNumeroProposta] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (numeroProposta.trim()) {
      // Simular busca da proposta e reenvio do link
      console.log("Reenviando link de assinatura para proposta:", numeroProposta);
      // Aqui seria implementada a lógica de busca e reenvio
      // Por enquanto, vamos apenas mostrar uma mensagem
      alert(`Link de assinatura reenviado para a proposta ${numeroProposta}`);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reenviar Link de Assinatura</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Consultar Proposta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Informe o número da proposta"
              value={numeroProposta}
              onChange={(e) => setNumeroProposta(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600">
            Digite o número da proposta e clique na lupa para localizar e reenviar o link de assinatura.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
