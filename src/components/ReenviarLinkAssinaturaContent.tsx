
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlobalHeader } from "@/components/GlobalHeader";

export function ReenviarLinkAssinaturaContent() {
  const [numeroProposta, setNumeroProposta] = useState("");
  const [reenviarModalOpen, setReenviarModalOpen] = useState(false);
  const [isReenviando, setIsReenviando] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (numeroProposta.trim()) {
      console.log("Reenviando link de assinatura para proposta:", numeroProposta);
      // Simular busca da proposta e abrir modal
      setReenviarModalOpen(true);
    }
  };

  const handleReenviarVia = async (metodo: string) => {
    setIsReenviando(true);
    
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Sucesso",
        description: `Link de assinatura reenviado via ${metodo} com sucesso`,
        variant: "default",
      });
      
      setReenviarModalOpen(false);
      setNumeroProposta("");
      
    } catch (error) {
      console.error('Erro ao reenviar link:', error);
      toast({
        title: "Erro",
        description: "Erro ao reenviar link de assinatura",
        variant: "destructive",
      });
    } finally {
      setIsReenviando(false);
    }
  };

  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Reenviar Link de Assinatura" 
        subtitle="Reenvie links de assinatura para propostas" 
      />

      <main className="p-6">
        <Card className="max-w-2xl bg-white border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-gray-900">Consultar Proposta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex space-x-2">
              <Input
                placeholder="Informe o número da proposta"
                value={numeroProposta}
                onChange={(e) => setNumeroProposta(e.target.value)}
                className="flex-1 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
              <Button onClick={handleSearch} size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-gray-600">
              Digite o número da proposta e clique na lupa para localizar e reenviar o link de assinatura.
            </p>
          </CardContent>
        </Card>

        {/* Modal para reenviar link */}
        <Dialog open={reenviarModalOpen} onOpenChange={setReenviarModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Notificar Assinante</DialogTitle>
              <DialogDescription className="text-gray-600">
                Escolha como deseja reenviar o link de assinatura para TESTE 2
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 py-6">
              <Button 
                variant="outline"
                onClick={() => handleReenviarVia('Email')}
                disabled={isReenviando}
                className="flex-1 justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 h-12"
              >
                {isReenviando ? 'ENVIANDO...' : 'EMAIL'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleReenviarVia('WhatsApp')}
                disabled={isReenviando}
                className="flex-1 justify-center border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 h-12"
              >
                {isReenviando ? 'ENVIANDO...' : 'WHATSAPP'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleReenviarVia('SMS')}
                disabled={isReenviando}
                className="flex-1 justify-center border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 h-12"
              >
                {isReenviando ? 'ENVIANDO...' : 'SMS'}
              </Button>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setReenviarModalOpen(false)}
                disabled={isReenviando}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                CANCELAR
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
