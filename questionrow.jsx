import { DIFF_COLOR, patColor } from "../data.js";

export default function QuestionRow({ q, checked, onToggle, showPat }) {
  const lcSlug = q.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 8,
        background: checked ? "#0e1f0e" : "#111",
        border: `1px solid ${checked ? "#22c55e22" : "#1a1a1a"}`,
        transition: "all 0.15s",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          border: `1.5px solid ${checked ? "#22c55e" : "#333"}`,
          background: checked ? "#22c55e" : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: "#000",
          flexShrink: 0,
        }}
      >
        {checked ? "✓" : ""}
      </button>

      {/* ID */}
      <span style={{ fontSize: 11, color: "#333", minWidth: 28 }}>#{q.id}</span>

      {/* Title + LC link */}
      <span
        style={{
          fontSize: 13,
          flex: 1,
          textDecoration: checked ? "line-through" : "none",
          color: checked ? "#444" : "#ddd",
        }}
      >
        {q.title}
        {q.lc > 0 && (
          <a
            href={`https://leetcode.com/problems/${lcSlug}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: 8,
              fontSize: 10,
              color: "#6366f155",
              textDecoration: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            LC#{q.lc} ↗
          </a>
        )}
      </span>

      {/* Pattern badge */}
      {showPat && (
        <span
          style={{
            fontSize: 10,
            padding: "3px 8px",
            borderRadius: 4,
            color: patColor(q.pat),
            background: patColor(q.pat) + "18",
            border: `1px solid ${patColor(q.pat)}30`,
            whiteSpace: "nowrap",
          }}
        >
          {q.pat}
        </span>
      )}

      {/* Difficulty */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          minWidth: 48,
          textAlign: "right",
          color: DIFF_COLOR[q.diff],
        }}
      >
        {q.diff}
      </span>
    </div>
  );
}