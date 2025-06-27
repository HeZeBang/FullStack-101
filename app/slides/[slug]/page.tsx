import { Suspense } from "react";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { CUSTOM_COMPONENTS, MDX_SECTION_DIVIDER, Frontmatter, Scope, PageProps, EVALUATE_OPTIONS } from "@/lib/consts";
import Slides from "@/components/template/GeekPieTemplate";
import { SlideT } from "@/lib/props";
export const dynamic = "force-dynamic";

// 获取所有可用的 MDX 文件
function getAllSlugs() {
  const contentDir = path.join(process.cwd(), "app", "content");
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  return files
    .filter(file => file.endsWith(".mdx"))
    .map(file => file.replace(".mdx", ""));
}

// 读取 MDX 文件内容
function getMDXContent(slug: string) {
  const contentDir = path.join(process.cwd(), "app", "content");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

// 渲染单个 MDX 部分为 slide 的组件
async function MDXSlide({ content, index }: { content: string; index: number }) {
  try {
    const mdxModule = await evaluate<Frontmatter, Scope>({
      source: content,
      options: EVALUATE_OPTIONS,
      components: CUSTOM_COMPONENTS,
    });

    const { content: MDXContent, frontmatter, scope } = mdxModule;

    return {
      title: frontmatter?.title,
      subtitle: frontmatter?.subtitle,
      content: MDXContent,
      layout: frontmatter?.layout || "default",
      autoAnimate: false,
    } as SlideT;
  } catch (error) {
    return {
      title: `渲染错误 (Slide ${index + 1})`,
      content: (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">渲染错误</h3>
          <p className="text-red-600 text-sm">
            {error instanceof Error ? error.message : "未知错误"}
          </p>
        </div>
      ),
    } as SlideT;
  }
}

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function SlidePage({ params }: PageProps) {
  const { slug } = params;
  const mdxContent = getMDXContent(slug);

  if (!mdxContent) {
    notFound();
  }

  // 使用 getFrontmatter 提取全局 frontmatter 和剥离后的内容
  const { frontmatter: globalFrontmatter, strippedSource } = getFrontmatter<Frontmatter>(mdxContent);

  // 使用固定的分段符常量
  const sections = strippedSource
    .split(MDX_SECTION_DIVIDER)
    .map(section => section.trim())
    .filter(section => section.length > 0);

  // 并行处理所有 MDX 部分
  const slides = await Promise.all(
    sections.map((section, index) => MDXSlide({ content: section, index }))
  );

  // 获取所有可用的文档以供导航
  const allSlugs = getAllSlugs();

  return (
    <div className="w-full h-screen">
      {/* 添加一个简单的导航栏，可以通过 ESC 键或点击显示 */}
      <div className="fixed top-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="flex flex-wrap gap-1">
            {/* {allSlugs.map((availableSlug) => (
              <Link
                key={availableSlug}
                href={`/slides/${availableSlug}`}
                className={`px-2 py-1 rounded text-xs ${availableSlug === slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {availableSlug}
              </Link>
            ))} */}
            <Link
              href={`/docs/${slug}`}
              className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 hover:bg-green-200"
              title="View as docs"
            >
              📄
            </Link>
          </div>
        </div>
      </div>

      <Slides
        data={slides}
        title={globalFrontmatter?.title || slug}
        subtitle={globalFrontmatter?.subtitle || globalFrontmatter?.description}
        extra={globalFrontmatter?.extra}
      />
    </div>
  );
}
