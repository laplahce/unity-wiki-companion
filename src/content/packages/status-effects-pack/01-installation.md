---
updated: 2026-11-14
title: Installation
kind: installation
---

*This guide covers installation and setup.*

## Install via Package Manager

1. Open **Window → Package Manager**.
2. Find the *Status Effects Pack* package.
3. Import it.

## Learn the pack

1. Open **Tools → SFXP → Welcome Screen**.
2. In the **Resources** tab and navigate the resources you may need.

## Spawning and disposing of a particle

> Use any method you want for spawning the status effects, e.g. use the default unity Instantiate function.

To correctly dispose of the status effects at a specific time do the following:
1. Find a reference to the effects **StatusFX** component (use *GetComponent* or reference it in the inspector).
2. Call *StartCoroutine(effect.Dispose())*.