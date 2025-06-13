import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MDBlock(props: { children: string, className?: string }) {
    return (
        <div className={cn("prose", props.className)}>
            <Markdown remarkPlugins={[remarkGfm]}>
                {props.children}
            </Markdown>
        </div>
    )
}

export default MDBlock;