import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Filter, 
  Check, 
  AlertCircle,
  RefreshCw,
  FolderSync,
  Layers,
  ArrowRight
} from 'lucide-react';
import { kbCollections as initialCollections, kbJobHistory as initialJobs } from '../../mockData';
import { KBCollection, KBDocument, KBJobHistory } from '../../types';

export const KnowledgeBaseManagementView: React.FC = () => {
  const [collections, setCollections] = useState<KBCollection[]>(initialCollections);
  const [activeCollectionId, setActiveCollectionId] = useState<string>(initialCollections[0].id);
  const [docFilter, setDocFilter] = useState<'All' | 'Indexed' | 'Processing'>('All');
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  const activeCollection = collections.find(c => c.id === activeCollectionId) || collections[0];

  const filteredDocs = activeCollection.documents.filter(d => 
    docFilter === 'All' || d.status === docFilter
  );

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    const newCol: KBCollection = {
      id: `kb-${Date.now()}`,
      name: newColName,
      description: newColDesc || 'Enterprise vectorized knowledge store.',
      totalItems: 0,
      chunksCount: 0,
      status: 'indexed',
      lastUpdated: 'Just now',
      embeddingsModel: 'idrak-embed-v2-sovereign',
      size: '0 MB',
      accentBg: 'bg-violet-50 border-violet-200',
      accentText: 'text-violet-700',
      documents: []
    };
    setCollections([...collections, newCol]);
    setActiveCollectionId(newCol.id);
    setShowNewCollectionModal(false);
    setNewColName('');
    setNewColDesc('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Knowledge Base Management (RAG Engine)</h1>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              Vector Stores Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Vector embeddings, semantic index pipelines, and grounded knowledge retrieval partitions
          </p>
        </div>

        <button
          onClick={() => setShowNewCollectionModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Vector RAG Engine Telemetry (Tone: Cyan, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="rag-hero" data-tone="cyan" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Database className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Vector Semantic Storage</h2>
                <p className="text-xs text-slate-500">1536-dimensional embeddings indexed using HNSW algorithms</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Average Match Accuracy: 98.4%
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Collections</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">{collections.length}</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Active partitions</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Vectors</span>
              <span className="font-display text-2xl font-bold text-sky-700 mt-1 block">2,034</span>
              <span className="text-[10px] text-slate-400 mt-1 block">512 token chunks</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Retrieval Latency</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">88 ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Cosine distance</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Storage Vault</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">Riyadh DC-1</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Zero egress</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Enterprise Collections Roster (Tone: Violet) */}
        {/* ================================================================= */}
        <div data-home-widget="collections-roster" data-tone="violet" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <FolderSync className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Collections Roster</h2>
                <p className="text-xs text-slate-500">Select to inspect attached documents</p>
              </div>
            </div>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              {collections.length} Stores
            </span>
          </div>

          <div className="space-y-2.5">
            {collections.map(col => {
              const isSelected = activeCollectionId === col.id;
              return (
                <div
                  key={col.id}
                  onClick={() => setActiveCollectionId(col.id)}
                  className={`home-record-row p-3.5 cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-violet-500/50 bg-violet-50/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{col.name}</span>
                    <span className="text-[10px] font-mono font-bold text-violet-700">{col.chunksCount} chunks</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{col.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 mt-2">
                    <span>{col.totalItems} documents</span>
                    <span className="text-emerald-600 font-bold">Updated {col.lastUpdated}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Ingested Documents List (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="documents-list" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <FileText className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Documents in {activeCollection.name}</h2>
                <p className="text-xs text-slate-500">Partitioned chunk files</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-emerald-50/60 p-0.5 rounded-lg border border-emerald-100">
              {(['All', 'Indexed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setDocFilter(f)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                    docFilter === f ? 'bg-emerald-600 text-white shadow-2xs' : 'text-emerald-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredDocs.length > 0 ? (
              filteredDocs.map(doc => (
                <div key={doc.id} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-slate-900 truncate block">{doc.filename}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{doc.fileType} · {doc.chunks} chunks · {doc.size}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    {doc.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic py-4 text-center">No documents in this filter</p>
            )}
          </div>
        </div>

      </div>

      {/* Modal for New Collection */}
      {showNewCollectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs grid place-items-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900">Create Vector Collection</h3>
            <form onSubmit={handleCreateCollection} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Collection Name</label>
                <input
                  type="text"
                  value={newColName}
                  onChange={e => setNewColName(e.target.value)}
                  placeholder="e.g. Riyadh Retail Store QA"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newColDesc}
                  onChange={e => setNewColDesc(e.target.value)}
                  placeholder="Describe knowledge domain..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-violet-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCollectionModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 shadow-2xs cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
