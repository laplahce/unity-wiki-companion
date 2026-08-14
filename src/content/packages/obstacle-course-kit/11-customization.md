---
updated: 2026-08-14
title: Customization
guide:
---

*Learn how to change the color of any asset & decals of the platforms in the pack using the custom shader.*

## Changing color of obstacle

1. Select an obstacle that you want to change the color of.
2. Make sure to duplicate the material and assign it, to not cause undesirable changes to other obstacles.
3. Select the material and drag the **Hue Shift** slider until you are happy with the color.
4. For some obstacles, you can even rotate the texture to add some variations.

## Add decals to a platform

1. Select your platform that you want to add a decal to.
2. Find the **Mesh Renderer** component and add a decal material to the **Materials** list.
3. You can find the pre-made decals under **Obstacle Course Kit → <RP> → Materials → Platforms → Decals/\***.

## Creating your own decal

1. Locate the pre-made decals under **Obstacle Course Kit → <RP> → Materials → Platforms → Decals/\***.
2. Duplicate any of the decal materials.
3. Change the Albedo texture to your own decal. Decals are of ratio `1:1`.
4. You can rotate the decal using the **Rotate** property.
