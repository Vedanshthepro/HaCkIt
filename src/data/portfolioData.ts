export interface IncidentCase {
  id: string;
  code: string;
  title: string;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'MITIGATED' | 'RESOLVED' | 'DEPLOYED' | 'DOCUMENTED' | 'COMPLETED';
  date: string;
  summary: string;
  attackVector: string;
  detectionEngineering: string;
  remediation: string;
  toolsUsed: string[];
  mitreRef: string[];
  metrics: string;
  githubUrl?: string;
  demoUrl?: string;
  classified?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  badgeUrl: string;
  status: 'ACTIVE' | 'LIFETIME' | 'VERIFIED';
  skills: string[];
}

export interface MitreTechnique {
  id: string;
  tactic: string;
  name: string;
  proficiency: 'EXPERT' | 'ADVANCED' | 'INTERMEDIATE';
  description: string;
  tools: string[];
  projectsLinked: string[];
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  level: 'CRITICAL' | 'ALERT' | 'WARN' | 'INFO';
  destIp: string;
  payload: string;
}

export interface CTFChallenge {
  id: number;
  title: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT' | 'LEGENDARY';
  points: number;
  flag: string;
  hint: string;
  description: string;
  solved: boolean;
  clearanceGranted: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    callsign: "V-CYBER // GHOST-7",
    name: "Vedansh Patranabish",
    title: "SYSTEMS PROGRAMMER & SECURITY ENGINEER",
    specialization: "Threat Detection Engineering, Zero Trust Security, Network Security",
    status: "OPEN FOR OPPORTUNITIES (ACTIVE CLEARANCE)",
    location: "Global / Remote or Hybrid",
    email: "vedansh.patranabish@gmail.com",
    phone: "+91 7002564728",
    github: "https://github.com/Vedanshthepro",
    linkedin: "https://linkedin.com/in/vedansh-patranabish",
    tryhackme: "https://tryhackme.com",
    hackthebox: "https://app.hackthebox.com",
    pgpKeyFingerprint: "4A9F 88C1 2D03 E91F BC83  90E2 F510 AA34 CC99 18B2",
    summary: "B.Tech Computer Science graduate specializing in Systems Programming, Distributed Systems, Computer Networks, and Network Security. Strong hands-on expertise in C/C++, DBMS internals, high-performance socket programming, and Cryptography protocol implementation. Proven track record designing zero-retention architectures, real-time packet processing pipelines, and multi-threaded networked applications with a rigorous focus on memory efficiency, thread safety, and system resilience."
  },

  stats: [
    { label: "INCIDENTS ANALYZED",     value: "50+",   change: "Blue Team Labs" },
    { label: "DETECTION RULES",        value: "10+",   change: "Sigma / YARA" },
    { label: "SECURITY TOOLS",         value: "15+",   change: "Wireshark, GDB, Docker" },
    { label: "CTF / HTB CHALLENGES",   value: "30+",   change: "Continuous Learning" },
    { label: "PROJECTS COMPLETED",     value: "4",     change: "Systems & Security" }
  ],

  incidents: [
    {
      id: "inc-01",
      code: "AIIDPS-001",
      title: "Real-Time TCP SYN Flood Detection & Mitigation Engine",
      category: "Network Security",
      severity: "HIGH",
      status: "COMPLETED",
      date: "2025-10",
      summary: "Designed and implemented a multi-threaded Intrusion Detection and Prevention System capable of capturing, analyzing, and mitigating suspicious TCP/IP traffic in real time.",
      attackVector: "TCP SYN Flood, Port Scanning, Malicious Packet Injection",
      detectionEngineering: "Developed packet inspection engine using raw sockets and protocol parsing with custom detection logic.",
      remediation: "Dropped malicious packets, generated alerts, and maintained low-latency packet processing.",
      toolsUsed: ["C++", "Raw Sockets", "Wireshark", "Linux", "TCP/IP", "Multithreading"],
      mitreRef: ["T1046 (Network Service Discovery)", "T1498 (Network DoS)"],
      metrics: "Processed 1,500+ packets with low-latency detection pipeline.",
      githubUrl: "https://github.com/Vedanshthepro/Major_IDPS"
    },
    {
      id: "inc-02",
      code: "ZK-001",
      title: "Zero-Retention Secure Messaging Architecture",
      category: "Cryptography",
      severity: "HIGH",
      status: "COMPLETED",
      date: "2026-06",
      summary: "Developed a secure messaging platform implementing end-to-end encryption with zero-retention memory architecture.",
      attackVector: "Unauthorized Data Access, Memory Dump Analysis, Man-in-the-Middle (MitM)",
      detectionEngineering: "Implemented AES-256 encryption, Diffie-Hellman key exchange, and secure session establishment.",
      remediation: "Encrypted all communications while eliminating persistent plaintext storage and wiping memory buffers.",
      toolsUsed: ["C++", "Python", "AES-256", "Diffie-Hellman", "Linux", "OpenSSL"],
      mitreRef: ["T1552 (Unsecured Credentials)", "T1005 (Data from Local System)"],
      metrics: "Established encrypted sessions with zero-retention memory handling.",
      githubUrl: "https://github.com/Vedanshthepro/ZEROKeep--Public"
    },
    {
      id: "inc-03",
      code: "DBMS-001",
      title: "Secure Database Access Control & ACID Integrity Implementation",
      category: "Database Security",
      severity: "MEDIUM",
      status: "COMPLETED",
      date: "2024-10",
      summary: "Built a secure attendance management platform emphasizing database integrity, query parameterization, and strict role-based access control.",
      attackVector: "Unauthorized Database Access, SQL Injection, Privilege Escalation",
      detectionEngineering: "Applied ACID transactions, indexing, foreign key constraints, and secure query validation.",
      remediation: "Implemented authentication, authorization, and optimized database queries.",
      toolsUsed: ["MySQL", "SQL", "Python", "DBMS", "RBAC"],
      mitreRef: ["T1190 (Exploit Public-Facing Application)", "T1078 (Valid Accounts)"],
      metrics: "Designed relational schema supporting secure, concurrent transactions.",
      githubUrl: "https://github.com/Vedanshthepro/Attendance-System"
    },
    {
      id: "inc-04",
      code: "APPSEC-002",
      title: "Full-Scope Web Application & API Penetration Assessment",
      category: "Penetration Testing",
      severity: "HIGH",
      status: "DOCUMENTED",
      date: "2024-Q2",
      summary: "Conducted white-box and black-box penetration testing for high-traffic payment gateways and REST APIs, identifying authorization flaws and injection surfaces.",
      attackVector: "Discovered Broken Object Level Authorization (BOLA/IDOR) allowing unauthorized cross-tenant data access.",
      detectionEngineering: "Crafted Burp Suite extension scripts and WAF signature filters to block recursive payloads and schema tampering.",
      remediation: "Refactored API endpoint authorization middleware with strict object-level access controls and input sanitization.",
      toolsUsed: ["Burp Suite Professional", "Postman", "OWASP ZAP", "Python Requests", "Docker", "Nuclei"],
      mitreRef: ["T1190 (Exploit Public-Facing Application)", "T1212 (Exploitation for Credential Access)"],
      metrics: "Remediated 2 Critical IDORs and 5 Medium vulnerabilities before deployment.",
      githubUrl: "https://github.com/Vedanshthepro"
    },
    {
      id: "inc-05",
      code: "INC-2024-015",
      title: "CLASSIFIED // Quarantined C2 Infrastructure Take-down & Sandbox Triage",
      category: "Incident Response",
      severity: "CRITICAL",
      status: "RESOLVED",
      date: "2024-Q1",
      classified: true,
      summary: "[RESTRICTED ACCESS] Triaged an advanced ransomware pre-attack staging cluster. Dissected command-and-control beacon protocol over DNS tunneling.",
      attackVector: "Adversary leveraged Base64 encoded TXT records for stealth data exfiltration and task dispatching.",
      detectionEngineering: "Authored Zeek script calculating Shannon entropy on DNS subdomains, flagging continuous anomalous high-entropy queries.",
      remediation: "DNS sinkholing of malicious domains and firewall drop rules for all fast-flux IP blocks.",
      toolsUsed: ["Zeek", "Suricata", "Wireshark", "Python Scapy", "Snort", "Linux Iptables"],
      mitreRef: ["T1071.004 (DNS Communication)", "T1048 (Exfiltration Over Alternative Protocol)"],
      metrics: "Prevented 1.8 TB intellectual property exfiltration; zero ransom paid.",
      githubUrl: "https://github.com/Vedanshthepro"
    }
  ] as IncidentCase[],

  mitreMatrix: [
    {
      id: "TA0001",
      tactic: "Initial Access",
      name: "Exploit Public Application & Network Probing",
      proficiency: "EXPERT",
      description: "Analysis of weaponized payloads, raw packet flooding, port scanning, CVE exploitation, and API vulnerabilities.",
      tools: ["Burp Suite", "Raw Sockets", "Wireshark", "OWASP ZAP", "Nuclei", "Nmap"],
      projectsLinked: ["AIIDPS-001", "APPSEC-002"]
    },
    {
      id: "TA0002",
      tactic: "Execution",
      name: "Command & Scripting Interpreter",
      proficiency: "EXPERT",
      description: "Deep knowledge of C/C++ socket programming, Python automation, Bash, and Linux system internals.",
      tools: ["C++", "Python", "Bash", "GDB", "Linux Syscalls"],
      projectsLinked: ["AIIDPS-001", "ZK-001"]
    },
    {
      id: "TA0003",
      tactic: "Persistence",
      name: "Scheduled Tasks & Service Management",
      proficiency: "ADVANCED",
      description: "Monitoring systemd services, socket daemons, background worker processes, and autostart entries.",
      tools: ["Linux Systemd", "Docker", "Syslog", "Process Monitor"],
      projectsLinked: ["AIIDPS-001"]
    },
    {
      id: "TA0004",
      tactic: "Privilege Escalation",
      name: "Process Isolation & Memory Protection",
      proficiency: "EXPERT",
      description: "Analyzing memory dump vulnerabilities, buffer boundaries, ACLs, and RBAC enforcement.",
      tools: ["GDB", "Valgrind", "Linux ACLs", "OpenSSL"],
      projectsLinked: ["ZK-001", "DBMS-001"]
    },
    {
      id: "TA0005",
      tactic: "Defense Evasion",
      name: "Zero-Retention & Cryptographic Protection",
      proficiency: "ADVANCED",
      description: "Implementing zero-retention memory wiping, AES-256 GCM encryption, and anti-tamper communication protocols.",
      tools: ["AES-256", "Diffie-Hellman", "OpenSSL", "CyberChef", "YARA"],
      projectsLinked: ["ZK-001", "INC-2024-015"]
    },
    {
      id: "TA0006",
      tactic: "Credential Access",
      name: "Authentication & Database Access Controls",
      proficiency: "EXPERT",
      description: "Enforcing password hashing (Bcrypt/Argon2), secure session token storage, and database query sanitization.",
      tools: ["MySQL", "SQL Sanitization", "Diffie-Hellman", "Hashcat"],
      projectsLinked: ["DBMS-001", "ZK-001"]
    },
    {
      id: "TA0008",
      tactic: "Lateral Movement",
      name: "Network Traffic Interception & Inspection",
      proficiency: "ADVANCED",
      description: "Tracking SYN floods, abnormal TCP handshakes, port sweeps, and unauthorized socket connections.",
      tools: ["Wireshark", "TCPDump", "Raw Sockets", "Zeek", "Suricata"],
      projectsLinked: ["AIIDPS-001"]
    },
    {
      id: "TA0011",
      tactic: "Command and Control",
      name: "Encrypted Session Channels & C2 Triage",
      proficiency: "ADVANCED",
      description: "Designing authenticated end-to-end encrypted tunnels and triaging unauthorized outbound beaconing.",
      tools: ["OpenSSL", "TCP/IP Sockets", "Wireshark", "Zeek"],
      projectsLinked: ["ZK-001", "INC-2024-015"]
    }
  ] as MitreTechnique[],

  certifications: [
    {
      name: "Tata - Cybersecurity Analyst",
      issuer: "Forage",
      issueDate: "2026",
      credentialId: "iLZjxuJG5yX9KMZaW",
      badgeUrl: "🔒",
      status: "ACTIVE",
      skills: ["Identity & Access Management (IAM)", "IAM Strategy Assessment", "Custom IAM Solutions", "Platform Integration"]
    },
    {
    },
    {
      name: "BTL1 - Blue Team Level 1",
      issuer: "Security Blue Team",
      issueDate: "2024",
      credentialId: "SBT-BTL1-9921",
      badgeUrl: "⚡",
      status: "ACTIVE",
      skills: ["SIEM Triage", "Phishing Analysis", "Digital Forensics", "Incident Response"]
    }
  ] as Certification[],

  initialLogs: [
    { id: "log-1", timestamp: "21:34:02.119", source: "IDPS_SOCKET_GUARD", event: "SYN_FLOOD_DETECT", level: "CRITICAL", destIp: "10.0.4.12", payload: "TCP SYN burst detected: 840 syn_pkts/sec from 194.26.29.112 -> Port 80 [BLOCKED]" },
    { id: "log-2", timestamp: "21:34:05.482", source: "SURICATA_NIDS", event: "PORT_SCAN_XMAS", level: "ALERT", destIp: "10.0.0.1", payload: "FIN/PSH/URG packet sequence scanned against ports 20-1024 -> Signature SID-201849" },
    { id: "log-3", timestamp: "21:34:08.821", source: "ZK_CRYPTO_NODE", event: "SESSION_HANDSHAKE", level: "INFO", destIp: "172.16.1.5", payload: "Diffie-Hellman Key Exchange Established (Curve25519) with Ephemeral AES-256 Session Key" },
    { id: "log-4", timestamp: "21:34:12.304", source: "ZEEK_FLOW", event: "CONN_BEACON", level: "ALERT", destIp: "45.154.255.88", payload: "Outbound HTTPS beacon interval 60s (+/- 5% jitter) to untrusted ASN 49382" },
    { id: "log-5", timestamp: "21:34:16.029", source: "AUTH_GATEWAY", event: "RBAC_VIOLATION", level: "WARN", destIp: "10.0.2.15", payload: "User ID 1084 attempted unauthorized query to /api/v1/admin/records -> Denied (403)" },
    { id: "log-6", timestamp: "21:34:19.412", source: "WAF_APEX", event: "SQLI_ATTEMPT", level: "INFO", destIp: "192.168.1.100", payload: "URI: /api/v2/telemetry?filter=' UNION SELECT flag, hash FROM secret_vault --" },
    { id: "log-7", timestamp: "21:34:23.901", source: "SYSMON", event: "EVENT_ID_7_IMAGE_LOAD", level: "INFO", destIp: "10.0.4.22", payload: "Loaded unsigned DLL C:\\Temp\\amsi_hook.dll into socket_server.exe" },
    { id: "log-8", timestamp: "21:34:28.112", source: "DATABASE_GUARD", event: "SQL_QUERY_SANITIZED", level: "INFO", destIp: "10.0.0.50", payload: "Prepared statement executed with parameterized arguments for attendance_db" }
  ] as TelemetryLog[],

  ctfChallenges: [
    {
      id: 1,
      title: "Reconnaissance: DOM & Source Infiltration",
      category: "Web Recon",
      difficulty: "EASY",
      points: 100,
      flag: "FLAG{d0m_1nsp3ct10n_r3c0n_succ3ssful_9481}",
      hint: "Right click, inspect the HTML source code comments or check the meta header definitions.",
      description: "An operative left an un-sanitized reconnaissance marker in the web application's root DOM structure. Inspect the client elements to uncover it.",
      solved: false,
      clearanceGranted: "TIER-1 TRIAGE ANALYST"
    },
    {
      id: 2,
      title: "Telemetry Infiltration: SIEM Log SQLi Filter",
      category: "SIEM & Injection",
      difficulty: "MEDIUM",
      points: 200,
      flag: "FLAG{s13m_l0g_1nj3ct10n_pwn3d_4820}",
      hint: "Search for common SQL injection payloads in the SIEM Live Log Search Filter bar, e.g. `' OR '1'='1` or `UNION SELECT`.",
      description: "The SIEM live query search bar processes raw string filters. Trigger an SQL query bypass in the search input to unmask hidden red-team telemetry records.",
      solved: false,
      clearanceGranted: "THREAT HUNTER (LEVEL 2)"
    },
    {
      id: 3,
      title: "Malware Cryptography: De-obfuscate C2 Beacon",
      category: "Reverse Engineering",
      difficulty: "MEDIUM",
      points: 250,
      flag: "FLAG{b4s364_x0r_p4yl04d_d3crypt3d_9912}",
      hint: "Open the Malware Sandbox panel and click 'Run De-obfuscator / CyberChef' on the quarantined sample payload.",
      description: "Quarantined sample #APT-29 contains a multi-encoded Base64 beacon payload. Run the de-obfuscation pipeline in the Malware Sandbox to recover the command key.",
      solved: false,
      clearanceGranted: "RED TEAM OPERATOR"
    },
    {
      id: 4,
      title: "Privilege Escalation: LocalStorage Token Manipulation",
      category: "Access Control",
      difficulty: "HARD",
      points: 350,
      flag: "FLAG{cl34r4nc3_3sc4l4t10n_c1s0_r00t_7734}",
      hint: "Inspect Application -> LocalStorage in DevTools. Find key 'clearance_level' or 'user_role' and set it to 'CISO' or 'ROOT', or type 'ciso_override' in the terminal.",
      description: "Your session token in browser LocalStorage is currently restricted to GUEST status. Elevate your local storage credential token to unlock executive clearance.",
      solved: false,
      clearanceGranted: "SECURITY ARCHITECT"
    },
    {
      id: 5,
      title: "Digital Forensics: YARA Memory Rule Triage",
      category: "DFIR & Forensics",
      difficulty: "EXPERT",
      points: 500,
      flag: "FLAG{y4r4_m3m0ry_f0r3ns1cs_m4st3r_0019}",
      hint: "Open the Interactive Terminal and execute `yara -s rules.yar ransom.bin` or `cat /root/flag.txt`.",
      description: "A memory dump from an infected server is stored in the simulated terminal file system. Execute the YARA rule engine to match the signature and extract the master incident flag.",
      solved: false,
      clearanceGranted: "ROOT // CHIEF INFORMATION SECURITY OFFICER"
    }
  ] as CTFChallenge[]
};
