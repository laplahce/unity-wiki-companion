---
title: Notable features
---

- Extension methods for `Transform`, `Rigidbody`, `Camera`, `Material`, `AudioSource`, `CanvasGroup`, and most UGUI components.
- Strongly typed eases including the full Robert Penner set plus `AnimationCurve` support.
- Allocation-free callbacks via cached delegates and a custom internal pool.
- `SetLink` integration that auto-kills tweens when their target `GameObject` is destroyed.
- Custom plug-in API for tweening user-defined value types.

## Opening the DOTween Utility Panel

The panel lives under **Tools → Demigiant → DOTween Utility Panel**. From
there you can create the settings asset, tweak default eases, and run the
setup wizard whenever you import a new version.

<figure class="gif-placeholder" data-caption="Tools → Demigiant → DOTween Utility Panel — opens the settings window where the initial setup lives."></figure>