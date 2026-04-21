const state = {
  activeTab: "summary",
  failureMode: "flaky",
  selectedFailureId: null,
};

const data = {
  testCase: {
    title: "VP Test New",
    url: "https://hcm4preview.sapsf.com/login?company=VPMCGolden",
    badge: "Critical",
  },
  stats: [
    { label: "Pass Rate", value: "30.8%", meta: "4 of 13 runs passed", tone: "var(--emerald)" },
    { label: "Avg Execution Time", value: "1m 49s", meta: "Stable in last 7 runs", tone: "var(--text)" },
    { label: "Flakiness Score", value: "58.33%", meta: "Elevated instability across recent runs", tone: "var(--amber)" },
  ],
  runDistribution: [
    "failed",
    "passed",
    "failed",
    "failed",
    "passed",
    "failed",
    "failed",
    "failed",
    "passed",
    "failed",
    "failed",
    "passed",
    "failed",
  ],
  failureSummary: [
    {
      label: "Top Failure Type",
      value: "UI Interaction Failure",
      meta: "38% of recent failure patterns",
      accent: "#e11d48",
    },
    {
      label: "Most Impacted Step",
      value: "Verify Employee Status",
      meta: "Highest repeat failure concentration",
      accent: "#0f172a",
    },
    {
      label: "Last Failure",
      value: "Mar 6 2026 • 09:42 PM",
      meta: "Latest failing execution observed",
      accent: "#f59e0b",
    },
    {
      label: "Affected Runs",
      value: "5 / 9 runs failed",
      meta: "Repeated across the failed run window",
      accent: "#fb7185",
    },
  ],
  failureBreakdown: [
    { label: "UI Interaction Failures", percentage: 38, fillClass: "fill-rose" },
    { label: "Assertion Failures", percentage: 22, fillClass: "fill-red-light" },
    { label: "Timing / Synchronization Failures", percentage: 15, fillClass: "fill-amber" },
    { label: "Application Errors", percentage: 10, fillClass: "fill-orange" },
    { label: "Network Failures", percentage: 6, fillClass: "fill-blue" },
    { label: "Data Issues", percentage: 4, fillClass: "fill-violet" },
    { label: "Environment Failures", percentage: 3, fillClass: "fill-slate" },
    { label: "Human Intervention Required", percentage: 1, fillClass: "fill-emerald" },
    { label: "Infrastructure Failures", percentage: 1, fillClass: "fill-slate-dark" },
  ],
  failureReasons: [
    {
      id: "RUN-1092",
      failureCategory: "UI Interaction",
      failureType: "Element Not Found",
      failedStep: "Click Submit Button",
      errorSummary: 'Selector "#submit-btn" not found',
      occurrences: 3,
      severity: "High",
      executionMetadata: {
        runId: "RUN-1092",
        browser: "Chrome 123",
        environment: "UAT / SAP SuccessFactors Preview",
        os: "Windows 11",
        executionNode: "ziprpa-node-us-east-04",
        timestamp: "Mar 6 2026 • 09:42 PM",
      },
      failureContext: {
        failureCategory: "UI Interaction",
        failureType: "Element Not Found",
        failedStep: "Click Submit Button",
        errorMessage: 'Selector "#submit-btn" not found after DOM stabilization and scroll retry.',
      },
      selectorDiagnostics: {
        selectorUsed: "#submit-btn",
        selectorType: "CSS Selector",
        domStatus: "Missing from active DOM snapshot",
        selfHealingAttempt: "Enabled",
        healingResult: "Failed",
      },
      selfHealing: {
        failedSelector: "#submit-btn",
        fallbackAttempts: [
          'button[data-action="submit"]',
          ".submit-button",
          "button.primary",
        ],
        result: "FAILED",
      },
      suggestedRootCause:
        "The selector '#submit-btn' is no longer present in the DOM. It may have been renamed to '#submitButton'. Consider updating the locator.",
    },
    {
      id: "RUN-1089",
      failureCategory: "UI Interaction",
      failureType: "Element Not Clickable",
      failedStep: "Open Employee Menu",
      errorSummary: "Element covered by modal",
      occurrences: 1,
      severity: "Medium",
      executionMetadata: {
        runId: "RUN-1089",
        browser: "Edge 122",
        environment: "UAT / SAP SuccessFactors Preview",
        os: "Windows 11",
        executionNode: "ziprpa-node-us-east-02",
        timestamp: "Mar 6 2026 • 05:14 PM",
      },
      failureContext: {
        failureCategory: "UI Interaction",
        failureType: "Element Not Clickable",
        failedStep: "Open Employee Menu",
        errorMessage: "Target action icon was visible but blocked by a modal overlay.",
      },
      selectorDiagnostics: {
        selectorUsed: ".employee-menu-trigger",
        selectorType: "CSS Selector",
        domStatus: "Element present but overlapped",
        selfHealingAttempt: "Enabled",
        healingResult: "Partial",
      },
      selfHealing: {
        failedSelector: ".employee-menu-trigger",
        fallbackAttempts: [
          "[data-testid='employee-menu']",
          ".employee-card .menu-trigger",
        ],
        result: "PARTIAL",
      },
      suggestedRootCause:
        "A transient modal or blocking layer is intercepting the click target. The test should wait for the overlay to dismiss before interacting with the employee menu.",
    },
    {
      id: "RUN-1087",
      failureCategory: "Assertion Failure",
      failureType: "Value Mismatch",
      failedStep: "Verify Employee Status",
      errorSummary: 'Expected "Approved" but found "Pending"',
      occurrences: 5,
      severity: "High",
      executionMetadata: {
        runId: "RUN-1087",
        browser: "Chrome 123",
        environment: "UAT / SAP SuccessFactors Preview",
        os: "macOS Sonoma",
        executionNode: "ziprpa-node-apac-01",
        timestamp: "Mar 5 2026 • 08:16 PM",
      },
      failureContext: {
        failureCategory: "Assertion Failure",
        failureType: "Value Mismatch",
        failedStep: "Verify Employee Status",
        errorMessage: 'Expected "Approved" but found "Pending" in status pill.',
      },
      assertionDetails: {
        expectedValue: "Approved",
        actualValue: "Pending",
      },
      suggestedRootCause:
        "The application returned a different business state than expected. This may indicate delayed backend processing or incorrect test data setup for employee approval.",
    },
    {
      id: "RUN-1081",
      failureCategory: "Timing / Synchronization",
      failureType: "Timeout Waiting for Element",
      failedStep: "Wait for Employee Table",
      errorSummary: "Timed out after 30s",
      occurrences: 1,
      severity: "Medium",
      executionMetadata: {
        runId: "RUN-1081",
        browser: "Firefox 124",
        environment: "UAT / SAP SuccessFactors Preview",
        os: "Windows 10",
        executionNode: "ziprpa-node-eu-03",
        timestamp: "Mar 4 2026 • 07:28 PM",
      },
      failureContext: {
        failureCategory: "Timing / Synchronization",
        failureType: "Timeout Waiting for Element",
        failedStep: "Wait for Employee Table",
        errorMessage: "Employee table did not become visible within 30 seconds.",
      },
      selectorDiagnostics: {
        selectorUsed: "table[data-testid='employee-table']",
        selectorType: "CSS Selector",
        domStatus: "Loading skeleton remained visible",
        selfHealingAttempt: "Disabled",
        healingResult: "Not attempted",
      },
      suggestedRootCause:
        "The page load or employee service response exceeded the configured wait threshold. A more stable readiness check is needed before proceeding.",
    },
    {
      id: "RUN-1079",
      failureCategory: "Network Error",
      failureType: "API Timeout",
      failedStep: "Load Employee List",
      errorSummary: "GET /employees timed out",
      occurrences: 1,
      severity: "Medium",
      executionMetadata: {
        runId: "RUN-1079",
        browser: "Chrome 123",
        environment: "UAT / SAP SuccessFactors Preview",
        os: "Ubuntu 22.04",
        executionNode: "ziprpa-node-us-west-01",
        timestamp: "Mar 4 2026 • 01:07 PM",
      },
      failureContext: {
        failureCategory: "Network Error",
        failureType: "API Timeout",
        failedStep: "Load Employee List",
        errorMessage: "GET /employees exceeded request timeout threshold.",
      },
      networkDiagnostics: {
        apiEndpoint: "GET /employees",
        httpStatus: "504 Gateway Timeout",
        responseTime: "30,011 ms",
      },
      suggestedRootCause:
        "The employee list service did not respond in time. This likely indicates backend latency or an unstable network path to the UAT environment.",
    },
    {
      id: "RUN-1076",
      failureCategory: "Environment",
      failureType: "Session Expired",
      failedStep: "Submit Form",
      errorSummary: "User session expired during run",
      occurrences: 1,
      severity: "Low",
      executionMetadata: {
        runId: "RUN-1076",
        browser: "Edge 122",
        environment: "UAT / SAP SuccessFactors Preview",
        os: "Windows 11",
        executionNode: "ziprpa-node-us-east-03",
        timestamp: "Mar 3 2026 • 06:11 PM",
      },
      failureContext: {
        failureCategory: "Environment",
        failureType: "Session Expired",
        failedStep: "Submit Form",
        errorMessage: "Authenticated session token expired before form submission.",
      },
      suggestedRootCause:
        "The session lifetime appears shorter than the end-to-end journey. Re-authentication or token refresh handling is needed for longer runs.",
    },
  ],
  impactedSteps: [
    { step: "Verify Employee Status", failures: 5 },
    { step: "Click Submit Button", failures: 3 },
    { step: "Wait for Employee Table", failures: 1 },
  ],
  flakiestStep: {
    step: "Verify Employee Status",
    failureRate: 63,
    copy: "Repeated status mismatches indicate unstable data timing or inconsistent approval state propagation.",
  },
  aiRootCause: {
    confidence: 82,
    cause: "Dynamic DOM change detected in the employee status region, combined with delayed backend state propagation across retries.",
  },
  selfHealingLog: {
    selectorFailed: "#submit-btn",
    fallbackAttempts: [
      'button[data-action="submit"]',
      ".submit-button",
      "button.primary",
    ],
    result: "FAILED",
    copy: "Three alternate locators were evaluated, but none mapped to a stable clickable element.",
  },
  advancedMetrics: [
    { label: "Selector Stability", value: "74%", meta: "2 selectors drifting in the last release" },
    { label: "Retry Recovery Rate", value: "18%", meta: "Low automatic recovery on interactive failures" },
    { label: "Environment Drift", value: "Moderate", meta: "Preview environment updated 2 days ago" },
  ],
  recentRuns: [
    { id: "RUN-1092", status: "Failed", browser: "Chrome 123", duration: "1m 54s", timestamp: "Mar 6 2026 • 09:42 PM" },
    { id: "RUN-1090", status: "Passed", browser: "Chrome 123", duration: "1m 37s", timestamp: "Mar 6 2026 • 06:08 PM" },
    { id: "RUN-1089", status: "Failed", browser: "Edge 122", duration: "1m 58s", timestamp: "Mar 6 2026 • 05:14 PM" },
    { id: "RUN-1087", status: "Failed", browser: "Chrome 123", duration: "2m 01s", timestamp: "Mar 5 2026 • 08:16 PM" },
    { id: "RUN-1084", status: "Passed", browser: "Firefox 124", duration: "1m 44s", timestamp: "Mar 5 2026 • 01:23 PM" },
  ],
};

const app = document.getElementById("app");

function renderApp() {
  app.innerHTML = `
    <div class="app-shell">
      <div class="scene-stage">
        <div class="scene-inner">
          <div class="scene-ghost top">
            <div class="ghost-row">
              <div>
                <div class="ghost-pill"></div>
                <div class="ghost-line"></div>
              </div>
              <div class="ghost-action"></div>
            </div>
            <div class="ghost-stack">
              <div class="ghost-box"></div>
              <div class="ghost-box"></div>
              <div class="ghost-box"></div>
            </div>
          </div>
          <div class="scene-grid">
            <div class="scene-ghost scene-panel"></div>
            <div class="scene-ghost scene-panel"></div>
          </div>
        </div>
      </div>

      <aside class="report-panel">
        <div class="report-shell">
          ${renderHeader()}
          ${renderTabs()}
          <div class="report-content">
            ${state.activeTab === "summary" ? renderSummaryTab() : renderRunsTab()}
          </div>
        </div>
        <div class="drawer-backdrop ${state.selectedFailureId ? "open" : ""}" data-close-drawer="true"></div>
        ${renderDrawer()}
      </aside>
    </div>
  `;

  bindEvents();
}

function renderHeader() {
  return `
    <header class="report-header">
      <div class="header-row">
        <div>
          <div class="header-top">
            <span class="tag dark">Test Case Report</span>
            <span class="tag critical">${data.testCase.badge}</span>
          </div>
          <h1 class="title">${data.testCase.title}</h1>
          <a class="report-url" href="${data.testCase.url}" target="_blank" rel="noreferrer">${data.testCase.url}</a>
        </div>
        <button class="ghost-button" type="button">Export Report</button>
      </div>
    </header>
  `;
}

function renderTabs() {
  return `
    <div class="toolbar">
      <div class="switcher">
        <button type="button" class="${state.activeTab === "summary" ? "active" : ""}" data-tab="summary">Summary</button>
        <button type="button" class="${state.activeTab === "runs" ? "active" : ""}" data-tab="runs">Test Runs</button>
      </div>
    </div>
  `;
}

function renderSummaryTab() {
  return `
    <div class="stack">
      ${renderKpis()}
      ${renderTestResultsAnalysis()}
      ${renderFailureAnalysis()}
      ${renderAdvancedMetrics()}
    </div>
  `;
}

function renderKpis() {
  return `
    <section class="kpi-grid">
      ${data.stats
        .map(
          (item) => `
            <article class="stat-card">
              <div class="stat-label">${item.label}</div>
              <div class="stat-row">
                <p class="stat-value" style="color:${item.tone}">${item.value}</p>
                <div class="stat-glyph"></div>
              </div>
              <div class="stat-meta">${item.meta}</div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderTestResultsAnalysis() {
  return `
    <section class="card section-card">
      <div class="section-head">
        <div>
          <h2>Test Results Analysis</h2>
          <p>Execution mix and outcome distribution across the recent run window.</p>
        </div>
      </div>

      <div class="analysis-grid">
        <div class="panel-block">
          <div class="mini-head">
            <div>
              <h3 class="mini-title">Passed vs Failed</h3>
              <p class="mini-copy">Recent 13 executions</p>
            </div>
            <div class="legend">
              <span><i class="legend-dot" style="background:#10b981"></i>Passed</span>
              <span><i class="legend-dot" style="background:#e11d48"></i>Failed</span>
            </div>
          </div>
          <div class="bar-chart">
            ${data.runDistribution
              .map(
                (status, index) => `
                  <div class="bar-col">
                    <div class="bar ${status}"></div>
                    <span class="bar-label">R${index + 1}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="panel-block">
          <div class="mini-head">
            <div>
              <h3 class="mini-title">Outcome Distribution</h3>
              <p class="mini-copy">Current quality posture for this test case.</p>
            </div>
          </div>
          <div class="distribution">
            <div class="donut">
              <div class="donut-center">
                <div>
                  <strong>30.8%</strong>
                  <span>Pass rate</span>
                </div>
              </div>
            </div>
            <div class="distribution-stats">
              ${renderDistributionRow("Passed Runs", "4", "#10b981")}
              ${renderDistributionRow("Failed Runs", "9", "#e11d48")}
              ${renderDistributionRow("Flaky Signature", "High", "#f59e0b")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDistributionRow(label, value, color) {
  return `
    <div class="dist-row">
      <div class="dist-label"><i class="legend-dot" style="background:${color}"></i>${label}</div>
      <div class="dist-value">${value}</div>
    </div>
  `;
}

function renderFailureAnalysis() {
  const content =
    state.failureMode === "clean"
      ? renderEmptyState()
      : `
        <div class="stack" style="margin-top:18px">
          <div class="summary-grid">
            ${data.failureSummary
              .map(
                (item) => `
                  <article class="summary-card">
                    <div class="summary-row">
                      <div>
                        <div class="summary-label">${item.label}</div>
                        <div class="summary-value">${item.value}</div>
                        <div class="summary-meta">${item.meta}</div>
                      </div>
                      <i class="accent-dot" style="background:${item.accent}"></i>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>

          <div class="failure-analytics-grid">
            <div class="stack">
              <div class="panel-block">
                <div class="mini-head">
                  <div>
                    <h3 class="mini-title">Failure Category Breakdown</h3>
                    <p class="mini-copy">Diagnostic distribution across the current failure window.</p>
                  </div>
                  <span class="mini-pill">9 categories</span>
                </div>
                <div class="breakdown-list">
                  ${data.failureBreakdown
                    .map(
                      (item) => `
                        <div class="breakdown-row">
                          <div class="breakdown-meta">
                            <span>${item.label}</span>
                            <strong>${item.percentage}%</strong>
                          </div>
                          <div class="breakdown-track">
                            <div class="breakdown-fill ${item.fillClass}" style="width:${item.percentage}%"></div>
                          </div>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              </div>

              ${renderFailureTable()}
            </div>

            <div class="diagnostic-stack">
              ${renderImpactedStepsCard()}
              ${renderFlakyStepCard()}
              ${renderAiRootCauseCard()}
              ${renderHealingLogCard()}
            </div>
          </div>
        </div>
      `;

  return `
    <section class="card section-card">
      <div class="failure-toolbar">
        <div>
          <h2 class="section-title">Failure Analysis</h2>
          <p class="section-note">This section explains WHY executions failed and which signals point to the likely root cause.</p>
        </div>
        <div class="mode-switch">
          <button type="button" class="${state.failureMode === "flaky" ? "active" : ""}" data-mode="flaky">Failure Data</button>
          <button type="button" class="${state.failureMode === "clean" ? "active" : ""}" data-mode="clean">No-Failure Preview</button>
        </div>
      </div>
      ${content}
    </section>
  `;
}

function renderFailureTable() {
  return `
    <section class="table-card">
      <div class="table-head">
        <h3>Failure Reasons</h3>
        <p>Each row captures the failing category, the exact step, and the signal used for diagnostic analysis.</p>
      </div>
      <div class="table-grid header table-grid-wide">
        <div>Failure Category</div>
        <div>Failure Type</div>
        <div>Failed Step</div>
        <div>Error Summary</div>
        <div>Occurrences</div>
        <div>Severity</div>
        <div>Action</div>
      </div>
      <div class="table-body">
        ${data.failureReasons
          .map(
            (record) => `
              <button type="button" class="table-row desktop table-row-wide" data-open-failure="${record.id}">
                <div class="cell-title">${record.failureCategory}</div>
                <div class="cell-copy">${record.failureType}</div>
                <div class="cell-copy">${record.failedStep}</div>
                <div class="cell-copy">${record.errorSummary}</div>
                <div class="cell-strong">${record.occurrences}</div>
                <div>${renderSeverityPill(record.severity)}</div>
                <div><span class="details-button">View Details</span></div>
              </button>
              <button type="button" class="table-row mobile" data-open-failure="${record.id}">
                <div class="mobile-row-top">
                  <div>
                    <p class="mobile-row-title">${record.failureCategory} • ${record.failureType}</p>
                    <p class="mobile-row-step">${record.failedStep}</p>
                  </div>
                  ${renderSeverityPill(record.severity)}
                </div>
                <p class="mobile-row-copy">${record.errorSummary}</p>
                <div class="mobile-row-footer">
                  <span class="mobile-count">${record.occurrences} occurrences</span>
                  <span class="details-button">View Details</span>
                </div>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderSeverityPill(severity) {
  return `<span class="pill ${severity.toLowerCase()}">${severity}</span>`;
}

function renderImpactedStepsCard() {
  return `
    <section class="panel-block diagnostic-card">
      <div class="mini-head">
        <div>
          <h3 class="mini-title">Most Impacted Steps</h3>
          <p class="mini-copy">Where failures concentrate most often.</p>
        </div>
        <span class="mini-pill">Ranked</span>
      </div>
      <div class="impacted-list">
        ${data.impactedSteps
          .map(
            (item, index) => `
              <div class="impacted-item">
                <div class="impacted-left">
                  <div class="rank-badge">${index + 1}</div>
                  <div>
                    <p class="step-title">${item.step}</p>
                    <p class="step-subtitle">Failure hotspot</p>
                  </div>
                </div>
                <div class="impact-value">${item.failures} failures</div>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderFlakyStepCard() {
  return `
    <section class="panel-block diagnostic-card">
      <div class="mini-head">
        <div>
          <h3 class="mini-title">Flaky Step Detection</h3>
          <p class="mini-copy">Highest instability signal across reruns.</p>
        </div>
      </div>
      <div class="focus-card">
        <div class="focus-label">Flakiest Step</div>
        <div class="focus-value">${data.flakiestStep.step}</div>
        <div class="focus-label" style="margin-top:18px">Failure Rate</div>
        <div class="metric-with-bar">
          <strong>${data.flakiestStep.failureRate}%</strong>
          <div class="thin-track">
            <div class="thin-fill fill-amber" style="width:${data.flakiestStep.failureRate}%"></div>
          </div>
        </div>
        <p class="focus-copy">${data.flakiestStep.copy}</p>
      </div>
    </section>
  `;
}

function renderAiRootCauseCard() {
  return `
    <section class="panel-block diagnostic-card">
      <div class="mini-head">
        <div>
          <h3 class="mini-title">AI Root Cause Detection</h3>
          <p class="mini-copy">Model-assisted grouping of the most likely failure driver.</p>
        </div>
      </div>
      <div class="focus-card">
        <div class="confidence-row">
          <div>
            <div class="focus-label">Confidence</div>
            <div class="confidence-value">${data.aiRootCause.confidence}%</div>
          </div>
          <div class="confidence-badge">AI</div>
        </div>
        <div class="thin-track" style="margin-top:12px">
          <div class="thin-fill fill-rose" style="width:${data.aiRootCause.confidence}%"></div>
        </div>
        <div class="focus-label" style="margin-top:18px">Possible Cause</div>
        <p class="focus-copy">${data.aiRootCause.cause}</p>
      </div>
    </section>
  `;
}

function renderHealingLogCard() {
  return `
    <section class="panel-block diagnostic-card">
      <div class="mini-head">
        <div>
          <h3 class="mini-title">Self Healing Attempt Log</h3>
          <p class="mini-copy">Automation engine fallback behavior for selector instability.</p>
        </div>
      </div>
      <div class="healing-log">
        <div class="log-line">
          <span class="log-key">Selector Failed</span>
          <strong>${data.selfHealingLog.selectorFailed}</strong>
        </div>
        <div class="log-key">Fallback Attempts</div>
        <div class="healing-chips">
          ${data.selfHealingLog.fallbackAttempts
            .map((selector) => `<span class="healing-chip">${selector}</span>`)
            .join("")}
        </div>
        <div class="log-line" style="margin-top:16px">
          <span class="log-key">Healing Result</span>
          <strong class="healing-result failure">${data.selfHealingLog.result}</strong>
        </div>
        <p class="focus-copy">${data.selfHealingLog.copy}</p>
      </div>
    </section>
  `;
}

function renderEmptyState() {
  return `
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8.5 12.5L10.8 14.8L15.8 9.8" stroke="#10b981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
          <circle cx="12" cy="12" r="9" stroke="#10b981" stroke-width="1.8"></circle>
        </svg>
      </div>
      <h3>No failure reasons available.</h3>
      <p>This test has passed successfully in recent runs.</p>
      <div class="success-band">
        <i class="legend-dot" style="background:#10b981"></i>
        No failure diagnostics are required for the selected run window.
      </div>
    </div>
  `;
}

function renderAdvancedMetrics() {
  return `
    <section class="card section-card">
      <div class="section-head">
        <div>
          <h2>Advanced Metrics</h2>
          <p>Supporting signals that help reliability teams separate product defects from automation instability.</p>
        </div>
      </div>
      <div class="advanced-grid">
        ${data.advancedMetrics
          .map(
            (item) => `
              <article class="advanced-card">
                <div class="advanced-label">${item.label}</div>
                <div class="advanced-value">${item.value}</div>
                <div class="advanced-meta">${item.meta}</div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderRunsTab() {
  return `
    <section class="card section-card">
      <div class="section-head">
        <div>
          <h2>Recent Test Runs</h2>
          <p>Execution history and environment details for recent runs.</p>
        </div>
      </div>
      <div class="runs-list">
        ${data.recentRuns
          .map(
            (run) => `
              <article class="run-item">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                    <span class="run-id">${run.id}</span>
                    <span class="status-pill ${run.status.toLowerCase()}">${run.status}</span>
                  </div>
                  <div class="run-meta">${run.browser} • ${run.timestamp}</div>
                </div>
                <div class="run-duration">${run.duration}</div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderDrawer() {
  const record = data.failureReasons.find((item) => item.id === state.selectedFailureId);

  if (!record) {
    return `<aside class="detail-drawer"></aside>`;
  }

  return `
    <aside class="detail-drawer open">
      <div class="drawer-shell">
        <div class="drawer-header">
          <div>
            <div class="drawer-kicker">Failure Detail</div>
            <h3 class="drawer-title">${record.failureType}</h3>
            <p class="drawer-step">${record.failedStep}</p>
          </div>
          <button type="button" class="close-button" data-close-drawer="true" aria-label="Close detail drawer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            </svg>
          </button>
        </div>
        <div class="drawer-content">
          ${renderDrawerSection(
            "Execution Metadata",
            renderDefinitionGrid([
              ["Run ID", record.executionMetadata.runId],
              ["Browser", record.executionMetadata.browser],
              ["Environment", record.executionMetadata.environment],
              ["OS", record.executionMetadata.os],
              ["Execution Node", record.executionMetadata.executionNode],
              ["Timestamp", record.executionMetadata.timestamp],
            ])
          )}
          ${renderDrawerSection(
            "Failure Context",
            renderDefinitionGrid([
              ["Failure Category", record.failureContext.failureCategory],
              ["Failure Type", record.failureContext.failureType],
              ["Failed Step", record.failureContext.failedStep],
              ["Error Message", record.failureContext.errorMessage],
            ])
          )}
          ${
            record.selectorDiagnostics
              ? renderDrawerSection(
                  "Selector Diagnostics",
                  renderDefinitionGrid([
                    ["Selector Used", record.selectorDiagnostics.selectorUsed],
                    ["Selector Type", record.selectorDiagnostics.selectorType],
                    ["DOM Status", record.selectorDiagnostics.domStatus],
                    ["Self Healing Attempt", record.selectorDiagnostics.selfHealingAttempt],
                    ["Healing Result", record.selectorDiagnostics.healingResult],
                  ])
                )
              : ""
          }
          ${
            record.assertionDetails
              ? renderDrawerSection(
                  "Assertion Details",
                  renderDefinitionGrid([
                    ["Expected Value", record.assertionDetails.expectedValue],
                    ["Actual Value", record.assertionDetails.actualValue],
                  ])
                )
              : ""
          }
          ${
            record.networkDiagnostics
              ? renderDrawerSection(
                  "Network Diagnostics",
                  renderDefinitionGrid([
                    ["API Endpoint", record.networkDiagnostics.apiEndpoint],
                    ["HTTP Status", record.networkDiagnostics.httpStatus],
                    ["Response Time", record.networkDiagnostics.responseTime],
                  ])
                )
              : ""
          }
          ${
            record.selfHealing
              ? renderDrawerSection(
                  "Self Healing Attempt Log",
                  `
                    <div class="drawer-chip-block">
                      <div class="drawer-inline-row">
                        <span class="drawer-inline-label">Selector Failed</span>
                        <strong>${record.selfHealing.failedSelector}</strong>
                      </div>
                      <div class="drawer-inline-label" style="margin-top:14px">Fallback attempts</div>
                      <div class="healing-chips" style="margin-top:10px">
                        ${record.selfHealing.fallbackAttempts
                          .map((selector) => `<span class="healing-chip">${selector}</span>`)
                          .join("")}
                      </div>
                      <div class="drawer-inline-row" style="margin-top:16px">
                        <span class="drawer-inline-label">Healing Result</span>
                        <strong class="healing-result ${record.selfHealing.result === "FAILED" ? "failure" : "warning"}">${record.selfHealing.result}</strong>
                      </div>
                    </div>
                  `
                )
              : ""
          }
          <div class="info-card">
            <h4>Suggested Root Cause</h4>
            <p>${record.suggestedRootCause}</p>
          </div>
        </div>
      </div>
    </aside>
  `;
}

function renderDrawerSection(title, content) {
  return `
    <section class="drawer-section">
      <div class="drawer-section-title">${title}</div>
      ${content}
    </section>
  `;
}

function renderDefinitionGrid(items) {
  return `
    <div class="detail-grid">
      ${items
        .map(
          ([label, value]) => `
            <div class="detail-item">
              <div class="detail-label">${label}</div>
              <div class="detail-value">${value || "N/A"}</div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.getAttribute("data-tab");
      if (state.activeTab !== "summary") {
        state.selectedFailureId = null;
      }
      renderApp();
    });
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.failureMode = button.getAttribute("data-mode");
      state.selectedFailureId = null;
      renderApp();
    });
  });

  document.querySelectorAll("[data-open-failure]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedFailureId = button.getAttribute("data-open-failure");
      renderApp();
    });
  });

  document.querySelectorAll("[data-close-drawer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedFailureId = null;
      renderApp();
    });
  });
}

renderApp();
