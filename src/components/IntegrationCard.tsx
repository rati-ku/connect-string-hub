
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";

export interface IntegrationCardProps {
  name: string;
  description: string;
  logo: React.ReactNode;
  productUrl?: string;
  docsUrl?: string;
  connectionStringFn?: (host: string, port: string, email: string) => string;
  connectionConfigFn?: (host: string, port: string, email: string) => string;
  downloadHandler?: () => Promise<void>;
  onCopyString?: () => void;
  onDownloadConfig?: () => void;
}

const IntegrationCard = ({
  name,
  description,
  logo,
  productUrl,
  docsUrl,
  connectionStringFn,
  connectionConfigFn,
  downloadHandler,
  onCopyString,
  onDownloadConfig,
}: IntegrationCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        {typeof logo === 'string' ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-16 h-16 object-contain"
          />
        ) : (
          logo
        )}
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-3">
        <div className="flex gap-4">
          {productUrl && (
            <Button variant="outline" className="w-full" asChild>
              <a href={productUrl} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Button>
          )}
          {docsUrl && (
            <Button variant="outline" className="w-full" asChild>
              <a href={docsUrl} target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </Button>
          )}
        </div>
        
        {connectionStringFn && onCopyString && (
          <Button 
            onClick={onCopyString} 
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Connection String
          </Button>
        )}
        
        {connectionConfigFn && onDownloadConfig && (
          <Button
            onClick={onDownloadConfig}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Connection Config
          </Button>
        )}

        {downloadHandler && (
          <Button
            onClick={downloadHandler}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Configuration
          </Button>
        )}
      </div>
    </Card>
  );
};

export default IntegrationCard;
