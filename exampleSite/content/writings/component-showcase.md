---
title: "Component Showcase"
date: 2026-04-30
draft: true
math: true
comments: false
description: "Exercises every shortcode and feature. Visible only with hugo server -D."
---

This draft post exercises every custom shortcode and feature. Visible only when you run `hugo server -D`.

## Math

Inline: $E = mc^2$, or using parens: \(E = mc^2\).

Block:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

With subscripts (passthrough extension keeps underscores intact):

$$
x_1^2 + x_2^2 = r^2
$$

## Code block

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

print(greet("world"))
```

```bash {lineNos=true}
# This example includes line numbers
hugo server -D --disableFastRender
```

If you don't specify the language, there's no code box specifically:

```
Just some monspaced, formatted text, not styled as code
```

## Side-by-side

{{< side-by-side left="**Left column** with some markdown and `inline code`." right="**Right column** also markdown. Can include [links](#)." >}}

## Evidence

{{< evidence >}}
A claim worth foregrounding. Something you want to stand out from surrounding prose — a key finding, a striking quote, or a result worth pausing on.
{{< /evidence >}}

## Breaker

Text above the breaker.

{{< breaker >}}

Text below the breaker.

## Figure (image with caption / credit)

{{< figure src="/img/things/ab.jpg" alt="Bayesian A/B calculator output" caption="Posterior distribution after 10 000 exposures per arm." credit="Example credit" crediturl="https://example.com" >}}

Figure with caption only (no credit):

{{< figure src="/img/things/csvpeek.jpg" alt="csvpeek terminal output" caption="Column profile for a 2 GB CSV — one pass, no memory pressure." >}}

## Video

{{< video src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Example video" caption="Rick Astley — *Never Gonna Give You Up* (1987). A reliable embed test." >}}

## Twitter / X

{{< twitter-card user="jack" id="20" >}}

## Gist

{{< gist user="octocat" id="6cad326836d38bd3a7ae" >}}

## Table

| Model       | Params | Context | Notes          |
|-------------|--------|---------|----------------|
| GPT-4o      | —      | 128k    | Multimodal     |
| Claude 3.5  | —      | 200k    | Strong at code |
| Llama 3.1   | 405B   | 128k    | Open weights   |

## Blockquote (Markdown)

> A standard Markdown blockquote, rendered with the post's serif typography and a left rule.

## Inline code

You can reference `variable_names`, `function_calls()`, and `Class.attributes` inline.
