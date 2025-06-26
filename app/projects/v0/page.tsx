import Slides from "@/components/template/GeekPieTemplate"
import { SlideT } from "@/lib/props"

const slides = [
  {
    
  }
] as SlideT[]

export default function Page() {
  return <Slides data={slides} subtitle={
    <>
      <b>Project v0</b> - About ME!
    </>
  } />
}