
import { Drawer, DrawerContent } from "@/components/ui/drawer"

interface DocumentationDrawerProps {
  isOpen: boolean
  onClose: () => void
  url: string
}

const DocumentationDrawer = ({ isOpen, onClose, url }: DocumentationDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh]">
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
