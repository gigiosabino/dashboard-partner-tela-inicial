
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  FileText,
  Phone,
  Users,
  Shield,
  FileCheck,
  Settings,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const menuItems = [
  {
    title: "Propostas",
    icon: FileText,
    items: [
      { title: "Propostas", url: "#" },
      { title: "Atualizar Dados Bancários", url: "#" },
      { title: "Cancelar proposta", url: "#" },
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
    items: []
  },
  {
    title: "Outros serviços",
    icon: Settings,
    items: []
  },
  {
    title: "Mensageria",
    icon: MessageSquare,
    items: []
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
                  <SidebarMenuButton className="text-white hover:bg-gray-700 bg-blue-600">
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="text-white hover:bg-gray-700">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
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
