"use client";

import { SlideT } from "@/lib/props";
import MDBlock from "@/components/MdBlock";
import Slides from "@/components/template/GeekPieTemplate";
import { CodeBlockCode } from "@/components/ui/code-block";
import { JSXPreview } from "@/components/ui/jsx-preview";
import { CircleXIcon } from "lucide-react";
import CodeBlockWithHeader from "@/components/code";

const slides = [
  {
    title: "Web 二三事"
  },
  {
    title: "访问网页的过程",
    subtitle: "从输入网址到页面加载",
    content: (<>
      <div className="grid grid-cols-5 gap-3 ">
        <MDBlock className="col-span-2">{`
- 用户输入网址
- 浏览器解析网址
- DNS 查询域名对应的 IP 地址
- 浏览器发送 HTTP 请求
- 服务器处理请求
- 服务器返回 HTML 文档
- 浏览器解析 HTML
- 浏览器渲染页面
- 页面加载完成
      `}</MDBlock>
        <div className="col-span-1 flex justify-center items-center">
          <span className="text-3xl">{'👉'}</span>
        </div>
        <div className="col-span-2 flex flex-col gap-5 justify-center items-center">
          <span className="text-6xl">🖥 Client</span>
          <div className="flex gap-5 text-3xl">
            <span>网页 ↑</span>
            <span>↓ 请求</span>
          </div>
          <span className="text-6xl">🌐 Server</span>
        </div>
      </div>
    </>),
  },
  {
    title: "HTML",
    subtitle: "HTML == 网页？",
  },
  {
    title: "HTML",
    subtitle: "HyperText Markup Language, 超文本标记语言",
    content: (<>
      <MDBlock>{`
- 超文本：可以包含链接、图片、视频等多媒体内容
- 标记语言：使用标签来描述文档结构和内容
  - Markdown 是一种轻量级标记语言，常用于编写文档和博客 (HTML 的语法糖)
- HTML 是网页的骨架，定义了网页的结构和内容
    `}</MDBlock>
    </>)
  },
  {
    title: "HTML 长什么样？",
    subtitle: "艺术字.jpg",
    content: (<>
      <ul className="border-8 p-2">
        <li className="border-4 border-red-400 p-2 font-extrabold">HTML
          <ul className="border-4 border-blue-400 p-2">
            <li className="border-4 border-green-400 p-2 text-red-600">是</li>
            <li className="border-4 border-yellow-400 p-2">一些
              <ul className="flex gap-2 border-purple-400 border-4 p-2 shadow-xl [perspective:1000px] origin-center">
                <li className="w-[12em] text-center text-white p-5 bg-[linear-gradient(to_right,theme(colors.red.500),theme(colors.orange.500),theme(colors.yellow.500),theme(colors.green.500),theme(colors.blue.500),theme(colors.indigo.500),theme(colors.purple.500))]">
                  有不同属性和内容的
                </li>
                <li className="border-4 border-lime-400 bg-lime-400 animate-bounce">嵌套的</li>
                <li className="border-4 border-purple-400">盒子</li>
              </ul>
            </li>
          </ul>
        </li>
        不信？
        <div className="flex justify-center items-center gap-3 border-4 rounded-xl p-2 border-black">
          <span className="border-4 border-teal-300 font-bold">右键菜单打开</span>
          <span className="border-4 border-pink-300 font-mono">审查元素/Inspect</span>
        </div>
      </ul>
      <MDBlock>{`
- 相似的内容会放在一起
- 每个盒子都有自己的属性和内容
- 每个盒子都是一个 \`<...>\` 开头，\`</...>\` 结尾的一段话
- 尖括号里面可以设置一些属性
      `}</MDBlock>
    </>)
  },
  {
    title: "一段 HTML 代码",
    content: (
      <div className="grid grid-cols-2 gap-3">
        <CodeBlockWithHeader code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a <br/> paragraph.</p>
</body>
</html>`} lang="html" header="HTML" filename="index.html" className="text-xl" />
        <div className="border-4 rounded p-2 flex flex-col gap-2">
          <div className="bg-gray-200 flex rounded-md px-2 w-20 justify-between items-center">Title <CircleXIcon className="inline-block" /></div>
          <JSXPreview jsx={`<div>
<h1>Hello World</h1>
<p>This is a <br/> paragraph.</p>
</div>`} className="prose border-2 rounded p-2 h-full" />
        </div>
      </div>
    )
  },
  {
    title: "HTML 的结构",
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div></div>
        <div className="absolute">
          <CodeBlockWithHeader code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a <br/> paragraph.</p>
</body>
</html>`} lang="html" header="HTML" filename="index.html" className="text-xl" />
        </div>
        <MDBlock>{`
- \`<!DOCTYPE html>\` 声明文档类型为 \`html\` 供浏览器识别
- \`<html>\` 标签
  - 属性 \`lang\` 指定文档语言
  - 里面是 HTML 文档的根元素
- \`<head>\` 标签
  - 包含文档的元数据，如标题、描述、关键字等
    - \`<meta charset="UTF-8">\` 声明文档字符编码为 UTF-8
    - \`<title>\` 标签
      - 文档标题，显示在浏览器标签页上
- \`<body>\` 标签
  - 包含文档的主体内容
  - 可以包含文本、图片、链接、表格等各种元素
    - \`<h1>\` 标签
      - 定义文档的主标题
      - 通常用于页面的主要内容
    - \`<br />\` 标签
      - 定义一个换行符
      - 用于在文本中插入换行
    - \`<p>\` 标签
      - 定义一个段落
      - 用于组织文本内容
- HTML 文档的结构是**树形**的，\`<html>\` 是根节点，\`<head>\` 和 \`<body>\` 是子节点
- 每个标签都有开始标签和结束标签
- \`<br>\` 是一个**自闭合标签**，没有对应的结束标签
  - 也可以用 \`<br>\` 标签，但是不符合规范
`}</MDBlock>
      </div>
    )
  },
  {
    title: "更多 HTML 标签",
    content: (<>
      <CodeBlockCode code={`
<tagname attr1="val1" attr2="val2">
  <!-- content 
  goes 
  here -->
</tagname>`} lang="html" className="text-xl" />
      <MDBlock>{`
- \`<div>\`: 通用容器，用于分组和布局
- \`<span>\`: 行内元素，用于文本样式
- \`<a href="url">...</a>\`: 超链接，\`href\` 属性指定链接地址
- \`<s>\`: 删除线文本
- \`<u>\`: 下划线文本
- \`<b>\`: 粗体文本
- \`<i>\`: 斜体文本
- \`<img src="url" alt="description" />\`: 图片，\`src\` 属性指定图片地址，\`alt\` 属性提供替代文本（图片无法加载时显示）
- \`<hr />\`: 水平线，用于分隔内容

> **ACTION ITEM**
> - 让生成式人工智能帮你生成一个含有各种 HTML 标签的简单网页。
> - 尝试把你的 Markdown 翻译成 HTML。
`}</MDBlock>
    </>)
  },
  {
    title: "Quiz Time!",
    content: (<>
      <MDBlock>{`
**Q1.** 下列哪个是正确的

1. \`<a c="2"><b></b></a>\`
2. \`<a></b><b></a>\`
3. \`<a><b></a></b>\`
4. \`<a b="1"/>\`

**Q2.** 为什么不全部都使用 \`<div>\`

`}</MDBlock>
    </>)
  },
  {
    title: "更多 HTML 内容",
    content: (
      <div className="flex flex-col gap-3 justify-center items-center w-full h-full">
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML" className="underline text-blue-500 text-2xl">MDN Web Docs - HTML</a>
        <s>W3SCHOOL</s>
      </div>
    )
  },
  {
    title: "CSS",
    subtitle: "如果 HTML 是网页的骨架，那么 CSS 就是网页的皮肤",
  },
  {
    title: "CSS",
    subtitle: "Cascading Style Sheets, 层叠样式表",
    content: (<>
      <MDBlock className="col-span-3">{`
![CSS](/html-css.png)
- 尝试按下 \`F12\` 或审查元素，找到 Style 选项卡
- 尝试在网络选项卡中阻止 CSS，刷新看看网页有什么变化？
- 尝试理解 CSS 的大致作用
- 选择一个元素，点击任何一个样式值并修改，看看会发生什么？
      `}</MDBlock>
    </>)
  },
  {
    title: "为什么网页存活了这么久？",
    content: (
      <div className="flex justify-center items-center flex-col gap-5 w-full h-full">
        <img src="https://imgs.xkcd.com/comics/installing.png" alt="xkcd 1367" className="h-80" />
      </div>
    )
  }
] as SlideT[]

export default function Page() {
  return <Slides data={slides} subtitle={
    <>
      <b>Lecture 1</b> - 网页妙啊妙
    </>
  } />
}