---
title: Seeker and AI components
---

Agents are typically composed of a `Seeker`, which requests paths from the active `AstarPath` singleton, and one of the bundled movement scripts: `AIPath`, `AILerp`, or `RichAI` (Pro). A minimal request looks like:

```csharp
using Pathfinding;

void Start()
{
    Seeker seeker = GetComponent<Seeker>();
    seeker.StartPath(transform.position, target.position, OnPathComplete);
}

void OnPathComplete(Path p)
{
    if (!p.error)
        foreach (var node in p.path)
            Debug.DrawRay((Vector3)node.position, Vector3.up, Color.green, 2f);
}
```