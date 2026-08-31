---
updated: 2026-08-22
title: Getting started
---

*This guide will help you get up and running with the pack.*

::youtube{id=PqZILZSxfgo caption="Video tutorial for the pack. A great choice for those who prefer learning by video."}

## Your first steps

### Adding audio

1. Add the `Soundify` script to one object in the scene. *It is a singleton, so only one instance is allowed at a time.*
2. Press **(+)** on the `Soundify` component to add a new track. A track is a named collection of sounds, such as `Music` or `SFX`.
3. Press **(+)** inside the track to add a sound slot. You will need to create a `Sound` asset before assigning it.
4. Right-click in the project and select **Create → Soundify → Audio → Sound** to create a `Sound` asset. Rename it.
5. Add at least one audio clip to the asset. A sound can hold multiple clips and picks one at random on play.
6. Go back to the `Soundify` component and assign the sound to the track.

> Hover any property to see a tooltip explaining what it does.

### Playing audio

1. Find where you want to play a sound from and import the namespace:

```csharp
using ASoundify;
```

2. Call `PlaySound()` either by name or by reference:

```csharp
Soundify.PlaySound("Background Music"); // by name
Soundify.PlaySound(sound);              // by reference
```

Full example:

```csharp
using UnityEngine;
using ASoundify;

public class AudioTest : MonoBehaviour
{
    public Sound sound;

    private void Start()
    {
        Soundify.PlaySound(sound);
    }
}
```

### Playing audio without code

1. Add the `Audio Player` script to any game object.
2. Press **(+)** to add a new entry and assign the sound you want to play.
3. Add the method you want to trigger the sound from, just like a normal Unity Event.
4. Press **Subscribe** to automatically generate the play call in your attached method.

> It will automatically generate code to call the `PlaySound()` method. Make sure to doublecheck in the code that it generated properly.