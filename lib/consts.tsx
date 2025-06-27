import Universe from "@/components/magicui/universe";
import { MDXComponents } from "next-mdx-remote-client";
import dynamic from "next/dynamic";

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
    wrapper: function ({ children }: React.ComponentPropsWithoutRef<"div">) {
        return <div className="prose max-w-full">{children}</div>;
    },
} as MDXComponents;