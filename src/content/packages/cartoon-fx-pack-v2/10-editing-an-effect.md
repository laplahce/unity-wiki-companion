---
title: Editing an effect
status: in-development
---

The library is organised into categories, each with a matching demo scene. Every
effect is a self-contained prefab: drop it in a scene, or spawn it from code and
let it despawn itself when finished.

## Categories

| Category | Effects | Typical use |
| --- | --- | --- |
| Explosions | 22 | Barrels, grenades, boss deaths |
| Impacts | 18 | Melee hits, projectile landings |
| Comic text | 14 | Critical hits, callouts, tutorials |
| Elemental | 26 | Fire, ice, electric, poison, arcane |
| Ambience | 15 | Auras, trails, idle sparkles |
| Pickups | 12 | Coins, chests, level-up bursts |

## Spawning from code

```csharp
using Laplahce.CartoonFX;

public class Explodable : MonoBehaviour
{
    [SerializeField] private CartoonEffect explosion;

    private void Die()
    {
        CartoonFX.Play(explosion, transform.position, transform.rotation);
        Destroy(gameObject);
    }
}
```

`CartoonFX.Play` pulls from an internal pool, so repeated spawns do not allocate.

## Palette swapping

Every effect exposes a palette asset. Assigning a different palette recolours the
whole effect — including the comic text outline — without duplicating materials.

<figure class="gif-placeholder" data-caption="Swapping the palette on an explosion prefab recolours every layer at once."></figure>
