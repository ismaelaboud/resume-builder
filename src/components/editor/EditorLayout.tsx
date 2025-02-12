import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FormEditor from "./FormEditor";
import ResumePreview from "./ResumePreview";

interface Section {
  id: string;
  type: "personal" | "experience" | "education" | "skills";
  title: string;
  content: any;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
}

interface FontSettings {
  family: string;
  nameSize: string;
  sectionSize: string;
  bodySize: string;
}

interface EditorLayoutProps {
  sections?: Section[];
  onSectionsChange?: (sections: Section[]) => void;
  colorScheme?: ColorScheme;
  fontSettings?: FontSettings;
  template?: string;
}

const EditorLayout = ({
  sections = [],
  onSectionsChange = () => {},
  colorScheme = {
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
    background: "#ffffff",
  },
  fontSettings = {
    family: "Arial, sans-serif",
    nameSize: "2xl",
    sectionSize: "lg",
    bodySize: "base",
  },
  template = "professional",
}: EditorLayoutProps) => {
  const handleAddSection = (type: Section["type"]) => {
    const newSection: Section = {
      id: Math.random().toString(),
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: type === "skills" ? { skills: [] } : {},
    };
    onSectionsChange([...sections, newSection]);
  };

  const handleReorderSections = (reorderedSections: Section[]) => {
    onSectionsChange(reorderedSections);
  };

  const handleDeleteSection = (id: string) => {
    onSectionsChange(sections.filter((section) => section.id !== id));
  };

  return (
    <div className="h-full w-full bg-background">
      <div className="lg:hidden flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <FormEditor
            sections={sections}
            onAddSection={handleAddSection}
            onReorderSections={handleReorderSections}
            onDeleteSection={handleDeleteSection}
          />
        </div>
        <div className="h-[50vh] border-t">
          <ResumePreview
            sections={sections}
            template={template}
            colorScheme={colorScheme}
            fontSettings={fontSettings}
          />
        </div>
      </div>

      <div className="hidden lg:block h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <FormEditor
              sections={sections}
              onAddSection={handleAddSection}
              onReorderSections={handleReorderSections}
              onDeleteSection={handleDeleteSection}
            />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <ResumePreview
              sections={sections}
              template={template}
              colorScheme={colorScheme}
              fontSettings={fontSettings}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default EditorLayout;
