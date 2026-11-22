/* RSM Publishing Services: presentation-only, seven-stage operational workflow.
   Existing panel nodes and their event listeners are moved, never recreated. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('workspace');
  if (!root || document.getElementById('rsmWorkflowStages')) return;
  const sections = Array.from(root.querySelectorAll('section.card')).filter(s => !s.closest('section.card section.card'));
  const byName = (name) => sections.find(s => s.querySelector('h2')?.textContent.trim() === name);
  const get = (id) => document.getElementById(id) || byName(id);
  const stages = [
    ['Application, Agreement & Payment', ['applicationCenter','signwellIntegration','paymentCenter','rsmOperationsCenter']],
    ['Author Onboarding & Manuscript Intake', ['authorInvitations','applicantManuscriptCenter','manuscriptRecoveryCenter','Publishing Projects','Create a Publishing Project','Manage Project','Project Details','Upload a Project Document','submissionCenter']],
    ['Manuscript Processing', ['manuscriptProcessing','rsmEditingEngine']],
    ['Editorial Audit & Quality Assurance', ['editorialAuditCenter','Add an Editorial Finding']],
    ['Author Review & Approval', ['checklistCenter','editorialStaging']],
    ['Book Production & Proofing', ['Publication Readiness QA']],
    ['Final Payment & Publication Readiness', ['aiCostCenter','Operational Notes']]
  ];
  const style = document.createElement('style');
  style.textContent = '#rsmWorkflowNav{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 24px}#rsmWorkflowNav a{color:#f8e2b1;text-decoration:none;border:1px solid #76613d;background:#202024;border-radius:8px;padding:9px 12px;font-size:13px;font-weight:700}#rsmWorkflowNav a:focus-visible{outline:3px solid #d6ae5a}#rsmWorkflowStages .rsm-workflow-stage{scroll-margin-top:20px;border-top:1px solid #51483b;padding-top:12px}#rsmWorkflowStages .rsm-workflow-stage:empty{display:none}@media(max-width:700px){#rsmWorkflowNav{display:grid;grid-template-columns:1fr 1fr}#rsmWorkflowNav a{font-size:12px}}';
  document.head.append(style);
  const nav = document.createElement('nav');
  nav.id = 'rsmWorkflowNav';
  nav.setAttribute('aria-label', 'Publishing workflow stages');
  const holder = document.createElement('div');
  holder.id = 'rsmWorkflowStages';
  holder.style.cssText = 'display:flex;flex-direction:column;gap:22px';
  const stats = root.querySelector('section.grid');
  if (stats) { stats.after(nav); nav.after(holder); } else { root.prepend(nav); nav.after(holder); }
  const used = new Set();
  stages.forEach(([heading, ids], index) => {
    const stage = document.createElement('section');
    stage.className = 'rsm-workflow-stage';
    stage.id = 'rsm-workflow-stage-' + (index + 1);
    const jump = document.createElement('a');
    jump.href = '#' + stage.id;
    jump.textContent = (index + 1) + '. ' + heading;
    nav.append(jump);
    stage.setAttribute('aria-label', heading);
    const title = document.createElement('h2');
    title.textContent = (index + 1) + '. ' + heading;
    title.style.cssText = 'color:#d6ae5a;border-bottom:2px solid #76613d;padding:12px 0;margin:0 0 16px;font-size:22px';
    stage.append(title);
    if (index === 6) {
      const note = document.createElement('p');
      note.className = 'note';
      note.textContent = 'Final payment and publication release remain subject to verified completion, contractual requirements, and administrator approval. Use the Payment Management Center in Stage 1 for payment records.';
      stage.append(note);
    }
    ids.forEach(id => {
      const panel = get(id);
      if (!panel || used.has(panel) || !root.contains(panel)) return;
      used.add(panel);
      stage.append(panel);
    });
    holder.append(stage);
  });
  // Preserve newly added/unmapped panels, without dropping functionality.
  const remaining = sections.filter(s => root.contains(s) && !used.has(s) && !s.closest('#rsmWorkflowStages'));
  if (remaining.length) {
    const extra = document.createElement('section');
    extra.setAttribute('aria-label', 'Additional administration controls');
    const heading = document.createElement('h2');
    heading.textContent = 'Additional Administration Controls';
    heading.style.cssText = 'color:#d6ae5a;border-bottom:2px solid #76613d;padding:12px 0;margin:0 0 16px;font-size:22px';
    extra.append(heading);
    remaining.forEach(s => extra.append(s));
    holder.append(extra);
  }
});
