import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  type: "personal" | "experience" | "education" | "skills";
  title: string;
  content?: any;
}

interface FormEditorProps {
  sections?: Section[];
  onAddSection?: (type: Section["type"]) => void;
  onReorderSections?: (sections: Section[]) => void;
  onDeleteSection?: (id: string) => void;
}

const FormEditor = ({
  sections = [
    { id: "0", type: "personal", title: "Personal Information" },
    { id: "1", type: "experience", title: "Work Experience" },
    { id: "2", type: "education", title: "Education" },
    { id: "3", type: "skills", title: "Skills" },
  ],
  onAddSection = () => {},
  onReorderSections = () => {},
  onDeleteSection = () => {},
}: FormEditorProps) => {
  return (
    <div className="h-full w-full bg-background p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Resume Sections</h2>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onAddSection("experience")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onAddSection("education")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                  <div className="flex-1">
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {section.type}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteSection(section.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  {section.type === "personal" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 border rounded"
                        value={section.content?.name || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            name: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={section.content?.email || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            email: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full p-2 border rounded"
                        value={section.content?.phone || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            phone: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                    </div>
                  )}
                  {section.type === "experience" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full p-2 border rounded"
                        value={section.content?.company || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            company: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        className="w-full p-2 border rounded"
                        value={section.content?.position || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            position: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        className="w-full p-2 border rounded"
                        value={section.content?.duration || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            duration: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        rows={3}
                        value={section.content?.description || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            description: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                    </div>
                  )}

                  {section.type === "education" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="School Name"
                        className="w-full p-2 border rounded"
                        value={section.content?.school || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            school: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        className="w-full p-2 border rounded"
                        value={section.content?.degree || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            degree: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        className="w-full p-2 border rounded"
                        value={section.content?.year || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            year: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                      />
                    </div>
                  )}

                  {section.type === "skills" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Type a skill and press Enter"
                        className="w-full p-2 border rounded"
                        value={section.content?.currentInput || ""}
                        onChange={(e) => {
                          const updatedContent = {
                            ...section.content,
                            currentInput: e.target.value,
                          };
                          onReorderSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? { ...s, content: updatedContent }
                                : s,
                            ),
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            const value =
                              section.content?.currentInput?.trim() || "";
                            if (!value) return;

                            const currentSkills = section.content?.skills || [];
                            const newSkills = value
                              .split(",")
                              .map((skill) => skill.trim())
                              .filter(
                                (skill) =>
                                  skill && !currentSkills.includes(skill),
                              );

                            if (newSkills.length > 0) {
                              const updatedContent = {
                                ...section.content,
                                skills: [...currentSkills, ...newSkills],
                                currentInput: "",
                              };
                              onReorderSections(
                                sections.map((s) =>
                                  s.id === section.id
                                    ? { ...s, content: updatedContent }
                                    : s,
                                ),
                              );
                            }
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(section.content?.skills || []).map(
                          (skill: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
                            >
                              <span>{skill}</span>
                              <button
                                onClick={() => {
                                  const updatedSkills =
                                    section.content.skills.filter(
                                      (_: string, i: number) => i !== index,
                                    );
                                  const updatedContent = {
                                    ...section.content,
                                    skills: updatedSkills,
                                  };
                                  onReorderSections(
                                    sections.map((s) =>
                                      s.id === section.id
                                        ? { ...s, content: updatedContent }
                                        : s,
                                    ),
                                  );
                                }}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ×
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FormEditor;
