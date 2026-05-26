---
title: "Component Showcase"
date: 2026-04-30
draft: true
math: true
comments: false
image: "img/things/ab.jpg"
tags: ["ml", "practice"]
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

Code blocks and gists support a "copy all" feature using the button that appears on hover.

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
Just some monospaced, formatted text, not styled as code,
but which may span multiple lines.
  ...,,,.
   _   _
 [ o   o ]
     >
   \___/
```

## Inline code

You can reference `variable_names`, `function_calls()`, and `Class.attributes` inline.

## Gist

To choose a specific file in a multi-file gist, use the `file` parameter, or otherwise it will show them all. The height may be limited using the height parameter and any css unit (px, em, rem, vh, etc).

{{< gist user="octocat" id="6cad326836d38bd3a7ae" >}}


## Side-by-side

You can also display two columns side by side. Here's a short form:

{{< side-by-side left="**Left column** with some markdown in short form." right="**Right column** also **markdown**" />}}

And here is the form suitable for longer segments:

{{< side-by-side  >}}
**Left column** markdown with an image ![Bayesian A/B calculator](/img/things/ab.jpg)

|||

**Right column** is also markdown. Can include most any styling you might want, including:
 - [links](#), and
 - `inline code`, among other things
{{< /side-by-side  >}}

## Evidence

{{< evidence >}}
A claim worth foregrounding. Something you want to stand out from surrounding prose — a key finding, a striking quote, or a result worth pausing on.

Did you notice that headers provide an anchor link directly to that section?
{{< /evidence >}}

## Breaker

Text above the breaker.

{{< breaker >}}

Text below the breaker.

## Blockquote (Markdown)

> A standard Markdown blockquote, rendered with the post's serif typography and a left rule.


## Table

| Model       | Params | Context | Notes          |
|-------------|--------|---------|----------------|
| GPT-4o      | —      | 128k    | Multimodal     |
| Claude 3.5  | —      | 200k    | Strong at code |
| Llama 3.1   | 405B   | 128k    | Open weights   |


## Figure (image with caption / credit)

{{< figure src="/img/things/ab.jpg" alt="What an amazing picture" caption="What an amazing picture" credit="Example credit" crediturl="https://example.com" >}}

Figure with caption only (no credit):

{{< figure src="/img/things/csvpeek.jpg" alt="terminal output" caption="sample terminal output" >}}

## Collapsible sections

Details sections work out of the box

<details>
<summary>Click to expand</summary>

### a subsection

**Markdown** works inside the details, but not inside the summary. To style that, use html tags, or add styling or classes to the summary tag itself

</details>

## Video

should work with any video provider, using their embed-style link

{{< video src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="Example video" caption="Rick Astley — *Never Gonna Give You Up* (1987). A youtube embedded video" >}}

{{< video src="https://player.vimeo.com/video/1138248349?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"  title="A bear remmbers" caption="Zhang + Knight *A bear remembers* (2025). A vimeo-based video." >}}


## Twitter / X

{{< twitter-card user="jack" id="20" >}}

## Bluesky

{{< bluesky-card handle="daveyfwright.bsky.social" id="3ml5eibsmws2l" >}}

## Mastodon

{{< mastodon-card url="https://mastodon.social/@bagder/116526581698174258" >}}

## Emojis

Using [github emojis](https://gist.github.com/rxaviers/7360908):
:brain: :heart: :smile:

You can also use plain unicode: ❤️ 💬 🚀