// scanResolver.js — Modular Extraction Logic

export function handleScanInput(scanCode) {
    console.log("Resolving Scan Code:", scanCode);

    const extractedUPC = extractUPC(scanCode);
    if (extractedUPC) {
        console.log("✅ Resolved UPC:", extractedUPC);
        // Phase 43 — Item Link Trigger Injector
        if (typeof window.itemLinkStorage !== 'undefined') {
            const existingItem = window.itemLinkStorage.getMapping(extractedUPC);
            if (!existingItem) {
                console.log("🧬 No Item Link found for UPC:", extractedUPC, "Triggering Item Link Modal...");
                // Phase 45 — Only new modal logic here:
                console.log("Attempting to call Item Link Modal on UPC:", extractedUPC);
                if (window.itemLinkModalManager && typeof window.itemLinkModalManager.promptForLink === 'function') {
                    console.log("✅ Item Link Modal Manager found — opening modal...");
                    window.itemLinkModalManager.promptForLink(extractedUPC);
                } else {
                    console.warn("❌ Item Link Modal Manager still not found.");
                }
            } else {
                console.log("✅ Item Link already exists for UPC:", extractedUPC, "→", existingItem);
            }
        }
        // Only classifier logic, storage logic, and updated modal trigger logic remain.
    } else {
        console.warn("⚠️ Could not resolve scan code.");
    }
}

function extractUPC(scanCode) {
    let code = scanCode.trim();

    // Phase 25 — Classifier Feedback Loop Injection (upgraded from Phase 23)
    if (window.resolverClassifierLoader && window.resolverClassifierLoader.classifiers.length > 0) {
        const classifierResult = window.resolverClassifierLoader.runClassifiers(code);
        if (classifierResult) {
            console.log("🧬 Classifier Resolver: Dynamic resolver matched.");
            scanResult.phase = "Classifier";
            adaptiveRecord.resolvedPhase = "Classifier";
            adaptiveRecord.upc = classifierResult;
            scanResult.extracted = classifierResult;

            // Feed successful hit into evolution stats
            const matchedClassifier = window.resolverClassifierLoader.classifiers.find(cl => classifierResult.match(cl.pattern));
            if (matchedClassifier) {
                window.classifierEvolution.recordResult(matchedClassifier.name, true);
            }

            const scanSessionLog = window.scanSessionLog || [];
            const adaptiveLog = window.adaptiveScanLog || [];
            scanSessionLog.push(scanResult);
            adaptiveLog.push(adaptiveRecord);
            window.scanSessionLog = scanSessionLog;
            window.adaptiveScanLog = adaptiveLog;
            return classifierResult;
        } else {
            // No classifier matched, record miss into evolution stats
            window.resolverClassifierLoader.classifiers.forEach(cl => {
                window.classifierEvolution.recordResult(cl.name, false);
            });
        }
    }

    const scanSessionLog = window.scanSessionLog || [];
    const scanResult = { raw: scanCode, phase: null, extracted: null };

    // Initialize adaptive log container if not already present
    const adaptiveLog = window.adaptiveScanLog || [];
    const adaptiveRecord = { input: scanCode, resolvedPhase: null, upc: null, timestamp: new Date().toISOString() };

    // Phase 1: Remove known vendor prefixes (if detected)
    const vendorPrefixPattern = /^(\d{7,9})(\d{12})$/;
    const vendorMatch = code.match(vendorPrefixPattern);
    if (vendorMatch) {
        code = vendorMatch[2];
        console.log("Phase 1 Resolver: Vendor Prefix Removed:", vendorMatch[1]);
        scanResult.phase = "Phase 1";
        adaptiveRecord.resolvedPhase = "Phase 1";
    }

    // Phase 2: Handle padded zeroes in prefix (elastic normalization)
    const elasticPrefixPattern = /^0+(\d{12,13})$/;
    const elasticMatch = code.match(elasticPrefixPattern);
    if (elasticMatch) {
        code = elasticMatch[1];
        console.log("Phase 2 Resolver: Elastic Prefix Normalized");
        scanResult.phase = "Phase 2";
        adaptiveRecord.resolvedPhase = "Phase 2";
    }

    // Phase 3: Fallback — extract any clean 12 or 13 digit sequence
    const genericPattern = /(\d{12,13})/;
    const genericMatch = code.match(genericPattern);
    if (genericMatch) {
        console.log("Phase 3 Resolver: Generic Fallback Applied");
        scanResult.phase = "Phase 3";
        scanResult.extracted = genericMatch[1];
        adaptiveRecord.resolvedPhase = "Phase 3";
        adaptiveRecord.upc = genericMatch[1];
        scanSessionLog.push(scanResult);
        adaptiveLog.push(adaptiveRecord);
        window.scanSessionLog = scanSessionLog;
        window.adaptiveScanLog = adaptiveLog;
        return genericMatch[1];
    }

    console.warn("⚠️ Resolver: No phase matched.");
    scanResult.phase = "Unresolved";
    adaptiveRecord.resolvedPhase = "Unresolved";
    scanSessionLog.push(scanResult);
    adaptiveLog.push(adaptiveRecord);
    window.scanSessionLog = scanSessionLog;
    window.adaptiveScanLog = adaptiveLog;
    return null;
}

// 🌐 Global export hook for wiring bootstrap
window.scanResolver = {
    handleScanInput: handleScanInput
};

// Resolver Global Stabilizer Bootstrap
(function bootstrapResolverSync() {
    window.handleScanInput = window.scanResolver.handleScanInput;
    console.log("✅ Fully stabilized: handleScanInput linked to scanResolver.");
})();

window.adaptiveTrainer = {
    analyze: function() {
        const log = window.adaptiveScanLog || [];
        const prefixLengths = {};

        log.forEach(entry => {
            if (entry.input.length > 12) {
                const prefixLength = entry.input.length - 12;
                prefixLengths[prefixLength] = (prefixLengths[prefixLength] || 0) + 1;
            }
        });

        const summary = Object.entries(prefixLengths)
            .map(([length, count]) => ({ prefixLength: parseInt(length), count }))
            .sort((a, b) => b.count - a.count);

        console.log("🧬 Adaptive Trainer Summary:", summary);
        return summary;
    }
};

// ================================
// Phase 20.5 — Adaptive Pattern Trainer Core
// ================================

window.adaptiveTrainer = {
    analyze: function() {
        const log = window.adaptiveScanLog || [];
        const prefixLengths = {};

        log.forEach(entry => {
            if (entry.input.length > 12) {
                const prefixLength = entry.input.length - 12;
                prefixLengths[prefixLength] = (prefixLengths[prefixLength] || 0) + 1;
            }
        });

        const summary = Object.entries(prefixLengths)
            .map(([length, count]) => ({ prefixLength: parseInt(length), count }))
            .sort((a, b) => b.count - a.count);

        console.log("🧬 Adaptive Trainer Summary:", summary);
        return summary;
    }
};

// ================================
// Phase 21 — Autonomous Classifier Loader Injection
// ================================

window.resolverClassifierLoader = {
    classifiers: [],

    registerClassifier: function(name, pattern, resolverFunction) {
        this.classifiers.push({ name, pattern, resolverFunction });
        console.log(`🧬 Registered classifier: ${name}`);
    },

    runClassifiers: function(scanCode) {
        for (let classifier of this.classifiers) {
            const match = scanCode.match(classifier.pattern);
            if (match) {
                const result = classifier.resolverFunction(match);
                console.log(`✅ ${classifier.name} matched:`, result);
                return result;
            }
        }
        console.log("⚠ No classifier matched.");
        return null;
    }
};

// ================================
// Phase 22 — Classifier Injection Engine
// ================================

window.classifierInjector = {
    generateAndInject: function() {
        const log = window.adaptiveScanLog || [];
        const prefixCounts = {};

        log.forEach(entry => {
            if (entry.input.length > 12) {
                const prefixLength = entry.input.length - 12;
                prefixCounts[prefixLength] = (prefixCounts[prefixLength] || 0) + 1;
            }
        });

        const mostCommon = Object.entries(prefixCounts)
            .sort((a, b) => b[1] - a[1])[0];

        if (!mostCommon) {
            console.warn("⚠ No sufficient data for classifier injection.");
            return;
        }

        const detectedPrefixLength = parseInt(mostCommon[0]);
        const pattern = new RegExp(`^(\\d{${detectedPrefixLength}})(\\d{12})$`);

        resolverClassifierLoader.registerClassifier(
            `AutoClassifier_Prefix${detectedPrefixLength}`,
            pattern,
            function(match) {
                const vendorPrefix = match[1];
                const upc = match[2];
                console.log(`AutoClassifier extracted → Prefix: ${vendorPrefix}, UPC: ${upc}`);
                return upc;
            }
        );

        console.log(`🧬 Auto-injected classifier for prefix length ${detectedPrefixLength}.`);
    }
};

// ================================
// Phase 22.5 — Classifier Injector Bootstrap Export
// ================================
window.classifierInjector = window.classifierInjector;

// ================================
// Phase 24 — Classifier Evolution Engine
// ================================

window.classifierEvolution = {
    stats: {},
    mutations: {},

    recordResult: function(classifierName, success) {
        if (!this.stats[classifierName]) {
            this.stats[classifierName] = { hits: 0, misses: 0 };
        }
        if (!this.mutations[classifierName]) {
            this.mutations[classifierName] = { score: 0.5 }; // initial neutral confidence
        }

        if (success) {
            this.stats[classifierName].hits += 1;
            this.mutations[classifierName].score += 0.05;
        } else {
            this.stats[classifierName].misses += 1;
            this.mutations[classifierName].score -= 0.05;
        }

        // Clamp scores between 0.0 and 1.0
        if (this.mutations[classifierName].score > 1.0) {
            this.mutations[classifierName].score = 1.0;
        }
        if (this.mutations[classifierName].score < 0.0) {
            this.mutations[classifierName].score = 0.0;
        }
    },

    report: function() {
        console.log("🧬 Classifier Evolution Stats:", this.stats);
        console.log("🧪 Mutation Scoring:", this.mutations);
        return { stats: this.stats, mutations: this.mutations };
    }
};
// ================================
// Phase 27 — Mutation Scoring Engine
// ================================

window.mutationScorer = {
    scorePrefixes: function() {
        const log = window.adaptiveScanLog || [];
        const prefixStats = {};

        log.forEach(entry => {
            if (entry.input.length > 12) {
                const prefix = entry.input.slice(0, entry.input.length - 12);
                prefixStats[prefix] = (prefixStats[prefix] || 0) + 1;
            }
        });

        const scored = Object.entries(prefixStats)
            .map(([prefix, count]) => ({ prefix, count, score: count / log.length }))
            .sort((a, b) => b.score - a.score);

        console.log("🧬 Mutation Scoring Summary:", scored);
        return scored;
    }
};
// ================================
// Phase 28 — Self-Healing Adaptive Engine
// ================================

window.selfHealingEngine = {
    lastProcessedCount: 0,
    triggerThreshold: 10,  // Trigger every 10 new adaptive scans

    monitor: function() {
        const log = window.adaptiveScanLog || [];
        if (log.length - this.lastProcessedCount >= this.triggerThreshold) {
            console.log("🧬 Self-Healing Trigger Activated...");
            classifierInjector.generateAndInject();
            mutationScorer.scorePrefixes();
            this.lastProcessedCount = log.length;
        }
    },

    start: function() {
        console.log("🧬 Self-Healing Engine Online");
        setInterval(() => this.monitor(), 3000);  // Check every 3 seconds
    }
};

// Auto-activate engine on load
window.selfHealingEngine.start();

// ================================
// Phase 29 — Intelligent Pruning Engine
// ================================

window.pruningEngine = {
    pruneThreshold: 0.3,

    prune: function() {
        if (!window.resolverClassifierLoader || !window.classifierEvolution) {
            console.warn("Pruning Engine: Classifier system not initialized.");
            return;
        }

        const classifiersBefore = resolverClassifierLoader.classifiers.length;

        resolverClassifierLoader.classifiers = resolverClassifierLoader.classifiers.filter(cl => {
            const mutation = classifierEvolution.mutations[cl.name];
            if (mutation && mutation.score < this.pruneThreshold) {
                console.warn(`🧹 Pruning classifier: ${cl.name} (score ${mutation.score})`);
                return false;
            }
            return true;
        });

        const classifiersAfter = resolverClassifierLoader.classifiers.length;
        console.log(`🧬 Pruning Engine Complete — Removed ${classifiersBefore - classifiersAfter} classifiers.`);
    }
};
// ================================
// Phase 29.5 — Adaptive Sync Engine
// ================================

window.adaptiveSyncEngine = {
    export: function() {
        const state = {
            adaptiveScanLog: window.adaptiveScanLog || [],
            classifierStats: window.classifierEvolution?.stats || {},
            classifierMutations: window.classifierEvolution?.mutations || {},
            classifiers: window.resolverClassifierLoader?.classifiers || []
        };
        const exportData = JSON.stringify(state, null, 2);
        console.log("🧬 Exported Adaptive Brain:", exportData);
        return exportData;
    },

    import: function(jsonData) {
        try {
            const state = JSON.parse(jsonData);
            window.adaptiveScanLog = state.adaptiveScanLog || [];
            window.classifierEvolution = {
                stats: state.classifierStats || {},
                mutations: state.classifierMutations || {},
                report: function() {
                    console.log("🧬 Classifier Evolution Stats:", this.stats);
                    console.log("🧪 Mutation Scoring:", this.mutations);
                    return { stats: this.stats, mutations: this.mutations };
                },
                recordResult: window.classifierEvolution.recordResult
            };
            window.resolverClassifierLoader = {
                classifiers: state.classifiers || [],
                registerClassifier: resolverClassifierLoader.registerClassifier,
                runClassifiers: resolverClassifierLoader.runClassifiers
            };
            console.log("✅ Adaptive Brain Imported Successfully.");
        } catch (err) {
            console.error("❌ Failed to import adaptive brain:", err);
        }
    }
};

// ================================
// Phase 32 — Multi-Device Merge Engine
// ================================

window.adaptiveMergeEngine = {
    merge: function(incomingState) {
        if (!incomingState) {
            console.error("❌ No incoming state provided for merge.");
            return;
        }

        // Merge adaptiveScanLog
        const localLog = window.adaptiveScanLog || [];
        const mergedLog = [...localLog];

        incomingState.adaptiveScanLog.forEach(remoteEntry => {
            if (!localLog.some(localEntry => localEntry.input === remoteEntry.input && localEntry.timestamp === remoteEntry.timestamp)) {
                mergedLog.push(remoteEntry);
            }
        });

        window.adaptiveScanLog = mergedLog;

        // Merge classifier stats
        for (const [classifier, stats] of Object.entries(incomingState.classifierStats || {})) {
            if (!window.classifierEvolution.stats[classifier]) {
                window.classifierEvolution.stats[classifier] = { hits: 0, misses: 0 };
            }
            window.classifierEvolution.stats[classifier].hits += stats.hits;
            window.classifierEvolution.stats[classifier].misses += stats.misses;
        }

        // Merge classifier mutations
        for (const [classifier, mutation] of Object.entries(incomingState.classifierMutations || {})) {
            if (!window.classifierEvolution.mutations[classifier]) {
                window.classifierEvolution.mutations[classifier] = { score: mutation.score };
            } else {
                const localScore = window.classifierEvolution.mutations[classifier].score;
                window.classifierEvolution.mutations[classifier].score = (localScore + mutation.score) / 2;
            }
        }

        // Merge classifiers (avoid duplicates)
        const localClassifiers = window.resolverClassifierLoader.classifiers || [];
        incomingState.classifiers.forEach(remoteClassifier => {
            const duplicate = localClassifiers.some(local => local.name === remoteClassifier.name);
            if (!duplicate) {
                resolverClassifierLoader.registerClassifier(
                    remoteClassifier.name,
                    remoteClassifier.pattern,
                    eval(remoteClassifier.resolverFunction)
                );
            }
        });

        console.log("🧬 Multi-Device Merge Complete");
    }
};
// ================================
// Phase 33 — Conflict Resolution & Consensus Engine
// ================================

window.adaptiveConsensusEngine = {
    resolveConflicts: function() {
        const conflictingClassifiers = [];

        for (const [name, mutation] of Object.entries(window.classifierEvolution.mutations)) {
            if (mutation.score >= 0.3 && mutation.score <= 0.5) {
                conflictingClassifiers.push({ name, score: mutation.score });
            }
        }

        if (conflictingClassifiers.length === 0) {
            console.log("✅ No conflicts detected. System stable.");
            return;
        }

        conflictingClassifiers.forEach(conflict => {
            console.warn(`⚠ Classifier '${conflict.name}' has borderline confidence (${conflict.score}). Manual review recommended.`);
        });

        console.log("🧬 Conflict Resolution Complete. Review borderline classifiers if necessary.");
    }
};
// ================================
// Phase 34 — Autonomous Classifier Refinement Engine
// ================================

window.classifierRefinementEngine = {
    refine: function() {
        const mutations = window.classifierEvolution.mutations || {};

        for (const [classifier, mutation] of Object.entries(mutations)) {
            if (mutation.score >= 0.3 && mutation.score <= 0.5) {
                const adjustment = 0.02;
                const historical = window.classifierEvolution.stats[classifier] || { hits: 0, misses: 0 };

                if (historical.hits >= historical.misses) {
                    mutation.score += adjustment;
                    console.log(`🧬 Refinement: Boosted ${classifier} to ${mutation.score.toFixed(3)}`);
                } else {
                    mutation.score -= adjustment;
                    console.log(`🧬 Refinement: Reduced ${classifier} to ${mutation.score.toFixed(3)}`);
                }

                // Clamp boundaries
                mutation.score = Math.max(0.0, Math.min(1.0, mutation.score));
            }
        }

        console.log("🧬 Classifier Refinement Pass Complete.");
    },

    autoLoop: function() {
        setInterval(() => {
            this.refine();
        }, 30000); // Run every 30 seconds
        console.log("🧬 Autonomous Classifier Refinement Engine Online");
    }
};

// Auto-start refinement loop
window.classifierRefinementEngine.autoLoop();

// ================================
// Phase 35 — Long-Term Memory Compression Engine
// ================================

window.adaptiveCompressionEngine = {
    compress: function() {
        const log = window.adaptiveScanLog || [];
        const retentionThreshold = 500; // Keep last 500 scans

        if (log.length <= retentionThreshold) {
            console.log("🧬 Compression not required. Log size is healthy.");
            return;
        }

        const compressedLog = log.slice(log.length - retentionThreshold);
        window.adaptiveScanLog = compressedLog;

        console.log(`🧬 Adaptive Scan Log Compressed — Retained last ${retentionThreshold} scans.`);
    },

    autoLoop: function() {
        setInterval(() => {
            this.compress();
        }, 300000); // Check every 5 minutes
        console.log("🧬 Long-Term Memory Compression Engine Online");
    }
};

// Auto-start compression loop
window.adaptiveCompressionEngine.autoLoop();

// ================================
// Phase 36 — Predictive Resolver Forecasting Engine
// ================================

window.predictiveForecastEngine = {
    forecast: function() {
        const log = window.adaptiveScanLog || [];
        const predictions = {};

        log.forEach(entry => {
            if (entry.input.length > 12) {
                const prefixLength = entry.input.length - 12;
                predictions[prefixLength] = (predictions[prefixLength] || 0) + 1;
            }
        });

        const sorted = Object.entries(predictions)
            .map(([length, count]) => ({ prefixLength: parseInt(length), count }))
            .sort((a, b) => b.count - a.count);

        const probableNext = sorted[0];
        console.log("🧬 Forecast Prediction:", probableNext);

        return probableNext;
    },

    recommendClassifier: function() {
        const prediction = this.forecast();
        if (!prediction) {
            console.warn("⚠ No sufficient data for prediction.");
            return;
        }

        const detectedPrefixLength = prediction.prefixLength;
        const pattern = new RegExp(`^(\\d{${detectedPrefixLength}})(\\d{12})$`);

        console.log(`🧬 Recommended Classifier Pattern: Prefix Length ${detectedPrefixLength} → ${pattern}`);
        return pattern;
    }
};

// ================================
// Phase 39 — Field Audit Snapshot Engine
// ================================

window.fieldAuditEngine = {
    generateSnapshot: function() {
        const adaptiveState = window.adaptiveSyncEngine.export();
        const itemLinkMap = JSON.parse(localStorage.getItem("itemLinkMap") || "{}");

        const snapshot = {
            timestamp: new Date().toISOString(),
            adaptiveBrain: JSON.parse(adaptiveState),
            itemMappings: itemLinkMap
        };

        console.log("🧬 Field Audit Snapshot Generated:", snapshot);
        return snapshot;
    },

    exportSnapshot: function() {
        const snapshot = this.generateSnapshot();
        const exportData = JSON.stringify(snapshot, null, 2);
        console.log("🧬 Field Audit Export Ready:", exportData);
        return exportData;
    }
};

// ================================
// Phase 43.5 — Item Link Modal Manager Bootstrap
// ================================

window.itemLinkModalManager = {
    promptForLink: function(upc) {
        const modal = document.getElementById('itemLinkModal');
        const upcField = document.getElementById('modalUPC');
        const itemField = document.getElementById('modalItemNumber');
        const saveButton = document.getElementById('modalSaveBtn');
        const cancelButton = document.getElementById('modalCancelBtn');

        if (!modal || !upcField || !itemField || !saveButton || !cancelButton) {
            console.error("❌ Modal elements not found.");
            return;
        }

        upcField.value = upc;
        itemField.value = "";

        modal.classList.remove('hidden');

        saveButton.onclick = () => {
            const itemNumber = itemField.value.trim();
            if (!itemNumber) {
                alert("Please enter a valid item number.");
                return;
            }

            if (!window.itemLinkStorage) {
                console.error("❌ Item Link Storage not available.");
                return;
            }

            window.itemLinkStorage.saveMapping(upc, itemNumber);
            console.log(`✅ Linked UPC ${upc} to Item ${itemNumber}`);
            modal.classList.add('hidden');
        };

        cancelButton.onclick = () => {
            modal.classList.add('hidden');
        };
    }
};