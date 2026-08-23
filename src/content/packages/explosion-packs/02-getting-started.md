---
updated: 2026-08-22
title: Getting started
---

*This guide will help you get up and running with the pack.*

::youtube{id=TODO caption="Video tutorial for the pack. A great choice for those who prefer learning by video."}

## Your first steps

The pack includes a large number of ready-to-use explosions. To use one, drag any prefab from the pack into your scene.

## Creating a custom explosion

1. Create or select a game object in your scene.
2. Add the **Explosion** component via **Component → Explosions → Explosion**.
3. Click **Edit Explosion** to open the explosion editor.
4. When the `"Some materials are missing!"` error appears, click **Add Missing Materials** and choose a folder in your project to store them.
5. Click **Edit Explosion** again to continue.
6. Navigate between explosion parts using the **Previous** and **Next** buttons.
7. Go to the **Crown** page and assign a crown object to the **Object** field. Pre-made crowns are located at **Explosion Pack → Assets → Data → Components → Crown**.
8. Restart the effect using the Unity Particle Effect controller to preview the result.
9. Continue through the remaining pages and assign objects to make each part appear.

> Alternatively, click the presets icon on the Explosion component to start from a preset and adjust from there.

## Adding camera shake

1. Select the main camera in your scene and add the **Camera Shake Controller** component via **Component → Explosions → Camera Shake Controller**.
2. Select the explosion you want to add shake to and click **Edit Explosion**.
3. Assign a camera shake object to the **Camera Shake** property. Pre-made shake objects are at **Explosion Pack → Assets → Data → Camera Shakes**.

> To create a custom shake object, right-click anywhere in the project and select **Create → Explosions → Camera Shake → [type]**. Assign it to the **Camera Shake** property in the explosion.