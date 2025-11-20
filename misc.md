---
layout: default
title: Miscellaneous
permalink: /misc/
---

I have not decided what to put here. 

An AI-generated webpage that summarizes some news today: [Global News](/apps/world_news.html)

When I visited Tsinghua in 2018, Yang was working on a mathematical conjecture and would like a few students to verify it for him. Here is a MMA note stating that conjecture and some numerical tests. It might be related to Lee-Yang zeros.

- [Yang's conjecture around 2018](/notes/random_stuff/yang_last_conjecture.pdf)

# Random notes by subject

{% assign subjects = "physics,math,random" | split: "," %}

{% for subject in subjects %}
  {% assign subject_notes = site.mknotes | where: "subject", subject | sort: "date" | reverse %}
  {% if subject_notes.size > 0 %}
  ## {{ subject | capitalize }}

  <ul>
    {% for note in subject_notes %}
      <li>
        <span style="color: #666; font-family: monospace;">
          {{ note.date | date: "%Y-%m" }}
        </span>
        &raquo;
        <a href="{{ note.url }}">{{ note.title }}</a>
      </li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}


