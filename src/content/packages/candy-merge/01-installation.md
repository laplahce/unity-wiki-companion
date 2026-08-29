---
updated: 2026-08-19
title: Installation
kind: installation
---

*This guide covers installation, required dependencies, project settings and render pipeline setup.*

## Install via Package Manager

1. Open **Window → Package Manager**.
2. Find the *Candy Merge Template* package.
3. Import it.
4. This will prompt you to either Switch Project or Import it directly.

> Unity explains the difference but as a rule of thumb - if you are working with a freshly created project, you can simply Import it.

## Dependencies

1. Open **Window → Package Manager**.
2. Make sure **TextMeshPro**, **New Input System** and **Shader Graph** packages are installed.

## Setup

> Most of the settings should already be correct but make sure to double check the following:
	
1. Go to **Edit → Project Settings → Player** and change *Active Input Handling\** to *Input System Package (New)*. If you cannot find the setting, try searching for it in the search bar or locate it under the *Other Settings* dropdown.
2. Go to **File → Build Settings** and add the four scenes found in **Candy Merge → Scenes** in the following order (MUST BE IN THIS ORDER):

| Order | Scene |
|---|---|
| `0` | `MENU` |
| `1` | `LEVEL` |
| `2` | `INTERFACE` |
| `3` | `LOADING` |

> If you are not using Unity 6 or the physics feels off - make sure to go to **Candy Merge → Systems → Candies → Prefabs** and select *Candy* prefab. Make sure that its *Rigidbody2D* has its *Angular Damping* or *Angular Drag* (depending on Unity version) to `15` (or your own preference).

### Settings for Universal Render Pipeline (URP)

1. Go to **Edit → Project Settings → Graphics** and select your preferred *Default Render Pipeline*. You can use the included *UniversalRP* under **Candy Merge → Settings**.
2. Do the same for **Edit → Project Settings → Quality**.

## Understanding the pack

1. Open **Tools → CMT → Welcome Screen**.
2. Navigate the tabs and get an understanding of the pack.