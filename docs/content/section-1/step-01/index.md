---
title: "Step 01 — Introduction to Camel CLI"
layout: :theme/page
---

In this first step, you will set up the development environment and create your first Apache Camel route. By the end, you will have a running route that you can visualize in Kaoto.

## Creating your first route

Create a file called `route.camel.yaml` with the following content:

```yaml
- route:
    id: hello-camel
    from:
      uri: timer:hello
      parameters:
        period: 5000
      steps:
        - setBody:
            constant: "Hello from Apache Camel!"
        - log:
            message: "$\{body}"
```

This route uses a `timer` component that fires every 5 seconds, sets the message body to a greeting, and logs it to the console.

## Running the route

Open a terminal in the step directory and run:

<div class="roq-terminal roq-terminal-static">
  <div class="roq-terminal-bar">
    <span class="roq-terminal-dot red"></span>
    <span class="roq-terminal-dot yellow"></span>
    <span class="roq-terminal-dot green"></span>
    <span class="roq-terminal-title">Run</span>
    <button class="roq-copy-btn" title="Copy commands"><i class="fa-regular fa-copy"></i></button>
  </div>
  <div class="roq-terminal-body">
    <span class="line"><span class="prompt">$</span> <span class="cmd">camel</span> run *</span>
  </div>
</div>

You should see "Hello from Apache Camel!" printed every 5 seconds. Press `Ctrl+C` to stop.

## Visualizing with Kaoto

Open the `route.camel.yaml` file in VS Code. If the Kaoto extension is installed, you can click the Kaoto icon to see a visual representation of the route. This visual editor works for all `.camel.yaml` files and will become increasingly useful as routes grow more complex.

You can also edit routes visually in Kaoto — adding components, configuring parameters, and connecting steps by drag-and-drop. The YAML file updates automatically.
