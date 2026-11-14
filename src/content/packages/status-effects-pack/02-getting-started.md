---
updated: 2026-11-14
title: Getting started
---

*This guide will help you get up and running with the pack.*

::youtube{id=TODO caption="Video tutorial for the pack. A great choice for those who prefer learning by video."}

## Your first steps

### Adding your first effect

1. Open **Status Effects Pack → Assets → Prefabs** folder.
2. Drag-and-drop an effect onto your scene or as a child of your player.
3. Play and see it looks.

> To spawn an effect you can simply use Unity's built-in function `Instantiate` and spawn the effect you want.

## Adding camera shake

1. Select the main camera and add the **Camera Shake Controller** component via **Component → PSD2 → Camera Shake Controller**.
2. Select the status effect you want to add shake to.
3. Start editing the effect under the **StatusFX** editor component.
4. Assign a camera shake object to the **Camera Shake** property under the **General → Basic Settings** tab.

> To create a custom shake object, right-click anywhere in the project and select **Create → PSD2 → Camera Shake → [type]**. Assign it to the **Camera Shake** property in the effect.