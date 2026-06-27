---
title: Inspector attributes
---

The inspector portion of Odin is driven by C# attributes applied to fields, properties, and methods. Attributes are grouped into layout, validation, and behaviour families.

```csharp
using Sirenix.OdinInspector;

public class Enemy : MonoBehaviour
{
    [BoxGroup("Stats"), MinValue(1)]
    public int health = 10;

    [BoxGroup("Stats"), Range(0f, 50f)]
    public float speed = 5f;

    [Button(ButtonSizes.Large)]
    private void Reset() => health = 10;
}
```

Unlike the default inspector, Odin can render properties (not just fields), invoke methods as buttons, and display dictionaries inline.