
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { useState } from "react";

export function MensageriaContent() {
  const [numeroRemover, setNumeroRemover] = useState("");

  const handleRemover = () => {
    if (numeroRemover.trim()) {
      console.log("Removendo número da blocklist:", numeroRemover);
      setNumeroRemover("");
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Remover número da blocklist</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              placeholder="Digite o número com DDD (ex: 11987654321)"
              value={numeroRemover}
              onChange={(e) => setNumeroRemover(e.target.value)}
              className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600 text-slate-700"
            />
          </div>

          <Button 
            onClick={handleRemover}
            disabled={!numeroRemover.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Remover da Blocklist
          </Button>
        </div>
      </div>
    </div>
  );
}
