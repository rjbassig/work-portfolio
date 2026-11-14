import Link from "next/link";

export default function CrashTestDashboardPage() {
  return <article className="shell crash-test-dashboard-page">
    <Link href="/work/crash-test" className="back-link">← CRASH TEST PROJECT</Link>
    <header><p className="eyebrow">CRASH TEST / INTERACTIVE RESEARCH DASHBOARD</p><h1>Collision forecasting</h1><p>Aggregate historical collision analysis and stored held-out forecasting results across San Diego Police beats.</p></header>
    <iframe title="Crash Test interactive dashboard" src="https://crashtest.rjbassig.dev" loading="lazy" />
  </article>;
}
