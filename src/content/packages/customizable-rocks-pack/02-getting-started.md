---
updated: 2026-08-22
title: Getting started
---

*This guide will help you get up and running with the pack.*

## Your first steps

1. Open the **Customizable Rocks Pack → Demo → Demo** scene.
2. Take a look around at the rocks.

## Adding rocks to your worlds

1. Open **Customizable Rocks Pack → Assets → Prefabs Rocks**.
2. Find a prefab you like and drag-and-drop it into your scene.
3. It works out-of-the-box.

## Customizing the material

The rocks share a base material, with a [Material Variant](https://docs.unity3d.com/Documentation/Manual/materialvariant-concept.html) per rock for individual textures. Changing the base material affects all rocks at once.

1. Locate the base material at **Customizable Rocks → Assets → Materials → Rock.mat**.
2. Adjust the properties in the inspector. The **Maps** are already set per rock variant and do not need to be changed.

## Applying a preset material

1. Locate the presets at **Customizable Rocks → Assets → Materials → Presets**.
2. Select a preset and copy its material properties.
3. Open **Rock.mat** and paste the material properties.