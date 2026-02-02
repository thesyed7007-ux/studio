import { notFound } from "next/navigation";
import { articles } from "@/lib/articles-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">{article.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{article.description}</p>
        </div>
        <Card>
            <CardContent className="p-6 md:p-8">
                 <div className="prose prose-invert max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
                    {article.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('### ')) {
                            return <h3 key={index} className="text-xl font-semibold mt-6 mb-2 font-headline">{paragraph.replace('### ', '')}</h3>
                        }
                        if (paragraph.startsWith('- ')) {
                            const items = paragraph.split('\n- ').map(item => item.replace('- ', ''));
                            return (
                                <ul key={index} className="list-disc pl-5 space-y-2 my-4">
                                    {items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )
                        }
                        return <p key={index} className="mb-4 leading-7">{paragraph}</p>
                    })}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}
