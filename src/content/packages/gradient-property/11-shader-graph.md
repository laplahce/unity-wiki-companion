---
updated: 2026-08-22
title: Shader Graph
---

*This guide will help learn how to use the gradient property for shader graphs.*

## Adding a gradient property

1. Open the shader graph and set the **Custom Editor GUI** to `GradientShaderEditor` in the graph settings.
2. Add a `Texture2D` property to the graph.
3. The reference name must include `GradientTexture` anywhere in it (case insensitive).
4. Use the included sub graph to sample the gradient at a given UV.