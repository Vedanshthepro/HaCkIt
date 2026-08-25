# AEGIS-SOC // Cyber Defense Operations & CTF Portfolio

An ultra-immersive, high-impact **Cybersecurity Portfolio & Threat Intelligence Operations Station** that combines a **Level-3 Security Operations Center (SOC) / SIEM Console** with an interactive **"Hack This Portfolio" Defcon CTF Challenge**.

Built to prove your hands-on cybersecurity skills directly to hiring managers, technical interviewers, and recruiters.

---

## ⚡ Key Features

### 1. 🛡️ SOC / SIEM Threat Monitoring & Live Telemetry
- **Interactive Global Threat Radar Map**: Real-time canvas attack arcs, node beacons, intercept counts, and threat origin analytics.
- **Live SIEM Log Stream (Splunk/Elastic Style)**: Streaming security telemetry logs (Syslog, Suricata, Zeek, Windows Event ID 4624/4688, EDR events, CloudTrail).
- **Tactical Audio Synthesizer (Web Audio API)**: Realistic mechanical terminal typing sounds, tactical blips, alarm buzzers, and flag victory fanfares (with 1-click mute toggle).
- **CRT Monitor Scanlines & Matrix Digital Rain**: Toggleable phosphor terminal glow and matrix animations.

### 2. 📁 Incident Response & Project Casefiles (The Portfolio)
- Projects are presented as **Real-World Severity Triage Tickets** (Critical, High, Medium):
  - *INC-2025-084: Enterprise Active Directory Kerberoasting & Lateral Movement Defense*
  - *INC-2025-042: Automated AWS Cloud SIEM & Threat Hunting Pipeline*
  - *INC-2024-119: Memory Forensics & Zero-Day DLL Sideloading Analysis*
  - *INC-2024-002: Web Application & API Penetration Assessment*
  - *INC-2024-015: Quarantined C2 Infrastructure & Ransomware Take-Down*
- Deep-dive investigation drawers with: *Attack Vector, Detection Logic (Sigma/YARA), Remediation, Metrics, and GitHub repository links*.

### 3. 🎯 MITRE ATT&CK® Enterprise Capability Matrix
- Interactive tactical heatmap mapping your hands-on competencies across: *Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Lateral Movement, and C2*.
- Direct cross-linking between techniques and project case studies.

### 4. 🧪 Malware Reverse Engineering Sandbox
- Quarantined binary metadata analyzer (Entropy, Hashes, PE Headers).
- Interactive **CyberChef De-obfuscation Pipeline** (Base64 -> XOR -> String Extraction).
- Custom YARA signature validation rules.

### 5. 💻 Interactive Reverse Shell CLI
- Simulated operational shell supporting:
  - `help` / `?`: List commands
  - `whoami`: Operator bio & credentials
  - `nmap localhost`: Scans open service ports representing your skills
  - `ls /cases`: Browse file system & writeups
  - `cat resume.md`: Read candidate summary
  - `yara -s rules.yar ransom.bin`: Execute memory triage
  - `submit_flag <TOKEN>`: Claim CTF flags
  - `ciso_override`: Executive bypass shortcut

### 6. 🚩 5 Hands-On CTF Challenges Built-in
1. **Challenge 1 (Recon):** Hidden in HTML DOM comments & meta headers.
2. **Challenge 2 (SIEM Filter Injection):** Search SQL injection payloads (`' OR '1'='1`) in the SIEM log search bar to reveal compromised red-team telemetry.
3. **Challenge 3 (Cryptography):** Run the CyberChef de-obfuscator in the Malware Sandbox.
4. **Challenge 4 (Privilege Escalation):** Modify `clearance_level` in browser `localStorage` to `CISO` or run `ciso_override`.
5. **Challenge 5 (Memory Forensics):** Run `yara -s rules.yar ransom.bin` in the terminal shell.

### 7. 📄 1-Click Executive Resume View (Recruiter Mode)
- Top-bar button **`[📄 EXECUTIVE RESUME (PDF)]`** gives instant, zero-friction access to a clean, printable candidate resume with print-to-PDF formatting and Markdown export so non-technical HR recruiters are never blocked.

---

## 🛠️ How to Customize Your Personal Details

All profile information, projects, certifications, metrics, and CTF flags are centralized in **one single file**:

📁 [`src/data/portfolioData.ts`](src/data/portfolioData.ts)

Open this file to customize:
- `PORTFOLIO_DATA.profile`: Your Name, Callsign, Target Role, Location, Bio, Social Links, PGP Fingerprint.
- `PORTFOLIO_DATA.stats`: Endpoints defended, Incidents triaged, CVEs, HTB Rank.
- `PORTFOLIO_DATA.incidents`: Your real cybersecurity projects and case studies.
- `PORTFOLIO_DATA.mitreMatrix`: Your specific tools and ATT&CK proficiencies.
- `PORTFOLIO_DATA.certifications`: Your actual certifications (OSCP, Security+, CISSP, CEH, etc.).

---

## 🚀 Running Locally & Deploying

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```

### Free Deployment:
- **Vercel / Netlify**: Simply connect your GitHub repository; framework preset `Vite` will automatically build with `npm run build`.
- **GitHub Pages**: Build the `dist` folder or use the GitHub Actions Vite deployment workflow.
