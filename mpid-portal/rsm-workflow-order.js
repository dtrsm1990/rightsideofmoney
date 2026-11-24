/* RSM Publishing Services: presentation-only, seven-stage operational workflow.
   Existing panel nodes and their event listeners are moved, never recreated. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('workspace');
  if (!root || document.getElementById('rsmWorkflowStages')) return;
  const sections = Array.from(root.querySelectorAll('section.card')).filter(s => !s.closest('section.card section.card'));
  const byName = (name) => sections.find(s => s.querySelector('h2')?.textContent.trim() === name);
  const get = (id) => document.getElementById(id) || byName(id);
  const stages = [
    ['Application, Agreement & Initial Payment', ['rsmNextActionCenter','applicationCenter','signwellIntegration','paymentCenter','rsmOperationsCenter']],
    ['Author Onboarding & Manuscript Intake', ['authorInvitations','Publishing Projects','Create a Publishing Project','Manage Project','applicantManuscriptCenter','manuscriptRecoveryCenter','submissionCenter','Upload a Project Document','Project Details']],
    ['Manuscript Processing', ['rsmEditingEngine','manuscriptProcessing']],
    ['Editorial Audit & Quality Assurance', ['editorialAuditCenter','Add an Editorial Finding','editorialStaging']],
    ['Author Review & Approval', ['checklistCenter']],
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
      note.textContent = 'Before final delivery, verify the final payment in the Stage 1 Payment Management Center, confirm author approvals and production QA, and authorize publication readiness. This stage does not automatically publish or charge the author.';
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
  // Keep the legacy manual processing tools accessible without cluttering the active workflow.
  const legacyProcessing=document.getElementById('manuscriptProcessing');
  if(legacyProcessing){
    legacyProcessing.hidden=true;
    const legacyStage=document.getElementById('rsm-workflow-stage-3');
    if(legacyStage){
      const legacyTools=document.createElement('details');
      legacyTools.id='rsmLegacyProcessingTools';
      const legacySummary=document.createElement('summary');
      legacySummary.textContent='Legacy Manual Processing (advanced troubleshooting only)';
      legacyTools.append(legacySummary,legacyProcessing);
      legacyStage.append(legacyTools);
      legacyTools.addEventListener('toggle',()=>{legacyProcessing.hidden=!legacyTools.open});
    }
  }
  // Private, administrator-only assembled manuscript intake.
  const intakePanel=document.createElement('section');
  intakePanel.className='card';
  intakePanel.id='rsmAssembledIntake';
  const intakeTitle=document.createElement('h2');intakeTitle.textContent='Complete Manuscript Intake';
  const intakeNote=document.createElement('p');intakeNote.className='note';intakeNote.textContent='Upload the combined DOCX with foreword. The original manuscript remains unchanged. The new version enters the private processing queue; author release requires separate approval.';
  const projectSelect=document.createElement('select');projectSelect.setAttribute('aria-label','Publishing project');
  const initialOption=document.createElement('option');initialOption.value='';initialOption.textContent='Choose publishing project';projectSelect.append(initialOption);
  const fileInput=document.createElement('input');fileInput.type='file';fileInput.accept='.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document';fileInput.setAttribute('aria-label','Complete manuscript DOCX');
  const uploadButton=document.createElement('button');uploadButton.type='button';uploadButton.textContent='Register Complete Manuscript and Queue Processing';
  const uploadStatus=document.createElement('p');uploadStatus.setAttribute('role','status');uploadStatus.setAttribute('aria-live','polite');
  const intakeRefresh=document.createElement('button');intakeRefresh.type='button';intakeRefresh.className='secondary';intakeRefresh.textContent='Refresh Projects';
  intakePanel.append(intakeTitle,intakeNote,projectSelect,fileInput,uploadButton,intakeRefresh,uploadStatus);
  const intakeStage=document.getElementById('rsm-workflow-stage-2');
  if(intakeStage)intakeStage.insertBefore(intakePanel,intakeStage.children[1]||null);
  const getClient=async()=>{
    const cfg=JSON.parse(localStorage.getItem('mpid_admin_public_supabase_config_v1')||'null');
    if(!cfg?.url||!cfg?.key)throw new Error('Connect and sign in to Supabase first');
    const lib=await import('https://esm.sh/@supabase/supabase-js@2');
    const client=lib.createClient(cfg.url,cfg.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
    const {data:{session}}=await client.auth.getSession();
    if(!session)throw new Error('Administrator sign-in required');
    const {data:profile,error:profileError}=await client.from('mpid_profiles').select('role').eq('id',session.user.id).single();
    if(profileError||profile?.role!=='admin')throw new Error('Administrator role required');
    return {client,session,cfg};
  };
  const loadIntakeProjects=async()=>{
    try{
      const {client}=await getClient();
      const {data,error}=await client.from('mpid_projects').select('id,title,is_test').order('title');
      if(error)throw error;
      const previous=projectSelect.value;
      projectSelect.replaceChildren(initialOption);
      (data||[]).filter(p=>!p.is_test).forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.title;projectSelect.append(o)});
      if(Array.from(projectSelect.options).some(o=>o.value===previous))projectSelect.value=previous;
      uploadStatus.textContent='Select a project and the complete DOCX to register its next version.';
    }catch(e){uploadStatus.textContent=e?.message||String(e)}
  };
  intakeRefresh.addEventListener('click',loadIntakeProjects);
  uploadButton.addEventListener('click',async()=>{
    uploadButton.disabled=true;
    try{
      if(!projectSelect.value)throw new Error('Select a publishing project');
      const file=fileInput.files?.[0];
      if(!file||!file.name.toLowerCase().endsWith('.docx'))throw new Error('Choose the complete DOCX manuscript');
      const {session,cfg}=await getClient();
      const form=new FormData();form.append('project_id',projectSelect.value);form.append('file',file,file.name);
      uploadStatus.textContent='Securely uploading and registering the manuscript version...';
      const response=await fetch(cfg.url+'/functions/v1/rsm-assembled-manuscript-upload',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key},body:form});
      const result=await response.json();
      if(!response.ok||!result.ok)throw new Error(result.error||'Private upload failed');
      uploadStatus.textContent='Registered manuscript version '+result.version+'. Processing intake queued. Author release remains locked.';
      fileInput.value='';
      document.getElementById('rsmNextActionRefresh')?.click();
    }catch(e){uploadStatus.textContent=e?.message||String(e)}
    finally{uploadButton.disabled=false}
  });
  document.addEventListener('click',e=>{if(e.target?.id==='refreshDashboard'||e.target?.id==='loginButton')setTimeout(loadIntakeProjects,900)});
  // Legacy upload is retained in code for recovery only; dashboard processing is automatic.
  // Administrator-only private report generation and review, integrated in Stage 4.
  const reportPanel=document.createElement('section');reportPanel.className='card';reportPanel.id='rsmEditorialReportPanel';
  const reportTitle=document.createElement('h2');reportTitle.textContent='Final Manuscript Review & Editorial Approval';
  const reportIntro=document.createElement('p');reportIntro.className='note';reportIntro.textContent='Review the current private manuscript and editorial findings, then approve the exact verified version for author review. Earlier drafts remain in history. Approval does not release anything to the author.';
  const reportProject=document.createElement('select');reportProject.setAttribute('aria-label','Editorial report project');
  const reportPlaceholder=document.createElement('option');reportPlaceholder.value='';reportPlaceholder.textContent='Choose publishing project';reportProject.append(reportPlaceholder);
  const reportActions=document.createElement('div');reportActions.className='actions';
  const generateReport=document.createElement('button');generateReport.type='button';generateReport.textContent='Regenerate Editorial Report';
  const refreshReport=document.createElement('button');refreshReport.type='button';refreshReport.className='secondary';refreshReport.textContent='Refresh Final Review';
  const reportStatus=document.createElement('p');reportStatus.setAttribute('role','status');reportStatus.setAttribute('aria-live','polite');
  const reportList=document.createElement('div');reportList.className='list';
  reportActions.append(refreshReport);const correctionTools=document.createElement('details');correctionTools.className='rsm-advanced-corrections';const correctionSummary=document.createElement('summary');correctionSummary.textContent='Advanced Corrections (only if needed)';correctionTools.append(correctionSummary,generateReport);reportPanel.append(reportTitle,reportIntro,reportProject,reportActions,reportStatus,reportList,correctionTools);
  const auditStage=document.getElementById('rsm-workflow-stage-4');
  if(auditStage)auditStage.insertBefore(reportPanel,auditStage.children[1]||null);
  // Optional package comparisons are private and independent of the contracted editorial run.
  const comparisonPanel=document.createElement('section');comparisonPanel.className='card';comparisonPanel.id='rsmPackageComparison';
  const comparisonTitle=document.createElement('h2');comparisonTitle.textContent='Manual Package Editorial Audit & Manuscript Editing';
  const comparisonIntro=document.createElement('p');comparisonIntro.className='note';comparisonIntro.textContent='Run a private editorial audit and generate a corrected manuscript using the selected Publish-Ready, Full Launch, or Signature Author editing standard. Does not change the purchased package, master manuscript, contract, payments, or author access. Current engine supports assembled DOCX up to 18,000 extracted characters. The original and contracted package are preserved.';
  const comparisonPackage=document.createElement('select');comparisonPackage.setAttribute('aria-label','Comparison package');
  for(const pkg of ['Publish-Ready','Full Launch','Signature Author']){const opt=document.createElement('option');opt.value=pkg;opt.textContent=pkg;comparisonPackage.append(opt)}
  const comparisonRun=document.createElement('button');comparisonRun.type='button';comparisonRun.textContent='Run Package Audit & Edit Manuscript';
  const comparisonRefresh=document.createElement('button');comparisonRefresh.type='button';comparisonRefresh.className='secondary';comparisonRefresh.textContent='Refresh Package Audit Runs';
  const comparisonStatus=document.createElement('p');comparisonStatus.setAttribute('role','status');comparisonStatus.setAttribute('aria-live','polite');
  const comparisonResults=document.createElement('div');comparisonResults.className='list';
  comparisonPanel.append(comparisonTitle,comparisonIntro,comparisonPackage,comparisonRun,comparisonRefresh,comparisonStatus,comparisonResults);
  if(auditStage)auditStage.insertBefore(comparisonPanel,reportPanel.nextSibling);
  const loadComparisons=async()=>{
    comparisonResults.replaceChildren();if(!reportProject.value){comparisonStatus.textContent='Select the project above.';return}
    const {client}=await getClient();
    const {data,error}=await client.from('rsm_package_comparison_runs').select('id,requested_package,status,manuscript_path,audit_path,error_message,created_at').eq('project_id',reportProject.value).order('created_at',{ascending:false}).limit(20);
    if(error){comparisonStatus.textContent='Comparison history unavailable: '+error.message;return}
    comparisonStatus.textContent=(data||[]).length+' private package audit run(s). Nothing released to author.';
    for(const r of data||[]){
      const item=document.createElement('div');item.className='item';
      const heading=document.createElement('strong');heading.textContent=r.requested_package+' | '+r.status+' | '+new Date(r.created_at).toLocaleString();item.append(heading);
      if(r.error_message){const p=document.createElement('p');p.textContent=r.error_message;item.append(p)}
      for(const [label,path] of [['Download Edited Manuscript',r.manuscript_path],['Download Editorial Audit',r.audit_path]]){
        if(!path||r.status!=='review')continue;
        const b=document.createElement('button');b.type='button';b.className='secondary';b.textContent=label;
        b.addEventListener('click',async()=>{b.disabled=true;try{const {client}=await getClient();const {data:blob,error}=await client.storage.from('mpid-manuscripts').download(path);if(error||!blob)throw error||Error('File unavailable');const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=path.split('/').pop();document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}catch(e){comparisonStatus.textContent='Download failed: '+(e?.message||String(e))}finally{b.disabled=false}});item.append(b);
      }
      comparisonResults.append(item);
    }
  };
  comparisonRefresh.addEventListener('click',()=>loadComparisons().catch(e=>comparisonStatus.textContent=String(e)));
  comparisonRun.addEventListener('click',async()=>{
    if(!reportProject.value){comparisonStatus.textContent='Choose publishing project above.';return}
    const pkg=comparisonPackage.value;
    if(!confirm('Run a PRIVATE editorial audit and manuscript edit for '+pkg+' manuscript and audit package? This may incur AI processing cost. No author release or contract change.'))return;
    comparisonRun.disabled=true;
    try{
      const {session,cfg}=await getClient();
      comparisonStatus.textContent='Processing private '+pkg+' audit and manuscript editing. Please keep this page open.';
      const response=await fetch(cfg.url+'/functions/v1/rsm-package-comparison',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:reportProject.value,requested_package:pkg})});
      const raw=await response.text();let result;try{result=JSON.parse(raw)}catch{throw Error('Processing service returned an unreadable response (HTTP '+response.status+'). Try refreshing the dashboard; if this continues contact support.')}if(!response.ok||!result.ok)throw Error(result.error||'Audit and editing failed (HTTP '+response.status+')');
      await loadComparisons();comparisonStatus.textContent='Private '+pkg+' edited manuscript and audit ready for download and administrator review. No author release.';
    }catch(e){comparisonStatus.textContent='Package audit not completed: '+(e?.message==='Load failed'?'The processing service could not be reached. Refresh this page and retry. If it persists, the connection or service needs attention.':(e?.message||String(e)))}
    finally{comparisonRun.disabled=false}
  });
  reportProject.addEventListener('change',()=>loadComparisons().catch(e=>comparisonStatus.textContent=String(e)));
  const loadReportProjects=async()=>{
    try{
      const {client}=await getClient();
      const {data,error}=await client.from('mpid_projects').select('id,title,is_test').order('title');
      if(error)throw error;
      const previous=reportProject.value;
      reportProject.replaceChildren(reportPlaceholder);
      (data||[]).filter(p=>!p.is_test).forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.title;reportProject.append(o)});
      if(Array.from(reportProject.options).some(o=>o.value===previous))reportProject.value=previous;
      if(!reportProject.value){
        const mainProject=document.getElementById('selectedProject')?.value;
        const preferred=[mainProject,projectSelect.value].find(id=>id&&Array.from(reportProject.options).some(o=>o.value===id));
        if(preferred)reportProject.value=preferred;
        else if(reportProject.options.length===2)reportProject.selectedIndex=1;
      }
      // Stage 4 refreshes through its existing project-linked report controls.
      await prepareReportAutomatically();
      await loadLocatedFindings();
    }catch(e){reportStatus.textContent=e?.message||String(e)}
  };
  // Administrator-only, source-located editorial finding review. No manual finding edits.
  const findingPanel=document.createElement('section');findingPanel.className='card';findingPanel.id='rsmLocatedFindings';
  const findingHeading=document.createElement('h2');findingHeading.textContent='Review Editorial Findings by Source Location';
  const findingNote=document.createElement('p');findingNote.className='note';findingNote.textContent='Source page and paragraph are displayed only when recorded. Source PDF pages may differ from final KDP pagination. Findings are private until separately approved for author release.';
  const findingStatus=document.createElement('p');findingStatus.setAttribute('role','status');
  const findingList=document.createElement('div');
  findingPanel.append(findingHeading,findingNote,findingStatus,findingList);
  if(auditStage)auditStage.append(findingPanel);
  const exportFindingReport=document.createElement('button');exportFindingReport.type='button';exportFindingReport.className='secondary';exportFindingReport.textContent='Export Private Editorial Review Report';
  exportFindingReport.title='Export a private administrator-only review document. This does not release findings to the author.';
  findingPanel.insertBefore(exportFindingReport,findingList);
  let currentFindings=[];
  exportFindingReport.addEventListener('click',()=>{
    if(!reportProject.value||!currentFindings.length){findingStatus.textContent='Select a project with findings before exporting.';return}
    const lines=['RSM PUBLISHING SERVICES','PRIVATE EDITORIAL REVIEW REPORT','Project: '+(reportProject.selectedOptions[0]?.textContent||reportProject.value),'Generated: '+new Date().toISOString(),'ADMINISTRATOR REVIEW ONLY. NOT RELEASED TO AUTHOR.','Source PDF pages are not final KDP page numbers. Missing locations are not inferred.',''];
    currentFindings.forEach((f,i)=>{
      lines.push('FINDING '+(i+1),'Severity: '+(f.severity||'Not recorded'),'Category: '+(f.dimension||'Not recorded'),'Status: '+(f.status||'Not recorded'),'Section: '+(f.source_section||'Not recorded'),'Source PDF page: '+(f.source_page||'Not recorded'),'Source paragraph: '+(f.source_paragraph||'Not recorded'),'Finding: '+(f.finding||'Not recorded'),'Original: '+(f.original_excerpt||'Not recorded'),'Proposed correction: '+(f.corrected_excerpt||'Not recorded'),'Recommendation: '+(f.recommendation||'Not recorded'),'Author suggestion: '+(f.author_suggestion||'Not recorded'),'Verification: '+(f.verification_notes||'Not recorded'),'');
    });
    const blob=new Blob([lines.join('\\n')],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='RSM-Private-Editorial-Review-'+reportProject.value+'.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  const loadLocatedFindings=async()=>{
    findingList.replaceChildren();currentFindings=[];
    const id=reportProject.value;
    if(!id){findingStatus.textContent='Choose a publishing project to review findings.';return}
    try{
      const {client}=await getClient();
      const {data,error}=await client.from('mpid_audit_findings').select('id,dimension,severity,status,source_page,source_paragraph,source_section,finding,original_excerpt,corrected_excerpt,recommendation,author_suggestion,verification_notes,change_type,released_to_author').eq('project_id',id).order('created_at',{ascending:false}).limit(250);
      if(error)throw error;
      currentFindings=data||[];
      findingStatus.textContent=currentFindings.length+' private editorial finding(s). Source locations are not final print page numbers.';
      (data||[]).forEach(f=>{
        const card=document.createElement('div');card.className='item';card.style.cssText='padding:14px;margin:10px 0;border:1px solid #665537;border-radius:8px';
        const head=document.createElement('strong');head.textContent=[f.severity||'Unrated',f.dimension||'Editorial',f.status||'Open'].join(' | ');
        const location=document.createElement('p');location.className='muted small';location.textContent='Source: '+[f.source_section||'Section not recorded',f.source_page?'PDF page '+f.source_page:'PDF page not recorded',f.source_paragraph?'paragraph '+f.source_paragraph:'paragraph not recorded'].join(' | ');
        card.append(head,location);
        for(const [label,value] of [['Finding',f.finding],['Original text',f.original_excerpt],['Proposed correction',f.corrected_excerpt],['Recommendation',f.recommendation],['Author suggestion',f.author_suggestion],['Verification',f.verification_notes]]){
          if(!value)continue;
          const line=document.createElement('p');const bold=document.createElement('strong');bold.textContent=label+': ';line.append(bold,document.createTextNode(value));card.append(line);
        }
        const visibility=document.createElement('p');visibility.className='muted small';visibility.textContent=f.released_to_author?'Author visibility recorded':'Private administrator review only';card.append(visibility);findingList.append(card);
      });
    }catch(e){findingStatus.textContent='Unable to load private findings: '+(e?.message||String(e))}
  };
  const cleanDraft=document.createElement('button');cleanDraft.type='button';cleanDraft.className='secondary';cleanDraft.textContent='Regenerate Manuscript Layout (Corrections Only)';
  cleanDraft.title='Create a new private typeset version with bordered VA funding table, bold headings and page numbers; original remains unchanged.';
  correctionTools.append(cleanDraft);
  cleanDraft.addEventListener('click',async()=>{
    cleanDraft.disabled=true;
    try{
      const {client,session,cfg}=await getClient();
      const pid=reportProject.value;if(!pid)throw Error('Select the publishing project.');
      const {data:runs,error}=await client.from('rsm_manuscript_edit_runs').select('id,status,source_document_id,completed_segments,total_segments').eq('project_id',pid).eq('status','review').order('created_at',{ascending:false}).limit(1);
      if(error||!runs?.length)throw error||Error('No completed private editing run.');
      if(!confirm('Generate a new private typeset Word manuscript from '+runs[0].completed_segments+' saved editorial segments? No author release and no AI rerun.'))return;
      reportStatus.textContent='Reconstructing private manuscript paragraphs and removing verified source-PDF artifacts...';
      const response=await fetch(cfg.url+'/functions/v1/rsm-clean-manuscript',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({run_id:runs[0].id})});
      const result=await response.json();if(!response.ok||!result.ok)throw Error(result.error||'Clean manuscript regeneration failed');
      await loadPrivateReports();
      reportStatus.textContent='Clean private DOCX registered: '+result.filename+'. Removed '+result.removed_page_markers+' page labels and '+result.removed_running_headers+' running headers. Review the new file before approval. No author release.';
    }catch(e){reportStatus.textContent='Clean manuscript regeneration failed: '+(e?.message||String(e))}
    finally{cleanDraft.disabled=false}
  });
  const loadPrivateReports=async()=>{
    reportList.replaceChildren();
    if(!reportProject.value){reportStatus.textContent='Choose a project to view private reports.';return}
    try{
      const {client}=await getClient();
      const {data,error}=await client.from('mpid_editorial_deliverables').select('id,file_name,storage_path,document_type,status,created_at').eq('project_id',reportProject.value).order('created_at',{ascending:false}).limit(30);
      if(error)throw error;
      const reports=(data||[]).filter(x=>['editorial_report','edited_manuscript'].includes(x.document_type)||x.storage_path?.includes('/dashboard-reports/')||x.storage_path?.includes('/private-ai-review/'));
      if(!reports.length){reportStatus.textContent='No generated dashboard reports yet.';return}
      const {data:sourceRuns,error:runError}=await client.from('rsm_manuscript_edit_runs').select('id,source_document_id,output_storage_path,report_storage_path,status,qa_status').eq('project_id',reportProject.value).order('created_at',{ascending:false}).limit(20);
      if(runError)throw runError;
      const {data:assembled,error:assembledError}=await client.from('mpid_documents').select('id').eq('project_id',reportProject.value).eq('document_type','assembled_manuscript').is('archived_at',null).order('version',{ascending:false}).limit(1);
      if(assembledError)throw assembledError;
      const workingId=assembled?.[0]?.id;
      const workingRun=(sourceRuns||[]).find(x=>x.source_document_id===workingId&&x.output_storage_path&&x.report_storage_path&&x.status!=='failed');
      const workingPrefix=workingRun?.output_storage_path?.slice(0,workingRun.output_storage_path.lastIndexOf('/')+1);
      const activeReports=workingRun?reports.filter(r=>r.status!=='released'&&/\.docx$|\.pdf$/i.test(r.file_name||'')&&!/^RSM_TEST_/i.test(r.file_name||'')&&(
         r.storage_path===workingRun.output_storage_path||
         r.storage_path===workingRun.report_storage_path||
         (r.storage_path.startsWith(workingPrefix)&&/\.docx$/i.test(r.file_name||'')&&/editorial|audit|edited.manuscript.clean|edited.manuscript.typeset|edited.manuscript.productionreview|edited.manuscript.booklayout/i.test(r.file_name||''))||
         (r.storage_path.includes('/dashboard-reports/')&&r.storage_path.includes(workingRun.id))
       )):[];
      // Prefer the clean replacement for the current run. Never offer the known defective original for approval.
      activeReports.sort((a,b)=>Number(b.file_name?.startsWith('Edited_Manuscript_BookLayout_'))-Number(a.file_name?.startsWith('Edited_Manuscript_BookLayout_'))||Number(b.file_name?.startsWith('Edited_Manuscript_ProductionReview_'))-Number(a.file_name?.startsWith('Edited_Manuscript_ProductionReview_'))||Number(b.file_name?.startsWith('Edited_Manuscript_Typeset_'))-Number(a.file_name?.startsWith('Edited_Manuscript_Typeset_'))||Number(b.file_name?.startsWith('Edited_Manuscript_Clean_'))-Number(a.file_name?.startsWith('Edited_Manuscript_Clean_')));
      const byKind=new Map();
      for(const r of activeReports){
        const kind=r.document_type==='edited_manuscript'||/manuscript|layout/i.test(r.file_name)?'manuscript':'audit';
        if(!byKind.has(kind))byKind.set(kind,r);
      }
      const current=Array.from(byKind.values());
      const history=reports.filter(r=>!current.some(c=>c.id===r.id));
      reportStatus.textContent=workingRun
       ?current.length+' current private DOCX/PDF review document(s) from working manuscript. '+history.length+' historical document(s). QA: '+workingRun.qa_status+'. No author release.'
       :'No current editorial run for the working manuscript. '+history.length+' historical document(s) preserved. Select Generate Report for Admin Review to process the working manuscript. No author release.';
      const historyToggle=document.createElement('button');historyToggle.type='button';historyToggle.className='secondary';historyToggle.textContent='Show Older Reports ('+history.length+')';historyToggle.setAttribute('aria-expanded','false');
      const historyBox=document.createElement('div');historyBox.hidden=true;
      historyToggle.addEventListener('click',()=>{historyBox.hidden=!historyBox.hidden;historyToggle.setAttribute('aria-expanded',String(!historyBox.hidden));historyToggle.textContent=(historyBox.hidden?'Show':'Hide')+' Older Reports ('+history.length+')'});
      const currentBox=document.createElement('div');
      reportList.append(currentBox);
      if(history.length)reportList.append(historyToggle,historyBox);
      const render=(r,target)=>{

        const item=document.createElement('div');item.className='item';
        const title=document.createElement('strong');title.textContent=r.file_name;
        const detail=document.createElement('p');detail.className='muted small';detail.textContent='Status: '+r.status+' | '+new Date(r.created_at).toLocaleString();
        const download=document.createElement('button');download.type='button';download.className='secondary';download.textContent=/\.docx$/i.test(r.file_name)?'Review Final Manuscript (Download)':'Review Editorial Report';
        download.addEventListener('click',async()=>{
          download.disabled=true;
          try{
            const {client}=await getClient();
            const {data,error}=await client.storage.from('mpid-manuscripts').download(r.storage_path);
            if(error||!data)throw error||new Error('Private report unavailable');
            const preview=item.querySelector('.rsm-inline-report')||document.createElement('pre');preview.className='rsm-inline-report';preview.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;max-height:460px;overflow:auto;padding:14px;border:1px solid #6d5731;border-radius:8px';if(/\.txt$/i.test(r.file_name)){preview.textContent=await data.text();if(!preview.parentElement)item.append(preview)}else{const url=URL.createObjectURL(data);const a=document.createElement('a');a.href=url;a.download=r.file_name||'private-editorial-deliverable.docx';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}
          }catch(e){reportStatus.textContent=e?.message||String(e)}
          finally{download.disabled=false}
        });

        // Stage 4 is the sole current-version approval surface. Historical drafts never receive actions.
        if(target===currentBox && workingRun && r.status!=='released'){
          const action=(label,fn)=>{const b=document.createElement('button');b.type='button';b.className='secondary';b.style.marginLeft='8px';b.textContent=label;b.addEventListener('click',async()=>{b.disabled=true;try{await fn()}catch(e){reportStatus.textContent='Action not completed: '+(e?.message||String(e))}finally{b.disabled=false}});item.append(b)};
          // Known production defect: source PDF page labels and running headers were copied into this draft.
          // Block approval of the defective version until a distinct clean replacement is generated and verified.
          const knownDefectiveDraft=reportProject.value==='f2bc6b19-c4f7-4842-9a74-c9ea3447a496'
            &&r.storage_path==='projects/f2bc6b19-c4f7-4842-9a74-c9ea3447a496/private-ai-review/7c047525-ee48-4988-b1d0-a1362531a960/edited-manuscript.docx';
          if(knownDefectiveDraft){
            const warning=document.createElement('p');warning.style.color='#ffb4a6';
            warning.textContent='QA BLOCKED: source PDF page markers, running headers, and hard-wrapped paragraph lines remain in this draft. Do not approve or release. A clean replacement is required.';
            item.append(warning);
          }
          if(r.status==='pending_review'&&!knownDefectiveDraft){
            const deliverableLabel=(r.document_type==='edited_manuscript'||/manuscript|layout/i.test(r.file_name))?'Edited Manuscript':'Editorial Audit';
            action('Approve & Send '+deliverableLabel+' to Author',async()=>{
              if(!confirm('APPROVE AND SEND '+deliverableLabel+'?\\n\\nFile: '+r.file_name+'\\n\\nThis will approve the exact document, release it to the author portal, and queue a real notification to the author.'))return;
              const {client}=await getClient();
              const {data:check,error:ce}=await client.from('rsm_manuscript_edit_runs').select('id,source_document_id,status').eq('id',workingRun.id).single();
              if(ce||check?.source_document_id!==workingId||check.status==='failed')throw Error('Working manuscript version changed. Refresh before approving.');
              const {data:changed,error}=await client.from('mpid_editorial_deliverables').update({status:'approved',approved_at:new Date().toISOString()}).eq('id',r.id).eq('project_id',reportProject.value).eq('status','pending_review').select('id');
              if(error||changed?.length!==1)throw error||Error('Approval not recorded; refresh to reconcile.');
              try{await releaseApproved()}catch(e){reportStatus.textContent='Document approved, but release did not complete. Use Send Approved '+deliverableLabel+' to Author after refreshing. Reason: '+(e?.message||String(e));await loadPrivateReports();throw e}
            });
            action('Request Editorial Corrections',async()=>{
              if(!confirm('Record that this current document needs further corrections? It will remain private and unapproved.'))return;
              const {client,session}=await getClient();
              const {error}=await client.from('mpid_editorial_events').insert({project_id:reportProject.value,deliverable_id:r.id,event:'corrections_requested',actor_id:session.user.id});
              if(error)throw error;
              reportStatus.textContent='Corrections requested and recorded. Document remains private and pending review.';
            });
          }
          const releaseApproved=async()=>{
            const {client}=await getClient();
            const {data:latest,error:le}=await client.from('rsm_manuscript_edit_runs').select('id,source_document_id,status').eq('project_id',reportProject.value).order('created_at',{ascending:false}).limit(1);
            if(le||latest?.[0]?.id!==workingRun.id||latest[0].source_document_id!==workingId)throw Error('Newer editorial run exists. Refresh before release.');
            const {data:d,error:de}=await client.from('mpid_editorial_deliverables').select('*').eq('id',r.id).eq('project_id',reportProject.value).single();
            if(de||d?.status!=='approved'||d.storage_path!==r.storage_path)throw Error('Exact approved version no longer matches.');
            const sourceBucket=d.storage_path.includes('/private-ai-review/')?'mpid-manuscripts':'mpid-editorial-staging';
            const {data:blob,error:be}=await client.storage.from(sourceBucket).download(d.storage_path);
            if(be||!blob)throw be||Error('Approved file unavailable.');
            const dest='projects/'+reportProject.value+'/editorial-'+d.id+'-'+d.file_name.replace(/[^a-zA-Z0-9._-]/g,'_');
            const {data:existing,error:existingError}=await client.storage.from('mpid-manuscripts').download(dest);
            const digest=async b=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await b.arrayBuffer()))).map(x=>x.toString(16).padStart(2,'0')).join('');
            if(existingError){
              const {error:up}=await client.storage.from('mpid-manuscripts').upload(dest,blob,{upsert:false});
              if(up)throw Error('Release copy failed: '+up.message);
            }else if(await digest(existing)!==await digest(blob))throw Error('Release destination differs from approved version. No release made.');
            const {data:docId,error:finalError}=await client.rpc('mpid_finalize_editorial_release',{p_deliverable:d.id});
            if(finalError||!docId)throw finalError||Error('Release registration failed.');
            reportStatus.textContent='Released to secure author portal. Author notification queued by database trigger; email delivery is not yet verified.';
            await loadPrivateReports();
          };
          if(r.status==='approved')action('Send Approved '+(r.document_type==='edited_manuscript'||/manuscript|layout/i.test(r.file_name)?'Edited Manuscript':'Editorial Audit')+' to Author',async()=>{
            if(!confirm('Release this exact approved '+r.file_name+' to the author portal? This queues a real author notification.'))return;
            await releaseApproved();
          });
        }
        item.append(title,detail,download);target.append(item);
      };
      current.forEach(r=>render(r,currentBox));
      history.forEach(r=>render(r,historyBox));
    }catch(e){reportStatus.textContent=e?.message||String(e)}
  };
  generateReport.addEventListener('click',async()=>{
    generateReport.disabled=true;
    try{
      if(!reportProject.value)throw new Error('Select a project first');
      const {session,cfg}=await getClient();
      reportStatus.textContent='Checking assembled manuscript and running private editorial processing before report generation...';
      const reconcile=await fetch(cfg.url+'/functions/v1/rsm-manuscript-source-reconciliation',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:reportProject.value})});
      const source=await reconcile.json();
      if(!reconcile.ok||!source.ok)throw new Error(source.error||'Manuscript source check failed');
      if(!source.assembled?.id)throw new Error('Assembled manuscript with foreword is missing. Return to Stage 3 to assemble before generating the audit.');
      const {client}=await getClient();
      const {data:runs,error:runsError}=await client.from('rsm_manuscript_edit_runs').select('id,source_document_id,status,output_storage_path').eq('project_id',reportProject.value).eq('source_document_id',source.assembled.id).order('created_at',{ascending:false}).limit(1);
      if(runsError)throw runsError;
      if(!runs?.length||!runs[0].output_storage_path){
        const {data:project,error:projectError}=await client.from('mpid_projects').select('application_id').eq('id',reportProject.value).single();
        if(projectError||!project?.application_id)throw new Error('Project application link is missing');
        reportStatus.textContent='Processing assembled manuscript privately. Keep this page open until complete...';
        const editResponse=await fetch(cfg.url+'/functions/v1/rsm-manuscript-editor',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:reportProject.value,application_id:project.application_id,source_document_id:source.assembled.id})});
        let edit=await editResponse.json();
        if(!editResponse.ok||!edit.ok)throw new Error(edit.error||'Private manuscript editing failed');
        while(edit.status==='processing'&&Number.isInteger(edit.next_segment)){
          reportStatus.textContent='Private editorial processing: '+edit.completed_segments+' of '+edit.total_segments+' sections saved. Please keep this tab open.';
          const nextResponse=await fetch(cfg.url+'/functions/v1/rsm-manuscript-editor',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:reportProject.value,application_id:project.application_id,source_document_id:source.assembled.id,segment_index:edit.next_segment})});
          const nextEdit=await nextResponse.json();
          if(!nextResponse.ok||!nextEdit.ok)throw new Error(nextEdit.error||'Editorial section processing failed');
          if(nextEdit.next_segment===edit.next_segment)throw new Error('Editorial processing did not advance');
          edit=nextEdit;
        }
      }
      reportStatus.textContent='Generating formatted DOCX report from the assembled manuscript editorial run...';
      const response=await fetch(cfg.url+'/functions/v1/rsm-dashboard-editorial-report',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:reportProject.value})});
      const result=await response.json();
      if(!response.ok||!result.ok)throw new Error(result.error||'Report generation failed');
      reportStatus.textContent='Formatted DOCX editorial audit registered for private administrator review. '+result.findings+' finding(s). QA: '+result.qa_status+'. '+(result.source_matches?'Source version matches.':'Source version not verified. No author release.');
      await loadPrivateReports();
    }catch(e){reportStatus.textContent=e?.message||String(e)}
    finally{generateReport.disabled=false}
  });
  // Automatically prepare a private report for a selected project if one has not been registered.
  // No author release, no payment, and no outgoing notification.
  const autoReportAttempted=new Set();
  const prepareReportAutomatically=async()=>{
    const id=reportProject.value;
    if(!id||autoReportAttempted.has(id))return;
    try{
      const {client,session,cfg}=await getClient();
      const {data:existing,error}=await client.from('mpid_editorial_deliverables').select('id,storage_path').eq('project_id',id).limit(100);
      if(error)throw error;
      if((existing||[]).some(x=>x.storage_path?.includes('/dashboard-reports/'))){autoReportAttempted.add(id);await loadPrivateReports();return}
      const {data:runs,error:runError}=await client.from('rsm_manuscript_edit_runs').select('id').eq('project_id',id).limit(1);
      if(runError||!runs?.length)return;
      autoReportAttempted.add(id);
      reportStatus.textContent='Preparing existing editorial findings for private administrator review...';
      const response=await fetch(cfg.url+'/functions/v1/rsm-dashboard-editorial-report',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:id})});
      const result=await response.json();
      if(!response.ok||!result.ok)throw new Error(result.error||'Automatic report registration failed');
      await loadPrivateReports();
    }catch(e){autoReportAttempted.delete(id);reportStatus.textContent='Automatic report preparation: '+(e?.message||String(e))}
  };
  refreshReport.addEventListener('click',loadPrivateReports);
  reportProject.addEventListener('change',async()=>{await loadPrivateReports();await loadLocatedFindings();await prepareReportAutomatically()});
  document.getElementById('selectedProject')?.addEventListener('change',()=>{const id=document.getElementById('selectedProject')?.value;if(id&&Array.from(reportProject.options).some(o=>o.value===id)){reportProject.value=id;loadPrivateReports().then(prepareReportAutomatically)}});
  document.addEventListener('click',e=>{if(e.target?.id==='refreshDashboard'||e.target?.id==='loginButton')setTimeout(loadReportProjects,1100)});
  loadReportProjects();
  // Private project source reconciliation runs inside the administrator dashboard.
  const sourcePanel=document.createElement('section');sourcePanel.className='card';sourcePanel.id='rsmSourceReconciliation';
  const sourceTitle=document.createElement('h2');sourceTitle.textContent='Automatic Manuscript Source Check';
  const sourceNote=document.createElement('p');sourceNote.className='note';sourceNote.textContent='Checks the original manuscript, private foreword records and latest working version without downloading or moving any files. Source issues are shown for administrator attention.';
  const sourceStatus=document.createElement('p');sourceStatus.setAttribute('role','status');sourceStatus.setAttribute('aria-live','polite');
  const sourceRefresh=document.createElement('button');sourceRefresh.type='button';sourceRefresh.className='secondary';sourceRefresh.textContent='Refresh Source Check';
  sourcePanel.append(sourceTitle,sourceNote,sourceStatus,sourceRefresh);
  if(intakeStage)intakeStage.insertBefore(sourcePanel,intakePanel);
  const checkSources=async()=>{
    const projectId=document.getElementById('selectedProject')?.value||projectSelect.value||reportProject.value;
    if(!projectId){sourceStatus.textContent='Select a publishing project to inspect its existing private sources.';return}
    try{
      const {session,cfg}=await getClient();
      sourceStatus.textContent='Checking private project source records...';
      const response=await fetch(cfg.url+'/functions/v1/rsm-manuscript-source-reconciliation',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:projectId})});
      const result=await response.json();
      if(!response.ok||!result.ok)throw new Error(result.error||'Private source check failed');
      const lines=['Original: '+(result.source?.file_name||'Not registered'),'Working manuscript: '+(result.assembled?.file_name||'Not registered'),'Foreword: '+(result.integrated_foreword?'Included in private integrated source':result.foreword_documents?.length||result.foreword_storage_candidates?.length?'Located in private project records':'Not located in private project records'),'Latest QA: '+(result.latest_run?.qa_status||'Not run')];
      lines.push(...(result.warnings||[]).map(x=>'Attention: '+x));
      sourceStatus.textContent=lines.join(' | ');
      await autoProcessProject(projectId,result);
    }catch(e){sourceStatus.textContent=e?.message||String(e)}
  };
  // Fully automatic intake initiation: no manual file transfer, no release.
  const autoProcessing=new Set();
  const autoProcessProject=async(id,state)=>{
    if(autoProcessing.has(id)||!state.source)return;
    if(!state.assembled&&!state.integrated_foreword)return;
    if(state.assembled&&state.latest_run?.source_document_id===state.assembled.id&&state.latest_run?.report_storage_path){
      try{
        const {client,session,cfg}=await getClient();
        const {data:existingAudit,error:existingAuditError}=await client.from('mpid_editorial_deliverables').select('id').eq('project_id',id).like('file_name','RSM_Editorial_Audit_%.docx').limit(1);
        if(existingAuditError)throw existingAuditError;
        if(!existingAudit?.length){
          sourceStatus.textContent='Existing private edit found. Generating formatted DOCX audit...';
          const response=await fetch(cfg.url+'/functions/v1/rsm-dashboard-editorial-report',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:id})});
          const result=await response.json();
          if(!response.ok||!result.ok)throw new Error(result.error||'Formatted audit failed');
          await loadPrivateReports();
          sourceStatus.textContent='Formatted private DOCX audit registered for administrator review. No author release.';
        }
      }catch(e){sourceStatus.textContent='Private audit needs attention: '+(e?.message||String(e))}
      return;
    }
    autoProcessing.add(id);
    try{
      const {session,cfg}=await getClient();
      const call=async(name)=>{
        const response=await fetch(cfg.url+'/functions/v1/'+name,{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:id})});
        const result=await response.json();
        if(!response.ok||!result.ok)throw new Error(result.error||name+' failed');
        return result;
      };
      let source=state.assembled;
      if(!source){
        sourceStatus.textContent='Automatically incorporating integrated foreword into a private manuscript version...';
        const assembly=await call('rsm-private-manuscript-assembly');
        const {client:assemblyClient}=await getClient();
        const {data:working,error:workingError}=await assemblyClient.from('mpid_documents').select('id,file_name,storage_path').eq('project_id',id).eq('document_type','assembled_manuscript').is('archived_at',null).order('created_at',{ascending:false}).limit(1);
        if(workingError)throw workingError;
        source=working?.[0]||null;
        if(!source?.id)throw new Error('Assembly returned without registering a working manuscript. '+(assembly.error||'Inspect assembly function logs before retrying.'));
      }
      if(!source?.id)throw new Error('Working manuscript version could not be resolved');
      const {client}=await getClient();
      const {data:project,error:projectError}=await client.from('mpid_projects').select('application_id').eq('id',id).single();
      if(projectError||!project?.application_id)throw new Error('Approved application is missing');
      sourceStatus.textContent='Running contracted editorial manuscript processing in private storage...';
      const response=await fetch(cfg.url+'/functions/v1/rsm-manuscript-editor',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:id,application_id:project.application_id,source_document_id:source.id})});
      const result=await response.json();
      if(!response.ok||!result.ok)throw new Error(result.error||'Editorial processing failed');
      sourceStatus.textContent='Private editing completed. Preparing formatted DOCX audit for administrator review...';
      const auditResponse=await fetch(cfg.url+'/functions/v1/rsm-dashboard-editorial-report',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:id})});
      const auditResult=await auditResponse.json();
      if(!auditResponse.ok||!auditResult.ok)throw new Error('Edited manuscript saved, but formatted audit failed: '+(auditResult.error||'Unknown error'));
      sourceStatus.textContent='Private edited manuscript and formatted DOCX audit registered for administrator review. QA remains pending. No author release.';
      document.getElementById('rsmNextActionRefresh')?.click();
      if(Array.from(reportProject.options).some(o=>o.value===id))reportProject.value=id;
      await loadPrivateReports();
      await loadLocatedFindings();
    }catch(e){sourceStatus.textContent='Automatic processing requires attention: '+(e?.message||String(e))}
    finally{autoProcessing.delete(id)}
  };
  // A complete manuscript is generated internally. Hide the obsolete manual upload workflow.
  intakePanel.hidden=true;
  const auditRunButton=document.createElement('button');auditRunButton.type='button';auditRunButton.textContent='Run Editorial Audit & Generate DOCX';
  auditRunButton.title='Uses the selected project and private manuscript. Does not release anything to the author.';
  sourcePanel.append(auditRunButton);
  auditRunButton.addEventListener('click',async()=>{
    auditRunButton.disabled=true;
    try{await checkSources();}finally{auditRunButton.disabled=false}
  });
    sourceRefresh.addEventListener('click',checkSources);
  document.getElementById('selectedProject')?.addEventListener('change',checkSources);
  document.addEventListener('click',e=>{if(e.target?.id==='refreshDashboard'||e.target?.id==='loginButton')setTimeout(checkSources,1400)});
  setTimeout(checkSources,1500);
  reportProject.addEventListener('change',checkSources);
  // Streamlined editorial audit: administrator reviews exceptions, not manual status bookkeeping.
  const auditCenter=document.getElementById('editorialAuditCenter');
  if(auditCenter){
    const heading=auditCenter.querySelector('h2');if(heading)heading.textContent='Editorial Quality Review';
    const intro=auditCenter.querySelector(':scope > p.muted');
    if(intro)intro.textContent='Automated editorial findings and QA status appear here. Review exceptions and the private editorial report. Author approval happens in Stage 5.';
    const auditHistory=document.getElementById('auditApprovalsList');
    const historyTitle=Array.from(auditCenter.querySelectorAll('h3')).find(x=>x.textContent.includes('Author Approval History'));
    const historyNote=historyTitle?.nextElementSibling;
    if(historyTitle)historyTitle.hidden=true;
    if(historyNote&&historyNote.classList.contains('note'))historyNote.hidden=true;
    if(auditHistory)auditHistory.hidden=true;
    const auditList=document.getElementById('auditFindingsList');
    const summary=document.createElement('p');summary.className='note';
    summary.textContent='Finding status is generated from editorial processing. You do not need to update each finding manually. Open Advanced Finding Controls only to record a verified exception after reviewing the source.';
    if(auditList)auditList.before(summary);
    const toggle=document.createElement('button');toggle.type='button';toggle.className='secondary';toggle.textContent='Show Advanced Finding Controls';toggle.setAttribute('aria-expanded','false');
    if(auditList)auditList.before(toggle);
    let advanced=false;
    toggle.addEventListener('click',()=>{
      advanced=!advanced;
      toggle.textContent=advanced?'Hide Advanced Finding Controls':'Show Advanced Finding Controls';
      toggle.setAttribute('aria-expanded',String(advanced));
      auditCenter.classList.toggle('rsm-audit-advanced',advanced);
    });
    const auditStyle=document.createElement('style');
    auditStyle.textContent=`
      #editorialAuditCenter{border:1px solid #68583a;border-radius:16px}
      #editorialAuditCenter>h3{color:#e6c77e}
      #editorialAuditCenter #auditStats{gap:12px}
      #editorialAuditCenter .audit-finding{border:1px solid #574a36;border-radius:12px;padding:18px;margin:12px 0;background:linear-gradient(145deg,#25231e,#1b1b1b)}
      #editorialAuditCenter .audit-finding strong{color:#f0d391}
      #editorialAuditCenter .audit-text{line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere}
      #editorialAuditCenter .audit-status-row{display:none}
      #editorialAuditCenter.rsm-audit-advanced .audit-status-row{display:flex}
      #editorialAuditCenter #auditFindingsList{margin-top:16px}
      #rsmEditorialReportPanel{border:1px solid #78643e;border-radius:16px;background:linear-gradient(150deg,#29251e,#1d1d1d)}
      #rsmEditorialReportPanel .item{padding:15px;border-radius:10px;border:1px solid #5a4b34}
    `;
    document.head.append(auditStyle);
  }
  // rsm-duplicate-summary-cleanup-v2: single source of truth for each task.
  // The original renderDetails function continues to populate #details; no data or handlers are deleted.
  const projectRecords=document.getElementById('details')?.closest('section.card');
  const projectIntakeStage=document.getElementById('rsm-workflow-stage-2');
  if(projectRecords&&projectIntakeStage){
    projectIntakeStage.append(projectRecords);
    const sectionTitle=projectRecords.querySelector(':scope > h2');
    if(sectionTitle)sectionTitle.textContent='Manuscript & File Management';
    const sectionDescription=projectRecords.querySelector(':scope > p.muted');
    if(sectionDescription)sectionDescription.textContent='Manage current and archived manuscript files here. Editorial findings are managed only in Stage 4; author decisions are managed only in Stage 5.';
  }
  const cleanupStyle=document.createElement('style');
  cleanupStyle.textContent=`
  #rsmProjectRecordPanel #details{grid-template-columns:minmax(0,1fr)!important}
  #rsmProjectRecordPanel #details>.rsm-record-column:not(:nth-child(2)){display:none!important}
  #rsmProjectRecordPanel #details>.rsm-record-column:nth-child(2){grid-column:1/-1;max-width:none}
  #rsmProjectRecordPanel .rsm-record-header p{max-width:760px}
  #rsmProjectRecordPanel #details>.rsm-record-column .item{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
  #rsmProjectRecordPanel #details>.rsm-record-column .item>.actions{margin:0}
  #rsmProjectRecordPanel #details>.rsm-record-column .item button{min-width:82px}
  @media(max-width:700px){#rsmProjectRecordPanel #details>.rsm-record-column .item{display:block}}
  `;
  document.head.append(cleanupStyle);
  // rsm-project-records-polish-v1: presentation-only, retain all existing controls.
  const polish=document.createElement('style');
  polish.textContent=`
  #rsmProjectRecordPanel{border:1px solid #6e5935;background:linear-gradient(160deg,#242322,#171717);border-radius:16px;overflow:hidden}
  #rsmProjectRecordPanel>.rsm-record-header{padding:22px 24px;border-bottom:1px solid #514534;background:linear-gradient(110deg,#28241d,#191919)}
  #rsmProjectRecordPanel>.rsm-record-header h2{margin:0 0 6px;color:#eac77c;font-size:21px;letter-spacing:.015em}
  #rsmProjectRecordPanel>.rsm-record-header p{margin:0;color:#c5bba9;line-height:1.5;font-size:13px}
  #rsmProjectRecordPanel #details{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:18px;align-items:start}
  #rsmProjectRecordPanel #details>div:first-child{grid-column:1/-1}
  #rsmProjectRecordPanel #details>.rsm-record-column{min-width:0;border:1px solid #534a3b;border-radius:12px;background:#211f1b;padding:16px}
  #rsmProjectRecordPanel #details>.rsm-record-column h3{font-size:15px;margin:0 0 14px;color:#edce8c;letter-spacing:.01em}
  #rsmProjectRecordPanel #details>.rsm-record-column h3:not(:first-child){border-top:1px solid #494337;padding-top:16px}
  #rsmProjectRecordPanel #details>.rsm-record-column .list{display:grid;gap:9px}
  #rsmProjectRecordPanel #details>.rsm-record-column .item{margin:0;border:1px solid #514b40;border-radius:9px;background:#292722;padding:12px;overflow-wrap:anywhere}
  #rsmProjectRecordPanel #details>.rsm-record-column .actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}
  #rsmProjectRecordPanel #details>.rsm-record-column button{max-width:100%;white-space:normal}
  #rsmProjectRecordPanel .rsm-record-caption{display:inline-flex;gap:8px;align-items:center;color:#b6ad9c;font-size:12px;margin-bottom:12px}
  #rsmProjectRecordPanel #details>.rsm-record-column .muted{overflow-wrap:anywhere}
  @media(max-width:1100px){#rsmProjectRecordPanel #details{grid-template-columns:repeat(2,minmax(0,1fr))}#rsmProjectRecordPanel #details>.rsm-record-column:last-child{grid-column:1/-1}}
  @media(max-width:700px){#rsmProjectRecordPanel #details{grid-template-columns:minmax(0,1fr);padding:12px}#rsmProjectRecordPanel #details>.rsm-record-column:last-child{grid-column:auto}#rsmProjectRecordPanel>.rsm-record-header{padding:18px}}
  `;
  document.head.append(polish);
  const recordRoot=document.getElementById('details');
  if(recordRoot){
    const panel=recordRoot.closest('section.card');
    if(panel){
      panel.id='rsmProjectRecordPanel';
      const heading=panel.querySelector(':scope > h2');
      const intro=panel.querySelector(':scope > p.muted');
      const header=document.createElement('div');header.className='rsm-record-header';
      if(heading){heading.textContent='Manuscript & File Management';header.append(heading)}
      if(intro){intro.textContent='Current manuscript versions and archived files. Findings and author approvals appear once, in their dedicated workflow stages.';header.append(intro)}
      panel.prepend(header);
    }
    const decorate=()=>{
      const children=Array.from(recordRoot.children);
      children.forEach((node,index)=>{
        if(index===0)return;
        if(node.classList.contains('rsm-record-column'))return;
        node.classList.add('rsm-record-column');
        const h=node.querySelector('h3');
        if(h){
          const label=h.textContent||'';
          if(label.startsWith('Editorial Findings')){
            const cap=document.createElement('div');cap.className='rsm-record-caption';cap.textContent='Read-only summary. Manage resolution in Stage 4.';node.prepend(cap);
          }else if(label.startsWith('Author Approvals')){
            const cap=document.createElement('div');cap.className='rsm-record-caption';cap.textContent='Historical decisions. Manage author review in Stage 5.';node.prepend(cap);
          }else if(label.startsWith('Active Documents')){
            const cap=document.createElement('div');cap.className='rsm-record-caption';cap.textContent='Current files and archived versions';node.prepend(cap);
          }
        }
      });
    };
    const recordsObserver=new MutationObserver(()=>decorate());
    recordsObserver.observe(recordRoot,{childList:true});
    decorate();
  }
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
