
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  username: string;
  password: string;
}

interface ResetPasswordFormData {
  email: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const resetForm = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    // Simular autenticação
    if (data.username && data.password) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o sistema...",
      });
      
      // Aqui você faria a autenticação real
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      toast({
        title: "Erro no login",
        description: "Por favor, verifique suas credenciais.",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    // Simular reset de senha
    if (data.email) {
      toast({
        title: "Link enviado!",
        description: "Verifique seu email para instruções de reset de senha.",
      });
      setIsResetting(false);
      resetForm.reset();
    } else {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://bmpteste.moneyp.com.br/styles/img/logo_bmp.png" 
            alt="BMP Logo" 
            className="h-12 w-auto mx-auto mb-4 filter brightness-0 invert"
          />
          <h1 className="text-2xl font-bold text-white">Sistema CAAS</h1>
          <p className="text-slate-300 mt-2">Faça login para continuar</p>
        </div>

        <Card className="shadow-2xl border-slate-600 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">
              {isResetting ? "Recuperar Senha" : "Entrar"}
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              {isResetting 
                ? "Digite seu email para receber instruções de recuperação"
                : "Digite suas credenciais para acessar o sistema"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isResetting ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuário</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              placeholder="Digite seu usuário"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Digite sua senha"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-slate-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-slate-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                  >
                    Entrar
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
                  <FormField
                    control={resetForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Digite seu email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                  >
                    Enviar Link de Recuperação
                  </Button>
                </form>
              </Form>
            )}

            <div className="space-y-2">
              {!isResetting ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => setIsResetting(true)}
                >
                  Esqueci minha senha
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-slate-600 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
                  onClick={() => setIsResetting(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao login
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-slate-400 text-sm">
          <p>&copy; 2024 BMP. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
