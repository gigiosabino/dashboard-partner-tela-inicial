
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
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-slate-600 hover:text-slate-900 hover:bg-slate-200" />
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Mensageria</h1>
              <p className="text-sm text-slate-600">Gerencie números bloqueados para mensagens</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Remover número da blocklist</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Digite o número com DDD (ex: 11987654321)"
                value={numeroRemover}
                onChange={(e) => setNumeroRemover(e.target.value)}
                className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
              />
            </div>

            <Button 
              onClick={handleRemover}
              disabled={!numeroRemover.trim()}
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white w-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remover da Blocklist
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
