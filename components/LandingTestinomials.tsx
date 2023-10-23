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
  {
    name: "Avery Clark",
    avatar: "A",
    title: "UX Researcher",
    description: "Uncovers valuable user insights to inform design decisions!",
  },
  {
    name: "Sofia Rodriguez",
    avatar: "S",
    title: "Mobile App Developer",
    description: "Builds innovative and user-friendly mobile applications!",
  },
  {
    name: "Mia Johnson",
    avatar: "M",
    title: "Digital Marketer",
    description: "Expert in driving online visibility and engagement!",
  },
  {
    name: "Alexander Harris",
    avatar: "A",
    title: "Full Stack Developer",
    description: "Equally proficient in front-end and back-end development!",
  },
];

const LandingTestinomials = () => {
  return (
    <div className="px-6 md:px-10 pb-24">
      <h2 className="text-center text-xl md:text-3xl text-primary font-extrabold mb-5 md:mb-10">
        Let&lsquo;s The People Speak For Us ✨
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content.map((item) => (
          <Card
            key={item.description}
            className="backdrop-blur-md text-primary hover:shadow-md hover:-translate-y-2 
            transition-all duration-300 bg-white/80 hover:bg-white/95"
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
