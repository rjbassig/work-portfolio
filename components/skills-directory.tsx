"use client";

import { useState, type CSSProperties } from "react";
import styles from "./skills-directory.module.css";

type Skill = { name: string; verified: boolean };
type Category = { number: string; title: string; skills: Skill[] };

const verified = new Set(["Python", "SQL", "JavaScript", "TypeScript", "HTML", "CSS", "Machine Learning", "Predictive Modeling", "Statistical Analysis", "Time Series Forecasting", "Feature Engineering", "Model Evaluation", "Data Visualization", "Geospatial Analysis", "Data Preprocessing", "Data Cleaning", "Statistical Modeling", "Probability & Statistics", "PyTorch", "scikit-learn", "XGBoost", "Pandas", "NumPy", "SciPy", "GeoPandas", "statsmodels", "React", "Next.js", "Node.js", "Tailwind CSS", "Three.js", "SGP4", "H3", "PostgreSQL", "PostGIS", "AWS", "Amazon Web Services (AWS)", "Docker", "Git", "GitHub", "Jupyter Notebook"]);
const list = (names: string[]) => names.map((name) => ({ name, verified: verified.has(name) }));
const categories: Category[] = [
  { number: "01", title: "Languages", skills: list(["Python", "Java", "JavaScript", "TypeScript", "SQL", "C", "C++", "Go", "Bash", "HTML", "CSS"]) },
  { number: "02", title: "Machine Learning & Data Science", skills: list(["Machine Learning", "Deep Learning", "Predictive Modeling", "Statistical Analysis", "Regression Analysis", "Classification", "Time Series Forecasting", "Feature Engineering", "Model Evaluation", "Data Visualization", "Exploratory Data Analysis", "Geospatial Analysis", "Natural Language Processing", "Computer Vision", "Neural Networks", "Data Preprocessing", "Data Cleaning", "Statistical Modeling", "Probability & Statistics"]) },
  { number: "03", title: "Frameworks & Libraries", skills: list(["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "Pandas", "NumPy", "SciPy", "GeoPandas", "Matplotlib", "Seaborn", "statsmodels", "SHAP", "React", "Next.js", "Node.js", "FastAPI", "Flask", "Tailwind CSS", "Three.js", "D3.js", "SGP4", "H3"]) },
  { number: "04", title: "Databases & Data Engineering", skills: list(["PostgreSQL", "PostGIS", "MySQL", "SQLite", "MongoDB", "Redis", "DynamoDB", "Supabase", "Pinecone", "DuckDB", "Apache Kafka", "ClickHouse", "ETL Pipelines", "Data Modeling", "Database Design", "REST APIs", "Data Integration"]) },
  { number: "05", title: "Cloud & Infrastructure", skills: list(["Amazon Web Services (AWS)", "Amazon S3", "EC2", "AWS Lambda", "Amazon RDS", "API Gateway", "AWS Bedrock", "Amazon SageMaker", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Cloudflare", "Vercel", "Nginx", "Linux", "Cloud Computing"]) },
  { number: "06", title: "Developer Tools & Platforms", skills: list(["Git", "GitHub", "GitLab", "VS Code", "Jupyter Notebook", "JupyterLab", "Anaconda", "Google Colab", "Postman", "Mapbox", "OpenTelemetry", "WebSockets", "gRPC", "npm", "GitHub Pages"]) }
];

export function SkillsDirectory() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  function toggle(number: string) { setOpen((current) => { const next = new Set(current); next.has(number) ? next.delete(number) : next.add(number); return next; }); }
  return <section className={styles.directory} aria-labelledby="skills-heading"><p className="eyebrow" id="skills-heading">TECHNICAL SKILLS</p><div className={styles.list}>{categories.map((category) => { const expanded = open.has(category.number); const panelId = `skills-${category.number}`; return <div className={`${styles.category}${expanded ? ` ${styles.open}` : ""}`} key={category.number}><button className={styles.trigger} type="button" onClick={() => toggle(category.number)} aria-expanded={expanded} aria-controls={panelId}><span className={styles.number}>{category.number} /</span><span className={styles.title}>{category.title}</span><span className={styles.toggle} aria-hidden="true"><i /><i /></span></button><div className={styles.panel} id={panelId} aria-hidden={!expanded}><div className={styles.panelInner}><div className={styles.grid}>{category.skills.map((skill, index) => <span className={styles.skill} style={{ "--skill-index": index } as CSSProperties} key={skill.name}>{skill.name}</span>)}</div></div></div></div>; })}</div></section>;
}
