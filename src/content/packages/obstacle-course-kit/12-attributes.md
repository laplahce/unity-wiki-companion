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

An Attribute is the main component. Add one to a GameObject and it will manage a **forward → back sequence** that loops or plays on demand.

**Inspector fields**

| Property | Tooltip |
|---|---|
| `Start On` | whether the attribute begins active |
| `Initial Delay` | seconds to wait before the attributes does anything at all |
| `Off Action` | what happens when the attributes is turned off mid-sequence (`Stop` freezes immediately, `Continue` finished the current sequence first, then stops) |
| Startup` | controls when a sequence begins (`Auto` starts immediately, `Delay` waits a set number of seconds, `Trigger` waits for a *Trigger* components **with the matching target** `Begin` or `Return`) |
| `Extra Callbacks` | references *Callback* components that live on *other* GameObjects |
| `Extra Triggers` | references *Trigger* components that live on *other* GameObjects |

> By default the Attribute automatically finds all `ICallback` and `ATrigger` components on the **same GameObject**. The extra fields are only needed for cross-object communication.

---

### Triggers

A Trigger watches for something and fires the Attribute when it happens. Add one alongside an Attribute.

**Inspector fields**

| Property | Tooltip |
|---|---|
| `Targets` | which action(a) on the Attributes this trigger controls (`On/Off` turn the attribute on or off, `Begin` start a forward sequence, `Return` start a back sequence) |

---

### Callbacks

A Callback listens to the Attribute's events and does something in response. Add one alongside an Attribute.

---

### Typical setup

1. Add an **Attribute** component to your GameObject (e.g. `ShaderPropertyAnimatable`).
2. Add a **Trigger** if you want something external to start the sequence (e.g. `CollisionTrigger`). Set its `Targets` to `Begin`.
3. Add a **Callback** if you want a side-effect (e.g. `AddForceCallback`). Configure when it activates.
4. Adjust `Startup` on the Attribute to `Trigger` so it waits for the collision before starting.
5. Hit Play and test.

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
    protected override float GetT() => 0f;

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

**Timer helpers:**

| Method | Description |
|---|---|
| `SetTime(float)` | Set the duration and reset the timer |
| `ResetTime()` | Reset timer to 0 without changing duration |
| `GetTime()` | Current elapsed seconds |
| `GetTimeNormalized()` | Current progress as 0–1 |

---

### State Management

You never set states directly — use the request methods:

```csharp
RequestStateChange(EState.Running);   // start the sequence
RequestStateChange(EState.Waiting);   // pause/end the sequence
RequestOnOffStateChange(EOnOffState.On);
RequestOnOffStateChange(EOnOffState.Off);
```

The `direction` field (`EDirection.Forward` / `EDirection.Back`) flips automatically each time a sequence finishes — you don't set it manually.

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

---

### CanMoveWhenOff

Override this property on your Attribute to control whether the `Off Action` (Stop/Continue) setting is exposed. If your attribute has no meaningful "mid-sequence" state, return `false`:

```csharp
protected override bool CanMoveWhenOff => false;
```

This also forces `Off` to always use `Stop` behaviour, regardless of the Inspector setting.
