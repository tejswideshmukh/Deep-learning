// GenAI + Agentic AI Learning Pipeline

export const INITIAL_GENAI_TOPICS = [
  // ===== LLM FOUNDATIONS =====
  {
    id: 'llm-foundations',
    name: 'LLM Foundations',
    color: '#ec4899',
    sections: [
      {
        id: 'llm-core',
        name: 'How LLMs Work',
        topics: [
          { id: 'llm-1', name: 'Transformer architecture recap', mastery: 0, completed: false },
          { id: 'llm-2', name: 'Tokenization (BPE, WordPiece, SentencePiece)', mastery: 0, completed: false },
          { id: 'llm-3', name: 'Pre-training vs Fine-tuning vs RLHF', mastery: 0, completed: false },
          { id: 'llm-4', name: 'Temperature, Top-k, Top-p, Beam Search', mastery: 0, completed: false },
          { id: 'llm-5', name: 'Context Windows, KV Cache', mastery: 0, completed: false },
          { id: 'llm-6', name: 'Scaling Laws, Emergent Abilities', mastery: 0, completed: false },
        ],
      },
      {
        id: 'prompt-eng',
        name: 'Prompt Engineering',
        topics: [
          { id: 'pe-1', name: 'Zero-shot, Few-shot prompting', mastery: 0, completed: false },
          { id: 'pe-2', name: 'Chain-of-Thought prompting', mastery: 0, completed: false },
          { id: 'pe-3', name: 'ReAct prompting', mastery: 0, completed: false },
          { id: 'pe-4', name: 'Self-consistency, Tree of Thought', mastery: 0, completed: false },
          { id: 'pe-5', name: 'System prompts, role-based prompting', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== WORKING WITH APIs =====
  {
    id: 'llm-apis',
    name: 'LLM APIs & Tools',
    color: '#06b6d4',
    sections: [
      {
        id: 'apis',
        name: 'API Integration',
        topics: [
          { id: 'api-1', name: 'OpenAI API (Chat, Embeddings)', mastery: 0, completed: false },
          { id: 'api-2', name: 'Anthropic API (Claude, Messages)', mastery: 0, completed: false },
          { id: 'api-3', name: 'Open-source: HuggingFace, vLLM, Ollama', mastery: 0, completed: false },
          { id: 'api-4', name: 'Structured Output (JSON, Function Calling)', mastery: 0, completed: false },
          { id: 'api-5', name: 'Streaming responses', mastery: 0, completed: false },
          { id: 'api-6', name: 'Token counting, cost optimization', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== RAG =====
  {
    id: 'rag',
    name: 'RAG Pipeline',
    color: '#22c55e',
    sections: [
      {
        id: 'embeddings',
        name: 'Embeddings & Vector Search',
        topics: [
          { id: 'emb-1', name: 'What embeddings are, vector spaces', mastery: 0, completed: false },
          { id: 'emb-2', name: 'OpenAI / Sentence Transformer embeddings', mastery: 0, completed: false },
          { id: 'emb-3', name: 'Cosine similarity, semantic search', mastery: 0, completed: false },
          { id: 'emb-4', name: 'Vector DBs: Chroma, Pinecone, FAISS', mastery: 0, completed: false },
          { id: 'emb-5', name: 'Implement basic vector search from scratch', mastery: 0, completed: false },
        ],
      },
      {
        id: 'rag-pipeline',
        name: 'RAG Pipeline',
        topics: [
          { id: 'rag-1', name: 'Chunking strategies (fixed, semantic, recursive)', mastery: 0, completed: false },
          { id: 'rag-2', name: 'Load → Chunk → Embed → Store → Retrieve → Generate', mastery: 0, completed: false },
          { id: 'rag-3', name: 'Build a full RAG chatbot', mastery: 0, completed: false },
          { id: 'rag-4', name: 'Hybrid search (vector + keyword)', mastery: 0, completed: false },
          { id: 'rag-5', name: 'Re-ranking (cross-encoders)', mastery: 0, completed: false },
          { id: 'rag-6', name: 'Query transformation, HyDE', mastery: 0, completed: false },
          { id: 'rag-7', name: 'Evaluation: faithfulness, relevance, recall', mastery: 0, completed: false },
          { id: 'rag-8', name: 'Frameworks: LangChain, LlamaIndex', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== FINE-TUNING =====
  {
    id: 'fine-tuning',
    name: 'Fine-Tuning',
    color: '#eab308',
    sections: [
      {
        id: 'ft-core',
        name: 'Fine-Tuning Techniques',
        topics: [
          { id: 'ft-1', name: 'When to fine-tune vs prompt vs RAG', mastery: 0, completed: false },
          { id: 'ft-2', name: 'Full Fine-tuning (concept)', mastery: 0, completed: false },
          { id: 'ft-3', name: 'LoRA / QLoRA implementation', mastery: 0, completed: false },
          { id: 'ft-4', name: 'Dataset preparation (instruction format)', mastery: 0, completed: false },
          { id: 'ft-5', name: 'Fine-tuning with HuggingFace + PEFT', mastery: 0, completed: false },
          { id: 'ft-6', name: 'RLHF / DPO (concept level)', mastery: 0, completed: false },
          { id: 'ft-7', name: 'Quantization: 4-bit, 8-bit, GGUF', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== AGENTIC AI =====
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    color: '#ef4444',
    sections: [
      {
        id: 'agent-foundations',
        name: 'Agent Foundations',
        topics: [
          { id: 'ag-1', name: 'LLM as reasoning engine', mastery: 0, completed: false },
          { id: 'ag-2', name: 'Perception → Reasoning → Action loop', mastery: 0, completed: false },
          { id: 'ag-3', name: 'Agent vs Chain vs Simple LLM call', mastery: 0, completed: false },
        ],
      },
      {
        id: 'tool-use',
        name: 'Tool Use & Function Calling',
        topics: [
          { id: 'tu-1', name: 'Define tools, schemas', mastery: 0, completed: false },
          { id: 'tu-2', name: 'LLM decides which tool to call', mastery: 0, completed: false },
          { id: 'tu-3', name: 'Implement tool-calling agent from scratch', mastery: 0, completed: false },
          { id: 'tu-4', name: 'Error handling, tool validation', mastery: 0, completed: false },
        ],
      },
      {
        id: 'agent-arch',
        name: 'Agent Architectures',
        topics: [
          { id: 'aa-1', name: 'ReAct (Reasoning + Acting)', mastery: 0, completed: false },
          { id: 'aa-2', name: 'Plan-and-Execute', mastery: 0, completed: false },
          { id: 'aa-3', name: 'Reflection / Self-critique agents', mastery: 0, completed: false },
          { id: 'aa-4', name: 'Multi-agent systems', mastery: 0, completed: false },
          { id: 'aa-5', name: 'Implement each from scratch', mastery: 0, completed: false },
        ],
      },
      {
        id: 'memory',
        name: 'Memory Systems',
        topics: [
          { id: 'mem-1', name: 'Short-term (conversation buffer)', mastery: 0, completed: false },
          { id: 'mem-2', name: 'Long-term (vector store, summarization)', mastery: 0, completed: false },
          { id: 'mem-3', name: 'Episodic memory', mastery: 0, completed: false },
          { id: 'mem-4', name: 'Implement memory manager from scratch', mastery: 0, completed: false },
        ],
      },
      {
        id: 'multi-agent',
        name: 'Multi-Agent & Frameworks',
        topics: [
          { id: 'ma-1', name: 'CrewAI, AutoGen, LangGraph', mastery: 0, completed: false },
          { id: 'ma-2', name: 'Supervisor vs Peer architectures', mastery: 0, completed: false },
          { id: 'ma-3', name: 'Build a multi-agent system', mastery: 0, completed: false },
        ],
      },
      {
        id: 'eval-safety',
        name: 'Evaluation & Safety',
        topics: [
          { id: 'es-1', name: 'Agent evaluation frameworks', mastery: 0, completed: false },
          { id: 'es-2', name: 'Guardrails, content filtering', mastery: 0, completed: false },
          { id: 'es-3', name: 'Hallucination detection', mastery: 0, completed: false },
          { id: 'es-4', name: 'Human-in-the-loop patterns', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== ADVANCED GENAI =====
  {
    id: 'advanced-genai',
    name: 'Advanced GenAI',
    color: '#a855f7',
    sections: [
      {
        id: 'adv-genai',
        name: 'Advanced Topics',
        topics: [
          { id: 'adv-1', name: 'Multimodal AI (text + image + audio)', mastery: 0, completed: false },
          { id: 'adv-2', name: 'Vision-Language Models (GPT-4V, LLaVA)', mastery: 0, completed: false },
          { id: 'adv-3', name: 'Speech: Whisper, TTS', mastery: 0, completed: false },
          { id: 'adv-4', name: 'Model Serving (FastAPI + LLM)', mastery: 0, completed: false },
          { id: 'adv-5', name: 'Streaming APIs + Docker deploy', mastery: 0, completed: false },
          { id: 'adv-6', name: 'AI Safety & Ethics', mastery: 0, completed: false },
        ],
      },
    ],
  },
];
