
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ExpandableSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function ExpandableSection({ title, isOpen, onToggle, children }: ExpandableSectionProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-300 cursor-pointer p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-800 text-xl font-bold flex items-center gap-3">
                {title}
              </CardTitle>
              <ChevronDown className={`w-6 h-6 text-slate-600 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-6">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
