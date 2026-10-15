export type NavGroup = 'HOME' | 'BUILD' | 'CREATIVE' | 'MONITOR' | 'SETTINGS';

export type RoutePath =
  // HOME (with 3 top tabs: Overview, Agents, Knowledge Base)
  | '/app/home'
  | '/app/agents'
  | '/app/knowledge'
  // WORKSPACE / STUDIOS
  | '/app/agents/my-agents'
  | '/app/agents/details'
  | '/app/agents/ask'
  | '/app/databot'
  | '/app/voices'
  // CREATIVE
  | '/app/creative/stt'
  | '/app/creative/tts'
  // MONITOR
  | '/app/monitor/conversations'
  | '/app/monitor/analytics'
  | '/app/monitor/public-api'
  | '/app/monitor/logs'
  | '/app/monitor/spend'
  // SETTINGS
  | '/app/settings/integrations'
  | '/app/settings/api-keys'
  | '/app/settings/status';

export type HomeTopTab = 'overview' | 'agents' | 'knowledge';

export type AgentDetailTab = 'configure' | 'deploy' | 'knowledge' | 'details' | 'test' | 'logs';

export type AgentType = 'Chat' | 'Voice' | 'Hybrid';
export type AgentStatus = 'LIVE' | 'DRAFT' | 'TESTING';

export interface AgentItem {
  id: string;
  name: string;
  nameAr?: string;
  type: AgentType;
  status: AgentStatus;
  conversationsCount: number;
  ageBadge: string;
  systemPromptSnippet: string;
  fullSystemPrompt: string;
  apiKey: string;
  knowledgeBaseId?: string;
  knowledgeBaseName?: string;
  createdAt: string;
  model: string;
  temperature: number;
  language: string;
  voiceId?: string;
  ownerId: string;
  firstMessageTemplate: string;
  iconBg: string;
  iconText: string;
  badgeBg: string;
  metrics7d: {
    totalConversations: number;
    avgLatencyMs: number;
    resolutionRate: number;
    tokenVolume: number;
  };
  sparkline: number[];
}

export interface KBCollection {
  id: string;
  name: string;
  description: string;
  totalItems: number;
  chunksCount: number;
  status: 'indexed' | 'indexing' | 'error';
  lastUpdated: string;
  embeddingsModel: string;
  size: string;
  accentBg: string;
  accentText: string;
  documents: KBDocument[];
}

export interface KBDocument {
  id: string;
  filename: string;
  fileType: 'PDF' | 'DOCX' | 'MD' | 'SQL';
  size: string;
  chunks: number;
  status: 'Indexed' | 'Processing' | 'Errors';
  uploadedAt: string;
  tokens: number;
}

export interface KBJobHistory {
  id: string;
  jobType: 'Web Crawl' | 'File Ingestion' | 'Vector Re-index' | 'MSSQL Sync';
  target: string;
  progress: number;
  status: 'Completed' | 'Running' | 'Failed';
  startedAt: string;
  itemsProcessed: number;
  totalItems: number;
}

export interface DataBotItem {
  id: string;
  name: string;
  description: string;
  connectedView: string;
  databaseEngine: 'MSSQL' | 'PostgreSQL' | 'SAP HANA';
  lastQueryTime: string;
  totalQueries: number;
  status: 'Connected' | 'Idle' | 'Syncing';
}

export interface VoiceProfile {
  id: string;
  name: string;
  nameAr: string;
  dialectKey: string;
  languageLabel: string;
  gender: 'Female' | 'Male';
  sampleText: string;
  latencyMs: number;
  frequency: string;
  recommendedUse: string;
  avatarBg: string;
}

export interface ConversationLog {
  id: string;
  agentId: string;
  agentName: string;
  agentType: AgentType;
  channel: 'Web Chat' | 'SIP Telephony' | 'WhatsApp' | 'Public API';
  userQuery: string;
  agentResponse: string;
  startedAt: string;
  durationSec: number;
  tokens: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  status: 'Resolved' | 'Escalated' | 'Flagged';
  costUsd: number;
}

export interface PublicApiEndpoint {
  path: string;
  method: 'POST' | 'GET';
  description: string;
  requests24h: number;
  successRate: number;
  p95LatencyMs: number;
  status: 'Healthy' | 'Degraded';
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  tenant: string;
  avatar: string;
  region: string;
}
