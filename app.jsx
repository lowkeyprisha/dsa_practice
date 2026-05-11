import { useState, useMemo } from "react";
import { PATTERNS, ALL_QUESTIONS, SCHEDULE, DIFF_COLOR, patColor } from "./data.js";
import QuestionRow from "./components/QuestionRow.jsx";

export default function App() {
  const [view, setView] = useState("schedule"); // "schedule" | "patterns" | "all"
  const [selectedPat, setSelectedPat] = useState(null);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState({});
  const [diffFilter, setDiffFilter] = useState("All");
  const [expandedDay, setExpandedDay] = useState(1);

  const toggleChecked = (id) =>
    setChecked((c) => ({ ...c, [id]: !c[id] }));

  const totalDone = Object.values(checked).filter(Boolean).length;

  const filteredAll = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      const matchPat = selectedPat ? q.pat === selectedPat : true;
      const matchDiff = diffFilter === "All" ? true : q.diff === diffFilter;
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
      return matchPat && matchDiff && matchSearch;
    });
  }, [selectedPat, diffFilter, search]);

  const weekOf = (day) =>
    `Week ${Math.ceil(day / 7)} · Month ${Math.ceil(day / 30)}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "#e8e8e8",
        fontFamily: "'DM Mono', 'Fira Mono', monospace",
      }}
    >
      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #111 0%, #1a1a2e 50%, #0f0f1a 100%)",
          borderBottom: "1px solid #222",
          padding: "28px 32px 0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 20,
              marginBottom: 6,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  color: "#6366f1",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                DSA · 3-Month Master Plan
              </div>
              <h1
                style={{
                  fontSize: "clamp(22px, 4vw, 38px)",
                  fontWeight: 700,
                  margin: 0,
                  background:
                    "linear-gradient(90deg, #fff 0%, #a78bfa 60%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: -1,
                }}
              >
                500 Questions · 90 Days · 20 Patterns
              </h1>
            </div>

            {/* Progress counter */}
            <div
              style={{ marginLeft: "auto", textAlign: "right", paddingBottom: 4 }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, color: "#6366f1" }}>
                {totalDone}
                <span style={{ fontSize: 14, color: "#555", fontWeight: 400 }}>
                  /500
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#555" }}>solved</div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 3,
              background: "#1e1e1e",
              borderRadius: 2,
              margin: "12px 0 0",
            }}
          >
            <div
              style={{
                height: 3,
                borderRadius: 2,
                width: `${(totalDone / 500) * 100}%`,
                background: "linear-gradient(90deg, #6366f1, #a78bfa)",
                transition: "width 0.3s",
              }}
            />
          </div>

          {/* Nav tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 16 }}>
            {[
              ["schedule", "📅 Day Schedule"],
              ["patterns", "🗂 By Pattern"],
              ["all", "📋 All Questions"],
            ].map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "10px 22px",
                  background: "none",
                  border: "none",
                  borderBottom:
                    view === v ? "2px solid #6366f1" : "2px solid transparent",
                  color: view === v ? "#a78bfa" : "#555",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {/* ── SCHEDULE VIEW ── */}
        {view === "schedule" && (
          <div>
            <div style={{ color: "#444", fontSize: 12, marginBottom: 20 }}>
              Click a day to expand · Tick ✓ to mark solved
            </div>

            {SCHEDULE.map(({ day, questions }) => {
              const isOpen = expandedDay === day;
              const dayDone = questions.filter((q) => checked[q.id]).length;
              const allDayDone = dayDone === questions.length;

              return (
                <div
                  key={day}
                  style={{
                    marginBottom: 8,
                    borderRadius: 10,
                    border: `1px solid ${isOpen ? "#6366f1" : "#1e1e1e"}`,
                    background: isOpen ? "#111" : "#0f0f0f",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* Day header row */}
                  <div
                    onClick={() =>
                      setExpandedDay(isOpen ? null : day)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "13px 18px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        minWidth: 50,
                        color: allDayDone
                          ? "#22c55e"
                          : isOpen
                          ? "#a78bfa"
                          : "#444",
                      }}
                    >
                      DAY {day}
                    </span>

                    <span style={{ fontSize: 11, color: "#333" }}>
                      {weekOf(day)}
                    </span>

                    {/* Pattern chips */}
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        flex: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {questions.map((q) => (
                        <span
                          key={q.id}
                          style={{
                            fontSize: 10,
                            padding: "2px 7px",
                            borderRadius: 4,
                            background: checked[q.id]
                              ? "#1a2e1a"
                              : "#1a1a1a",
                            color: checked[q.id]
                              ? "#22c55e"
                              : patColor(q.pat),
                            border: `1px solid ${
                              checked[q.id]
                                ? "#22c55e44"
                                : patColor(q.pat) + "33"
                            }`,
                          }}
                        >
                          {checked[q.id] ? "✓ " : ""}
                          {q.pat.split(" ")[0]}
                        </span>
                      ))}
                    </div>

                    {/* Day progress */}
                    <span
                      style={{
                        fontSize: 12,
                        color: allDayDone ? "#22c55e" : "#333",
                        marginLeft: "auto",
                        minWidth: 40,
                        textAlign: "right",
                      }}
                    >
                      {dayDone}/{questions.length}
                    </span>

                    <span style={{ color: "#333", fontSize: 12 }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Expanded questions */}
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 18px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      {questions.map((q) => (
                        <QuestionRow
                          key={q.id}
                          q={q}
                          checked={!!checked[q.id]}
                          onToggle={() => toggleChecked(q.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── PATTERNS VIEW ── */}
        {view === "patterns" && (
          <div>
            {/* Pattern filter chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 24,
              }}
            >
              {PATTERNS.map((p) => {
                const count = ALL_QUESTIONS.filter((q) => q.pat === p).length;
                const done = ALL_QUESTIONS.filter(
                  (q) => q.pat === p && checked[q.id]
                ).length;
                return (
                  <button
                    key={p}
                    onClick={() =>
                      setSelectedPat(selectedPat === p ? null : p)
                    }
                    style={{
                      padding: "9px 16px",
                      borderRadius: 8,
                      background:
                        selectedPat === p ? patColor(p) + "22" : "#111",
                      border: `1px solid ${
                        selectedPat === p ? patColor(p) : "#222"
                      }`,
                      color: selectedPat === p ? patColor(p) : "#666",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span>{p}</span>
                    <span style={{ fontSize: 10, opacity: 0.7 }}>
                      {done}/{count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 7 }}
            >
              {(selectedPat
                ? ALL_QUESTIONS.filter((q) => q.pat === selectedPat)
                : ALL_QUESTIONS
              ).map((q) => (
                <QuestionRow
                  key={q.id}
                  q={q}
                  checked={!!checked[q.id]}
                  onToggle={() => toggleChecked(q.id)}
                  showPat
                />
              ))}
            </div>
          </div>
        )}

        {/* ── ALL QUESTIONS VIEW ── */}
        {view === "all" && (
          <div>
            {/* Search + diff filters */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search questions…"
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: "10px 16px",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: 8,
                  color: "#e8e8e8",
                  fontSize: 13,
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
              {["All", "Easy", "Medium", "Hard"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiffFilter(d)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    background:
                      diffFilter === d
                        ? (DIFF_COLOR[d] || "#6366f1") + "22"
                        : "#111",
                    border: `1px solid ${
                      diffFilter === d
                        ? DIFF_COLOR[d] || "#6366f1"
                        : "#222"
                    }`,
                    color:
                      diffFilter === d
                        ? DIFF_COLOR[d] || "#a78bfa"
                        : "#555",
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>

            <div
              style={{ color: "#333", fontSize: 11, marginBottom: 12 }}
            >
              {filteredAll.length} questions
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 7 }}
            >
              {filteredAll.map((q) => (
                <QuestionRow
                  key={q.id}
                  q={q}
                  checked={!!checked[q.id]}
                  onToggle={() => toggleChecked(q.id)}
                  showPat
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}