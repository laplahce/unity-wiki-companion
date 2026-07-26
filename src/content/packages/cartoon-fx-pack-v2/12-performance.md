---
title: Performance
status: in-development
---

Cartoon effects read at a glance, so they can be cheap. Every effect in the
pack is budgeted for mobile first and scaled up on desktop.

## Pooling

`CartoonFX.Play` spawns from a shared pool. Pool size per effect is configurable
in **Project Settings → Cartoon FX**, and pools warm up on first scene load.

## Quality tiers

Each effect ships with three tiers — **Mobile**, **Standard** and **High** —
which trade particle counts, lights and soft-particle usage. The active tier can
be set globally or overridden per effect.

| Tier | Particles (avg) | Lights | Soft particles |
| --- | --- | --- | --- |
| Mobile | ~30 | No | No |
| Standard | ~80 | Optional | Yes |
| High | ~180 | Yes | Yes |

## Draw calls

All effects in a category share one atlas and one material variant, so a scene
full of impacts batches into a small number of draw calls.