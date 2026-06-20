import { BiArrowBack, BiPlayCircle } from "react-icons/bi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProjectById } from "../lib/projects";
import { getTechIcon } from "../lib/techIcons";
import { MermaidRenderer } from "../components/MermaidRenderer";
import { Container } from "../components/Container";
import type { Components } from "react-markdown";
import type { TableSchema } from "../types";

const tagColors: Record<string, string> = {
  React: 'bg-blue-soft text-blue-deep border-blue/15',
  TypeScript: 'bg-blue-soft text-blue-deep border-blue/15',
  'Next.js': 'bg-ink/5 text-ink border-ink/10',
  'Node.js': 'bg-mint-soft text-mint-deep border-mint/15',
  PostgreSQL: 'bg-blue-soft text-blue-deep border-blue/15',
  MongoDB: 'bg-mint-soft text-mint-deep border-mint/15',
  Go: 'bg-blue-soft text-blue-deep border-blue/15',
  Laravel: 'bg-ink/5 text-ink border-ink/10',
}

function highlightJsonLike(code: string): string {
  const esc = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return esc
    .split("\n")
    .map((line) => {
      const tokens: string[] = [];
      let i = 0;

      while (i < line.length) {
        const rest = line.slice(i);

        const key = rest.match(/^("(?:[^"\\]|\\.)*?")\s*(?=:)/);
        if (key) {
          tokens.push(
            `<span style="color: var(--color-ink); font-weight: 500">${key[1]}</span>`,
          );
          i += key[0].length;
          continue;
        }

        const str = rest.match(/^"(?:[^"\\]|\\.)*?"/);
        if (str) {
          tokens.push(`<span style="color: var(--color-mint-deep)">${str[0]}</span>`);
          i += str[0].length;
          continue;
        }

        const typ = rest.match(
          /^(boolean|string|number|object|array|null|undefined|never|any|void|symbol|bigint|true|false)\b/,
        );
        if (typ) {
          tokens.push(
            `<span style="color: var(--color-blue); font-weight: 600">${typ[0]}</span>`,
          );
          i += typ[0].length;
          continue;
        }

        const num = rest.match(/^(\d+\.?\d*)\b/);
        if (num) {
          tokens.push(`<span style="color: var(--color-blue)">${num[0]}</span>`);
          i += num[0].length;
          continue;
        }

        const com = rest.match(/^(\/\/.*)/);
        if (com) {
          tokens.push(`<span style="color: var(--color-muted); font-style: italic">${com[0]}</span>`);
          i += com[0].length;
          continue;
        }

        tokens.push(line[i]);
        i++;
      }

      return tokens.join("");
    })
    .join("\n");
}

function TableGroup({ tables }: { tables: TableSchema[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      {tables.map((table, j) => (
        <div key={j} className="border border-rule bg-white rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-rule bg-paper flex items-center justify-between">
            <span className="text-sm font-medium text-ink mono">
              {table.name}
            </span>
            <span className="text-xs text-muted mono tabular-nums">
              {table.cols} cols
            </span>
          </div>
          {table.fields.length > 0 && (
            <div className="divide-y divide-rule">
              {table.fields.map((f, k) => (
                <div
                  key={k}
                  className="px-4 py-2 text-xs text-body flex items-baseline gap-2"
                >
                  <span className="font-mono text-ink">{f.field}</span>
                  <span className="text-muted">{f.type}</span>
                  <span
                    className={
                      f.nullable === "No" ? "text-ink" : "text-muted"
                    }
                  >
                    {f.nullable === "No"
                      ? "· NOT NULL"
                      : "· nullable"}
                  </span>
                  {f.default && f.default !== "" && f.default !== "NULL" && (
                    <span className="text-muted">
                      · default {f.default}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="px-4 py-2.5 border-t border-rule">
            <span className="text-xs text-muted leading-relaxed">
              {table.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const markdownComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue hover:text-blue-deep underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),

  code: ({ className, children }) => {
    const lang = className?.replace("language-", "") || "";
    const code = String(children).replace(/\n$/, "");

    if (lang === "mermaid") {
      return (
        <div className="mb-8 overflow-x-auto">
          <MermaidRenderer code={code} />
        </div>
      );
    }

    if (lang === "table-group") {
      try {
        const tables = JSON.parse(code) as TableSchema[];
        return <TableGroup tables={tables} />;
      } catch {
        return (
          <pre className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            Invalid table-group JSON
          </pre>
        );
      }
    }

    if (!className) {
      return (
        <code className="font-mono text-sm bg-paper text-ink border border-rule rounded-md px-1.5 py-0.5">
          {children}
        </code>
      );
    }

    const isHighlighted = ["json", "yaml", "bash", "ts", "tsx"].includes(lang);

    return (
      <div className="mb-8 overflow-hidden rounded-xl border border-rule">
        <div className="flex items-center gap-2 px-4 py-2 bg-paper border-b border-rule">
          <span className="w-2.5 h-2.5 rounded-full bg-rule-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule-strong" />
          <span className="ml-2 text-xs font-medium uppercase tracking-wider text-muted mono">
            {lang}
          </span>
        </div>
        <pre className="bg-white p-5 overflow-x-auto text-sm leading-7 font-mono text-ink">
          {isHighlighted ? (
            <code
              dangerouslySetInnerHTML={{
                __html: highlightJsonLike(code),
              }}
            />
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    );
  },

  pre: ({ children }) => <>{children}</>,
};

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  const [activeTab, setActiveTab] = useState<"overview" | "challenges">(
    "overview",
  );

  if (!project) {
    return (
      <div className="pt-32 text-center animate-[fadeIn_0.8s_ease-out]">
        <Container>
          <h1 className="display text-3xl font-semibold text-ink mb-4">
            Project not found
          </h1>
          <Link to="/projects" className="text-blue hover:text-blue-deep hover:underline">
            ← Back to projects
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <button
          onClick={() => navigate("/projects")}
          className="group text-sm text-muted hover:text-ink transition-colors inline-flex items-center gap-2 mb-8 mono"
        >
          <BiArrowBack className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          back to projects
        </button>

        <div className="flex items-start gap-3 mb-5">
          <span className="text-xs font-medium text-mint-deep mono uppercase tracking-[0.2em]">/case_study</span>
          <span className="h-px w-8 bg-mint/40 mt-2" />
        </div>

        <div className="flex flex-wrap items-baseline gap-3 mb-4">
          <h1 className="display text-4xl md:text-5xl xl:text-6xl font-semibold text-ink tracking-[-0.025em] leading-[1.05]">
            {project.title}
          </h1>
          <span className="text-sm text-muted mono">{project.role}</span>
        </div>
        <p className="text-base md:text-lg text-body max-w-3xl mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => {
            const Icon = getTechIcon(tech);
            return (
              <span
                key={tech}
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 border rounded-md mono ${
                  tagColors[tech] || 'bg-paper text-ink border-rule'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {tech}
              </span>
            );
          })}
        </div>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 px-5 bg-mint text-white text-sm font-medium rounded-full transition hover:bg-mint-deep active:scale-[0.98] mb-12"
          >
            <BiPlayCircle className="w-4 h-4" />
            Open live demo
          </a>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12">
          {project.metrics.map((metric, i) => {
            const isMint = i % 2 === 0
            return (
              <div
                key={metric.label}
                className={`p-5 md:p-6 border rounded-2xl ${
                  isMint
                    ? 'bg-mint-soft/40 border-mint/20'
                    : 'bg-blue-soft/40 border-blue/20'
                }`}
              >
                <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] mono ${
                  isMint ? 'text-mint-deep' : 'text-blue-deep'
                }`}>
                  {metric.label}
                </span>
                <span className={`mt-2 block display text-2xl md:text-3xl font-semibold tabular-nums ${
                  isMint ? 'text-mint-deep' : 'text-blue-deep'
                }`}>
                  {metric.value}
                </span>
              </div>
            )
          })}
        </div>

        <div className="flex gap-1 mb-8 border-b border-rule">
          {[
            { key: "overview" as const, label: "Architecture & Flow" },
            { key: "challenges" as const, label: "Challenges & Solutions" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint" />
              )}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "overview" ? (
            <div className="prose prose-slate max-w-none bg-white border border-rule rounded-2xl p-8 md:p-10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {project.body}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="space-y-4">
              {project.challenges.map((c, i) => (
                <div
                  key={i}
                  className="bg-white border border-rule rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-9 h-9 bg-mint-soft border border-mint/20 rounded-lg flex items-center justify-center text-sm font-semibold text-mint-deep mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold tracking-[0.15em] block mb-1.5 text-red-600 mono uppercase">
                        Problem
                      </span>
                      <p className="text-base text-ink leading-relaxed">
                        {c.problem}
                      </p>
                      <div className="w-8 h-px bg-rule my-5" />
                      <span className="text-[10px] font-semibold tracking-[0.15em] block mb-1.5 text-mint-deep mono uppercase">
                        Solution
                      </span>
                      <p className="text-base text-body leading-relaxed">
                        {c.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};