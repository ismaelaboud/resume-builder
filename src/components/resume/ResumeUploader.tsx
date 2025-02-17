import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ResumeUploaderProps {
  onUpload?: (text: string) => void;
}

const ResumeUploader = ({ onUpload = () => {} }: ResumeUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async (text: string) => {
    // This is a mock analysis - in production this would call an AI API
    const mockAnalysis = {
      score: Math.floor(Math.random() * 40) + 60,
      analysis: [
        {
          category: "Keywords",
          score: 85,
          suggestions: [
            "Good use of industry-specific keywords",
            "Consider adding more technical skills",
            "Include more action verbs",
          ],
        },
        {
          category: "Format",
          score: 90,
          suggestions: [
            "Clean and well-structured format",
            "Good use of bullet points",
          ],
        },
        {
          category: "Content",
          score: 75,
          suggestions: [
            "Quantify more achievements",
            "Add specific metrics and results",
            "Include more accomplishments",
          ],
        },
      ],
    };

    return mockAnalysis;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Check file type
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    const isPdf = fileType === "application/pdf" || fileName.endsWith(".pdf");
    const isDoc =
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx");

    if (!isPdf && !isDoc) {
      setError("Please upload a PDF or Word document");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          // Convert ArrayBuffer to string, handling Unicode properly
          const text = new TextDecoder("utf-8").decode(
            e.target?.result as ArrayBuffer,
          );

          // Clean the text by removing null characters and other problematic Unicode
          const cleanedText = text
            .replace(/\u0000/g, "") // Remove null characters
            .replace(/[^\x20-\x7E\x0A\x0D]/g, " ") // Replace non-printable chars with space
            .replace(/\s+/g, " ") // Replace multiple spaces with single space
            .trim();

          const analysis = await analyzeResume(cleanedText);
          // Ensure text is properly encoded and not too long
          const truncatedText = cleanedText.slice(0, 10000); // Limit to first 10000 chars
          onUpload(truncatedText);
        } catch (err) {
          console.error("Error processing text:", err);
          setError("Failed to process resume text. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Failed to read file. Please try again.");
        setLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error processing file:", err);
      setError("Failed to process resume. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
          <p className="text-sm text-muted-foreground">
            Upload your existing resume to get an ATS compatibility score
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <label
              htmlFor="resume-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF or Word Document (max. 5MB)
                </p>
              </div>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="w-full space-y-2">
              <Progress value={45} />
              <p className="text-sm text-center text-muted-foreground">
                Analyzing resume...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;
