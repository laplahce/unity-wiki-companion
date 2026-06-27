---
name: Cinemachine
tagline: Procedural camera system for the Unity engine.
category: Cameras
color: "#2a9df4"
label: Cinemachine
status: in-development
infobox:
  - { label: Developer, value: "Unity Technologies (orig. Adam Myhill)" }
  - { label: Initial release, value: "2016" }
  - { label: Engine, value: "Unity 2019.4 and later" }
  - { label: Distribution, value: "Unity Package Manager" }
  - { label: Type, value: "Camera system" }
  - { label: License, value: "Unity Companion License (free)" }
references:
  - { id: "1", text: "\"Unity acquires Cinemachine\". Unity Blog, 2017.", url: "https://blog.unity.com/" }
  - { id: "2", text: "\"Cinemachine documentation\". Unity Manual.", url: "https://docs.unity3d.com/Packages/com.unity.cinemachine@latest" }
---

**Cinemachine** is a suite of procedural, rule-driven cameras for the Unity engine. Originally developed independently by Adam Myhill and released on the Unity Asset Store in 2016, it was acquired by Unity Technologies in 2017 and is now distributed as a first-party package via the Unity Package Manager.

Cinemachine replaces hand-coded camera scripts with a network of *Virtual Cameras* that describe intent — follow this target, frame that point of interest, blend to this shot — while a single live `CinemachineBrain` attached to the actual `Camera` resolves them at runtime.