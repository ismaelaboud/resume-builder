import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTemplate } from "./templates";

const getFontSize = (size: string): string => {
  const sizes = {
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
  };
  return sizes[size] || "1rem";
};

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
  fontSettings?: {
    family: string;
    nameSize: string;
    sectionSize: string;
    bodySize: string;
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
  fontSettings = {
    family: "Arial, sans-serif",
    nameSize: "2xl",
    sectionSize: "lg",
    bodySize: "base",
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
            style={{
              backgroundColor: colorScheme.background,
              fontFamily: fontSettings.family,
            }}
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
                  fontSize: getFontSize(fontSettings.nameSize),
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
                  fontSize: getFontSize(fontSettings.bodySize),
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
                  style={{
                    color: colorScheme.primary,
                    fontSize: getFontSize(fontSettings.sectionSize),
                  }}
                >
                  {template === "minimal"
                    ? "PROFESSIONAL SUMMARY"
                    : "Professional Summary"}
                </h2>
                <p
                  style={{
                    color: colorScheme.secondary,
                    fontSize: getFontSize(fontSettings.bodySize),
                  }}
                >
                  {summarySection.content.summary}
                </p>
              </div>
            )}

            {/* Experience Section */}
            {experienceSections.length > 0 && (
              <div className={templateData.layout.sections.style}>
                <h2
                  className={templateData.layout.sections.titleStyle}
                  style={{
                    color: colorScheme.primary,
                    fontSize: getFontSize(fontSettings.sectionSize),
                  }}
                >
                  {template === "minimal" ? "EXPERIENCE" : "Experience"}
                </h2>
                <div className={templateData.layout.sections.contentStyle}>
                  {experienceSections.map((section) => (
                    <div key={section.id}>
                      <div
                        className="font-medium"
                        style={{
                          color: colorScheme.primary,
                          fontSize: getFontSize(fontSettings.bodySize),
                        }}
                      >
                        {section.content.position}
                      </div>
                      <div
                        style={{
                          color: colorScheme.secondary,
                          fontSize: getFontSize(fontSettings.bodySize),
                        }}
                      >
                        {section.content.company}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: getFontSize(fontSettings.bodySize),
                        }}
                      >
                        {section.content.duration}
                      </div>
                      <p
                        className="mt-1"
                        style={{
                          color: colorScheme.secondary,
                          fontSize: getFontSize(fontSettings.bodySize),
                        }}
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
                  style={{
                    color: colorScheme.primary,
                    fontSize: getFontSize(fontSettings.sectionSize),
                  }}
                >
                  {template === "minimal" ? "EDUCATION" : "Education"}
                </h2>
                <div className={templateData.layout.sections.contentStyle}>
                  {educationSections.map((section) => (
                    <div key={section.id}>
                      <div
                        className="font-medium"
                        style={{
                          color: colorScheme.primary,
                          fontSize: getFontSize(fontSettings.bodySize),
                        }}
                      >
                        {section.content.degree}
                      </div>
                      <div
                        style={{
                          color: colorScheme.secondary,
                          fontSize: getFontSize(fontSettings.bodySize),
                        }}
                      >
                        {section.content.school}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: getFontSize(fontSettings.bodySize),
                        }}
                      >
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
                  style={{
                    color: colorScheme.primary,
                    fontSize: getFontSize(fontSettings.sectionSize),
                  }}
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
                                fontSize: getFontSize(fontSettings.bodySize),
                              }
                            : template === "minimal"
                              ? {
                                  color: colorScheme.secondary,
                                  fontSize: getFontSize(fontSettings.bodySize),
                                }
                              : {
                                  backgroundColor: `${colorScheme.primary}10`,
                                  color: colorScheme.primary,
                                  fontSize: getFontSize(fontSettings.bodySize),
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
