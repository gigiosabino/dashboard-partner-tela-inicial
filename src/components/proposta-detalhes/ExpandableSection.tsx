
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
    <Card className="bg-white border border-gray-200 shadow-sm">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800 text-base font-medium text-left">
                {title}
              </CardTitle>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-4">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
