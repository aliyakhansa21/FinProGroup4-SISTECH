# IMPORTANT - READ FIRST

The attached Hi-Fi screens are **NOT** meant to be copied as fixed mobile frame sizes.

DO NOT recreate the phone frame.

The current project layout (desktop browser with a centered mobile-first content area) is already correct and MUST be preserved.

Your task is ONLY to replicate:

- screen flow
- component hierarchy
- feature behavior
- interaction logic
- state transitions

NOT the exact visual styling or phone frame.

Keep using the existing responsive layout already implemented in this project.

In other words:

✅ Copy:
- what components exist
- where components appear
- when components appear
- how they interact

❌ Do NOT copy:
- phone device frame
- exact spacing
- exact colors
- exact typography
- exact border radius
- exact Figma styling

The final UI styling will be implemented later from Figma Dev Mode.

# Safe Route Development Guide

## Objective

Implement the Safe Route feature by prioritizing **application architecture and logic**, not the final UI.

The visual design from Figma is only a reference to understand the component hierarchy and user flow.

The final UI will be implemented later using Figma Dev Mode.

---

# Priority Order

Always prioritize work in this order:

1. Component Architecture
2. State Management
3. Screen Flow
4. Event & Callback
5. Reusable Components
6. Placeholder UI

Do NOT prioritize styling.

---

# General Rules

- Keep all application state inside `page.js`.
- Components must be presentational.
- Pass data using props.
- Lift state up whenever possible.
- Avoid duplicated logic.
- Build reusable components.
- Do not change the existing folder structure.
- Do not introduce unnecessary abstractions.

---

# Layout Rules

Every Safe Route screen must use:

SafeRouteLayout

The layout is only responsible for rendering:

- Map
- Floating Header
- Floating Actions
- Bottom Sheet

The layout must not contain business logic.

---

# Screen Flow

The application follows this flow:

Step 1
Search Destination (this already made, you dont need to do anything, just continue to step 2)

↓

Step 2
Route Selection

↓

Step 3
Navigation

↓

Step 4
Arrival

Only the Bottom Sheet content changes between screens.

The map and overlays should be reused whenever possible.

---

# Component Responsibilities

SearchSheet
- Search destination
- Recent searches
- Continue action

RouteSelectionSheet
- Display route list
- Select route
- Start navigation

NavigationSheet
- Active navigation information
- Share
- End navigation
- ETA
- Safety information

ArrivalSheet
- Arrival confirmation
- Back Home
- I'm Safe

FloatingHeader
- Reusable
- Support multiple variants

FloatingActions
- Reusable floating buttons
- Receive callbacks via props

RouteCard
- Stateless
- Reusable

RouteMap
- Reusable map component

---

# Hi-Fi Reference

The attached Hi-Fi screens are provided only to understand:

- screen order
- visible components
- component hierarchy
- component visibility
- user interaction
- navigation flow

Do NOT attempt to recreate the visual design.

Do NOT focus on:

- colors
- spacing
- typography
- shadows
- animations
- pixel-perfect layout

A simple placeholder UI is sufficient.

---

# Important

Do not invent new features.

Do not add extra screens.

Do not add unnecessary state.

Do not redesign the user flow.

If something is unclear, follow the simplest implementation that matches the provided Hi-Fi.

The goal is to produce a clean, reusable React architecture that can later receive the final Figma UI with minimal code changes.

## Responsive Rule

The project is built using responsive desktop layout with mobile-first principles.

Maintain the existing layout structure.

Example:

Desktop
------------------------------------
|                                  |
|        centered content          |
|                                  |
------------------------------------

NOT

----------------
| phone frame |
----------------

## Component Fidelity Rule

Do not invent new components.

Do not remove components.

Do not merge components.

Do not split components.

If a screen contains five components in the Hi-Fi,
implement those same five logical components.

Nothing more.
Nothing less.

## Existing Code Rule

Do not rewrite existing screens that are already completed.

Only implement the requested screen.

If implementing Step 2,
Step 1 must remain untouched.

If implementing Step 3,
Step 1 and Step 2 must remain untouched.

Never refactor unrelated files unless required.