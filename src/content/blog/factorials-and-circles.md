---
title: "Factorials and circles"
description: "The nature of math"
pubDate: 'Jun 30 2024'
tags: ['opinion', 'math']
---

Back in highschool, I discovered the magic of the Desmos graphing calculator. Being the nerdy tinkerer I was, I pushed this tool to its limits, making lots of fun graphs, even including a fully-playable version of pong. 

<div class="embed">
    <iframe src="https://www.desmos.com/calculator/zaeozsxl0q?embed" style="border: 1px solid #ccc" frameborder=0></iframe>
</div>

So when we learned about factorials in math class, one of the first things I did was plug it into Desmos to see what it looked like.

<div class="embed">
    <iframe src="https://www.desmos.com/calculator/kuim0f5olg?embed" style="border: 1px solid #ccc" frameborder=0></iframe>
</div>

I was very suprised at what I got. I was expecting a pointwise function on every positive integer, but not only did I get rational numbers, the graph went crazy in the negatives!

I asked the poor substitute teacher what was happening, and they gave a confused attempt at an answer; but a quick Google search pointed me towards the gamma function, defined as follows

$$\displaystyle n! := \Gamma(n + 1) = \int_0^\infty t^{n}e^{-t}dt$$

The reason we define $n!$ as $\Gamma(n + 1)$ instead of $\Gamma(n)$ is, as 19th-century mathematician Cornelius Lanczos puts it "[void of any rationality](https://web.viu.ca/pughg/phdThesis/phdThesis.pdf)". 

## Why the gamma function works

In order for our new definition of the factorial to make any sense, we'd like it to at least satisfy the same properties that our normal factorial function has. That being

1. $\:n! = n \cdot (n - 1)!$
2. $\:0! = 1$

From principles, we know the product rule for derivatives is

$$\displaystyle (uv)' = uv' + u'v$$

So, integrating both sides, we get

$$u\displaystyle v = \int vdu + \int udv$$

Giving us the familiar integration by parts formula

$$\displaystyle \int vdu = uv - \int udv$$

We can apply this to our gamma function, to see that

$$\displaystyle \Gamma(n + 1) = \displaystyle \int_0^\infty t^n e^{-t}dt = \left[-t^{n}e^{-t}\right]_0^\infty + n\int_0^\infty t^{n-1}e^{-t}dt = n\Gamma(n)$$

And furthermore

$$\displaystyle \Gamma(1) = \int_0^\infty t^0e^{-t}dt = 1$$

So our choice of Gamma function is at least somewhat justified. In fact, if we add constraints that our function must be log convex we get that the gamma function must be unique (not shown). 

Lets work through a few values of the gamma function that will help us later

$$\displaystyle \Gamma(1.5) = 0.5\Gamma(0.5) = \frac{1}{2}\int_{0}^\infty \frac{1}{\sqrt t}e^{-t}dt$$

$$\displaystyle u = \sqrt{t}$$

$$\displaystyle du = \frac{1}{2\sqrt t}dt$$

$$\displaystyle = \int_{0}^\infty e^{-u^2}du$$

$$\displaystyle = \sqrt{\pi}/2$$

$$\displaystyle \Gamma(0.5) = \sqrt{\pi}$$

## The volume of an n-sphere

The volume of an $n$-ball of radius $R$ is intuitively porportional to $R^n$ (not shown, you can think of it as scaling a ball in each of $n$-dimensions), so we'll write

$$\displaystyle V = CR^n$$

$$\displaystyle dV = nCR^{n - 1}dR$$

Here's the trick, we'll consider this weird integral

$$\displaystyle \int_{-\infty}^\infty\int_{-\infty}^\infty\cdots\int_{-\infty}^\infty e^{-(x_1^2+x_2^2+\cdots+x_n^2)}dx_1dx_2\cdots dx_n = \int_{0}^\infty e^{-R^2}dV$$

You can think of it as covering the space by summing over shells of $n$-dimensional spheres, instead of by integrating over each point individually. This works because our function $e^{-(x_1^2 + x_2^2 + \cdots + x_n^2)}$ has radial symmetry in all axis. For example, in two-dimensions we cover the space by integrating over all radii of circles.

<div class="embed">
    <iframe src="https://www.desmos.com/calculator/7xc0t09fbj?embed" style="border: 1px solid #ccc" frameborder=0></iframe>
</div>

Now substitute the $dV$, 

$$\displaystyle = nC\int_{0}^\infty e^{-R^2}R^{n - 1}dR$$

and use a change-of-variables

$$\displaystyle t = R^2$$

$$\displaystyle \frac{1}{2\sqrt{t}}dt = dR$$

$$\displaystyle = nC\int_{0}^\infty e^{-t}t^{\frac{n-1}{2}}\frac{1}{2\sqrt{t}}dt = \frac{nC}{2}\int_{0}^\infty e^{-t}t^{\frac{n}{2}}dt$$

Hey look! The gamma function! So, this is

$$\displaystyle = \frac{n}{2}C\Gamma\left(\frac{n}{2}\right) = C\Gamma\left(\frac{n}{2}+1\right)$$

Now the right side. We can break it up into

$$\displaystyle \int_{-\infty}^\infty\int_{-\infty}^\infty\cdots\int_{-\infty}^\infty e^{-(x_1^2+x_2^2+\cdots+x_n^2)}dx_1dx_2\cdots dx_n = \int_{-\infty}^\infty e^{-x_1^2}dx_1\int_{-\infty}^\infty e^{-x_2^2}dx_2\cdots\int_{-\infty}^\infty e^{-x_n^2}dx_n$$

$$\displaystyle =\left(\int_{-\infty}^\infty e^{-x^2}dx\right)^n = (\sqrt\pi)^n = \pi^{n/2}$$

And so, combining these we can derive the formula for the volume of an n-ball

$$\displaystyle \pi^{n/2} = C\Gamma\left(\frac{n}{2} + 1\right)$$

$$\displaystyle C = \frac{\pi^{n/2}}{\Gamma\left(\frac{n}{2} + 1\right)}$$

$$\displaystyle V_n = \frac{\pi^{n/2}}{\frac{n}{2}!}R^n$$

## Specific examples

Now that we have a closed-form formula for our volume, we can work it out for specific dimensions

$$\displaystyle V_2 = \frac{\pi}{1!}R^2 = \pi R^2$$

$$\displaystyle V_3 = \frac{\pi^{\frac{3}{2}}}{\frac{3}{2}!}R^3 = \frac{4\pi}{3}R^3$$

$$\displaystyle V_4 = \frac{\pi^2}{2}R^4$$

$$\displaystyle V_{-1} = \frac{1}{\sqrt\pi R}$$

And $V_{-2}$ is undefined, because $(-1)!$ is undefined
