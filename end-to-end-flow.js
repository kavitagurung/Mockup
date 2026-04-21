const flows = [
  {
    id: "flow-1",
    name: "Workday Employee Lifecycle",
    description: "End-to-end employee lifecycle from login through termination with shared runtime context and data handoff.",
    application: "Workday",
    createdBy: "Kavita",
    createdDate: "Apr 2, 2026",
    lastUpdated: "Apr 14, 2026",
    lastRunStatus: "Passed",
    lastRunTime: "Apr 14, 2026 10:30 AM",
    averageDuration: "8m 20s",
    totalRuns: 24,
    passRate: "87%",
    owner: "Kavita",
    lastModifiedBy: "Kavita",
    tags: ["Lifecycle", "HR", "Workday"],
    environment: "UAT",
    testCaseVersion: "v12",
    failureSummary: "No open blockers",
    resumeAvailable: true,
    steps: [
      {
        id: "s1",
        name: "Login",
        status: "Passed",
        inputs: "username, password",
        outputs: "session_token",
        processLink: "Start node",
        dataSources: [
          { label: "username", type: "ddt", origin: "Employee Lifecycle DDT" },
          { label: "password", type: "variable", origin: "Secret variable" },
        ],
        outputLinks: ["session_token -> Create Pre-Hire"],
      },
      {
        id: "s2",
        name: "Create Pre-Hire",
        status: "Passed",
        inputs: "candidate details",
        outputs: "employee_id, candidate_id",
        processLink: "Consumes login session",
        dataSources: [
          { label: "session_token", type: "previous", origin: "Login output" },
          { label: "candidate details", type: "ddt", origin: "Employee Lifecycle DDT" },
          { label: "candidateEmail", type: "generated", origin: "Generated on the fly" },
        ],
        outputLinks: ["employee_id -> Hire Employee", "candidate_id -> Hire Employee"],
      },
      {
        id: "s3",
        name: "Hire Employee",
        status: "Passed",
        inputs: "employee_id, candidate_id",
        outputs: "hire_status, worker_id",
        processLink: "Core hire transaction",
        dataSources: [
          { label: "employee_id", type: "previous", origin: "Create Pre-Hire output" },
          { label: "candidate_id", type: "previous", origin: "Create Pre-Hire output" },
          { label: "hireDate", type: "variable", origin: "Flow variable" },
        ],
        outputLinks: ["worker_id -> Onboard Employee", "worker_id -> Promote Employee", "worker_id -> Terminate Employee"],
      },
      {
        id: "s4",
        name: "Onboard Employee",
        status: "Passed",
        inputs: "worker_id",
        outputs: "onboarding_status",
        processLink: "Parallel-ready lane anchor",
        dataSources: [{ label: "worker_id", type: "previous", origin: "Hire Employee output" }],
        outputLinks: ["onboarding_status -> Process context"],
      },
      {
        id: "s5",
        name: "Promote Employee",
        status: "Failed",
        inputs: "worker_id, effective_date",
        outputs: "job_change_id",
        processLink: "Downstream change event",
        dataSources: [
          { label: "worker_id", type: "previous", origin: "Hire Employee output" },
          { label: "effective_date", type: "variable", origin: "Runtime variable" },
        ],
        outputLinks: ["job_change_id -> Terminate Employee"],
      },
      {
        id: "s6",
        name: "Terminate Employee",
        status: "Skipped",
        inputs: "worker_id, termination_reason",
        outputs: "termination_id",
        processLink: "Cleanup / exit node",
        dataSources: [
          { label: "worker_id", type: "previous", origin: "Hire Employee output" },
          { label: "termination_reason", type: "generated", origin: "Generated cleanup reason" },
        ],
        outputLinks: ["termination_id -> End"],
      },
    ],
  },
  {
    id: "flow-2",
    name: "Workday Hire to Terminate",
    description: "Starts from pre-hire and drives the worker through hire, onboarding, job change, and termination.",
    application: "Workday",
    createdBy: "Kavita",
    createdDate: "Apr 1, 2026",
    lastUpdated: "Apr 13, 2026",
    lastRunStatus: "Failed",
    lastRunTime: "Apr 13, 2026 6:10 PM",
    averageDuration: "5m 10s",
    totalRuns: 18,
    passRate: "72%",
    owner: "Kavita",
    lastModifiedBy: "Anita",
    tags: ["Hire", "Termination"],
    environment: "UAT",
    testCaseVersion: "v9",
    failureSummary: "Promotion approval task missing in latest run",
    resumeAvailable: true,
    steps: [
      {
        id: "s1",
        name: "Create Pre-Hire",
        status: "Passed",
        inputs: "candidate details",
        outputs: "employee_id, candidate_id",
        processLink: "Entry node",
        dataSources: [
          { label: "candidate details", type: "ddt", origin: "Hire To Terminate DDT" },
          { label: "candidateEmail", type: "generated", origin: "Generated on the fly" },
        ],
        outputLinks: ["employee_id -> Hire Employee"],
      },
      {
        id: "s2",
        name: "Hire Employee",
        status: "Passed",
        inputs: "employee_id, candidate_id",
        outputs: "worker_id",
        processLink: "Links hiring context",
        dataSources: [
          { label: "employee_id", type: "previous", origin: "Create Pre-Hire output" },
          { label: "candidate_id", type: "previous", origin: "Create Pre-Hire output" },
        ],
        outputLinks: ["worker_id -> Onboard Employee", "worker_id -> Promote Employee"],
      },
      {
        id: "s3",
        name: "Onboard Employee",
        status: "Passed",
        inputs: "worker_id",
        outputs: "onboarding_status",
        processLink: "Sequential lane",
        dataSources: [{ label: "worker_id", type: "previous", origin: "Hire Employee output" }],
        outputLinks: ["onboarding_status -> Promote Employee"],
      },
      {
        id: "s4",
        name: "Promote Employee",
        status: "Failed",
        inputs: "worker_id, effective_date",
        outputs: "job_change_id",
        processLink: "Approval-dependent node",
        dataSources: [
          { label: "worker_id", type: "previous", origin: "Hire Employee output" },
          { label: "effective_date", type: "variable", origin: "Runtime variable" },
        ],
        outputLinks: ["job_change_id -> Terminate Employee"],
      },
      {
        id: "s5",
        name: "Terminate Employee",
        status: "Skipped",
        inputs: "worker_id, termination_reason",
        outputs: "termination_id",
        processLink: "Exit node",
        dataSources: [
          { label: "worker_id", type: "previous", origin: "Hire Employee output" },
          { label: "termination_reason", type: "generated", origin: "Generated cleanup reason" },
        ],
        outputLinks: ["termination_id -> End"],
      },
    ],
  },
  {
    id: "flow-3",
    name: "SuccessFactors Employee Flow",
    description: "Basic employee setup and onboarding flow for SuccessFactors environments.",
    application: "SuccessFactors",
    createdBy: "Rahul",
    createdDate: "Mar 29, 2026",
    lastUpdated: "Apr 12, 2026",
    lastRunStatus: "Not Run",
    lastRunTime: "—",
    averageDuration: "6m 05s",
    totalRuns: 0,
    passRate: "—",
    owner: "Rahul",
    lastModifiedBy: "Rahul",
    tags: ["SuccessFactors", "Starter"],
    environment: "Preview",
    testCaseVersion: "v4",
    failureSummary: "No runs yet",
    resumeAvailable: false,
    steps: [
      {
        id: "s1",
        name: "Login",
        status: "Not Run",
        inputs: "username, password",
        outputs: "session_token",
        processLink: "Entry node",
        dataSources: [
          { label: "username", type: "ddt", origin: "Starter data set" },
          { label: "password", type: "variable", origin: "Secret variable" },
        ],
        outputLinks: ["session_token -> Create Employee"],
      },
      {
        id: "s2",
        name: "Create Employee",
        status: "Not Run",
        inputs: "employee details",
        outputs: "employee_id",
        processLink: "Profile setup",
        dataSources: [
          { label: "session_token", type: "previous", origin: "Login output" },
          { label: "employee details", type: "ddt", origin: "Starter data set" },
        ],
        outputLinks: ["employee_id -> Activate Profile"],
      },
      {
        id: "s3",
        name: "Activate Profile",
        status: "Not Run",
        inputs: "employee_id",
        outputs: "profile_status",
        processLink: "Activation lane",
        dataSources: [{ label: "employee_id", type: "previous", origin: "Create Employee output" }],
        outputLinks: ["profile_status -> Onboard Employee"],
      },
      {
        id: "s4",
        name: "Onboard Employee",
        status: "Not Run",
        inputs: "employee_id",
        outputs: "onboarding_status",
        processLink: "Exit lane",
        dataSources: [{ label: "employee_id", type: "previous", origin: "Create Employee output" }],
        outputLinks: ["onboarding_status -> End"],
      },
    ],
  },
];

const executionRecords = [
  {
    id: "RUN-1024",
    flowId: "flow-1",
    triggeredBy: "Kavita",
    startedAt: "Apr 14, 2026 10:30 AM",
    completedAt: "Apr 14, 2026 10:38 AM",
    duration: "8m 20s",
    status: "Passed",
    environment: "UAT",
    dataSet: "Employee Lifecycle DDT",
    stopOnFailure: true,
    resumeAvailable: false,
    steps: [
      {
        name: "Login",
        status: "Passed",
        duration: "20s",
        inputSnapshot: '{ "username": "qa.user" }',
        outputSnapshot: '{ "session_token": "sess_abc123" }',
        logs: ["Session opened", "Token issued"],
        errorMessage: "",
      },
      {
        name: "Create Pre-Hire",
        status: "Passed",
        duration: "1m 22s",
        inputSnapshot: '{ "candidateEmail": "alex@company.com" }',
        outputSnapshot: '{ "employee_id": "WD12345", "candidate_id": "C88291" }',
        logs: ["Candidate created", "Pre-hire committed"],
        errorMessage: "",
      },
      {
        name: "Hire Employee",
        status: "Passed",
        duration: "2m 01s",
        inputSnapshot: '{ "employee_id": "WD12345" }',
        outputSnapshot: '{ "worker_id": "WK1041", "hire_status": "Complete" }',
        logs: ["Hire completed", "Worker profile active"],
        errorMessage: "",
      },
      {
        name: "Onboard Employee",
        status: "Passed",
        duration: "1m 36s",
        inputSnapshot: '{ "worker_id": "WK1041" }',
        outputSnapshot: '{ "onboarding_status": "Complete" }',
        logs: ["Tasks assigned", "Tasks completed"],
        errorMessage: "",
      },
      {
        name: "Promote Employee",
        status: "Passed",
        duration: "1m 11s",
        inputSnapshot: '{ "worker_id": "WK1041" }',
        outputSnapshot: '{ "job_change_id": "JC2001" }',
        logs: ["Job change approved"],
        errorMessage: "",
      },
      {
        name: "Terminate Employee",
        status: "Passed",
        duration: "1m 50s",
        inputSnapshot: '{ "worker_id": "WK1041" }',
        outputSnapshot: '{ "termination_id": "TM404" }',
        logs: ["Termination completed"],
        errorMessage: "",
      },
    ],
  },
  {
    id: "RUN-1019",
    flowId: "flow-1",
    triggeredBy: "Kavita",
    startedAt: "Apr 13, 2026 6:10 PM",
    completedAt: "Apr 13, 2026 6:15 PM",
    duration: "5m 10s",
    status: "Failed",
    environment: "UAT",
    dataSet: "Employee Lifecycle DDT",
    stopOnFailure: true,
    resumeAvailable: true,
    steps: [
      {
        name: "Login",
        status: "Passed",
        duration: "19s",
        inputSnapshot: '{ "username": "qa.user" }',
        outputSnapshot: '{ "session_token": "sess_abc123" }',
        logs: ["Session opened"],
        errorMessage: "",
      },
      {
        name: "Create Pre-Hire",
        status: "Passed",
        duration: "1m 14s",
        inputSnapshot: '{ "candidateEmail": "alex@company.com" }',
        outputSnapshot: '{ "employee_id": "WD12345" }',
        logs: ["Pre-hire created"],
        errorMessage: "",
      },
      {
        name: "Hire Employee",
        status: "Failed",
        duration: "58s",
        inputSnapshot: '{ "employee_id": "WD12345" }',
        outputSnapshot: '{ }',
        logs: ["Profile lookup timed out", "Retry exhausted"],
        errorMessage: "employee profile not found",
      },
      {
        name: "Onboard Employee",
        status: "Skipped",
        duration: "—",
        inputSnapshot: '{ }',
        outputSnapshot: '{ }',
        logs: [],
        errorMessage: "",
      },
    ],
  },
  {
    id: "RUN-1011",
    flowId: "flow-2",
    triggeredBy: "Kavita",
    startedAt: "Apr 12, 2026 11:05 AM",
    completedAt: "Apr 12, 2026 11:12 AM",
    duration: "7m 02s",
    status: "Failed",
    environment: "UAT",
    dataSet: "Hire To Terminate DDT",
    stopOnFailure: true,
    resumeAvailable: true,
    steps: [
      {
        name: "Create Pre-Hire",
        status: "Passed",
        duration: "1m 05s",
        inputSnapshot: '{ "candidateEmail": "jane@company.com" }',
        outputSnapshot: '{ "employee_id": "WD40111" }',
        logs: ["Pre-hire created"],
        errorMessage: "",
      },
      {
        name: "Hire Employee",
        status: "Passed",
        duration: "1m 58s",
        inputSnapshot: '{ "employee_id": "WD40111" }',
        outputSnapshot: '{ "worker_id": "WK9012" }',
        logs: ["Hire completed"],
        errorMessage: "",
      },
      {
        name: "Onboard Employee",
        status: "Passed",
        duration: "1m 44s",
        inputSnapshot: '{ "worker_id": "WK9012" }',
        outputSnapshot: '{ "onboarding_status": "Complete" }',
        logs: ["Onboarding complete"],
        errorMessage: "",
      },
      {
        name: "Promote Employee",
        status: "Failed",
        duration: "1m 20s",
        inputSnapshot: '{ "worker_id": "WK9012" }',
        outputSnapshot: '{ "approval_queue": "Compensation Review" }',
        logs: ["Approval task panel missing"],
        errorMessage: "promotion approval task not visible",
      },
      {
        name: "Terminate Employee",
        status: "Skipped",
        duration: "—",
        inputSnapshot: '{ }',
        outputSnapshot: '{ }',
        logs: [],
        errorMessage: "",
      },
    ],
  },
];

const templates = [
  { id: "tpl-1", name: "Employee Lifecycle Template", application: "Workday", steps: 6, description: "Login, hire, onboard, change, terminate." },
  { id: "tpl-2", name: "Hire to Onboard Template", application: "Workday", steps: 4, description: "Focused onboarding process with DDT support." },
  { id: "tpl-3", name: "Starter HR Flow", application: "SuccessFactors", steps: 4, description: "Basic employee creation and profile activation." },
];

const ROUTES = {
  flows: "#/test-flows",
  flowDetails: (flowId) => `#/test-flows/${encodeURIComponent(flowId)}`,
};

const state = {
  screen: "flows",
  activeFlowTab: "all",
  flowViewMode: "table",
  selectedFlowId: "flow-1",
  selectedExecutionId: "RUN-1024",
  selectedCanvasNodeKey: null,
  expandedStepDetailKey: null,
  expandedStepScreenshotKey: null,
  draggingNodeKey: null,
  canvasZoom: 100,
  showRunModal: false,
  showCreateModal: false,
  runFlowId: null,
  nextRunNumber: 1025,
  nextFlowNumber: 4,
  runForm: {
    environment: "UAT",
    dataSet: "Employee Lifecycle DDT",
    stopOnFailure: true,
    resumeFromFailed: false,
  },
};

function getFlow(flowId) {
  return flows.find((flow) => flow.id === flowId);
}

function getExecution(executionId) {
  return executionRecords.find((execution) => execution.id === executionId);
}

function getFlowExecutions(flowId) {
  return executionRecords.filter((execution) => execution.flowId === flowId);
}

function getStatusTone(status) {
  const normalized = String(status).toLowerCase();
  if (normalized === "passed") {
    return "passed";
  }
  if (normalized === "failed") {
    return "failed";
  }
  if (normalized === "skipped") {
    return "skipped";
  }
  if (normalized === "running") {
    return "running";
  }
  return "idle";
}

function statusBadge(status) {
  return `<span class="status-badge ${getStatusTone(status)}">${status}</span>`;
}

function initializeCanvasSelection(flowId) {
  const flow = getFlow(flowId);

  if (!flow || !flow.steps.length) {
    state.selectedCanvasNodeKey = null;
    return;
  }

  const [selectedFlowId, selectedStepId] = state.selectedCanvasNodeKey ? state.selectedCanvasNodeKey.split(":") : [];
  const stepStillExists = selectedFlowId === flowId && flow.steps.some((step) => step.id === selectedStepId);

  if (!stepStillExists) {
    state.selectedCanvasNodeKey = `${flowId}:${flow.steps[0].id}`;
  }
}

function applyHashRoute() {
  const hash = window.location.hash || ROUTES.flows;
  const flowDetailMatch = hash.match(/^#\/test-flows\/([^/]+)$/);

  if (flowDetailMatch) {
    const flowId = decodeURIComponent(flowDetailMatch[1]);
    if (getFlow(flowId)) {
      state.selectedFlowId = flowId;
      state.screen = "flow-details";
      initializeCanvasSelection(flowId);
      return;
    }
  }

  state.screen = "flows";
}

function navigateToFlows() {
  if (window.location.hash !== ROUTES.flows) {
    window.location.hash = ROUTES.flows;
    return;
  }

  applyHashRoute();
  render();
}

function openFlow(flowId) {
  if (window.location.hash !== ROUTES.flowDetails(flowId)) {
    window.location.hash = ROUTES.flowDetails(flowId);
    return;
  }

  applyHashRoute();
  render();
}

function selectCanvasNode(flowId, stepId) {
  state.selectedCanvasNodeKey = `${flowId}:${stepId}`;
  render();
}

function getSelectedCanvasStep(flow) {
  if (!flow) {
    return null;
  }
  const fallbackStep = flow.steps[0] || null;
  if (!state.selectedCanvasNodeKey) {
    return fallbackStep;
  }
  const [flowId, stepId] = state.selectedCanvasNodeKey.split(":");
  if (flowId !== flow.id) {
    return fallbackStep;
  }
  return flow.steps.find((step) => step.id === stepId) || fallbackStep;
}

function getPreviousStep(flow, stepId) {
  const stepIndex = flow.steps.findIndex((step) => step.id === stepId);
  return stepIndex > 0 ? flow.steps[stepIndex - 1] : null;
}

function getNextStep(flow, stepId) {
  const stepIndex = flow.steps.findIndex((step) => step.id === stepId);
  return stepIndex >= 0 && stepIndex < flow.steps.length - 1 ? flow.steps[stepIndex + 1] : null;
}

function getCanvasScale() {
  return state.canvasZoom / 100;
}

function getCanvasStepsPerRow() {
  const scale = getCanvasScale();
  const viewportWidth = typeof window === "undefined" ? 1280 : Math.max(window.innerWidth - 320, 360);
  const estimatedNodeWidth = 290 * scale;
  return Math.max(1, Math.min(5, Math.floor(viewportWidth / estimatedNodeWidth) || 1));
}

function getCanvasRows(flow) {
  const stepsPerRow = getCanvasStepsPerRow();
  const rows = [];

  for (let index = 0; index < flow.steps.length; index += stepsPerRow) {
    const sourceSteps = flow.steps.slice(index, index + stepsPerRow);
    const rowIndex = rows.length;
    const direction = rowIndex % 2 === 0 ? "forward" : "reverse";
    rows.push({
      rowIndex,
      direction,
      sourceSteps,
      displaySteps: direction === "forward" ? sourceSteps : [...sourceSteps].reverse(),
    });
  }

  return rows;
}

function getHorizontalConnectorLabel(row, displayIndex) {
  const currentDisplayStep = row.displaySteps[displayIndex];
  const adjacentDisplayStep = row.displaySteps[displayIndex + 1];

  if (!currentDisplayStep || !adjacentDisplayStep) {
    return "";
  }

  if (row.direction === "forward") {
    return getConnectorLabel(currentDisplayStep, adjacentDisplayStep);
  }

  return getConnectorLabel(adjacentDisplayStep, currentDisplayStep);
}

function getRowTransitionLabel(row, nextRow) {
  if (!row || !nextRow) {
    return "";
  }

  const lastProcessStepInRow = row.sourceSteps[row.sourceSteps.length - 1];
  const firstProcessStepInNextRow = nextRow.sourceSteps[0];
  return getConnectorLabel(lastProcessStepInRow, firstProcessStepInNextRow);
}

function getConnectorLabel(step, nextStep) {
  if (!nextStep) {
    return "Process end";
  }

  const matchingDeclaredLink = (step.outputLinks || []).find((link) => link.includes(nextStep.name));
  if (matchingDeclaredLink) {
    return matchingDeclaredLink;
  }

  const primaryOutput = String(step.outputs || "output")
    .split(",")[0]
    .trim();

  return `${primaryOutput || "output"} -> ${nextStep.name}`;
}

function changeCanvasZoom(direction) {
  const levels = [50, 75, 100, 125];
  const currentIndex = levels.indexOf(state.canvasZoom);

  if (direction === "in" && currentIndex < levels.length - 1) {
    state.canvasZoom = levels[currentIndex + 1];
  }

  if (direction === "out" && currentIndex > 0) {
    state.canvasZoom = levels[currentIndex - 1];
  }

  render();
}

function reorderFlowSteps(flowId, draggedStepId, targetStepId, position) {
  const flow = getFlow(flowId);
  if (!flow || draggedStepId === targetStepId) {
    return;
  }

  const fromIndex = flow.steps.findIndex((step) => step.id === draggedStepId);
  const targetIndex = flow.steps.findIndex((step) => step.id === targetStepId);

  if (fromIndex === -1 || targetIndex === -1) {
    return;
  }

  let insertIndex = position === "after" ? targetIndex + 1 : targetIndex;

  if (fromIndex < insertIndex) {
    insertIndex -= 1;
  }

  if (fromIndex === insertIndex) {
    return;
  }

  const [movedStep] = flow.steps.splice(fromIndex, 1);
  flow.steps.splice(insertIndex, 0, movedStep);
  state.selectedCanvasNodeKey = `${flowId}:${draggedStepId}`;
}

function dataSourceBadge(source) {
  return `<span class="data-source-pill ${source.type}">${source.type === "previous" ? "Prev Output" : source.type === "ddt" ? "DDT" : source.type === "variable" ? "Variable" : "Generated"}</span>`;
}

function getStepViewKey(flowId, stepId) {
  return `${flowId}:${stepId}`;
}

function toggleStepDetails(flowId, stepId) {
  const stepKey = getStepViewKey(flowId, stepId);
  state.expandedStepDetailKey = state.expandedStepDetailKey === stepKey ? null : stepKey;
  state.selectedCanvasNodeKey = stepKey;
  render();
}

function toggleStepScreenshot(flowId, stepId) {
  const stepKey = getStepViewKey(flowId, stepId);
  state.expandedStepScreenshotKey = state.expandedStepScreenshotKey === stepKey ? null : stepKey;
  state.selectedCanvasNodeKey = stepKey;
  render();
}

function renderStepScreenshot(flow, step, stepIndex) {
  return `
    <div class="step-shot ${getStatusTone(step.status)}">
      <div class="step-shot-browser">
        <span></span><span></span><span></span>
      </div>
      <div class="step-shot-surface">
        <div class="step-shot-sidebar">
          <div class="step-shot-chip">${flow.application}</div>
          <div class="step-shot-nav"></div>
          <div class="step-shot-nav short"></div>
          <div class="step-shot-nav"></div>
        </div>
        <div class="step-shot-main">
          <div class="step-shot-header">Step ${stepIndex + 1}: ${step.name}</div>
          <div class="step-shot-panel">
            <div class="step-shot-field wide"></div>
            <div class="step-shot-field"></div>
            <div class="step-shot-field"></div>
            <div class="step-shot-field wide"></div>
          </div>
          <div class="step-shot-footer">
            <span class="step-shot-status">${step.status}</span>
            <span class="step-shot-version">${flow.environment}</span>
          </div>
        </div>
      </div>
      <div class="step-shot-caption">Latest captured screen for ${step.name}</div>
    </div>
  `;
}

function renderFlowStepsSection(flow) {
  return `
    <section class="panel flow-steps-panel">
      <div class="panel-head">
        <h3>Steps</h3>
        <span class="panel-note">Review every linked step, open screenshots, and inspect handoff details without leaving the flow.</span>
      </div>
      <div class="flow-steps-list">
        ${flow.steps
          .map((step, stepIndex) => {
            const stepKey = getStepViewKey(flow.id, step.id);
            const detailsOpen = state.expandedStepDetailKey === stepKey;
            const screenshotOpen = state.expandedStepScreenshotKey === stepKey;
            const previousStep = getPreviousStep(flow, step.id);
            const nextStep = getNextStep(flow, step.id);

            return `
              <article class="flow-step-card ${detailsOpen || screenshotOpen ? "expanded" : ""}">
                <div class="flow-step-card-head">
                  <div>
                    <div class="flow-step-kicker">Step ${stepIndex + 1}</div>
                    <h4>${step.name}</h4>
                    <p>${step.processLink}</p>
                  </div>
                  <div class="flow-step-head-meta">
                    ${statusBadge(step.status)}
                    <div class="action-row">
                      <button class="table-action" data-step-detail="${stepKey}">${detailsOpen ? "Hide Details" : "View Details"}</button>
                      <button class="table-action" data-step-screenshot="${stepKey}">${screenshotOpen ? "Hide Screenshot" : "View Screenshot"}</button>
                    </div>
                  </div>
                </div>
                <div class="flow-step-summary">
                  <div class="mini-stat">
                    <span>Inputs</span>
                    <strong>${step.inputs}</strong>
                  </div>
                  <div class="mini-stat">
                    <span>Outputs</span>
                    <strong>${step.outputs}</strong>
                  </div>
                  <div class="mini-stat">
                    <span>Data Sources</span>
                    <strong>${step.dataSources.length}</strong>
                  </div>
                  <div class="mini-stat">
                    <span>Next Handoff</span>
                    <strong>${(step.outputLinks || [nextStep ? `${step.outputs} -> ${nextStep.name}` : "End"]).join(" · ")}</strong>
                  </div>
                </div>
                ${
                  detailsOpen || screenshotOpen
                    ? `
                      <div class="flow-step-drawer">
                        ${
                          screenshotOpen
                            ? `
                              <div class="flow-step-drawer-block">
                                <div class="detail-section-title">Screenshot</div>
                                ${renderStepScreenshot(flow, step, stepIndex)}
                              </div>
                            `
                            : ""
                        }
                        ${
                          detailsOpen
                            ? `
                              <div class="flow-step-drawer-block">
                                <div class="detail-section-title">Step Details</div>
                                <div class="flow-step-detail-grid">
                                  <div class="flow-step-detail-card">
                                    <span>Process linkage</span>
                                    <strong>${previousStep ? previousStep.name : "Start"} -> ${step.name}</strong>
                                    <small>Next: ${nextStep ? nextStep.name : "End"}</small>
                                  </div>
                                  <div class="flow-step-detail-card">
                                    <span>Declared handoff</span>
                                    <strong>${(step.outputLinks || []).join(" · ") || "No downstream mapping declared"}</strong>
                                    <small>Maintains process and data linkage after reorder</small>
                                  </div>
                                  <div class="flow-step-detail-card">
                                    <span>Data sources</span>
                                    <strong>${step.dataSources.map((source) => source.label).join(", ")}</strong>
                                    <small>${step.dataSources.map((source) => `${source.label}: ${source.origin}`).join(" · ")}</small>
                                  </div>
                                </div>
                              </div>
                            `
                            : ""
                        }
                      </div>
                    `
                    : ""
                }
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function openExecution(executionId) {
  const execution = getExecution(executionId);
  if (!execution) {
    return;
  }
  state.selectedExecutionId = executionId;
  state.selectedFlowId = execution.flowId;
  state.screen = "execution-details";
  render();
}

function openRunModal(flowId) {
  const flow = getFlow(flowId);
  const previousFailedRun = getFlowExecutions(flowId).some((execution) => execution.status === "Failed");

  state.runFlowId = flowId;
  state.runForm = {
    environment: flow?.environment || "UAT",
    dataSet: flowId === "flow-2" ? "Hire To Terminate DDT" : "Employee Lifecycle DDT",
    stopOnFailure: true,
    resumeFromFailed: previousFailedRun,
  };
  state.showRunModal = true;
  render();
}

function closeRunModal() {
  state.showRunModal = false;
  state.runFlowId = null;
  render();
}

function openCreateModal() {
  state.showCreateModal = true;
  render();
}

function closeCreateModal() {
  state.showCreateModal = false;
  render();
}

function createDraftFlow() {
  const newFlowId = `flow-${state.nextFlowNumber}`;
  state.nextFlowNumber += 1;

  flows.unshift({
    id: newFlowId,
    name: "New Employee Lifecycle Draft",
    description: "Draft flow created from the Test Flows module for the next business workflow.",
    application: "Workday",
    createdBy: "Kavita",
    createdDate: "Apr 14, 2026",
    lastUpdated: "Apr 14, 2026",
    lastRunStatus: "Not Run",
    lastRunTime: "—",
    averageDuration: "—",
    totalRuns: 0,
    passRate: "—",
    owner: "Kavita",
    lastModifiedBy: "Kavita",
    tags: ["Draft"],
    environment: "UAT",
    testCaseVersion: "v1",
    failureSummary: "No runs yet",
    resumeAvailable: false,
    steps: [
      {
        id: "s1",
        name: "Login",
        status: "Not Run",
        inputs: "username, password",
        outputs: "session_token",
        processLink: "Entry node",
        dataSources: [
          { label: "username", type: "ddt", origin: "Draft data set" },
          { label: "password", type: "variable", origin: "Secret variable" },
        ],
        outputLinks: ["session_token -> Create Pre-Hire"],
      },
      {
        id: "s2",
        name: "Create Pre-Hire",
        status: "Not Run",
        inputs: "candidate details",
        outputs: "employee_id",
        processLink: "Draft process link",
        dataSources: [
          { label: "session_token", type: "previous", origin: "Login output" },
          { label: "candidate details", type: "ddt", origin: "Draft data set" },
        ],
        outputLinks: ["employee_id -> Hire Employee"],
      },
      {
        id: "s3",
        name: "Hire Employee",
        status: "Not Run",
        inputs: "employee_id",
        outputs: "worker_id",
        processLink: "Draft completion node",
        dataSources: [{ label: "employee_id", type: "previous", origin: "Create Pre-Hire output" }],
        outputLinks: ["worker_id -> End"],
      },
    ],
  });

  state.showCreateModal = false;
  state.selectedFlowId = newFlowId;
  openFlow(newFlowId);
}

function startRun() {
  const flow = getFlow(state.runFlowId);
  if (!flow) {
    return;
  }

  const newRunId = `RUN-${state.nextRunNumber}`;
  state.nextRunNumber += 1;

  const runningSteps = flow.steps.map((step, index) => ({
    name: step.name,
    status: index === 0 ? "Running" : "Pending",
    duration: index === 0 ? "0s" : "—",
    inputSnapshot: '{ }',
    outputSnapshot: '{ }',
    logs: index === 0 ? ["Run started", "Initializing flow context"] : [],
    errorMessage: "",
  }));

  executionRecords.unshift({
    id: newRunId,
    flowId: flow.id,
    triggeredBy: "Kavita",
    startedAt: "Apr 14, 2026 11:45 AM",
    completedAt: "—",
    duration: "0m 00s",
    status: "Running",
    environment: state.runForm.environment,
    dataSet: state.runForm.dataSet,
    stopOnFailure: state.runForm.stopOnFailure,
    resumeAvailable: false,
    steps: runningSteps,
  });

  flow.lastRunStatus = "Running";
  flow.lastRunTime = "Apr 14, 2026 11:45 AM";

  state.showRunModal = false;
  state.selectedExecutionId = newRunId;
  state.selectedFlowId = flow.id;
  state.screen = "execution-details";
  render();
}

function renderSidebar() {
  const flowsActive = state.screen === "flows" || state.screen === "flow-details";
  const executionsActive = state.screen === "execution-details";

  return `
    <aside class="sidebar">
      <div class="brand-row">
        <div class="brand-mark">Z</div>
        <div>
          <div class="brand-name">Ziplyne</div>
          <div class="brand-subtitle">Automation Workspace</div>
        </div>
      </div>
      <button class="highlight-card">
        <span class="highlight-title">AI Test Generator</span>
      </button>
      <div class="nav-search">Search navigation...</div>
      <div class="nav-group">
        <div class="nav-label">Main</div>
        <button class="nav-item">Test Cases</button>
        <button class="nav-item ${flowsActive ? "active" : ""}" data-screen="flows">Test Flows</button>
        <button class="nav-item ${executionsActive || state.activeFlowTab === "recent" ? "active" : ""}" data-screen="recent-runs">Executions</button>
        <button class="nav-item">Reports</button>
      </div>
      <div class="nav-group">
        <div class="nav-label">Inside Test Flows</div>
        <button class="nav-item active" data-tab="all">All Flows</button>
      </div>
    </aside>
  `;
}

function renderTopbar(title, subtitle) {
  return `
    <header class="topbar">
      <div>
        <div class="page-kicker">Test Flows</div>
        <h1 class="page-title">${title}</h1>
        <p class="page-subtitle">${subtitle}</p>
      </div>
      <div class="topbar-actions">
        <div class="user-chip">
          <div class="user-meta">
            <strong>Ziplyne</strong>
            <span>test@gmail.com</span>
          </div>
          <div class="user-avatar">Z</div>
        </div>
      </div>
    </header>
  `;
}

function renderFlowCanvas(flow) {
  const selectedStep = getSelectedCanvasStep(flow);
  const previousStep = selectedStep ? getPreviousStep(flow, selectedStep.id) : null;
  const nextStep = selectedStep ? getNextStep(flow, selectedStep.id) : null;

  return `
    <section class="panel flow-canvas-panel">
      <div class="panel-head">
        <h3>Process Visualization</h3>
        <span class="panel-note">Visual workflow map with drag-and-drop reorder, zoom, pan, and future-ready branching space.</span>
      </div>
      <div class="flow-map-panel standalone">
        <div class="canvas-legend">
          <span class="legend-label">Data linkage</span>
          <div class="legend-row">
            <span class="data-source-pill previous">Prev Output</span>
            <span class="data-source-pill ddt">DDT</span>
            <span class="data-source-pill variable">Variable</span>
            <span class="data-source-pill generated">Generated</span>
          </div>
        </div>
        <div class="flow-map-layout">
          <div class="flow-canvas-shell">
            <div class="canvas-toolbar">
              <div class="canvas-lane-label">Primary lane</div>
              <div class="zoom-controls">
                <button class="table-action" data-zoom="out">-</button>
                <span class="zoom-readout">${state.canvasZoom}%</span>
                <button class="table-action" data-zoom="in">+</button>
              </div>
            </div>
            <div class="flow-canvas-viewport" data-canvas-viewport="${flow.id}">
              <div
                class="flow-canvas-board"
                style="--canvas-scale:${getCanvasScale()};"
              >
                ${getCanvasRows(flow)
                  .map((row, rowIndex, rows) => {
                    const nextRow = rows[rowIndex + 1];
                    return `
                      <div class="canvas-row-block ${row.direction}">
                        <div class="flow-canvas-track ${row.direction}">
                          ${row.displaySteps
                            .map((step, displayIndex) => {
                              const isSelected = selectedStep?.id === step.id;
                              const hasHorizontalConnector = displayIndex < row.displaySteps.length - 1;
                              return `
                                <div class="canvas-segment" data-drop-zone="${flow.id}:${step.id}" data-row-direction="${row.direction}">
                                  <button
                                    class="flow-node ${getStatusTone(step.status)} ${isSelected ? "active" : ""}"
                                    data-select-node="${flow.id}:${step.id}"
                                    data-drag-node="${flow.id}:${step.id}"
                                    draggable="true"
                                  >
                                    <div class="flow-node-kicker">Step ${flow.steps.findIndex((flowStep) => flowStep.id === step.id) + 1}</div>
                                    <div class="flow-node-title">${step.name}</div>
                                    <div class="flow-node-copy">${step.processLink}</div>
                                    <div class="flow-node-sources">
                                      ${step.dataSources.map((source) => dataSourceBadge(source)).join("")}
                                    </div>
                                  </button>
                                  ${
                                    hasHorizontalConnector
                                      ? `
                                        <div class="flow-link ${row.direction}">
                                          <div class="flow-link-line"></div>
                                          <div class="flow-link-copy">${getHorizontalConnectorLabel(row, displayIndex)}</div>
                                        </div>
                                      `
                                      : ""
                                  }
                                </div>
                              `;
                            })
                            .join("")}
                        </div>
                        ${
                          nextRow
                            ? `
                              <div class="row-transition ${row.direction}">
                                <div class="row-transition-line"></div>
                                <div class="row-transition-copy">${getRowTransitionLabel(row, nextRow)}</div>
                              </div>
                            `
                            : ""
                        }
                      </div>
                    `;
                  })
                  .join("")}
                <div class="branch-lane-ready">Branch / Parallel Lane Ready</div>
              </div>
            </div>
          </div>
        </div>
        <div class="canvas-side-panel">
          ${
            selectedStep
              ? `
                <div class="expanded-label">Node details</div>
                <div class="canvas-node-title">${selectedStep.name}</div>
                <div class="expanded-copy">${selectedStep.processLink}</div>
                <div class="detail-section">
                  <div class="detail-section-title">Process linkage</div>
                  <div class="expanded-copy"><strong>Previous:</strong> ${previousStep ? previousStep.name : "Start"}</div>
                  <div class="expanded-copy"><strong>Next:</strong> ${nextStep ? nextStep.name : "End"}</div>
                  <div class="expanded-copy"><strong>Declared handoff:</strong> ${(selectedStep.outputLinks || []).join(" · ")}</div>
                </div>
                <div class="detail-section">
                  <div class="detail-section-title">Data sources</div>
                  <div class="canvas-detail-list">
                    ${selectedStep.dataSources
                      .map(
                        (source) => `
                          <div class="canvas-detail-row">
                            <div>
                              <div class="canvas-detail-key">${source.label}</div>
                              <div class="expanded-copy">${source.origin}</div>
                            </div>
                            ${dataSourceBadge(source)}
                          </div>
                        `
                      )
                      .join("")}
                  </div>
                </div>
                <div class="detail-section">
                  <div class="detail-section-title">Node IO</div>
                  <div class="expanded-copy"><strong>Inputs:</strong> ${selectedStep.inputs}</div>
                  <div class="expanded-copy"><strong>Outputs:</strong> ${selectedStep.outputs}</div>
                </div>
              `
              : ""
          }
          <div class="canvas-side-actions">
            <button class="primary-cta" data-run-flow="${flow.id}">Run Flow</button>
            <button class="table-action" data-back-flows>Back to All Flows</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFlowTable() {
  return `
    <div class="table-shell">
      <table class="data-table">
        <thead>
          <tr>
            <th>Flow Name</th>
            <th>Application</th>
            <th>No. of Steps</th>
            <th>Created By</th>
            <th>Last Updated</th>
            <th>Last Run Status</th>
            <th>Last Run Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${flows
            .map(
              (flow) => `
                <tr>
                  <td>
                    <button class="flow-name-link" data-view-flow="${flow.id}">${flow.name}</button>
                    <div class="secondary-cell">${flow.description}</div>
                  </td>
                  <td>${flow.application}</td>
                  <td>${flow.steps.length}</td>
                  <td>${flow.createdBy}</td>
                  <td>${flow.lastUpdated}</td>
                  <td>${statusBadge(flow.lastRunStatus)}</td>
                  <td>${flow.lastRunTime}</td>
                  <td>
                    <div class="action-row">
                      <button class="table-action" data-run-flow="${flow.id}">Run</button>
                      <button class="table-action muted">Edit</button>
                      <button class="table-action muted">Duplicate</button>
                      <button class="table-action muted danger">Delete</button>
                    </div>
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderFlowCards() {
  return `
    <div class="flow-card-grid">
      ${flows
        .map(
          (flow) => `
            <article class="flow-card">
              <div class="card-head">
                <div>
                  <h3>${flow.name}</h3>
                  <p>${flow.description}</p>
                </div>
                ${statusBadge(flow.lastRunStatus)}
              </div>
              <div class="meta-stack">
                <div><span>Application</span><strong>${flow.application}</strong></div>
                <div><span>Steps</span><strong>${flow.steps.length}</strong></div>
                <div><span>Last Run</span><strong>${flow.lastRunStatus}</strong></div>
                <div><span>Updated</span><strong>${flow.lastUpdated}</strong></div>
              </div>
              <div class="card-actions">
                <button class="primary-cta" data-run-flow="${flow.id}">Run Flow</button>
                <button class="secondary-cta" data-view-flow="${flow.id}">View Details</button>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderRecentRuns() {
  return `
    <div class="table-shell">
      <table class="data-table">
        <thead>
          <tr>
            <th>Run ID</th>
            <th>Flow</th>
            <th>Triggered By</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${executionRecords
            .map((execution) => {
              const flow = getFlow(execution.flowId);
              return `
                <tr>
                  <td>${execution.id}</td>
                  <td>${flow ? flow.name : "Unknown Flow"}</td>
                  <td>${execution.triggeredBy}</td>
                  <td>${execution.startedAt}</td>
                  <td>${execution.duration}</td>
                  <td>${statusBadge(execution.status)}</td>
                  <td>
                    <div class="action-row">
                      <button class="table-action" data-view-execution="${execution.id}">View Execution</button>
                      <button class="table-action muted">Download Logs</button>
                    </div>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderTemplates() {
  return `
    <div class="template-grid">
      ${templates
        .map(
          (template) => `
            <article class="template-card">
              <div class="template-pill">${template.application}</div>
              <h3>${template.name}</h3>
              <p>${template.description}</p>
              <div class="template-meta">${template.steps} steps</div>
              <div class="card-actions">
                <button class="primary-cta">Use Template</button>
                <button class="secondary-cta">Preview</button>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderFlowsScreen() {
  const content = state.flowViewMode === "card" ? renderFlowCards() : renderFlowTable();

  return `
    ${renderTopbar(
      "Test Flows",
      "View all saved flows, run them from one place, and drill into flow details or execution details with a clean V1 layout."
    )}

    <section class="screen-shell">
      <div class="toolbar-row">
        <div class="filter-row">
          <div class="search-box">Search by flow name</div>
          <button class="filter-control">Application <span class="filter-caret">▾</span></button>
          <button class="filter-control">Status <span class="filter-caret">▾</span></button>
          <button class="filter-control">Created By <span class="filter-caret">▾</span></button>
          <button class="filter-control">Last Run Status <span class="filter-caret">▾</span></button>
        </div>
        <div class="toolbar-actions">
          <div class="view-toggle">
            <button class="toggle-button ${state.flowViewMode === "table" ? "active" : ""}" data-view-mode="table">Table</button>
            <button class="toggle-button ${state.flowViewMode === "card" ? "active" : ""}" data-view-mode="card">Cards</button>
          </div>
          <button class="primary-cta" data-open-create>+ Create Flow</button>
        </div>
      </div>

      ${content}
    </section>
  `;
}

function renderFlowDetailsScreen() {
  const flow = getFlow(state.selectedFlowId);
  if (!flow) {
    return "";
  }

  const recentExecutions = getFlowExecutions(flow.id);

  return `
    ${renderTopbar(
      flow.name,
      "Flow details with workflow visualization, step-level inspection, and recent executions."
    )}

    <section class="screen-shell">
      <div class="hero-card">
        <div>
          <div class="hero-kicker">${flow.application}</div>
          <h2>${flow.name}</h2>
          <p>${flow.description}</p>
        </div>
        <div class="hero-actions">
          <button class="secondary-cta" data-back-flows>Back to All Flows</button>
          <button class="primary-cta" data-run-flow="${flow.id}">Run Flow</button>
          <button class="secondary-cta">Edit Flow</button>
          <button class="secondary-cta">Duplicate</button>
          <button class="secondary-cta danger">Delete</button>
        </div>
      </div>

      ${renderFlowCanvas(flow)}

      ${renderFlowStepsSection(flow)}

      <section class="panel recent-panel">
        <div class="panel-head">
          <h3>Recent Executions</h3>
          <span class="panel-note">Latest runs for this flow</span>
        </div>
        <div class="table-shell">
          <table class="data-table">
            <thead>
              <tr>
                <th>Run ID</th>
                <th>Triggered By</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${recentExecutions
                .map(
                  (execution) => `
                    <tr>
                      <td>${execution.id}</td>
                      <td>${execution.triggeredBy}</td>
                      <td>${execution.startedAt}</td>
                      <td>${execution.completedAt}</td>
                      <td>${execution.duration}</td>
                      <td>${statusBadge(execution.status)}</td>
                      <td>
                        <div class="action-row">
                          <button class="table-action" data-view-execution="${execution.id}">View Execution</button>
                          <button class="table-action muted">Download Logs</button>
                        </div>
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderExecutionDetailsScreen() {
  const execution = getExecution(state.selectedExecutionId);
  const flow = execution ? getFlow(execution.flowId) : null;

  if (!execution || !flow) {
    return "";
  }

  return `
    ${renderTopbar(
      "Execution Details",
      "Run summary with per-step status, input snapshot, output snapshot, logs, and error details."
    )}

    <section class="screen-shell">
      <div class="hero-card">
        <div>
          <div class="hero-kicker">${flow.name}</div>
          <h2>${execution.id}</h2>
          <p>${statusBadge(execution.status)} Triggered by ${execution.triggeredBy} in ${execution.environment} using ${execution.dataSet}.</p>
        </div>
        <div class="hero-actions">
          <button class="secondary-cta" data-view-flow="${flow.id}">Back to Flow</button>
          <button class="primary-cta" data-run-flow="${flow.id}">Run Flow</button>
        </div>
      </div>

      <div class="summary-grid">
        <article class="summary-card"><span>Flow Name</span><strong>${flow.name}</strong></article>
        <article class="summary-card"><span>Run ID</span><strong>${execution.id}</strong></article>
        <article class="summary-card"><span>Status</span><strong>${execution.status}</strong></article>
        <article class="summary-card"><span>Triggered By</span><strong>${execution.triggeredBy}</strong></article>
        <article class="summary-card"><span>Started At</span><strong>${execution.startedAt}</strong></article>
        <article class="summary-card"><span>Completed At</span><strong>${execution.completedAt}</strong></article>
        <article class="summary-card"><span>Total Duration</span><strong>${execution.duration}</strong></article>
      </div>

      <section class="step-execution-list">
        ${execution.steps
          .map(
            (step, index) => `
              <article class="execution-card ${getStatusTone(step.status)}">
                <div class="execution-head">
                  <div>
                    <div class="execution-step-kicker">Step ${index + 1}</div>
                    <h3>${step.name}</h3>
                  </div>
                  ${statusBadge(step.status)}
                </div>
                <div class="execution-meta">
                  <div class="mini-stat"><span>Duration</span><strong>${step.duration}</strong></div>
                  <div class="mini-stat"><span>Input Snapshot</span><strong>${step.inputSnapshot}</strong></div>
                  <div class="mini-stat"><span>Output Snapshot</span><strong>${step.outputSnapshot}</strong></div>
                </div>
                <div class="logs-block">
                  <div class="logs-title">Logs</div>
                  ${step.logs.length ? step.logs.map((log) => `<div class="log-line">${log}</div>`).join("") : `<div class="log-line muted">No logs captured</div>`}
                </div>
                ${step.errorMessage ? `<div class="error-box">Error: ${step.errorMessage}</div>` : ""}
              </article>
            `
          )
          .join("")}
      </section>
    </section>
  `;
}

function renderRunModal() {
  if (!state.showRunModal) {
    return "";
  }

  const flow = getFlow(state.runFlowId);
  const hasPreviousFailedRun = flow ? getFlowExecutions(flow.id).some((execution) => execution.status === "Failed") : false;

  return `
    <div class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-kicker">Run Flow</div>
        <h2>${flow ? flow.name : "Selected Flow"}</h2>
        <div class="modal-fields">
          <div class="field">
            <label>Environment</label>
            <button class="field-button" data-run-field="environment">${state.runForm.environment}</button>
          </div>
          <div class="field">
            <label>Input data set / DDT file</label>
            <button class="field-button" data-run-field="dataSet">${state.runForm.dataSet}</button>
          </div>
          <label class="check-row">
            <input type="checkbox" data-check="stopOnFailure" ${state.runForm.stopOnFailure ? "checked" : ""} />
            <span>Stop on failure</span>
          </label>
          ${hasPreviousFailedRun ? `
            <label class="check-row">
              <input type="checkbox" data-check="resumeFromFailed" ${state.runForm.resumeFromFailed ? "checked" : ""} />
              <span>Resume from failed step</span>
            </label>
          ` : ""}
        </div>
        <div class="modal-actions">
          <button class="secondary-cta" data-close-run>Cancel</button>
          <button class="primary-cta" data-start-run>Start Run</button>
        </div>
      </div>
    </div>
  `;
}

function renderCreateModal() {
  if (!state.showCreateModal) {
    return "";
  }

  return `
    <div class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-kicker">Create Flow</div>
        <h2>Create a new flow draft</h2>
        <div class="modal-fields">
          <div class="field">
            <label>Flow Name</label>
            <div class="field-button static">New Employee Lifecycle Draft</div>
          </div>
          <div class="field">
            <label>Application</label>
            <div class="field-button static">Workday</div>
          </div>
          <div class="field">
            <label>Template</label>
            <div class="field-button static">Employee Lifecycle Template</div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="secondary-cta" data-close-create>Cancel</button>
          <button class="primary-cta" data-create-draft>Create Draft</button>
        </div>
      </div>
    </div>
  `;
}

function render() {
  const content =
    state.screen === "flow-details"
      ? renderFlowDetailsScreen()
      : state.screen === "execution-details"
        ? renderExecutionDetailsScreen()
        : renderFlowsScreen();

  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="main-shell">
        ${content}
      </main>
      ${renderRunModal()}
      ${renderCreateModal()}
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextScreen = button.getAttribute("data-screen");
      if (nextScreen === "recent-runs") {
        state.screen = "flows";
        state.activeFlowTab = "recent";
      } else {
        navigateToFlows();
        return;
      }
      render();
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFlowTab = button.getAttribute("data-tab");
      state.screen = "flows";
      render();
    });
  });

  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.flowViewMode = button.getAttribute("data-view-mode");
      render();
    });
  });

  document.querySelectorAll("[data-view-flow]").forEach((button) => {
    button.addEventListener("click", () => {
      openFlow(button.getAttribute("data-view-flow"));
    });
  });

  document.querySelectorAll("[data-select-node]").forEach((button) => {
    button.addEventListener("click", () => {
      const [flowId, stepId] = button.getAttribute("data-select-node").split(":");
      selectCanvasNode(flowId, stepId);
    });
  });

  document.querySelectorAll("[data-drag-node]").forEach((node) => {
    node.addEventListener("dragstart", (event) => {
      const nodeKey = node.getAttribute("data-drag-node");
      state.draggingNodeKey = nodeKey;
      node.classList.add("dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", nodeKey);
      }
    });

    node.addEventListener("dragend", () => {
      state.draggingNodeKey = null;
      node.classList.remove("dragging");
      document.querySelectorAll("[data-drop-zone]").forEach((zone) => {
        zone.classList.remove("drop-before", "drop-after");
      });
      document.querySelectorAll("[data-drag-node]").forEach((dragNode) => {
        dragNode.classList.remove("dragging");
      });
    });
  });

  document.querySelectorAll("[data-drop-zone]").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      if (!state.draggingNodeKey) {
        return;
      }

      event.preventDefault();
      const [, draggedStepId] = state.draggingNodeKey.split(":");
      const [, targetStepId] = zone.getAttribute("data-drop-zone").split(":");

      if (draggedStepId === targetStepId) {
        zone.classList.remove("drop-before", "drop-after");
        return;
      }

      const rect = zone.getBoundingClientRect();
      const rowDirection = zone.getAttribute("data-row-direction");
      const isReverse = rowDirection === "reverse";
      const isLeftHalf = event.clientX - rect.left < rect.width / 2;
      const dropPosition = isReverse ? (isLeftHalf ? "after" : "before") : isLeftHalf ? "before" : "after";
      zone.classList.toggle("drop-before", dropPosition === "before");
      zone.classList.toggle("drop-after", dropPosition === "after");
    });

    zone.addEventListener("dragleave", (event) => {
      if (!zone.contains(event.relatedTarget)) {
        zone.classList.remove("drop-before", "drop-after");
      }
    });

    zone.addEventListener("drop", (event) => {
      if (!state.draggingNodeKey) {
        return;
      }

      event.preventDefault();
      const [flowId, draggedStepId] = state.draggingNodeKey.split(":");
      const [, targetStepId] = zone.getAttribute("data-drop-zone").split(":");
      const rect = zone.getBoundingClientRect();
      const rowDirection = zone.getAttribute("data-row-direction");
      const isReverse = rowDirection === "reverse";
      const isLeftHalf = event.clientX - rect.left < rect.width / 2;
      const dropPosition = isReverse ? (isLeftHalf ? "after" : "before") : isLeftHalf ? "before" : "after";

      reorderFlowSteps(flowId, draggedStepId, targetStepId, dropPosition);
      state.draggingNodeKey = null;
      render();
    });
  });

  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      changeCanvasZoom(button.getAttribute("data-zoom"));
    });
  });

  document.querySelectorAll("[data-canvas-viewport]").forEach((viewport) => {
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let startScrollTop = 0;
    let onMouseMove;
    let onMouseUp;

    viewport.addEventListener("mousedown", (event) => {
      if (event.target.closest(".flow-node") || event.target.closest(".table-action") || event.target.closest(".primary-cta") || event.target.closest(".secondary-cta")) {
        return;
      }

      isPanning = true;
      viewport.classList.add("is-panning");
      startX = event.clientX;
      startY = event.clientY;
      startScrollLeft = viewport.scrollLeft;
      startScrollTop = viewport.scrollTop;
      event.preventDefault();

      onMouseMove = (moveEvent) => {
        if (!isPanning) {
          return;
        }

        viewport.scrollLeft = startScrollLeft - (moveEvent.clientX - startX);
        viewport.scrollTop = startScrollTop - (moveEvent.clientY - startY);
      };

      onMouseUp = () => {
        if (isPanning) {
          isPanning = false;
          viewport.classList.remove("is-panning");
        }
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
  });

  document.querySelectorAll("[data-view-execution]").forEach((button) => {
    button.addEventListener("click", () => {
      openExecution(button.getAttribute("data-view-execution"));
    });
  });

  document.querySelectorAll("[data-step-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      const [flowId, stepId] = button.getAttribute("data-step-detail").split(":");
      toggleStepDetails(flowId, stepId);
    });
  });

  document.querySelectorAll("[data-step-screenshot]").forEach((button) => {
    button.addEventListener("click", () => {
      const [flowId, stepId] = button.getAttribute("data-step-screenshot").split(":");
      toggleStepScreenshot(flowId, stepId);
    });
  });

  document.querySelectorAll("[data-run-flow]").forEach((button) => {
    button.addEventListener("click", () => {
      openRunModal(button.getAttribute("data-run-flow"));
    });
  });

  document.querySelectorAll("[data-back-flows]").forEach((button) => {
    button.addEventListener("click", navigateToFlows);
  });

  document.querySelectorAll("[data-close-run]").forEach((button) => {
    button.addEventListener("click", closeRunModal);
  });

  document.querySelectorAll("[data-start-run]").forEach((button) => {
    button.addEventListener("click", startRun);
  });

  document.querySelectorAll("[data-open-create]").forEach((button) => {
    button.addEventListener("click", openCreateModal);
  });

  document.querySelectorAll("[data-close-create]").forEach((button) => {
    button.addEventListener("click", closeCreateModal);
  });

  document.querySelectorAll("[data-create-draft]").forEach((button) => {
    button.addEventListener("click", createDraftFlow);
  });

  document.querySelectorAll("[data-run-field='environment']").forEach((button) => {
    button.addEventListener("click", () => {
      state.runForm.environment = state.runForm.environment === "UAT" ? "Preview" : state.runForm.environment === "Preview" ? "Production" : "UAT";
      render();
    });
  });

  document.querySelectorAll("[data-run-field='dataSet']").forEach((button) => {
    button.addEventListener("click", () => {
      state.runForm.dataSet =
        state.runForm.dataSet === "Employee Lifecycle DDT" ? "Employee Cleanup DDT" : "Employee Lifecycle DDT";
      render();
    });
  });

  document.querySelectorAll("[data-check='stopOnFailure']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.runForm.stopOnFailure = checkbox.checked;
    });
  });

  document.querySelectorAll("[data-check='resumeFromFailed']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.runForm.resumeFromFailed = checkbox.checked;
    });
  });
}

window.addEventListener("hashchange", () => {
  applyHashRoute();
  render();
});

if (!window.location.hash) {
  window.location.hash = ROUTES.flows;
} else {
  applyHashRoute();
  render();
}
