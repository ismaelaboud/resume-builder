import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, AlertTriangle } from "lucide-react";

interface ATSScoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  score: number;
  analysis: {
    category: string;
    score: number;
    suggestions: string[];
  }[];
}

const ATSScoreDialog = ({
  open,
  onOpenChange,
  score,
  analysis = [
    {
      category: "Keywords",
      score: 85,
      suggestions: [
        "Good use of industry-specific keywords",
        "Consider adding more technical skills",
      ],
    },
    {
      category: "Format",
      score: 90,
      suggestions: ["Clean and well-structured format"],
    },
    {
      category: "Content",
      score: 75,
      suggestions: [
        "Quantify more achievements",
        "Add more action verbs",
        "Include specific metrics",
      ],
    },
  ],
}: ATSScoreDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] z-50">
        <DialogHeader>
          <DialogTitle>ATS Score Analysis</DialogTitle>
          <DialogDescription>
            Detailed analysis of your resume's ATS compatibility
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-2 ${
                score >= 80
                  ? "bg-green-100"
                  : score >= 60
                    ? "bg-yellow-100"
                    : "bg-red-100"
              }`}
            >
              <span
                className={`text-2xl font-bold ${
                  score >= 80
                    ? "text-green-700"
                    : score >= 60
                      ? "text-yellow-700"
                      : "text-red-700"
                }`}
              >
                {score}%
              </span>
            </div>
            <h3 className="text-lg font-semibold">
              {score >= 80
                ? "Excellent ATS Score"
                : score >= 60
                  ? "Good ATS Score"
                  : "Needs Improvement"}
            </h3>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              {analysis.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{category.category}</h4>
                    <span
                      className={`text-sm ${
                        category.score >= 80
                          ? "text-green-600"
                          : category.score >= 60
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {category.score}%
                    </span>
                  </div>
                  <Progress value={category.score} />
                  <ul className="space-y-2">
                    {category.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        {category.score >= 80 ? (
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        ) : category.score >= 60 ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 mt-0.5" />
                        )}
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ATSScoreDialog;
