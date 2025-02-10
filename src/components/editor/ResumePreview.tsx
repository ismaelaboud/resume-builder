import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeSection {
  id: string;
  type: "personal" | "experience" | "education" | "skills";
  content: any;
}

interface ResumePreviewProps {
  sections?: ResumeSection[];
  template?: string;
  colorScheme?: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const defaultSections: ResumeSection[] = [
  {
    id: "1",
    type: "experience",
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
    content: {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      year: "2016 - 2020",
    },
  },
  {
    id: "3",
    type: "skills",
    content: {
      skills: ["React", "TypeScript", "Node.js", "Python"],
    },
  },
];

const defaultColorScheme = {
  primary: "#1a1a1a",
  secondary: "#4a4a4a",
  background: "#ffffff",
};

const ResumePreview: React.FC<ResumePreviewProps> = ({
  sections = defaultSections,
  template = "default",
  colorScheme = defaultColorScheme,
}) => {
  // Group sections by type for organized display
  const groupedSections = sections.reduce(
    (acc, section) => {
      if (!acc[section.type]) acc[section.type] = [];
      acc[section.type].push(section);
      return acc;
    },
    {} as Record<string, ResumeSection[]>,
  );

  const renderSection = (section: ResumeSection) => {
    switch (section.type) {
      case "experience":
        return (
          <div key={section.id} className="mb-6">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: colorScheme.primary }}
            >
              {section.content.company}
            </h3>
            <h4
              className="text-lg font-semibold"
              style={{ color: colorScheme.secondary }}
            >
              {section.content.position}
            </h4>
            <p className="text-sm mb-2">{section.content.duration}</p>
            <p className="text-sm">{section.content.description}</p>
          </div>
        );

      case "education":
        return (
          <div key={section.id} className="mb-6">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: colorScheme.primary }}
            >
              {section.content.school}
            </h3>
            <h4
              className="text-lg font-semibold"
              style={{ color: colorScheme.secondary }}
            >
              {section.content.degree}
            </h4>
            <p className="text-sm">{section.content.year}</p>
          </div>
        );

      case "skills":
        return (
          <div key={section.id} className="mb-6">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: colorScheme.primary }}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(section.content?.skills || []).map(
                (skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: colorScheme.secondary,
                      color: colorScheme.background,
                    }}
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <Card className="w-full h-full bg-white shadow-lg">
        <ScrollArea className="h-full p-6">
          <div
            className="max-w-[21cm] mx-auto"
            style={{ backgroundColor: colorScheme.background }}
          >
            <header className="mb-8 text-center">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: colorScheme.primary }}
              >
                {sections.find((s) => s.type === "personal")?.content?.name ||
                  "Your Name"}
              </h1>
              <p className="text-sm" style={{ color: colorScheme.secondary }}>
                {[
                  sections.find((s) => s.type === "personal")?.content?.email,
                  sections.find((s) => s.type === "personal")?.content?.phone,
                ]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            </header>

            <main>
              {/* Work Experience Section */}
              {groupedSections.experience?.length > 0 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: colorScheme.primary }}
                  >
                    Work Experience
                  </h2>
                  {groupedSections.experience.map((section) =>
                    renderSection(section),
                  )}
                </div>
              )}

              {/* Education Section */}
              {groupedSections.education?.length > 0 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: colorScheme.primary }}
                  >
                    Education
                  </h2>
                  {groupedSections.education.map((section) =>
                    renderSection(section),
                  )}
                </div>
              )}

              {/* Skills Section */}
              {groupedSections.skills?.map((section) => renderSection(section))}
            </main>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ResumePreview;
