import { 
  UserProfile, 
  AgentItem, 
  KBCollection, 
  KBJobHistory, 
  DataBotItem, 
  VoiceProfile, 
  ConversationLog, 
  PublicApiEndpoint 
} from './types';

export const currentUser: UserProfile = {
  name: 'Amir Hussain',
  email: 'amir@test.com',
  role: 'Enterprise AI Lead & Architect',
  department: 'Solutions Engineering · AI Platforms',
  tenant: 'Bilytica Global · Riyadh HQ',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  region: 'Riyadh DC-1 (Saudi Arabia)'
};

export const initialAgents: AgentItem[] = [
  {
    id: 'agent-najla-voice',
    name: 'Najla - KSA Banking Care',
    nameAr: 'نجلاء - خدمة العملاء المصرفية',
    type: 'Voice',
    status: 'LIVE',
    conversationsCount: 18420,
    ageBadge: '24d ago',
    systemPromptSnippet: 'You are Najla, a polite, articulate Saudi customer care representative for Al-Bilytica Islamic Bank...',
    fullSystemPrompt: `You are Najla, a polite, articulate Saudi customer care representative for Al-Bilytica Islamic Bank. Speak in natural Najdi Arabic with appropriate courtesy words (حياك الله، يا هلا، أبشر، تحت أمرك). Verify account numbers before sharing sensitive financial details. Enforce SAMA guidelines on OTP redaction.`,
    apiKey: 'key_live_9a8f47b2c910488db9a41e93c1e',
    knowledgeBaseId: 'kb-sama',
    knowledgeBaseName: 'Saudi Central Bank (SAMA) Directives',
    createdAt: '2026-09-20',
    model: 'idraqv1-arabic-speech-2.5',
    temperature: 0.3,
    language: 'ar · Saudi Najdi',
    voiceId: 'voice-najla',
    ownerId: 'usr-amir-hussain',
    firstMessageTemplate: 'مرحباً بك في مصرف البليتيكا، معك نجلاء. كيف أقدر أخدمك اليوم بخصوص حسابك أو البطاقة الائتمانية؟',
    iconBg: 'bg-violet-100 text-violet-700 border-violet-200',
    iconText: 'N',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    metrics7d: {
      totalConversations: 4920,
      avgLatencyMs: 485,
      resolutionRate: 98.4,
      tokenVolume: 1240000
    },
    sparkline: [42, 55, 68, 62, 85, 92, 104]
  },
  {
    id: 'agent-hr-concierge',
    name: 'Bilytica HR & PayPeople Concierge',
    nameAr: 'مساعد الموارد البشرية وباي بيبول',
    type: 'Hybrid',
    status: 'LIVE',
    conversationsCount: 12890,
    ageBadge: '45d ago',
    systemPromptSnippet: 'Enterprise HR buddy connected to PayPeople: checks leave balances, generates salary certificates...',
    fullSystemPrompt: `You are Idrak HR Assistant. You assist employees with company policies, leave submissions, payslip breakdowns, and insurance inquiries. Pull data from PayPeople views and the official 2026 Employee Handbook. Always maintain a welcoming and supportive tone.`,
    apiKey: 'key_live_b72c41908234ea72089ffb8819',
    knowledgeBaseId: 'kb-hr',
    knowledgeBaseName: 'HR & PayPeople Policy Matrix',
    createdAt: '2026-08-30',
    model: 'idraqv1-hybrid-flash',
    temperature: 0.4,
    language: 'Bilingual (ar / en)',
    voiceId: 'voice-tala',
    ownerId: 'usr-amir-hussain',
    firstMessageTemplate: 'Hello Amir! Welcome to Idrak HR Concierge. How can I assist you with your PayPeople leaves, attendance, or benefits today?',
    iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    iconText: 'H',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    metrics7d: {
      totalConversations: 3120,
      avgLatencyMs: 420,
      resolutionRate: 99.1,
      tokenVolume: 890000
    },
    sparkline: [30, 42, 45, 52, 60, 58, 64]
  },
  {
    id: 'agent-databot-hr',
    name: 'Demo HR DataBot',
    nameAr: 'محلل بيانات الموارد البشرية',
    type: 'Chat',
    status: 'LIVE',
    conversationsCount: 6430,
    ageBadge: '12d ago',
    systemPromptSnippet: 'Specialized interface for querying MSSQL views (vw_PayPeople_EmployeeLeaveBalances) via platform DataBot APIs...',
    fullSystemPrompt: `You are Demo HR DataBot. You execute read-only queries against the MSSQL view vw_PayPeople_EmployeeLeaveBalances and return structured answers, aggregated totals, and employee entitlement summaries. Never expose database connection strings or raw passwords.`,
    apiKey: 'key_live_54ed891045ba772cde0019910a',
    createdAt: '2026-10-02',
    model: 'idraqv1-sql-analyst',
    temperature: 0.2,
    language: 'Bilingual (ar / en)',
    ownerId: 'usr-amir-hussain',
    firstMessageTemplate: 'Connected to MSSQL view vw_PayPeople_EmployeeLeaveBalances. Ask me about department leave totals, sick leaves, or employee balances.',
    iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
    iconText: 'D',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    metrics7d: {
      totalConversations: 1840,
      avgLatencyMs: 380,
      resolutionRate: 97.8,
      tokenVolume: 540000
    },
    sparkline: [15, 22, 28, 35, 42, 38, 45]
  },
  {
    id: 'agent-sama-auditor',
    name: 'SAMA Sovereign Compliance Auditor',
    nameAr: 'مستشار الامتثال واللوائح التنظيمية (ساما)',
    type: 'Chat',
    status: 'LIVE',
    conversationsCount: 4120,
    ageBadge: '60d ago',
    systemPromptSnippet: 'High-security reasoning agent for fintech legal counsel, checking regulatory circulars...',
    fullSystemPrompt: `You are an enterprise compliance auditor specialized in SAMA cyber frameworks, Saudi Personal Data Protection Law (PDPL), and Anti-Money Laundering (AML) directives. Provide cited references to official circulars.`,
    apiKey: 'key_live_77e1920ac34b9101f89aa102',
    knowledgeBaseId: 'kb-sama',
    knowledgeBaseName: 'Saudi Central Bank (SAMA) Directives',
    createdAt: '2026-08-15',
    model: 'idraqv1-legal-moe-70b',
    temperature: 0.1,
    language: 'ar · Modern Standard',
    ownerId: 'usr-tariq-mahmood',
    firstMessageTemplate: 'أهلاً بك. مستشار الامتثال والتنظيمات المصرفية من ساما تحت خدمتك للإجابة على المعايير النظامية وتوجيهات الحوسبة السحابية.',
    iconBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    iconText: 'S',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    metrics7d: {
      totalConversations: 820,
      avgLatencyMs: 640,
      resolutionRate: 99.7,
      tokenVolume: 320000
    },
    sparkline: [10, 14, 18, 16, 22, 25, 28]
  },
  {
    id: 'agent-gulf-sales',
    name: 'Gulf VIP Sales Qualifier',
    nameAr: 'مساعد المبيعات وتأهيل العملاء للشركات',
    type: 'Voice',
    status: 'LIVE',
    conversationsCount: 2890,
    ageBadge: '5d ago',
    systemPromptSnippet: 'Inbound caller qualification bot engaging enterprise prospects across Riyadh, Jeddah, Dubai, and Abu Dhabi...',
    fullSystemPrompt: `You represent Bilytica Global enterprise solutions. Qualify enterprise buyers for Idrak AI Agents, CRM integration, and Sovereign Cloud installations across Saudi Arabia and the UAE.`,
    apiKey: 'key_live_12fc881903be2931a98cc451',
    knowledgeBaseId: 'kb-sales',
    knowledgeBaseName: 'SAP HANA Enterprise Sales Views',
    createdAt: '2026-10-09',
    model: 'idraqv1-arabic-speech-2.5',
    temperature: 0.4,
    language: 'ar · Khaleeji / Gulf',
    voiceId: 'voice-rakan',
    ownerId: 'usr-amir-hussain',
    firstMessageTemplate: 'يا هلا ومسهلا، معك راكان من قطاع الحلول المؤسسية في بليتيكا. وش المتطلبات اللي تبغى تناقشها بخصوص الذكاء الاصطناعي؟',
    iconBg: 'bg-sky-100 text-sky-700 border-sky-200',
    iconText: 'G',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    metrics7d: {
      totalConversations: 640,
      avgLatencyMs: 510,
      resolutionRate: 96.2,
      tokenVolume: 195000
    },
    sparkline: [8, 12, 15, 20, 24, 28, 32]
  },
  {
    id: 'agent-it-support',
    name: 'IT Support & System Triage',
    nameAr: 'الدعم الفني وتقنية المعلومات',
    type: 'Hybrid',
    status: 'DRAFT',
    conversationsCount: 410,
    ageBadge: '2d ago',
    systemPromptSnippet: 'Internal helpdesk triage agent for resetting SSO tokens, provisioning VPN certs, and checking server health...',
    fullSystemPrompt: `You are internal IT Helpdesk Agent. Assist staff with SSO authentication, local GPU node connectivity, and software license approvals.`,
    apiKey: 'key_test_33a019ff882e341901dd5521',
    createdAt: '2026-10-12',
    model: 'idraqv1-hybrid-flash',
    temperature: 0.3,
    language: 'Bilingual (ar / en)',
    ownerId: 'usr-amir-hussain',
    firstMessageTemplate: 'Welcome to Bilytica Internal IT Service Desk. Enter your ticket ID or state your issue.',
    iconBg: 'bg-rose-100 text-rose-700 border-rose-200',
    iconText: 'I',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    metrics7d: {
      totalConversations: 95,
      avgLatencyMs: 410,
      resolutionRate: 94.5,
      tokenVolume: 42000
    },
    sparkline: [2, 4, 8, 12, 15, 20, 25]
  }
];

export const kbCollections: KBCollection[] = [
  {
    id: 'kb-hr',
    name: 'HR & PayPeople Policy Matrix',
    description: 'Corporate employee handbook, leave entitlements, health insurance tiers, and payroll cycles.',
    totalItems: 8,
    chunksCount: 1904,
    status: 'indexed',
    lastUpdated: '14 mins ago',
    embeddingsModel: 'idrak-embed-v2-sovereign',
    size: '14.8 MB',
    accentBg: 'bg-emerald-50 border-emerald-200',
    accentText: 'text-emerald-700',
    documents: [
      { id: 'doc-hr-1', filename: 'Bilytica_Employee_Handbook_2026.pdf', fileType: 'PDF', size: '6.2 MB', chunks: 780, status: 'Indexed', uploadedAt: 'Today 09:12', tokens: 245000 },
      { id: 'doc-hr-2', filename: 'PayPeople_Leave_Policies_SaudiLaborLaw.docx', fileType: 'DOCX', size: '3.4 MB', chunks: 420, status: 'Indexed', uploadedAt: 'Yesterday', tokens: 132000 },
      { id: 'doc-hr-3', filename: 'Executive_Medical_Insurance_Coverage.pdf', fileType: 'PDF', size: '4.1 MB', chunks: 512, status: 'Indexed', uploadedAt: '3 days ago', tokens: 168000 },
      { id: 'doc-hr-4', filename: 'Annual_Performance_Appraisal_Guide.md', fileType: 'MD', size: '1.1 MB', chunks: 192, status: 'Indexed', uploadedAt: '1 week ago', tokens: 58000 }
    ]
  },
  {
    id: 'kb-sama',
    name: 'Saudi Central Bank (SAMA) Directives',
    description: 'Official SAMA regulatory circulars, Cloud Computing Guidelines, and Saudi PDPL Executive Bylaws.',
    totalItems: 12,
    chunksCount: 2450,
    status: 'indexed',
    lastUpdated: '2 hours ago',
    embeddingsModel: 'idrak-embed-v2-sovereign',
    size: '28.4 MB',
    accentBg: 'bg-indigo-50 border-indigo-200',
    accentText: 'text-indigo-700',
    documents: [
      { id: 'doc-sm-1', filename: 'SAMA_Cyber_Security_Framework_v3.pdf', fileType: 'PDF', size: '12.4 MB', chunks: 1120, status: 'Indexed', uploadedAt: '12 Oct', tokens: 410000 },
      { id: 'doc-sm-2', filename: 'Saudi_PDPL_Executive_Regulations_SDAIA.pdf', fileType: 'PDF', size: '10.2 MB', chunks: 940, status: 'Indexed', uploadedAt: '08 Oct', tokens: 320000 },
      { id: 'doc-sm-3', filename: 'Fintech_Payment_Gateway_Rules_2026.docx', fileType: 'DOCX', size: '5.8 MB', chunks: 390, status: 'Indexed', uploadedAt: '01 Oct', tokens: 145000 }
    ]
  },
  {
    id: 'kb-bank',
    name: 'Core Banking Payment Switch APIs',
    description: 'SADAD biller integrations, SARIE instant transfer specs, and OAuth 2.0 gateway documentation.',
    totalItems: 6,
    chunksCount: 940,
    status: 'indexed',
    lastUpdated: '1 day ago',
    embeddingsModel: 'idrak-embed-v2-sovereign',
    size: '9.2 MB',
    accentBg: 'bg-violet-50 border-violet-200',
    accentText: 'text-violet-700',
    documents: [
      { id: 'doc-bk-1', filename: 'SADAD_Biller_Integration_Guide_v4.pdf', fileType: 'PDF', size: '5.1 MB', chunks: 520, status: 'Indexed', uploadedAt: '05 Oct', tokens: 180000 },
      { id: 'doc-bk-2', filename: 'SARIE_Instant_Transfer_Specs.docx', fileType: 'DOCX', size: '4.1 MB', chunks: 420, status: 'Indexed', uploadedAt: '02 Oct', tokens: 140000 }
    ]
  },
  {
    id: 'kb-sales',
    name: 'SAP HANA Enterprise Sales Views',
    description: 'Bilytica global solution catalog, pricing tiers, client case studies, and enterprise RFP response templates.',
    totalItems: 4,
    chunksCount: 1120,
    status: 'indexed',
    lastUpdated: '3 days ago',
    embeddingsModel: 'idrak-embed-v2-sovereign',
    size: '18.1 MB',
    accentBg: 'bg-sky-50 border-sky-200',
    accentText: 'text-sky-700',
    documents: [
      { id: 'doc-sl-1', filename: 'SAP_HANA_Schema_Enterprise_Sales.sql', fileType: 'SQL', size: '8.4 MB', chunks: 640, status: 'Indexed', uploadedAt: '28 Sep', tokens: 210000 },
      { id: 'doc-sl-2', filename: 'Bilytica_Enterprise_RFP_Master_2026.pdf', fileType: 'PDF', size: '9.7 MB', chunks: 480, status: 'Indexed', uploadedAt: '25 Sep', tokens: 175000 }
    ]
  }
];

export const kbJobHistory: KBJobHistory[] = [
  {
    id: 'job-104',
    jobType: 'File Ingestion',
    target: 'Bilytica_Employee_Handbook_2026.pdf',
    progress: 100,
    status: 'Completed',
    startedAt: 'Today 09:12:04',
    itemsProcessed: 780,
    totalItems: 780
  },
  {
    id: 'job-103',
    jobType: 'Vector Re-index',
    target: 'HR & PayPeople Policy Matrix',
    progress: 100,
    status: 'Completed',
    startedAt: 'Yesterday 18:40:11',
    itemsProcessed: 1904,
    totalItems: 1904
  },
  {
    id: 'job-102',
    jobType: 'MSSQL Sync',
    target: 'vw_PayPeople_EmployeeLeaveBalances',
    progress: 100,
    status: 'Completed',
    startedAt: '12 Oct 14:00:00',
    itemsProcessed: 420,
    totalItems: 420
  },
  {
    id: 'job-101',
    jobType: 'Web Crawl',
    target: 'https://sama.gov.sa/circulars/2026',
    progress: 100,
    status: 'Completed',
    startedAt: '10 Oct 11:15:30',
    itemsProcessed: 85,
    totalItems: 85
  }
];

export const initialDataBots: DataBotItem[] = [
  {
    id: 'dbot-hr',
    name: 'Demo HR',
    description: 'Connected to MSSQL view vw_PayPeople_EmployeeLeaveBalances for instant employee balance lookups.',
    connectedView: 'dbo.vw_PayPeople_EmployeeLeaveBalances',
    databaseEngine: 'MSSQL',
    lastQueryTime: '4 mins ago',
    totalQueries: 6430,
    status: 'Connected'
  },
  {
    id: 'dbot-fin',
    name: 'Finance Ledger Bot',
    description: 'Read-only access to SAP HANA and MSSQL general ledger journal entries.',
    connectedView: 'dbo.vw_GL_DailyTransactions_2026',
    databaseEngine: 'MSSQL',
    lastQueryTime: '22 mins ago',
    totalQueries: 2890,
    status: 'Connected'
  },
  {
    id: 'dbot-sales',
    name: 'Enterprise Pipeline Bot',
    description: 'Queries PostgreSQL view for CRM deals across Riyadh, Jeddah, and Dubai branches.',
    connectedView: 'crm.vw_HubSpot_EnterpriseDeals',
    databaseEngine: 'PostgreSQL',
    lastQueryTime: '1 hour ago',
    totalQueries: 1420,
    status: 'Connected'
  }
];

export const voiceProfiles: VoiceProfile[] = [
  {
    id: 'voice-hana',
    name: 'Hana',
    nameAr: 'هناء النجدية',
    dialectKey: 'sa_najdi:female_01',
    languageLabel: 'ar · Saudi Najdi',
    gender: 'Female',
    sampleText: 'مرحباً بك في مصرف البليتيكا الإسلامي، معك هناء. كيف أقدر أساعدك اليوم في حسابك أو بطاقاتك؟',
    latencyMs: 175,
    frequency: '24kHz HD',
    recommendedUse: 'VIP Banking & High-Touch Customer Support',
    avatarBg: 'bg-violet-600'
  },
  {
    id: 'voice-najla',
    name: 'Najla',
    nameAr: 'نجلاء',
    dialectKey: 'sa_najdi:female_02',
    languageLabel: 'ar · Saudi Najdi',
    gender: 'Female',
    sampleText: 'يا هلا فيك، معك نجلاء. تم التحقق من هويتك بنجاح وجاري إتمام المعاملة.',
    latencyMs: 185,
    frequency: '24kHz HD',
    recommendedUse: 'Automated IVR & Telephony Verification',
    avatarBg: 'bg-purple-600'
  },
  {
    id: 'voice-rakan',
    name: 'Saudi Najdi Male',
    nameAr: 'راكان النجدي',
    dialectKey: 'sa_najdi:male_01',
    languageLabel: 'ar · Saudi Najdi',
    gender: 'Male',
    sampleText: 'يا هلا والله ومسهلا. معك راكان من قطاع الحلول المؤسسية. وش المنتج اللي تبغى استفسار عنه؟',
    latencyMs: 195,
    frequency: '24kHz HD',
    recommendedUse: 'Enterprise B2B Sales & Outbound Notifications',
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 'voice-ziyad',
    name: 'Saudi Hijazi Male',
    nameAr: 'زياد الحجازي',
    dialectKey: 'sa_hijazi:male_01',
    languageLabel: 'ar · Saudi Hijazi',
    gender: 'Male',
    sampleText: 'أهلاً وسهلاً بك، معاك زياد من الدعم الفني. كيف أقدر أساعدك اليوم لحل المشكلة بسرعة؟',
    latencyMs: 180,
    frequency: '24kHz HD',
    recommendedUse: 'Technical Desk & IT Triage Help',
    avatarBg: 'bg-sky-600'
  },
  {
    id: 'voice-fatima',
    name: 'Khaleeji Female',
    nameAr: 'فاطمة الخليجية',
    dialectKey: 'gulf:female_01',
    languageLabel: 'ar · Khaleeji / Gulf',
    gender: 'Female',
    sampleText: 'مرحبا الساع، طال عمرك معك فاطمة من إدارة العمليات. تفضل وش الإجراء اللي تبغانا نتابعه لك؟',
    latencyMs: 190,
    frequency: '24kHz HD',
    recommendedUse: 'UAE Government Portals & Aviation Services',
    avatarBg: 'bg-teal-600'
  },
  {
    id: 'voice-alex',
    name: 'Alexander',
    nameAr: 'ألكسندر (إنجليزي)',
    dialectKey: 'en_global:male_01',
    languageLabel: 'en · Global Professional',
    gender: 'Male',
    sampleText: 'Hello there, thank you for reaching Idrak Sovereign AI. I can assist you with your enterprise agent queries immediately.',
    latencyMs: 160,
    frequency: '24kHz HD',
    recommendedUse: 'Multinational Accounts & English Callers',
    avatarBg: 'bg-slate-700'
  }
];

export const recentConversations: ConversationLog[] = [
  {
    id: 'conv-8910',
    agentId: 'agent-najla-voice',
    agentName: 'Najla - KSA Banking Care',
    agentType: 'Voice',
    channel: 'SIP Telephony',
    userQuery: 'أبغى أعرف كم الرصيد المتبقي في بطاقتي الائتمانية البلاتينية؟',
    agentResponse: 'أهلاً بك يا فهد. رصيدك المتبقي في البطاقة البلاتينية المنتهية برقم 4012 هو 14,250 ريال سعودي، وتاريخ الاستحقاق في 25 أكتوبر.',
    startedAt: 'Just now',
    durationSec: 42,
    tokens: 382,
    sentiment: 'Positive',
    status: 'Resolved',
    costUsd: 0.0019
  },
  {
    id: 'conv-8909',
    agentId: 'agent-hr-concierge',
    agentName: 'Bilytica HR & PayPeople Concierge',
    agentType: 'Hybrid',
    channel: 'Web Chat',
    userQuery: 'How many days of annual leave do I have left this year in PayPeople?',
    agentResponse: 'Hi Amir, according to your PayPeople profile at Bilytica, you currently have 18.5 days of accrued annual leave and 4 days of casual leave available.',
    startedAt: '4 mins ago',
    durationSec: 15,
    tokens: 215,
    sentiment: 'Positive',
    status: 'Resolved',
    costUsd: 0.0008
  },
  {
    id: 'conv-8908',
    agentId: 'agent-databot-hr',
    agentName: 'Demo HR DataBot',
    agentType: 'Chat',
    channel: 'Public API',
    userQuery: 'SELECT department, SUM(leave_days_taken) FROM vw_PayPeople_EmployeeLeaveBalances GROUP BY department;',
    agentResponse: 'Executed query across 420 records. Engineering: 142 days, Sales: 98 days, Operations: 64 days.',
    startedAt: '18 mins ago',
    durationSec: 28,
    tokens: 540,
    sentiment: 'Neutral',
    status: 'Resolved',
    costUsd: 0.0022
  },
  {
    id: 'conv-8907',
    agentId: 'agent-sama-auditor',
    agentName: 'SAMA Sovereign Compliance Auditor',
    agentType: 'Chat',
    channel: 'Web Chat',
    userQuery: 'ما هي عقوبة عدم توطين البيانات في نظام حماية البيانات الشخصية؟',
    agentResponse: 'تنص المادة 43 من نظام حماية البيانات الشخصية (PDPL) على فرض غرامات تصل إلى 5 ملايين ريال سعودي مع إيقاف الترخيص في حال الإخلال بمتطلبات التوطين الإلزامي.',
    startedAt: '45 mins ago',
    durationSec: 36,
    tokens: 610,
    sentiment: 'Neutral',
    status: 'Resolved',
    costUsd: 0.0031
  }
];

export const publicApiEndpoints: PublicApiEndpoint[] = [
  {
    path: '/v1/agents/chat/completions',
    method: 'POST',
    description: 'Primary conversational inference with dynamic RAG grounding and tool execution',
    requests24h: 420800,
    successRate: 99.98,
    p95LatencyMs: 240,
    status: 'Healthy'
  },
  {
    path: '/v1/voice/session',
    method: 'POST',
    description: 'WebRTC and SIP telephony low-latency bidirectional voice stream initiation',
    requests24h: 84200,
    successRate: 99.85,
    p95LatencyMs: 185,
    status: 'Healthy'
  },
  {
    path: '/v1/databot/query',
    method: 'POST',
    description: 'Secure NL-to-SQL query processor passing bot ID and executing on designated views',
    requests24h: 38400,
    successRate: 99.92,
    p95LatencyMs: 310,
    status: 'Healthy'
  },
  {
    path: '/v1/knowledge/retrieval',
    method: 'POST',
    description: 'Semantic vector similarity search across assigned enterprise collections',
    requests24h: 290100,
    successRate: 99.95,
    p95LatencyMs: 145,
    status: 'Healthy'
  }
];
