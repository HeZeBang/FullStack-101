import { Suspense } from "react";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";

// MDX 内容示例，使用 --- 分割不同的部分
const mdxContent = `
---
title: TEST
---

# 第一部分标题

这是第一部分的内容，包含一些基本的 Markdown 语法。

## 子标题

- 列表项 1
- 列表项 2
- 列表项 3

<!---->

# 第二部分标题

这是第二部分的内容。

\`\`\`javascript
function hello() {
  console.log("Hello from section 2!");
}
\`\`\`

> 这是一个引用块

<!---->

# 第三部分标题

这是第三部分的内容，展示更多功能。

## 代码示例

\`inline code\` 示例

\`\`\`tsx
import React from 'react';

const Component = () => {
  return <div>Hello World!</div>;
};
\`\`\`

<!---->

# 第四部分标题

最后一部分的内容。

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
      disableExports: true,
      disableImports: true,
    };

    const mdxModule = await evaluate({
      source: content,
      options,
    });

    const { content: MDXContent } = mdxModule;

    return (
      <div 
        className={`p-6 rounded-lg border-2 ${
          index % 2 === 0 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-green-50 border-green-200'
        }`}
      >
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
  // 按照 --- 分割 MDX 内容
  const sections = mdxContent.split('<!---->').map(section => section.trim()).filter(section => section.length > 0);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MDX 分段渲染</h1>
        <p className="text-gray-600">
          MDX 内容按照 &lt;hr&gt; (---) 分割成 {sections.length} 个部分
        </p>
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