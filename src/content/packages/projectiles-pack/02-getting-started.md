---
updated: 2026-10-27
title: Getting started
---

*This guide will help you get up and running with the pack.*

::youtube{id=TODO caption="Video tutorial for the pack. A great choice for those who prefer learning by video."}

## Your first steps

### Adding your first projectile

1. Open **Projectiles Pack → Assets → Prefabs** folder.
2. Drag-and-drop an projectile onto your scene.
3. Play and see it move.

> To spawn a projectile you can simply use Unity's built-in function `Instantiate` and spawn the projectile you want.

> You can change the `Speed`, `Lifetime` or more in the **Projectile FX** component under the **General → Basic Settings** tab.

## Adding camera shake

1. Select the main camera and add the **Camera Shake Controller** component via **Component → PSD2 → Camera Shake Controller**.
2. Select the projectile, muzzle, or hit effect you want to add shake to.
3. Start editing the effect under the FX editor component.
4. Assign a camera shake object to the **Camera Shake** property under the **General → Basic Settings** tab.

> To create a custom shake object, right-click anywhere in the project and select **Create → PSD2 → Camera Shake → [type]**. Assign it to the **Camera Shake** property in the effect.