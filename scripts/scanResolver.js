// scanResolver.js — Modular Extraction Logic

export function handleScanInput(scanCode) {
    console.log("Resolving Scan Code:", scanCode);

    const extractedUPC = extractUPC(scanCode);
    if (extractedUPC) {
        console.log("✅ Resolved UPC:", extractedUPC);
        // You can trigger modal or next phase here once integrated.
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