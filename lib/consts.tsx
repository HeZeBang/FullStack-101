import Universe from "@/components/magicui/universe";
import { MDXComponents } from "next-mdx-remote-client";
import dynamic from "next/dynamic";

import CodeBlockWithHeader from "@/components/code";
import SelectorTester from "@/components/selector";
import CSSTester from "@/components/css";
import { JSXPreview } from "@/components/ui/jsx-preview";
import { CodeBlockCode } from "@/components/ui/code-block";

export const TITLE = "FullStack 101" as string;
export const SUBTITLE = <small><s>又名：Re:从零开始的全栈牛马生活</s><br />2025 Fall</small>;
export const EXTRA = "A Coffie with Pie / GeekPie_";
export const DESCRIPTION = "FullStack 101 是一门面向初学者的全栈开发课程，旨在帮助学生从零开始掌握前端和后端开发的核心技能。" as string;

// MDX 相关常量
export const MDX_SECTION_DIVIDER = '{/*  */}' as const;
export const CUSTOM_COMPONENTS = {
    Universe,
    Timeline: dynamic(() => import("@/components/ui/timeline"), {
        ssr: false,
    }),
    CodeBlockWithHeader,
    SelectorTester: dynamic(() => import("@/components/selector"), {
        ssr: false,
    }),
    CSSTester: dynamic(() => import("@/components/css"), {
        ssr: false,
    }),
    CodeBlockCode,
    wrapper: function ({ children }: React.ComponentPropsWithoutRef<"div">) {
        return <div className="prose w-full" style={{ maxWidth: "100%" }}>{children}</div>;
    },
} as MDXComponents;