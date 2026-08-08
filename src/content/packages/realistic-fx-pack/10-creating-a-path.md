---
updated: 2026-08-08
title: Creating a path
guide:
<!-- TODO{ title: "Find Cartoon FX component", caption: "In the inspector of your effect, locate the Cartoon FX component.", gif: "/content/packages/cartoon-fx-pack-v2/GIFS/editing-an-effect-001.gif" }-->
---

*Learn how to create & edit a path the effects should move around in.*

## Creating your first path

1. Drag-and-drop the **Realistic FX Pack → Assets → Prefabs → Curve** prefab to your scene.
2. Drag-and-drop any effect from **Realistic FX Pack → Assets → Prefabs → Curve FX** as a child of **VFX** under the curve prefab you just added to your scene.
3. You can add as many effects as you want and they'll all follow the path.
4. **[IMPORTANT]** You need to select the Curve prefab at least once to refresh the newly added effects.

### Editing the path

1. Use the gizmos to move the path around.
2. Try to keep the lines between the handles a green color (this will result in the particles moving in a consistent speed).
3. In the inspector, add and remove points and try to shape the path to your environment.
4. Use the settings in the inspector to fine-tune & manipulate the path further.

#### A tip:

If you need higher precision than what the gizmos allows you, move the points under **Points** directly. Refresh the path again by selecting the Curve prefab again.
