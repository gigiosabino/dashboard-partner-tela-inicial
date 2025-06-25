
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const suporteSchema = z.object({
  codigoParametro: z.string(),
  clientId: z.string(),
  empresa: z.string(),
  processo: z.string({
    required_error: "Por favor, selecione um processo.",
  }),
  assunto: z.string()
    .min(1, "Assunto é obrigatório.")
    .max(120, "Assunto deve ter no máximo 120 caracteres."),
  detalhes: z.string()
    .min(1, "Detalhes da solicitação são obrigatórios.")
    .max(750, "Detalhes devem ter no máximo 750 caracteres."),
});

type SuporteFormData = z.infer<typeof suporteSchema>;

const processosOptions = [
  "Atendimento ao parceiro - BMP Digital - Tecnologia",
  "Backoffice Cessão - Demandas operacionais",
  "Backoffice Conciliação - Demandas operacionais",
  "Backoffice Formalização - Demandas operacionais",
  "Demandas operacionais - Mesa de Crédito"
];

export function SuporteContent() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SuporteFormData>({
    resolver: zodResolver(suporteSchema),
    defaultValues: {
      codigoParametro: "PARAM_001",
      clientId: "CLIENT_12345",
      empresa: "BMP Digital",
      processo: "",
      assunto: "",
      detalhes: "",
    },
  });

  const onSubmit = async (data: SuporteFormData) => {
    setIsSubmitting(true);
    try {
      // Simular envio do chamado
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Dados do chamado:", data);
      
      toast({
        title: "Chamado criado com sucesso!",
        description: "Seu chamado foi enviado e você receberá um retorno em breve.",
      });
      
      // Reset do formulário após sucesso
      form.reset({
        codigoParametro: "PARAM_001",
        clientId: "CLIENT_12345",
        empresa: "BMP Digital",
        processo: "",
        assunto: "",
        detalhes: "",
      });
    } catch (error) {
      toast({
        title: "Erro ao criar chamado",
        description: "Ocorreu um erro ao enviar seu chamado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const assuntoLength = form.watch("assunto")?.length || 0;
  const detalhesLength = form.watch("detalhes")?.length || 0;

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <main className="p-6 space-y-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Novo Chamado de Suporte
            </CardTitle>
            <CardDescription>
              Preencha os campos abaixo para abrir um novo chamado de suporte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="codigoParametro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Parâmetro</FormLabel>
                        <FormControl>
                          <Input {...field} disabled className="bg-gray-100" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client ID</FormLabel>
                        <FormControl>
                          <Input {...field} disabled className="bg-gray-100" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="empresa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresa</FormLabel>
                        <FormControl>
                          <Input {...field} disabled className="bg-gray-100" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="processo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processo *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o processo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {processosOptions.map((processo) => (
                            <SelectItem key={processo} value={processo}>
                              {processo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assunto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assunto *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Digite o assunto do chamado"
                          maxLength={120}
                        />
                      </FormControl>
                      <div className="text-sm text-gray-500 text-right">
                        {assuntoLength}/120 caracteres
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="detalhes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalhes da Solicitação *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Descreva detalhadamente sua solicitação ou problema"
                          maxLength={750}
                          rows={6}
                        />
                      </FormControl>
                      <div className="text-sm text-gray-500 text-right">
                        {detalhesLength}/750 caracteres
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Enviando..." : "Enviar Chamado"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
