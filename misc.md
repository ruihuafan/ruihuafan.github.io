---
title: Miscellaneous
permalink: /misc/
---

A collection of short notes and half-baked thoughts.

<div class="post-filter" id="post-filter" role="group" aria-label="Filter by subject"></div>

<div class="post-list" id="post-list">
{% assign posts = site.mknotes | sort: "date" | reverse %}
{% for note in posts %}
  {% assign subj = note.subject | downcase %}
  <a class="post-card" href="{{ note.url | relative_url }}" data-subject="{{ subj }}">
    <span class="post-card-head">
      <span class="post-tag post-tag--{{ subj }}">{% if note.subject == "AI" %}AI{% else %}{{ note.subject | capitalize }}{% endif %}</span>
      <span class="post-date">{{ note.date | date: "%Y-%m" }}</span>
    </span>
    <span class="post-title">{{ note.title }}</span>
    {% if note.summary %}<span class="post-summary">{{ note.summary }}</span>{% endif %}
  </a>
{% endfor %}
</div>

<p class="experiments-note">
  Web experiment: an AI-generated <a href="{{ '/apps/world_news.html' | relative_url }}">world news</a> summary page.
</p>

<script>
  (function () {
    var list = document.getElementById('post-list');
    var filterBar = document.getElementById('post-filter');
    if (!list || !filterBar) return;

    var cards = Array.prototype.slice.call(list.querySelectorAll('.post-card'));
    var labels = { ai: 'AI' };
    var subjects = [];
    cards.forEach(function (c) {
      var s = c.getAttribute('data-subject');
      if (s && subjects.indexOf(s) === -1) subjects.push(s);
    });

    function label(s) { return labels[s] || s.charAt(0).toUpperCase() + s.slice(1); }

    var chips = [];
    function apply(value) {
      chips.forEach(function (ch) {
        ch.classList.toggle('is-active', ch.getAttribute('data-filter') === value);
      });
      cards.forEach(function (c) {
        c.style.display = (value === 'all' || c.getAttribute('data-subject') === value) ? '' : 'none';
      });
    }
    function makeChip(value, text) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'post-chip';
      b.textContent = text;
      b.setAttribute('data-filter', value);
      b.addEventListener('click', function () { apply(value); });
      filterBar.appendChild(b);
      chips.push(b);
    }

    if (subjects.length > 1) {
      makeChip('all', 'All');
      subjects.forEach(function (s) { makeChip(s, label(s)); });
    }
    apply('all');
  })();
</script>
