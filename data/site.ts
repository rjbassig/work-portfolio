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
  { slug: "gridcast", number: "001", name: "GridCast", title: "California Electricity Demand & Price Forecasting", summary: "Forecasting demand and price behavior across California's electricity system.", domain: "Energy / Forecasting", preview: "grid", technologies: ["Python", "Pandas", "XGBoost", "PyTorch", "statsmodels"], focus: ["time series", "walk-forward validation", "grid data"], detail: { overview: "A forecasting study of electricity demand and price behavior in California's grid context.", problem: "Forecasting must be evaluated at the same points in time a real decision would be made. The project focuses on framing the target and horizon before choosing a model.", data: "The data record and final coverage are still being assembled. Source documentation and preprocessing choices will be published with the project.", methodology: "The study is structured to compare transparent baselines with statistical and machine-learning approaches under a walk-forward validation design.", evaluation: "Evaluation criteria and error analysis will be documented once the experimental protocol is finalized.", results: "No results are presented yet. The visual preview is synthetic and illustrates the kind of forecast diagnostic this project will contain." } },
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
