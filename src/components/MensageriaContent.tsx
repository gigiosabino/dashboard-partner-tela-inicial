
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
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-gray-600 hover:text-gray-900 hover:bg-gray-100" />
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
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Remover número da blocklist</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Digite o número com DDD (ex: 11987654321)"
                value={numeroRemover}
                onChange={(e) => setNumeroRemover(e.target.value)}
                className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            <Button 
              onClick={handleRemover}
              disabled={!numeroRemover.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remover da Blocklist
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
