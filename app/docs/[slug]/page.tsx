import { Suspense } from "react";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDX_SECTION_DIVIDER } from "@/lib/consts";

interface PageProps {
  params: {
    slug: string;
  };
}

// 获取所有可用的 MDX 文件
function getAllSlugs() {
  const contentDir = path.join(process.cwd(), "content");
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
  const contentDir = path.join(process.cwd(), "content");
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  return fs.readFileSync(filePath, "utf8");
}

// 渲染单个 MDX 部分的组件
async function MDXSection({ content, index }: { content: string; index: number }) {
  try {
    const options: EvaluateOptions = {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      parseFrontmatter: true,
      disableExports: false,
      disableImports: true,
    };

    const mdxModule = await evaluate({
      source: content,
      options,
    });

    const { content: MDXContent, frontmatter, scope } = mdxModule;

    return (
      <div 
        className={`p-6 rounded-lg border-2 ${
          index % 2 === 0 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-green-50 border-green-200'
        }`}
      >
        {/* 显示部分的 Frontmatter 信息 */}
        {/* {frontmatter && Object.keys(frontmatter).length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">Section Metadata:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(frontmatter).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="font-medium text-yellow-700">{key}:</span>{' '}
                  <span className="text-yellow-600">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )} */}
        
        {/* 显示 Scope 信息 */}
        {scope && Object.keys(scope).length > 0 && (
          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded">
            <h4 className="text-sm font-semibold text-purple-800 mb-2">Variables:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(scope).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="font-medium text-purple-700">{key}:</span>{' '}
                  <span className="text-purple-600">{JSON.stringify(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          {MDXContent}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">渲染错误 (部分 {index + 1})</h3>
        <p className="text-red-600 text-sm">
          {error instanceof Error ? error.message : "未知错误"}
        </p>
      </div>
    );
  }
}

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = params;
  const mdxContent = getMDXContent(slug);
  
  if (!mdxContent) {
    notFound();
  }

  // 先提取全局 frontmatter
  let globalFrontmatter = {};
  
  try {
    const globalOptions: EvaluateOptions = {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      parseFrontmatter: true,
      disableExports: true,
      disableImports: true,
    };

    const globalMdxModule = await evaluate({
      source: mdxContent,
      options: globalOptions,
    });

    globalFrontmatter = globalMdxModule.frontmatter || {};
  } catch (error) {
    console.error('Error extracting global frontmatter:', error);
  }

  // 使用固定的分段符常量
  const sections = mdxContent
    .split(MDX_SECTION_DIVIDER)
    .map(section => section.trim())
    .filter(section => section.length > 0);

  // 获取所有可用的文档以供导航
  const allSlugs = getAllSlugs();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* 导航栏 */}
      <nav className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Available Documents</h2>
        <div className="flex flex-wrap gap-2">
          {allSlugs.map((availableSlug) => (
            <Link
              key={availableSlug}
              href={`/docs/${availableSlug}`}
              className={`px-3 py-1 rounded text-sm ${
                availableSlug === slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              {availableSlug}
            </Link>
          ))}
        </div>
      </nav>

      {/* 文档标题和信息 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {(globalFrontmatter as any)?.title || slug}
        </h1>
        <p className="text-gray-600 mb-4">
          {(globalFrontmatter as any)?.description || `Documentation for ${slug}`}
        </p>
        
        {/* 显示全局 Frontmatter 信息 */}
        {/* {globalFrontmatter && Object.keys(globalFrontmatter).length > 0 && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">Document Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(globalFrontmatter).map(([key, value]) => (
                <div key={key} className="bg-white p-3 rounded border">
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {key}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {key === 'sectionDivider' ? (
                      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {String(value)}
                      </code>
                    ) : Array.isArray(value) ? (
                      <div className="flex flex-wrap gap-1">
                        {value.map((item, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {String(item)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      String(value)
                    )}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
      
      {/* 文档内容部分 */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Suspense 
            key={`${slug}-section-${index}`}
            fallback={
              <div className="p-6 bg-gray-100 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            }
          >
            <MDXSection content={section} index={index} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
