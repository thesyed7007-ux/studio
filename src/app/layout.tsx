import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CareerCopilot | AI Job Search & Career Platform",
  description: "Your all-in-one AI career platform. Get AI-powered resume building, smart job searching, interview prep, salary negotiation coaching, and more. Land your dream job faster with CareerCopilot.",
  keywords: ["AI career coach", "job search", "resume builder", "interview prep", "salary negotiation", "career advice", "job finder", "ATS resume"],
  openGraph: {
    title: "CareerCopilot | AI Job Search & Career Platform",
    description: "The ultimate AI-powered tool to streamline your job search and accelerate your career.",
    siteName: 'CareerCopilot',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CareerCopilot | AI Job Search & Career Platform",
    description: "Your all-in-one AI career platform. Get AI-powered resume building, smart job searching, interview prep, salary negotiation coaching, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <Script id="monetag-sw-registration">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                  console.log('Monetag service worker registration successful.');
                }, function(err) {
                  console.error('Monetag service worker registration failed: ', err);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
