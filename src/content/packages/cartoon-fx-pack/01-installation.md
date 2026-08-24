---
updated: 2026-08-22
title: Installation
kind: installation
---

*This guide covers installation.*

## Install via Package Manager

1. Open **Window → Package Manager**.
2. Find the *Cartoon FX Pack* package.
3. Import it.

## Dependencies

1. Open **Window → Package Manager**.
2. Make sure both **Shader Graph** and **Visual Effect Graph** packages are installed.

## Settings for Universal Render Pipeline (URP)

1. Open your URP Asset via **Edit → Project Settings → Graphics → Default Render Pipeline**.
2. Make sure both **Depth Texture** and **Opaque Texture** are **ON**.

## Setting up for 2D

1. Go to **Cartoon FX Pack → Source → Core → Shaders → Subgraphs**.
2. Open the **Soft Particle** subgraph.
3. Remove **everything except the `Output` node**.
4. Make sure the `Output` has a **value of `1`**.