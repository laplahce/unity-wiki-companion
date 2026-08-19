---
updated: 2026-08-19
title: Prefab brush
guide:
---

*Paint prefabs on surfaces. Can be used to e.g. place rocks, trees, general objects.*

::youtube{id=5BRtsaH0gak caption="Video tutorial for the tool. A great choice for those who prefer learning by video."}

> Make sure that you have `Always Refresh` on in the Editor when using the Tool.

## Setting up the tool

1. Create a GameObject in the hierarchy.
2. Attach the `Object Brush Tool` component.

> Hover the properties to read more about what it does.

### Preferences

**Update Mode** has two modes; `Auto` updates whenever you change any of the properties in the inspector. Use this carefully. `Manual` updates only when painting. When changing properties in the inspector, press the **Update** button under the component. You can also update it by pressing `[LEFT-CONTROL]` on your keyboard.

## Using the tool

1. Assign your objects you want to paint under the `Objects` property.
2. Set its `Size` and `Rotation` and the chance for it to spawn this object if you have assigned multiple objects.
3. Change the brush size `HOLD [CTRL] + DRAG [LMB]` and brush strength `HOLD [CTRL] + DRAG [RMB]`.
4. Paint `HOLD [SHIFT + LMB]` and erase `HOLD [SHIFT + RMB]`.