---
updated: 2026-08-19
title: FAQ
kind: faq
---

## Common questions

## Which render pipelines are supported?

Built-In and URP. HDRP is not supported. [For more compatibility information, refer to the Compatibility page](./compatibility).

## Which versions of Unity are supported?

2022.\*, 2023.\*, 6.\* and later (\*all subversions). Unity 6 is recommended. [For more compatibility information, refer to the Compatibility page](./compatibility).

## Which platforms are supported?

Most platforms are supported (tested on Windows, WebGL, Android). Mobile builds need a few extra project settings, described in the [Installation guide](./installation).

## Is this a complete game?

Yes. The template is a finished, publishable merge game with menu, level, game over and save systems. It is meant to be reskinned and expanded rather than built from scratch.

## Can I publish a game made with this template?

Yes. The licence covers commercial projects, per the standard Unity Asset Store EULA.

## Do I need to write code to change the game?

No. Nearly everything is exposed through settings objects under `_Config`. Code is only needed for new systems or mechanics. [See Settings & configuration](./settings-and-configuration).

## Are there any external dependencies?

`TextMeshPro`, the new `Input System` and `Shader Graph` - all installable through the Package Manager.

## Can I add my own candies?

Yes. Duplicate the `Candy` prefab, swap the sprite and register it in the candy chain. [See Systems](./systems).

## Does it work on mobile?

Yes. Input, orientation and the game over screenshot are handled, with a short mobile setup listed in the [Installation guide](./installation).