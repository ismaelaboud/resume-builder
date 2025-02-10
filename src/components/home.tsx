import React, { useState } from "react";
import html2pdf from "html2pdf.js";
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

  const handleExport = () => {
    const resumeElement = document.querySelector(".resume-preview"); // Ensure this is the correct selector for the right panel
    if (!resumeElement) return;

    const options = {
      margin: 10,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(resumeElement).save();
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <header className="border-b p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
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
              onTemplateChange={setSelectedTemplate}
              onColorSchemeChange={setColorScheme}
            />
          </div>
        )}

        <div className="resume-preview bg-white p-6 rounded shadow-lg max-w-[21cm] mx-auto">
          {/* Resume content (right panel) goes here */}
          <h2 className="text-3xl font-bold">{sections[0]?.content?.name}</h2>
          <p>
            {sections[0]?.content?.email} | {sections[0]?.content?.phone}
          </p>

          <h3 className="text-xl font-semibold mt-4">Work Experience</h3>
          <p className="font-bold">{sections[1]?.content?.company}</p>
          <p>
            {sections[1]?.content?.position} ({sections[1]?.content?.duration})
          </p>
          <p>{sections[1]?.content?.description}</p>

          <h3 className="text-xl font-semibold mt-4">Education</h3>
          <p className="font-bold">{sections[2]?.content?.school}</p>
          <p>
            {sections[2]?.content?.degree} ({sections[2]?.content?.year})
          </p>

          <h3 className="text-xl font-semibold mt-4">Skills</h3>
          <p>{sections[3]?.content?.skills.join(", ")}</p>
        </div>

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
