
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight, X } from 'lucide-react';
import forecastData from '@/lib/data/forecast.json';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';


const categoryColors: Record<string, string> = {
  Revenue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300',
  Cost: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300',
  Expansion: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300',
  Risk: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300',
  Efficiency: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300',
};

export default function AiRecommendations() {
  const [recommendations, setRecommendations] = useState(forecastData.aiRecommendations);
  const { toast } = useToast();

  const handleDismiss = (recId: string) => {
    setRecommendations(recommendations.filter(r => r.id !== recId));
    toast({
        title: "Recommendation Dismissed",
        description: "The insight has been archived."
    });
  }

  return (
    <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">AI Recommendations</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
                <Card key={rec.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <Badge className={cn(categoryColors[rec.category] || '')}>{rec.category}</Badge>
                             <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span>{rec.confidence}% Confidence</span>
                            </div>
                        </div>
                        <CardTitle className="pt-2">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4">
                         <div>
                            <p className="text-xs text-muted-foreground">Potential Impact</p>
                            <p className="font-bold text-green-600">{rec.impact}</p>
                        </div>
                        <div className="flex w-full gap-2">
                            <Button className="flex-1"><ArrowRight className="mr-2 h-4 w-4"/> Explore</Button>
                            <Button variant="outline" onClick={() => handleDismiss(rec.id)}><X className="mr-2 h-4 w-4"/> Dismiss</Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </section>
  );
}
