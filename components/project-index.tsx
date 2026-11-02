import Link from "next/link";
import type { Project } from "@/data/site";
import { Arrow } from "./icons";
import { ProjectPreview } from "./project-preview";
export function ProjectIndex({ items }: { items: Project[] }) { return <div className="project-index">{items.map((project) => <Link className="project-row" href={`/work/${project.slug}`} key={project.slug}><span className="project-number">{project.number}</span><div className="project-main"><span className="project-name">{project.name}</span><h3>{project.title}</h3><p>{project.summary}</p><small>{project.technologies.join(" · ")}</small></div><ProjectPreview project={project} compact /><span className="project-domain">{project.domain}</span><span className="project-arrow"><Arrow diagonal /></span></Link>)}</div>; }
