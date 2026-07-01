---
title: Odin Serializer
---

Odin Serializer is a polymorphic, version-tolerant binary and JSON serializer for .NET that integrates with Unity's `ISerializationCallbackReceiver` infrastructure. It supports interfaces, abstract base classes, generic types, and circular references — none of which Unity's default *YAML* serializer handles.

The serializer is also [available standalone](https://github.com/TeamSirenix/odin-serializer) under the Apache 2.0 license, independent of the commercial inspector.

## Enabling the serializer

Serializer options live in Unity's Project Settings. Open **Edit → Project
Settings → Odin Inspector and Serializer** and toggle formatter emission,
AOT support, and reference handling per platform.

<figure class="gif-placeholder" data-caption="Edit → Project Settings → Odin Inspector and Serializer — the serializer configuration panel."></figure>

## Marking a type as serialized by Odin

Replace `MonoBehaviour` with `SerializedMonoBehaviour` (or `ScriptableObject`
with `SerializedScriptableObject`) and Odin takes over serialization for any
field Unity would otherwise skip.

<figure class="gif-placeholder" data-caption="Right-click in the Project window → Create → C# Script, then swap the base class to SerializedMonoBehaviour."></figure>