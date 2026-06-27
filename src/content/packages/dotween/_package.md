---
name: DOTween
tagline: Fast, type-safe object-oriented tween engine for Unity.
category: Animation
color: "#f4a300"
label: DOTween
status: awaiting-review
reviewUrl: https://assetstore.unity.com/packages/tools/visual-scripting/dotween-pro-32416#reviews
infobox:
  - { label: Developer, value: "Demigiant (Daniele Giardini)" }
  - { label: Initial release, value: "2014" }
  - { label: Stable release, value: "1.2.765" }
  - { label: Written in, value: "C#" }
  - { label: Engine, value: "Unity 2018.4 and later" }
  - { label: Type, value: "Tweening / animation engine" }
  - { label: License, value: "Proprietary (free + Pro)" }
references:
  - { id: "1", text: "Giardini, Daniele. \"DOTween — Documentation\".", url: "http://dotween.demigiant.com/documentation.php" }
  - { id: "2", text: "\"DOTween Pro on the Unity Asset Store\".", url: "https://assetstore.unity.com/packages/tools/visual-scripting/dotween-pro-32416" }
---

**DOTween** is an object-oriented animation engine for the Unity engine, authored by Daniele Giardini of Demigiant. It provides a fluent, chainable API for tweening numeric properties, transforms, materials, and UI elements over time, and is widely considered the de-facto tweening library in the Unity ecosystem.

The library is released in a free version and a commercial *DOTween Pro* edition that adds visual editor support, additional shortcuts for TextMesh Pro, and a path editor.

## Design goals

DOTween is designed as a successor to the earlier *HOTween* library by the same author. Its primary design goals are runtime performance, allocation-free callbacks for common cases, and a discoverable, statically-typed API that integrates with Unity's component model.

Tweens are created from extension methods on common Unity types. Once started, every tween is owned by the global `DOTween` singleton, which advances them on the main thread during the standard `Update`, `LateUpdate`, or `FixedUpdate` phase as configured.