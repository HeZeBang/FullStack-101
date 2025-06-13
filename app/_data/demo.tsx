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
    content: "Introduction to HTML, CSS & JS. Build a basic website. Simulate Web 1.0.",
    category: "Frontend",
    relatedIds: [],
    icon: CodeXml,
    status: "pending" as const,
    energy: 20,
  },
  {
    id: 3,
    title: "Frontend",
    date: "",
    content: "Introduction to React & Next.js and its features, including routing and API routes. Also TailwindCSS, Shadcn UI, etc. Simulate Web 2.0.",
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
    title: "Deploy & DevOps",
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
    title: "Intro",
    subtitle: "我们是什么样的一门课？"
  },
  {
    title: "我们将学会……",
    content: (<>
      <div className="grid grid-cols-2 gap-8 min-h-[700px]">
        <div>
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
        <MDBlock>{`
- 🌐 网页是如何运行起来的？浏览网页都发生了什么？
- 📄 了解 HTML, CSS, JavaScript 的基本概念和作用。构建一个简单的**静态网页**。
- 💻 Node.js, React, Next.js 等现代 Web 技术栈的使用。构建一个**单页应用** (SPA)。
- 🏞 用 UI 框架 (Shadcn UI) 和 CSS 框架 (TailwindCSS) 来快速构建**现代 Web 界面**。
- 🗄️ 使用 Supabase 作为数据库/后端服务，了解数据库和后端的基本概念和操作。构建一个**全栈应用**。
- ⚡ **课程 Project**: 搭建一个现代的**个人博客**，拥有文章发布，用户登录、评论、点赞等功能。并**发布**到 Vercel 等平台上。
- 🥳 我们**鼓励** AI 工具和 Vibe Coding 简化你的开发！
      `}</MDBlock>
      </div>
    </>)
  },
  {
    title: "我们默认你……",
    content: (<>
      <div className="grid grid-cols-4  gap-8">
        <MDBlock className="col-span-3">{`
- 有一定的**编程基础**，会使用 Python。（SI 100 / SI 100+）
- 有一定的**计算机基础知识**，至少你会启动浏览器和打开网页😏。（参考 [你缺计课](https://www.criwits.top/missing/) / [MIT Missing Semester](https://missing-semester-cn.github.io/)）
- 有一定的**科学上网**能力（有些免费服务需要，我们不提供）
- 注册了 **GitHub** 账号，并且会简单的 Git 操作（克隆、提交、推送）
  - 其实使用 VSCode 的 Git 集成就可以了。
  - 这一部分我们会在课程开始时进行投票决定是否额外补充。
  - 以及最好能有学生认证，这样可以白嫖 GitHub Copilot。
- 🥳 **加入了我们的 Piazza**：

      `}</MDBlock>
        <img src="https://imgs.xkcd.com/comics/git.png" alt="xkcd" className="mx-auto my-auto" />
      </div>
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
  },
  {
    title: "课程 Project",
    content: (<>
      <MDBlock>{`
## 个人博客
- **功能**：文章发布，用户登录、评论、点赞等功能。
- **技术栈**：React, Next.js, Supabase, TailwindCSS, Shadcn UI 等。
- **部署**：使用 Vercel 等平台进行部署并绑定域名，没有域名的同学可以发布到 Github Pages。
- Stage 0
  - 用 HTML, CSS, JS 构建一个静态的个人博客。
- Stage 1
  - 用 React 和 Next.js 构建一个单页的现代风格的个人博客。
- Stage 2
  - 用 Next.js 的 API 路由和 Supabase 构建一个能登录互动的个人博客。
- 我们将提供一个**模板**，你可以在此基础上进行修改和扩展。并会在结课后**评比优秀博客**予以宣传和推流。
    `}</MDBlock></>)
  },
  {
    title: "课程 Project",
    subtitle: "YOU MUST...",
    content: (<>
      <MDBlock>{`
- **DO IT YOURSELF!!!**：个人博客怎么能组队呢？！
- **USE GIT**：我们所有的代码都是用 Git 管理和同步的，如果不使用 Git，可能会走一些弯路。
- **100% ORIGINAL**：“原创”指的是你不能照搬以往现有的项目，但我们鼓励你去调用和探索各种第三方库。
- **SECURE**：请确保你的个人博客是安全的，不能有明显的安全漏洞（如密码明文存储、 SQL 注入、XSS 等）。
- **ASK FOR HELP**：如果你遇到问题，请在我们的 Piazza 上提问，我们会尽快回复你。
      `}</MDBlock></>)
  },
  {
    title: "课程 Project",
    subtitle: "YOU CANNOT...",
    content: (<>
      <MDBlock>{`
- **LAZY**：不能使用 Drupal, WordPress, MkDocs 等现成的博客系统。
- **EVIL**：**不能使用任何恶意代码或侵犯他人权益的内容。**
      `}</MDBlock></>)
  },
  {
    title: "课程 Project",
    subtitle: "Judging Criteria",
    content: (<>
      <MDBlock>{`
- **功能完整性**：是否实现了所有要求的功能。
- **代码质量**：代码是否清晰易读，是否遵循最佳实践。
- **安全性**：是否存在明显的安全漏洞。
- **用户体验**：界面是否友好，交互是否流畅。
- **创新性**：是否有独特的设计或功能。
- **CI/CD**：是否成功部署到 Vercel 或者使用 Github Actions + Pages 等 CI/CD 平台。
      `}</MDBlock></>)
  },
  {
    title: "一定要记得",
    subtitle: "多问 Piazza，多 STFW，多 RTFM"
  }
] as SlideT[];

export default slides;