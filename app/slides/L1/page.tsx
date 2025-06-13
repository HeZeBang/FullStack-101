import { SlideT } from "@/lib/props";
import MDBlock from "@/components/MdBlock";
import Slides from "@/components/template/GeekPieTemplate";

const slides = [
  {
    title: "Web 二三事"
  },
  {
    title: "访问网页的过程",
    subtitle: "从输入网址到页面加载",
    content: (<>
      <MDBlock>{`
- 用户输入网址
- 浏览器解析网址
- DNS 查询域名对应的 IP 地址
- 浏览器发送 HTTP 请求
- 服务器处理请求
- 服务器返回 HTML 文档
- 浏览器解析 HTML
- 浏览器渲染页面
- 页面加载完成
      `}</MDBlock></>),

  },
  {
    title: "为什么网页存活了这么久？",
    content: (
      <div className="flex justify-center items-center flex-col gap-5 w-full">
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