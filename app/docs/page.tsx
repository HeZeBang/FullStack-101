import Link from "next/link";
import fs from "fs";
import path from "path";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";

// 获取所有 MDX 文件及其元数据
async function getAllDocuments() {
  const contentDir = path.join(process.cwd(), "content");
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith(".mdx"));
  
  const documents = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      
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

        const frontmatter = mdxModule.frontmatter || {};
        
        // 从 frontmatter 中获取分段规则，默认为空注释
        const sectionDivider = (frontmatter as any)?.sectionDivider || '{/**/}';
        
        // 使用自定义的分段规则来分割内容
        let sectionsCount = 1; // 默认至少有一个部分
        try {
          // 创建正则表达式来匹配分段符
          const dividerRegex = new RegExp(sectionDivider.replace(/[{}()[\].*+?^$|\\]/g, '\\$&'), 'g');
          const sections = content.split(dividerRegex).filter(s => s.trim().length > 0);
          sectionsCount = sections.length;
        } catch (regexError) {
          console.warn(`Invalid sectionDivider regex for ${file}:`, regexError);
          // 如果正则表达式无效，回退到默认的分段方式
          sectionsCount = content.split('{/**/}').filter(s => s.trim().length > 0).length;
        }
        
        return {
          slug,
          frontmatter,
          sectionsCount,
          sectionDivider: (frontmatter as any)?.sectionDivider || '{/**/}'
        };
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        return {
          slug,
          frontmatter: { title: slug, error: "Failed to parse" },
          sectionsCount: 0,
          sectionDivider: '{/**/}'
        };
      }
    })
  );
  
  return documents;
}

export default async function DocsIndexPage() {
  const documents = await getAllDocuments();
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-gray-600">
          Browse through our collection of {documents.length} documents
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {(doc.frontmatter as any)?.title || doc.slug}
              </h3>
              
              {(doc.frontmatter as any)?.description && (
                <p className="text-gray-600 text-sm mb-3">
                  {(doc.frontmatter as any).description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-3">
                {(doc.frontmatter as any)?.tags && Array.isArray((doc.frontmatter as any).tags) && (
                  (doc.frontmatter as any).tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                {doc.sectionsCount} section{doc.sectionsCount !== 1 ? 's' : ''}
              </span>
              
              {(doc.frontmatter as any)?.author && (
                <span>by {(doc.frontmatter as any).author}</span>
              )}
            </div>
            
            {/* 显示分段符信息 */}
            {doc.sectionDivider !== '{/**/}' && (
              <div className="mt-2 text-xs text-gray-400">
                Divider: <code className="bg-gray-100 px-1 rounded">{doc.sectionDivider}</code>
              </div>
            )}
            
            {(doc.frontmatter as any)?.date && (
              <div className="mt-2 text-xs text-gray-400">
                {new Date((doc.frontmatter as any).date).toLocaleDateString()}
              </div>
            )}
          </Link>
        ))}
      </div>
      
      {documents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No documents found in the content directory.</p>
          <p className="text-sm text-gray-400 mt-2">
            Add .mdx files to the <code>content/</code> folder to get started.
          </p>
        </div>
      )}
    </div>
  );
}
