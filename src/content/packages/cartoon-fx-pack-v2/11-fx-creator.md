---
title: FX creator
emphasized: true
status: in-development
guide:
  - { title: "Open the FX creator", caption: "Go to Window → laplahce → Cartoon FX Creator to open the editor window." }
  - { title: "Pick a base shape", caption: "Choose a burst, ring, trail or sprite pop as the foundation of the effect." }
  - { title: "Layer and tune", caption: "Add layers, then adjust colour, timing, scale and easing with the live preview running." }
  - { title: "Save the preset", caption: "Save the result as a prefab and a reusable preset asset in your project." }
---

The **Cartoon FX Creator** is an editor window for building new effects out of the
same modular layers the shipped effects use. It replaces hand-wiring particle
systems with a single inspector, a live preview and a preset library.

## Opening the window

The creator lives under **Window → laplahce → Cartoon FX Creator**.

<figure class="gif-placeholder" data-caption="Window → laplahce → Cartoon FX Creator — opens the editor window used to build and edit effects."></figure>

## Layers

An effect is a stack of layers. Each layer is one visual element with its own
timing curve:

- **Burst** — radial particle spray with configurable count and spread.
- **Ring** — expanding shockwave sprite.
- **Trail** — ribbon that follows a motion path.
- **Sprite pop** — a single scaling sprite, used for comic text and flashes.
- **Light** — optional flash light, skipped automatically on mobile presets.

Layers can be reordered, muted and soloed while the preview loops.

## Live preview

The preview viewport scrubs the whole effect timeline and can be slowed down to
quarter speed to check the shape of individual frames.

<figure class="gif-placeholder" data-caption="Scrubbing the effect timeline in the preview viewport at quarter speed."></figure>

## Saving and reuse

Saving writes two assets: a prefab you can spawn like any built-in effect, and a
preset asset that keeps the editable layer stack so the effect can be reopened
and modified later.