import { Suspense } from "react";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";

// MDX 内容示例，使用 --- 分割不同的部分
const mdxContent = `
---
title: TEST
author: John Doe
date: 2025-06-27
tags: [react, mdx, demo]
---

export const greeting = "Hello from MDX!";
export const version = "1.0.0";

# 第一部分标题

这是第一部分的内容，包含一些基本的 Markdown 语法。

变量示例：{greeting}
版本：{version}

## 子标题

- 列表项 1
- 列表项 2
- 列表项 3

<!---->

---
section: "second"
priority: high
---

export const sectionData = { name: "Section 2", items: 3 };

# 第二部分标题

这是第二部分的内容。

部分名称：{sectionData.name}
项目数量：{sectionData.items}

\`\`\`javascript
function hello() {
  console.log("Hello from section 2!");
}
\`\`\`

> 这是一个引用块

<!---->

---
section: "third"
hasCode: true
---

export const codeExample = "React Component";

# 第三部分标题

这是第三部分的内容，展示更多功能。

代码类型：{codeExample}

## 代码示例

\`inline code\` 示例

\`\`\`tsx
import React from 'react';

const Component = () => {
  return <div>Hello World!</div>;
};
\`\`\`

<!---->

---
section: "fourth"
isLast: true
---

export const conclusion = "这是结论部分";

# 第四部分标题

最后一部分的内容。

{conclusion}

**粗体文本** 和 *斜体文本*

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3
`;

// 渲染单个 MDX 部分的组件
async function MDXSection({ content, index }: { content: string; index: number }) {
  try {
    const options: EvaluateOptions = {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      parseFrontmatter: true,
      disableExports: false, // 允许导出以获取 scope
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
        {/* 显示 Frontmatter 信息 */}
        {frontmatter && Object.keys(frontmatter).length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">Frontmatter:</h4>
            <pre className="text-xs text-yellow-700">
              {JSON.stringify(frontmatter, null, 2)}
            </pre>
          </div>
        )}
        
        {/* 显示 Scope 信息 */}
        {scope && Object.keys(scope).length > 0 && (
          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded">
            <h4 className="text-sm font-semibold text-purple-800 mb-2">Scope:</h4>
            <pre className="text-xs text-purple-700">
              {JSON.stringify(scope, null, 2)}
            </pre>
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

export default async function MDXRenderPage() {
  // 先提取第一个 frontmatter
  let globalFrontmatter = {};
  
  try {
    // 对整个内容进行一次 evaluate 来提取全局 frontmatter
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

  // 按照 <!---> 分割 MDX 内容
  const sections = mdxContent.split('<!---->').map(section => section.trim()).filter(section => section.length > 0);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MDX 分段渲染</h1>
        <p className="text-gray-600">
          MDX 内容按照 &lt;!----&gt; 分割成 {sections.length} 个部分
        </p>
        
        {/* 显示全局 Frontmatter 信息 */}
        {globalFrontmatter && Object.keys(globalFrontmatter).length > 0 && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">文档信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(globalFrontmatter).map(([key, value]) => (
                <div key={key} className="bg-white p-3 rounded border">
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {key}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Array.isArray(value) ? (
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
        )}
      </div>
      
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Suspense 
            key={index} 
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