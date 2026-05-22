# UX Transformation Spec: Marketing Platform → Learning Platform
**Executive Claims Technology Academy**

## Executive Summary

Transform the Executive Claims Technology Academy website from a marketing/sales pitch to a **learning platform** where users enter as learners, navigate their educational journey, and engage with content. The transformation maintains the premium aesthetic, existing IA, and all content—but shifts positioning, language, CTAs, and visual hierarchy to center the **learner experience** over enrollment.

---

## Clean UI Direction (Screenshot-Inspired)

### 1) Visual Principles
- Keep IA and content structure intact; reduce visual noise via lighter surfaces, softer borders, and fewer competing accents.
- Prefer "dashboard calm": neutral backgrounds, white cards, restrained shadows, short headings, generous spacing.
- Maintain executive tone, but simplify hierarchy so each section has one primary action and one scanning pattern.

### 2) Design Tokens (Implementation Values)
Apply these in shared CSS (`:root`) and migrate existing styles to token usage.

```css
:root {
   /* Neutrals */
   --bg-canvas: #f5f7fa;
   --bg-subtle: #eef2f6;
   --surface: #ffffff;
   --surface-muted: #f8fafc;
   --border-soft: #e5e9f0;
   --border-strong: #d7dee8;

   /* Text */
   --text-strong: #0f172a;
   --text-body: #334155;
   --text-muted: #64748b;

   /* Brand accents (restrained) */
   --accent: #0f6cbd;
   --accent-hover: #0b5fa6;
   --accent-soft: #e9f2fb;
   --success-soft: #e8f7ef;
   --warning-soft: #fff4e8;

   /* Radius */
   --radius-sm: 8px;
   --radius-md: 12px;
   --radius-lg: 16px;
   --radius-pill: 999px;

   /* Shadows (calm) */
   --shadow-1: 0 1px 2px rgba(15, 23, 42, 0.06);
   --shadow-2: 0 8px 24px rgba(15, 23, 42, 0.08);

   /* Spacing (8px system) */
   --space-1: 0.5rem;
   --space-2: 0.75rem;
   --space-3: 1rem;
   --space-4: 1.5rem;
   --space-5: 2rem;
   --space-6: 3rem;

   /* Type scale */
   --fs-300: 0.875rem;
   --fs-400: 1rem;
   --fs-500: 1.125rem;
   --fs-600: 1.25rem;
   --fs-700: clamp(1.5rem, 2vw, 1.875rem);
   --fs-800: clamp(1.875rem, 3vw, 2.25rem);

   /* Layout */
   --container-max: 1120px;
}
```

Typography recommendation:
- Keep `IBM Plex Sans` for body copy.
- Use one display face only for headings (existing `Sora` is acceptable).
- Reduce heading weight/size contrast by one step versus current implementation.

### 3) Component Treatment Rules

#### Header / Nav
- Use flat light header (`--surface`) with a single bottom border (`--border-soft`), remove heavy blur and glow.
- Nav links default to `--text-body`; active state uses `--text-strong` + 2px underline in `--accent`.
- Mobile menu panel should be full-width surface card with 12px radius and no large drop shadow.

#### Hero / Page Intro
- Remove high-saturation gradient hero backgrounds.
- Use surface block: white or `--surface-muted`, border `1px solid var(--border-soft)`, `--radius-lg`, shadow `--shadow-1`.
- Keep one primary CTA and one secondary CTA max.
- Stats chips should be low-contrast pills (`--surface-muted`, subtle border), not glossy badges.

#### Cards (module cards, pathway cards, callouts)
- Base card: white background, `1px` border soft, `--radius-md`, `--shadow-1`.
- Hover: translateY(-2px), shadow upgrade to `--shadow-2`, no color glow.
- Card title max 2 lines, description max 3 lines for consistent scan rhythm.

#### Badges / Metadata
- Badge style: small pill, 12-14px text, semibold, muted background.
- Use semantic variants only:
   - Info/default: `--accent-soft` + `--accent`
   - Success: `--success-soft` + darker green text
   - Warning/advanced: `--warning-soft` + darker amber text

#### Controls (search, select, buttons)
- Inputs/selects: height 44px, white background, `1px solid var(--border-strong)`, focus ring `0 0 0 3px rgba(15,108,189,.2)`.
- Primary button: solid accent, min-height 44px, radius 10-12px.
- Secondary button: white background, soft border, darker text.
- Ensure full-width controls on mobile.

#### Sections
- Alternate section backgrounds only between `--bg-canvas` and `--surface-muted`; avoid decorative gradients.
- Vertical rhythm: section padding `var(--space-5)` desktop, `var(--space-4)` mobile.
- Limit each section to one title + one supporting sentence before content grid.

### 4) Motion Minimalism
- Duration range: 120-220ms for hover/focus; 260-320ms for reveal.
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Only keep:
   - card hover lift,
   - button press/hover,
   - one-time reveal on section entry.
- Remove parallax, large transforms, persistent floating animations.
- Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
   * { animation: none !important; transition: none !important; }
}
```

### 5) Accessibility + Responsive Guardrails
- Contrast targets: normal text >= 4.5:1, large text >= 3:1, controls/borders >= 3:1.
- Keep visible focus on all interactive controls (do not remove outlines).
- Minimum touch target: 44x44px.
- Use fluid type and grid collapse:
   - Desktop: 3/2-column cards
   - Tablet: 2-column
   - Mobile (<768px): 1-column
- Prevent long lines: content max width around 68-72ch for text-heavy blocks.

### 6) Minimal HTML Hook Plan (No IA Rewrite)
Use small class hooks and avoid structural changes.

- Add `clean-ui` class on `<body>` to scope rollout safely.
- Add utility classes where needed:
   - `.surface-card` (all card-like containers)
   - `.meta-badge` (all badge chips)
   - `.section-intro` (heading + supporting text wrapper)
   - `.control-row` (search/filter wrapper)
- Keep existing semantic tags and content order.

### 7) Coder Handoff Sequence (Low Risk)
1. Replace global tokens in shared CSS.
2. Normalize header + hero surfaces and remove heavy gradients/shadows.
3. Standardize cards/badges/controls using the utility hooks above.
4. Tune spacing and typography scale across index/modules/pathways/faq.
5. Run accessibility pass (focus states, contrast, mobile tap targets).
6. Verify consistency on module detail pages with the same card/control primitives.

---

## 1. Hero / Entry-Point Redesign

### Current State
- **Headline:** "Technology Fluency for Claims-Insurtech Executives"
- **Subheading:** "A premium learning experience designed for leaders..."
- **CTAs:** "Request Program Brief" + "Explore 8 Modules"
- **Below hero:** Trust strip with program signals (Claims-native, Executive-ready, Blended format, Portable delivery)
- **Side card:** "Program Snapshot" with benefit bullets
- **Bottom:** Value Proposition cards (3-column)

### Transformation Rationale
The hero should **feel like entering a learning dashboard**, not pitching to a prospect. The user should immediately understand: "This is where I learn technology strategy for claims leadership."

### New Structure: Dashboard Entry Pattern

#### Hero Section Changes
**Headline:**
```
"Begin Your Executive Technology Learning Journey"
OR
"Technology Fluency for Claims Leaders"
```
- Removes marketing tone ("premium learning experience")
- Emphasizes *action* ("Begin") and *community* ("Leaders")

**Subheading:**
```
"Learn platform architecture, AI strategy, operations, and business decisions through eight focused modules designed for claims leaders. Start with any module—or follow a guided pathway."
```
- Explains what you'll learn
- Clarifies flexibility (any module / pathways)
- Removes "business-ready" framing; focuses on learning outcomes

**Hero CTAs (Primary Action):**
```
1. "Start Learning" → links to Modules page
2. "View My Pathways" → links to Pathways page (optional tertiary: "Continue Learning" if learner cookies/sessions are tracked)
```
- **Rationale:** "Start" and "Continue" are learner-centric; removes enrollment friction language
- **Visual:** Primary CTA (`--primary`) for "Start Learning"; secondary for "View My Pathways"
- **Remove:** "Request Program Brief" entirely; reframe "Book Executive Session" in footer as optional follow-up

**Hero Stats (Reframed as Learner Readiness):**
```
Old: "8 Executive modules" | "4-phase Blended delivery" | "1 cohort Shared operating language"
New: "8 focused modules" | "~40 hours self-learning" | "6 workshop sessions"
```
- Emphasizes **duration and format** over program signals
- Removes "cohort" framing (makes it feel exclusive/enrollment-based)
- Shows time commitment upfront (sets learner expectations)

**Side Card Transformation:**
```
OLD: "Program Snapshot" (benefit-focused)
NEW: "Get Started" (action-focused)
```
Contents:
```
• Self-learning + facilitated workshops
• Mix-and-match modules or follow a pathway
• Learn at your own pace (self-paced portions)
• Ask questions in forums or 1:1 office hours
• Earn learner badges on module completion
```
- Focuses on *how you learn*, not *what you get*
- Removes sales benefits; adds learning process details
- Hints at community (forums, office hours) without committing to cohort model

**Visual Cues:**
- **Progress visual:** Add a subtle progress bar or learner onboarding UI hint (e.g., "Module 1 of 8")
- **Learner avatar placeholder:** If using personalization later, add space for learner profile initials or avatar
- **Skip enrollment friction:** No forms, no friction—invite the user directly into learning

---

### Removed / Repurposed Sections

#### 1. Trust Strip ("Program Signals")
**Current:** 
```
"Claims-native" | "Executive-ready" | "Blended format" | "Portable delivery"
```
**Transform to:** Learning-centric language elsewhere

**Option A (Recommended):** Repurpose into module-level signals  
- Each module card shows: **Estimated time**, **Difficulty level** (Beginner / Intermediate / Advanced), **Prerequisites** (if any)

**Option B (Minimal):** Move to footer as "Why Learn Here" micro-section:
```
→ Claims-domain expertise
→ Business-focused explanations
→ Flexible scheduling (self-paced + workshops)
→ Interactive labs and decision scenarios
```

#### 2. Value Proposition Cards ("Business-First Explanations," etc.)
**Current:** 3-column cards explaining business benefits

**Transform:** Move to **pathway/role selection pages** or **module detail pages** (where they support decision-making)

**Rationale:** On the homepage, learners don't need to be sold; they need to be *guided to the right starting point*.

---

## 2. Navigation & CTA Language Overhaul

### Header Navigation (Primary Nav)

**Current:**
```
Home | Modules | Learning Pathways | FAQ | [Book Executive Session]
```

**New:**
```
Home | Browse | Pathways | Help | [My Learning] (optional, for future auth)
```

| Current Label | New Label | Reasoning |
|---|---|---|
| Modules | Browse | Less formal; "browse" invites exploration |
| Learning Pathways | Pathways | Shorter; feels less prescriptive |
| FAQ | Help | Broader—includes FAQ, support, glossary |
| Book Executive Session | My Learning (future) | Removes sales CTA; reserves space for learner hub |

**Persistent CTA Button:**
- **Current:** "Book Executive Session" (sales/enrollment)
- **New:** None in header—or replace with **Help / Support** icon
- **Rationale:** Learning platforms don't have persistent sales CTAs; they have support/help

---

### Page-Level CTAs

#### **Homepage**
| Element | Old CTA | New CTA | Context |
|---------|---------|---------|---------|
| Hero primary | Request Program Brief | Start Learning | Directs to Modules page |
| Hero secondary | Explore 8 Modules | View My Pathways | Directs to Pathways page |
| Side card | (implicit in hero) | Get Started (or omit) | Optional—may not need separate CTA |

#### **Modules Page**
| Element | Old CTA | New CTA | Context |
|---------|---------|---------|---------|
| Page title | (implicit) | Browse 8 Modules | Clarifies learning-first positioning |
| Section intro | "Find the Right Module" | "Find Your Starting Point" OR "Browse & Explore" | Removes "find the right"—implies learner can start anywhere |
| Module card | (implicit link) | "Start Module" or "View Module" | Clear action; remove enrollment language |
| Difficulty badge | (none currently) | **New:** Beginner / Intermediate / Advanced | Helps learner self-select readiness |

#### **Module Detail Page**
| Element | Old CTA | New CTA | Context |
|---------|---------|---------|---------|
| Hero section | (context label: "Module Detail") | (context label: "Begin This Module" or "Start") | Emphasizes entry point |
| Module card bottom | "Back to all modules" | "Back to Browse" or "See All Modules" | Learner-friendly |
| Call-to-action section (e.g., "Ready?") | "Book a Workshop" OR "Request Program Brief" | "Enroll in This Module" OR "Add to My Pathway" | New language: "Enroll" (learning-specific) |
| Next module nudge | (if implemented) | "Next: [Module 2]" or "Related Modules" | Guides learning flow |

#### **Pathways Page**
| Element | Old CTA | New CTA | Context |
|---------|---------|---------|---------|
| Section title | "Recommended Pathways" | "Choose Your Learning Path" OR "Learning Journeys for Your Role" | Frames as learner choice, not recommendation |
| Pathway card | (implicit) | "Start This Pathway" or "Preview Pathway" | Action-oriented; learner agency |
| Pathway card subtitle | "Goal: operational throughput..." | Same, but change "Goal:" to "Focus:" (less directive) | Subtle: "Focus" feels more collaborative than "Goal" |

#### **FAQ Page**
| Element | Old CTA | New CTA | Context |
|---------|---------|---------|---------|
| Page title | FAQ | Help & Support | Broader framing |
| (New section) | (not currently present) | "Still have questions?" → Contact / Support form | Remove "Book Session" link; replace with support inquiry |

---

## 3. Module Card Presentation Shift

### Current Module Card Layout
```
[Module Title]
[Brief description]
[Implicit link]
```

### New Module Card Layout (Learning-Focused)

**Metadata Layer (Top):**
```
[Module badge: e.g., "Module 1/8"]  [Track label: e.g., "Operations"]  [Difficulty: e.g., "Intermediate"]
```

**Title & Description:**
```
[Module Title]
[1-2 sentence learning objective, e.g., "Understand claims lifecycle and where technology creates value"]
```

**Learning Readiness Signals:**
```
⏱ ~4 hours (estimated self-learning)
📚 2-3 linked resources (LinkedIn Learning, Udemy, internal docs)
🎯 1-2 workshop sessions
📋 Prerequisites (if any): "Recommended: Module 1 first"
💡 Key takeaway: "[One concrete, actionable insight]"
```

**Visual Treatment:**
- **Progress indicator:** If learner has started module, show progress bar (e.g., "2/8 lessons completed")
- **Status badge:** "Not started" | "In progress" | "Completed" (future, requires auth)
- **Color coding by difficulty:** Use accent color scale (e.g., green=beginner, blue=intermediate, orange=advanced)

**CTA:**
```
Primary: "Start Learning" or "Continue" (if in progress)
Secondary (optional): "Preview" (if module has intro video/sample)
```

### Card Example (Text Mockup)

```
┌─────────────────────────────────────────────┐
│ Module 1 / Operations / BEGINNER            │
├─────────────────────────────────────────────┤
│ Claims Operations & Technology Fundamentals │
│                                             │
│ Understand the claims lifecycle and where   │
│ technology creates measurable value.        │
│                                             │
│ ⏱ ~4 hours  📚 2 resources  🎯 1 session    │
│ 📋 Foundations (start here)                 │
│ 💡 Digitization ≠ automation                │
│                                             │
│ [Start Learning] [Preview]                  │
└─────────────────────────────────────────────┘
```

### Module Detail Page Transformation

**Current Structure:**
```
1. Hero: Module title + badges + description
2. Core Topics & Executive Translation (2-col)
3. Business Outcomes (aside)
4. Callout panels (value, resources, etc.)
5. Implicit follow-up (enrollment or sales touch)
```

**New Structure (Learning-Focused):**
```
1. Hero: Module title + badges + objective + estimated time + difficulty
2. "What You'll Learn" (renamed from "Core Topics") + "Why It Matters" (renamed from "Executive Translation")
3. "Learning Outcomes" (renamed from "Business Outcomes") + side card: "Before You Start" (prerequisites, resources)
4. "Self-Learning Resources" (linked content) + "Workshop Overview" (session details, if any)
5. CTA: "Enroll in This Module" or "Add to My Pathway"
6. "Next Steps" footer: "Up Next: [Module 2]" or "Related Modules"
```

**Key Language Shifts:**

| Old Section | New Section | Rationale |
|---|---|---|
| Core Topics | What You'll Learn | Active voice; learner-centric |
| Executive Translation | Why It Matters | Explains relevance without business jargon |
| Business Outcomes | Learning Outcomes | Focus on competency, not business benefit |
| (implicit) | Before You Start | Removes friction; clarifies prerequisites & prep |
| (implicit) | Self-Learning Resources | Transparency about external content used |
| (implicit) | Workshop Overview | Clarifies what the workshop teaches & format |

---

## 4. Pathway Experience Framing

### Current Pathways Positioning
```
"Recommended Pathways" 
"Each pathway keeps the content model intact while emphasizing a different executive decision context."
```
- Feels like *we're recommending* to you
- "Recommended" implies one-size-fits-most

### New Pathways Framing

**Page-Level Positioning:**
```
HEADLINE: "Choose Your Learning Path"
SUBHEADING: "Three tailored pathways based on your role, or build your own journey. All paths cover core concepts; the difference is sequence and emphasis."
```

**Pathway Card Transformation:**

**Old Model:**
```
[Title: "Pathway A: COO / Claims Operations Leaders"]
[Goal: "operational throughput..."]
[Module list with implicit sequencing]
```

**New Model:**
```
[Role badge: "For: COO / Operations Leaders"]
[Title: "Operational Excellence & Technology"]
[1-2 sentence learning goal, e.g., "Master claims throughput, process quality, and customer experience through technology decisions."]
[Modules: Listed in sequence with rationale, e.g., "Start with [Module 1] to build foundation..."]
[Estimated duration: "~20 hours over 6 weeks"]
[CTA: "Start This Pathway" or "Preview Sequence"]
```

**Pathway Sequencing Clarity:**
```
Add visual step indicators:
1️⃣ Module 1 (Foundation)
2️⃣ Module 2 (Build depth)
3️⃣ Module 5 (Apply to operations)
→ [etc.]
```

**"Build Your Own" Option (New):**
- Add a 4th pathway card: **"Custom Pathway"** or **"Mix & Match"**
- Description: "Not sure which pathway fits? Browse all modules and create your own sequence."
- CTA: "Explore All Modules"

### Pathway Card Example (Text Mockup)

```
┌────────────────────────────────────────────────┐
│ For: CEO / Strategy & Investment Leaders       │
├────────────────────────────────────────────────┤
│ Platform Strategy & Risk                       │
│                                                │
│ Make confident platform, AI, and portfolio     │
│ decisions by understanding architecture, risk, │
│ and cost impact.                               │
│                                                │
│ 1️⃣ Module 1: Foundations                      │
│ 2️⃣ Module 3: Architecture Patterns            │
│ 3️⃣ Module 4: AI Strategy & Risk               │
│ 4️⃣ Module 6: Investment & Roadmaps           │
│                                                │
│ ⏱ ~15 hours over 6-8 weeks                    │
│ [Start This Pathway]  [Preview]                │
└────────────────────────────────────────────────┘
```

---

## 5. Tone & Language Guidelines

### Core Linguistic Shifts

| Dimension | Old Tone | New Tone | Examples |
|-----------|----------|----------|----------|
| **Agency** | "We recommend..." | "You choose..." | "Choose a pathway" not "Follow our recommendation" |
| **Urgency** | "Book now" / "Don't miss" | "Learn at your pace" | "Start learning today—no deadline" |
| **Jargon** | "Premium," "exclusive," "executive-grade" | "Focused," "practical," "relevant" | "Focused modules for leaders" not "premium program" |
| **Time Pressure** | "Limited seats" / "Enroll in cohort" | "Self-paced + optional workshops" | Clarify flexibility upfront |
| **Outcomes** | Business value / ROI ("lower costs," "faster settlement") | Competency / confidence ("understand decisions," "make informed choices") | "Learn how platform decisions affect cost and speed" not "Save millions" |
| **Enrollment** | "Enroll in program," "Request brief," "Book session" | "Start learning," "Explore," "Add to pathway" | Action verbs focused on learning, not sales |
| **Failure Framing** | Success is implicit (assumes you'll succeed if you enroll) | Learning is iterative ("You'll revisit modules," "Ask questions," "Revise your understanding") | "Return to any module anytime" not "Master it once" |

### Writing Guidelines for New Copy

1. **Start with the learner, not the program:**
   - ❌ "This program teaches architecture patterns..."
   - ✅ "Learn how architecture decisions affect cost, speed, and risk."

2. **Be specific about time & effort:**
   - ❌ "Comprehensive blended learning"
   - ✅ "~4 hours self-learning + 2 live workshop sessions"

3. **Minimize sales language:**
   - ❌ "Executive-grade insights," "premium content," "exclusive community"
   - ✅ "Practical frameworks," "real claims domain expertise," "peer discussions"

4. **Emphasize flexibility & autonomy:**
   - ❌ "Complete the full program"
   - ✅ "Learn modules in any order—or follow a guided pathway"

5. **Acknowledge that learning is nonlinear:**
   - ❌ "Master each module"
   - ✅ "Build understanding over time; revisit modules as you apply concepts"

---

## 6. New Visual Elements & Learner-Focused Cues

### Progress & Status Indicators

#### 1. Learner Progress Badge (Future: Requires Auth)
```
Displays on:
- Homepage (optional): "Your progress: 2/8 modules started"
- Modules page: Progress bar per module (if started)
- Pathway cards: "4/7 modules completed on this path"
```

#### 2. Difficulty & Time Badges (Implement Now)
```
Every module card & detail page should show:
- ⏱ [Hours]: "~4 hours"
- 📊 Difficulty: "Beginner" | "Intermediate" | "Advanced"
- 📋 Prerequisites: "None" or "[Module X] recommended first"
- 💾 Resources: "[n] external resources linked"
```

**Visual Treatment:**
- Use consistent icon set (time, difficulty levels, prerequisites)
- Use a light color scale for difficulty (green → blue → orange)
- Keep badges above the fold on cards

#### 3. Learner Readiness Indicator
```
"Is this module for me?"
- Difficulty level (learner self-assesses: "I'm new to this" / "I have some background" / "I'm experienced")
- Time investment (learner sees time cost upfront)
- Prerequisites (learner knows what to prep or review first)
```

#### 4. Completion Badges (Optional, Requires Auth)
```
Once learner completes a module:
- ✓ "Module 1 Complete" badge on card (archive/portfolio)
- 🏅 Learner profile shows: "Modules Completed: 3/8"
- Encourage pathway completion: "3/7 on Operations Pathway"
```

---

### New Page / Section: "Before You Start"

Add a lightweight onboarding nudge on the homepage or modules page:

```
┌─────────────────────────────────────────────────────┐
│ 📋 BEFORE YOU START                                 │
├─────────────────────────────────────────────────────┤
│ Here's what to expect:                              │
│                                                     │
│ ✓ Modules are self-paced (~40 hours total)          │
│ ✓ Participate in live workshops for deeper learning │
│ ✓ Use external resources (LinkedIn, Udemy, docs)    │
│ ✓ Ask questions anytime in forums or office hours   │
│ ✓ No prerequisites—start with any module            │
│ ✓ Earn completion badges as you progress            │
│                                                     │
│ [Let's Get Started]                                 │
└─────────────────────────────────────────────────────┘
```

---

### Visual Hierarchy Changes

**Current:**
1. Trust signals (program credibility)
2. Hero CTA (sales focus: "Book")
3. Module exploration (secondary)

**New:**
1. Clear entry points (Browse, Pathways, or Start)
2. Learner readiness cues (time, difficulty, prerequisites)
3. Progress nudge (optional: "You've completed 2 modules")
4. Peer signals (optional: "12 learners in the Operations pathway")

---

## 7. Specific Page & Section Recommendations

### Page-by-Page Transformation Map

#### **index.html (Homepage)**

| Section | Current | Transform To | Notes |
|---------|---------|---|---|
| Hero | "Technology Fluency for Claims-Insurtech Executives" | "Begin Your Executive Technology Learning" | Emphasizes action & learning |
| Hero description | "A premium learning experience..." | "Learn platform, AI, operations, and business decisions..." | Focus on topics, not selling pitch |
| Hero CTAs | "Request Program Brief" + "Explore 8 Modules" | "Start Learning" + "View My Pathways" | Removes enrollment friction |
| Hero stats | Program signals | Learning readiness (duration, formats, formats) | Show time commitment |
| Side card | "Program Snapshot" | "Get Started" or omit | Clarify learning process, not benefits |
| Trust strip | Claims-native / Executive-ready / Blended / Portable | Move to module cards as metadata | Every module shows: time, difficulty, prerequisites |
| Value props | 3-column cards (Business-First Explanations, etc.) | Move below fold or to pathway pages | Homepage should guide entry, not sell |
| Footer CTA | "Book Executive Session" (email link) | Optional: "Questions? Contact Support" | Downplay sales; emphasize support |

**Implementation Notes:**
- Remove or minimize color/visual emphasis on "Request Program Brief"
- Add a visual progress prompt (optional): "Start with Module 1, or choose a pathway"
- Keep the premium aesthetic (colors, typography, spacing)

---

#### **modules.html (Modules / Browse Page)**

| Section | Current | Transform To | Notes |
|---------|---------|---|---|
| Page intro | "Module Library" + "Explore eight executive-focused modules..." | "Browse 8 Modules" + "Start with any module or follow a pathway" | Clarifies flexibility |
| Search label | "Search modules" | Same | No change |
| Filter label | "Filter by track" | Same or "Filter by difficulty" | Consider adding difficulty filter |
| Module cards | Title + description + implicit link | Title + objective + ⏱ time + 📊 difficulty + 📋 prerequisites + 💡 key takeaway + CTA | Rich metadata |
| Card CTA | Implicit link | "Start Module" or "View Details" | Explicit action |
| (New) | Pathway nudge | Add: "Or choose a guided pathway" link below cards | Route learners who want structure |

**Implementation Notes:**
- Add difficulty level pills to each card (color-coded: green, blue, orange)
- Add time estimates prominently (e.g., "~4 hours")
- Update search/filter to support the new metadata
- Ensure keyboard nav and a11y for metadata

---

#### **pathways.html (Learning Pathways)**

| Section | Current | Transform To | Notes |
|---------|---------|---|---|
| Page intro | "Learning Pathways" + "Tailored learning sequences..." | "Choose Your Learning Path" + "Pick a pathway or build your own" | Emphasizes learner choice |
| Section title | "Recommended Pathways" | "Learning Journeys for Your Role" | Less prescriptive |
| Section intro | "Each pathway keeps the content model intact..." | "All pathways cover core concepts; the sequence and emphasis differ." | Clearer explanation |
| Pathway cards | Title + goal + module list | Role badge + title + learning goal + sequenced modules with step indicators + duration + CTA | Rich context |
| (New) | Custom pathway option | Add 4th card: "Mix & Match" or "Build Your Own" | Routes flexible learners to Modules page |

**Implementation Notes:**
- Use step indicators (1️⃣ 2️⃣ 3️⃣) or numbered list for module sequence
- Add estimated duration to each pathway (e.g., "~20 hours over 6-8 weeks")
- Clarify that pathways are optional: "Or explore modules freely"

---

#### **modules/module-[1-8].html (Module Detail Pages)**

| Section | Current | Transform To | Notes |
|---------|---------|---|---|
| Hero eyebrow | "Module Detail" | "Start This Module" or "Learn" | Action-oriented |
| Hero badges | "Module 1" + "Operations" | Same + difficulty + estimated time | Rich metadata |
| Hero description | "Create shared understanding of the claims journey..." | Same or expand to full learning objective | Clarify what learner will understand |
| Core Topics | "Core Topics" | "What You'll Learn" | Active voice |
| Executive Translation | "Executive Translation" | "Why It Matters" | Learner-focused framing |
| Business Outcomes | "Business Outcomes" | "Learning Outcomes" or "You'll Be Able To" | Focus on competency |
| (New) | Before You Start | Add: Estimated duration, difficulty, prerequisites, prep resources | Set learner expectations |
| (New) | Self-Learning Resources | Add: List of external resources (LinkedIn, Udemy, docs) with time per resource | Transparency |
| (New) | Workshop Overview | Add: Number of sessions, duration, format, topics covered in workshops | Clarity on blended format |
| Callout panel | Sales/enrollment touch | Change to: "Ready to start?" + "Enroll in This Module" or "Add to Pathway" | Action-oriented |
| Footer | "Back to all modules" | "Back to Browse" or link to pathways | Clearer navigation |

**Implementation Notes:**
- Restructure module detail page into learning-centric sections
- Add time estimates and prerequisites prominently
- Link external resources directly or list them
- Remove any sales language or "book session" CTAs
- Add "Next Module" footer nudge for sequencing

---

#### **pathways.html, faq.html (Minor Changes)**

**Pathways Page:**
- Rename section header from "Recommended Pathways" to "Choose Your Learning Path"
- Update pathway descriptions to be more exploratory ("This pathway helps you...") not prescriptive ("This pathway is for...")

**FAQ Page:**
- Rename page title from "FAQ" to "Help & Support"
- Add section: "Getting Started" (move onboarding Q&A here)
- Update email CTA: Change from "Book Executive Session" to "Contact Support" or "Have Questions?"

---

## 8. CTA Copy Reference Guide

### Standard Learner CTAs

| Context | CTA Text | Primary Color | Secondary Option |
|---------|----------|---|---|
| Start learning | "Start Learning" | Primary blue | "Begin" or "Explore" |
| Continue learning | "Continue Module" | Primary blue | "Resume" |
| Enroll in module | "Enroll in This Module" | Primary blue | "Add to My Learning" |
| Add to pathway | "Add to This Pathway" | Secondary orange | "Include in My Journey" |
| Explore options | "Browse Modules" | Secondary orange | "Explore" |
| Choose pathway | "Start This Pathway" | Primary blue | "Follow This Path" |
| Next step | "Next: [Module Title]" | Accent green | "Continue" |
| Support | "Contact Support" | Muted gray | "Ask a Question" |
| Feedback | "Share Feedback" | Muted gray | "Rate This Module" |

---

## 9. Implementation Roadmap

### Phase 1: Critical (Week 1)
- [ ] Update hero headline & CTAs (index.html)
- [ ] Rename navigation: "Modules" → "Browse"
- [ ] Update module cards with time + difficulty + prerequisites metadata
- [ ] Rename "Recommended Pathways" → "Choose Your Learning Path"
- [ ] Update footer: "Book Executive Session" → "Contact Support" or remove

### Phase 2: High Value (Week 2)
- [ ] Restructure module detail pages: "Core Topics" → "What You'll Learn," etc.
- [ ] Add "Before You Start" section to module pages
- [ ] Add pathway step indicators (1️⃣ 2️⃣ 3️⃣)
- [ ] Update module page CTAs: "Enroll in This Module" instead of implicit link
- [ ] Refactor all copy: remove sales tone, add learning tone

### Phase 3: Nice-to-Have (Week 3+)
- [ ] Add difficulty filter to module search
- [ ] Add learner onboarding section: "Before You Start" (homepage)
- [ ] Implement progress tracking (requires user auth)
- [ ] Add completion badges (requires backend)
- [ ] Create "My Learning" / learner dashboard (future feature)

---

## 10. Accessibility & Responsive Considerations

### Maintain WCAG 2.1 AA
- ✓ Keep existing color contrast ratios
- ✓ Add semantic HTML for difficulty/time badges (use `<span role="img" aria-label="">` or `<span aria-label="">` for icons)
- ✓ Ensure new metadata (difficulty, time, prerequisites) is announced to screen readers
- ✓ All CTAs remain keyboard-accessible

### Metadata Display on Mobile
- **Desktop:** All metadata visible (time, difficulty, prerequisites, key takeaway)
- **Tablet:** Time + difficulty visible; prerequisites/takeaway collapsible or below fold
- **Mobile:** Time + difficulty in header; prerequisites/takeaway in expandable section

### Progressive Enhancement
- Metadata should be semantic HTML, not just visual
- Use `data-*` attributes for filtering/sorting (difficulty filter)
- Form controls (search, filter) remain fully functional with JS disabled

---

## 11. Success Criteria & Metrics

### Immediate (Visual/Copy Audit)
- [ ] No sales language ("premium," "exclusive," "book now") visible on homepage
- [ ] All CTAs reflect learner actions ("Start," "Enroll," "Browse") not sales actions ("Request," "Book")
- [ ] Module cards display: estimated time, difficulty level, prerequisites
- [ ] Pathways page frames choices as learner agency ("Choose," "Build your own"), not recommendations

### Learner Experience (Testing)
- [ ] New learner can start a module within 2 clicks from homepage
- [ ] Learner can identify estimated time/difficulty before committing to a module
- [ ] Pathway selector helps learner self-identify a starting path (no enrollment friction)
- [ ] Module detail pages clarify what learner will be able to do (learning outcomes, not business ROI)

### Retention Indicators (Post-Implementation)
- [ ] Module start rate (% of users who click "Start Learning")
- [ ] Completion rate (% of modules started that are completed)
- [ ] Pathway adoption (% of users who follow a pathway vs. browse freely)
- [ ] Return visits (% of users who return to continue learning)

---

## 12. Design Tokens / CSS Variables (No Changes Required)

The existing design tokens can remain unchanged:
- Color palette (primary navy, secondary orange, accent green) already support a premium + inclusive feel
- Typography (Sora, IBM Plex Sans) is professional and readable
- Spacing and radius values are appropriate for a learning platform

**Optional:** Add token for learner-specific UI:
```css
--learner-badge-bg: var(--surface-tint); /* Light card background for badges */
--learner-accent-time: var(--primary); /* Icon color for time/duration */
--learner-accent-difficulty: var(--secondary); /* Icon color for difficulty */
```

---

## 13. Glossary of Terminology Shifts

For consistency across all copy, adopt this terminology:

| Old Term | New Term | Context |
|----------|----------|---------|
| Program | Learning platform / Academy | Homepage, about sections |
| Enroll (in sales context) | Enroll / Start (in learning context) | CTAs, module invitations |
| Executive Session / Book | Office hours / Support | Support/follow-up |
| Recommended (prescriptive) | Suggested / Choose (empowering) | Pathways, module lists |
| Module library | Browse / Catalog | Navigation labels |
| Cohort | Community / Peer discussions (optional) | Social/collaborative sections |
| Premium / Exclusive | Focused / Practical | Tone, descriptions |
| ROI / Business value | Learning outcomes / Competency | Outcomes, descriptions |
| Blended delivery | Self-learning + workshops | Format description |
| Portable | Self-paced / Flexible | Accessibility, format |

---

## 14. Content Preservation Checklist

Ensure all existing content is preserved and not modified:
- [ ] Module titles unchanged
- [ ] Module descriptions (core topics, learning objectives) remain the same
- [ ] External resource links (LinkedIn, Udemy) preserved
- [ ] Workshop details (format, duration) preserved
- [ ] FAQ content unchanged
- [ ] Accessibility features (alt text, ARIA labels) maintained

---

## Summary: The Transformation in One Image

```
BEFORE (Marketing Platform)
┌─────────────────────────────────────────────┐
│ "Technology Fluency for Claims Executives"   │
│ "A premium learning experience..."           │
│ [Request Program Brief] [Explore 8 Modules]  │
│ "Claims-native | Executive-ready | ..."      │
│ "Business-First Explanations"                │
│ "Book Executive Session"                     │
└─────────────────────────────────────────────┘

AFTER (Learning Platform)
┌─────────────────────────────────────────────┐
│ "Begin Your Executive Technology Journey"    │
│ "Learn platform, AI, operations, & decisions"│
│ [Start Learning] [View My Pathways]          │
│ "8 focused modules | ~40 hours | Workshops"  │
│ "What You'll Learn | Why It Matters"         │
│ "Contact Support | Ask Questions"            │
└─────────────────────────────────────────────┘

KEY SHIFTS:
✓ Action → Learning (Start, Enroll, Browse)
✓ Pitch → Journey (Begin, Choose, Navigate)
✓ Sales signals → Learner signals (Time, difficulty, prerequisites)
✓ Business ROI → Learning outcomes (Competency, understanding)
✓ Enrollment friction → Entry accessibility (No forms, direct entry)
```

---

## Next Steps for Coder

1. **Read this spec in full** — identify all CTA and copy changes
2. **Audit current pages** — note all instances of old CTAs and language
3. **Update HTML structure** — add metadata to module cards (time, difficulty, prerequisites)
4. **Refactor copy** — replace all sales language with learner language
5. **Update CSS** — add styling for new badges and metadata (if needed; can reuse existing classes)
6. **Test accessibility** — ensure all metadata is announced to screen readers
7. **QA against success criteria** — verify all CTAs are action-oriented, all module pages show learning outcomes

---

**Document Version:** 1.0  
**Last Updated:** May 21, 2026  
**Status:** Ready for Implementation
