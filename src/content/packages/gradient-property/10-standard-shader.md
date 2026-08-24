---
updated: 2026-08-22
title: Standard Shader
---

*This guide will help learn how to use the gradient property for standard shaders.*

## Adding a gradient property

1. Add a `Texture2D` property to your shader.
2. The reference name must include `GradientTexture` anywhere in it (case insensitive).
3. Add the `[GradientGUI]` attribute flag.

```hlsl
Shader "GPFS/Demo/Sample"
{
    Properties
    {
        [GradientGUI] _Gradient_gradienttexture ("Gradient", 2D) = "white" {}
    }
    SubShader
    {
        ...
    }
    FallBack "Diffuse"
}
```

4. Include the helper file to sample the gradient:

```hlsl
#include "Assets/Gradient Property for Shader/Assets/Sample Gradient.hlsl"
```

5. Use `SampleGradient(sampler2D gradient, float2 uv)` to sample the gradient at a given UV.

Full example:

```hlsl
Shader "GPFS/Demo/Sample"
{
    Properties
    {
        [GradientGUI] _Gradient_gradienttexture ("Gradient", 2D) = "white" {}
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 200
        CGPROGRAM
        #pragma surface surf Standard fullforwardshadows
        #pragma target 3.0
        #include "Assets/Gradient Property for Shader/Assets/Sample Gradient.hlsl"
        sampler2D _Gradient_gradienttexture;
        struct Input
        {
            float2 uv_Gradient_gradienttexture;
        };
        void surf (Input IN, inout SurfaceOutputStandard o)
        {
            fixed4 c = SampleGradient(_Gradient_gradienttexture, float2(IN.uv_Gradient_gradienttexture.x, 0));
            o.Albedo = c.rgb;
            o.Alpha = c.a;
        }
        ENDCG
    }
    FallBack "Diffuse"
}
```