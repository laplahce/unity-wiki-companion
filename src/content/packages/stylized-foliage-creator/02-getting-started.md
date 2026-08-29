---
updated: 2026-08-22
title: Getting started
---

*This guide will help you get up and running with the pack.*

## Your first steps

1. Open the tool via **Tools → SFC → Foliage Creator**.
2. Press **Create New** to create a new foliage instance. A pink bush appears in the scene in front of the camera.
3. Fix the pink material by dragging a material onto the object, or go to the **Leaf** tab and assign one under the **Mesh** foldout.
4. Enable `Auto Update` in the creator to preview changes in real time.

## Shaping

1. Drag the white anchors to shape the foliage.
2. `[CTRL + LMB]` on the shape to add a new anchor. `[CTRL + RMB]` an existing anchor to remove it. The base anchors cannot be deleted.
3. `[SHIFT + LMB]` an anchor to move it precisely using Unity's default gizmos.

## Key settings

| Setting | What it does |
|---|---|
| **Shape** | Regenerate the shape randomly or with a fixed size |
| **Count** | maximum number of leaf particles to generate. Pair with **Min Distance** to fill the foliage without gaps |
| **Scale** | size of each individual leaf billboard |
| **Seed** | randomizes generation consistently |
| **Details** | Add details and adjust their **density**, **offset**, and **scale** |

## Exporting

When done, go to the **Export** tab and export the foliage. Mesh and prefab export locations are configured separately.

## Wind setup

1. Add the **Wind Controller** component to any object in the scene via **Component → SFC → Wind Controller**.
2. Assign a **Wind Noise** to the component.
3. Rotate the object to control wind direction.