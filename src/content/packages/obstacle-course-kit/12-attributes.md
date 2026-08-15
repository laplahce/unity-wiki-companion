---
updated: 2026-08-14
title: Attributes
guide:
---

*Learn how the obstacle attributes work and how to create your own behaviours.*

An attribute is the behaviour of an obstacle, such as moving, rotating, changing color, changing state and so on.
The included obstacles that have some behaviour are all ready out-of-the-box. This means that you can ignore attributes unless you want to customize them or create your own.

## How does attributes work?

Every interactive obstacle is built from three types of components that you attach to a GameObject:

| Component | What it does |
|---|---|
| **Attribute** | The core behaviour (e.g. animate a shader, bump or launch object) |
| **Trigger** | Watches for something to happen and fires the attribute |
| **Callback** | Reacts to what the attribute is doing (e.g. add force, fire another trigger) |

---

### Attributes

An *Attribute* is the main component. Add one to a GameObject and it will manage a **forward → back sequence** that loops or plays on demand.

**Inspector fields**

| Property | Tooltip |
|---|---|
| `Start On` | Whether the attribute begins active |
| `Initial Delay` | Seconds to wait before the attributes does anything at all |
| `Off Action` | What happens when the attributes is turned off mid-sequence (`Stop` freezes immediately, `Continue` finished the current sequence first, then stops) |
| `Startup` | Controls when a sequence begins (`Auto` starts immediately, `Delay` waits a set number of seconds, `Trigger` waits for a *Trigger* components **with the matching target** (`Begin` or `Return`)) |
| `Extra Callbacks` | References *Callback* components that live on *other* GameObjects |
| `Extra Triggers` | References *Trigger* components that live on *other* GameObjects |

> By default the Attribute automatically finds all `ICallback` and `ATrigger` components on the **same GameObject**. The extra fields are only needed for cross-object communication.

---

### Triggers

A *Trigger* watches for something and fires the Attribute when it happens. Add one alongside an *Attribute*.

**Inspector fields**

| Property | Tooltip |
|---|---|
| `Targets` | Which action(s) on the Attributes this trigger controls (`On/Off` turn the attribute on or off, `Begin` start a forward sequence, `Return` start a back sequence) |

---

### Callbacks

A *Callback* listens to the Attribute's events and does something in response. Add one alongside an Attribute.

---

### Typical setup

1. Add an **Attribute** component to your GameObject (e.g. `Dummable` which is useful for behaviours where you need to have full control of its state, such as a launch pad). Set `Start On` to false & keep everything else the same.
2. Add a **Trigger** if you want something external to start the sequence (e.g. `CollisionTrigger` & add a collider and make it a trigger). Set its `Targets` to `On` and `Off`.
3. Add a **Callback** if you want a side-effect (e.g. `AddForceCallback`). Set it to toggle `On` and set `Start On` to false.
5. Now it will launch an object whenever it touches the hitbox.

---

## Create your own behaviour

### Class hierarchy

```
AAttribute                  ← base for all attributes
└── AIntervalAttribute      ← base for attributes driven by a timer
```

---

### Creating a Basic Attribute

Extend `AAttribute` and implement two methods:

```csharp
public class MyAttribute : AAttribute
{
    // Return a normalized value (0–1) representing current progress.
    // This is passed to callbacks every frame.
    protected override float GetT() => 1f;

    // Called every frame when the attribute is On and Running.
    // Put your per-frame logic here.
    protected override void Step() { }
}
```

Override `Init()` to set up state. **Always call `base.Init()` first:**

```csharp
protected override void Init()
{
    base.Init();
    // your setup here
}
```

Override `Awake()` if needed. **Always call `base.Awake()`:**

```csharp
protected override void Awake()
{
    base.Awake();
    // your setup here
}
```

Override `CanMoveWhenOff` to control whether the `Off Action` (`Stop` / `Continue`) setting is available. Return `false` to always hard-stop when turned off, `true` to let the user choose. Defaults to `true`.

---

### Creating a Timer-Based Attribute

Extend `AIntervalAttribute` instead. This gives you a built-in timer.

```csharp
public class MyTimedAttribute : AIntervalAttribute
{
    protected override float GetT() => GetTimeNormalized(); // 0 → 1 over the timer duration

    protected override void Init()
    {
        base.Init();
        SetTime(2f); // 2-second sequence
    }

    // Called when the timer finishes. Always call base.OnTimerFinished().
    protected override void OnTimerFinished()
    {
        // do something at the end of each cycle
        base.OnTimerFinished(); // triggers the state flip (Running → Waiting → Running)
    }
}
```

**Timer helpers**

| Method | Description |
|---|---|
| `SetTime(float)` | Set the duration and reset the timer |
| `ResetTime()` | Reset timer to 0 without changing duration |
| `GetTime()` | Current elapsed seconds |
| `GetTimeNormalized()` | Current progress as 0-1 |

---

### State Management

You never set states directly, instead use the request methods:

```csharp
RequestStateChange(EState.Running);   // start the sequence
RequestStateChange(EState.Waiting);   // pause/end the sequence
RequestOnOffStateChange(EOnOffState.On);
RequestOnOffStateChange(EOnOffState.Off);
```

The `direction` field (`EDirection.Forward` / `EDirection.Back`) flips automatically each time a sequence finishes meaning you don't set it manually.

---

### Creating a Custom Trigger

Extend `ATrigger` and call `Trigger()` when your condition is met:

```csharp
public class MyTrigger : ATrigger
{
    public override void Reset()
    {
        // reset whatever state your trigger tracks
    }

    private void Update()
    {
        if (SomeCondition())
            Trigger(true); // true = also reset if nothing subscribed
    }
}
```

Set `Targets` in the Inspector to control which Attribute action this trigger controls.

---

### Creating a Custom Callback

Implement `ICallback` on any `MonoBehaviour`:

```csharp
public class MyCallback : MonoBehaviour, ICallback
{
    public void On() { }
    public void Off() { }
    public void Begin() { }
    public void End() { }
    public void BeginAtStart() { }
    public void BeginAtReturn() { }
    public void EndAtStart() { }
    public void EndAtReturn() { }

    public void Step(float t, AAttribute.EDirection direction, bool running)
    {
        // called every frame while On. t = 0–1 progress.
    }
}
```

Place it on the same GameObject as the Attribute and it will be picked up automatically.
