export interface Template {
  id: string;
  name: string;
  layout: {
    header: {
      style: string;
      nameStyle: string;
      contactStyle: string;
    };
    sections: {
      style: string;
      titleStyle: string;
      contentStyle: string;
    };
    skills: {
      style: string;
      itemStyle: string;
    };
  };
  preview: {
    name: string;
    contact: string;
    summary?: string;
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      school: string;
      year: string;
    }>;
    skills: string[];
  };
}

export const templates: Template[] = [
  {
    id: "professional",
    name: "Professional",
    layout: {
      header: {
        style: "mb-6",
        nameStyle: "text-2xl font-bold mb-1",
        contactStyle: "text-sm text-gray-600",
      },
      sections: {
        style: "mb-6",
        titleStyle: "text-lg font-bold mb-2",
        contentStyle: "space-y-3",
      },
      skills: {
        style: "flex flex-wrap gap-2",
        itemStyle: "px-2 py-1 bg-gray-100 text-sm text-gray-700",
      },
    },
    preview: {
      name: "Alex Thompson",
      contact: "alex@email.com | (555) 123-4567 | New York, NY",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          duration: "2020 - Present",
          description:
            "Led development of enterprise applications and mentored junior developers.",
        },
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          school: "University of Technology",
          year: "2016 - 2020",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    },
  },
  {
    id: "modern",
    name: "Modern",
    layout: {
      header: {
        style: "bg-gray-900 text-white p-6 text-center mb-6",
        nameStyle: "text-3xl font-bold mb-2",
        contactStyle: "text-sm text-gray-300",
      },
      sections: {
        style: "mb-6 px-6",
        titleStyle: "text-lg font-bold mb-2",
        contentStyle: "space-y-3",
      },
      skills: {
        style: "flex flex-wrap gap-2",
        itemStyle: "px-3 py-1 bg-gray-900 text-white text-sm rounded",
      },
    },
    preview: {
      name: "Sarah Chen",
      contact: "sarah@email.com | (555) 987-6543 | San Francisco, CA",
      experience: [
        {
          title: "Product Designer",
          company: "Design Studio Co.",
          duration: "2019 - Present",
          description:
            "Created user-centered designs for various digital products.",
        },
      ],
      education: [
        {
          degree: "Master of Fine Arts in Design",
          school: "Design Institute",
          year: "2017 - 2019",
        },
      ],
      skills: ["UI/UX", "Figma", "Adobe CC", "Prototyping", "Design Systems"],
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    layout: {
      header: {
        style: "mb-8",
        nameStyle: "text-3xl font-light mb-1",
        contactStyle: "text-sm text-gray-600",
      },
      sections: {
        style: "mb-6",
        titleStyle: "text-sm font-medium uppercase tracking-wide mb-3",
        contentStyle: "space-y-3",
      },
      skills: {
        style: "flex flex-wrap gap-x-4",
        itemStyle: "text-sm text-gray-600",
      },
    },
    preview: {
      name: "Michael Park",
      contact: "michael@email.com | (555) 234-5678 | London, UK",
      experience: [
        {
          title: "Marketing Manager",
          company: "Global Brands Ltd.",
          duration: "2018 - Present",
          description:
            "Developed and executed marketing strategies for international markets.",
        },
      ],
      education: [
        {
          degree: "MBA in Marketing",
          school: "Business School",
          year: "2016 - 2018",
        },
      ],
      skills: [
        "Digital Marketing",
        "Brand Strategy",
        "Analytics",
        "Social Media",
        "Content Strategy",
      ],
    },
  },
];

export const getTemplate = (id: string): Template => {
  return templates.find((t) => t.id === id) || templates[0];
};
