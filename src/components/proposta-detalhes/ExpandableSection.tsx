
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
    <Card className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800 text-lg font-semibold flex items-center gap-2">
                {title}
              </CardTitle>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
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
