---
title: Notes
permalink: /notes/
toc: true
toc_selector: "h1, h2"
---

Most of my notes will show up as the appendices of my papers. Here are some ones that do not. Consequently, many of them are not really finished and contain tons of typos and mistakes. You are more than welcome to email me questions and comments.

Many notes you will find on this website will be based on discussions with my friends and colleagues. So this is another chance for me to acknowledge them.

# Physics

## Condensed Matter Physics 

Below are notes from a course (Special topics in condensed matter physics) that I taught together with Ashvin as his TA during my PhD.

- [Localized majorana zero modes](/notes/course_notes/1D_fermion_classification.pdf)
- [Classification of 1D time-reversal symmetric fermion chain](/notes/course_notes/1D_TRI_fermion_classification.pdf)
- [Mean field is qualitatively correct with a rank-1 MPS but a wrong answer with a rank-2 MPS](/notes/course_notes/MPS_meanfield.pdf)
- [Kitaev's honeycomb model](/notes/course_notes/honeycomb_model.pdf)
- [Linear response](/notes/course_notes/linear_response.pdf)

## SL2 in Physics

Exact solutions are rare in many-body physics. They often rely on delicate mathematical structures. One object that keeps showing up in exact solutions is the SL2 group. Here are some notes collecting related results.

- [SL2 group and unitary representations](/notes/random_stuff/sl2R.pdf)
- [SL2 = Harmonic oscillator](/notes/random_stuff/sl2_and_harmonic_oscillator.pdf)
- [SL2 and AdS2](/notes/random_stuff/ads2.pdf)
- [SL2 and SYK](/notes/random_stuff/coupled_SYK4.pdf)
- [Particle in a hyperbolic space with magnetic field](/notes/random_stuff/add_magnetic_field_to_hyperbolic_space.pdf) 

## Conformal Field Theory (CFT)

Conformal field theories, another much larger class of solvable theories, can be regarded as an upgraded version of the above SL2 story. Here are some notes on these topics.

- [Driven oscillator and Rep of Virasoro can meet at Hill's eqn](/notes/CFTs/hill_eqn_coadjoint_orbit.pdf)
- [Notes for a journal club](/notes/CFTs/CFTNote2018.pdf)
- [Coulomb gas formalism](/notes/CFTs/coulomb_gas.pdf)
- [Global quench in CFTs](/notes/CFTs/global_quench.pdf)
- [Spectral form factor of CFTs](/notes/CFTs/SFF_CFT.pdf)
- [CFT approach to bipartite entanglement of gapped states](/notes/CFTs/TopoEntanglementCFT.pdf)

## Quantum Field Theory (QFT)

CFT is a measure-zero subset of a larger class of theory, quantum field theory. They are much harder to study in general.

- [Analytical structure of two point functions](/notes/QFT/2pt_function.pdf)
- [Average null energy condition: an example](/notes/QFT/ANEC.pdf)
- [Quantizing Chern-Simons theory](/notes/QFT/QuantizationChernSimons.pdf)
- [Higher-form symmetry and some toy examples of its anomalies](/notes/QFT/HigherFormSym.pdf)

## Statistical Mechanics and Thermodynamics

- [Probabilities](/notes/course_notes/probability.pdf)
- [Free quantum gases](/notes/course_notes/free_quantum_gas.pdf)
- [Ising model on planar graphs](/notes/random_stuff/ising_on_planar_graphs.pdf)

# Mathematics

- [Yang's conjecture around 2018](/notes/math/yang_last_conjecture.pdf) (When I visited Tsinghua in 2018, Yang was working on a mathematical conjecture and would like a few students to verify it for him. Here is a MMA note stating that conjecture and some numerical tests. It might be related to Lee-Yang zeros.)
- [Dirichlet theorem](/notes/math/2020chrismas.pdf)
- [ABC of Teichmuller space and Fenchel-Nielsen coordinate](/notes/math/TeichmullerABC.pdf)

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
