// Curated Unity Asset Store package wiki entries.
// Content is original summary/documentation for the wiki — facts about real, well-known packages.

export type InfoboxField = { label: string; value: string };

export type WikiSection = {
  id: string;
  title: string;
  // HTML content. Keep markup minimal: <p>, <ul>, <ol>, <li>, <h3>, <pre><code>, <a>, <code>, <table>.
  html: string;
};

export type WikiArticle = {
  slug: string;
  title: string;
  tagline: string; // one-sentence summary, italic lead area
  category: string;
  lead: string; // HTML for the lead paragraph(s)
  infobox: {
    image?: { color: string; label: string }; // generated placeholder block
    fields: InfoboxField[];
  };
  sections: WikiSection[];
  references: { id: string; text: string; url?: string }[];
  seeAlso: string[]; // slugs
};

export const ARTICLES: WikiArticle[] = [
  {
    slug: "dotween",
    title: "DOTween",
    tagline: "Fast, type-safe object-oriented tween engine for Unity.",
    category: "Animation",
    lead: `<p><b>DOTween</b> is an object-oriented animation engine for the <a href="/wiki/unity-engine">Unity engine</a>, authored by Daniele Giardini of Demigiant. It provides a fluent, chainable API for tweening numeric properties, transforms, materials, and UI elements over time, and is widely considered the de-facto tweening library in the Unity ecosystem.<sup>[1]</sup></p>
<p>The library is released in a free version and a commercial <i>DOTween Pro</i> edition that adds visual editor support, additional shortcuts for <a href="/wiki/textmesh-pro">TextMesh Pro</a>, and a path editor.<sup>[2]</sup></p>`,
    infobox: {
      image: { color: "#f4a300", label: "DOTween" },
      fields: [
        { label: "Developer", value: "Demigiant (Daniele Giardini)" },
        { label: "Initial release", value: "2014" },
        { label: "Stable release", value: "1.2.765" },
        { label: "Written in", value: "C#" },
        { label: "Engine", value: "Unity 2018.4 and later" },
        { label: "Type", value: "Tweening / animation engine" },
        { label: "License", value: "Proprietary (free + Pro)" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        html: `<p>DOTween is designed as a successor to the earlier <i>HOTween</i> library by the same author. Its primary design goals are runtime performance, allocation-free callbacks for common cases, and a discoverable, statically-typed API that integrates with Unity's component model.</p>
<p>Tweens are created from extension methods on common Unity types. Once started, every tween is owned by the global <code>DOTween</code> singleton, which advances them on the main thread during the standard <code>Update</code>, <code>LateUpdate</code>, or <code>FixedUpdate</code> phase as configured.</p>`,
      },
      {
        id: "usage",
        title: "Basic usage",
        html: `<p>A typical move tween reads almost like English:</p>
<pre><code>using DG.Tweening;

transform.DOMove(new Vector3(0, 5, 0), 1.5f)
    .SetEase(Ease.OutQuad)
    .OnComplete(() => Debug.Log("done"));</code></pre>
<p>Sequences allow several tweens to be composed in series or parallel:</p>
<pre><code>Sequence s = DOTween.Sequence();
s.Append(transform.DOMoveX(3f, 0.5f));
s.Join(transform.DORotate(new Vector3(0, 180, 0), 0.5f));
s.AppendInterval(0.25f);
s.Append(transform.DOScale(0f, 0.3f));</code></pre>`,
      },
      {
        id: "features",
        title: "Notable features",
        html: `<ul>
<li>Extension methods for <code>Transform</code>, <code>Rigidbody</code>, <code>Camera</code>, <code>Material</code>, <code>AudioSource</code>, <code>CanvasGroup</code>, and most UGUI components.</li>
<li>Strongly typed eases including the full Robert Penner set plus <code>AnimationCurve</code> support.</li>
<li>Allocation-free callbacks via cached delegates and a custom internal pool.</li>
<li><code>SetLink</code> integration that auto-kills tweens when their target <code>GameObject</code> is destroyed.</li>
<li>Custom plug-in API for tweening user-defined value types.</li>
</ul>`,
      },
      {
        id: "pro",
        title: "DOTween Pro",
        html: `<p>The commercial edition adds an inspector-driven workflow via the <code>DOTweenAnimation</code> component, which allows designers to author tweens without code. Pro also ships a visual path editor for <code>DOPath</code> tweens and shortcuts for animating <a href="/wiki/textmesh-pro">TextMesh Pro</a> text reveal, color, and character offset.<sup>[2]</sup></p>`,
      },
      {
        id: "reception",
        title: "Reception",
        html: `<p>DOTween has consistently been listed among the most-downloaded animation tools on the Unity Asset Store and is a common dependency of other commercial assets, which often ship with optional DOTween integration modules.</p>`,
      },
    ],
    references: [
      { id: "1", text: "Giardini, Daniele. \"DOTween — Documentation\".", url: "http://dotween.demigiant.com/documentation.php" },
      { id: "2", text: "\"DOTween Pro on the Unity Asset Store\".", url: "https://assetstore.unity.com/packages/tools/visual-scripting/dotween-pro-32416" },
    ],
    seeAlso: ["odin-inspector", "cinemachine"],
  },
  {
    slug: "odin-inspector",
    title: "Odin Inspector and Serializer",
    tagline: "Editor extension and serialization framework for Unity.",
    category: "Editor extensions",
    lead: `<p><b>Odin Inspector and Serializer</b> (commonly <i>Odin</i>) is a commercial editor extension for the <a href="/wiki/unity-engine">Unity engine</a> developed by <a href="https://odininspector.com" class="nav-link">Sirenix</a>. It enriches Unity's default inspector with a large set of attributes for laying out, validating, and grouping serialized fields, and ships an independent serialization layer capable of persisting types that Unity's built-in serializer cannot.<sup>[1]</sup></p>`,
    infobox: {
      image: { color: "#7b5cff", label: "Odin" },
      fields: [
        { label: "Developer", value: "Sirenix" },
        { label: "Initial release", value: "2017" },
        { label: "Written in", value: "C#" },
        { label: "Engine", value: "Unity 2020.3 and later" },
        { label: "Type", value: "Editor extension, serializer" },
        { label: "License", value: "Proprietary, per-seat" },
      ],
    },
    sections: [
      {
        id: "inspector",
        title: "Inspector attributes",
        html: `<p>The inspector portion of Odin is driven by C# attributes applied to fields, properties, and methods. Attributes are grouped into layout, validation, and behaviour families. A small example:</p>
<pre><code>using Sirenix.OdinInspector;

public class Enemy : MonoBehaviour
{
    [BoxGroup("Stats"), MinValue(1)]
    public int health = 10;

    [BoxGroup("Stats"), Range(0f, 50f)]
    public float speed = 5f;

    [Button(ButtonSizes.Large)]
    private void Reset() => health = 10;
}</code></pre>
<p>Unlike the default inspector, Odin can render properties (not just fields), invoke methods as buttons, and display dictionaries inline.</p>`,
      },
      {
        id: "serializer",
        title: "Odin Serializer",
        html: `<p>Odin Serializer is a polymorphic, version-tolerant binary and JSON serializer for .NET that integrates with Unity's <code>ISerializationCallbackReceiver</code> infrastructure. It supports interfaces, abstract base classes, generic types, and circular references — none of which Unity's default <i>YAML</i> serializer handles.<sup>[2]</sup></p>
<p>The serializer is also <a href="https://github.com/TeamSirenix/odin-serializer" class="nav-link">available standalone</a> under the Apache 2.0 license, independent of the commercial inspector.</p>`,
      },
      {
        id: "validator",
        title: "Validator",
        html: `<p>Odin's optional <i>Validator</i> module scans the project for misconfigured assets and missing references. Validation rules are themselves attributes (for example <code>[Required]</code>, <code>[AssetsOnly]</code>, <code>[ValidateInput]</code>) and run both in the inspector and as a project-wide batch job.</p>`,
      },
      {
        id: "licensing",
        title: "Licensing",
        html: `<p>Odin is sold under a per-seat developer license; source code is provided to license holders but redistribution is prohibited. A 30-day trial is available directly from Sirenix.</p>`,
      },
    ],
    references: [
      { id: "1", text: "\"Odin Inspector and Serializer — Sirenix\".", url: "https://odininspector.com" },
      { id: "2", text: "\"Odin Serializer on GitHub\".", url: "https://github.com/TeamSirenix/odin-serializer" },
    ],
    seeAlso: ["dotween", "a-pathfinding-project"],
  },
  {
    slug: "cinemachine",
    title: "Cinemachine",
    tagline: "Procedural camera system for the Unity engine.",
    category: "Cameras",
    lead: `<p><b>Cinemachine</b> is a suite of procedural, rule-driven cameras for the <a href="/wiki/unity-engine">Unity engine</a>. Originally developed independently by Adam Myhill and released on the Unity Asset Store in 2016, it was acquired by Unity Technologies in 2017 and is now distributed as a first-party package via the Unity Package Manager.<sup>[1]</sup></p>
<p>Cinemachine replaces hand-coded camera scripts with a network of <i>Virtual Cameras</i> that describe intent — follow this target, frame that point of interest, blend to this shot — while a single live <code>CinemachineBrain</code> attached to the actual <code>Camera</code> resolves them at runtime.</p>`,
    infobox: {
      image: { color: "#2a9df4", label: "Cinemachine" },
      fields: [
        { label: "Developer", value: "Unity Technologies (orig. Adam Myhill)" },
        { label: "Initial release", value: "2016" },
        { label: "Engine", value: "Unity 2019.4 and later" },
        { label: "Distribution", value: "Unity Package Manager" },
        { label: "Type", value: "Camera system" },
        { label: "License", value: "Unity Companion License (free)" },
      ],
    },
    sections: [
      {
        id: "architecture",
        title: "Architecture",
        html: `<p>Cinemachine introduces three core concepts:</p>
<ul>
<li><b>Brain</b> — a single component on a real <code>Camera</code> that listens for virtual cameras with the highest priority.</li>
<li><b>Virtual Camera</b> — a lightweight <code>GameObject</code> that describes how the camera should behave (body, aim, noise) without ever rendering on its own.</li>
<li><b>Blend</b> — a transition curve between two virtual cameras, resolved by the Brain.</li>
</ul>`,
      },
      {
        id: "components",
        title: "Body and aim components",
        html: `<p>Each virtual camera is composed of small <i>procedural</i> components. The <b>Body</b> decides where the camera is placed (transposer, framing transposer, orbital, tracked dolly), while the <b>Aim</b> decides what it looks at (composer, hard look at, POV, group composer).</p>
<p>Combining these yields complex behaviour from a few parameters — a third-person follow camera, for example, is typically a <code>3rd Person Follow</code> body with a <code>Hard Look At</code> aim.</p>`,
      },
      {
        id: "timeline",
        title: "Timeline integration",
        html: `<p>Cinemachine includes a Timeline track that sequences virtual cameras and their blends as keyframes, enabling cutscene-style direction without a custom controller. Combined with the <i>Recorder</i> package it is commonly used for previz and in-engine cinematics.</p>`,
      },
      {
        id: "use",
        title: "Use in published games",
        html: `<p>Because Cinemachine is bundled with Unity, it sees broad use across both indie and AA titles. Notable examples discussed in Unity case studies include <i>Cuphead</i>'s map camera and <i>Subnautica</i>'s vehicle cameras.<sup>[2]</sup></p>`,
      },
    ],
    references: [
      { id: "1", text: "\"Unity acquires Cinemachine\". Unity Blog, 2017.", url: "https://blog.unity.com/" },
      { id: "2", text: "\"Cinemachine documentation\". Unity Manual.", url: "https://docs.unity3d.com/Packages/com.unity.cinemachine@latest" },
    ],
    seeAlso: ["dotween", "odin-inspector"],
  },
  {
    slug: "a-pathfinding-project",
    title: "A* Pathfinding Project",
    tagline: "Pathfinding system for Unity supporting grid, navmesh, and point graphs.",
    category: "AI",
    lead: `<p>The <b>A* Pathfinding Project</b> is a pathfinding library for the <a href="/wiki/unity-engine">Unity engine</a> developed by Aron Granberg. It implements the A* and similar best-first search algorithms over a number of graph representations — grid, layered grid, navmesh, recast navmesh, and point graph — and is one of the longest-running third-party AI packages on the Unity Asset Store.<sup>[1]</sup></p>
<p>The project is distributed in a permissively-priced <i>Free</i> edition and a commercial <i>Pro</i> edition that adds runtime recast graph updates, local avoidance, and multithreaded path requests.</p>`,
    infobox: {
      image: { color: "#3aa856", label: "A* PP" },
      fields: [
        { label: "Developer", value: "Aron Granberg" },
        { label: "Initial release", value: "2010" },
        { label: "Written in", value: "C#" },
        { label: "Engine", value: "Unity 2020.3 and later" },
        { label: "Type", value: "Pathfinding, navigation AI" },
        { label: "License", value: "Proprietary (Free + Pro editions)" },
      ],
    },
    sections: [
      {
        id: "graphs",
        title: "Graph types",
        html: `<p>Multiple graph types may be combined in a single scene. Choice of graph is the most important performance decision when integrating the package.</p>
<table>
<thead><tr><th>Graph</th><th>Best for</th><th>Edition</th></tr></thead>
<tbody>
<tr><td>Grid</td><td>Tile-based games, top-down strategy</td><td>Free</td></tr>
<tr><td>Layered Grid</td><td>Multi-level tile maps</td><td>Pro</td></tr>
<tr><td>Navmesh</td><td>Hand-authored navigation meshes</td><td>Free</td></tr>
<tr><td>Recast</td><td>Auto-generated navmesh from scene geometry</td><td>Free (Pro for runtime updates)</td></tr>
<tr><td>Point</td><td>Sparse waypoint networks</td><td>Free</td></tr>
</tbody></table>`,
      },
      {
        id: "seeker",
        title: "Seeker and AI components",
        html: `<p>Agents are typically composed of a <code>Seeker</code>, which requests paths from the active <code>AstarPath</code> singleton, and one of the bundled movement scripts: <code>AIPath</code>, <code>AILerp</code>, or <code>RichAI</code> (Pro). A minimal request looks like:</p>
<pre><code>using Pathfinding;

void Start()
{
    Seeker seeker = GetComponent&lt;Seeker&gt;();
    seeker.StartPath(transform.position, target.position, OnPathComplete);
}

void OnPathComplete(Path p)
{
    if (!p.error) foreach (var node in p.path) Debug.DrawRay(
        (Vector3)node.position, Vector3.up, Color.green, 2f);
}</code></pre>`,
      },
      {
        id: "local-avoidance",
        title: "Local avoidance",
        html: `<p>Pro ships with an RVO (Reciprocal Velocity Obstacles) local-avoidance simulator that handles agent-vs-agent collisions independently of the underlying graph. RVO operates entirely on its own job-style worker threads.</p>`,
      },
      {
        id: "history",
        title: "History",
        html: `<p>First released in 2010 as a hobby project, the A* Pathfinding Project has shipped continuous updates for over a decade. It predates Unity's built-in <code>NavMesh</code> agent system and remains preferred for grid-based games and projects that need runtime navmesh updates.</p>`,
      },
    ],
    references: [
      { id: "1", text: "Granberg, Aron. \"A* Pathfinding Project\".", url: "https://arongranberg.com/astar/" },
    ],
    seeAlso: ["odin-inspector", "cinemachine"],
  },
];

export function getArticle(slug: string): WikiArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
