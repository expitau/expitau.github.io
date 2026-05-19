---
title: "Quantum computing notes"
description: "Notes on quantum mechanics and quantum computing, based on my lecture notes and readings"
date: 'May 17 2025'
tags: ['lecture', 'math']
priority: -1
---

I'm not a physicist, but I am fascinated by quantum mechanics. Although [nobody understands quantum mechanics](https://www.youtube.com/watch?v=w3ZRLllWgHI), I've taken several courses on quantum information theory and quantum computing, and I hope I will be able to pass on my limited, misguided, and overly simplified understanding though this article.

## Part 1 - What is this notation?

Quantum states are floating point complex numbers. A quantum state with two different states will be represented by points on a 2D unit circle; with three different states it'll be a 3D unit sphere. 

Let's take an example qubit that has four possible states. When we measure its state, we will find it to be either 0, 1, 2, or 3. This can represent a variety of things, from the polarization of light to the deflection of a particle to the aliveness of a cat; but what matters is that it is *discrete*. We will never measure that it is in both state 1 AND state 2, even though it may be in a superposition of both prior to our measurement.
<!-- 
Measurement is weird, and what *counts* as a measurement feels like rule-bargaining with the universe. When we are able to observe something, our observation becomes entangled with the result of the state, and so the state is determined, and the quantum state is no longer able to interfere with itself. If we make a measurement, and then close our eyes, the particle will still be able to interfere with itself until we look at the output, but the result of the output will always be consistent with our measurement. -->

To represent our state, we can use vector coordinates. We'll construct a 4 dimensional vector, with each state being $\begin{pmatrix}1 \\ 0 \\ 0 \\ 0\end{pmatrix}$, $\begin{pmatrix}0 \\ 1 \\ 0 \\ 0\end{pmatrix}$, $\begin{pmatrix}0 \\ 0 \\ 1 \\ 0\end{pmatrix}$, and $\begin{pmatrix}0 \\ 0 \\ 0 \\ 1\end{pmatrix}$. Quantum states can be in superpositions of these states too, with we can represent as coordinates on a 4D sphere. That is, vectors $(w,x,y,z)$ such that $w^2 + x^2 + y^2 + z^2 = 1$. For example, one such state might be

$$\begin{pmatrix}\sqrt3/2 \\ 1/2 \\ 0 \\ 0\end{pmatrix}$$

We're going to be talking about these vectors a lot, and it is cumbersome to write them this way. Instead, we'll write a "ket"

$$\ket0 \coloneqq \begin{pmatrix}1 \\ 0 \\ 0 \\ 0\end{pmatrix}$$
$$\ket1 \coloneqq \begin{pmatrix}0 \\ 1 \\ 0 \\ 0\end{pmatrix}$$
$$\ket2 \coloneqq \begin{pmatrix}0 \\ 0 \\ 1 \\ 0\end{pmatrix}$$
$$\ket3 \coloneqq \begin{pmatrix}0 \\ 0 \\ 0 \\ 1\end{pmatrix}$$

This notation is unfamiliar, but fundamentally is just another way to write linear combinations of orthogonal vectors. So, our example state

$$\ket\psi = \begin{pmatrix}\sqrt3/2 \\ 1/2 \\ 0 \\ 0\end{pmatrix} = \frac{\sqrt3}{2}\ket0 + \frac{1}{2}\ket1$$

We've normalized our state so the sum of its squares is equal to one, and we can easily find the probabilities of measuring each state by squaring its component. So this state has a $3/4=75\%$ chance of measuring $\ket0$ and a $25\%$ change of measuring $\ket1$. 

## Part 2 - Operators

We can also take the conjugate transpose of our states, by transposing the matrix and negating the imaginary parts of each component. This is represented with a "bra":

$$\bra\psi = \ket\psi^\dagger = \begin{pmatrix} \sqrt3/2 & 1/2 & 0 & 0\end{pmatrix} = \frac{\sqrt3}{2}\bra0 + \frac{1}{2}\bra1$$

Note that the dot product of gives us the projection of a state onto a basis. For example, to get the $\ket0$ component of $\ket\psi$, we can calculate

$$\bra0 \cdot \ket\psi = \bra0 \cdot \left(\frac{\sqrt3}{2}\ket0 + \frac{1}{2}\ket1\right)$$
$$= \frac{\sqrt3}{2}\bra0 \cdot \ket0 + \frac{1}{2}\bra0 \cdot \ket1$$
$$= \frac{\sqrt3}{2}$$

Together, a "bra" and a "ket" make a "braket", which is a complex scalar corresponding to this projection.

$$\braket{0|\psi} = \frac{\sqrt3}{2}$$

If we want to multiply by $\ket0$ when we're finished, to get a new quantum state out of it, we can also do so

$$\ket0\braket{0|\psi} = \frac{\sqrt3}{2}\ket0$$

Similarly, we can take the $\ket1$ part of $\ket\psi$, and create a state out of that

$$\ket1\braket{1|\psi} = \frac{1}{2}\ket1$$

Add them together and we get our original state back

$$\ket0\braket{0|\psi} + \ket1\braket{1|\psi} = \frac{\sqrt3}{2}\ket0 + \frac{1}{2}\ket1$$

This gives us a great way to be able to map different states to each other though. For example, we can flip the $\ket0$ component to the $\ket1$ component and vice versa

$$\ket1\braket{0|\psi} + \ket0\braket{1|\psi} = \frac{1}{2}\ket0 + \frac{\sqrt3}{2}\ket1$$

$$= \ket1\bra0\cdot\ket\psi + \ket0\bra1\cdot\ket\psi$$
$$= (\ket1\bra0 + \ket0\bra1)\cdot\ket\psi$$
$$= \begin{pmatrix}0 & 1 & 0 & 0 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0\end{pmatrix}\ket\psi$$
$$= X\ket\psi$$

This is our first quantum gate! All quantum gates are unitary matricies that map one normalized state onto another normalized quantum state. 
