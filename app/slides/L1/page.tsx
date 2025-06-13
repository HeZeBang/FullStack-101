import { SlideT } from "@/app/types/Slides";
import Slides from "@/components/template/GeekPieTemplate";

const slides = [
    {
        title: "Web 二三事"
    },
    {
        title: ""
    }
] as SlideT[]

export default function Page() {
    return <Slides data={slides} subtitle="Lecture 1" />
}