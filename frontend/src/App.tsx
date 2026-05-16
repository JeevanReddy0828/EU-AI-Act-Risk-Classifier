import { useState } from "react";
import { AssessmentForm } from "./components/AssessmentForm";
import { RiskBadge } from "./components/RiskBadge";
import { ComplianceChecklist } from "./components/ComplianceChecklist";
import type { AssessmentRequest, AssessmentResult } from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: AssessmentRequest) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/classify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(err.detail || `Server error ${res.status}`);
      }

      const json: AssessmentResult = await res.json();
      setResult(json);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">EU</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 text-lg">AIComply</span>
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                EU AI Act 2024/1689
              </span>
            </div>
          </div>
          <a
            href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline hidden sm:block"
          >
            View Regulation ↗
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            EU AI Act Risk Classifier
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Describe your AI system and get an instant risk classification under EU Regulation 2024/1689 —
            with your compliance obligations, fine exposure, and a prioritised action plan.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            {[
              { color: "bg-red-400", label: "Prohibited" },
              { color: "bg-orange-400", label: "High Risk" },
              { color: "bg-yellow-400", label: "Limited Risk" },
              { color: "bg-green-400", label: "Minimal Risk" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                <span className="text-xs text-gray-500">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid gap-8 ${result ? "grid-cols-1 lg:grid-cols-2 items-start" : "grid-cols-1 max-w-2xl mx-auto"}`}>
          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-5 text-base">Describe Your AI System</h2>
            <AssessmentForm onSubmit={handleSubmit} loading={loading} />
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <RiskBadge
                riskLevel={result.risk_level}
                riskLabel={result.risk_label}
                riskColor={result.risk_color}
                fineExposure={result.fine_exposure}
                deadline={result.compliance_deadline}
              />
              <ComplianceChecklist
                requirements={result.compliance_requirements}
                documentationNeeded={result.documentation_needed}
                nextSteps={result.next_steps}
                articlesTriggered={result.articles_triggered}
                annexCategories={result.annex_categories}
                prohibitedReason={result.prohibited_reason}
                summary={result.summary}
              />
              <button
                onClick={() => setResult(null)}
                className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
              >
                ← Assess another system
              </button>
            </div>
          )}
        </div>

        {/* Stats bar (shown only before first result) */}
        {!result && (
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { stat: "Aug 2026", label: "High-risk compliance deadline" },
              { stat: "€35M", label: "Max fine for prohibited AI" },
              { stat: "4 tiers", label: "Risk classification levels" },
            ].map((s) => (
              <div key={s.stat} className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-xl font-bold text-blue-600">{s.stat}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-xs text-gray-300 border-t border-gray-100 mt-10">
        For informational purposes only · Not legal advice · EU AI Act Regulation 2024/1689
      </footer>
    </div>
  );
}
