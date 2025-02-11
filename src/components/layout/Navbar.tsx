import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="text-xl font-bold">ResumeBuilder</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/templates">
            <Button variant="ghost">Templates</Button>
          </Link>
          <Link to="/builder">
            <Button>Create Resume</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col gap-2 items-center bg-background py-4 transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/templates" onClick={() => setIsOpen(false)}>
          <Button variant="ghost" className="w-full">
            Templates
          </Button>
        </Link>
        <Link to="/builder" onClick={() => setIsOpen(false)}>
          <Button className="w-full">Create Resume</Button>
        </Link>
      </div>
    </nav>
  );
}
