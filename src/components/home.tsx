import React, { useState } from "react";
import EditorLayout from "./editor/EditorLayout";
import TemplateCustomizer from "./editor/TemplateCustomizer";
import ExportDialog from "./editor/ExportDialog";
import { Button } from "@/components/ui/button";
import { Download, Palette } from "lucide-react";

interface Section {
  id: string;
  type: "experience" | "education" | "skills";
  title: string;
  content: any;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
}

const defaultSections: Section[] = [
  {
    id: "0",
    type: "personal",
    title: "Personal Information",
    content: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
    },
  },
  {
    id: "1",
    type: "experience",
    title: "Work Experience",
    content: {
      company: "Example Corp",
      position: "Software Engineer",
      duration: "2020 - Present",
      description:
        "Led development of key features and maintained core systems",
    },
  },
  {
    id: "2",
    type: "education",
    title: "Education",
    content: {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      year: "2016 - 2020",
    },
  },
  {
    id: "3",
    type: "skills",
    title: "Skills",
    content: {
      skills: ["React", "TypeScript", "Node.js", "Python"],
    },
  },
];

const Home = () => {
  const [sections, setSections] = useState<Section[]>(defaultSections);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
    background: "#ffffff",
  });

  const handleExport = (format: string, options: any) => {
    const resumeContent =
      document.querySelector(".max-w-\\[21cm\\]")?.innerHTML;
    if (!resumeContent) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${sections.find((s) => s.type === "personal")?.content?.name || "Resume"}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
            .resume { max-width: 21cm; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="resume">${resumeContent}</div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${options.filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <header className="border-b p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowCustomizer(!showCustomizer)}
          >
            <Palette className="w-4 h-4 mr-2" />
            Customize
          </Button>
          <Button onClick={() => setShowExportDialog(true)}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <main className="flex-1 relative">
        <EditorLayout sections={sections} onSectionsChange={setSections} />

        {showCustomizer && (
          <div className="absolute right-4 top-4 z-10">
            <TemplateCustomizer
              selectedTemplate={selectedTemplate}
              colorScheme={colorScheme}
              onTemplateChange={setSelectedTemplate}
              onColorSchemeChange={setColorScheme}
            />
          </div>
        )}

        <ExportDialog
          open={showExportDialog}
          onOpenChange={setShowExportDialog}
          onExport={handleExport}
        />
      </main>
    </div>
  );
};

export default Home;
