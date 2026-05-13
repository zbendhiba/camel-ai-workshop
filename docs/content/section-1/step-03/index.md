---
title: "Step 03: Content-Based Router with LLM"
layout: :theme/page
---

This step demonstrates one of the most powerful combinations in this workshop: using an LLM to make routing decisions within a Camel Content-Based Router. Instead of routing based on simple header values or message format, the LLM classifies the message semantically, and Camel routes it accordingly.

This is something a standalone LLM framework cannot do natively. Camel's EIP-driven orchestration adds a dimension that goes beyond simple prompt-response interactions.

## The scenario

Customer messages arrive as text files in a `data/` directory. Each message needs to be classified as a COMPLAINT, QUESTION, or PRAISE, then routed to a specialized handler. The LLM handles the classification, and Camel handles the routing logic.

## OpenAI component

The main route reads files, sends them to the LLM for classification using a system message, then uses a `choice` (Content-Based Router) to dispatch:

```yaml
- route:
    id: classify-messages
    from:
      uri: file:../data
      parameters:
        noop: true
      steps:
        - log:
            message: "Processing: $\{headers.CamelFileName}"
        - setVariable:
            name: originalMessage
            simple: "$\{body}"
        - setHeader:
            name: CamelOpenAISystemMessage
            constant: >-
              You are a message classifier. You MUST reply with exactly one word:
              COMPLAINT, QUESTION, or PRAISE. Nothing else.
        - setBody:
            simple: "Classify this message:\n$\{variable.originalMessage}"
        - to:
            description: Classify via LLM
            uri: openai:chat-completion
            parameters:
              temperature: 0.0
        - setVariable:
            name: category
            simple: "$\{body.trim()}"
        - setBody:
            simple: "$\{variable.originalMessage}"
        - log:
            message: "Category: $\{variable.category} — File: $\{headers.CamelFileName}"
        - choice:
            when:
              - simple: "$\{variable.category} == 'COMPLAINT'"
                steps:
                  - to:
                      uri: direct:handle-complaint
              - simple: "$\{variable.category} == 'QUESTION'"
                steps:
                  - to:
                      uri: direct:handle-question
            otherwise:
              steps:
                - to:
                    uri: direct:handle-other
```

Notice the use of `CamelOpenAISystemMessage` header to set the system prompt, and `temperature: 0.0` on the endpoint for deterministic classification. The original message is preserved in a variable before sending the classification prompt.

## LangChain4j-agent (Forage)

The same logic, but using the LangChain4j-agent component:

```yaml
- route:
    id: classify-messages
    from:
      uri: file:../data
      parameters:
        noop: true
      steps:
        - log:
            message: "Processing: $\{headers.CamelFileName}"
        - setHeader:
            name: originalMessage
            simple: "$\{body}"
        - setBody:
            simple: >
              Classify the following customer message into exactly one category:
              COMPLAINT, QUESTION, or PRAISE.
              Reply with ONLY the category name, nothing else.

              Message: $\{headers.originalMessage}
        - to:
            uri: langchain4j-agent:classifier
        - setHeader:
            name: category
            simple: "$\{body.trim()}"
        - setBody:
            simple: "$\{headers.originalMessage}"
        - log:
            message: "Category: $\{headers.category} — File: $\{headers.CamelFileName}"
        - choice:
            when:
              - simple: "$\{headers.category} == 'COMPLAINT'"
                steps:
                  - to:
                      uri: direct:handle-complaint
              - simple: "$\{headers.category} == 'QUESTION'"
                steps:
                  - to:
                      uri: direct:handle-question
            otherwise:
              steps:
                - to:
                    uri: direct:handle-other
```

The classification prompt is embedded directly in the body. Forage handles the model configuration, including temperature, in the properties file.

## The handler routes

Each category has its own handler. The question handler sends the original message back to the LLM to generate a response. Here is the OpenAI version:

```yaml
- route:
    id: handle-complaint
    from:
      uri: direct:handle-complaint
      steps:
        - log:
            message: "COMPLAINT detected — escalating: $\{body}"

- route:
    id: handle-question
    from:
      uri: direct:handle-question
      steps:
        - log:
            message: "QUESTION detected — generating answer for: $\{body}"
        - setHeader:
            name: CamelOpenAISystemMessage
            constant: >-
              You are a helpful customer support agent. Answer concisely.
        - to:
            description: Generate answer
            uri: openai:chat-completion
        - log:
            message: "Generated answer: $\{body}"

- route:
    id: handle-other
    from:
      uri: direct:handle-other
      steps:
        - log:
            message: "OTHER/PRAISE — acknowledged: $\{body}"
```

## Sample data

The `data/` directory is shared between both variants and contains sample messages for each category. You can add your own text files to test the classification.

## Running the step

<div class="roq-terminal roq-terminal-animated" style="--term-delay: 0.3">
  <div class="roq-terminal-bar">
    <span class="roq-terminal-dot red"></span>
    <span class="roq-terminal-dot yellow"></span>
    <span class="roq-terminal-dot green"></span>
    <span class="roq-terminal-title">Run</span>
    <button class="roq-copy-btn" title="Copy commands"><i class="fa-regular fa-copy"></i></button>
  </div>
  <div class="roq-terminal-body">
    <span class="line" style="--line-index: 0"><span class="prompt">$</span> <span class="cmd">cd</span> section-1/step-03/openai</span>
    <span class="line" style="--line-index: 1"><span class="prompt">$</span> <span class="cmd">camel</span> run *</span>
  </div>
</div>

Watch the logs to see each file being classified and routed. The LLM's classification drives Camel's routing decisions in real time.

**Important:** Temperature is set to `0.0` for deterministic classification. A higher temperature would introduce randomness that could cause unpredictable routing.
