import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { FileDown, FileType } from "lucide-react";

interface ExportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExport?: (format: string, options: ExportOptions) => void;
}

interface ExportOptions {
  format: "pdf" | "doc";
  filename: string;
  paperSize: "a4" | "letter";
}

const ExportDialog = ({
  open = true,
  onOpenChange = () => {},
  onExport = () => {},
}: ExportDialogProps) => {
  const [format, setFormat] = React.useState<"pdf" | "doc">("pdf");
  const [filename, setFilename] = React.useState("my-resume");
  const [paperSize, setPaperSize] = React.useState<"a4" | "letter">("a4");

  const handleExport = () => {
    onExport(format, {
      format,
      filename,
      paperSize,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Resume</DialogTitle>
          <DialogDescription>
            Choose your preferred export format and options
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <Label>Export Format</Label>
            <RadioGroup
              defaultValue={format}
              onValueChange={(value) => setFormat(value as "pdf" | "doc")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doc" id="doc" />
                <Label htmlFor="doc" className="flex items-center gap-2">
                  <FileType className="h-4 w-4" />
                  Word
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter filename"
            />
          </div>

          <div className="space-y-4">
            <Label>Paper Size</Label>
            <RadioGroup
              defaultValue={paperSize}
              onValueChange={(value) => setPaperSize(value as "a4" | "letter")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a4" id="a4" />
                <Label htmlFor="a4">A4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="letter" id="letter" />
                <Label htmlFor="letter">Letter</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            Export
            <FileDown className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
