import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTemplate } from "./templates";

interface ResumeSection {
  id: string;
  type: "personal" | "summary" | "experience" | "education" | "skills";
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

const ResumePreview: React.FC<ResumePreviewProps> = ({
  sections = [],
  template = "professional",
  colorScheme = {
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
    background: "#ffffff",
  },
}) => {
  const templateData = getTemplate(template);
  const personalInfo =
    sections.find((s) => s.type === "personal")?.content || {};
  const summarySection = sections.find((s) => s.type === "summary");
  const experienceSections = sections.filter((s) => s.type === "experience");
  const educationSections = sections.filter((s) => s.type === "education");
  const skillsSection = sections.find((s) => s.type === "skills");

  return (
    <div className="w-full h-full bg-gray-100 p-2 sm:p-4">
      <Card className="w-full h-full bg-white shadow-lg resume-preview">
        <ScrollArea className="h-full">
          <div
            className="max-w-[21cm] mx-auto p-8"
            style={{ backgroundColor: colorScheme.background }}
          >
            {/* Header */}
            <div
              className={templateData.layout.header.style}
              style={
                template === "modern"
                  ? { backgroundColor: colorScheme.primary }
                  : undefined
              }
            >
              <h1
                className={templateData.layout.header.nameStyle}
                style={{
                  color:
                    template === "modern"
                      ? colorScheme.background
                      : colorScheme.primary,
                }}
              >
                {personalInfo.name || "Your Name"}
              </h1>
              <p
                className={templateData.layout.header.contactStyle}
                style={{
                  color:
                    template === "modern"
                      ? `${colorScheme.background}CC`
                      : colorScheme.secondary,
                }}
              >
                {[personalInfo.email, personalInfo.phone, personalInfo.location]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            </div>

            {/* Summary Section */}
            {summarySection && (
              <div className={templateData.layout.sections.style}>
                <h2
                  className={templateData.layout.sections.titleStyle}
                  style={{ color: colorScheme.primary }}
                >
                  {template === "minimal"
                    ? "PROFESSIONAL SUMMARY"
                    : "Professional Summary"}
                </h2>
                <p className="text-sm" style={{ color: colorScheme.secondary }}>
                  {summarySection.content.summary}
                </p>
              </div>
            )}

            {/* Experience Section */}
            {experienceSections.length > 0 && (
              <div className={templateData.layout.sections.style}>
                <h2
                  className={templateData.layout.sections.titleStyle}
                  style={{ color: colorScheme.primary }}
                >
                  {template === "minimal" ? "EXPERIENCE" : "Experience"}
                </h2>
                <div className={templateData.layout.sections.contentStyle}>
                  {experienceSections.map((section) => (
                    <div key={section.id}>
                      <div
                        className="font-medium"
                        style={{ color: colorScheme.primary }}
                      >
                        {section.content.position}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: colorScheme.secondary }}
                      >
                        {section.content.company}
                      </div>
                      <div className="text-sm text-gray-600">
                        {section.content.duration}
                      </div>
                      <p
                        className="text-sm mt-1"
                        style={{ color: colorScheme.secondary }}
                      >
                        {section.content.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {educationSections.length > 0 && (
              <div className={templateData.layout.sections.style}>
                <h2
                  className={templateData.layout.sections.titleStyle}
                  style={{ color: colorScheme.primary }}
                >
                  {template === "minimal" ? "EDUCATION" : "Education"}
                </h2>
                <div className={templateData.layout.sections.contentStyle}>
                  {educationSections.map((section) => (
                    <div key={section.id}>
                      <div
                        className="font-medium"
                        style={{ color: colorScheme.primary }}
                      >
                        {section.content.degree}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: colorScheme.secondary }}
                      >
                        {section.content.school}
                      </div>
                      <div className="text-sm text-gray-600">
                        {section.content.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {skillsSection && (
              <div className={templateData.layout.sections.style}>
                <h2
                  className={templateData.layout.sections.titleStyle}
                  style={{ color: colorScheme.primary }}
                >
                  {template === "minimal" ? "SKILLS" : "Skills"}
                </h2>
                <div className={templateData.layout.skills.style}>
                  {skillsSection.content.skills?.map(
                    (skill: string, i: number) => (
                      <span
                        key={i}
                        className={templateData.layout.skills.itemStyle}
                        style={
                          template === "modern"
                            ? {
                                backgroundColor: colorScheme.primary,
                                color: colorScheme.background,
                              }
                            : template === "minimal"
                              ? {
                                  color: colorScheme.secondary,
                                }
                              : {
                                  backgroundColor: `${colorScheme.primary}10`,
                                  color: colorScheme.primary,
                                }
                        }
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ResumePreview;
