# Changelog

## 2026-05-22

- **Nav watermark line-break fix:** Corrected CSS content escape for the FAQ watermark so it renders cleanly on two lines: "For Samer" and "from Marco".

- **Nav spacing + watermark formatting:** Increased spacing between nav entries and updated the FAQ watermark to two lines (line break after "Samer") with centered alignment for desktop and mobile.

- **Nav watermark label:** Added a shared sidebar/mobile-nav watermark under FAQ via `assets/css/styles.css` with exact text "For Samer from Marco" using subtle muted styling across all pages without changing nav links or behavior.

- **Platform rename across all pages:** Updated platform branding from "Executive Claims Technology Academy" to "Samer's Technology Academy" across all HTML page-level brand locations (titles, header brand text, and header aria labels).

- **Dashboard app-shell redesign:** Reworked the shared UI/UX into a cleaner learning dashboard style with a desktop left navigation rail, mobile hamburger collapse behavior, injected top utility bar, softer neutral card surfaces, modern spacing rhythm, and preserved module filter/search, FAQ accordion, reveal motion, and route/link behavior across all pages.

- **Mailto target standardization:** Updated all HTML `mailto:` link targets to `marco.meisen@verisk.com` while preserving link text and surrounding page content.

- **Module card heading spacing fix:** Added shared card content-flow spacing in `assets/css/styles.css` so secondary headings like "Why It Matters" no longer appear cramped after lists/paragraphs, while preserving correct top-of-card heading alignment and improving module card rhythm.

- **Clean UI refresh (screenshot-inspired):** Updated shared styles for a lighter, cleaner dashboard-like experience with calmer surfaces, reduced gradient intensity, softer borders/shadows, tighter motion timing, improved visual rhythm, and preserved accessibility/reduced-motion behavior across core pages and module detail layouts.

- **Home markup integrity fix:** Repaired malformed HTML in `index.html` value/outcomes cards to restore valid structure and consistent rendering without changing information architecture.

- **Visual direction refresh spec:** Added a concise, implementation-ready "Clean UI Direction (Screenshot-Inspired)" section to `UX_TRANSFORMATION_SPEC.md` with concrete design tokens, component treatment rules, motion limits, accessibility guardrails, mobile behavior, and low-risk rollout steps for shared CSS + minimal HTML hooks.

- **Resources UI standardization:** Updated Modules 1-9 self-learning sections to consistent provider-group layout with required order (LinkedIn Learning, YouTube, Udemy), including lightweight provider icons and accessible grouped headings.

- **Module 9 content replacement:** Replaced `modules/module-9.html` content using the TrainingConcept Module 9 topic, now focused on "Agentic AI & Autonomous Claims Operations" with updated executive framing, workshop, and self-learning resources.
- **Module 9 launch:** Added new module page `modules/module-9.html` for "Value Realization, KPIs & Executive Decision Metrics" with learning goals, executive value workshop simulation, and curated self-learning resources.
- **Site-wide module count update:** Updated homepage and catalog copy from 8 to 9 modules, including hero text and module stat highlights.
- **Navigation and pathways wiring:** Added Module 9 card to the modules catalog (search/filter enabled with `data-track="strategy"`), added Module 9 as a suggested step across all learning pathways, and updated Module 8 footer progression to point to Module 9.

- **Global UI hint position:** Repositioned the shared hint text "For Samer from Marco" from bottom-right to bottom-center on all pages.
- **Global UI hint:** Added a subtle, non-interactive bottom-right hint on all pages via shared stylesheet text: "For Samer from Marco".
- **Global UI hint visibility:** Increased the shared hint text visibility (slightly larger size, higher opacity, and a soft readability treatment) while keeping it subtle and non-interactive.
- **Module resources:** Standardized software architecture references across Modules 1-8 to use: https://www.youtube.com/watch?v=8UlLgOf20Ho.
- **Module 8 resources:** Removed two self-learning YouTube links from Module 8: "Stanford eCorner - Leadership & Innovation" and "McKinsey - Agile Organizations".

## 2026-05-21

- **Global header navigation:** Removed the "Start Learning" button from all page headers so navigation is consistent and content-first across the site.
- **Home page (index.html):** Removed the "Ready to Run This Program for Your Leadership Team?" callout section and removed the bottom static-hosting footer block.

### Marketing → Learning Platform Transformation
- **Home page (index.html):** Removed the full "Concrete Use Cases Covered" section (heading and all four use-case cards) from the homepage.
- **Complete website transformation** from sales/marketing positioning to learning platform experience
- **Hero section:** Changed headline from "Technology Fluency for Claims-Insurtech Executives" to "Begin Your Executive Technology Learning Journey"; updated primary CTA from "Request Program Brief" to "Start Learning"; added secondary CTA "View Learning Pathways"; replaced side card "Program Snapshot" with "Get Started"
- **Global navigation:** Replaced all "Book Executive Session" CTAs with "Start Learning" across all pages with learning-focused mailto subject line
- **Module catalog (modules.html):** Renamed page title to "Explore Your Learning Modules"; updated section heading to "Find Your Module"; changed filter label from "Filter by track" to "Filter by topic or difficulty"; updated resource section from "Blended Learning Resources" to "Enhance Your Learning"
- **Learning pathways (pathways.html):** Renamed page to "Choose Your Learning Path"; changed section heading from "Recommended Pathways" to "Choose Your Learning Path"; reframed pathway descriptions with learning-focused language; updated delivery rhythm language from "Delivery Rhythm" to "Your Suggested Learning Rhythm"; updated footer language
- **FAQ page (faq.html):** Renamed to "Learning Resources & FAQs"; updated all question language to learning-focused tone; changed opening questions to address learner needs rather than program fit; updated footer to guide learners to modules
- **All module detail pages (1-8):** Transformed section headers from sales/business language to learning language:
  - "Core Topics" → "What You'll Learn"
  - "Executive Translation" → "Why It Matters"
  - "Business Outcomes" / "Strategic Impact Areas" / etc. → "Learning Outcomes" or contextual learning-focused titles
  - Updated all supporting section labels to learning-focused terminology
- **Home page (index.html):** Updated value proposition section from "Value Proposition" to "What You'll Gain"; reframed all benefit statements to learning outcomes; changed CTA section from "Ready to Run This Program" to "Ready to Start Learning?"; updated trust strip labels from "Program signals" to "What you'll learn" with learning-focused messaging
- **Footer updates:** Replaced sales-oriented footer language with learner-focused support language
- **Tone throughout:** Removed "program," "book a session," "request brief," and "executive training inquiry" language; replaced with "module," "start learning," "explore," and learning-focused verbs
- **Result:** Website now positions as a learning platform for self-paced exploration and skill development, not a sales/enrollment funnel

## 2026-05-21 (Earlier)
- **UX:** Created comprehensive UX Transformation Spec (UX_TRANSFORMATION_SPEC.md) to shift website from marketing/sales positioning to learning platform positioning. Spec covers: hero redesign, CTA language overhaul, module card presentation with learning readiness signals (time, difficulty, prerequisites), pathway experience reframing, tone/language guidelines, new visual elements, and page-by-page implementation recommendations. Maintains premium aesthetic and existing IA while removing sales pitch language and adding learner-centric positioning.

## 2026-05-20
- Added Module 8: Agile Organizations & Modern Product Development with a full module detail page, executive learning goals, misconceptions, better questions, resource links, and a workshop simulation format.
- Updated home, modules catalog, and learning pathways to reflect 8 total modules and include Module 8 cross-links.
- Updated module navigation flow so Module 7 links forward to Module 8.
- Implemented a complete static executive learning website based on TrainingConcept.md.
- Added responsive pages: home, modules catalog, learning pathways, FAQ, and seven rich module detail pages.
- Added shared design system and interactions with semantic HTML, accessible focus states, mobile navigation, catalog search/filter, and FAQ accordion behavior.
- Added mixed external learning links (LinkedIn Learning and Udemy) across catalog, pathways, and module pages.
- Added mailto-based executive inquiry CTA across primary pages for static hosting portability.
- Applied a second visual polish pass with stronger section bands, richer card hierarchy, dark executive briefing surfaces, compact trust and stats strips, and restrained reveal motion across shared pages and module detail pages.
