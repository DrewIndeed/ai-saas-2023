"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const content = [
  {
    name: "Anderson Collins",
    avatar: "A",
    title: "Software Engineer",
    description: "One of the best application out there that I've used!",
  },
  {
    name: "Emily Rodriguez",
    avatar: "E",
    title: "Graphic Designer",
    description: "Exceptional creativity and attention to detail!",
  },
  {
    name: "Olivia Adams",
    avatar: "O",
    title: "UX Designer",
    description: "Creates intuitive and visually appealing user experiences!",
  },
  {
    name: "Isabella Thompson",
    avatar: "I",
    title: "Content Writer",
    description: "Produces engaging and well-researched content!",
  },
  {
    name: "Michael Thompson",
    avatar: "M",
    title: "Marketing Specialist",
    description: "Great strategic thinking and problem-solving skills!",
  },
  {
    name: "Ava Roberts",
    avatar: "A",
    title: "Social Media Manager",
    description: "Creates impactful social media campaigns!",
  },
  {
    name: "Charlotte Thompson",
    avatar: "C",
    title: "Content Strategist",
    description: "Crafts compelling content strategies that drive results!",
  },
  {
    name: "William Martin",
    avatar: "W",
    title: "Software Architect",
    description: "Designs scalable and robust software architectures!",
  },
];

const LandingTestinomials = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-3xl text-primary font-extrabold mb-10">
        Let&lsquo;s The People Speak For Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {content.map((item) => (
          <Card
            key={item.description}
            className="text-primary hover:shadow-md transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 italic">
                &quot;{item.description}&quot;
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingTestinomials;
