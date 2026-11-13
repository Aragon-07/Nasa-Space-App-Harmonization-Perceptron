# PyroScope Claims Audit (`X01`)

Every quantitative claim made in the PyroScope UI, README, pitch deck, and submission text is traced below to its verified empirical source in this repository.

## 1. Sensor Counts, Ratios, and Filters (2000–2026)

| Claim | Verified Value | Evidence / Context | Source File |
| --- | --- | --- | --- |
| Total raw FIRMS detections ingested | `837,168` (`264,712` MODIS + `572,455` VIIRS) | `264,682` MODIS archive + `30` MODIS NRT; `572,044` VIIRS archive + `412` VIIRS NRT | `data/processed/current/manifest.json`, `docs/DATA_FINDINGS.md` (§2, §5) |
| Detections retained after science filters | `758,730` (`59,644` dropped by confidence/type, `1` duplicate dropped) | MODIS confidence >= 30 & `type == 0`; VIIRS `n`/`h` & `type == 0` when present | `data/processed/current/manifest.json`, `docs/DATA_FINDINGS.md` (§2–3) |
| Annual raw detections in 2012–2025 overlap | MODIS `9,645/yr` vs. VIIRS `39,193/yr` | Range: MODIS `6,507–12,775`; VIIRS `29,217–56,738` (replaces earlier report draft `3,029 vs 10,972`) | `docs/DATA_FINDINGS.md` (§1) |
| Empirical VIIRS / MODIS ratio (2012–2025) | `4.10x` raw (`3.35x–4.98x`), `3.77x` filtered | Never exceeds `5.0x` in any year (replaces earlier `"3 to 7 times"` estimate) | `docs/DATA_FINDINGS.md` (§1) |
| Report's `>80%` threshold flaw | Would drop `65.28%` of valid MODIS & break VIIRS | MODIS nominal `30–79` is `59.87%` of MODIS; VIIRS confidence is categorical `'l'/'n'/'h'` | `docs/DATA_FINDINGS.md` (§2) |
| Day vs. Night detections & median FRP | MODIS: `94.89%` day (`25.20 MW` median); VIIRS: `88.30%` day (`6.05 MW` median) | VIIRS captures `11.70%` night vs MODIS `5.11%` night | `docs/DATA_FINDINGS.md` (§5) |
| Complete overlap calibration window | `177` complete months (`2012-02` to `2026-10`) | VIIRS S-NPP starts `2012-01-20`, so `2012-02` is first full month | `docs/DATA_FINDINGS.md` (§4) |
| Terra-only pre-Aqua artifact (2000–2002) | Aqua captures `91%–94%` of MODIS (2003–2005) | Aqua launched May 4, 2002 (`~13:30` overpass); `2001` had `2,164` vs `2003` `10,965` | `docs/DATA_FINDINGS.md` (§7) |

## 2. Clustering, Harmonization & Jump Elimination

| Claim | Verified Value | Evidence / Context | Source File |
| --- | --- | --- | --- |
| Total ST-DBSCAN physical fire events | `109,246` events (`139,544` noise points) | Parameters: `eps = 2,700 m`, `dt = 24 h`, `min_pts = 2`; `78,672` outside country polygons | `data/processed/current/manifest.json` |
| Annual physical fire events ratio (2016/2019/2023) | `~560` MODIS vs `~860` VIIRS (`1.47x–1.59x`, `~1.5x`) | Condenses pixels by `~15x` (MODIS) and `~36x` (VIIRS); `<2.5 s/yr` runtime | `docs/DATA_FINDINGS.md` (§8) |
| Splice jump ratio eliminated | `1.85x` (+85%) naive → `0.86x` (-14%) harmonized | Pre-splice `2007–2011` mean `665.2/yr`; Post-splice `2012–2016` `1,230.2` naive vs `572.9` harmonized | `data/processed/current/diagnostics.json`, `docs/DATA_FINDINGS.md` (§10) |
| National overlap LOYO CV accuracy | RMSE `792.14` events/mo, MAE `334.42`, Bias `+334.37` | Leave-one-year-out cross-validation across `177` overlap months | `data/processed/current/diagnostics.json` |
| Calibration unit fallback breakdown | `3` direct districts, `61` division fallback | Only `Bandarban`, `Khagrachari`, `Rangamati` had `>= 3` mean monthly MODIS; `1` unit chose QM (`Barishal`), `10` chose Ratio | `docs/DATA_FINDINGS.md` (§10) |
| Cell downscaling conservation | `0.0` unallocated harmonized events | Exact conservation across `20,626` cell-months (`26,683` total land-covering H3 r7 cells) | `data/processed/current/manifest.json`, `docs/DATA_FINDINGS.md` (§10), `data/reference/SOURCES.md` |

## 3. Seasonality, Chittagong Hill Tracts (CHT) & Calendar Statistics

| Claim | Verified Value | Evidence / Context | Source File |
| --- | --- | --- | --- |
| CHT share of national active fires | `45.2%` of MODIS, `39.4%` of VIIRS detections; `86.6%` of harmonized national mean | CHT mean `475.05` vs Bangladesh `548.55` mean annual harmonized events (`2001–2025`) | `docs/DATA_FINDINGS.md` (§6, §11) |
| CHT fire season (70% circular window) | **March–April** (`97.07%` harmonized; `98.28%` Mar–May) | `window_length = 2` (`start = 3, peak = 4, end = 4`); May adds `5.75` events (`1.21%`) | `docs/DATA_FINDINGS.md` (§11) |
| Top 5 highest CHT years (`2001–2025`) | `2006` (#1, `738.00`), `2009` (#2, `700.00`), `2014` (#3, `625.65`), `2008` (#4, `623.00`), `2007` (#5, `616.00`) | `2006` recorded `+59.0%` vs baseline and `336,856.2 MW` FRP; `2001–2002` lowest due to Terra-only epoch | `docs/DATA_FINDINGS.md` (§11) |
| Anomaly counts across 74 regions | `23,088` region-months: `21,884` normal, `333` elevated, `871` extreme | Complete baseline years `2001–2025` (`p50`, `p90`, `p95` linear percentiles) | `docs/DATA_FINDINGS.md` (§11) |
| Emergency response & stations | FSCD hotlines `102` and `999` | Verified against Bangladesh Fire Service & Civil Defence; POI stations from HOTOSM (`ODbL 1.0`) | `data/reference/SOURCES.md` (§4) |
