
import { Input } from "@/components/ui/input";

interface ConnectionSettingsFormProps {
  host: string;
  port: string;
  email: string;
  onHostChange: (value: string) => void;
  onPortChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const ConnectionSettingsForm = ({
  host,
  port,
  email,
  onHostChange,
  onPortChange,
  onEmailChange,
}: ConnectionSettingsFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Connection Settings</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium mb-2">Host</label>
          <Input
            value={host}
            onChange={(e) => onHostChange(e.target.value)}
            placeholder="Enter host"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Port</label>
          <Input
            value={port}
            onChange={(e) => onPortChange(e.target.value)}
            placeholder="Enter port"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter email"
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectionSettingsForm;
