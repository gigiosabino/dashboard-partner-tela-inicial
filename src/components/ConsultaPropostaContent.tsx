
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ConsultaPropostaContent() {
  const [numeroProposta, setNumeroProposta] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (numeroProposta.trim()) {
      console.log("Redirecionando para proposta:", numeroProposta);
      navigate(`/propostas/${numeroProposta}`);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Consulta Proposta</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Buscar Proposta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Informe o número da proposta"
              value={numeroProposta}
              onChange={(e) => setNumeroProposta(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch} size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600">
            Digite o número da proposta e clique na lupa para acessar os detalhes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
