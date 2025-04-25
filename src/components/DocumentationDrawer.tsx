
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const DocumentationDrawer = ({
  isOpen,
  onClose,
  url
}: DocumentationDrawerProps) => {
  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Add theme=light parameter to the URL
  const urlWithTheme = new URL(url);
  urlWithTheme.searchParams.set('theme', 'light');

  return <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[80vh] flex flex-col">
        {/* Header section with buttons */}
        <div className="p-4 border-b flex justify-between items-center bg-background px-[16px] py-0">
          <div className="text-sm font-medium">docs.unistream.cloud</div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleOpenInNewTab} title="Open in new tab">
              <ExternalLink className="h-5 w-5" />
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose} title="Close">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
        </div>
        
        {/* Content section with iframe - now using urlWithTheme */}
        <div className="flex-1 overflow-hidden">
          <iframe src={urlWithTheme.toString()} className="w-full h-full border-0" title="Documentation" />
        </div>
      </DrawerContent>
    </Drawer>;
};

export default DocumentationDrawer;
