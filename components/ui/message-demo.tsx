"use client";

import React, { useState } from "react";
import { JSXPreview } from "./jsx-preview";
import { Message } from "./message";

const DEFAULT_JSX = `<Message message="你好！欢迎来到 FullStack 101" sender="ZAMBAR" time="09:00" avatar="https://randomuser.me/api/portraits/men/32.jpg" />`;

export default function MessageDemo() {
  const [jsx, setJsx] = useState(DEFAULT_JSX);

  return (
    <div className="mx-auto p-4 space-y-4" style={{ maxWidth: 480 }}>
      <textarea
        className="w-full border rounded px-3 py-2 text-base font-mono resize-y min-h-[60px]"
        placeholder="输入 JSX 代码，如 <Message ... />"
        value={jsx}
        onChange={e => setJsx(e.target.value)}
      />
      <div className="border rounded p-4 bg-gray-50 dark:bg-gray-900">
        <JSXPreview jsx={jsx} components={{ Message: Message as any }} />
      </div>
    </div>
  );
} 