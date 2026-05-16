export type RiskLevel = "PROHIBITED" | "HIGH_RISK" | "LIMITED_RISK" | "MINIMAL_RISK";
export type RiskColor = "red" | "orange" | "yellow" | "green";
export type Urgency = "immediate" | "before_deployment" | "ongoing";
export type Effort = "low" | "medium" | "high";

export interface ComplianceRequirement {
  requirement: string;
  article: string;
  description: string;
  urgency: Urgency;
  effort: Effort;
}

export interface AssessmentResult {
  risk_level: RiskLevel;
  risk_label: string;
  risk_color: RiskColor;
  summary: string;
  articles_triggered: string[];
  annex_categories: string[];
  prohibited_reason: string | null;
  compliance_requirements: ComplianceRequirement[];
  compliance_deadline: string;
  fine_exposure: string;
  next_steps: string[];
  documentation_needed: string[];
}

export interface AssessmentRequest {
  description: string;
  industry: string;
  affected_decisions: string;
  end_users: string;
}
