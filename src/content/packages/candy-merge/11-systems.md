---
updated: 2026-08-19
title: Systems
---

*The template is split into self-contained systems. Each one lives in its own folder under **Candy Merge → Systems** with its scripts, prefabs and settings side by side.*

## Candies

The core of the game. Handles spawning, dropping, collisions and merging into the next candy in the chain. The chain, sizes and spawn odds are all data, so a new candy is a prefab plus a list entry.

## Level

Owns the play area: the box, its bounds and the objects that make up a round. Also responsible for resetting between rounds.

## Game over

Detects the losing condition, stops the round, shows the result screen and can capture a screenshot of the final board.

## Menu

The entry scene. Start, settings and quit flow, plus whatever extra screens are added.

## Pause

Freezes the round and shows the pause interface without unloading the level.

## Save

Persists progress such as the high score and user preferences between sessions.

## Transition

Handles the fades and loading screen between scenes so scene changes never look abrupt.

## UI components

Reusable buttons, popups, counters and score displays used across the menu and interface scenes.

## User

Holds the player identity and preferences the other systems read from.

## Managers

The runtime glue: initialization order, references between systems and the pooled object lifetime.

## Expanding a system

1. Find the system's folder under **Candy Merge → Systems**.
2. Change its settings first - most behaviour is exposed there. See [Settings & configuration](./settings-and-configuration).
3. If more is needed, the scripts in that folder can be extended without touching the other systems.