---
updated: 2026-08-22
title: Getting started
---

*This guide will help you get up and running with the pack.*

## Your first steps

1. Open the **Cartoon FX Pack → Demo → Demo** scene.
2. Take a look around at the effects.

## Adding effects to your worlds

1. Open **Cartoon FX Pack → Prefabs**.
2. Find a prefab you like and drag-and-drop it into your scene.
3. It works out-of-the-box.

## Setting up a text effect

1. Go to **Cartoon FX Pack → Source → Prefabs → Systems** and drag the **Text Creator** prefab into your scene.
2. Select the root **Text Creator** object and adjust its properties. The most notable are **Text** (the displayed text) and **Text Animation** (the animation used when starting and ending the effect). Hover any property to see a tooltip.

> The child objects under the prefab can be ignored - they are destroyed and recreated when properties are updated.

## Changing the font

Pre-made fonts are available and can be assigned via the **Font** property, which expects a `FontAsset` scriptable object.

To add your own font, right-click in the project and select **Create → Cartoon FX Pack → Font**. Add a texture to the new asset. See the existing fonts at **Cartoon FX Pack → Source → Core → Font** for reference.

## Creating or editing text animations

1. Navigate to **Cartoon FX Pack → Resources** and select **Settings**.
2. The **Text Animations** property lists all available transitions. Select any element to view and edit its settings. The **Type** field should always remain unchanged.
3. To create a new animation, open the **Objects** script attached to the **Settings** object and add a new entry to the `ETextAnimation` enum as the last item.
4. Go back to **Settings** and add a new element to the **Text Animations** array. Set its **Type** to the entry you just added.
5. Adjust the properties of the new animation as needed.
6. Select the new animation as the **Text Animation** on the **Text Creator** object.