---
title: Notes
permalink: /notes/
toc: true
toc_selector: "h1, h2"
---

I tried to collect some notes here. Many are not really finished, and they probably contain tons of typos and mistakes. You are more than welcome to email me questions and comments.

I have learned a lot from my friends and colleagues. Many notes you will find on this website are actually based on discussions with them or motivated by them.

# Course Notes

Below are notes from courses that I took and taught during my PhD. 

## Statistical Mechanics and Thermodynamics

- [Probabilities](/notes/course_notes/probability.pdf)
- [Free quantum gases](/notes/course_notes/free_quantum_gas.pdf)

## Special Topics in Condensed Matter Physics

- [Linear response](/notes/course_notes/linear_response.pdf)

# Physics Notes

## SL2 in Physics

Exact solutions are rare in many-body physics. They often rely on delicate mathematical structures. One object that keeps showing up in exact solutions is the SL2 group. Here are some notes collecting related results.

- [SL2 group and unitary representations](/notes/random_stuff/sl2R.pdf)
- [SL2 = Harmonic oscillator](/notes/random_stuff/sl2_and_harmonic_oscillator.pdf)
- [SL2 and AdS2](/notes/random_stuff/ads2.pdf)
- [SL2 and SYK](/notes/random_stuff/coupled_SYK4.pdf)

## Quantum Field Theory

- [Analytical structure of two point functions](/notes/QFT/2pt_function.pdf)
- [Average null energy condition: an example](/notes/QFT/ANEC.pdf)

## Conformal Field Theory

Conformal field theories, another much larger class of solvable theories, can be regarded as an upgraded version of the above SL2 story. Here are some notes on these topics.

- [Driven oscillator and Rep of Virasoro can meet at Hill's eqn](/notes/CFTs/hill_eqn_coadjoint_orbit.pdf)
- [Notes for a journal club](/notes/CFTs/CFTNote2018.pdf)
- [Coulomb gas formalism](/notes/CFTs/coulomb_gas.pdf)
- [Global quench in CFTs](/notes/CFTs/global_quench.pdf)
- [Spectral form factor of CFTs](/notes/CFTs/SFF_CFT.pdf)
- [CFT approach to bipartite entanglement of gapped states](/notes/CFTs/TopoEntanglementCFT.pdf)

# Miscellaneous Mathematical Notes

- [Ising model on planar graphs](/notes/random_stuff/ising_on_planar_graphs.pdf)
- [Yang's conjecture around 2018](/notes/random_stuff/yang_last_conjecture.pdf)

# Random thoughts

{% assign subjects = "physics,math,AI,random" | split: "," %}

{% for subject in subjects %}
  {% assign subject_notes = site.mknotes | where: "subject", subject | sort: "date" | reverse %}
  {% if subject_notes.size > 0 %}
  <p class="muted" style="font-weight:700; margin-top:24px; margin-bottom:8px;">
    {% if subject == "AI" %}AI{% else %}{{ subject | capitalize }}{% endif %}
  </p>

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
