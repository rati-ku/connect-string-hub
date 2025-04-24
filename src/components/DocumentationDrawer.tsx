
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer"
import { ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentationDrawerProps {
  isOpen: boolean
  onClose: () => void
  url: string
}

const DocumentationDrawer = ({ isOpen, onClose, url }: DocumentationDrawerProps) => {
  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[80vh]">
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleOpenInNewTab}
            title="Open in new tab"
          >
            <ExternalLink className="h-5 w-5" />
          </Button>
          <DrawerClose asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              title="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </div>
        <iframe 
          src={url}
          className="w-full h-full border-0"
          title="Documentation"
        />
      </DrawerContent>
    </Drawer>
  )
}

export default DocumentationDrawer;
