import { useState } from "react";
import type { AssessmentRequest } from "../types";

const INDUSTRIES = [
  "Healthcare / Medical",
  "Finance / Banking / Insurance",
  "Human Resources / Recruitment",
  "Education / Academic",
  "Law Enforcement / Security",
  "Government / Public Services",
  "Transport / Logistics",
  "Retail / E-commerce",
  "Manufacturing / Industry",
  "Media / Entertainment",
  "Legal / Justice",
  "Immigration / Border Control",
  "Critical Infrastructure",
  "Technology / SaaS",
  "Other",
];

const END_USERS = [
  "General consumers / public",
  "Employees / workers",
  "Students",
  "Government officials / civil servants",
  "Law enforcement officers",
  "Businesses (B2B)",
  "Patients / healthcare recipients",
  "Migrants / asylum seekers",
  "Financial applicants (loans, insurance)",
  "Other",
];

interface Props {
  onSubmit: (data: AssessmentRequest) => void;
  loading: boolean;
}

export function AssessmentForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<AssessmentRequest>({
    description: "",
    industry: "",
    affected_decisions: "",
    end_users: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isValid = form.description.trim().length > 20 && form.industry && form.end_users;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Describe your AI system <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={5}
          placeholder="e.g. We use an AI model to screen job applications and rank candidates based on their CV and cover letter. The system scores candidates on skills, experience, and culture fit, and automatically filters out applicants below a threshold score before human review."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <p className="mt-1 text-xs text-gray-400">
          Be specific — include what the AI does, what data it uses, and what outputs it produces.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Industry / Sector <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            required
          >
            <option value="">Select industry…</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            End Users <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={form.end_users}
            onChange={(e) => setForm({ ...form, end_users: e.target.value })}
            required
          >
            <option value="">Who uses or is affected by it…</option>
            {END_USERS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What decisions does it influence?
        </label>
        <input
          type="text"
          placeholder="e.g. Whether a candidate advances to interview, loan approval, medical diagnosis, content moderation"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          value={form.affected_decisions}
          onChange={(e) => setForm({ ...form, affected_decisions: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Analysing under EU AI Act…
          </>
        ) : (
          "Run Compliance Assessment →"
        )}
      </button>
    </form>
  );
}
