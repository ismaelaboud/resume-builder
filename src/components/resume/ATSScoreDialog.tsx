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
import { Check, AlertTriangle } from "lucide-react";

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
      <DialogContent className="sm:max-w-[600px] lg:max-w-[900px] h-[90vh] sm:h-auto overflow-hidden">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl">
            ATS Score Analysis
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            Detailed analysis of your resume's ATS compatibility
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 sm:space-y-8 lg:space-y-0 flex-1 overflow-hidden flex flex-col lg:flex-row lg:gap-8">
          {/* Score Circle */}
          <div className="text-center lg:w-1/3 lg:flex lg:flex-col lg:justify-center">
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-green-50">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600">
                {score}%
              </span>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-3 sm:mt-4 lg:mt-6">
              {score >= 80
                ? "Excellent ATS Score"
                : score >= 60
                  ? "Good ATS Score"
                  : "Needs Improvement"}
            </h3>
          </div>

          {/* Analysis Sections */}
          <ScrollArea className="flex-1 h-[300px] sm:h-[350px] lg:h-[500px] lg:w-2/3">
            <div className="space-y-4 sm:space-y-6 pr-4 sm:pr-6">
              {analysis.map((category, index) => (
                <div key={index} className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-base font-semibold">
                      {category.category}
                    </h4>
                    <span
                      className={`text-xs sm:text-sm font-medium ${getScoreColor(
                        category.score,
                      )}`}
                    >
                      {category.score}%
                    </span>
                  </div>
                  <Progress
                    value={category.score}
                    className="h-1.5 sm:h-2"
                    indicatorClassName={`${getProgressColor(category.score)}`}
                  />
                  <ul className="space-y-1.5 sm:space-y-2">
                    {category.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground"
                      >
                        {category.score >= 80 ? (
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mt-0.5 shrink-0" />
                        )}
                        <span>{suggestion}</span>
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

const getScoreColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

const getProgressColor = (score: number): string => {
  if (score >= 80) return "bg-[#0f172a]";
  if (score >= 60) return "bg-[#0f172a]";
  return "bg-[#0f172a]";
};

export default ATSScoreDialog;
