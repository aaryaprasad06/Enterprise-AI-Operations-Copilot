# 🚀 Enterprise AI Operations Copilot

> AI-Powered Incident Management, Root Cause Analysis, and Operations Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Overview

Enterprise AI Operations Copilot is an AI-powered AIOps platform designed to help operations teams manage incidents, analyze root causes, monitor system health, and generate executive insights.

The platform combines traditional incident management workflows with Large Language Models (LLMs) to accelerate troubleshooting and improve operational efficiency.

---

# 🎯 Features

## 📌 Incident Management

* Create incidents
* Search incidents
* Filter incidents
* Track status
* Incident lifecycle management
* Incident occurrence tracking

---

## 🤖 AI Root Cause Analysis

Analyze incidents automatically using AI.

Outputs:

✅ Root Cause

✅ Confidence Score

✅ Recommended Actions

Example:

```text
Incident:
Database Connection Timeout

AI Output:
Root Cause:
Database connection pool exhaustion

Confidence:
92%

Recommended Actions:
- Increase pool size
- Optimize slow queries
- Restart affected services
```

---

## 💬 AI Operations Copilot

Ask operational questions in natural language.

Examples:

```text
Why are users experiencing login failures?

What could cause repeated database timeouts?

How should I investigate API latency spikes?
```

The AI Copilot provides:

* Root cause hypotheses
* Resolution guidance
* Troubleshooting recommendations

---

## 📊 Dashboard Analytics

Monitor key operational metrics.

### KPI Cards

* Total Incidents
* Critical Incidents
* MTTR
* Platform Health Score

### Visual Analytics

📈 Incident Trends

🍩 Severity Distribution

📋 Recent Incidents

📊 Service Analytics

---

## 📈 Executive Summary Generator

Generate leadership-focused summaries automatically.

Includes:

* Overall Platform Health
* Risk Assessment
* Critical Findings
* Strategic Recommendations

Perfect for:

* CIO Reviews
* Engineering Leadership
* Weekly Operations Reports

---

## 🔍 Similar Incident Detection

Uses fingerprint-based matching to identify:

* Duplicate incidents
* Recurring issues
* Related failures

Benefits:

✅ Faster resolution

✅ Reduced alert fatigue

✅ Better knowledge reuse

---

# 🏗️ Architecture

```text
React Frontend
       │
       ▼
FastAPI Backend
       │
 ┌─────┼─────────┐
 ▼     ▼         ▼

PostgreSQL   AI Layer   Analytics
 Database      Groq      Engine

       │
       ▼

Operations Dashboard
```

---

# 🛠️ Technology Stack

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic
* Uvicorn

## Frontend

* React
* Vite
* Axios
* Recharts
* Lucide React

## AI

* Groq API
* Llama 3.3 70B

---

# 📂 Project Structure

```text
backend/
│
├── app/
│   ├── routers/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── ai/
│   └── core/
│
└── main.py

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── layouts/
│
└── App.jsx
```

---

# 🚀 Installation

## Backend

```bash
git clone <repo-url>

cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 📸 Screenshots

## Dashboard

Add dashboard screenshot here

---

## AI Copilot

Add copilot screenshot here

---

## Incident Management

Add incidents screenshot here

---

## Executive Summary

Add executive summary screenshot here

---

# 🔮 Future Improvements

* Kafka Event Streaming
* Real-Time Incident Monitoring
* Vector Database Integration
* Retrieval-Augmented Generation (RAG)
* Predictive Incident Forecasting
* AI Agent Workflows
* Multi-Tenant Support
* Kubernetes Deployment
* CI/CD Integration

---

# 📚 Learning Outcomes

Through this project I gained experience in:

✅ Full-Stack Development

✅ FastAPI Architecture

✅ React Dashboard Development

✅ Database Design

✅ LLM Integration

✅ AI-Powered Automation

✅ Data Visualization

✅ Enterprise Software Engineering

---

# 👨‍💻 Author

### Aarya Prasad

Computer Science & AI Student

Passionate about:

* Artificial Intelligence
* Machine Learning
* Full Stack Development
* AIOps
* Enterprise Software

---

⭐ If you found this project interesting, consider giving it a star!
