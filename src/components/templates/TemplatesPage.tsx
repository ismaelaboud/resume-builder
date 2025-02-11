import { templates } from "../editor/templates";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

export default function TemplatesPage() {
  const navigate = useNavigate();

  const ResumePreview = ({ template }) => (
    <div className="p-4 bg-white rounded-lg transform scale-[0.6] origin-top-left">
      {/* Header */}
      <div className={template.layout.header.style}>
        <h1 className={template.layout.header.nameStyle}>
          {template.preview.name}
        </h1>
        <p className={template.layout.header.contactStyle}>
          {template.preview.contact}
        </p>
      </div>

      {/* Experience */}
      <div className={template.layout.sections.style}>
        <h2 className={template.layout.sections.titleStyle}>Experience</h2>
        <div className={template.layout.sections.contentStyle}>
          {template.preview.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="font-medium">{exp.title}</div>
              <div className="text-sm">{exp.company}</div>
              <div className="text-sm text-gray-600">{exp.duration}</div>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className={template.layout.sections.style}>
        <h2 className={template.layout.sections.titleStyle}>Education</h2>
        <div className={template.layout.sections.contentStyle}>
          {template.preview.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="font-medium">{edu.degree}</div>
              <div className="text-sm">{edu.school}</div>
              <div className="text-sm text-gray-600">{edu.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className={template.layout.sections.style}>
        <h2 className={template.layout.sections.titleStyle}>Skills</h2>
        <div className={template.layout.skills.style}>
          {template.preview.skills.map((skill, i) => (
            <span key={i} className={template.layout.skills.itemStyle}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Choose a Template</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-gray-50 p-6 rounded-xl"
            >
              <div className="aspect-[210/297] overflow-hidden rounded-lg bg-white">
                <ResumePreview template={template} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    onClick={() => navigate(`/builder?template=${template.id}`)}
                    size="lg"
                  >
                    Use Template
                  </Button>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-center">
                {template.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
