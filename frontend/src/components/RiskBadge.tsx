import type { RiskColor, RiskLevel } from "../types";

const CONFIG: Record<RiskColor, { bg: string; border: string; text: string; icon: string }> = {
  red: {
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
    icon: "🚫",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-300",
    text: "text-orange-800",
    icon: "⚠️",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-800",
    icon: "ℹ️",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-800",
    icon: "✅",
  },
};

const DESCRIPTIONS: Record<RiskLevel, string> = {
  PROHIBITED: "This AI system is illegal in the EU and cannot be deployed.",
  HIGH_RISK: "Heavy compliance obligations required before deployment.",
  LIMITED_RISK: "Transparency obligations only — relatively low burden.",
  MINIMAL_RISK: "No mandatory EU AI Act requirements apply.",
};

interface Props {
  riskLevel: RiskLevel;
  riskLabel: string;
  riskColor: RiskColor;
  fineExposure: string;
  deadline: string;
}

export function RiskBadge({ riskLevel, riskLabel, riskColor, fineExposure, deadline }: Props) {
  const c = CONFIG[riskColor];
  return (
    <div className={`${c.bg} ${c.border} border rounded-xl p-5`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{c.icon}</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">EU AI Act Classification</p>
          <h2 className={`text-2xl font-bold ${c.text}`}>{riskLabel}</h2>
        </div>
      </div>
      <p className={`text-sm ${c.text} mb-4`}>{DESCRIPTIONS[riskLevel]}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-400 font-medium mb-1">Max Fine Exposure</p>
          <p className="text-sm font-semibold text-gray-800">{fineExposure}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-400 font-medium mb-1">Compliance Deadline</p>
          <p className="text-sm font-semibold text-gray-800">{deadline}</p>
        </div>
      </div>
    </div>
  );
}
