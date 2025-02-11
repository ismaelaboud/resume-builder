import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import EditorLayout from "./editor/EditorLayout";
import TemplateCustomizer from "./editor/TemplateCustomizer";
import ExportDialog from "./editor/ExportDialog";
import { Button } from "@/components/ui/button";
import { Download, Palette } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getTemplate } from "./editor/templates";
import Navbar from "./layout/Navbar";

interface Section {
  id: string;
  type: "personal" | "summary" | "experience" | "education" | "skills";
  title: string;
  content: any;
  order: number;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
}

const createSectionsFromTemplate = (template) => {
  const contactParts = template.preview.contact.split(" | ");
  const sections = [
    {
      id: "0",
      type: "personal",
      title: "Personal Information",
      order: 0,
      content: {
        name: template.preview.name,
        email: contactParts[0],
        phone: contactParts[1],
        location: contactParts[2],
      },
    },
    {
      id: "summary",
      type: "summary",
      title: "Professional Summary",
      order: 1,
      content: {
        summary:
          template.preview.summary ||
          "A dedicated professional with expertise in...",
      },
    },
    ...template.preview.experience.map((exp, index) => ({
      id: `exp-${index}`,
      type: "experience",
      title: "Work Experience",
      order: 2,
      content: {
        company: exp.company,
        position: exp.title,
        duration: exp.duration,
        description: exp.description,
      },
    })),
    ...template.preview.education.map((edu, index) => ({
      id: `edu-${index}`,
      type: "education",
      title: "Education",
      order: 3,
      content: {
        school: edu.school,
        degree: edu.degree,
        year: edu.year,
      },
    })),
    {
      id: "skills",
      type: "skills",
      title: "Skills",
      order: 4,
      content: {
        skills: template.preview.skills,
      },
    },
  ];

  return sections.sort((a, b) => a.order - b.order);
};

const Home = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template");

  const [sections, setSections] = useState<Section[]>([]);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(
    templateId || "professional",
  );
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
    background: "#ffffff",
  });

  useEffect(() => {
    const template = getTemplate(templateId || "professional");
    setSections(createSectionsFromTemplate(template));
    setSelectedTemplate(template.id);
  }, [templateId]);

  const handleExport = () => {
    setShowExportDialog(true);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Navbar />
      <header className="border-b p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Resume Editor</h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setShowCustomizer(!showCustomizer)}
          >
            <Palette className="w-4 h-4 mr-2" />
            Customize
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
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
              onTemplateChange={(templateId) => {
                const template = getTemplate(templateId);
                setSelectedTemplate(templateId);
                setSections(createSectionsFromTemplate(template));
              }}
              onColorSchemeChange={setColorScheme}
            />
          </div>
        )}

        <ExportDialog
          open={showExportDialog}
          onOpenChange={setShowExportDialog}
          onExport={() => {
            const resumeElement = document.querySelector(".resume-preview");
            if (!resumeElement) return;

            const options = {
              margin: 10,
              filename: "resume.pdf",
              image: { type: "jpeg", quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { format: "a4", orientation: "portrait" },
            };

            html2pdf().set(options).from(resumeElement).save();
            setShowExportDialog(false);
          }}
        />
      </main>
    </div>
  );
};

export default Home;
