export type Project = {
  slug: string;
  number: string;
  name: string;
  title: string;
  summary: string;
  technologies: string[];
  focus: string[];
  domain: string;
  preview: "grid" | "crash" | "orbit" | "market";
  detail: { overview: string; problem: string; data: string; methodology: string; evaluation: string; results: string };
};

export const site = {
  name: "Randall Bassig",
  role: "Data Science @ UC San Diego",
  description: "Portfolio of Randall Bassig, a UC San Diego Data Science student working on machine learning, forecasting, and data systems.",
  email: "rjsbassig@gmail.com",
  links: {
    github: "https://github.com/rjbassig",
    linkedin: "https://www.linkedin.com/in/rjbsg/",
    instagram: "https://www.instagram.com/rvndvx/",
    resume: "/resume.pdf"
  }
};

export const projects: Project[] = [
  { slug: "gridcast", number: "001", name: "GridCast", title: "California Electricity Demand & Price Forecasting", summary: "Historical CAISO demand and NP15 day-ahead price forecasting with reproducible evaluation.", domain: "Energy / Forecasting", preview: "grid", technologies: ["Python", "Pandas", "XGBoost", "PyTorch", "statsmodels"], focus: ["time series", "walk-forward validation", "CAISO OASIS"], detail: { overview: "A standalone research platform for historical California electricity demand and NP15 day-ahead price forecasting, with a FastAPI research API and an interactive dashboard.", problem: "Each forecast is evaluated only with information assumed available at its issue time. The work prioritizes honest target timing, publication-delay assumptions, and historical provenance over a generic leaderboard.", data: "The executed study uses 2024–2025 CAISO OASIS actual load and NP15 day-ahead total LMP observations. Raw acquisition, UTC normalization, quality checks, and processed data generation are reproducible in the separate GridCast repository.", methodology: "Direct 1, 6, 24, 48, and 168-hour horizons compare persistence and seasonal baselines with ridge, seasonal AR, XGBoost, LightGBM, and a compact PyTorch GRU. Quarterly expanding fits, purged calibration, and walk-forward held-out evaluation prevent random-split leakage.", evaluation: "The research report retains model comparison, error segments, validation-only permutation importance, and 90% split-conformal interval checks. Results are historical research findings—not live operational claims—and document limits including revision-vintage uncertainty and a single price hub.", results: "For the verified 24-hour held-out evaluation, LightGBM demand MAE was 1,191.45 MW and ridge price MAE was $6.03/MWh. See the report for methodology, coverage, and limitations." } },
  { slug: "crash-test", number: "002", name: "CRASH TEST", title: "Spatiotemporal Traffic Collision Risk Forecasting", summary: "Leakage-safe forecasting of relative collision risk across San Diego Police beats.", domain: "Urban Safety / Forecasting", preview: "crash", technologies: ["Python", "Pandas", "scikit-learn", "FastAPI", "Next.js"], focus: ["collision forecasting", "rolling-origin validation", "responsible ML"], detail: { overview: "A reproducible aggregate forecasting study for next-week collision counts across San Diego Police beats.", problem: "The City source provides police beats and block-level address components, not verified coordinates. The project forecasts aggregate risk rather than inventing street-level precision.", data: "The executed source snapshot contains 78,715 unique San Diego Police reports from 2015-03-19 through 2026-11-06 across 148 beats.", methodology: "Lagged and shifted rolling collision, injury, fatality, and hit-and-run features are evaluated with Poisson regression, gradient boosting, rolling origins, calibration, ablation, bootstrap uncertainty, and a disjoint-beat test.", evaluation: "Chronological split: training through 2023, validation in 2024, and fully held-out 2025 evaluation. All history features shift by one week to prevent target leakage.", results: "On 7,696 held-out beat-week rows in 2025, gradient boosting achieved MAE 0.697 versus 0.842 for Poisson regression and 0.888 for seasonal naive. Top-decile ranking lift was 3.587x." } },
  { slug: "orbitrisk", number: "003", name: "OrbitRisk", title: "Satellite Conjunction Risk Modeling", summary: "Public-TLE conjunction screening with transparent synthetic uncertainty experiments.", domain: "Scientific Computing", preview: "orbit", technologies: ["Python", "NumPy", "SciPy", "SGP4", "FastAPI", "React", "TypeScript", "Three.js"], focus: ["public orbital data", "conjunction screening", "uncertainty"], detail: { overview: "A reproducible orbital-science application that ingests attributed public TLE data, propagates compatible elements with SGP4, and presents an interactive 3D view of the computed trajectories.", problem: "Close approaches depend on changing relative geometry, element freshness, and uncertainty. Public TLE records support geometric screening, but do not include the covariance information needed for an operational collision probability.", data: "The project preserves a credential-free CelesTrak Resource snapshot with 167 valid NORAD objects, TLE epochs, source attribution, retrieval metadata, filtering criteria, and a published SHA-256 checksum.", methodology: "A bounded 167-object public Resource TLE catalog is propagated in the TEME inertial frame. A coarse 10-minute pairwise screen identifies candidate approaches, then bounded scalar minimization refines TCA, miss distance, and relative velocity. Synthetic probability experiments are isolated from real events.", evaluation: "The release validates TLE parsing, SGP4 state generation, and deterministic seeded Monte Carlo. It intentionally does not claim operational accuracy, Earth-fixed coordinates, or covariance-based risk from public TLEs.", results: "The current verified Resource snapshot produced 5,738 geometric candidates below 1,000 km in a 24-hour screen; the app ranks the nearest approaches separately and keeps synthetic probability isolated from real events." } },
  { slug: "marketregime", number: "004", name: "MarketRegime", title: "Financial Market Regime Detection", summary: "Studying changes in market behavior using unsupervised statistical models.", domain: "Finance / Statistical ML", preview: "market", technologies: ["Python", "Pandas", "NumPy", "scikit-learn", "statsmodels"], focus: ["financial time series", "unsupervised learning", "evaluation"], detail: { overview: "A study of how statistical representations can describe shifts in market behavior over time.", problem: "Regimes should be interpretable and stable enough to be evaluated rather than merely visually compelling clusters.", data: "The data source, transformations, and sampling decisions will be made explicit as the analysis matures.", methodology: "Candidate unsupervised and statistical approaches are compared through their assumptions, stability, and explanatory value.", evaluation: "Planned checks include robustness across windows and out-of-sample behavior without making predictive claims prematurely.", results: "No results are presented yet. The preview is a synthetic demonstration of changing market phases, not financial advice or historical analysis." } }
];

export const writing = [{ number: "001", slug: "building-with-ai-made-me-want-to-understand-code", date: "November 2, 2026", category: "tech", title: "Building With AI Made Me Want to Understand Code", subtitle: "What hackathons, personal projects, and AI-assisted development taught me about engineering." }];

export const skills = [
  ["Languages", "Python · SQL"],
  ["Data & ML", "Pandas · NumPy · scikit-learn · PyTorch · XGBoost · statsmodels · SciPy"],
  ["Data systems", "PostgreSQL · PostGIS · AWS · Docker"],
  ["Spatial", "GeoPandas · H3"],
  ["Workflow", "Git · GitHub · Jupyter"]
];
