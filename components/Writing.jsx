"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FILTERS = [
  ["all", "All"],
  ["essay", "Essays"],
  ["memo", "Policy memos"],
];

export default function Writing({ posts }) {
  const [filter, setFilter] = useState("all");
  const shown = posts.filter((p) => filter === "all" || p.kind === filter);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter writing">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            className={`filter ${filter === key ? "active" : ""}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="post-list">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              className="post"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="post-meta">
                <span className={`post-kind ${p.kind}`}>{p.kind}</span>
                <span className="post-date">{p.date}</span>
              </div>
              <div className="post-body">
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="post-go" aria-hidden="true">
                ↗
              </span>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
