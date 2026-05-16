# AIComply — EU AI Act Risk Classifier

A web tool that takes a plain-English description of an AI system and returns its risk classification under EU Regulation 2024/1689 (the EU AI Act), along with the specific compliance obligations, fine exposure, and a prioritised action plan.

---

## What it does

Paste a description of your AI system, pick the industry and who it affects, and get back:

- **Risk tier** — Prohibited / High Risk / Limited Risk / Minimal Risk
- **Legal basis** — which articles and Annex III categories apply
- **Compliance checklist** — everything you need to do before deployment, with effort estimates
- **Documentation list** — what paperwork the regulation requires
- **Fine exposure** — worst-case penalty figures
- **Deadline** — when your tier's rules take effect

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python 3.13, FastAPI, Uvicorn |
| AI model | Llama 3.3 70B via NVIDIA Build API |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v3 |

---

## Prerequisites

- **Python 3.13** (3.14 is not supported — pydantic-core's Rust extension requires 3.13 or lower)
- **Node.js 18+**
- A free [NVIDIA Build](https://build.nvidia.com) account for the API key

---

## Setup

### 1. Backend

```bash
cd backend

# Create and activate virtual environment
py -3.13 -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
```

Create `backend/.env`:

```
NVIDIA_API_KEY=your_key_here
```

Get your key from [build.nvidia.com](https://build.nvidia.com) — the free tier is enough for testing.

### 2. Frontend

```bash
cd frontend
npm install
```

---

## Running locally

### Option A — one command (Windows)

```powershell
.\start.ps1
```

This opens the backend in one terminal window and the frontend dev server in another.

### Option B — manual

Terminal 1 (backend):
```bash
cd backend
venv\Scripts\uvicorn main:app --reload --port 8000
```

Terminal 2 (frontend):
```bash
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Environment variables

| Variable | Where | Description |
|---|---|---|
| `NVIDIA_API_KEY` | `backend/.env` | API key from build.nvidia.com |
| `VITE_API_URL` | frontend env (optional) | Override backend URL, defaults to `http://localhost:8000` |

---

## Project structure

```
Company/
├── backend/
│   ├── main.py           # FastAPI app, classification endpoint
│   ├── requirements.txt
│   └── .env              # not committed
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── types.ts
│   │   └── components/
│   │       ├── AssessmentForm.tsx
│   │       ├── RiskBadge.tsx
│   │       └── ComplianceChecklist.tsx
│   ├── index.html
│   └── package.json
└── start.ps1
```

---

## Risk tiers at a glance

| Tier | What it means | Max fine |
|---|---|---|
| **Prohibited** | Illegal in the EU, cannot be deployed | €35M or 7% global turnover |
| **High Risk** | Allowed but heavy compliance obligations | €15M or 3% global turnover |
| **Limited Risk** | Transparency notices required | €7.5M or 1.5% global turnover |
| **Minimal Risk** | No mandatory requirements | — |

Key deadlines:
- **2 Feb 2025** — Prohibited AI rules in force
- **2 Aug 2025** — General-purpose AI (GPAI) rules in force
- **2 Aug 2026** — High-risk Annex III systems must fully comply

---

## API

`POST /api/classify`

```json
{
  "description": "We use ML to rank job applicants by CV score before human review",
  "industry": "Human Resources / Recruitment",
  "affected_decisions": "Whether a candidate advances to interview",
  "end_users": "Employees / workers"
}
```

Returns a JSON object with `risk_level`, `compliance_requirements`, `next_steps`, and the other fields listed above.

---

## License

MIT
