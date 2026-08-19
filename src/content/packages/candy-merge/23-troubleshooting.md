---
updated: 2026-08-19
title: Troubleshooting
---

*Solutions to frequently reported Candy Merge problems.*

## Common issues

If you cannot find a solution to your problem here, then be sure to [contact support here](/contact).

### The game does not start, or scenes load in the wrong order

The four scenes must be added to **File → Build Settings** in this order: `MENU`, `LEVEL`, `INTERFACE`, `LOADING`. See the [Installation guide](./installation).

### Input does nothing

**Active Input Handling** is still set to the old input manager. Set it to *Input System Package (New)* under **Edit → Project Settings → Player**.

### Everything renders pink

The render pipeline is not assigned. For URP, set the included **UniversalRP** asset in both **Project Settings → Graphics** and **Project Settings → Quality**.

### The candies spin or slide too much

On Unity versions before 6, set the `Rigidbody2D` **Angular Damping** on the `Candy` prefab to `15`.

### A settings object cannot be found at runtime

Settings stored in a `Resources` folder were moved out of it. Move them back.