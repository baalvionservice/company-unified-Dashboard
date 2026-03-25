
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import CodeBlock from '@/components/code-block';
import { Button } from '@/components/ui/button';
import apiDocsData from '@/lib/data/api-docs.json';

export default function ApiDocsPage() {
  const { categories } = apiDocsData;

  return (
    <div className="flex min-h-screen">
      <aside className="fixed top-0 left-0 h-screen w-64 border-r bg-muted/40 p-6 hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">API Reference</h2>
        <nav className="space-y-4">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {category.endpoints.map((endpoint) => (
                  <li key={endpoint.path}>
                    <a href={`#${endpoint.method.toLowerCase()}${endpoint.path.replace(/\//g, '-').replace(/\{|\}/g, '')}`} className="hover:text-primary">
                      {endpoint.path}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">API Documentation</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Welcome to the Baalvion API. Integrate your applications with our platform.
            </p>
          </header>

          {categories.map((category) => (
            <section key={category.name} className="mb-16">
              <h2 id={category.name.toLowerCase()} className="text-2xl font-bold border-b pb-2 mb-6">
                {category.name}
              </h2>
              <div className="space-y-12">
                {category.endpoints.map((endpoint) => (
                  <article key={endpoint.path} id={`${endpoint.method.toLowerCase()}${endpoint.path.replace(/\//g, '-').replace(/\{|\}/g, '')}`}>
                    <div className="flex items-center gap-2">
                      <Badge className={endpoint.method === 'GET' ? 'bg-blue-600' : 'bg-green-600'}>{endpoint.method}</Badge>
                      <h3 className="text-xl font-semibold font-mono">{endpoint.path}</h3>
                    </div>
                    <p className="text-muted-foreground mt-2">{endpoint.description}</p>
                    
                    {endpoint.parameters.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Parameters</h4>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Required</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {endpoint.parameters.map(param => (
                                        <TableRow key={param.name}>
                                            <TableCell className="font-mono text-sm">{param.name}</TableCell>
                                            <TableCell className="font-mono text-sm">{param.type}</TableCell>
                                            <TableCell>{param.required ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{param.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Example Request</h4>
                        <CodeBlock code={endpoint.request} />
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Example Response</h4>
                        <CodeBlock code={endpoint.response} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
