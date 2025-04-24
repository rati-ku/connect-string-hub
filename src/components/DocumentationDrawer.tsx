
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { X, ExternalLink } from "lucide-react"

interface DocumentationDrawerProps {
  isOpen: boolean
  onClose: () => void
  url: string
}

const DocumentationDrawer = ({ isOpen, onClose, url }: DocumentationDrawerProps) => {
  const openInNewTab = () => {
    window.open(url, '_blank')
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[80vh] relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-12 top-2 z-50"
          onClick={openInNewTab}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-50"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
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
