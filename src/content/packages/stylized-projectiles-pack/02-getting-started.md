---
updated: 2026-08-22
title: Getting started
---

*This guide will help you get up and running with the pack.*

## Your first steps

1. Open the **Stylized Projectiles Pack → Demo → Demo** scene.
2. Take a look around at the trees, bushes and clouds.

## Adding projectiles to your worlds

1. Open **Stylized Projectiles Pack → Assets → Prefabs → Projectiles**.
2. Choose between the different types. `Normal` moves in a straight line, `Gravity` behaves similar to `Normal` except it also is affected by gravity, `Circle` simply move in a circle.
3. Find a prefab you like and drag-and-drop it into your scene.
4. It works out-of-the-box.

> Change the `Speed` and `Destroy after delay` to whatever you need.

## Adding camera shake

1. Select the main camera and add the **Camera Shake Controller** component via **Component → Projectiles → Camera Shake Controller**.
2. Select the projectile, muzzle, or hit effect you want to add shake to.
3. Assign a camera shake object to the **Camera Shake** property. Pre-made shake objects are at **Stylized Projectiles Pack → Assets → Camera Shakes**.

> To create a custom shake object, right-click anywhere in the project and select **Create → Projectiles → Camera Shake → [type]**. Assign it to the **Camera Shake** property in the effect.