---
updated: 2026-08-19
title: Installation
kind: installation
guide:
  - { title: "Import the package", caption: "Import Candy Merge through the Package Manager into a fresh project.", gif: "/content/packages/candy-merge/GIFS/installation-001.gif" }
  - { title: "Install the dependencies", caption: "Install TextMeshPro, the new Input System and Shader Graph via the Package Manager.", gif: "/content/packages/candy-merge/GIFS/installation-002.gif" }
  - { title: "Switch the input handling", caption: "Open Edit → Project Settings → Player and set Active Input Handling to Input System Package (New).", gif: "/content/packages/candy-merge/GIFS/installation-003.gif" }
  - { title: "Add the scenes", caption: "Open File → Build Settings and add the four scenes from Candy Merge/Scenes in order.", gif: "/content/packages/candy-merge/GIFS/installation-004.gif" }
  - { title: "Select the render pipeline", caption: "For URP, assign the included UniversalRP asset in Project Settings → Graphics and Quality.", gif: "/content/packages/candy-merge/GIFS/installation-005.gif" }
---

*This guide covers installation, required dependencies, project settings and render pipeline setup.*

## Install via Package Manager

1. Create a **new** project (recommended, but importing into an existing project works if care is taken).
2. Open **Window → Package Manager**.
3. Find the *Candy Merge* package and import it.

## Required packages

Install and update these through the **Package Manager** before running the game:

1. `TextMeshPro`
2. `Input System` (new)
3. `Shader Graph`

## Project settings

1. Open **Edit → Project Settings → Player** and set **Active Input Handling** to *Input System Package (New)*.
2. Open **File → Build Settings** and add the four scenes from **Candy Merge → Scenes** in this exact order:
   1. `MENU`
   2. `LEVEL`
   3. `INTERFACE`
   4. `LOADING`

## Render pipeline

### Built-In

Works out of the box once the steps above are done.

### URP

1. Open **Edit → Project Settings → Graphics** and set the **Default Render Pipeline** to the included **UniversalRP** asset under **Candy Merge → Settings**.
2. Open **Edit → Project Settings → Quality** and set the **Render Pipeline Asset** to the same asset.

## Mobile projects

1. Open **Edit → Project Settings → Player → Android** *(or your platform)* **→ Resolution and Presentation**.
2. Set **Auto Rotation Behaviour** to *Sensor*.
3. Under **Allowed Orientations for Auto Rotation**, disable *Portrait* and *Portrait Upside Down*.
4. For the game over screenshot, follow the comment inside `TakeScreenshot()` in **Candy Merge → Systems → Game Over → Scripts → GameOver**.

## If the physics feels off

On Unity versions before 6, select the `Candy` prefab under **Candy Merge → Systems → Candies → Prefabs** and set its `Rigidbody2D` **Angular Damping** (or *Angular Drag*) to `15`.