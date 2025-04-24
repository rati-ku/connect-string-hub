import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";
import JSZip from 'jszip';

interface IntegrationCard {
  name: string;
  description: string;
  logo: React.ReactNode;
  productUrl?: string;
  docsUrl?: string;
  connectionStringFn?: (host: string, port: string, email: string) => string;
  connectionConfigFn?: (host: string, port: string, email: string) => string;
  downloadHandler?: () => Promise<void>;
}

const DatagripLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="datagrip">
    <g clipPath="url(#clip0_472_6308)">
      <path d="M59.8855 9.96582L63.9998 36.1144L48.457 45.1658L45.5312 30.3544L59.8855 9.96582Z" fill="#9775F8"/>
      <path d="M59.8859 9.96571L37.0287 0L17.7373 16L45.5316 30.3543L59.8859 9.96571Z" fill="url(#paint0_linear_472_6308)"/>
      <path d="M43.246 63.9999L16.4574 27.9771L8.50311 33.2799L0.548828 57.1428L43.246 63.9999Z" fill="url(#paint1_linear_472_6308)"/>
      <path d="M48.2743 45.8055L29.5314 33.4627L0 29.5312L43.2457 63.9998L48.2743 45.8055Z" fill="url(#paint2_linear_472_6308)"/>
      <path d="M0 0.457031V29.5313L55.5886 48.6399L59.8857 9.9656L0 0.457031Z" fill="url(#paint3_linear_472_6308)"/>
      <path d="M51.7481 12.2515H12.251V51.7486H51.7481V12.2515Z" fill="black"/>
      <path d="M16.2734 17.3716H22.6734C27.7934 17.3716 31.3592 20.9373 31.3592 25.5087V25.6002C31.3592 30.1716 27.7934 33.7373 22.6734 33.7373H16.2734V17.3716ZM19.8392 20.663V30.5373H22.582C25.5077 30.5373 27.5192 28.5259 27.5192 25.6916V25.6002C27.5192 22.6744 25.5077 20.663 22.582 20.663H19.8392Z" fill="white"/>
      <path d="M31.999 25.6C31.999 20.9372 35.6562 17.0972 40.5933 17.0972C43.519 17.0972 45.3476 17.92 46.9933 19.3829L44.7076 22.1257C43.4276 21.0286 42.3305 20.48 40.4105 20.48C37.759 20.48 35.7476 22.7657 35.7476 25.6C35.7476 28.6172 37.759 30.8115 40.6847 30.8115C41.9647 30.8115 43.1533 30.4457 44.0676 29.8057V27.4286H40.4105V24.32H47.5419V31.4515C45.8962 32.9143 43.519 34.0115 40.5933 34.0115C35.4733 34.0115 31.999 30.4457 31.999 25.6Z" fill="white"/>
      <path d="M30.7196 44.3428H15.9082V46.8113H30.7196V44.3428Z" fill="white"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_472_6308" x1="37.5485" y1="16.1305" x2="42.5333" y2="3.70807" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9775F8"/>
        <stop offset="0.9516" stopColor="#22D88F"/>
      </linearGradient>
      <linearGradient id="paint1_linear_472_6308" x1="15.6046" y1="33.1528" x2="22.0768" y2="61.353" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9775F8"/>
        <stop offset="0.2142" stopColor="#689CCE"/>
        <stop offset="0.423" stopColor="#42BDAC"/>
        <stop offset="0.5897" stopColor="#2BD197"/>
        <stop offset="0.6935" stopColor="#22D88F"/>
      </linearGradient>
      <linearGradient id="paint2_linear_472_6308" x1="4.48" y1="31.1135" x2="60.5617" y2="62.0781" gradientUnits="userSpaceOnUse">
        <stop offset="0.0752688" stopColor="#22D88F"/>
        <stop offset="0.7204" stopColor="#9775F8"/>
      </linearGradient>
      <linearGradient id="paint3_linear_472_6308" x1="0" y1="24.5485" x2="56.3621" y2="24.5485" gradientUnits="userSpaceOnUse">
        <stop offset="0.0752688" stopColor="#22D88F"/>
        <stop offset="0.2658" stopColor="#5AB0B4"/>
        <stop offset="0.5645" stopColor="#B86CF2"/>
        <stop offset="1" stopColor="#FF59E6"/>
      </linearGradient>
      <clipPath id="clip0_472_6308">
        <rect width="64" height="64" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const DBeaverLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="dbeaver" aria-hidden="true">
    <circle cx="32" cy="32" r="31.5" fill="white"></circle>
    <path d="M31.0886 55.2907C25.5469 53.8929 20.6156 48.7447 15.8064 39.3685C8.94644 25.981 8.06759 13.7747 13.6898 10.0833C15.6159 8.88238 18.4258 8.92668 20.9159 10.1923C22.2976 10.8962 22.6907 11.3391 23.4792 13.0716C24.4484 15.2053 24.8268 17.649 24.9903 22.817L25.1412 27.5666L25.9175 25.7725C26.3447 24.7857 27.2065 23.0901 27.8339 21.9827C28.4613 20.8876 28.9764 19.6916 28.9764 19.3249C28.9764 18.9607 28.703 18.0083 28.3661 17.2036C27.7411 15.7073 27.641 14.8952 27.9071 13.5368C28.0595 12.7689 28.0612 12.7665 29.677 12.7665L31.2932 12.7655L32.3014 11.4514C33.439 9.965 35.6459 8.15375 37.5501 7.16937C38.6535 6.59352 39.1247 6.5 40.919 6.5C42.7695 6.5 43.1357 6.5785 44.1903 7.19891C44.8397 7.58281 45.3181 7.94949 45.2547 8.01348C45.1912 8.07746 44.5052 7.94309 43.7264 7.7157C41.7881 7.14723 39.8449 7.35148 37.8674 8.33094C33.1802 10.6541 28.4198 19.4052 30.2752 22.2598C30.5266 22.6487 31.1394 22.9957 32.0231 23.2541C33.4585 23.6749 34.1519 23.5641 32.9532 23.1044C30.4387 22.1422 30.9587 19.856 34.6377 15.697L36.7347 13.3271L36.5958 11.9712C36.4701 10.7431 36.5086 10.5856 37.0059 10.3174C37.6895 9.94827 38.8051 10.1567 39.6181 10.8071C40.3895 11.4199 42.7917 11.4765 44.8179 10.9324C45.5552 10.7326 46.8442 10.5682 47.6742 10.5657C49.095 10.563 49.2048 10.6039 49.3489 11.1785C49.4331 11.5156 49.4399 11.9561 49.364 12.1555C49.2881 12.3548 49.4563 13.0414 49.7375 13.6837C50.3698 15.1258 50.6066 18.5318 50.2038 20.4021C50.0481 21.1354 49.4861 22.6366 48.9539 23.749C47.6234 26.5052 47.5721 26.9236 48.3363 28.7447C49.6472 31.8701 50.6042 37.8501 50.3576 41.3201C50.2846 42.3413 49.9328 44.6177 49.574 46.365C48.8904 49.7365 48.9441 50.9177 49.8181 51.656C50.0188 51.8241 50.1843 52.3155 50.1843 52.7486C50.1843 53.6641 49.5007 54.3999 48.2557 54.8183C47.0888 55.212 44.5694 55.1677 43.3488 54.7295C41.8914 54.2102 40.6878 54.2693 39.6869 54.9074C38.935 55.3873 38.4541 55.4586 35.6588 55.5128C33.5032 55.5536 32.0214 55.4576 31.0449 55.2125L31.0886 55.2907ZM27.3779 46.6282C25.2076 40.2052 25.8814 32.9946 29.3528 25.4888L30.3977 23.2346L29.2796 22.2551L28.3007 24.3863C24.3214 33.0488 23.7111 40.6777 26.5625 46.3625C27.3168 47.8686 28.0004 49.0449 28.1273 49.0449C28.161 49.0449 27.8246 47.9645 27.3803 46.6455L27.3779 46.6282ZM46.0534 25.095L46.5661 23.803L46.4548 24.8785C46.3916 25.4913 46.4353 25.8629 46.5563 25.7398C46.756 25.5385 48.0138 22.3683 48.0138 22.0484C48.0138 21.9719 47.6818 22.1916 47.2741 22.5357C46.5197 23.1755 45.1648 23.6702 44.1493 23.6726C43.6366 23.6739 43.6024 23.7536 43.744 24.5979C44.0223 26.264 44.0956 26.3821 44.8328 26.3821C45.448 26.3821 45.5945 26.2273 46.0461 25.0901L46.0534 25.095Z" fill="#FCFBFB"></path>
  </svg>
);

const DbVisualizerLogo = () => (
  <img 
    src="/lovable-uploads/175f7a56-0a2c-4e0e-893b-69b295f4f552.png" 
    alt="DbVisualizer Logo" 
    className="w-16 h-16 object-contain"
  />
);

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
  
  // Add the missing copyConnectionString function
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

  const integrations: IntegrationCard[] = [
    {
      name: "DataGrip",
      description: "DataGrip is a powerful database IDE which is our top recommendation for working with the Unistream platform",
      logo: <DatagripLogo />,
      productUrl: "https://www.jetbrains.com/datagrip/",
      docsUrl: "https://www.jetbrains.com/help/datagrip/",
      connectionStringFn: getDatagripConnectionString
    },
    {
      name: "DBeaver",
      description: "DBeaver PRO is a comprehensive database management and administration tool with an easy connection to Unistream platform",
      logo: <DBeaverLogo />,
      productUrl: "https://dbeaver.io/",
      docsUrl: "https://dbeaver.com/docs/",
      connectionConfigFn: getDbeaverConfigJson
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
      </div>

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
