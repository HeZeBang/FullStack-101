import MDBlock from "@/components/MdBlock";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Chrome, CodeXml, Database, Globe, Rocket } from "lucide-react";
import { SlideT } from "../types/Slides";

const timelineData = [
  {
    id: 1,
    title: "Intro",
    date: "",
    content: "Introduction to Web and HTML.",
    category: "Intro",
    relatedIds: [],
    icon: Globe,
    status: "pending" as const,
    energy: 10,
  },
  {
    id: 2,
    title: "HTML, CSS & JS",
    date: "",
    content: "Introduction to HTML, CSS & JS. Simulate Web 1.0.",
    category: "Frontend",
    relatedIds: [],
    icon: CodeXml,
    status: "pending" as const,
    energy: 20,
  },
  {
    id: 3,
    title: "Meet Next.JS",
    date: "",
    content: "Introduction to Next.js and its features. Simulate Web 2.0.",
    category: "Frontend",
    relatedIds: [],
    icon: Chrome,
    status: "pending" as const,
    energy: 40,
  },
  {
    id: 4,
    title: "Backend & DB",
    date: "",
    content: "Using Supabase and Next.JS API routes for backend and database. Or mysql at local.",
    category: "Frontend",
    relatedIds: [],
    icon: Database,
    status: "pending" as const,
    energy: 40,
  },
  {
    id: 5,
    title: "Release & DevOps",
    date: "",
    content: "Final deployment and release. Using Vercel for hosting.",
    category: "Release",
    relatedIds: [],
    icon: Rocket,
    status: "pending" as const,
    energy: 10,
  },
];

const slides = [
  {
    title: "What we'll learn?",
    content: (<>
      <span className="">We will learn ...</span>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>)
  },
  {
    title: "核心观点",
    content: (<>
      <MDBlock>{`
> 做一个现代 Web 的速成课

- 先有**体感**，后有理论：我们的每一次课程都是结果导向的，以做出来、跑起来为目标。
- 拥抱 **“魔法”** ：比起深入理解每个细节和原理，先学会使用工具和框架。
- **AI** Powered: 我们的课程将会极大程度的鼓励使用 AI 工具来辅助学习和开发。
- **前沿**赋能：我们将使用 Next.js、Supabase、Vercel 等业界前沿技术栈而非传统的 SpringBoot, PHP 等技术栈。
- **实践**为王：我们将通过实际项目/课后练习来学习和应用所学知识。
`}</MDBlock>
        </>)
  }
] as SlideT[];

export default slides;