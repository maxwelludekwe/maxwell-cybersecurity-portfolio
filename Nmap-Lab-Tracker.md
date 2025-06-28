# 🔎 Nmap Lab Tracker
This tracker highlights my hands-on learning and practical use of Nmap for reconnaissance, service enumeration, OS detection, and basic vulnerability scanning.
---
## ✅ Completed Scans
| Scan Type                     | Description                                         | Status   |
|-------------------------------|-----------------------------------------------------|----------|
| Localhost Scan                | Basic scan of the local machine                    | ✅ Done  |
| Version Detection             | Used `-sV` to identify running services            | ✅ Done  |
| OS Detection                  | Used `-O` to identify target operating system      | ✅ Done  |
| Vulnerability Script Scan     | Ran default vuln scripts using `--script vuln`     | ✅ Done  |
| Custom IP Scan                | Scanned 172.20.10.4 and 172.20.10.2 with custom ports | ✅ Done  |
---
## 🧪 Upcoming Scans
| Scan Type                     | Description                                         | Status     |
|-------------------------------|-----------------------------------------------------|------------|
| Aggressive Scan (`-A`)        | OS detection, version detection, traceroute, scripts | 🔜 Planned |
| UDP Scan                      | Explore open UDP ports and behavior                | 🔜 Planned |
| Stealth Scan (`-sS`)          | SYN scan to avoid full TCP connection              | 🔜 Planned |
| Firewall Evasion              | Use `--badsum`, `-D`, or `--data-length`           | 🔜 Planned |
| Output Comparison             | Save results in XML, grepable, and normal formats  | 🔜 Planned |
---
## Notes & Learnings
- Nmap is an essential tool for recon and enumeration during red team assessments and vulnerability discovery.
- Custom scans on real devices improve detection understanding.
- Combining Nmap with Wireshark enhances packet-level visibility.
---
## Resources I'm Using
- [Nmap Official Docs](https://nmap.org/book/inst-windows.html)
- [TryHachMe: Nmap Room] (https://tryhackme.com/room/nmap)
- [HackTheBox: Starting Point Machines] (https://app.hackthebox.com/)
