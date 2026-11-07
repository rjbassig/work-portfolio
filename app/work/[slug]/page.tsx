import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/site";
import { Arrow } from "@/components/icons";
import { ProjectPreview } from "@/components/project-preview";
import { GridcastCarousel } from "@/components/gridcast-carousel";
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const gridcast = project.slug === "gridcast";
  const sections = [
    ["01 / Overview", project.detail.overview],
    ["02 / Problem", project.detail.problem],
    ["03 / Approach", project.detail.methodology],
    ["04 / Technical stack", project.technologies.join(" · ")],
    ["05 / Visualization", gridcast ? "Verified CAISO OASIS research exports shown above. The full dashboard supports historical exploration, replay, model comparison, source quality, and research findings." : "Illustrative visualization only. It communicates the project direction rather than a completed experimental result."],
    ["06 / Future development", project.detail.evaluation],
  ];
  return <article className="shell record">
    <Link href="/work" className="back-link">← WORK INDEX</Link>
    <header className="record-head"><p className="eyebrow">PROJECT / {project.number}</p><h1>{project.name}</h1><p>{project.title}</p></header>
    <div className="record-meta"><div><span>DOMAIN</span><b>{project.domain}</b></div><div><span>FOCUS</span><b>{project.focus.join(" · ")}</b></div><div><span>TOOLS</span><b>{project.technologies.join(" · ")}</b></div></div>
    {gridcast ? <><GridcastCarousel /><a className="gridcast-explore" href="https://gridcast.rjbassig.dev" target="_blank" rel="noreferrer">EXPLORE GRIDCAST <Arrow /></a></> : <ProjectPreview project={project} />}
    <div className="record-grid">{sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div>
    <a className={`record-github ${gridcast ? "with-datasets" : ""}`} href={gridcast ? "https://github.com/rjbassig/Gridcast" : "https://github.com/rjbassig"} target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
    {gridcast && <section className="record-datasets" aria-labelledby="gridcast-datasets"><h2 id="gridcast-datasets">DATASETS</h2><p>Official public source records only; GridCast’s processed research exports are generated locally and are not offered as a separate download.</p><a href="https://www.caiso.com/systems-applications/portals-applications/open-access-same-time-information-system-oasis" target="_blank" rel="noreferrer"><b>CAISO OASIS / System demand</b><span>CA ISO-TAC actual system load and <code>SLD_FCST</code> forecasting records for the California ISO balancing area, in MW.</span><Arrow /></a><a href="https://www.caiso.com/documents/oasis-interfacespecification_v4_3_5clean_spring2017release.pdf" target="_blank" rel="noreferrer"><b>CAISO OASIS / Day-ahead pricing</b><span><code>PRC_LMP</code> day-ahead total LMP for the TH_NP15_GEN-APND trading hub, in USD/MWh.</span><Arrow /></a></section>}
  </article>;
}
