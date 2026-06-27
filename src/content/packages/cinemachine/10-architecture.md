---
title: Architecture
---

Cinemachine introduces three core concepts:

- **Brain** — a single component on a real `Camera` that listens for virtual cameras with the highest priority.
- **Virtual Camera** — a lightweight `GameObject` that describes how the camera should behave (body, aim, noise) without ever rendering on its own.
- **Blend** — a transition curve between two virtual cameras, resolved by the Brain.