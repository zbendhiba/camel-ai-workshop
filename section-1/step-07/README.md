## Step 07 — RAG via Camel

Ingest documents through a Camel route, embed and store in a vector database, then retrieve at query time.

**Camel EIP:** Pipeline (ingest → embed → store → query → enrich)
**AI concept:** Retrieval-Augmented Generation

**Variants:** LangChain4j-agent shines here — Forage configures embeddings and vector DB beans. The OpenAI component handles only chat, not embeddings or vector search.
