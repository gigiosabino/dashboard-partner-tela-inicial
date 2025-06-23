
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  FileText,
  Phone,
  Users,
  Shield,
  FileCheck,
  MessageSquare,
  BarChart3,
  FileSpreadsheet,
  ChevronRight,
  Zap,
  Send,
  Receipt,
  Search,
  Upload,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Importações",
    icon: Upload,
    items: [
      { title: "Nova importação", url: "/nova-importacao" },
      { title: "Importações realizadas", url: "/importacoes-realizadas" },
    ]
  },
  {
    title: "Gestão de Clientes e Propostas",
    icon: FileText,
    items: [
      { title: "Clientes cadastrados", url: "/clientes-cadastrados" },
      { title: "Propostas contratadas", url: "/propostas" },
      { title: "Atualização de dados bancários", url: "/atualizar-dados-bancarios" },
      { title: "Cancelamento de proposta", url: "/cancelar-proposta" },
    ]
  },
  {
    title: "Gestão de callback",
    icon: Phone,
    items: [
      { title: "Histórico de envio", url: "/historico-envio" },
      { title: "Reenvio de callbacks", url: "/reenvio-callbacks" },
      { title: "Configuração de callbacks", url: "/configuracao-callbacks" },
    ]
  },
  {
    title: "Gestão de contratos",
    icon: FileCheck,
    items: [
      { title: "Visualizar contratos", url: "/visualizar-contratos" },
      { title: "Boletos", url: "/boletos" },
    ]
  },
  {
    title: "Ações rápidas",
    icon: Zap,
    items: [
      { title: "Reenviar link de assinatura", url: "/reenviar-link-assinatura" },
      { title: "Consultar registro de boleto", url: "/consultar-registro-boleto" },
      { title: "Consultar propostas", url: "/consulta-proposta" },
      { title: "Mensageria", url: "/mensageria" },
    ]
  },
  {
    title: "Relatórios CAAS",
    icon: BarChart3,
    items: [
      { title: "Relatórios de Serviços Integrados", url: "/relatorios-servicos" },
      { title: "Relatórios", url: "/relatorios-caas" },
    ]
  },
  {
    title: "Formalização de garantias",
    icon: Shield,
    items: [],
    url: "/formalizacao-garantias"
  },
  {
    title: "Gestão de acessos",
    icon: Users,
    items: [],
    url: "/gestao-acessos"
  },
];

export function AppSidebar() {
  const location = useLocation();

  const isActiveRoute = (url: string) => {
    if (url === '/') {
      return location.pathname === '/';
    }
    return location.pathname === url;
  };

  const hasActiveSubItem = (items: any[]) => {
    return items.some(item => isActiveRoute(item.url));
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center space-x-3">
          <img 
            src="https://bmpteste.moneyp.com.br/styles/img/logo_bmp.png" 
            alt="BMP Logo" 
            className="h-6 w-auto filter brightness-0 invert"
          />
        </div>
        <SidebarTrigger className="lg:hidden text-white hover:bg-gray-700" />
      </div>
      
      <SidebarContent className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`text-white hover:bg-gray-700 ${
                      isActiveRoute('/') 
                        ? 'bg-blue-600 border border-blue-500 shadow-lg' 
                        : ''
                    }`}
                  >
                    <Link to="/">
                      <BarChart3 className="w-4 h-4" />
                      <span>Início</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items.length > 0 ? (
                      <Collapsible defaultOpen={hasActiveSubItem(item.items)}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            className={`text-gray-100 hover:bg-gray-700 hover:text-white w-full transition-all duration-200 ${
                              hasActiveSubItem(item.items) ? 'bg-gray-700 text-white' : ''
                            }`}
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-left break-words leading-tight whitespace-normal flex-1 min-w-0">{item.title}</span>
                            <ChevronRight className="ml-auto w-4 h-4 transition-transform group-data-[state=open]:rotate-90 flex-shrink-0" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton 
                                  asChild 
                                  className={`text-gray-200 hover:text-white hover:bg-gray-600 text-sm transition-all duration-200 ${
                                    isActiveRoute(subItem.url) 
                                      ? 'bg-blue-600 text-white border-l-2 border-blue-400 font-medium' 
                                      : ''
                                  }`}
                                >
                                  <Link to={subItem.url} className="block py-2 px-4 rounded">
                                    <span className="whitespace-normal leading-tight break-words min-w-0 flex-1">{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        className={`text-gray-100 hover:bg-gray-700 hover:text-white transition-all duration-200 ${
                          item.url && isActiveRoute(item.url) 
                            ? 'bg-blue-600 text-white border border-blue-500 shadow-lg' 
                            : ''
                        }`}
                      >
                        {item.url ? (
                          <Link to={item.url} className="flex items-center">
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-normal leading-tight break-words flex-1 min-w-0">{item.title}</span>
                          </Link>
                        ) : (
                          <div className="flex items-center">
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-normal leading-tight break-words flex-1 min-w-0">{item.title}</span>
                          </div>
                        )}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
