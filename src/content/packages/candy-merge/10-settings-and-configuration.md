---
updated: 2026-08-19
title: Settings & configuration
guide:
  - { title: "Open the config folder", caption: "Open the Candy Merge/_Config folder.", gif: "/content/packages/candy-merge/GIFS/settings-001.gif" }
  - { title: "Pick a system", caption: "Open the folder for the system you want to change, for example Camera.", gif: "/content/packages/candy-merge/GIFS/settings-002.gif" }
  - { title: "Select the settings object", caption: "Select the ScriptableObject holding the settings.", gif: "/content/packages/candy-merge/GIFS/settings-003.gif" }
  - { title: "Change a value", caption: "Change values in the inspector and hover a property to read its tooltip.", gif: "/content/packages/candy-merge/GIFS/settings-004.gif" }
---

*Almost everything in the template is driven by settings objects. This page explains where they are and what each one does.*

## Finding the settings

All configuration lives under **Candy Merge → _Config**, split into one folder per system.

1. Open **Candy Merge → _Config**.
2. Open the folder for the system you want to change (e.g. *Camera*).
3. Select the ScriptableObject inside. Some live in a `Resources` subfolder.
4. Change values in the **Inspector**. Every property has a tooltip explaining what it does.

> Settings objects stored inside a `Resources` folder **must stay** in that folder, otherwise they cannot be loaded at runtime.

## Universal settings

The shared settings sit under **Candy Merge → _Config → Settings → Resources**.

- **Runtime Settings** - the main settings object. Box size, drop cooldown, colors, merge behaviour and most system values are read from here, both in the editor and at runtime.
- **Editor Settings** - editor-only conveniences. Never read in a build.
- **Game Settings** - holds data that changes while playing, such as score or player name. Empty by default and meant to be expanded.

## Per system settings

- **Camera** - framing, follow behaviour and zoom for the play area.
- **Candy** - the candy chain, sizes, spawn weights and merge results.
- **Player** - input, drop position limits and drop timing.
- **Game** - round rules, scoring and game over thresholds.

## Objects and pooling

Two ScriptableObjects under **Candy Merge → Resources** manage prefabs at runtime.

- **Objects** - prefabs that any script can request at any time.
- **Pool** - prefabs that are pooled during initialization instead of being instantiated on demand.