---
title: Miscellaneous
permalink: /misc/
---

Small browser apps and experiments. Everything here is self-contained and runs entirely in your browser.

<div class="post-list">
{% for app in site.data.apps %}
  {% if app.status == "wip" %}
  <div class="post-card post-card--wip">
    <span class="post-card-head">
      <span class="post-tag post-tag--wip">in progress</span>
    </span>
    <span class="post-title">{{ app.title }}</span>
    {% if app.description %}<span class="post-summary">{{ app.description }}</span>{% endif %}
  </div>
  {% else %}
  <a class="post-card" href="{{ app.href | relative_url }}">
    <span class="post-card-head">
      {% if app.tag %}<span class="post-tag post-tag--{{ app.tag }}">{{ app.tag }}</span>{% endif %}
    </span>
    <span class="post-title">{{ app.title }}</span>
    {% if app.description %}<span class="post-summary">{{ app.description }}</span>{% endif %}
  </a>
  {% endif %}
{% endfor %}
</div>
