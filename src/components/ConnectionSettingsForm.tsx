
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ConnectionSettingsFormProps {
  host: string;
  port: string;
  email: string;
}

const ConnectionSettingsForm = ({
  host,
  port,
  email,
}: ConnectionSettingsFormProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const jdbcString = `jdbc:clickhouse://${host}:${port}/information_schema`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Connection Settings</h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-4 gap-2 items-center">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 truncate">Host</label>
            <div className="flex gap-2">
              <Input
                value={host}
                readOnly
                className="bg-gray-50 text-sm"
                placeholder="Host"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(host, "Host")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 truncate">Port</label>
            <div className="flex gap-2">
              <Input
                value={port}
                readOnly
                className="bg-gray-50 text-sm"
                placeholder="Port"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(port, "Port")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 truncate">Email</label>
            <div className="flex gap-2">
              <Input
                value={email}
                readOnly
                className="bg-gray-50 text-sm"
                placeholder="Email"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(email, "Email")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 truncate">JDBC String</label>
            <div className="flex gap-2">
              <Input
                value={jdbcString}
                readOnly
                className="bg-gray-50 text-sm"
                placeholder="JDBC String"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(jdbcString, "JDBC Connection String")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionSettingsForm;
