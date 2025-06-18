
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
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Gestão de propostas",
    icon: FileText,
    items: [
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
    items: []
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
  {
    title: "Mensageria",
    icon: MessageSquare,
    items: [],
    url: "/mensageria"
  },
  {
    title: "Relatórios de Serviços Integrados",
    icon: FileSpreadsheet,
    items: [],
    url: "/relatorios-servicos"
  },
  {
    title: "Relatórios CAAS",
    icon: BarChart3,
    items: [],
    url: "/relatorios-caas"
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">BMP</span>
          </div>
          <span className="font-semibold text-gray-900">BMP</span>
        </div>
        <SidebarTrigger className="lg:hidden" />
      </div>
      
      <SidebarContent className="bg-gray-800 text-white">
        <div className="p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="text-white hover:bg-gray-700 bg-blue-600">
                    <Link to="/">
                      <BarChart3 className="w-4 h-4" />
                      <span>Início</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items.length > 0 ? (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="text-white hover:bg-gray-700 w-full">
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-left break-words leading-tight whitespace-normal flex-1 min-w-0">{item.title}</span>
                            <ChevronRight className="ml-auto w-4 h-4 transition-transform group-data-[state=open]:rotate-90 flex-shrink-0" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild className="text-white hover:text-white hover:bg-gray-700 text-sm">
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
                      <SidebarMenuButton asChild className="text-white hover:bg-gray-700">
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
