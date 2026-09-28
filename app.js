const views = {
  dashboard: "Management Dashboard",
  masters: "Admin And Masters",
  inventory: "Inventory And Roll Tracking",
  production: "Production Flow",
  reports: "Bangalore Reports",
  quality: "Quality Control",
  dispatch: "Dispatch And Integrations",
  traceability: "Traceability"
};

const flowSteps = [
  ["GRN", "ROLL-LTH-8842 received and inspected"],
  ["Issue", "18.4 sq m issued to cutting"],
  ["Cutting", "Bundle BND-5521 created"],
  ["Stitching", "654 pcs completed, 18 rework"],
  ["QC/Packing", "FG-BLR-7784 packed"],
  ["Dispatch", "DSP-BLR-26-0144 ready"]
];

const kanbanData = [
  ["Cutting", ["BND-5521 - 180 pcs", "BND-5522 - 162 pcs"]],
  ["Stitching", ["BND-5518 - 144 pcs", "BND-5519 - 168 pcs"]],
  ["Assembly", ["BND-5514 - 120 pcs"]],
  ["Final QC", ["BND-5509 - 96 pcs", "BND-5510 - 102 pcs"]],
  ["Packing", ["FG-BLR-7784 - 426 pcs"]]
];

const traceNodes = [
  ["Dispatch", "DSP-BLR-26-0144", "426 pcs shipped to Hyundai"],
  ["FG Batch", "FG-BLR-7784", "Packed after final QC"],
  ["Work Order", "WO-BLR-2409", "Hyundai black rear seat cover"],
  ["Bundle", "BND-5521", "Created at cutting"],
  ["Roll", "ROLL-LTH-8842", "Black leather, shade A2"],
  ["Supplier Lot", "SL-4821", "Incoming QC passed"]
];

const bangaloreKpis = [
  ["Stitching efficiency", "91.8%", "Target 95%"],
  ["First-pass QC", "94.2%", "18 pcs rework"],
  ["Leather yield", "87.0%", "Target 88%"],
  ["Rework cost estimate", "INR 8,460", "Today"],
  ["Dispatch adherence", "96.5%", "3 schedules"]
];

const reportCards = [
  ["Daily Production", "1,824 / 2,160", "Line B is 66 pcs behind plan"],
  ["WIP", "318 bundles", "Stitching has the largest queue"],
  ["Quality", "2.8% rework", "Top defect: seam alignment"],
  ["Material/Yield", "87% leather yield", "ROLL-FAB-3320 needs review"],
  ["Dispatch", "426 pcs ready", "ASN draft pending approval"],
  ["Productivity", "41.5 std hrs saved", "Line A ahead of standard"]
];

const stitchingStyles = [
  ["Single stitch", "Std 0.82 min", "Actual 0.79 min", "Operator Kavitha", "Juki-12", "0 defects", "0 rework"],
  ["Double stitch", "Std 1.24 min", "Actual 1.39 min", "Operator Ramesh", "Juki-18", "7 defects", "18 rework"],
  ["Decorative top stitch", "Std 1.05 min", "Actual 1.08 min", "Operator Farah", "Juki-16", "2 defects", "3 rework"],
  ["Overlock edge stitch", "Std 0.74 min", "Actual 0.72 min", "Operator Sanju", "Pegasus-04", "0 defects", "0 rework"],
  ["Reinforced seam", "Std 1.48 min", "Actual 1.51 min", "Operator Nirmala", "Juki-22", "1 defect", "2 rework"]
];

const improvementActions = [
  ["Retrain double stitch operation", "Rework %", "Seam alignment rework is concentrated on Line B double stitch."],
  ["Assign senior operator for first 50 pcs", "First-pass QC", "Stabilize high-rework style before releasing full run."],
  ["Review needle/thread combination", "Defect rate", "Black leather rear cover shows skipped stitch risk."],
  ["Add first-piece approval gate", "Scan compliance", "Supervisor approval before full stitching run."],
  ["Track style-wise standard variance", "Efficiency", "Double stitch is 0.15 min slower than standard."],
  ["Flag supplier/roll yield loss", "Yield %", "ROLL-FAB-3320 is below expected material yield."]
];

let activeStep = 4;

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewName);
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });
  document.getElementById("view-title").textContent = views[viewName];
}

function toast(message) {
  const box = document.getElementById("toast");
  box.textContent = message;
  box.classList.add("show");
  window.clearTimeout(window.toastTimer);
  window.toastTimer = window.setTimeout(() => box.classList.remove("show"), 2600);
}

function renderFlow() {
  const rail = document.getElementById("flow-rail");
  rail.innerHTML = flowSteps
    .map((step, index) => `
      <button class="flow-step ${index <= activeStep ? "active" : ""}" data-step="${index}">
        <span class="step-number">${index + 1}</span>
        <strong>${step[0]}</strong>
        <small>${step[1]}</small>
      </button>
    `)
    .join("");
}

function renderKanban() {
  const board = document.getElementById("kanban");
  board.innerHTML = kanbanData
    .map(([title, tickets]) => `
      <div class="kanban-column">
        <strong>${title}</strong>
        ${tickets.map((ticket) => `
          <button class="bundle-ticket" data-view-target="traceability">
            <span>${ticket}</span>
            <small>Tap to trace</small>
          </button>
        `).join("")}
      </div>
    `)
    .join("");
}

function renderTrace() {
  const chain = document.getElementById("trace-chain");
  chain.innerHTML = traceNodes
    .map(([label, id, detail]) => `
      <article class="trace-node">
        <span>${label}</span>
        <strong>${id}</strong>
        <small>${detail}</small>
      </article>
    `)
    .join("");
}

function renderKpis() {
  const grid = document.getElementById("bangalore-kpis");
  grid.innerHTML = bangaloreKpis
    .map(([label, value, note]) => `
      <article class="metric-card">
        <span>${label}</span>
        <strong>${value}</strong>
        <small>${note}</small>
      </article>
    `)
    .join("");
}

function renderReports() {
  const grid = document.getElementById("report-cards");
  grid.innerHTML = reportCards
    .map(([title, value, note]) => `
      <button class="report-card">
        <span>${title}</span>
        <strong>${value}</strong>
        <small>${note}</small>
      </button>
    `)
    .join("");
}

function renderStitchingStyles() {
  const grid = document.getElementById("stitching-styles");
  grid.innerHTML = stitchingStyles
    .map(([style, standard, actual, operator, machine, defects, rework]) => `
      <article class="stitch-card">
        <div>
          <span class="eyebrow">${machine}</span>
          <h3>${style}</h3>
        </div>
        <div class="mini-metrics">
          <span>${standard}</span>
          <span>${actual}</span>
          <span>${operator}</span>
          <span>${defects}</span>
          <span>${rework}</span>
        </div>
      </article>
    `)
    .join("");
}

function renderImprovements() {
  const list = document.getElementById("improvement-actions");
  list.innerHTML = improvementActions
    .map(([title, metric, detail]) => `
      <button class="improvement-card">
        <span>${metric}</span>
        <strong>${title}</strong>
        <small>${detail}</small>
      </button>
    `)
    .join("");
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) setView(nav.dataset.view);

  const target = event.target.closest("[data-view-target]");
  if (target) setView(target.dataset.viewTarget);

  const step = event.target.closest("[data-step]");
  if (step) {
    activeStep = Number(step.dataset.step);
    renderFlow();
    toast(`${flowSteps[activeStep][0]} selected`);
  }
});

document.getElementById("run-demo").addEventListener("click", () => {
  activeStep = 0;
  renderFlow();
  let index = 0;
  const timer = window.setInterval(() => {
    activeStep = index;
    renderFlow();
    index += 1;
    if (index > flowSteps.length) {
      window.clearInterval(timer);
      document.getElementById("actual-output").textContent = "1,932";
      toast("Demo flow completed: GRN to dispatch traceability is connected");
    }
  }, 520);
});

document.getElementById("scan-next").addEventListener("click", () => {
  toast("Bundle scan accepted: BND-5521 moved to next operation");
});

document.getElementById("print-label").addEventListener("click", () => {
  const screen = document.getElementById("agent-screen");
  screen.innerHTML = "<span>BLR-PRINT-01</span><strong>Printing ROLL-LTH-8842 label</strong><small>Status: printed successfully</small>";
  toast("Label job sent to local print gateway");
});

document.getElementById("generate-asn").addEventListener("click", () => {
  document.getElementById("asn-state").textContent = "Generated";
  toast("Sample OEM ASN generated for DSP-BLR-26-0144");
});

document.getElementById("trace-button").addEventListener("click", () => {
  renderTrace();
  toast(`Trace complete for ${document.getElementById("trace-input").value}`);
});

renderFlow();
renderKanban();
renderTrace();
renderKpis();
renderReports();
renderStitchingStyles();
renderImprovements();
