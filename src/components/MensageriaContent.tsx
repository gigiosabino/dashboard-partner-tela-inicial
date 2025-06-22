
import { GlobalHeader } from "@/components/GlobalHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Search, Phone, AlertCircle, CheckCircle } from "lucide-react";

export function MensageriaContent() {
  const [numeroConsulta, setNumeroConsulta] = useState("");
  const [resultadoConsulta, setResultadoConsulta] = useState<{
    numero: string;
    estaNaBlocklist: boolean;
    consultado: boolean;
  } | null>(null);

  // Simulando uma blocklist - em produção viria de uma API
  const [blocklist, setBlocklist] = useState([
    "11999887766",
    "21988776655",
    "31977665544",
    "41966554433"
  ]);

  const consultarNumero = () => {
    if (!numeroConsulta.trim()) return;
    
    const numeroLimpo = numeroConsulta.replace(/\D/g, '');
    const estaNaBlocklist = blocklist.includes(numeroLimpo);
    
    setResultadoConsulta({
      numero: numeroLimpo,
      estaNaBlocklist,
      consultado: true
    });

    console.log(`Consultando número: ${numeroLimpo}`);
    console.log(`Está na blocklist: ${estaNaBlocklist}`);
  };

  const removerDaBlocklist = () => {
    if (!resultadoConsulta) return;
    
    setBlocklist(prev => prev.filter(num => num !== resultadoConsulta.numero));
    setResultadoConsulta({
      ...resultadoConsulta,
      estaNaBlocklist: false
    });

    console.log(`Número ${resultadoConsulta.numero} removido da blocklist`);
  };

  const formatarNumero = (numero: string) => {
    const numLimpo = numero.replace(/\D/g, '');
    if (numLimpo.length === 11) {
      return `(${numLimpo.slice(0, 2)}) ${numLimpo.slice(2, 7)}-${numLimpo.slice(7)}`;
    }
    return numero;
  };

  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Mensageria" 
        subtitle="Sistema de mensagens e comunicação" 
      />

      <main className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Consultar Número na Blocklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numero">Número do celular</Label>
                <div className="flex gap-2">
                  <Input
                    id="numero"
                    placeholder="Digite o número (ex: 11999887766)"
                    value={numeroConsulta}
                    onChange={(e) => setNumeroConsulta(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={consultarNumero} className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Consultar
                  </Button>
                </div>
              </div>

              {resultadoConsulta && resultadoConsulta.consultado && (
                <Card className={`mt-4 ${resultadoConsulta.estaNaBlocklist ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {resultadoConsulta.estaNaBlocklist ? (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        <div>
                          <p className="font-medium">
                            {formatarNumero(resultadoConsulta.numero)}
                          </p>
                          <p className={`text-sm ${resultadoConsulta.estaNaBlocklist ? 'text-red-600' : 'text-green-600'}`}>
                            {resultadoConsulta.estaNaBlocklist 
                              ? 'Número está na blocklist' 
                              : 'Número não está na blocklist'
                            }
                          </p>
                        </div>
                      </div>
                      
                      {resultadoConsulta.estaNaBlocklist && (
                        <Button 
                          onClick={removerDaBlocklist}
                          variant="destructive"
                          size="sm"
                        >
                          Remover
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Números na Blocklist</CardTitle>
            </CardHeader>
            <CardContent>
              {blocklist.length > 0 ? (
                <div className="space-y-2">
                  {blocklist.map((numero) => (
                    <div key={numero} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">{formatarNumero(numero)}</span>
                      <Button 
                        onClick={() => {
                          setBlocklist(prev => prev.filter(num => num !== numero));
                          console.log(`Número ${numero} removido da blocklist`);
                        }}
                        variant="outline" 
                        size="sm"
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Nenhum número na blocklist
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
