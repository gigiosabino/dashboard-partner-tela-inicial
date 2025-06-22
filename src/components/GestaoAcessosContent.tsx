
import { GlobalHeader } from "@/components/GlobalHeader";

export function GestaoAcessosContent() {
  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Gestão de Acessos" 
        subtitle="Gerencie usuários e permissões do sistema" 
      />

      <main className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Gestão de Acessos</h2>
          <p className="text-gray-600">Sistema de gestão de acessos em desenvolvimento</p>
        </div>
      </main>
    </div>
  );
}
