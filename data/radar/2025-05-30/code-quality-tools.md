---
title: "Code-Quality Tools"
ring: assess
quadrant: tools-and-techniques
tags: [sast, sca, ci, quality]
featured: true
---

**Reason for selection**

Modern SAST/SCA platforms claim fast scans, auto-fix PRs and deep JS/TS coverage. We need a reliable gate that fits our mono-repo workflows without ruining CI times.  

**Key questions**

- True-positive rate vs noise on TS/React/RN?  
- CI wall-clock < 5 min?  
- Supply-chain depth / SBOM support?  
- Cost per seat or LOC—viable OSS tier?  
- Custom-rule DX and GH/Bitbucket integration?  

**Assessment approach**

1. Enable SonarQube, Snyk, Semgrep, Code Climate, GH Advanced Security on representative repos for one sprint.  
2. Record scan time, issues, false positives, setup effort.  
3. Score 0-5 on Accuracy, DX, Speed, Security breadth, Cost, Extensibility.  
4. Workshop and raise RFC for Tech Radar ring.  

**Potential testers**

- Repos across two active projects; core maintainers for each.  

**Notes**

Semgrep's rule-as-code fits our TS conventions; SonarQube Advanced Security might subsume Snyk if pricing works.