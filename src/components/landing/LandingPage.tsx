import { Button } from "@/components/ui/button";
import { FileText, Palette, Download } from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              Create Professional Resumes in Minutes
            </h1>
            <p className="text-lg leading-8 text-muted-foreground mb-8">
              Build beautiful, ATS-friendly resumes with our easy-to-use
              builder. Choose from modern templates and customize your resume in
              real-time.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/builder">
                <Button size="lg" className="gap-2">
                  <FileText className="w-5 h-5" />
                  Start Building
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="gap-2">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to build a great resume
            </h2>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Modern Templates</h3>
                <p className="text-muted-foreground">
                  Choose from professionally designed templates that stand out
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Easy Customization
                </h3>
                <p className="text-muted-foreground">
                  Customize colors, fonts, and layouts with our intuitive editor
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
                <p className="text-muted-foreground">
                  Export your resume in PDF format, ready to send to employers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to build your resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get started for free and create a resume that gets you noticed.
            </p>
            <Link to="/builder">
              <Button size="lg" className="gap-2">
                <FileText className="w-5 h-5" />
                Create Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
