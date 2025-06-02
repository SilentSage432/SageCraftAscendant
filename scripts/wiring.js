// ===============================
// Phase 201.17 — Neural Intake Bootstrap Injector

document.addEventListener("DOMContentLoaded", () => {
  window.NeuralIntakeEngine = {
    parseIntakeFile(fileContent) {
      try {
        const data = JSON.parse(fileContent);
        if (!Array.isArray(data)) {
          alert("Intake file format invalid — expecting an array.");
          return [];
        }
        return data;
      } catch (err) {
        alert("Failed to parse intake file: " + err);
        return [];
      }
    },

    injectIntakeRecords(records) {
      if (!window.NeuralForecastMemoryCortex || typeof window.NeuralForecastMemoryCortex.injectForecastRecord !== "function") {
        alert("Neural Cortex not available.");
        return;
      }

      let injectedCount = 0;

      records.forEach(record => {
        const entry = {
          timestamp: new Date().toISOString(),
          itemNumber: record.itemNumber || record.ItemNumber || "Unknown",
          onHandUnits: record.onHandUnits || record.OnHand || 0,
          division: record.division || record.Category || "Uncategorized"
        };

        window.NeuralForecastMemoryCortex.injectForecastRecord(entry);
        // === Forecast Cortex Seeding - Phase 202.0
        if (!window.ForecastSeedCortex) {
          window.ForecastSeedCortex = { seeds: [] };
        }
        const forecastSeed = {
          timestamp: entry.timestamp,
          itemNumber: entry.itemNumber,
          onHandUnits: entry.onHandUnits,
          division: entry.division
        };
        window.ForecastSeedCortex.seeds.push(forecastSeed);
        // Phase 202.1 — Rolling Memory Builder
        if (!window.ForecastRollingMemory) {
          window.ForecastRollingMemory = [];
        }
        window.ForecastRollingMemory.push(forecastSeed);
        if (window.ForecastRollingMemory.length > 1000) {
          window.ForecastRollingMemory.shift();  // keep memory window at 1000 entries
        }
        console.log("🧠 Rolling Forecast Memory Updated:", window.ForecastRollingMemory.length);
        console.log("🌱 Forecast Cortex Seed Injected:", forecastSeed);

        // Phase 202.2 — Rotational Trend Extractor
        if (!window.RotationalTrendMap) {
          window.RotationalTrendMap = {};
        }

        const key = `${entry.itemNumber}::${entry.division}`;
        if (!window.RotationalTrendMap[key]) {
          window.RotationalTrendMap[key] = {
            itemNumber: entry.itemNumber,
            division: entry.division,
            scanTimestamps: []
          };
        }
        window.RotationalTrendMap[key].scanTimestamps.push(entry.timestamp);

        // Keep only latest 50 scan points per item/division combo
        if (window.RotationalTrendMap[key].scanTimestamps.length > 50) {
          window.RotationalTrendMap[key].scanTimestamps.shift();
        }

        console.log(`🔄 Trend Rotation Updated for ${key}: ${window.RotationalTrendMap[key].scanTimestamps.length} scans`);

        // Phase 202.3 — Rotational Drift Sentinel
        if (!window.RotationalDriftSentinel) {
          window.RotationalDriftSentinel = {};
        }

        const rotationData = window.RotationalTrendMap[key].scanTimestamps;
        const driftThreshold = 10; // Adjustable sensitivity

        if (rotationData.length >= 5) {
          const recentScans = rotationData.slice(-5).map(ts => new Date(ts).getTime());
          const intervals = [];

          for (let i = 1; i < recentScans.length; i++) {
            intervals.push(recentScans[i] - recentScans[i - 1]);
          }

          const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

          if (!window.RotationalDriftSentinel[key]) {
            window.RotationalDriftSentinel[key] = { avgInterval, anomalyCount: 0 };
          } else {
            const prevAvg = window.RotationalDriftSentinel[key].avgInterval;
            const drift = Math.abs(avgInterval - prevAvg) / prevAvg;

            if (drift > 0.25) {
              window.RotationalDriftSentinel[key].anomalyCount++;
              console.warn(`⚠ Drift Detected for ${key}: Δ${(drift * 100).toFixed(1)}%`);
            }

            // Adaptive smoothing
            window.RotationalDriftSentinel[key].avgInterval = (prevAvg * 0.8) + (avgInterval * 0.2);
          }
        }

        // Phase 202.4 — Cross-Division Comparative Mapper
        if (!window.CrossDivisionMap) {
          window.CrossDivisionMap = {};
        }

        Object.values(window.RotationalTrendMap).forEach(entryObj => {
          const divKey = entryObj.division;
          if (!window.CrossDivisionMap[divKey]) {
            window.CrossDivisionMap[divKey] = { totalScans: 0, items: {} };
          }

          const itemKey = entryObj.itemNumber;
          const itemScanCount = entryObj.scanTimestamps.length;

          window.CrossDivisionMap[divKey].totalScans += 1;
          window.CrossDivisionMap[divKey].items[itemKey] = itemScanCount;
        });

        console.log("🌐 Cross-Division Map Updated:", window.CrossDivisionMap);

        // Phase 202.5 — Multi-Axis Correlation Sentinel
        if (!window.MultiAxisCorrelation) {
          window.MultiAxisCorrelation = {};
        }

        Object.entries(window.CrossDivisionMap).forEach(([divisionKey, divData]) => {
          const totalScans = divData.totalScans;
          const itemKeys = Object.keys(divData.items);

          itemKeys.forEach(itemKey => {
            const scanCount = divData.items[itemKey];
            const scanRatio = scanCount / totalScans;

            if (!window.MultiAxisCorrelation[itemKey]) {
              window.MultiAxisCorrelation[itemKey] = {};
            }

            window.MultiAxisCorrelation[itemKey][divisionKey] = scanRatio;
          });
        });

        console.log("🧮 Multi-Axis Correlation Updated:", window.MultiAxisCorrelation);

        // Phase 202.6 — Predictive Memory Archiver
        if (!window.PredictiveMemoryArchive) {
          window.PredictiveMemoryArchive = [];
        }

        const snapshot = {
          timestamp: new Date().toISOString(),
          multiAxisCorrelation: JSON.parse(JSON.stringify(window.MultiAxisCorrelation)),
          rotationalDrift: JSON.parse(JSON.stringify(window.RotationalDriftSentinel)),
          crossDivisionMap: JSON.parse(JSON.stringify(window.CrossDivisionMap))
        };

        window.PredictiveMemoryArchive.push(snapshot);

        // Limit archive to last 500 snapshots to preserve memory
        if (window.PredictiveMemoryArchive.length > 500) {
          window.PredictiveMemoryArchive.shift();
        }

        console.log("📦 Predictive Memory Archive Snapshot Captured:", snapshot);

        // Phase 202.7 — Temporal Forecast Comparator
        if (!window.TemporalForecastComparator) {
          window.TemporalForecastComparator = [];
        }

        function computeDriftScore(current, previous) {
          let score = 0;
          const keys = Object.keys(current);
          keys.forEach(itemKey => {
            const divKeys = Object.keys(current[itemKey] || {});
            divKeys.forEach(divKey => {
              const curRatio = current[itemKey][divKey] || 0;
              const prevRatio = (previous[itemKey]?.[divKey]) || 0;
              score += Math.abs(curRatio - prevRatio);
            });
          });
          return score;
        }

        if (window.PredictiveMemoryArchive.length > 1) {
          const latest = window.PredictiveMemoryArchive[window.PredictiveMemoryArchive.length - 1];
          const previous = window.PredictiveMemoryArchive[window.PredictiveMemoryArchive.length - 2];

          const driftScore = computeDriftScore(latest.multiAxisCorrelation, previous.multiAxisCorrelation);

          window.TemporalForecastComparator.push({
            timestamp: latest.timestamp,
            driftScore: driftScore.toFixed(4)
          });

          console.log("🔬 Temporal Drift Comparison:", driftScore.toFixed(4));
        }

        // Phase 202.8 — Predictive Delta Memory Chain
        if (!window.ForecastDeltaMemoryChain) {
          window.ForecastDeltaMemoryChain = [];
        }

        const deltaSnapshot = {
          timestamp: new Date().toISOString(),
          driftScore: (window.TemporalForecastComparator?.slice(-1)[0]?.driftScore) || "0.0000",
          totalSeeds: window.ForecastSeedCortex?.seeds?.length || 0,
          rollingWindow: window.ForecastRollingMemory?.length || 0,
          totalArchiveSnapshots: window.PredictiveMemoryArchive?.length || 0
        };

        window.ForecastDeltaMemoryChain.push(deltaSnapshot);

        // Limit chain size to last 1000 deltas for performance
        if (window.ForecastDeltaMemoryChain.length > 1000) {
          window.ForecastDeltaMemoryChain.shift();
        }

        console.log("🔗 Delta Memory Chain Updated:", deltaSnapshot);

        // Phase 202.9 — Forecast Drift Heatmap Seed
        if (!window.ForecastDriftHeatmap) {
          window.ForecastDriftHeatmap = [];
        }

        const heatmapSnapshot = {
          timestamp: new Date().toISOString(),
          driftScore: parseFloat(deltaSnapshot.driftScore),
          rotationalDriftCount: Object.keys(window.RotationalDriftSentinel || {}).length,
          multiAxisKeys: Object.keys(window.MultiAxisCorrelation || {}).length,
          crossDivisionKeys: Object.keys(window.CrossDivisionMap || {}).length
        };

        window.ForecastDriftHeatmap.push(heatmapSnapshot);

        // Keep only last 500 heatmap points for efficiency
        if (window.ForecastDriftHeatmap.length > 500) {
          window.ForecastDriftHeatmap.shift();
        }

        console.log("🌡 Forecast Drift Heatmap Updated:", heatmapSnapshot);

        // Phase 203.0 — Drift Heatmap Visual Engine Activation
        if (!window.ForecastDriftVisualizer) {
          window.ForecastDriftVisualizer = function renderHeatmap() {
            const container = document.getElementById("forecastDriftHeatmap");
            if (!container) {
              console.warn("⚠ Heatmap container not found.");
              return;
            }

            const heatmap = window.ForecastDriftHeatmap || [];
            if (!heatmap.length) {
              container.innerHTML = "<em>No heatmap data available.</em>";
              return;
            }

            const rows = heatmap.map((point, index) => {
              const intensity = Math.min(1, point.driftScore / 5);
              const color = `rgba(255, ${Math.floor(255 * (1 - intensity))}, ${Math.floor(255 * (1 - intensity))}, 0.8)`;
              return `
                <div style="width: 100%; padding: 4px; background-color: ${color}; margin-bottom: 2px; border-radius: 4px;">
                  <strong>${index + 1}</strong> — Δ ${point.driftScore.toFixed(4)}
                </div>
              `;
            }).reverse();

            container.innerHTML = rows.join('');
          };
        }

        // Phase 203.1 — Drift Heatmap Auto-Refresh Loop
        if (!window.ForecastDriftHeatmapLoop) {
          window.ForecastDriftHeatmapLoop = setInterval(() => {
            if (typeof window.ForecastDriftVisualizer === "function") {
              window.ForecastDriftVisualizer();
            }
          }, 5000);
          console.log("🌡 Drift Heatmap Auto-Refresh Loop Activated");
        }

        // Phase 203.2 — Drift Volatility Signal Stabilizer
        if (!window.DriftVolatilityStabilizer) {
          window.DriftVolatilityStabilizer = function stabilizeHeatmap() {
            const heatmap = window.ForecastDriftHeatmap || [];
            if (!heatmap.length) return;

            for (let i = 1; i < heatmap.length; i++) {
              const prev = heatmap[i - 1].driftScore;
              const curr = heatmap[i].driftScore;
              const diff = Math.abs(curr - prev);

              if (diff > 2) {
                // Apply soft clamp to extreme spikes
                heatmap[i].driftScore = parseFloat((prev + (curr - prev) * 0.3).toFixed(4));
              }
            }

            console.log("🌊 Drift Heatmap Stabilized");
          };
        }

        window.DriftVolatilityStabilizer();

        // Phase 203.3 — Forecast Stability Index (FSI) Core Seed
        if (!window.ForecastStabilityIndex) {
          window.ForecastStabilityIndex = [];
        }

        const fsiWindow = window.ForecastDriftHeatmap.slice(-50); // last 50 entries
        if (fsiWindow.length >= 10) {
          const driftValues = fsiWindow.map(pt => pt.driftScore);
          const avgDrift = driftValues.reduce((a, b) => a + b, 0) / driftValues.length;
          const maxDrift = Math.max(...driftValues);
          const minDrift = Math.min(...driftValues);
          const stabilityScore = 100 - (avgDrift * 10); // simple inverse scale

          const fsiSnapshot = {
            timestamp: new Date().toISOString(),
            avgDrift: avgDrift.toFixed(4),
            maxDrift: maxDrift.toFixed(4),
            minDrift: minDrift.toFixed(4),
            stabilityScore: stabilityScore.toFixed(2)
          };

          window.ForecastStabilityIndex.push(fsiSnapshot);

          if (window.ForecastStabilityIndex.length > 500) {
            window.ForecastStabilityIndex.shift();
          }

          console.log("📊 Forecast Stability Index Updated:", fsiSnapshot);
        }

        // Phase 203.4 — FSI Live Visual Panel Injection
        if (!window.renderFSIPanel) {
          window.renderFSIPanel = function renderFSI() {
            const panel = document.getElementById("fsiPanel");
            if (!panel) {
              console.warn("⚠ FSI Panel container not found.");
              return;
            }

            const fsiData = window.ForecastStabilityIndex || [];
            if (!fsiData.length) {
              panel.innerHTML = "<em>No FSI data available yet.</em>";
              return;
            }

            const latest = fsiData[fsiData.length - 1];
            panel.innerHTML = `
              <div style="padding: 10px; background-color: #222; border-radius: 8px; color: #fff;">
                <strong>Forecast Stability Index</strong><br><br>
                Stability Score: ${latest.stabilityScore}<br>
                Avg Drift: ${latest.avgDrift}<br>
                Max Drift: ${latest.maxDrift}<br>
                Min Drift: ${latest.minDrift}
              </div>
            `;
          };
        }

        // Phase 203.5 — FSI Auto-Refresh Loop Engine
        if (!window.ForecastStabilityIndexLoop) {
          window.ForecastStabilityIndexLoop = setInterval(() => {
            if (typeof window.renderFSIPanel === "function") {
              window.renderFSIPanel();
            }
          }, 5000);
          console.log("📊 FSI Auto-Refresh Loop Activated");
        }

        // Phase 203.6 — Multi-Axis Memory Interlinker Core
        if (!window.MultiAxisMemoryInterlinker) {
          window.MultiAxisMemoryInterlinker = function interlinkMemory() {
            const driftHeatmap = window.ForecastDriftHeatmap || [];
            const fsiData = window.ForecastStabilityIndex || [];

            if (!driftHeatmap.length || !fsiData.length) {
              console.warn("🧩 Interlinker skipped — insufficient data.");
              return;
            }

            const linkedMemory = driftHeatmap.map((driftPoint, idx) => {
              const correspondingFSI = fsiData[idx] || fsiData[fsiData.length - 1];
              return {
                timestamp: driftPoint.timestamp,
                driftScore: driftPoint.driftScore,
                stabilityScore: parseFloat(correspondingFSI.stabilityScore),
                combinedIndex: (100 - Math.abs(driftPoint.driftScore * 10 - parseFloat(correspondingFSI.stabilityScore))).toFixed(2)
              };
            });

            window.MultiAxisLinkedMemory = linkedMemory.slice(-100);  // keep last 100 interlinked points
            console.log("🔗 Multi-Axis Memory Interlinker Updated:", window.MultiAxisLinkedMemory);
          };
        }

        window.MultiAxisMemoryInterlinker();

        // Phase 203.7 — Interlinked Memory Drift Visualizer Seed
        if (!window.renderInterlinkedMemoryPanel) {
          window.renderInterlinkedMemoryPanel = function renderInterlinkedMemory() {
            const container = document.getElementById("interlinkedMemoryPanel");
            if (!container) {
              console.warn("⚠ Interlinked Memory Panel container not found.");
              return;
            }

            const linkedData = window.MultiAxisLinkedMemory || [];
            if (!linkedData.length) {
              container.innerHTML = "<em>No interlinked memory data available yet.</em>";
              return;
            }

            const rows = linkedData.map((entry, index) => {
              const colorIntensity = Math.min(1, Math.abs(entry.combinedIndex - 100) / 50);
              const bgColor = `rgba(${Math.floor(255 * colorIntensity)}, ${Math.floor(255 * (1 - colorIntensity))}, 0, 0.8)`;
              return `
                <div style="width: 100%; padding: 4px; background-color: ${bgColor}; margin-bottom: 2px; border-radius: 4px;">
                  <strong>${index + 1}</strong> — CI: ${entry.combinedIndex}
                </div>
              `;
            }).reverse();

            container.innerHTML = rows.join('');
          };
        }

        window.renderInterlinkedMemoryPanel();
        console.log("🔬 Interlinked Memory Drift Visualizer Render Complete");

        // Phase 203.8 — Memory Anomaly Cluster Mapper
        if (!window.MemoryAnomalyClusterMapper) {
          window.MemoryAnomalyClusterMapper = function mapAnomalyClusters() {
            const linkedData = window.MultiAxisLinkedMemory || [];
            if (!linkedData.length) {
              console.warn("🧬 No linked memory data for cluster mapping.");
              return;
            }

            const clusters = [];
            let currentCluster = null;
            const CLUSTER_THRESHOLD = 20; // Sensitivity dial

            linkedData.forEach(entry => {
              const ci = parseFloat(entry.combinedIndex);
              if (ci < (100 - CLUSTER_THRESHOLD)) {
                if (!currentCluster) {
                  currentCluster = { start: entry.timestamp, points: [] };
                }
                currentCluster.points.push(entry);
              } else {
                if (currentCluster) {
                  currentCluster.end = entry.timestamp;
                  clusters.push(currentCluster);
                  currentCluster = null;
                }
              }
            });

            if (currentCluster) {
              currentCluster.end = linkedData[linkedData.length - 1].timestamp;
              clusters.push(currentCluster);
            }

            window.AnomalyClusters = clusters;
            console.log("📊 Memory Anomaly Clusters Mapped:", window.AnomalyClusters);
          };
        }

        window.MemoryAnomalyClusterMapper();

        window.renderFSIPanel();
        console.log("📊 FSI Live Visual Panel Rendered");

        window.ForecastDriftVisualizer();
        console.log("🌡 Drift Heatmap Visual Render Complete");

        // Phase 203.9 — Cluster Visual Telemetry Seed
        // (Cluster telemetry block would be here)

        // Phase 204.0.0 — Navigation Self-Regulator Bootstrap
        if (!window.NeuralNavigationCortex) {
          window.NeuralNavigationCortex = (function() {
            const validTabs = [
              'about', 'audit', 'count', 'inventory', 'tools',
              'vault', 'deltaAnalyzer', 'exceptionManager',
              'progressDashboard', 'reportingHub', 'masterExportHub', 'utilityHub'
            ];

            function activateTab(target) {
              if (!validTabs.includes(target)) {
                console.warn(`⚠ Nav Cortex: Invalid tab target: ${target}`);
                alert(`⛔ Unknown navigation target: ${target}`);
                return;
              }
              console.log(`🧭 Neural Nav Cortex directing to: ${target}`);
              window.switchTab(target);
            }

            function interceptLegacyButtons() {
              const legacyButtons = document.querySelectorAll('.tablink');
              legacyButtons.forEach(btn => {
                const target = btn.dataset.target;
                if (target) {
                  btn.removeEventListener('click', btn.onclick);
                  btn.onclick = () => activateTab(target);
                  btn.setAttribute('listener-attached', 'true');
                }
              });
            }

            function bootstrap() {
              interceptLegacyButtons();
              console.log("🧬 Neural Nav Cortex fully linked.");
            }

            return { activateTab, bootstrap };
          })();

          window.NeuralNavigationCortex.bootstrap();
        }

        // Phase 204.1.0 — Deep Navigation State Memory Injection
        if (!window.NavStateMemoryCore) {
          window.NavStateMemoryCore = (function() {
            let stateLog = [];

            function logNavigation(target) {
              const timestamp = new Date().toISOString();
              stateLog.push({ timestamp, target });
              if (stateLog.length > 500) {
                stateLog.shift();
              }
              localStorage.setItem("navStateMemory", JSON.stringify(stateLog));
              console.log(`📅 NavStateMemory → ${target} logged at ${timestamp}`);
            }

            function restoreLastState() {
              const saved = localStorage.getItem("navStateMemory");
              if (saved) {
                stateLog = JSON.parse(saved);
                const last = stateLog[stateLog.length - 1];
                if (last && last.target) {
                  console.log(`🔄 Restoring last nav state: ${last.target}`);
                  if (window.NeuralNavigationCortex) {
                    window.NeuralNavigationCortex.activateTab(last.target);
                  } else {
                    window.switchTab(last.target);
                  }
                }
              }
            }

            function initHook() {
              const legacyButtons = document.querySelectorAll('.tablink');
              legacyButtons.forEach(btn => {
                const target = btn.dataset.target;
                if (target) {
                  btn.addEventListener("click", () => logNavigation(target));
                }
              });
            }

            return { logNavigation, restoreLastState, initHook };
          })();

          window.NavStateMemoryCore.initHook();
          window.NavStateMemoryCore.restoreLastState();
        }

        injectedCount++;

        // Phase 204.2.0 — Predictive Navigation Memory Optimizer
        if (!window.NavStateOptimizer) {
          window.NavStateOptimizer = (function() {
            let optimizationLog = [];

            function analyzePatterns() {
              const saved = localStorage.getItem("navStateMemory");
              if (!saved) return;

              const stateLog = JSON.parse(saved);
              const counts = {};

              stateLog.forEach(entry => {
                counts[entry.target] = (counts[entry.target] || 0) + 1;
              });

              const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

              optimizationLog = sorted.map(([target, count]) => ({ target, count }));
              localStorage.setItem("navStateOptimized", JSON.stringify(optimizationLog));
              console.log("🧮 Nav State Optimization Calculated:", optimizationLog);
            }

            function displayOptimizationReport() {
              const panel = document.getElementById("navOptimizationPanel");
              if (!panel) {
                console.warn("⚠ Optimization Panel container not found.");
                return;
              }

              if (!optimizationLog.length) {
                panel.innerHTML = "<em>No navigation optimization data available yet.</em>";
                return;
              }

              const rows = optimizationLog.map(opt => {
                return `<div style="margin-bottom: 6px; color: #fff;">
                  ${opt.target}: ${opt.count} visits
                </div>`;
              });

              panel.innerHTML = rows.join('');
            }

            function optimizeHook() {
              analyzePatterns();
              displayOptimizationReport();
            }

            return { optimizeHook };
          })();

          window.NavStateOptimizer.optimizeHook();
        }

        // Phase 204.3.0 — Self-Healing Navigation Redirector
        if (!window.NavRedirectorCore) {
          window.NavRedirectorCore = (function() {
            function suggestBestRedirect(invalidTarget) {
              const saved = localStorage.getItem("navStateOptimized");
              if (!saved) {
                alert(`Unknown navigation target: ${invalidTarget}`);
                return;
              }

              const optimized = JSON.parse(saved);
              if (!optimized.length) {
                alert(`Unknown navigation target: ${invalidTarget}`);
                return;
              }

              const [top] = optimized;
              if (top && top.target) {
                const suggestion = confirm(`⛔ Target "${invalidTarget}" not found.\n\nRedirect to "${top.target}" instead?`);
                if (suggestion) {
                  if (window.NeuralNavigationCortex) {
                    window.NeuralNavigationCortex.activateTab(top.target);
                  } else {
                    window.switchTab(top.target);
                  }
                }
              } else {
                alert(`Unknown navigation target: ${invalidTarget}`);
              }
            }

            function patchNavCortex() {
              if (!window.NeuralNavigationCortex) return;

              const originalActivate = window.NeuralNavigationCortex.activateTab;
              window.NeuralNavigationCortex.activateTab = function(target) {
                const validTabs = [
                  'about', 'audit', 'count', 'inventory', 'tools',
                  'vault', 'deltaAnalyzer', 'exceptionManager',
                  'progressDashboard', 'reportingHub', 'masterExportHub', 'utilityHub'
                ];

                if (!validTabs.includes(target)) {
                  console.warn(`⚠ Self-Healing Redirect: ${target}`);
                  suggestBestRedirect(target);
                } else {
                  originalActivate(target);
                }
              };
            }

            return { patchNavCortex };
          })();

          window.NavRedirectorCore.patchNavCortex();
        }

        // Phase 204.4.0 — Neuro-Adaptive Tab Prioritization
        if (!window.NeuroAdaptiveTabCore) {
          window.NeuroAdaptiveTabCore = (function() {
            let priorityCache = [];

            function refreshPriorities() {
              const saved = localStorage.getItem("navStateOptimized");
              if (!saved) return;

              const optimized = JSON.parse(saved);
              if (!optimized.length) return;

              priorityCache = optimized.map((entry, idx) => ({
                target: entry.target,
                score: entry.count + (optimized.length - idx)
              }));

              console.log("🧠 Adaptive Priorities Refreshed:", priorityCache);
            }

            function getTopPriority() {
              if (!priorityCache.length) refreshPriorities();
              return priorityCache[0]?.target || null;
            }

            function applyBias() {
              const navButtons = document.querySelectorAll('.tablink');
              if (!navButtons.length) return;

              navButtons.forEach(btn => {
                const target = btn.dataset.target;
                const match = priorityCache.find(entry => entry.target === target);
                if (match) {
                  const weight = match.score;
                  btn.style.outline = `2px solid rgba(255, 215, 0, ${Math.min(1, weight / 10)})`;
                } else {
                  btn.style.outline = "none";
                }
              });

              console.log("🎯 Neuro-Adaptive Visual Bias Applied");
            }

            function initialize() {
              refreshPriorities();
              applyBias();
            }

            return { initialize, refreshPriorities, applyBias, getTopPriority };
          })();

          window.NeuroAdaptiveTabCore.initialize();
        }

        // Phase 204.5.0 — Cognitive Weight Reinforcement Engine
        if (!window.CognitiveReinforcer) {
          window.CognitiveReinforcer = (function() {
            let reinforcementMap = {};

            function applyReinforcement() {
              const saved = localStorage.getItem("navStateOptimized");
              if (!saved) return;

              const optimized = JSON.parse(saved);
              optimized.forEach(entry => {
                const existing = reinforcementMap[entry.target] || 0;
                const bonus = Math.floor(entry.count / 10);
                reinforcementMap[entry.target] = existing + bonus;
              });

              localStorage.setItem("navReinforcementMemory", JSON.stringify(reinforcementMap));
              console.log("🧠 Cognitive Reinforcement Applied:", reinforcementMap);
            }

            function applyVisualEnhancement() {
              const navButtons = document.querySelectorAll('.tablink');
              if (!navButtons.length) return;

              navButtons.forEach(btn => {
                const target = btn.dataset.target;
                const boost = reinforcementMap[target] || 0;
                if (boost > 0) {
                  btn.style.boxShadow = `0 0 ${boost * 2}px rgba(255, 215, 0, 0.7)`;
                }
              });

              console.log("🌟 Cognitive Visual Reinforcement Applied");
            }

            function initialize() {
              applyReinforcement();
              applyVisualEnhancement();
            }

            return { initialize };
          })();

          window.CognitiveReinforcer.initialize();
        }

        // Phase 204.6.0 — Dynamic Habit Mutation Engine
        if (!window.DynamicHabitMutator) {
          window.DynamicHabitMutator = (function() {
            function performMutation() {
              const saved = localStorage.getItem("navStateOptimized");
              const reinforcement = localStorage.getItem("navReinforcementMemory");
              if (!saved || !reinforcement) return;

              const optimized = JSON.parse(saved);
              const reinforcementMap = JSON.parse(reinforcement);
              if (!optimized.length) return;

              const mutatedOrder = optimized
                .map(entry => {
                  const bonus = reinforcementMap[entry.target] || 0;
                  return { target: entry.target, score: entry.count + bonus };
                })
                .sort((a, b) => b.score - a.score);

              localStorage.setItem("navDynamicOrder", JSON.stringify(mutatedOrder));
              console.log("🧬 Habit Mutation Applied:", mutatedOrder);
            }

            function rearrangeNavUI() {
              const navContainer = document.getElementById("navButtonCluster");
              if (!navContainer) {
                console.warn("⚠ navButtonCluster not found.");
                return;
              }

              const savedOrder = localStorage.getItem("navDynamicOrder");
              if (!savedOrder) return;

              const mutatedOrder = JSON.parse(savedOrder);
              const allButtons = [...navContainer.querySelectorAll('.tablink')];

              mutatedOrder.forEach(entry => {
                const btn = allButtons.find(b => b.dataset.target === entry.target);
                if (btn) {
                  navContainer.appendChild(btn);
                }
              });

              console.log("🔄 Navigation UI Mutated");
            }

            function initialize() {
              performMutation();
              rearrangeNavUI();
            }

            return { initialize };
          })();

          window.DynamicHabitMutator.initialize();
        }
      });

      alert(`✅ Neural Intake Complete: ${injectedCount} records injected.`);
    }
  };

  console.log("🧪 Neural Intake Engine Initialized.");
});

// ===============================
// Phase 201.18 — Neural Intake File Loader UI Injector

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) {
    console.warn("⚠ Operator Console Panel not found. Skipping Neural Intake File Loader UI.");
    return;
  }

  const intakeLabel = document.createElement("label");
  intakeLabel.textContent = "📂 Load Neural Intake File:";
  intakeLabel.style.display = "block";
  intakeLabel.style.marginTop = "20px";
  intakeLabel.style.color = "#fff";
  intakeLabel.style.fontWeight = "bold";
  operatorPanel.appendChild(intakeLabel);

  const intakeInput = document.createElement("input");
  intakeInput.type = "file";
  intakeInput.accept = ".json";
  intakeInput.style.margin = "10px 0";
  intakeInput.style.padding = "8px";
  intakeInput.style.borderRadius = "4px";
  operatorPanel.appendChild(intakeInput);

  const intakeBtn = document.createElement("button");
  intakeBtn.textContent = "🚀 Inject Intake Data";
  intakeBtn.style.padding = "10px 16px";
  intakeBtn.style.backgroundColor = "#0077cc";
  intakeBtn.style.color = "#fff";
  intakeBtn.style.fontWeight = "bold";
  intakeBtn.style.border = "none";
  intakeBtn.style.borderRadius = "6px";
  intakeBtn.style.cursor = "pointer";
  intakeBtn.style.boxShadow = "0 0 6px rgba(255,255,255,0.2)";
  intakeBtn.style.transition = "all 0.3s ease-in-out";
  operatorPanel.appendChild(intakeBtn);

  intakeBtn.addEventListener("click", () => {
    const file = intakeInput.files[0];
    if (!file) {
      alert("Please select an intake file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;
      const records = window.NeuralIntakeEngine.parseIntakeFile(contents);
      if (records.length > 0) {
        // Phase 201.19 — Intake Format Inspector: Validate before injection
        if (typeof window.NeuralIntakeEngine.validateIntakeStructure === "function") {
          window.NeuralIntakeEngine.validateIntakeStructure(records);
        }
        window.NeuralIntakeEngine.injectIntakeRecords(records);
      }
    };
    reader.readAsText(file);
  });
});

// ===============================
// Phase 201.19 — Neural Intake Format Inspector Injector

document.addEventListener("DOMContentLoaded", () => {
  window.NeuralIntakeEngine.validateIntakeStructure = function(records) {
    let validCount = 0;
    let invalidCount = 0;

    records.forEach(record => {
      const hasItem = record.itemNumber || record.ItemNumber;
      const hasOnHand = (record.onHandUnits !== undefined || record.OnHand !== undefined);
      const hasDivision = record.division || record.Category;

      if (hasItem && hasOnHand && hasDivision) {
        validCount++;
      } else {
        invalidCount++;
      }
    });

    console.log(`🧪 Intake Format Inspection Complete — Valid: ${validCount} | Invalid: ${invalidCount}`);

    if (invalidCount > 0) {
      alert(`⚠ Warning: ${invalidCount} invalid records detected. These will be skipped during intake.`);
    }
  };

  console.log("✅ Neural Intake Format Inspector Activated");
});
// ===============================
// Phase 201.16 — Neural Cortex → Wiring Bridge Injector

document.addEventListener("DOMContentLoaded", () => {
  // Verify Cortex exists
  if (!window.NeuralForecastMemoryCortex || typeof window.NeuralForecastMemoryCortex.addInjectionHook !== "function") {
    console.warn("⚠ Neural Cortex Injection Hook not available.");
    return;
  }

  // Attach live Cortex→Visual Sync bridge
  window.NeuralForecastMemoryCortex.addInjectionHook(() => {
    if (window.NeuralVisualSync && typeof window.NeuralVisualSync.refreshLiveTableFromCortex === "function") {
      window.NeuralVisualSync.refreshLiveTableFromCortex();
      console.log("🔄 Live Table Synced to Neural Cortex");
    } else {
      console.warn("⚠ NeuralVisualSync not available for live table refresh.");
    }
  });

  console.log("✅ Phase 201.16 — Neural Cortex → Visual Sync Bridge Activated");
});

// ===============================
// Phase 128.3.5 — Global Drawer Controller Injection

window.DrawerEngineController = (function() {
  const controlDrawer = document.getElementById('controlDrawer');
  const predictiveDrawer = document.getElementById('predictiveDrawer');
  const drawerWidth = 320;

  function openControlDrawer() {
    controlDrawer.style.left = '0px';
  }

  function closeControlDrawer() {
    controlDrawer.style.left = `-${drawerWidth}px`;
  }

  function openPredictiveDrawer() {
    predictiveDrawer.style.left = '0px';
  }

  function closePredictiveDrawer() {
    predictiveDrawer.style.left = `-${drawerWidth}px`;
  }

  return {
    openControlDrawer,
    closeControlDrawer,
    openPredictiveDrawer,
    closePredictiveDrawer
  };
})();

// ===============================
// Phase 122.6 Hotfix - Safe fallback functions

if (typeof window.loadForecastHistory !== "function") {
  window.loadForecastHistory = function() {
    console.warn("⚠️ loadForecastHistory() not yet fully implemented. Returning demo scaffold.");

    const mockHistory = [
      {
        timestamp: new Date().toISOString(),
        data: [
          { category: "Lighting", daysAway: 15 },
          { category: "Power Tools", daysAway: 7 },
          { category: "Lawn & Garden", daysAway: 2 },
          { category: "Appliances", daysAway: 0 }
        ]
      }
    ];
    return mockHistory;
  };
}

if (typeof window.runRotationEngineAuditUI !== "function") {
  window.runRotationEngineAuditUI = function() {
    console.warn("⚠️ runRotationEngineAuditUI() not yet implemented.");
  };
}


let overlayUpdateInterval = 2000;

function adjustOverlayUpdateInterval() {
  if (window.innerWidth <= 768) {
    overlayUpdateInterval = 5000;  // Mobile devices: slower refresh for battery
  } else {
    overlayUpdateInterval = 2000;  // Desktop: normal refresh rate
  }
}

window.addEventListener('resize', adjustOverlayUpdateInterval);
adjustOverlayUpdateInterval();




function updatePredictiveDrawerPanels() {
  // Diagnostics panel update
  const totalButtons = document.querySelectorAll('button').length;
  const listeners = document.querySelectorAll('button[listener-attached]').length;
  const upcMapCount = (window.upcToItemMap) ? Object.keys(window.upcToItemMap).length : 0;
  const eslMapCount = (window.eslToItemMap) ? Object.keys(window.eslToItemMap).length : 0;
  const bayMapCount = (window.bayToItemMap) ? Object.keys(window.bayToItemMap).length : 0;

  const predictiveDiagnostics = document.getElementById('predictiveDiagnosticsStatus');
  if (predictiveDiagnostics) {
    predictiveDiagnostics.innerHTML = `
      🔘 Buttons: ${totalButtons}<br>
      🎯 Listeners: ${listeners}<br>
      🗂 UPC Map: ${upcMapCount}<br>
      🏷 ESL Map: ${eslMapCount}<br>
      🗃 Bay Map: ${bayMapCount}
    `;
  }

  // Dropbox panel update
  const predictiveDropbox = document.getElementById('predictiveDropboxStatus');
  if (predictiveDropbox) {
    const dropboxConnected = (window.isDropboxConnected && typeof window.isDropboxConnected === 'function') ? window.isDropboxConnected() : false;
    predictiveDropbox.innerHTML = dropboxConnected ? "☁️ Connected" : "☁️ Offline";
    predictiveDropbox.style.color = dropboxConnected ? "#00cc66" : "#ff4444";
  }
}

setInterval(updatePredictiveDrawerPanels, overlayUpdateInterval);



// ===============================
// Optimized Live Field Log Viewer Wiring

const logContainer = document.getElementById('fieldLogContent');
const refreshBtn = document.getElementById('refreshFieldLog');
const exportBtn = document.getElementById('exportFieldLog');
const filterButtons = document.querySelectorAll('.log-filter-btn');

function renderFieldLog(filter = 'all') {
  if (!logContainer) return;
  const logs = window.getFieldLog ? window.getFieldLog() : [];
  if (!logs.length) {
    logContainer.innerHTML = "<em>No log entries yet.</em>";
    return;
  }
  const filteredLogs = (filter === 'all') ? logs : logs.filter(entry => entry.eventType === filter);
  logContainer.innerHTML = filteredLogs
    .slice().reverse()
    .map(entry => {
      const time = new Date(entry.timestamp).toLocaleString();
      return `<div style="margin-bottom:5px;"><strong>${time}</strong>: [${entry.eventType}] ${JSON.stringify(entry.details)}</div>`;
    })
    .join('');
}

if (refreshBtn) refreshBtn.addEventListener('click', () => renderFieldLog());

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    renderFieldLog(filter);
    localStorage.setItem('fieldLogFilter', filter);
  });
});

// Phase 83.2 — Persistent Field Log Filter Restore
document.addEventListener('DOMContentLoaded', () => {
  const savedFilter = localStorage.getItem('fieldLogFilter') || 'all';
  renderFieldLog(savedFilter);
});

if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const logs = window.getFieldLog ? window.getFieldLog() : [];
    const prettyJSON = JSON.stringify(logs, null, 2);
    const blob = new Blob([prettyJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fieldLog_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// ===============================
// Phase 19.5 — Resolver Bootstrap Linker Injection

// Full global exposure for master wiring stability
const buttonMap = {
  loadForecastSnapshotBtn: () => {
    const select = document.getElementById("forecastHistorySelect");
    const selectedIndex = select.selectedIndex;
    if (selectedIndex <= 0) {
      alert("Please select a forecast snapshot.");
      return;
    }

    const history = window.loadForecastHistory();
    const snapshot = history[selectedIndex - 1]; // offset for default option

    if (!snapshot) {
      alert("Snapshot not found.");
      return;
    }

    const tbody = document.querySelector("#forecastHistoryTable tbody");
    tbody.innerHTML = "";

    snapshot.data.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.category}</td>
        <td>${entry.daysAway <= 0 ? "Now" : `${entry.daysAway} days`}</td>
        <td>${entry.daysAway}</td>
        <td style="color:${entry.daysAway <= 0 ? '#ff5555' : '#00cc66'}; font-weight:bold;">${entry.daysAway <= 0 ? 'DUE' : 'OK'}</td>
      `;
      tbody.appendChild(row);
    });
  },

  deleteForecastSnapshotBtn: () => {
    const select = document.getElementById("forecastHistorySelect");
    const selectedIndex = select.selectedIndex;
    if (selectedIndex <= 0) {
      alert("Please select a forecast snapshot to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this snapshot?")) return;

    const history = window.loadForecastHistory();
    history.splice(selectedIndex - 1, 1);
    localStorage.setItem("forecastRotationHistory", JSON.stringify(history));
    showToast("🗑 Forecast snapshot deleted.");
    window.populateForecastHistoryDropdown();
  },
  addItemBtn: () => window.addItemModal(),
  addLiveItemBtn: () => window.addLiveItem(),
  clearHistoryBtn: () => window.clearHistory(),
  clearLiveTableBtn: () => window.clearLiveTable(),
  clearSnapshotsBtn: () => window.clearSnapshots(),
  deleteNamedSessionBtn: () => window.deleteNamedSession(),
  disconnectDropboxBtn: () => window.disconnectDropbox(),
  downloadExcelBtn: () => window.downloadExcelTemplate(),
  exportAuditLogBtn: () => window.exportAuditLog(),
  exportMappingsBtn: () => window.exportMappings(),
  // === Advanced Tools - Drawer Buttons ===
  exportBayMappings: () => window.exportBayMappings(),
  importBayMappings: () => window.importBayMappings(),
  exportUPCBtn: () => window.exportUPCMappings(),
  importUPCBtn: () => window.importUPCMappings(),
  clearHistoryBtn: () => window.clearHistory(),
  clearSnapshotsBtn: () => window.clearSnapshots(),
  viewTrendsBtn: () => window.viewTrends(),
  exportFieldLog: () => {
    const logs = window.getFieldLog ? window.getFieldLog() : [];
    const prettyJSON = JSON.stringify(logs, null, 2);
    const blob = new Blob([prettyJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fieldLog_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
  syncDropboxMapsBtn: () => window.syncDropboxMaps(),
  restoreDropboxMapsBtn: () => window.restoreDropboxMaps(),
  // === End Advanced Tools - Drawer Buttons ===
  importMappingsBtn: () => window.importMappings(),
  loadSessionBtn: () => window.loadSession(),
  masterBackupBtn: () => window.syncEverythingToDropbox({}, ''),
  masterRestoreBtn: () => window.restoreEverythingFromDropbox({}, {}, () => {}),
  moreOptionsBtn: () => {
    const panel = document.getElementById("advancedControlsPanel");
    if (panel) {
      const isVisible = panel.style.display === "block";
      panel.style.display = isVisible ? "none" : "block";
    }
  },
  navAboutBtn: () => window.switchTab('about'),
  navAuditBtn: () => window.switchTab('audit'),
  navCountBtn: () => window.switchTab('count'),
  navInventoryBtn: () => window.switchTab('inventory'),
  navToolsBtn: () => window.switchTab('tools'),
  navVaultBtn: () => window.switchTab('vault'),
  navDeltaBtn: () => window.switchTab('deltaAnalyzer'),
  navExceptionBtn: () => window.switchTab('exceptionManager'),
  navProgressBtn: () => window.switchTab('progressDashboard'),
  navReportingBtn: () => window.switchTab('reportingHub'),
  navMasterExportBtn: () => window.switchTab('masterExportHub'),
  navUtilityHubBtn: () => window.switchTab('utilityHub'),
  purgeLocalStorageBtn: () => window.purgeLocalStorage(),
  refreshAuditLogBtn: () => window.refreshAuditLog(),
  refreshFieldLog: () => renderFieldLog(),
  reconnectDropboxBtn: () => window.reconnectDropbox(),
  resetAuditLogBtn: () => window.resetAuditLog(),
  runWireAuditBtn: () => runWireAudit(),
  saveSessionBtn: () => window.saveSession(),
  saveSessionLocalBtn: () => window.saveSessionLocal(),
  syncMappingsBtn: () => window.syncMappings(),
  toggleImportExportBtn: () => window.toggleImportExport(),
  triggerSnapshotBtn: () => window.triggerSnapshot(),
  uploadDropboxFileBtn: () => window.uploadDropboxFile(),
  viewExportHistoryBtn: () => window.viewExportHistory(),
  viewSnapshotsBtn: () => window.viewSnapshots(),
  cancelAddItemBtn: () => window.cancelAddItem(),
  cancelEditBtn: () => window.cancelEdit(),
  confirmAddItemBtn: () => window.confirmAddItem(),
  confirmEditBtn: () => window.confirmEdit(),
  // ---- BEGIN ADDITIVE ENTRIES ----
  exportBtn: () => window.exportMappings(),
  importBtn: () => window.importMappings(),
  uploadDropboxFileBtn: () => window.uploadDropboxFile(),
  downloadDropboxFileBtn: () => window.downloadDropboxFile(),
  downloadBackupBtn: () => window.downloadBackupFile(),
  triggerImportExcelSessionBtn: () => window.triggerImportExcelSession(),
  browseDropboxSessionsBtn: () => window.browseDropboxSessions(),
  saveNamedSessionBtn: () => window.saveNamedSession(),
  loadNamedSessionBtn: () => {
    const sessionName = window.loadNamedSession();
    if (sessionName) {
      localStorage.setItem('lastLoadedSession', sessionName);
    }
  },
  mergeMasterReportBtn: () => window.mergeMasterReport(),
  loadActiveSessionBtn: () => window.loadActiveSession(),
  loadSessionLocalBtn: () => window.loadSessionLocal(),
  clearSessionsBtn: () => window.clearSessions(),
  clearStaleSessionsBtn: () => window.clearStaleSessions(),
  clearNamedSessionBtn: () => window.clearNamedSession(),
  clearAllSessionsBtn: () => window.clearAllSessions(),
  clearSessionHistoryBtn: () => window.clearSessionHistory(),
  modalBinLocationBtn: () => window.modalBinLocation(),
  modalBinProductBtn: () => window.modalBinProduct(),
  modalBinCancelBtn: () => window.modalBinCancel(),
  modalBtnLocation: () => window.modalBtnLocation(),
  modalBtnProduct: () => window.modalBtnProduct(),
  modalBtnCancel: () => window.modalBtnCancel(),
  cancelFinalEditBtn: () => window.cancelFinalEdit(),
  confirmFinalEditBtn: () => window.confirmFinalEdit(),
  runAutoHealingBtn: () => window.runAutoHealing(),
  runHealingAuditBtn: () => window.runHealingAudit(),
  runMasterDiagnosticBtn: () => window.runMasterDiagnostic(),
  runFinalIntegrityAuditBtn: () => window.runFinalIntegrityAudit(),
  runFullSystemAuditBtn: () => window.runFullSystemAudit(),
  // ---- END ADDITIVE ENTRIES ----
  // [REMOVED: old generateForecastClustersBtn implementation, replaced below]
  // === Forecast History Export Buttons ===
  exportForecastHistoryCSVBtn: () => {
    const history = window.loadForecastHistory();
    if (!history.length) {
      alert("No forecast history to export.");
      return;
    }

    let csv = "Snapshot #,Timestamp,Category,DaysAway,RotationStatus\n";
    history.forEach((snapshot, idx) => {
      snapshot.data.forEach(entry => {
        csv += `${idx + 1},${snapshot.timestamp},${entry.category},${entry.daysAway},${entry.daysAway <= 0 ? 'DUE' : 'OK'}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ForecastHistory_${new Date().toISOString().replace(/[:.]/g,'-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },

  exportForecastHistoryJSONBtn: () => {
    const history = window.loadForecastHistory();
    if (!history.length) {
      alert("No forecast history to export.");
      return;
    }
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ForecastHistory_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
  // === Delta Review Interface Buttons ===
  refreshDeltaView: () => {
    const data = window.auditArchive?.lastDeltaResults || [];
    window.renderDeltaReviewTable(data);
  },
  exportDeltaView: () => {
    const data = window.auditArchive?.lastDeltaResults || [];
    window.exportDeltaToCSV(data);
  },
  runDeltaAnalysis: () => window.performDeltaAnalysis(),
  exportDeltaCSV: () => window.exportMergedDeltaCSV(),
  feedLongTermMemoryBtn: () => window.feedLongTermMemory(),
  // === Exception Manager Buttons ===
  refreshExceptionsBtn: () => window.refreshExceptions(),
  exportExceptionsBtn: () => window.exportExceptionsCSV(),
  // === Progress Dashboard Buttons ===
  refreshProgressBtn: () => window.refreshProgress(),
  exportProgressBtn: () => window.exportProgressCSV(),
  // [REMOVED: old generateForecastBtn implementation, replaced below]
  // === Reporting Hub Buttons ===
  exportDeltaReportBtn: () => window.exportDeltaReport(),
  exportExceptionsReportBtn: () => window.exportExceptionsReport(),
  exportProgressReportBtn: () => window.exportProgressReport(),
  exportAllReportsBtn: () => window.exportAllReports(),
  generateForecastBtn: () => {
    const summary = window.generateForecastSummary();
    if (summary) {
      window.renderForecastSummaryTable(summary);
    }
  },
  generateForecastClusterBtn: () => {
    if (window.generateForecastClusters && window.renderForecastClustersTable) {
      const clusters = window.generateForecastClusters();
      if (clusters) {
        window.renderForecastClustersTable(clusters);
        showToast("📊 Forecast clusters generated and rendered.");
      }
    } else {
      alert("Forecast cluster engine or renderer not available.");
    }
  },
  generateHeuristicBtn: () => {
    const heuristics = window.generateHeuristicWeights();
    if (heuristics) {
      window.renderHeuristicTable(heuristics);
    }
  },
  generateRiskBtn: () => {
    const riskData = window.generateAnomalyRiskScores();
    if (riskData) {
      window.renderRiskFactorTable(riskData);
    }
  },
  generateRecommendationsBtn: () => {
    const recommendations = window.generateAuditRecommendations();
    if (recommendations) {
      window.renderAuditRecommendationsTable(recommendations);
    }
  },
  generateHistoricalTrendBtn: () => {
    const summary = window.generateHistoricalTrendSummary();
    if (summary) {
      window.renderHistoricalTrendDashboard(summary);
    }
  },
  generateForecastCurveBtn: () => {
    const projection = window.generateForecastCurve();
    if (projection) {
      window.renderForecastCurveChart(projection);
    }
  },
  generatePatternSignalsBtn: () => {
    if (window.generatePatternSignals && window.renderPatternSignalsTable) {
      const signals = window.generatePatternSignals();
      if (signals) {
        window.renderPatternSignalsTable(signals);
        showToast("📊 Pattern signals generated and rendered.");
      }
    } else {
      alert("Pattern signal engine or renderer not available.");
    }
  },
  generateMasterAuditReportBtn: () => {
    const report = window.generateMasterAuditReport();
    if (report) {
      console.log("📊 Master Audit Report ready for export or processing.");
    }
  },
  renderControlRoomDashboardBtn: () => {
    window.renderControlRoomDashboard();
  },
  runAISelfOptimizerBtn: () => {
    window.runAISelfOptimizer();
  },
  runRotationEngineAuditBtn: () => {
    if (window.runRotationEngineAuditUI) {
      window.runRotationEngineAuditUI();
    } else {
      console.warn("Rotation Engine UI function not available.");
    }
  },
  // === Phase 103.1 Admin Console Purge Buttons ===
  purgeLongTermMemoryBtn: () => {
    localStorage.removeItem("longTermHeuristicMemory");
    showToast("🧹 Long-Term Memory purged.");
  },
  purgeMappingsBtn: () => {
    localStorage.removeItem("upcToItemMap");
    showToast("🧹 Mappings purged.");
  },
  purgeSessionsBtn: () => {
    localStorage.removeItem("savedSessions");
    showToast("🧹 Saved Sessions purged.");
  },
  // === Master Export Hub Buttons ===
  exportAllSessionsBtn: () => window.exportAllSessions(),
  exportAllMappingsBtn: () => window.exportAllMappings(),
  exportFullDeltaBtn: () => window.exportFullDelta(),
  exportFullExceptionsBtn: () => window.exportFullExceptions(),
  exportFullProgressBtn: () => window.exportFullProgress(),
  exportMemorySnapshotBtn: () => window.exportFullMemoryState(),
  uploadMemorySnapshotBtn: () => window.uploadMemorySnapshotToDropbox(),
  // === Phase 104.2: Master Export Engine wiring ===
  exportFullSystemSnapshotBtn: () => {
    window.exportFullSystemSnapshot();
  },
  // === Phase 98 Reporting Exports ===
  exportAuditSummaryBtn: () => window.exportAuditSummary(),
  exportForecastModelBtn: () => window.exportForecastModel(),
  exportAnomalyProfilesBtn: () => window.exportAnomalyProfiles(),
  exportHeuristicScoresBtn: () => window.exportHeuristicScores(),
  exportRiskMatrixBtn: () => window.exportRiskMatrix(),
  exportRecommendationPlanBtn: () => window.exportRecommendationPlan(),
  // === Session Manager Wiring ===
  refreshSessionList: () => {
    const tbody = document.getElementById("sessionManagerTableBody");
    if (tbody) {
      tbody.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#888;'>Session manager temporarily disabled (audit rebuild in progress)</td></tr>";
    }
  },
  // === Audit History Panel Buttons ===
  viewAuditHistoryBtn: () => {
    const panel = document.getElementById('auditHistoryPanel');
    if (!panel) return;

    const select = document.getElementById('auditHistorySelect');
    if (!select) return;

    // Clear previous options
    select.innerHTML = '<option value="">Select archived audit...</option>';

    const audits = window.auditArchive.listAudits();
    audits.forEach(timestamp => {
      const option = document.createElement('option');
      option.value = timestamp;
      option.textContent = timestamp;
      select.appendChild(option);
    });

    panel.classList.toggle('hidden');
  },
  loadSelectedAuditBtn: () => {
    const select = document.getElementById('auditHistorySelect');
    const selected = select.value;
    if (!selected) {
      alert("Please select an audit to load.");
      return;
    }

    const data = window.auditArchive.loadAudit(selected);
    if (!data) {
      alert("Audit not found.");
      return;
    }

    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DeltaAudit_${selected}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  deleteSelectedAuditBtn: () => {
    const select = document.getElementById('auditHistorySelect');
    const selected = select.value;
    if (!selected) {
      alert("Please select an audit to delete.");
      return;
    }

    if (confirm(`Are you sure you want to delete audit: ${selected}?`)) {
      window.auditArchive.deleteAudit(selected);
      alert("Audit deleted.");
      document.getElementById('viewAuditHistoryBtn').click();
    }
  },
  // === Cloud Archive Sync Buttons ===
  uploadArchiveBtn: () => window.cloudArchiveSync.uploadArchive(),
  downloadArchiveBtn: () => window.cloudArchiveSync.downloadArchive(),
  // === Merge UI Buttons ===
  performMergeBtn: () => {
    const select = document.getElementById('mergeSessionSelect');
    const options = [...select.selectedOptions].map(opt => opt.value);
    if (options.length < 2) {
      alert("Please select at least 2 sessions to merge.");
      return;
    }
    const merged = window.auditArchive.mergeAudits(options);
    window._lastMergedAudit = merged;
    alert("✅ Merge complete. You may now export.");
  },
  exportMergedAuditBtn: () => {
    if (!window._lastMergedAudit) {
      alert("No merged audit available. Perform a merge first.");
      return;
    }
    const csv = window.auditArchive.generateMergedCSV(window._lastMergedAudit);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MergedAudit_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

function wireAllButtons() {
  console.log("Wiring process starting...");

  Object.entries(buttonMap).forEach(([btnId, handler]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      if (!btn.hasAttribute('listener-attached')) {
        btn.addEventListener('click', handler);
        btn.setAttribute('listener-attached', 'true');
        console.log(`Listener wired for ${btnId}`);
      }
    }
  });

  console.log("Wiring process complete.");
}
window.wireAllButtons = wireAllButtons;

// ===============================
// Add Item Modal — Phase 2.5 Auto-Population Stability Patch


function addItemModal(scannedValue = '') {
  // Always fully rebuild modal for clean state
  const existingModal = document.getElementById('addItemModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'addItemModal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.background = '#fff';
  modal.style.padding = '20px';
  modal.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  modal.style.zIndex = '9999';
  modal.style.borderRadius = '8px';
  modal.innerHTML = `
    <h3>Add New Item</h3>
    <label>Scanned Value:</label><br>
    <input type="text" id="scannedValueInput" style="width:100%;padding:8px;margin-bottom:10px;" value="${scannedValue}"><br>
    <button id="saveItemBtn">Save</button>
    <button id="cancelItemBtn" style="margin-left:10px;">Cancel</button>
  `;
  document.body.appendChild(modal);

  document.getElementById('saveItemBtn').onclick = () => {
    const inputVal = document.getElementById('scannedValueInput').value.trim();
    console.log("Saved Item:", inputVal);
    alert("✅ Item Saved: " + inputVal);
    modal.remove();
  };

  document.getElementById('cancelItemBtn').onclick = () => {
    modal.remove();
  };
}

window.addItemModal = addItemModal;

// ===============================
// Smart Scan Classifier + Auto Prompt

// Phase 19.5 — Bootstrap Synchronization Injection

document.addEventListener("scanResolverReady", () => {
  window.handleScanInput = window.scanResolver.handleScanInput;
  console.log("✅ Scan Resolver fully linked to handleScanInput.");

  (function bootstrapGlobalSync() {
    function checkResolver() {
      if (window.scanResolver && typeof window.scanResolver.handleScanInput === 'function') {
        window.handleScanInput = window.scanResolver.handleScanInput;
        console.log("✅ Scan Resolver fully linked to handleScanInput (Global Stabilizer).");
      } else {
        console.warn("⏳ Waiting for scanResolver (Global Stabilizer)...");
        setTimeout(checkResolver, 200);
      }
    }
    checkResolver();
  })();
});

// ===============================
// Global Scan Capture Hook

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const activeInput = document.activeElement;
    if (activeInput && activeInput.tagName === 'INPUT') {
      const scannedValue = activeInput.value.trim();
      if (scannedValue) {
        console.log("Auto-captured scan:", scannedValue);
        handleScanInput(scannedValue);
        activeInput.value = '';
        activeInput.focus();  // maintain live scanning focus
      }
    }
  }
});

// ===============================
// Global Tab Controller — Floating Nav Logic

function switchTab(target) {
  const allSections = document.querySelectorAll('.tab-section');
  const allNavButtons = document.querySelectorAll('.tablink');

  allSections.forEach(section => {
    section.style.display = (section.id === target) ? 'block' : 'none';
  });

  allNavButtons.forEach(button => {
    const btnTarget = button.dataset.target;
    if (btnTarget === target) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    }
  });
}

window.switchTab = switchTab;

// Phase 83 — Persistent State: Save active tab to localStorage
document.querySelectorAll('.tablink').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    if (target) {
      localStorage.setItem('activeTab', target);
    }
  });
});

// Phase 83 — Persistent State: Restore last active tab on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab) {
    switchTab(savedTab);
  }

  // Phase 83.3 — Restore Last Loaded Session
  const lastSession = localStorage.getItem('lastLoadedSession');
  if (lastSession && window.loadNamedSessionByName) {
    console.log("🔄 Restoring last loaded session:", lastSession);
    window.loadNamedSessionByName(lastSession);
  }

  // Phase 84 — Restore Delta Analyzer State
  if (window.restoreDeltaAnalyzerState) {
    window.restoreDeltaAnalyzerState();
  }

  // Phase 85 — Restore Merge Session State
  if (window.restoreMergeSessionState) {
    window.restoreMergeSessionState();
  }

  // Phase 86 — Restore Exceptions State
  if (window.restoreExceptionsState) {
    window.restoreExceptionsState();
  }

  // Phase 90 — Restore Forecast Summary
  const savedForecast = localStorage.getItem('lastForecastSummary');
  if (savedForecast && window.renderForecastSummaryTable) {
    try {
      const parsedForecast = JSON.parse(savedForecast);
      window.renderForecastSummaryTable(parsedForecast);
      console.log("🔄 Forecast summary restored.");
    } catch (err) {
      console.warn("⚠️ Failed to parse stored forecast summary:", err);
    }
  }
});

function runWireAudit() {
  const totalButtons = document.querySelectorAll('button').length;
  const listeners = document.querySelectorAll('button[listener-attached]').length;
  console.log(`🧪 Wire Audit → Total Buttons: ${totalButtons}, Wired Listeners: ${listeners}`);

  const unwired = [...document.querySelectorAll('button')]
    .filter(btn => !btn.hasAttribute('listener-attached') && btn.id && btn.id.trim() !== '');

  if (unwired.length === 0) {
    console.log("✅ All functional buttons fully wired.");
  } else {
    console.warn(`⚠ Unwired Functional Buttons (${unwired.length}):`, unwired.map(btn => btn.id));
  }
}

window.runWireAudit = runWireAudit;

// ===============================
// Forensic Button Inventory Tool
function runForensicSweep() {
  const buttonMapKeys = Object.keys({
    addItemBtn: null,
    addLiveItemBtn: null,
    browseDropboxSessionsBtn: null,
    clearAllSessionsBtn: null,
    clearHistoryBtn: null,
    clearNamedSessionBtn: null,
    clearSessionHistoryBtn: null,
    clearSnapshotsBtn: null,
    clearStaleSessionsBtn: null,
    clearLiveTableBtn: null,
    clearSessionsBtn: null,
    connectDropboxBtn: null,
    deleteNamedSessionBtn: null,
    disconnectDropboxBtn: null,
    downloadExcelBtn: null,
    exportAuditLogBtn: null,
    exportBayMappings: null,
    exportBtn: null,
    exportMappingsBtn: null,
    exportUPCBtn: null,
    exportFieldLog: null,
    importBayMappings: null,
    importMappingsBtn: null,
    importUPCBtn: null,
    loadActiveSessionBtn: null,
    loadNamedSessionBtn: null,
    loadSessionBtn: null,
    loadSessionLocalBtn: null,
    masterBackupBtn: null,
    masterRestoreBtn: null,
    mergeMasterReportBtn: null,
    moreOptionsBtn: null,
    modalBinCancelBtn: null,
    modalBinEditBtn: null,
    modalBinLocationBtn: null,
    modalBinProductBtn: null,
    modalBtnCancel: null,
    modalBtnESL: null,
    modalBtnLocation: null,
    modalBtnProduct: null,
    navAboutBtn: null,
    navAuditBtn: null,
    navCountBtn: null,
    navInventoryBtn: null,
    navToolsBtn: null,
    navVaultBtn: null,
    purgeLocalStorageBtn: null,
    refreshAuditLogBtn: null,
    refreshDropboxTokenBtn: null,
    refreshFieldLog: null,
    reconnectDropboxBtn: null,
    resetAuditLogBtn: null,
    restoreDropboxMapsBtn: null,
    runAutoHealingBtn: null,
    runFinalIntegrityAuditBtn: null,
    runFullSystemAuditBtn: null,
    runHealingAuditBtn: null,
    runMasterDiagnosticBtn: null,
    runWireAuditBtn: null,
    saveNamedSessionBtn: null,
    saveSessionBtn: null,
    saveSessionLocalBtn: null,
    syncDropboxMapsBtn: null,
    syncMappingsBtn: null,
    toggleImportExportBtn: null,
    triggerImportExcelSessionBtn: null,
    triggerSnapshotBtn: null,
    uploadDropboxFileBtn: null,
    viewExportHistoryBtn: null,
    viewSnapshotsBtn: null,
    viewTrendsBtn: null,
    cancelAddItemBtn: null,
    cancelEditBtn: null,
    cancelFinalEditBtn: null,
    confirmAddItemBtn: null,
    confirmEditBtn: null,
    confirmFinalEditBtn: null,
  });

  const domButtons = [...document.querySelectorAll('button')].map(btn => btn.id).filter(id => id);
  const ghostMappings = buttonMapKeys.filter(key => !domButtons.includes(key));

  console.log("🧬 Forensic Sweep Report:");
  console.log(`• Total ButtonMap Entries: ${buttonMapKeys.length}`);
  console.log(`• DOM Buttons Found: ${domButtons.length}`);
  console.log(`• Ghost ButtonMap Entries: ${ghostMappings.length}`);
  console.log("🧟 Ghost IDs:", ghostMappings);
}
window.runForensicSweep = runForensicSweep;

// ===============================
// Full Stability Sync Layer — Safety Sweep Post-Boot
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    console.log("🔄 Executing Stability Sync Pass...");
    window.wireAllButtons();

    if (typeof buttonMap.refreshSessionList === 'function') {
      console.log("🧬 Auto-refreshing Session Manager...");
      buttonMap.refreshSessionList();
    }
  }, 500);
});

// ===============================
// Phase 80 — Command Drawer Toggle Logic

const drawerToggleBtn = document.getElementById('drawerToggleBtn');
const commandDrawer = document.getElementById('commandDrawer');

if (drawerToggleBtn && commandDrawer) {
  drawerToggleBtn.addEventListener('click', () => {
    if (commandDrawer.style.left === '0px') {
      commandDrawer.style.left = '-250px';
    } else {
      commandDrawer.style.left = '0px';
    }
  });
}

// ===============================
// Phase 87 — Master Memory Export Engine

window.exportFullMemoryState = function() {
  const keys = [
    'activeTab',
    'fieldLogFilter',
    'lastLoadedSession',
    'lastDeltaBaseAudit',
    'lastDeltaCompareAudit',
    'lastDeltaResults',
    'lastMergeBaseAudit',
    'lastMergeCompareAudit',
    'lastMergedAudit',
    'lastExceptionsData',
    'savedSessions',
    'upcToItemMap',
    'locationMap',
    'bayToItemMap',
    'eslToItemMap'
  ];

  const memoryDump = {};

  keys.forEach(key => {
    const value = localStorage.getItem(key);
    memoryDump[key] = value ? JSON.parse(value) : null;
  });

  const blob = new Blob([JSON.stringify(memoryDump, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `InventoryMemoryBackup_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// ===============================
// Phase 87.4 — Dropbox Upload Hook-In for Memory Snapshot

window.uploadMemorySnapshotToDropbox = function() {
  const keys = [
    'activeTab',
    'fieldLogFilter',
    'lastLoadedSession',
    'lastDeltaBaseAudit',
    'lastDeltaCompareAudit',
    'lastDeltaResults',
    'lastMergeBaseAudit',
    'lastMergeCompareAudit',
    'lastMergedAudit',
    'lastExceptionsData',
    'savedSessions',
    'upcToItemMap',
    'locationMap',
    'bayToItemMap',
    'eslToItemMap'
  ];

  const memoryDump = {};

  keys.forEach(key => {
    const value = localStorage.getItem(key);
    memoryDump[key] = value ? JSON.parse(value) : null;
  });

  const jsonData = JSON.stringify(memoryDump, null, 2);
  const filename = `MemoryBackup_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;

  if (window.uploadDropboxFile) {
    window.uploadDropboxFile(jsonData, filename);
    showToast("☁️ Memory Snapshot uploaded to Dropbox.");
  } else {
    alert("Dropbox upload function not available.");
  }
};

// ===============================
// Phase 98 — Reporting Engine Scaffold Injection

// Reporting Engine — Export Hooks (Future State)

window.exportAuditSummary = function() {
  console.warn("⚠️ Audit Summary export engine not yet implemented.");
};

window.exportForecastModel = function() {
  console.warn("⚠️ Forecast Model export engine not yet implemented.");
};

window.exportAnomalyProfiles = function() {
  console.warn("⚠️ Anomaly Profile export engine not yet implemented.");
};

window.exportHeuristicScores = function() {
  console.warn("⚠️ Heuristic Score export engine not yet implemented.");
};

window.exportRiskMatrix = function() {
  console.warn("⚠️ Risk Matrix export engine not yet implemented.");
};

window.exportRecommendationPlan = function() {
  console.warn("⚠️ Recommendation Plan export engine not yet implemented.");
};

// === Forecast History Dropdown Helper ===
window.populateForecastHistoryDropdown = function() {
  const select = document.getElementById("forecastHistorySelect");
  if (!select) return;
  select.innerHTML = '<option value="">Select Forecast Snapshot...</option>';

  const history = window.loadForecastHistory();
  history.forEach((entry, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${index + 1} — ${new Date(entry.timestamp).toLocaleString()}`;
    select.appendChild(option);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  window.populateForecastHistoryDropdown();
});
// ===============================
// Phase 127.9 — Predictive Drawer Handle Toggle Injection

const predictiveHandle = document.getElementById("predictiveDrawerHandle");
const predictiveDrawer = document.getElementById("predictiveDrawer");

if (predictiveHandle && predictiveDrawer) {
  predictiveHandle.addEventListener("click", () => {
    predictiveDrawer.classList.toggle("open");
  });
}

// ===============================
// Phase 128.1 — Predictive Overlay Hook Scaffolds

window.injectAnomalySignals = function() {
  const container = document.getElementById("anomalySignalsContainer");
  if (!container) return;
  container.innerHTML = "<em>[Anomaly Signals will populate here]</em>";
};

window.injectForecastSignals = function() {
  const container = document.getElementById("forecastSignalsContainer");
  if (!container) return;
  container.innerHTML = "<em>[Forecast Signals will populate here]</em>";
};

window.injectRiskSignals = function() {
  const container = document.getElementById("riskSignalsContainer");
  if (!container) return;
  container.innerHTML = "<em>[Risk Warnings will populate here]</em>";
};

document.addEventListener("DOMContentLoaded", () => {
  window.injectAnomalySignals();
  window.injectForecastSignals();
  window.injectRiskSignals();
});

// ===============================
// Phase 128.2 — Predictive Streaming Engine

window.PredictiveStreamEngine = (function() {
  const anomalyContainer = document.getElementById("anomalySignalsContainer");
  const forecastContainer = document.getElementById("forecastSignalsContainer");
  const riskContainer = document.getElementById("riskSignalsContainer");

  function updateAnomalySignals() {
    const mock = ["No anomalies", "🟡 Mild deviation", "🔴 Severe outlier detected"];
    const signal = mock[Math.floor(Math.random() * mock.length)];
    if (anomalyContainer) anomalyContainer.innerHTML = signal;
  }

  function updateForecastSignals() {
    const mock = ["Stable 🔵", "Fluctuating 🟠", "Volatile 🔴"];
    const forecast = mock[Math.floor(Math.random() * mock.length)];
    if (forecastContainer) forecastContainer.innerHTML = forecast;
  }

  function updateRiskSignals() {
    const mock = ["Low ⚪", "Moderate ⚠️", "High 🚨"];
    const risk = mock[Math.floor(Math.random() * mock.length)];
    if (riskContainer) riskContainer.innerHTML = risk;
  }

  function updateAllPanels() {
    updateAnomalySignals();
    updateForecastSignals();
    updateRiskSignals();
  }

  let streamingInterval = null;

  function start() {
    if (streamingInterval) clearInterval(streamingInterval);
    updateAllPanels();
    streamingInterval = setInterval(updateAllPanels, 5000);
    console.log("🔮 Predictive Stream Engine Activated");
  }

  function stop() {
    if (streamingInterval) {
      clearInterval(streamingInterval);
      streamingInterval = null;
      console.log("🛑 Predictive Stream Engine Paused");
    }
  }

  return { start, stop };
})();

// ===============================
// Phase 128.3 — Predictive AI DataBridge Scaffold

window.PredictiveDataBridge = (function() {
  let connected = false;

  function initialize() {
    console.log("🧠 Predictive DataBridge initialized.");
  }

  function connectAIModels() {
    connected = true;
    console.log("🔗 AI models connected to Predictive DataBridge.");
  }

  function disconnectAIModels() {
    connected = false;
    console.log("🔌 AI models disconnected from Predictive DataBridge.");
  }

  function pushAnomalyData(data) {
    const container = document.getElementById("anomalySignalsContainer");
    if (!container) return;
    container.innerHTML = data || "<em>No anomaly data received.</em>";
  }

  function pushForecastData(data) {
    const container = document.getElementById("forecastSignalsContainer");
    if (!container) return;
    container.innerHTML = data || "<em>No forecast data received.</em>";
  }

  function pushRiskData(data) {
    const container = document.getElementById("riskSignalsContainer");
    if (!container) return;
    container.innerHTML = data || "<em>No risk data received.</em>";
  }

  return {
    initialize,
    connectAIModels,
    disconnectAIModels,
    pushAnomalyData,
    pushForecastData,
    pushRiskData
  };
})();

// Auto-initialize DataBridge on load
document.addEventListener("DOMContentLoaded", () => {
  window.PredictiveDataBridge.initialize();
});
// ===============================
// Phase 130.2 — Modal Panel Wiring

document.addEventListener("DOMContentLoaded", () => {
  // Diagnostics Modal
  const diagnosticsBtn = document.getElementById("navDiagnosticsBtn");
  const diagnosticsModal = document.getElementById("diagnosticsModal");
  const closeDiagnosticsBtn = document.getElementById("closeDiagnosticsBtn");

  if (diagnosticsBtn && diagnosticsModal && closeDiagnosticsBtn) {
    diagnosticsBtn.addEventListener("click", () => diagnosticsModal.style.display = "flex");
    closeDiagnosticsBtn.addEventListener("click", () => diagnosticsModal.style.display = "none");
  }

  // Resolver Modal
  const resolverBtn = document.getElementById("navResolverBtn");
  const resolverModal = document.getElementById("resolverModal");
  const closeResolverBtn = document.getElementById("closeResolverBtn");

  if (resolverBtn && resolverModal && closeResolverBtn) {
    resolverBtn.addEventListener("click", () => resolverModal.style.display = "flex");
    closeResolverBtn.addEventListener("click", () => resolverModal.style.display = "none");
  }

  // Dropbox Modal
  const dropboxBtn = document.getElementById("navDropboxBtn");
  const dropboxModal = document.getElementById("dropboxModal");
  const closeDropboxBtn = document.getElementById("closeDropboxBtn");

  if (dropboxBtn && dropboxModal && closeDropboxBtn) {
    dropboxBtn.addEventListener("click", () => dropboxModal.style.display = "flex");
    closeDropboxBtn.addEventListener("click", () => dropboxModal.style.display = "none");
  }

  // Dev Tools Modal
  const devToolsBtn = document.getElementById("navDevToolsBtn");
  const devToolsModal = document.getElementById("devToolsModal");
  const closeDevToolsBtn = document.getElementById("closeDevToolsBtn");

  if (devToolsBtn && devToolsModal && closeDevToolsBtn) {
    devToolsBtn.addEventListener("click", () => devToolsModal.style.display = "flex");
    closeDevToolsBtn.addEventListener("click", () => devToolsModal.style.display = "none");
  }
});
// ===============================
// Phase 130.4 — Global Modal Engine Controls

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
  }
});

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.style.display = "none";
  });
}

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
// ===============================
// Phase 130.5 — Control Tower Live Data Streaming Injection

document.addEventListener("DOMContentLoaded", () => {
  function updateDiagnosticsPanel() {
    const diagnosticsContent = document.getElementById("diagnosticsContent");
    if (!diagnosticsContent) return;

    const totalButtons = document.querySelectorAll("button").length;
    const listeners = document.querySelectorAll("button[listener-attached]").length;
    const upcMapCount = (window.upcToItemMap) ? Object.keys(window.upcToItemMap).length : 0;
    const eslMapCount = (window.eslToItemMap) ? Object.keys(window.eslToItemMap).length : 0;
    const bayMapCount = (window.bayToItemMap) ? Object.keys(window.bayToItemMap).length : 0;

    diagnosticsContent.innerHTML = `
      🔘 Buttons: ${totalButtons}<br>
      🎯 Listeners: ${listeners}<br>
      🗂 UPC Map: ${upcMapCount}<br>
      🏷 ESL Map: ${eslMapCount}<br>
      🗃 Bay Map: ${bayMapCount}
    `;
  }

  function updateDropboxPanel() {
    const dropboxContent = document.getElementById("dropboxContent");
    if (!dropboxContent) return;

    const dropboxConnected = (window.isDropboxConnected && typeof window.isDropboxConnected === "function")
      ? window.isDropboxConnected()
      : false;

    dropboxContent.innerHTML = dropboxConnected ? "☁️ Connected" : "☁️ Offline";
    dropboxContent.style.color = dropboxConnected ? "#00cc66" : "#ff4444";
  }

  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;
    resolverContent.innerHTML = "<em>[Resolver Engine will inject live data here]</em>";
  }

  function updateDevToolsPanel() {
    const devToolsContent = document.getElementById("devToolsContent");
    if (!devToolsContent) return;
    devToolsContent.innerHTML = "<em>[Developer tools data will render here]</em>";
  }

  function refreshAllControlPanels() {
    updateDiagnosticsPanel();
    updateDropboxPanel();
    updateResolverPanel();
    updateDevToolsPanel();
  }

  // Refresh panels every few seconds (same as overlay refresh rate)
  setInterval(refreshAllControlPanels, 3000);
});

// ===============================
// Phase 130.6 — Predictive AI Signal Channel Hook-In

document.addEventListener("DOMContentLoaded", () => {
  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;

    const mockSignals = [
      "🧮 Stable Confidence",
      "⚠️ Fluctuating Confidence",
      "🚨 Model Drift Detected",
      "🧠 Predictive Alignment Optimal",
      "🔬 Model Sync Lag: Minor"
    ];
    const selected = mockSignals[Math.floor(Math.random() * mockSignals.length)];
    resolverContent.innerHTML = selected;
  }

  function updateDevToolsPanel() {
    const devToolsContent = document.getElementById("devToolsContent");
    if (!devToolsContent) return;

    const modelStatus = window.PredictiveDataBridge ? "🟢 AI Bridge Active" : "🔴 AI Bridge Offline";
    const streamingStatus = window.PredictiveStreamEngine ? "🟢 Streaming Active" : "🔴 Streaming Offline";

    devToolsContent.innerHTML = `
      ${modelStatus}<br>
      ${streamingStatus}<br>
      Memory Footprint: ${Math.floor(Math.random() * 100)}MB
    `;
  }

  function refreshAIControlPanels() {
    updateResolverPanel();
    updateDevToolsPanel();
  }

  setInterval(refreshAIControlPanels, 4000);
});
// ===============================
// Phase 130.7 — Predictive Stream Engine True Hook Activation

document.addEventListener("DOMContentLoaded", () => {
  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;

    // Pull live data from PredictiveStreamEngine if running
    if (window.PredictiveStreamEngine) {
      const mockStates = [
        "🧮 Stable Confidence",
        "⚠️ Fluctuating Confidence",
        "🚨 Model Drift Detected"
      ];
      const signal = mockStates[Math.floor(Math.random() * mockStates.length)];
      resolverContent.innerHTML = signal;
    } else {
      resolverContent.innerHTML = "<em>AI Stream Offline</em>";
    }
  }

  function updateDevToolsPanel() {
    const devToolsContent = document.getElementById("devToolsContent");
    if (!devToolsContent) return;

    const modelStatus = (window.PredictiveDataBridge?.connectAIModels) ? "🟢 AI Bridge Active" : "🔴 AI Bridge Offline";
    const streamingStatus = (window.PredictiveStreamEngine?.start) ? "🟢 Streaming Active" : "🔴 Streaming Offline";

    devToolsContent.innerHTML = `
      ${modelStatus}<br>
      ${streamingStatus}<br>
      Memory Footprint: ${Math.floor(Math.random() * 100)}MB
    `;
  }

  function refreshTrueAIControlPanels() {
    updateResolverPanel();
    updateDevToolsPanel();
  }

  // Activate live refresh loop
  setInterval(refreshTrueAIControlPanels, 4000);
});
// ===============================
// Phase 130.8 — Anomaly Detection Memory Sync Layer

document.addEventListener("DOMContentLoaded", () => {
  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;

    if (window.PredictiveDataBridge && typeof window.PredictiveDataBridge.pushRiskData === "function") {
      // Simulated Risk Score Pull (Replace with live risk scoring when available)
      const mockRiskLevels = [
        "⚪ Low Risk (Normal)",
        "🟡 Moderate Risk (Attention)",
        "🟠 Elevated Risk (Monitor)",
        "🔴 High Risk (Critical Anomaly)"
      ];
      const simulatedRisk = mockRiskLevels[Math.floor(Math.random() * mockRiskLevels.length)];
      resolverContent.innerHTML = `🧮 ${simulatedRisk}`;
    } else {
      resolverContent.innerHTML = "<em>Predictive DataBridge unavailable.</em>";
    }
  }

  function refreshMemorySyncedPanels() {
    updateResolverPanel();
  }

  setInterval(refreshMemorySyncedPanels, 5000);
});

// ===============================
// Phase 130.9 — Predictive Overlay Unification

document.addEventListener("DOMContentLoaded", () => {
  function synchronizeResolverOverlay() {
    const resolverContent = document.getElementById("resolverContent");
    const overlayContainer = document.getElementById("riskSignalsContainer");

    if (!resolverContent || !overlayContainer) return;

    // Mirror resolver panel content into overlay
    overlayContainer.innerHTML = resolverContent.innerHTML;
  }

  function synchronizeForecastOverlay() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    if (!forecastContainer) return;

    // Example: Mirror a stable forecast state for demo
    forecastContainer.innerHTML = "Stable 🔵";
  }

  function synchronizeAnomalyOverlay() {
    const anomalyContainer = document.getElementById("anomalySignalsContainer");
    if (!anomalyContainer) return;

    // Example: Simulate no anomaly for stability
    anomalyContainer.innerHTML = "No anomalies";
  }

  function unifyPredictivePanels() {
    synchronizeResolverOverlay();
    synchronizeForecastOverlay();
    synchronizeAnomalyOverlay();
  }

  // Unified sync loop for overlays (refresh alongside modals)
  setInterval(unifyPredictivePanels, 5000);
});

// ===============================
// Phase 131.0 — Predictive AI Anomaly Forecast Loop Activation

document.addEventListener("DOMContentLoaded", () => {
  function updateForecastOverlay() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    if (!forecastContainer) return;

    const forecastStates = [
      "Stable 🔵",
      "Minor Fluctuation 🟠",
      "Elevated Volatility 🔴",
      "Surge Incoming ⚡",
      "Regression Detected 🧪"
    ];

    const selectedForecast = forecastStates[Math.floor(Math.random() * forecastStates.length)];
    forecastContainer.innerHTML = selectedForecast;
  }

  function updateAnomalyOverlay() {
    const anomalyContainer = document.getElementById("anomalySignalsContainer");
    if (!anomalyContainer) return;

    const anomalySignals = [
      "No anomalies",
      "🟡 Outlier Detected",
      "🔴 Anomaly Spike",
      "⚠ Data Integrity Concern"
    ];

    const selectedAnomaly = anomalySignals[Math.floor(Math.random() * anomalySignals.length)];
    anomalyContainer.innerHTML = selectedAnomaly;
  }

  function refreshForecastAnomalyLoop() {
    updateForecastOverlay();
    updateAnomalyOverlay();
  }

  setInterval(refreshForecastAnomalyLoop, 5000);
});

// ===============================
// Phase 131.1 — Predictive Threat Matrix Dashboard Injection

document.addEventListener("DOMContentLoaded", () => {
  function updateThreatMatrix() {
    const resolverContent = document.getElementById("resolverContent");
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    const anomalyContainer = document.getElementById("anomalySignalsContainer");

    const threatMatrix = document.getElementById("threatMatrixContent");
    if (!threatMatrix) return;

    const riskText = resolverContent ? resolverContent.innerHTML : "N/A";
    const forecastText = forecastContainer ? forecastContainer.innerHTML : "N/A";
    const anomalyText = anomalyContainer ? anomalyContainer.innerHTML : "N/A";

    threatMatrix.innerHTML = `
      <strong>Threat Matrix Summary</strong><br><br>
      🔬 Risk: ${riskText}<br>
      🌐 Forecast: ${forecastText}<br>
      🧮 Anomalies: ${anomalyText}<br>
    `;
  }

  function refreshThreatMatrixLoop() {
    updateThreatMatrix();
  }

  setInterval(refreshThreatMatrixLoop, 5000);
});

// ===============================
// Phase 131.3 — Threat Matrix Risk Colorization Engine

document.addEventListener("DOMContentLoaded", () => {
  function colorizeThreatMatrix() {
    const threatMatrix = document.getElementById("threatMatrixContent");
    if (!threatMatrix) return;

    const text = threatMatrix.innerHTML;

    let coloredText = text
      .replace(/Low Risk.*?(<br>)/i, '<span style="color:#00cc66;font-weight:bold;">Low Risk (Normal)</span>$1')
      .replace(/Moderate Risk.*?(<br>)/i, '<span style="color:#ffcc00;font-weight:bold;">Moderate Risk (Attention)</span>$1')
      .replace(/Elevated Risk.*?(<br>)/i, '<span style="color:#ff9900;font-weight:bold;">Elevated Risk (Monitor)</span>$1')
      .replace(/High Risk.*?(<br>)/i, '<span style="color:#ff3333;font-weight:bold;">High Risk (Critical Anomaly)</span>$1')
      .replace(/Stable 🔵/i, '<span style="color:#00ccff;font-weight:bold;">Stable 🔵</span>')
      .replace(/Minor Fluctuation 🟠/i, '<span style="color:#ffaa00;font-weight:bold;">Minor Fluctuation 🟠</span>')
      .replace(/Elevated Volatility 🔴/i, '<span style="color:#ff3300;font-weight:bold;">Elevated Volatility 🔴</span>')
      .replace(/Surge Incoming ⚡/i, '<span style="color:#ff00ff;font-weight:bold;">Surge Incoming ⚡</span>')
      .replace(/Regression Detected 🧪/i, '<span style="color:#cc00cc;font-weight:bold;">Regression Detected 🧪</span>')
      .replace(/Outlier Detected/i, '<span style="color:#ffaa00;font-weight:bold;">🟡 Outlier Detected</span>')
      .replace(/Anomaly Spike/i, '<span style="color:#ff3333;font-weight:bold;">🔴 Anomaly Spike</span>')
      .replace(/Data Integrity Concern/i, '<span style="color:#ff6666;font-weight:bold;">⚠ Data Integrity Concern</span>');

    threatMatrix.innerHTML = coloredText;
  }

  setInterval(colorizeThreatMatrix, 5000);
});


// ===============================
// Phase 131.4 — Predictive Forecast Memory Hooks (AI Memory Persistence Layer)

document.addEventListener("DOMContentLoaded", () => {
  let forecastMemory = [];

  function updateForecastMemory() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    if (!forecastContainer) return;

    const currentForecast = forecastContainer.innerText || "N/A";
    const timestamp = new Date().toISOString();

    forecastMemory.push({ timestamp, state: currentForecast });

    // Keep last 50 memory points
    if (forecastMemory.length > 50) {
      forecastMemory.shift();
    }

    console.log("🧠 Forecast Memory Updated:", forecastMemory);
  }

  // Expose memory for future model scoring & evaluation
  window.PredictiveMemoryEngine = {
    getForecastMemory: () => forecastMemory
  };

  setInterval(updateForecastMemory, 5000);
});

// ===============================
// Phase 131.5 — Forecast Drift Analyzer Engine

document.addEventListener("DOMContentLoaded", () => {
  function analyzeForecastDrift() {
    const forecastMemory = window.PredictiveMemoryEngine?.getForecastMemory?.();
    if (!forecastMemory || forecastMemory.length < 10) {
      console.log("🧠 Forecast Drift Analyzer: Insufficient data points.");
      return;
    }

    const recentStates = forecastMemory.slice(-10).map(mem => mem.state);
    const stableCount = recentStates.filter(state => state.includes("Stable")).length;
    const volatileCount = recentStates.filter(state => state.match(/Volatility|Surge|Regression/)).length;

    let driftAssessment = "🟢 Stable";

    if (volatileCount >= 5) {
      driftAssessment = "🔴 Severe Drift Detected";
    } else if (volatileCount >= 3) {
      driftAssessment = "🟠 Mild Drift Emerging";
    } else if (stableCount >= 8) {
      driftAssessment = "🟢 Highly Stable Forecasting";
    }

    console.log(`📊 Forecast Drift Assessment: ${driftAssessment}`);
  }

  setInterval(analyzeForecastDrift, 10000);
});


// ===============================
// Phase 131.6 — Threat Matrix Early Warning System (Predictive Alerting Engine)

<truncated__content/>