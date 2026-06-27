---
title: Basic usage
---

A typical move tween reads almost like English:

```csharp
using DG.Tweening;

transform.DOMove(new Vector3(0, 5, 0), 1.5f)
    .SetEase(Ease.OutQuad)
    .OnComplete(() => Debug.Log("done"));
```

Sequences allow several tweens to be composed in series or parallel:

```csharp
Sequence s = DOTween.Sequence();
s.Append(transform.DOMoveX(3f, 0.5f));
s.Join(transform.DORotate(new Vector3(0, 180, 0), 0.5f));
s.AppendInterval(0.25f);
s.Append(transform.DOScale(0f, 0.3f));
```