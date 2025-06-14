
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
  BookOpen,
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
    title: "Propostas",
    icon: FileText,
    items: [
      { title: "Propostas", url: "/propostas" },
      { title: "Atualizar Dados Bancários", url: "/atualizar-dados-bancarios" },
      { title: "Cancelar proposta", url: "/cancelar-proposta" },
    ]
  },
  {
    title: "Gestão de callback",
    icon: Phone,
    items: []
  },
  {
    title: "Gestão de contratos",
    icon: FileCheck,
    items: []
  },
  {
    title: "Formalização de garantias",
    icon: Shield,
    items: []
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
    items: []
  },
  {
    title: "Relatórios de Serviços Integrados",
    icon: FileSpreadsheet,
    items: [],
    url: "/relatorios-servicos"
  },
  {
    title: "Docs",
    icon: BookOpen,
    items: [],
    url: "https://bmpdocs.moneyp.com.br/caas/sobre-o-caas",
    external: true
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
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link to={subItem.url} className="text-gray-300 hover:text-white hover:bg-gray-700">
                                    {subItem.title}
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
                          item.external ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <item.icon className="w-4 h-4" />
                              <span>{item.title}</span>
                            </a>
                          ) : (
                            <Link to={item.url}>
                              <item.icon className="w-4 h-4" />
                              <span>{item.title}</span>
                            </Link>
                          )
                        ) : (
                          <div>
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
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
