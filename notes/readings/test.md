---
layout: mknote
title: Short-range entangled states
tags: [reading]
summary: Defects
permalink: /notes/readings/test/
---

# Short-range entangled states


## Introduction

Here, we follow arXiv:1712.07950 to understand the relation between spatial defect and lower dimensional systems.

## Definitions


Since we are thinking in the context of classifying phases, we should first specify the meaning of equivalence relation, or physically, continuous deformation. A typical definition involves two types of operations:
1. changing parameters of the Hamiltonian without closing the gap
2. adding or stacking a trivial degrees of freedom

Local defect is defined as a modification of the system that is localized in the neighborhood of some locus of non-zero co-dimension. Similar to the discussion of gapped phases, we can define continuous deformation for gapped defects and their equivalence relation, accordingly. In the following, we always assume an energy gap for all the objects we discuss.

## Implications

We compose defects by spatially bringing them together. The composition is generally non-commutative. The notion of composition of defects leads to the notion of invertible defect. 

An important class of defects is the interface. The existence of an invertible interface implies that the two systems are in the same phase. To explain it, let $A$ and $B$ denote the two systems, $F$ the invertible interface from $A$ to $B$, i.e.
$$
F = A|B\,,\quad F^{-1} = B|A
$$
We can consider a gapped system that is made of a sequence of alternating slabs of the interface $F$ and $F^{-1}$. Fusing each $F$ to $F^{-1}$ on its left (right) will result in $A$ ($B$). This gives a smooth path that connects $A$ to $B$.

Defects in general gapped systems are complicated. In invertible phases, their behaviors are much more controlled due to the following observation.

Given any lower-dimensional systems, we can embedded it into a higher dimensional system as a defect. For invertible states, the converse is also true. Namely, there is a one-to-one correspondence between defects in an invertible theory and lower-dimensional (not necessarily invertible) systems. We now establish the converse, a defect in an invertible system can be continuously deformed to a lower-dimensional system. Basically, we can stack the system containing the defect with the inverse of the original whole system and continuously deform the bulk into a trivial system. Furthermore, defects in a trivial system is essentially the same as a stand-alone lower dimensional systems.

For defects in invertible phases, the composition can be viewed as stacking of lower-dimensional systems and becomes simpler. 

Looking at invertible interface in invertible phases in $n$-dimension, we have had two related observations:
1. The one-to-one correspondence between interfaces and $(n-1)$-dimensional systems directly implies a correspondence between invertible interfaces and invertible $(n-1)$-dimensional systems
2. Given an invertible interface, the two $n$-dimensional systems on the sides are in the same phase
We can combine the two observations into the following statement about invertible phases across various dimensions.

Let $L_n$ denote the space of invertible states in $n$ dimensions. They form a spectrum

A spectrum $T$ in algebraic topology consists of sequence of topological spaces $T_{n}, n = ..., -1, 0, 1,...$, together with the following two data:
1. Each space $T_n$ is equipped with a distinguished base point 0
2. Let $\Omega T_n$ denote the space of loops in $T_n$ that starts and ends at 0, then we have the homotopy equivalence $T_{n-1} \sim \Omega T_n$ 
The suspension $\Sigma T$ of a spectrum $T$ is defined by $(\Sigma T)_n = T_{n+1}$ 

Let us first outline how to map between $L_{n-1}$ and $\Omega L_n$:
(1) $L_{n-1} \rightarrow \Omega L_{n}$: consider $A_0 \in L_{n-1}$ and denote its inverse by $A_0'$. We can construct an $n$-dimensional system by alternating $A_0$ and $A_0'$ along a transverse direction, i.e. 
$$
A_0 \otimes A_{0}' \otimes A_0 \otimes A_0'\otimes \ldots
$$
Since we can smoothly connect $A_0 \otimes A_0'$ into a trivial state, this constructs a trivial $n$-dimensional state. 

(2) $\Omega L_n \rightarrow L_{n-1}$:  
