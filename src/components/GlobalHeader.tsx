
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, User, ChevronDown, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GlobalHeaderProps {
  title: string;
  subtitle?: string;
}

export function GlobalHeader({ title, subtitle }: GlobalHeaderProps) {
  const handleAlterarSenha = () => {
    console.log("Alterar senha clicado");
  };

  const handleAlterarEmpresa = () => {
    console.log("Alterar empresa clicado");
  };

  const handleOpenDocs = () => {
    window.open("https://bmpdocs.moneyp.com.br/caas/sobre-o-caas", "_blank");
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-slate-600 hover:text-slate-900 hover:bg-slate-100" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
            {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search" 
              className="pl-10 w-64 border-slate-300 focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>59:51</span>
          </div>

          <Button
            variant="outline" 
            size="sm"
            onClick={handleOpenDocs}
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Docs
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">PERFIL</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border-slate-200 shadow-lg">
              <DropdownMenuItem onClick={handleAlterarSenha} className="text-slate-700 hover:bg-slate-50">
                Alterar senha
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAlterarEmpresa} className="text-slate-700 hover:bg-slate-50">
                Alterar empresa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
