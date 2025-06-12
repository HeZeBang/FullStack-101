import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MDBlock(props: { children: string }) {
    return (
        <div className="prose">
            <Markdown remarkPlugins={[remarkGfm]}>
                {props.children}
            </Markdown>
        </div>
    )
}

export default MDBlock;