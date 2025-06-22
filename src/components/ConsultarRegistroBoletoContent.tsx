
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobalHeader } from "@/components/GlobalHeader";

export function ConsultarRegistroBoletoContent() {
  const [linhaDigitavel, setLinhaDigitavel] = useState("");
  const [resultado, setResultado] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleConsultar = () => {
    if (linhaDigitavel.trim()) {
      console.log("Consultando boleto:", linhaDigitavel);
      // Simular consulta do boleto
      const mockResult = `{
  "Codigo": "2ebb73ed-0ebe-4a55-ba35-ee3ab64ecb2f",
  "NumeroCedente": 1020521,
  "DtInclusao": "2025-05-20 00:01:27",
  "TpPessoaPagdr": "F",
  "Cnpj_CPFPagdr": "23907310350",
  "Nom_RazSocPagdr": "ALEXIS",
  "NomFantsPagdr": null,
  "LogradPagdr": "RUA BENEDITO JANDIRO SOARES 64",
  "CidPagdr": "EMBUGUACU",
  "UfPagdr": "SP",
  "CepPagdr": "06900971",
  "CodCartTit": "1",
  "CodMoedaNAS": "09",
  "IdentRossaoNum": "47743",
  "NumCodBarras": "27498117000009070870001030000047743025109500",
  "NumLinhaDigtv1": "27490001019000000477430251095058117000009707",
  "DtVencTit": "2025-06-19 00:00:00",
  "VlrTit": 970.87,
  "NumDocTit": "47743",
  "NumeroDocumento": null,
  "CodEspTit": "4",
  "DtEmsTit": "2024-08-19 00:00:00",
  "DtLimPgtoTit": "2025-08-17 00:00:00",
  "IndrBloqPgto": "N",
  "VlrAbatTit": 0,
  "TpAutoRecbrVlrDivgrte": "3",
  "DtMovto": "2025-05-20 00:00:00",
  "NumIdentcTit": "302505300218386985",
  "DtHrDDA": "2025-05-30 15:00:49",
  "CodOperacaoCli": null,
  "DtSituacao": "2025-05-30 16:11:21",
  "MsgSituacao": null,
  "SituacaoBoleto": 2,
  "DadosJuros": {
    "DtJurosTit": "2025-06-20 00:00:00"
  }
}`;
      
      setResultado(mockResult);
      setShowResult(true);
    }
  };

  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Consultar Registro de Boleto" 
        subtitle="Consulte informações de boletos BMP" 
      />

      <main className="p-6 space-y-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <div className="text-yellow-600 font-medium">Aviso</div>
            </div>
            <p className="text-yellow-700 mt-1">
              Esta consulta está disponível apenas para boletos BMP.
            </p>
          </CardContent>
        </Card>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Linha Digitável</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Informe a linha digitável do boleto"
                value={linhaDigitavel}
                onChange={(e) => setLinhaDigitavel(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleConsultar}>
                Consultar
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResult && (
          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle>Retorno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-mono overflow-auto max-h-96">
                  {resultado}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
