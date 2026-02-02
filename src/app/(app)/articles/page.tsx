import Link from "next/link";
import { articles } from "@/lib/articles-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticlesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <BookOpen className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">Career Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Expert advice and strategies to accelerate your job search.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.slug} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <div className="p-6 pt-0">
               <Button asChild className="w-full">
                <Link href={`/articles/${article.slug}`}>
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
