
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, Copy } from "lucide-react";

interface IntegrationCard {
  name: string;
  description: string;
  logo: string;
  productUrl?: string;
  docsUrl?: string;
}

const Integrations = () => {
  const [host, setHost] = useState('20.215.192.107');
  const [port, setPort] = useState('8123');
  const [email, setEmail] = useState('ratiku@datamind.ge');

  const integrations: IntegrationCard[] = [
    {
      name: "DataGrip",
      description: "DataGrip is a powerful database IDE which is our top recommendation for working with the Unistream platform",
      logo: "/lovable-uploads/96defcf4-a2d1-4bd0-9bb5-4d17802b9551.png",
      productUrl: "https://www.jetbrains.com/datagrip/",
      docsUrl: "https://www.jetbrains.com/help/datagrip/",
    },
    {
      name: "DBeaver",
      description: "DBeaver PRO is a comprehensive database management and administration tool with an easy connection to Unistream platform",
      logo: "/lovable-uploads/2047513f-4379-4304-8a61-5e131f7948bc.png",
      productUrl: "https://dbeaver.io/",
      docsUrl: "https://dbeaver.com/docs/",
    },
    {
      name: "DbVisualizer",
      description: "DbVisualizer is a database tool with extended support for ClickHouse SQL",
      logo: "/lovable-uploads/98f9112e-0d6a-412b-b637-9367f7795e6c.png",
      productUrl: "https://www.dbvis.com/",
      docsUrl: "https://www.dbvis.com/docs/",
    },
    {
      name: "QStudio",
      description: "qStudio is a free SQL GUI for running SQL scripts and charting results",
      logo: "/lovable-uploads/7aabb7a8-26ee-4b38-bcf4-d4adbeeb1289.png",
      productUrl: "https://clickhouse.com/",
      docsUrl: "https://clickhouse.com/docs/",
    },
    {
      name: "Power BI",
      description: "Microsoft Power BI is an interactive data visualization software product developed by Microsoft with a primary focus on business intelligence",
      logo: "/lovable-uploads/7aabb7a8-26ee-4b38-bcf4-d4adbeeb1289.png",
      productUrl: "https://powerbi.microsoft.com/",
      docsUrl: "https://learn.microsoft.com/en-us/power-bi/",
    },
    {
      name: "Excel",
      description: "Microsoft Excel with ClickHouse integration enables powerful data analysis and visualization capabilities directly from your spreadsheets",
      logo: "/lovable-uploads/7aabb7a8-26ee-4b38-bcf4-d4adbeeb1289.png",
      productUrl: "https://www.microsoft.com/excel",
      docsUrl: "https://support.microsoft.com/excel",
    },
  ];

  const getConnectionString = () => {
    return `clickhouse://${host}:${port}/?user=${email}`;
  };

  const copyConnectionString = () => {
    navigator.clipboard.writeText(getConnectionString());
    toast.success("Connection string copied to clipboard!");
  };

  const downloadConnectionString = () => {
    const element = document.createElement("a");
    const file = new Blob([getConnectionString()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "connection-string.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Connection string downloaded!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Integration Hub</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Connection Settings</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium mb-2">Host</label>
            <Input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="Enter host"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Port</label>
            <Input
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter port"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Button onClick={copyConnectionString} className="w-full">
            <Copy className="w-4 h-4 mr-2" />
            Copy Connection String
          </Button>
          <Button onClick={downloadConnectionString} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Connection String
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={integration.logo}
                alt={`${integration.name} logo`}
                className="w-16 h-16 object-contain"
              />
              <h3 className="text-xl font-semibold">{integration.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{integration.description}</p>
            <div className="flex gap-4">
              {integration.productUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={integration.productUrl} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              )}
              {integration.docsUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer">
                    Documentation
                  </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
