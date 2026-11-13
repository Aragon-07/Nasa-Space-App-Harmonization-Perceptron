# PyroScope 240-Second Demo Script & Offline Fallback (`X02`)

**Total Duration:** 240 seconds (4:00)  
**Primary URL:** `/?demo=1` (auto-selects `PRESET-CHT` and opens the 4-step Pitch Guide)  
**Numbers Reference:** Every figure below matches `docs/CLAIMS_AUDIT.md` and `data/processed/current/manifest.json` (`v2026-10-31-f4296770`).

---

## Timed Walkthrough

| Time | Screen / Route | Action / Click Path | Talking Points (Verified Numbers Only) |
| :---: | --- | --- | --- |
| **0:00–0:30** | `/?demo=1` (Step 2) or `/hidden-jump` | Open `/?demo=1`; click **"Compare 3× Jump"** (or navigate to `/hidden-jump`) with area set to `Bangladesh (BGD)`. | **The Hidden Jump Problem:** MODIS (1 km, 2000–present) and VIIRS S-NPP (375 m, 2012–present) don't agree raw. In Bangladesh's 2012–2025 overlap, VIIRS averages `39,193` raw detections/yr vs. MODIS `9,645` (`4.10x` raw, `3.77x` filtered). A naive splice creates a fake **`1.85x` (+85%)** jump in 2012 (`665.2` → `1,230.2` events/yr). |
| **0:30–1:10** | `/hidden-jump` → `/?demo=1` (Step 1: Hex Map) | Toggle the harmonized line on the chart, then click **"View Hex Map"** and zoom into Chittagong Hill Tracts (H3 `res 7`). | **Two-Stage Harmonization:** First, ST-DBSCAN (`2,700 m`, `24 h`, `min_pts=2`) groups `758,730` filtered detections into `109,246` physical fire events, narrowing the annual ratio to `~1.5x` (`~560` MODIS vs. `~860` VIIRS events/yr). Next, cross-validated regional quantile mapping/ratio eliminates the splice jump (**`1.85x` → `0.86x`**) and downscales cleanly across `26,683` H3 r7 cells with **`0.0` unallocated events**. Click a hex cell to inspect its local calendar. |
| **1:10–1:55** | `/?demo=1` (Step 3: FireCalendar) | Click **"Open FireCalendar"** (`PRESET-CHT` selected). Hover over `2006-03`, `2020-05`, and `2001–2002`. | **FireCalendar & Anomalies:** Chittagong Hill Tracts holds `86.6%` of national harmonized burning (`45.2%` MODIS / `39.4%` VIIRS raw). Using the 70% circular window rule, CHT's fire season is **March–April (`97.07%` harmonized; `98.28%` Mar–May)**. `FireCalendar` flags extreme (`> p95`) months like `2006-03` (`482.00`) and shoulder anomaly `2020-05` (`15.28`), while transparently noting pre-Aqua Terra-only under-sampling in `2001–2002`. |
| **1:55–2:40** | `/ask` | Open **Ask PyroScope** (`/ask`). Run prompt: *"When does fire season usually start in the Chittagong Hill Tracts, and was last year unusual?"* | **Tool-Grounded Assistant:** The LLM never writes SQL and never computes numbers itself—it calls typed FastAPI/DuckDB tools over our verified Parquet tables and returns clickable citations (`dataVersion`, `areaId`, `years`). In offline/judging environments, it operates cleanly in labeled `replay` mode. |
| **2:40–3:20** | `/?demo=1` (Step 4) & `/alerts` | Click **"Open Action Planner"**; view season-stage checklist, FSCD fire station panel, and `/alerts` subscription rule. | **Early Warning & Local Action:** Land managers and responders get season-stage mitigation checklists, threshold alert subscriptions, and nearby Bangladesh Fire Service & Civil Defence stations (with verified `102` / `999` emergency hotlines). |
| **3:20–4:00** | `/methodology` | Navigate to `/methodology`; point to calibration summary, Q-Q plot, and limitations list. | **Scientific Honesty & Reproducibility:** Over `177` complete overlap months (`2012-02`–`2026-10`), 3 active CHT districts calibrate directly (`Ratio`) while 61 sparse districts fall back to parent divisions (`10` Ratio, `1` QM; national LOYO CV RMSE `792.14` events/mo). Active-fire counts are MODIS-equivalent events—not burned area—and alerts are strictly advisory. |

---

## Failure & Offline Fallback Plan

| Failure Scenario | Fallback Action |
| --- | --- |
| **WiFi / Cloud API Down** | Switch to the pre-started local `docker compose up --build` (or local `uvicorn` + `pnpm dev`) instance on `http://localhost:3000/?demo=1`. |
| **Gemini API Key / Quota Fails** | Keep `LLM_PROVIDER=replay` active; state explicitly during the demo that Ask PyroScope is running in deterministic `replay` mode using verified Parquet outputs. |
| **CARTO Basemap Tiles Blocked** | Deck.gl H3 hexagons and geoBoundaries district polygons continue rendering normally over the dark canvas even without external map tiles. |
| **Live App Completely Unavailable** | Play the 240s backup recording (`https://youtu.be/O7Fo4-lNndQ?si=PZ3GMXMkyO8Hx_7Q`) and walk through `docs/CLAIMS_AUDIT.md`. |

