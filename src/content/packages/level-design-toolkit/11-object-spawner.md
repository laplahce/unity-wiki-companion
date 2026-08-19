---
updated: 2026-08-19
title: Object Spawner
guide:
---

*Spawn objects in a area. Can be used to e.g. creating environments, scattering props.*

::youtube{id=SZ_FaKCB9Gg caption="Video tutorial for the tool. A great choice for those who prefer learning by video."}

## Setting up the tool

1. Create a GameObject in the hierarchy.
2. Attach the `Object Spawner Tool` component.

> Hover the properties to read more about what it does.

### Preferences

**Update Mode** has two modes; `Auto` updates whenever you change any of the properties in the inspector. Use this carefully. `Manual` updates only when painting. When changing properties in the inspector, press the **Update** button under the component. You can also update it by pressing `[LEFT-CONTROL]` on your keyboard.

## Using the tool

1. Add a new layer under `Layers` property.
2. Assign a object to spawn under `Objects` under the created layer.
3. Set its `Size` and `Rotation` and the chance for it to spawn this object if you have assigned multiple objects.
4. Move the GameObject with the component attached to where you want to spawn your objects and change the area to spawn it inside.