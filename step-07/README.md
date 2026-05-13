## Step 06 — Agent + Tools as Routes

Define tools as Camel routes that the LLM agent can invoke autonomously.

**Camel EIP:** Direct endpoints as tool providers
**AI concept:** Function calling / tool use

**Variants:** LangChain4j-agent shines here — tools are registered as Camel routes via Forage, and the agent decides when to call them. The OpenAI component does not support tool invocation natively.
