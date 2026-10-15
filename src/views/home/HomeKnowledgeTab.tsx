import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Check, 
  FolderSync, 
  ArrowUpRight,
  Layers,
  FileCode,
  Search,
  Globe,
  Sliders,
  Trash2,
  RefreshCw,
  Eye,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { KBCollection, KBDocument } from '../../types';
import { kbJobHistory as initialJobs } from '../../mockData';

interface HomeKnowledgeTabProps {
  collections: KBCollection[];
  onCreateCollection: (newCol: KBCollection) => void;
  onAddDocument: (colId: string, doc: KBDocument) => void;
}

export const HomeKnowledgeTab: React.FC<HomeKnowledgeTabProps> = ({
  collections,
  onCreateCollection,
  onAddDocument
}) => {
  const [selectedColId, setSelectedColId] = useState<string>(collections[0]?.id || '');
  const [docFilter, setDocFilter] = useState<'All' | 'Indexed' | 'Processing'>('All');
  const [docSearch, setDocSearch] = useState('');
  
  // Modals state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [inspectingDoc, setInspectingDoc] = useState<KBDocument | null>(null);

  // Ingestion form state
  const [uploadMode, setUploadMode] = useState<'file' | 'crawl' | 'text'>('file');
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState<'PDF' | 'DOCX' | 'MD' | 'SQL'>('PDF');
  const [crawlUrl, setCrawlUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [chunkSize, setChunkSize] = useState(512);
  const [chunkOverlap, setChunkOverlap] = useState(64);
  const [selectedEmbedModel, setSelectedEmbedModel] = useState('idrak-embed-v2-sovereign');

  // New Collection form state
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  const selectedCol = collections.find(c => c.id === selectedColId) || collections[0];

  const filteredDocs = selectedCol?.documents.filter(d => {
    const matchesFilter = docFilter === 'All' || d.status === docFilter;
    const matchesSearch = d.filename.toLowerCase().includes(docSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const docTitle = uploadMode === 'crawl' 
      ? (crawlUrl ? `Crawl_${new URL(crawlUrl.startsWith('http') ? crawlUrl : `https://${crawlUrl}`).hostname}` : 'Web_Crawl_Import')
      : (newDocName.trim() || 'Untitled_Document');

    const ext = uploadMode === 'file' ? newDocType.toLowerCase() : 'pdf';
    const computedFilename = docTitle.includes('.') ? docTitle : `${docTitle}.${ext}`;

    const newDoc: KBDocument = {
      id: `doc-${Date.now()}`,
      filename: computedFilename,
      fileType: newDocType,
      size: '3.8 MB',
      chunks: Math.round(chunkSize / 2.2),
      status: 'Indexed',
      uploadedAt: 'Just now',
      tokens: Math.round((chunkSize / 2.2) * 450)
    };

    onAddDocument(selectedCol.id, newDoc);
    setShowUploadModal(false);
    setNewDocName('');
    setCrawlUrl('');
    setRawText('');
  };

  const handleCreateCollectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;

    const newCol: KBCollection = {
      id: `kb-${Date.now()}`,
      name: newColName.trim(),
      description: newColDesc.trim() || 'Enterprise partitioned vector knowledge base.',
      totalItems: 0,
      chunksCount: 0,
      status: 'indexed',
      lastUpdated: 'Just now',
      embeddingsModel: selectedEmbedModel,
      size: '0 KB',
      accentBg: 'bg-violet-50 border-violet-200',
      accentText: 'text-violet-700',
      documents: []
    };

    onCreateCollection(newCol);
    setSelectedColId(newCol.id);
    setShowNewCollectionModal(false);
    setNewColName('');
    setNewColDesc('');
  };

  const totalChunks = collections.reduce((acc, c) => acc + c.chunksCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">Knowledge Base & Vector Stores (RAG)</h2>
          <p className="text-xs text-slate-500">Partitioned enterprise embeddings grounded in Riyadh Sovereign GPU storage</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewCollectionModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700 shadow-2xs transition-all"
          >
            <Plus className="size-3.5 text-violet-600" />
            <span>New Collection</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-700 shadow-sm shadow-violet-200 transition-all active:scale-95"
          >
            <UploadCloud className="size-3.5" />
            <span>Ingest Document</span>
          </button>
        </div>
      </div>

      {/* Visualizations Section: Capacity, Token Density & Latency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Capacity Gauge */}
        <div data-tone="cyan" className="home-widget flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900">Vector Embeddings Capacity</span>
              <span className="font-mono text-xs font-bold text-violet-700">{totalChunks.toLocaleString()} / 10,000</span>
            </div>
            <p className="text-[11px] text-slate-400">text-embedding-004-sovereign weights (1536d)</p>
          </div>

          <div className="my-3">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" 
                style={{ width: `${Math.min(100, Math.round((totalChunks / 10000) * 100))}%` }} 
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">
              {Math.round((totalChunks / 10000) * 100)}% of sovereign cluster allocated
            </span>
          </div>

          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md self-start border border-emerald-200/60">
            Zero Egress · Riyadh Storage Pod
          </span>
        </div>

        {/* Chunk Density */}
        <div data-tone="purple" className="home-widget flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900">Chunk Density & Token Volume</span>
              <span className="text-[10px] text-indigo-700 font-bold">512 Tokens/Chunk</span>
            </div>
            <p className="text-[11px] text-slate-400">Normalized cosine semantic boundary</p>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 text-center text-xs">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Chunk Size</span>
              <span className="font-display text-base font-bold text-slate-900 mt-0.5 block">485 tokens</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Retrieval Latency</span>
              <span className="font-display text-base font-bold text-violet-700 mt-0.5 block">42 ms (P95)</span>
            </div>
          </div>

          <span className="text-[10px] text-slate-400">Recursive character splitting with 64-token overlap</span>
        </div>

        {/* Sync Schedule */}
        <div data-tone="mint" className="home-widget flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900">Automated Sync Daemon</span>
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400">Scheduled indexing across corporate drives</p>
          </div>

          <div className="space-y-1.5 my-2 text-xs">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-600">Support knowledge hub</span>
              <span className="font-bold text-emerald-700">Every 6 hours</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-600">Product docs crawl</span>
              <span className="font-bold text-indigo-700">Daily at 02:00</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-600">Agent data connector</span>
              <span className="font-bold text-violet-700">Real-time Hook</span>
            </div>
          </div>

          <span className="text-[10px] text-slate-400">Next scheduled crawl: in 4 hours</span>
        </div>
      </div>

      {/* KB Collections Section (As Specified by User) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database className="size-4 text-violet-600" />
            <h3 className="font-display text-base font-bold text-slate-900">Enterprise Collections</h3>
            <span className="text-xs text-slate-400">({collections.length} Collections Active)</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Select a collection to manage grounded docs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {collections.map((col) => {
            const isSelected = col.id === selectedColId;
            return (
              <div
                key={col.id}
                onClick={() => setSelectedColId(col.id)}
                className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-violet-600 bg-violet-50/50 shadow-xs ring-2 ring-violet-500/10'
                    : 'border-slate-200/80 hover:border-slate-300 bg-white shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="size-8 rounded-xl bg-violet-100 text-violet-700 grid place-items-center">
                    <Database className="size-4" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-violet-800 bg-violet-100 px-2 py-0.5 rounded-full">
                    {col.chunksCount.toLocaleString()} chunks
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{col.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">{col.description}</p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{col.documents.length} files ({col.size})</span>
                  <span>{col.lastUpdated}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Docs in Selected KB Collection (Tabular Section As Specified) */}
      <div 
        data-tone="cyan"
        className="home-widget home-widget-wide space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-bold text-slate-900">Documents in "{selectedCol?.name}"</span>
              <span className="rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5">
                {selectedCol?.documents.length || 0} Files
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{selectedCol?.description}</p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search within collection */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <input
                type="text"
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Filter files..."
                className="rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-700 outline-none focus:border-violet-500 w-36 sm:w-48"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {(['All', 'Indexed', 'Processing'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setDocFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    docFilter === st ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabular Documents List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-3">Filename</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Vector Chunks</th>
                <th className="py-2.5 px-3">Tokens</th>
                <th className="py-2.5 px-3">Indexing Status</th>
                <th className="py-2.5 px-3">Uploaded</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => {
                  const isPdf = doc.fileType === 'PDF';
                  const isDocx = doc.fileType === 'DOCX';
                  const isSql = doc.fileType === 'SQL';

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className={`size-7 rounded-lg grid place-items-center shrink-0 ${
                            isPdf ? 'bg-rose-100 text-rose-700' :
                            isDocx ? 'bg-sky-100 text-sky-700' :
                            isSql ? 'bg-violet-100 text-violet-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            <FileText className="size-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block truncate max-w-xs">{doc.filename}</span>
                            <span className="text-[10px] text-slate-400">text-embedding-004 · 1536d</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold px-1.5 py-0.5">
                          {doc.fileType}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{doc.size}</td>
                      <td className="py-3 px-3 font-mono font-bold text-violet-700">{doc.chunks} chunks</td>
                      <td className="py-3 px-3 font-mono text-slate-700">{doc.tokens.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.2 text-[9px] font-bold">
                          <CheckCircle2 className="size-3 text-emerald-600" />
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{doc.uploadedAt}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setInspectingDoc(doc)}
                            className="rounded-lg bg-slate-100 px-2 py-1 text-slate-700 hover:bg-violet-50 hover:text-violet-700 text-xs font-semibold flex items-center gap-1"
                            title="Inspect Semantic Chunks"
                          >
                            <Eye className="size-3" />
                            <span>Chunks</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No documents found in this collection. Click "Ingest Document" to add files.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Background Crawl & Upload Job History Audit Trail (As Specified) */}
      <div 
        data-tone="purple"
        className="home-widget home-widget-wide space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900">Background Job History & Crawl Audit</h3>
            <p className="text-xs text-slate-500">Vector re-indexing and document processing metrics with 100% completion verification</p>
          </div>
          <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
            100% Completed
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {initialJobs.map((job) => (
            <div key={job.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{job.jobType}:</span>
                  <span className="font-mono text-violet-700 font-semibold">{job.target}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Started {job.startedAt} · Processed {job.itemsProcessed} / {job.totalItems} elements
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${job.progress}%` }} />
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {job.status} (100%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingest Document Modal (Multi-Option like in Idrak + Inspired by Ref UI) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_28px_100px_-28px_rgba(30,41,59,0.45)] animate-in fade-in zoom-in-95 duration-200">
            <div className="relative flex items-center justify-between overflow-hidden border-b border-sky-100/80 bg-gradient-to-br from-sky-50 via-white to-violet-50 px-6 py-5">
              <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-12 size-36 rounded-full bg-sky-200/30 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-md shadow-sky-200"><UploadCloud className="size-5" /></span>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">Add a knowledge source</h3>
                  <p className="text-xs text-slate-500">Ground your agents with trusted information</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="relative rounded-xl p-2 text-slate-400 hover:bg-white/80 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Ingestion Mode Selector Tabs */}
            <div className="mx-6 mt-5 mb-4 flex items-center gap-1 rounded-xl border border-slate-200/70 bg-slate-100/80 p-1 text-xs">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  uploadMode === 'file' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="size-3.5" />
                <span>File Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('crawl')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  uploadMode === 'crawl' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Globe className="size-3.5" />
                <span>Web Crawler</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('text')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  uploadMode === 'text' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileCode className="size-3.5" />
                <span>Raw Text</span>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 px-6 pb-6">
              {uploadMode === 'file' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Document Title</label>
                    <input
                      type="text"
                      required
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      placeholder="e.g. Saudi_Labor_Law_Executive_Bylaws_2026"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Format Specification</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['PDF', 'DOCX', 'MD', 'SQL'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setNewDocType(fmt)}
                          className={`p-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                            newDocType === fmt ? 'border-violet-600 bg-violet-50 text-violet-900' : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 border-2 border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 hover:border-violet-400 transition-colors cursor-pointer bg-slate-50/50">
                    <UploadCloud className="size-8 mx-auto text-violet-500 mb-1" />
                    <span className="font-semibold text-slate-700 block">Click or Drag & Drop document</span>
                    <span className="text-[10px] text-slate-400">PDF, DOCX, XLSX, SQL, Markdown up to 100MB</span>
                  </div>
                </>
              )}

              {uploadMode === 'crawl' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Intranet / Website URL</label>
                    <input
                      type="url"
                      required
                      value={crawlUrl}
                      onChange={(e) => setCrawlUrl(e.target.value)}
                      placeholder="https://sama.gov.sa/regulations/2026"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-500 font-mono"
                    />
                  </div>
                  <div className="p-3 bg-violet-50/60 rounded-xl border border-violet-100 text-xs text-violet-900">
                    <p className="font-semibold mb-1">Automated Sovereign Spider</p>
                    <p className="text-[11px] text-violet-700">Extracts text, strips scripts and headers, then embeds chunks directly into Riyadh local store.</p>
                  </div>
                </div>
              )}

              {uploadMode === 'text' && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Direct Policy / FAQ Text</label>
                  <textarea
                    rows={4}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste product guides, support articles, or FAQ pairs here..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-violet-500 font-sans"
                  />
                </div>
              )}

              {/* Chunking & Model Tuning Controls */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-violet-600" />
                    <span>RAG Chunking Settings</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold text-violet-700">{chunkSize} tokens / {chunkOverlap} overlap</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Chunk Size (Tokens)</span>
                    <input
                      type="range"
                      min={128}
                      max={1024}
                      step={64}
                      value={chunkSize}
                      onChange={(e) => setChunkSize(Number(e.target.value))}
                      className="w-full accent-violet-600"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Overlap (Tokens)</span>
                    <input
                      type="range"
                      min={0}
                      max={128}
                      step={16}
                      value={chunkOverlap}
                      onChange={(e) => setChunkOverlap(Number(e.target.value))}
                      className="w-full accent-violet-600"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">Embedding Architecture</span>
                  <select
                    value={selectedEmbedModel}
                    onChange={(e) => setSelectedEmbedModel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 outline-none"
                  >
                    <option value="idrak-embed-v2-sovereign">idrak-embed-v2-sovereign (1536-dim, Arabic optimized)</option>
                    <option value="text-embedding-004">text-embedding-004 (Google Cloud)</option>
                    <option value="text-embedding-3-large">OpenAI text-embedding-3-large</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 shadow-sm shadow-violet-200"
                >
                  Embed & Ingest Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Collection Modal */}
      {showNewCollectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_28px_100px_-28px_rgba(30,41,59,0.45)] animate-in fade-in zoom-in-95 duration-200">
            <div className="relative flex items-center justify-between overflow-hidden border-b border-violet-100/80 bg-gradient-to-br from-violet-50 via-white to-rose-50 px-6 py-5">
              <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-12 size-36 rounded-full bg-violet-200/30 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-200"><Database className="size-5" /></span>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">Create a knowledge base</h3>
                  <p className="text-xs text-slate-500">Organize trusted sources for agent grounding</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewCollectionModal(false)}
                className="relative rounded-xl p-2 text-slate-400 hover:bg-white/80 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCollectionSubmit} className="space-y-4 p-6 pt-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Collection Name</label>
                <input
                  type="text"
                  required
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  placeholder="e.g. Saudi_PDPL_Executive_Bylaws"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  placeholder="Briefly state what documents this partition will store..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCollectionModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 shadow-sm shadow-violet-200"
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Semantic Chunk Inspector Modal */}
      {inspectingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 p-6 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-slate-900">Semantic Chunk Inspector</h3>
                  <span className="rounded bg-violet-100 text-violet-700 font-mono text-[10px] font-bold px-1.5 py-0.5">
                    {inspectingDoc.chunks} Chunks
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-md">{inspectingDoc.filename}</p>
              </div>
              <button
                onClick={() => setInspectingDoc(null)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {[
                { chunkIdx: 0, tokens: 490, similarity: 0.942, preview: 'المادة (14): يجب على جهة العمل حفظ وتوثيق بيانات الأجور والإجازات الرسمية للموظف في نظام إلكتروني معتمد متوافق مع لوائح وزارة الموارد البشرية والتنمية الاجتماعية...' },
                { chunkIdx: 1, tokens: 512, similarity: 0.918, preview: 'Knowledge source excerpt: product and support guidance matched to this question with a high semantic similarity score...' },
                { chunkIdx: 2, tokens: 485, similarity: 0.895, preview: 'Executive circular No. 44102 on Cloud Sovereign Data Residency: Customer account credentials and biometric voice prints shall remain stored exclusively within sovereign datacenter boundaries...' }
              ].map((c) => (
                <div key={c.chunkIdx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-slate-700">Chunk #{c.chunkIdx + 1} ({c.tokens} tokens)</span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded text-[10px]">
                      Cosine Similarity: {c.similarity}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-sans bg-white p-2.5 rounded-xl border border-slate-200/60 font-arabic">
                    {c.preview}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setInspectingDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
