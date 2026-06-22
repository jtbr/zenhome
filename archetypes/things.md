---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ now.Format "2006-01-02" }} # optional for things, "2024" or "2024-03" (with quotes) show partial date
draft: true
weight: 50        # sort order on listing page — lower appears first
tagline: ""       # short blurb shown on the card and detail page header
description: ""   # longer text shown in the modal (falls back to tagline)
image: ""         # path relative to static/ e.g. img/things/foo.jpg; used for card and social media
image_fit: cover  # cover (default, crops to fill) or contain (shows full image at natural proportions)
image_text: ""    # alternative to providing an image, a graphic will be made with this as the text (see README for related options)
links:            # up to two buttons shown in the modal
  - label: ""
    url: ""
tags: []
math: false       # enable KaTeX rendering on details page (if generated)
comments: false   # enable giscus comments on details page (if generated)
---

<!-- if you fill out the content here, a "details" page will be generated with a link in the listings modal -->
