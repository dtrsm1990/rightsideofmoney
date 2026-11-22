/* RSM Publishing Services: presentation-only, seven-stage operational workflow.
   Existing panel nodes and their event listeners are moved, never recreated. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('workspace');
  if (!root || document.getElementById('rsmWorkflowStages')) return;
  const sections = Array.from(root.querySelectorAll('section.card')).filter(s => !s.closest('section.card section.card'));
  const byName = (name) => sections.find(s => s.querySelector('h2')?.textContent.trim() === name);
  const get = (id) => document.getElementById(id) || byName(id);
  const stages = [
    ['Application, Agreement & Payment', ['rsmNextActionCenter','applicationCenter','signwellIntegration','paymentCenter','rsmOperationsCenter']],
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
      const {data,error}=await client.from('mpid_projects').select('id,title').order('title');
      if(error)throw error;
      const previous=projectSelect.value;
      projectSelect.replaceChildren(initialOption);
      (data||[]).forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.title;projectSelect.append(o)});
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
  loadIntakeProjects();
  // Administrator-only private report generation and review, integrated in Stage 4.
  const reportPanel=document.createElement('section');reportPanel.className='card';reportPanel.id='rsmEditorialReportPanel';
  const reportTitle=document.createElement('h2');reportTitle.textContent='Generate & Review Private Editorial Report';
  const reportIntro=document.createElement('p');reportIntro.className='note';reportIntro.textContent='Generate a current report from registered private editorial processing records and findings. Source version and QA warnings are shown. No report is released to an author.';
  const reportProject=document.createElement('select');reportProject.setAttribute('aria-label','Editorial report project');
  const reportPlaceholder=document.createElement('option');reportPlaceholder.value='';reportPlaceholder.textContent='Choose publishing project';reportProject.append(reportPlaceholder);
  const reportActions=document.createElement('div');reportActions.className='actions';
  const generateReport=document.createElement('button');generateReport.type='button';generateReport.textContent='Generate Report for Admin Review';
  const refreshReport=document.createElement('button');refreshReport.type='button';refreshReport.className='secondary';refreshReport.textContent='Refresh Reports';
  const reportStatus=document.createElement('p');reportStatus.setAttribute('role','status');reportStatus.setAttribute('aria-live','polite');
  const reportList=document.createElement('div');reportList.className='list';
  reportActions.append(generateReport,refreshReport);reportPanel.append(reportTitle,reportIntro,reportProject,reportActions,reportStatus,reportList);
  const auditStage=document.getElementById('rsm-workflow-stage-4');
  if(auditStage)auditStage.insertBefore(reportPanel,auditStage.children[1]||null);
  const loadReportProjects=async()=>{
    try{
      const {client}=await getClient();
      const {data,error}=await client.from('mpid_projects').select('id,title').order('title');
      if(error)throw error;
      const previous=reportProject.value;
      reportProject.replaceChildren(reportPlaceholder);
      (data||[]).forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.title;reportProject.append(o)});
      if(Array.from(reportProject.options).some(o=>o.value===previous))reportProject.value=previous;
      if(!reportProject.value&&projectSelect.value)reportProject.value=projectSelect.value;
      await loadPrivateReports();
      await prepareReportAutomatically();
    }catch(e){reportStatus.textContent=e?.message||String(e)}
  };
  const loadPrivateReports=async()=>{
    reportList.replaceChildren();
    if(!reportProject.value){reportStatus.textContent='Choose a project to view private reports.';return}
    try{
      const {client}=await getClient();
      const {data,error}=await client.from('mpid_editorial_deliverables').select('id,file_name,storage_path,status,created_at').eq('project_id',reportProject.value).order('created_at',{ascending:false}).limit(30);
      if(error)throw error;
      const reports=(data||[]).filter(x=>x.storage_path?.includes('/dashboard-reports/'));
      if(!reports.length){reportStatus.textContent='No generated dashboard reports yet.';return}
      reportStatus.textContent=reports.length+' private dashboard report(s) available. No author release from this panel.';
      reports.forEach(r=>{
        const item=document.createElement('div');item.className='item';
        const title=document.createElement('strong');title.textContent=r.file_name;
        const detail=document.createElement('p');detail.className='muted small';detail.textContent='Status: '+r.status+' | '+new Date(r.created_at).toLocaleString();
        const download=document.createElement('button');download.type='button';download.className='secondary';download.textContent='Review Private Report';
        download.addEventListener('click',async()=>{
          download.disabled=true;
          try{
            const {client}=await getClient();
            const {data,error}=await client.storage.from('mpid-manuscripts').download(r.storage_path);
            if(error||!data)throw error||new Error('Private report unavailable');
            const url=URL.createObjectURL(data);const a=document.createElement('a');a.href=url;a.download=r.file_name;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
          }catch(e){reportStatus.textContent=e?.message||String(e)}
          finally{download.disabled=false}
        });
        item.append(title,detail,download);reportList.append(item);
      });
    }catch(e){reportStatus.textContent=e?.message||String(e)}
  };
  generateReport.addEventListener('click',async()=>{
    generateReport.disabled=true;
    try{
      if(!reportProject.value)throw new Error('Select a project first');
      const {session,cfg}=await getClient();
      reportStatus.textContent='Generating private editorial review report...';
      const response=await fetch(cfg.url+'/functions/v1/rsm-dashboard-editorial-report',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({project_id:reportProject.value})});
      const result=await response.json();
      if(!response.ok||!result.ok)throw new Error(result.error||'Report generation failed');
      reportStatus.textContent='Private report registered. '+result.findings+' finding(s). QA: '+result.qa_status+'. '+(result.source_matches?'Source version matches.':'Source version not verified. No author release.');
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
      if((existing||[]).some(x=>x.storage_path?.includes('/dashboard-reports/'))){autoReportAttempted.add(id);return}
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
  reportProject.addEventListener('change',async()=>{await loadPrivateReports();await prepareReportAutomatically()});
  document.addEventListener('click',e=>{if(e.target?.id==='refreshDashboard'||e.target?.id==='loginButton')setTimeout(loadReportProjects,1100)});
  loadReportProjects();
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
