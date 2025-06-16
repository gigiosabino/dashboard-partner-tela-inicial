
import { SidebarTrigger } from "@/components/ui/sidebar";
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
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Mensageria</h1>
              <p className="text-sm text-gray-600">Gerencie números bloqueados para mensagens</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <Phone className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold">Remover número da blocklist</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Digite o número com DDD (ex: 11987654321)"
                value={numeroRemover}
                onChange={(e) => setNumeroRemover(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Digite o número no formato: 11987654321
              </p>
            </div>

            <Button 
              onClick={handleRemover}
              disabled={!numeroRemover.trim()}
              className="bg-gray-600 hover:bg-gray-700 text-white w-full"
            >
              Remover da Blocklist
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
