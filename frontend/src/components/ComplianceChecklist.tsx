import type { ComplianceRequirement, Effort, Urgency } from "../types";

const URGENCY_LABELS: Record<Urgency, { label: string; color: string }> = {
  immediate: { label: "Immediate", color: "bg-red-100 text-red-700" },
  before_deployment: { label: "Before Deployment", color: "bg-orange-100 text-orange-700" },
  ongoing: { label: "Ongoing", color: "bg-blue-100 text-blue-700" },
};

const EFFORT_LABELS: Record<Effort, { label: string; color: string }> = {
  high: { label: "High Effort", color: "text-red-600" },
  medium: { label: "Medium Effort", color: "text-orange-600" },
  low: { label: "Low Effort", color: "text-green-600" },
};

interface Props {
  requirements: ComplianceRequirement[];
  documentationNeeded: string[];
  nextSteps: string[];
  articlesTriggered: string[];
  annexCategories: string[];
  prohibitedReason: string | null;
  summary: string;
}

export function ComplianceChecklist({
  requirements,
  documentationNeeded,
  nextSteps,
  articlesTriggered,
  annexCategories,
  prohibitedReason,
  summary,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-2">Assessment Summary</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>

        {prohibitedReason && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Why This Is Prohibited</p>
            <p className="text-sm text-red-700">{prohibitedReason}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {articlesTriggered.map((a) => (
            <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
              {a}
            </span>
          ))}
          {annexCategories.map((a) => (
            <span key={a} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Compliance Requirements */}
      {requirements.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">
            Compliance Requirements
            <span className="ml-2 text-xs font-normal bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {requirements.length} items
            </span>
          </h3>
          <div className="space-y-3">
            {requirements.map((req, i) => {
              const urgency = URGENCY_LABELS[req.urgency as Urgency] ?? { label: req.urgency, color: "bg-gray-100 text-gray-600" };
              const effort = EFFORT_LABELS[req.effort as Effort] ?? { label: req.effort, color: "text-gray-600" };
              return (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-800">{req.requirement}</p>
                      <span className="text-xs font-mono text-gray-400">{req.article}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{req.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgency.color}`}>
                        {urgency.label}
                      </span>
                      <span className={`text-xs font-medium ${effort.color}`}>{effort.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Documentation Needed */}
      {documentationNeeded.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Documentation Required</h3>
          <ul className="space-y-2">
            {documentationNeeded.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-gray-400 mt-0.5">📄</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
          <h3 className="font-semibold text-blue-800 mb-3">Recommended Next Steps</h3>
          <ol className="space-y-2">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-blue-800">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        This assessment is for informational purposes only and does not constitute legal advice.
        Consult a qualified EU AI Act legal expert for your specific situation.
      </p>
    </div>
  );
}
