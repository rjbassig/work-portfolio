import { Chessboard } from "@/components/chessboard";
import { skills } from "@/data/site";
export const metadata = { title: "Personal" };
export default function PersonalPage() { return <section className="shell personal-page"><p className="eyebrow">03 / PERSONAL</p><div className="personal-intro"><h1>randall bassig <span>work in progress</span></h1></div><Chessboard /><section className="toolset"><p className="eyebrow">WORKING TOOLSET</p>{skills.map(([label, content]) => <div key={label}><span>{label}</span><p>{content}</p></div>)}</section></section>; }
