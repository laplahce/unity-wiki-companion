---
updated: 2026-08-08
title: Object avoidance
guide:
---

*Learn how to make the effects avoid obstacles.*

The pack uses SDF's that calculates object avoidance on the GPU. This results in it being very performant, but also comes with some limitations.
Only **one** object can be avoided & only some effects supports it.

## Creating an obstacle

1. Open **Window → Visual Effects → Utilities → SDF Bake Tool**.
2. Assign the mesh or mesh prefab of the obstacle.
3. Make sure the bounding box fits the mesh in the preview.
4. Bake & save the SDF.

## Making an effect avoid the obstacle

1. Select your effect that has the **Object Avoidance** category in its `Visual Effect` component (e.g. `Butterfly Flock`).
2. Assign the SDF we creating in the previous steps to the *Signed Distance Field of Mesh* property.
3. Align the *Mesh Bounding Box* to the obstacle in your scene. Do this by copy-pasting the `Transform` of your obstacle.
4. Use the gizmos to fit your entire obstacle in the bounding box.
