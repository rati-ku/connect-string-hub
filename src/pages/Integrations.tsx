import React, { useState } from 'react';
import { toast } from "sonner";
import JSZip from 'jszip';
import DatagripLogo from '@/components/logos/DatagripLogo';
import DBeaverLogo from '@/components/logos/DBeaverLogo';
import DbVisualizerLogo from '@/components/logos/DbVisualizerLogo';
import ConnectionSettingsForm from '@/components/ConnectionSettingsForm';
import IntegrationCard from '@/components/IntegrationCard';
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const Integrations = () => {
  const [host, setHost] = useState('20.215.192.107');
  const [port, setPort] = useState('8123');
  const [email, setEmail] = useState('ratiku@datamind.ge');

  const getDatagripConnectionString = (host: string, port: string, email: string) => {
    return `#DataSourceSettings#
#LocalDataSource: 🚀 Unistream 🚀 ${email}
#BEGIN#
<data-source source="LOCAL" name="🚀 Unistream 🚀 ${email}" read-only="true" uuid="02fd7e27-a3fe-4556-aa98-895e0579f665"><database-info product="ClickHouse" version="25.2.2.39" jdbc-version="4.2" driver-name="ClickHouse JDBC Driver" driver-version="0.6.3 (revision: a6a8a22)" dbms="CLICKHOUSE" exact-version="25.2.2.39" exact-driver-version="0.6"><identifier-quote-string>"</identifier-quote-string></database-info><case-sensitivity plain-identifiers="exact" quoted-identifiers="exact"/><driver-ref>clickhouse</driver-ref><synchronize>true</synchronize><jdbc-driver>com.clickhouse.jdbc.ClickHouseDriver</jdbc-driver><jdbc-url>jdbc:clickhouse://${host}:${port}/information_schema</jdbc-url><secret-storage>master_key</secret-storage><user-name>${email}</user-name><schema-mapping><introspection-scope><node kind="schema"><name qname="@"/><name qname="admin_Lake"/></node></introspection-scope></schema-mapping><load-sources>user_and_system_sources</load-sources><working-dir>$ProjectFileDir$</working-dir><driver-properties><property name="socket_timeout" value="300000"/></driver-properties><keep-alive enable="true"/><auto-close enable="true"/></data-source>
#END#`;
  };

  const getDbeaverConfigJson = (host: string, port: string, email: string) => {
    return JSON.stringify({
      "connections": {
        "com_clickhouse-1966696f1d1-268e0397aa0aa88a": {
          "provider": "clickhouse",
          "driver": "com_clickhouse",
          "name": `🚀 Unistream 🚀 ${email}`,
          "save-password": true,
          "read-only": true,
          "configuration": {
            "host": host,
            "port": port,
            "url": `jdbc:clickhouse://${host}:${port}`,
            "configurationType": "MANUAL",
            "type": "dev",
            "closeIdleConnection": true,
            "properties": {
              "socket_timeout": "300000"
            },
            "auth-model": "native"
          }
        }
      }
    }, null, 2);
  };
  
  const copyConnectionString = (connectionStringFn: (host: string, port: string, email: string) => string) => {
    const connectionString = connectionStringFn(host, port, email);
    navigator.clipboard.writeText(connectionString);
    toast.success("Connection string copied to clipboard!");
  };

  const downloadConnectionConfig = (connectionConfigFn: (host: string, port: string, email: string) => string) => {
    const element = document.createElement("a");
    const file = new Blob([connectionConfigFn(host, port, email)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "data-sources-unistream.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Connection configuration downloaded!");
  };

  const downloadDbVisualizer = async () => {
    try {
      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<DbVisualizer>
  <Databases>
    <Database id="j7fHKTe3i4YIsGfw4n06h">
      <Alias>&#x1f680; Unistream &#x1f680; ${email}</Alias>
      <Notes />
      <Url />
      <Driver>ClickHouse</Driver>
      <DriverId>3a386447-caec-406d-9021-abaefd9dcb98</DriverId>
      <Userid>${email}</Userid>
      <Profile>auto</Profile>
      <Type>clickhouse</Type>
      <Password />
      <ServerInfoFormat>1</ServerInfoFormat>
      <AutoDetectType>true</AutoDetectType>
      <Properties>
        <Property key="socket_timeout">300000</Property>
        <Property key="dbvis.ConnectionModeMigrated">true</Property>
        <Property key="dbvis.InlineEditorCommitBatchSize">1</Property>
        <Property key="dbvis.SQLCommanderMostRecentSchema">default</Property>
        <Property key="dbvis.TextToBinaryEncoding">UTF-8</Property>
      </Properties>
      <UrlFormat>0</UrlFormat>
      <UrlVariables>
        <Driver DriverId="3a386447-caec-406d-9021-abaefd9dcb98" TemplateId="clickhouse" DriverLabel="ClickHouse">
          <UrlVariable UrlVariableName="Server">${host}</UrlVariable>
          <UrlVariable UrlVariableName="Port">${port}</UrlVariable>
          <UrlVariable UrlVariableName="Database" />
        </Driver>
      </UrlVariables>
    </Database>
  </Databases>
  <Objects>
    <Database id="j7fHKTe3i4YIsGfw4n06h" />
  </Objects>
</DbVisualizer>`;

      const zip = new JSZip();
      zip.file("config251/dbvis.xml", xmlContent);

      const blob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 9 }
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "unistream.jar";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast.success(
        "DbVisualizer configuration downloaded! Import using: 'Tools > Import Connections'",
        { duration: 6000 }
      );

      setTimeout(() => {
        toast.info(
          `Connection configured with Host: ${host}, Port: ${port}, User: ${email}`,
          { duration: 5000 }
        );
      }, 1000);
    } catch (error) {
      console.error('Error creating JAR file:', error);
      toast.error("Failed to create configuration file. Please try again.");
    }
  };

  const integrations = [
    {
      name: "DataGrip",
      description: "DataGrip is a powerful database IDE which is our top recommendation for working with the Unistream platform",
      logo: <DatagripLogo />,
      productUrl: "https://www.jetbrains.com/datagrip/",
      docsUrl: "https://www.jetbrains.com/help/datagrip/",
      connectionStringFn: getDatagripConnectionString,
      onCopyString: () => copyConnectionString(getDatagripConnectionString)
    },
    {
      name: "DBeaver",
      description: "DBeaver PRO is a comprehensive database management and administration tool with an easy connection to Unistream platform",
      logo: <DBeaverLogo />,
      productUrl: "https://dbeaver.io/",
      docsUrl: "https://dbeaver.com/docs/",
      connectionConfigFn: getDbeaverConfigJson,
      onDownloadConfig: () => downloadConnectionConfig(getDbeaverConfigJson)
    },
    {
      name: "DbVisualizer",
      description: "DbVisualizer is a database tool with extended support for ClickHouse SQL. After downloading, import via Tools > Import Connections.",
      logo: <DbVisualizerLogo />,
      productUrl: "https://www.dbvis.com/",
      docsUrl: "https://www.dbvis.com/docs/",
      downloadHandler: downloadDbVisualizer
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Integration Hub</h1>
      
      <ConnectionSettingsForm
        host={host}
        port={port}
        email={email}
        onHostChange={setHost}
        onPortChange={setPort}
        onEmailChange={setEmail}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              {typeof integration.logo === 'string' ? (
                <img
                  src={integration.logo}
                  alt={`${integration.name} logo`}
                  className="w-16 h-16 object-contain"
                />
              ) : (
                integration.logo
              )}
              <h3 className="text-xl font-semibold">{integration.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{integration.description}</p>
            <div className="space-y-3">
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
              
              {integration.connectionStringFn && (
                <Button 
                  onClick={() => copyConnectionString(integration.connectionStringFn!)} 
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Connection String
                </Button>
              )}
              
              {integration.connectionConfigFn && (
                <Button
                  onClick={() => downloadConnectionConfig(integration.connectionConfigFn!)}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Connection Config
                </Button>
              )}

              {integration.downloadHandler && (
                <Button
                  onClick={integration.downloadHandler}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Configuration
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
