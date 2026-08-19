---
updated: 2026-08-19
title: Overview
kind: overview
compatibility:
  unity: "Unity 2022, 2023, 6 and later"
  pipelines:
    - Built-In
    - URP
  platforms (tested on):
    - Windows
    - Android
    - WebGL
  notes:
    - "Unity 6 is recommended for the most accurate candy physics."
    - "HDRP is not supported."
    - "Requires TextMeshPro, the new Input System and Shader Graph."
---

**Candy Merge** is a complete merge game template for Unity. Drop candies, merge them into bigger ones and chase a high score - everything from the menu to the save system is already built, so the focus can be on making the game feel like its own.

::youtube{caption="Video tutorial for the template. A great choice for those who prefer learning by video."}

## What's inside

- **A complete game loop**: menu, level, interface & loading scenes wired together.
- **Modular systems**: candies, level, game over, pause, save, transitions, UI & user data.
- **Settings driven design**: nearly everything is tweakable from ScriptableObjects, no code required.
- **Object pooling** for the candies and effects spawned during play.
- **Mobile ready** input, orientation & screenshot handling.

### Settings first, code second

Every system reads its values from a configuration object under the `_Config` folder. Box size, drop cooldown, merge thresholds, colors and camera framing can all be changed without opening a script. For anything beyond that, each system lives in its own folder with its own scripts, prefabs and settings, so it can be swapped or extended in isolation. [Start with the Settings & configuration page](./settings-and-configuration).