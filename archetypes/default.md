---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
draft: true
description: ""   # used in SEO meta, og:description, and shown in the listing (only for notes)
image: ""         # optional, path relative to static/ e.g. img/things/foo.jpg, used for article listing and social media, but not on the generated page
tags: []          # comma separated list of tags
comments: false   # enable giscus comments (requires params.comments.enabled in hugo.toml)
---

<!-- Populate content here using markdown -->
