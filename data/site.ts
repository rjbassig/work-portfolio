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
  { slug: "crashcast", number: "002", name: "CrashCast", title: "Spatiotemporal Traffic Collision Prediction", summary: "Modeling collision risk through spatial features and time-aware validation.", domain: "Geospatial / Risk", preview: "crash", technologies: ["Python", "GeoPandas", "PostGIS", "H3", "XGBoost"], focus: ["geospatial ML", "spatial features", "risk modeling"], detail: { overview: "A geospatial modeling study of where and when traffic collision risk may vary.", problem: "The challenge is to define a useful spatial unit and prediction window without allowing nearby or future information to leak into evaluation.", data: "Collision, road-network, and contextual inputs will be documented as the study area and data pipeline are finalized.", methodology: "The project explores spatial feature engineering and geographically aware validation for interpretable risk estimates.", evaluation: "The final evaluation will account for spatial separation and practical tradeoffs between signal, coverage, and interpretability.", results: "No findings are presented yet. The preview uses illustrative density marks only, not observed collision data." } },
  { slug: "orbitrisk", number: "003", name: "OrbitRisk", title: "Satellite Conjunction Risk Modeling", summary: "Probabilistic modeling of uncertainty in orbital conjunction risk.", domain: "Scientific Computing", preview: "orbit", technologies: ["Python", "SciPy", "NumPy", "scikit-learn", "SGP4"], focus: ["orbital data", "probability", "uncertainty"], detail: { overview: "A scientific-computing project exploring probabilistic reasoning around orbital conjunction risk.", problem: "Conjunction questions involve uncertain orbital states, changing geometry, and an imbalance between ordinary and consequential events.", data: "Orbital inputs, assumptions, and propagation choices will be documented with the first reproducible experiment.", methodology: "The project is designed around scientific computing, uncertainty-aware features, and careful probabilistic modeling.", evaluation: "Future evaluation will distinguish discrimination from calibration and include clear assumptions and limitations.", results: "No conclusions are presented yet. The orbital figure is an illustrative geometry, not a record of an observed event." } },
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
