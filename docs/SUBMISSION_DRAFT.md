# PyroScope — NASA Space Apps 2026 Submission Draft (`X01`)

## Project Title
PyroScope: Harmonized Burning Activity Calendar

## Team Name
Perceptron

## Links
- **GitHub Repository:** https://github.com/azmaeenmahtab/Nasa-Space-App-Harmonization-Perceptron
- **Live Demo URL:** https://nasa-space-app-harmonization-percep.vercel.app/
- **30s Global Judging Video:** https://youtu.be/je6PrhJea90?si=HG-OxZJyug_-QG_K
- **240s Full Demo Video:** https://youtu.be/O7Fo4-lNndQ?si=R6r0HaAsskfusfGY
- **Pitch Deck / Slides:** *(Paste link or attach PDF here)*

---

## Short Summary (Concise Overview)
PyroScope harmonizes 26 years of NASA MODIS (1 km, 2000–present) and VIIRS S-NPP (375 m, 2012–present) active-fire records into one continuous **Burning Activity Calendar (`FireCalendar`)** for early warning, wildland management, and emergency response. By clustering detections into physical fire events via Space-Time DBSCAN and calibrating VIIRS counts to MODIS-equivalent units through cross-validated regional quantile mapping, PyroScope removes the artificial 2012 sensor-transition "hidden jump" (`1.85x` naive splice reduced to `0.86x`) and surfaces district-level seasonality, anomalies, mitigation checklists, and a tool-grounded Q&A assistant.

---

## Detailed Project Description

### The Challenge
NASA's MODIS (1 km) and VIIRS (375 m) instruments both provide vital active-fire observations via FIRMS, yet combining their raw records creates a major statistical artifact. Across Bangladesh's 177-month overlap window (`2012-02` through `2026-10`), VIIRS S-NPP detects an average of **39,193** raw hotspots per year compared to **9,645** for MODIS (**4.10x** raw ratio; **3.77x** after science confidence filtering). Plotting a naive splice across 2012 produces an artificial **1.85x (+85%)** jump in apparent burning activity purely due to sensor resolution differences—making it impossible to separate true climate or land-use fire anomalies from sensor artifacts.

### Our Solution
1. **Physics-Aware Event Clustering:** PyroScope filters raw detections (`MODIS >= 30`, `VIIRS n/h`, `type == 0` when present) and applies Space-Time DBSCAN (`2,700 m` spatial radius, `24 h` temporal window, `min_pts = 2`), condensing `758,730` retained pixels into `109,246` discrete physical fire events and shrinking the annual VIIRS/MODIS discrepancy from ~4x down to ~1.5x events.
2. **Cross-Validated Harmonization:** Using Leave-One-Year-Out cross-validation per calibration unit (3 high-activity Chittagong Hill Tracts districts calibrated directly; 61 sparse districts backed by division pools), PyroScope selects between equal-n Quantile Mapping and Ratio scaling, eliminating the 2012 splice jump (`1.85x` → `0.86x`) and downscaling proportionally to 26,683 H3 resolution-7 cells with **0.0 unallocated events**.
3. **Actionable Burning Activity Calendar & Early Warning:** Users explore a 2000–present interactive 3D H3 hex map, inspect the `FireCalendar` anomaly matrix (`normal`, `elevated > p90`, `extreme > p95`), discover that **97.07%** of Chittagong Hill Tracts harmonized burning occurs in March–April (`98.28%` March–May), locate nearby Bangladesh Fire Service (`102` / `999`) stations, subscribe to threshold alerts, and query **Ask PyroScope**—an assistant restricted strictly to typed Parquet tools with an offline deterministic replay mode.

---

## Space Agency Data Sources
- **NASA FIRMS MODIS Collection 6.1 (`MCD14DL`)** — Terra & Aqua 1 km active-fire archive and NRT detections (`2000-11-02` to `2026-11-01`).
- **NASA FIRMS VIIRS S-NPP Collection 2 (`VNP14IMGTDL`)** — Suomi NPP 375 m active-fire archive and NRT detections (`2012-01-20` to `2026-11-01`).
- **Auxiliary Open Data:** geoBoundaries v6.0.0 (`BGD` ADM0/ADM1/ADM2, BBS & UN OCHA ROAP, CC BY 3.0 IGO / CC0 1.0), HOTOSM Bangladesh Fire Stations via HDX (ODbL 1.0), CARTO Dark Matter / OpenStreetMap basemap.

---

## AI Tools Disclosure
- **Tools Utilized:** Antigravity, Claude Code, Cursor, and the Gemini API.
- **Integrity Safeguards:** All scientific computations (ST-DBSCAN clustering, LOYO cross-validated quantile mapping/ratio calibration, climatology baselines, and anomaly classification) are deterministic Python code verified by automated unit and contract tests. The in-app AI assistant never generates SQL or invents numbers; it executes typed API tools against verified Parquet datasets and provides a labeled deterministic `replay` mode for offline judging.

---

## Team Members
- **Shirsha (`@Aragon`)** — Team Leader & Developer
- **`@azmaeenmahtab`** — Member & Developer
- **`@adityasaha03`** — Member & Developer
- **`@anamraiyan`** — Member & Developer
- **`@Rohan`** — Member & Developer

