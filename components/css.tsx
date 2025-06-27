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

function applyCustomStyle(html: string, selector: string, style: string): string {
  if (!selector.trim() || !style.trim()) return html;
  try {
    const doc = new window.DOMParser().parseFromString(html, "text/html");
    const matches = doc.querySelectorAll(selector);
    matches.forEach((el) => {
      (el as HTMLElement).setAttribute("style", ((el as HTMLElement).getAttribute("style") || "") + ";" + style);
    });
    return doc.body.innerHTML;
  } catch {
    return html;
  }
}

export default function CSSTester() {
  const [selector, setSelector] = useState("");
  const [style, setStyle] = useState("");
  const [html, setHtml] = useState(SAMPLE_HTML);

  const styledHtml = React.useMemo(
    () => applyCustomStyle(SAMPLE_HTML, selector, style),
    [selector, style]
  );

  return (
    <div className="mx-auto p-4 space-y-4" style={{ maxWidth: "100%"}}>
      <input
        className="w-full border rounded px-3 py-2 text-base"
        placeholder="输入 CSS 选择器，如 .item, h1, .desc"
        value={selector}
        onChange={(e) => setSelector(e.target.value)}
      />
      <textarea
        className="w-full border rounded px-3 py-2 text-base font-mono"
        placeholder="输入 CSS 属性，如 background: #a21caf; color: white;"
        rows={3}
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      />
      <div className="border rounded p-4 bg-gray-50 prose">
        <JSXPreview jsx={styledHtml} />
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