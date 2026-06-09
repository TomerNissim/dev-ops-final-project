# DevOps Final Project: JSP Application & CI/CD Pipeline

This project demonstrates a complete **CI/CD pipeline implementation** for a **Java Server Pages (JSP)** web application, combining classic on-premise tooling (Tomcat + Jenkins) with a modern cloud public endpoint (Vercel) for the bonus internet exposure requirement.

---

## 🚀 Project Overview

The application is a simple **JSP-based web page** containing one text input, one button, and one link.
The infrastructure is fully automated — every code change pushed to GitHub flows through Jenkins, deploys to both **Apache Tomcat** (production) and **Vercel** (public URL), and triggers a full monitoring + testing suite.

**Workflow:**
`GitHub → Jenkins → Tomcat (local production) + Vercel (public URL) → Monitoring & Testing`

---

## 🛠 Technologies & Tools

**Web Server (Production):** Apache Tomcat
**Public Hosting:** Vercel (bonus public URL exposure)
**CI/CD Engine:** Jenkins (Freestyle Jobs)
**Source Control:** Git / GitHub

**Testing Suite:**
- **Selenium IDE** – Automated UI & functional validations (5 validations)
- **Gatling** – Load, stress, and max-limit performance testing

**Monitoring:**
- **UptimeRobot** – Public endpoint availability tracking every 5 minutes
- **SiteMonitorLite** – Secondary availability check

---

## 🏗 Pipeline Architecture

The pipeline is built around several Jenkins jobs, each responsible for a different stage of the lifecycle:

### 1. Deploy to Tomcat
- Pulls the latest `simple.jsp` from GitHub.
- Copies it into Tomcat under `webapps/<group-names>/` so the app is reachable at `http://localhost:8080/<group-names>/simple.jsp`.

### 2. Deploy to Vercel (Public URL)
- A Vercel Deploy Hook is triggered via Jenkins on every commit.
- A build step converts `simple.jsp` into `index.html` (stripping the JSP directive) so Vercel can serve it as a static page.
- The live app is publicly available at: **https://meta-devops-app.vercel.app**

### 3. Availability Monitoring (Every 5 minutes)
- A Jenkins job runs every 5 minutes (`H/5 * * * *`).
- Calls the **UptimeRobot API** to query the monitor status of the Vercel URL.
- Build fails if the monitor reports `DOWN`.

### 4. Automated Selenium Tests
- Jenkins pulls the `.side` test file from the repo.
- Runs `selenium-side-runner` in headless Chrome.
- Validates 5 critical user-flow checks against the live Vercel URL.

### 5. Performance Tests (Gatling)
- Three separate Jenkins jobs:
  - **Max Limit Test** – Finds the breaking point of the application.
  - **Load Test** – 5 minutes of sustained traffic at expected user load.
  - **Stress Test** – 5 minutes of high-pressure traffic above expected load.

---

## 📊 Testing Strategy

### Selenium UI Validations (5 Validations)

A smart mix of `assert` (fail-fast) and `verify` (soft check), and a combination of **positive** and **negative** tests:

| # | Type | Method | What it checks |
|---|------|--------|----------------|
| 1 | Positive | `assertTitle` | Page title equals `"Simple Page"` |
| 2 | Positive | `verifyElementPresent` | Input text box exists |
| 3 | Positive | `assertText` | After typing `"Ilan"` + clicking, the message displays `"Hello Ilan!"` |
| 4 | **Negative** | `verifyText` | When input is empty and the button is clicked, no message is shown |
| 5 | Positive | `assertElementPresent` | The "Go to Home" link points to `https://www.tau.ac.il` |

**Why this mix:** `assert` is used for critical checks where continuing makes no sense if they fail (title, core message, link). `verify` is used for soft checks where failure should be logged but the test continues. Including a **negative test** (validation 4) ensures the app behaves correctly when used incorrectly.

---

### Performance Benchmarking (Gatling)

**Max Limit Test**
- Gradually ramps up users to determine the point where the application starts to fail.
- Used to define realistic load and stress test parameters.

**Load Test (5 minutes)**
- Sustained traffic representing expected real-world usage.

**Stress Test (5 minutes)**
- Pushes the application beyond expected load to detect breaking behavior.

All Gatling results are exported as HTML reports and PDFs and reviewed for response time, error rate, and throughput patterns.

---

## 🌐 Public URL Bonus

To satisfy the bonus requirement (public IP / internet-accessible application), the application is also deployed to **Vercel** via an automated pipeline:

```
Group pushes simple.jsp to GitHub
       ↓ (Jenkins polls every 1 minute)
Jenkins detects new commit
       ↓
Jenkins calls Vercel Deploy Hook (curl)
       ↓
Vercel builds → reads simple.jsp from GitHub API
       ↓ (~30 sec)
Live app updated at https://meta-devops-app.vercel.app ✅
```

**Total propagation time: ~1–2 minutes** from `git push` to live URL.

---

## 📋 Prerequisites & Configuration

To replicate this environment:

**Jenkins Plugins**
- Git
- Gatling
- NodeJS (for selenium-side-runner)

**Local Tools**
- Apache Tomcat
- Node.js + `selenium-side-runner` + `chromedriver` (installed globally via npm)
- Gatling CLI

**External Accounts**
- GitHub (source repo + fork with auto-sync workflow)
- Vercel (project linked to fork, with Deploy Hook for Jenkins integration)
- UptimeRobot (monitor + API key for Jenkins job)

**Environment**
- Windows / Linux server with Jenkins
- Public Vercel URL: `https://meta-devops-app.vercel.app`
- Local Tomcat URL: `http://localhost:8080/<group-names>/simple.jsp`

---

## 👥 Authors

Ilan Jhonatan
Amit
Tomer
Nitzan

---
