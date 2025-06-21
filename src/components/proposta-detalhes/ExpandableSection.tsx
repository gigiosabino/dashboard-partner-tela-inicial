
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
    <Card className="border-slate-200 shadow-sm">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-900">{title}</CardTitle>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
