/* RSM Publishing Services: presentation-only, seven-stage operational workflow.
   Existing panel nodes and their event listeners are moved, never recreated. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('workspace');
  if (!root || document.getElementById('rsmWorkflowStages')) return;
  const sections = Array.from(root.querySelectorAll('section.card'));
  const byName = (name) => sections.find(s => s.querySelector('h2')?.textContent.trim() === name);
  const get = (id) => document.getElementById(id) || byName(id);
  const stages = [
    ['Application, Agreement & Payment', ['applicationCenter','signwellIntegration','paymentCenter']],
    ['Author Onboarding & Manuscript Intake', ['authorInvitations','applicantManuscriptCenter','manuscriptRecoveryCenter','Publishing Projects','Create a Publishing Project','Manage Project','Project Details','Upload a Project Document','submissionCenter']],
    ['Manuscript Processing', ['manuscriptProcessing','rsmEditingEngine']],
    ['Editorial Audit & Quality Assurance', ['editorialAuditCenter','Add an Editorial Finding','checklistCenter','editorialStaging']],
    ['Author Review & Approval', []],
    ['Book Production & Proofing', ['Publication Readiness QA']],
    ['Final Payment & Publication Readiness', ['aiCostCenter','Operational Notes']]
  ];
  const holder = document.createElement('div');
  holder.id = 'rsmWorkflowStages';
  holder.style.cssText = 'display:flex;flex-direction:column;gap:22px';
  const stats = root.querySelector('section.grid');
  if (stats) stats.after(holder); else root.prepend(holder);
  const used = new Set();
  stages.forEach(([heading, ids], index) => {
    const stage = document.createElement('section');
    stage.className = 'rsm-workflow-stage';
    stage.setAttribute('aria-label', heading);
    const title = document.createElement('h2');
    title.textContent = (index + 1) + '. ' + heading;
    title.style.cssText = 'color:#d6ae5a;border-bottom:2px solid #76613d;padding:12px 0;margin:0 0 16px;font-size:22px';
    stage.append(title);
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
