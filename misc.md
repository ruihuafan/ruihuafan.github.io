---
layout: default
title: Miscellaneous
permalink: /misc/
---

I have not decided what to put here. 

An AI-generated webpage that summarizes some news today: [Global News](/apps/world_news.html)

## Markdown notes

<ul>
  {% assign notes_sorted = site.mknotes | sort: "date" | reverse %}
  {% for note in notes_sorted %}
    <li>
      <span style="color: #666; font-family: monospace;">
        {{ note.date | date: "%Y-%m" }}
      </span>
      &raquo;
      <a href="{{ note.url }}">{{ note.title }}</a>

      {% if note.tags %}
        <br>
        <small>Tags: {{ note.tags | join: ", " }}</small>
      {% endif %}
    </li>
  {% endfor %}
</ul>


Here is a random imcomplete note on short-range entangled state

- [Short-range entangled states](/notes/random_stuff/SRE/)

When I visited Tsinghua in 2018, Yang was working on a mathematical conjecture and would like a few students to verify it for him. Here is a MMA note stating that conjecture and some numerical tests. It might be related to Lee-Yang zeros.

- [Yang's conjecture around 2018](/notes/random_stuff/yang_last_conjecture.pdf)