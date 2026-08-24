---
updated: 2026-08-22
title: Amplify Shader
---

*This guide will help learn how to use the gradient property for amplify shaders.*

## Adding a gradient property

1. Add a `Texture Object` node and make it a property so it appears in the inspector.
2. The reference name must include `GradientTexture` anywhere in it (case insensitive). Press the unlock button on the reference name to change it independently from the display name.
3. Under the **Attributes** tab, check **Custom** and add `GradientGUI` as a custom attribute.
4. Use the included sub function to sample the gradient at a float `t` (clamped 0-1), or pass a `UV` directly to sample it that way instead.