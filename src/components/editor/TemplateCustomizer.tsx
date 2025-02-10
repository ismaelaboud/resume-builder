import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Layout, Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
}

interface TemplateCustomizerProps {
  selectedTemplate?: string;
  colorScheme?: ColorScheme;
  onTemplateChange?: (templateId: string) => void;
  onColorSchemeChange?: (colors: ColorScheme) => void;
}

const defaultTemplates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&h=150&fit=crop",
  },
  {
    id: "classic",
    name: "Classic",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380117-8c2274e16c0e?w=100&h=150&fit=crop",
  },
  {
    id: "minimal",
    name: "Minimal",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&h=150&fit=crop",
  },
];

const defaultColorScheme: ColorScheme = {
  primary: "#1a1a1a",
  secondary: "#4a4a4a",
  background: "#ffffff",
};

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  selectedTemplate = "modern",
  colorScheme = defaultColorScheme,
  onTemplateChange = () => {},
  onColorSchemeChange = () => {},
}) => {
  return (
    <Card className="w-80 h-[400px] bg-background border shadow-lg">
      <Tabs defaultValue="templates" className="w-full h-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-4 h-[calc(100%-60px)]">
          <ScrollArea className="h-full px-4">
            <div className="grid grid-cols-2 gap-4">
              {defaultTemplates.map((template) => (
                <div
                  key={template.id}
                  className="relative cursor-pointer group"
                  onClick={() => onTemplateChange(template.id)}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-primary/20 rounded-md flex items-center justify-center">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <p className="mt-2 text-sm font-medium text-center">
                    {template.name}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="colors" className="mt-4 px-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="primary">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary"
                  type="color"
                  value={colorScheme.primary}
                  onChange={(e) =>
                    onColorSchemeChange({
                      ...colorScheme,
                      primary: e.target.value,
                    })
                  }
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={colorScheme.primary}
                  onChange={(e) =>
                    onColorSchemeChange({
                      ...colorScheme,
                      primary: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary"
                  type="color"
                  value={colorScheme.secondary}
                  onChange={(e) =>
                    onColorSchemeChange({
                      ...colorScheme,
                      secondary: e.target.value,
                    })
                  }
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={colorScheme.secondary}
                  onChange={(e) =>
                    onColorSchemeChange({
                      ...colorScheme,
                      secondary: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background"
                  type="color"
                  value={colorScheme.background}
                  onChange={(e) =>
                    onColorSchemeChange({
                      ...colorScheme,
                      background: e.target.value,
                    })
                  }
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={colorScheme.background}
                  onChange={(e) =>
                    onColorSchemeChange({
                      ...colorScheme,
                      background: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => onColorSchemeChange(defaultColorScheme)}
              variant="outline"
            >
              Reset Colors
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TemplateCustomizer;
