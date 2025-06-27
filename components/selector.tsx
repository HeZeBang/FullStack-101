"use client";

import React, { useState } from "react";
import { JSXPreview } from "./ui/jsx-preview";
import CodeBlockWithHeader from "./code";

const SAMPLE_HTML = `
<div class="container">
  <h1>标题</h1>
  <p class="desc item">描述内容</p>
  <ul>
    <li class="item">项目1</li>
    <li class="item" id="unique-item">项目2</li>
    <li class="item">项目3</li>
  </ul>
  <button class="bg-white rounded active:scale-95 hover:shadow-lg p-2 transition-all">按钮1</button>
  <button id="unique-item">按钮2</button>
  <button aria-text="button 3">按钮3</button>
</div>
`;

function highlightElements(html: string, selector: string): string {
  if (!selector.trim()) return html;
  try {
    // 用 DOMParser 解析 HTML 字符串
    const doc = new window.DOMParser().parseFromString(html, "text/html");
    const matches = doc.querySelectorAll(selector);
    matches.forEach((el) => {
      (el as HTMLElement).style.background = "#a21caf"; // 紫色
      (el as HTMLElement).style.color = "white";
    });
    // 返回修改后的 HTML
    return doc.body.innerHTML;
  } catch {
    return html;
  }
}

export default function SelectorTester() {
  const [selector, setSelector] = useState("");
  const [html, setHtml] = useState(SAMPLE_HTML);

  const highlightedHtml = React.useMemo(
    () => highlightElements(SAMPLE_HTML, selector),
    [selector]
  );

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <input
        className="w-full border rounded px-3 py-2 text-base"
        placeholder="输入 CSS 选择器，暂不支持 :hover 等伪类选择器"
        value={selector}
        onChange={(e) => setSelector(e.target.value)}
      />
      <div className="border rounded p-4 bg-gray-50 prose">
        <JSXPreview jsx={highlightedHtml} />
      </div>
      
      <CodeBlockWithHeader
        code={html}
        lang="html"
        header="HTML"
        filename="index.html"
      />
    </div>
  );
}
