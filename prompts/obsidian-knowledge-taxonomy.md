# Obsidian 04 Knowledge Taxonomy Designer

**ID:** `obsidian-knowledge-taxonomy`  
**Category:** Productivity  
**Tags:** obsidian, pkm, taxonomy, knowledge-management, folders

## Description

Recommends a small set of durable top-level folders for Obsidian `04 Knowledge` by analyzing `03 Areas` contents. Biased toward fewer, broader domains—not a 1:1 Area-to-Knowledge mapping.

## Prompt

You are designing the top-level folder taxonomy for an Obsidian vault.

Your task is to analyze the contents of `03 Areas` and recommend a small set of durable, high-level folders for `04 Knowledge`.

Contents of `03 Areas`:
{areas}

## Core model

`03 Areas` represents ongoing responsibilities, operating domains, and MOCs.

`04 Knowledge` represents durable, reusable knowledge that may support multiple Areas and Projects.

Do NOT create a 1:1 mapping between Areas and Knowledge folders.

For example:

* `Career` may be an Area, but should not automatically create `04 Knowledge/Career`.
* Knowledge referenced by Career may instead belong under domains such as `AI`, `Leadership`, `Program Management`, `Engineering`, or `Digital Transformation`.

## Primary objective

Create the smallest useful set of top-level Knowledge folders that can organize the durable knowledge implied by the Areas.

The taxonomy should optimize for:

1. Long-term stability
2. Low cognitive load
3. Cross-area reuse
4. Broad conceptual coherence
5. Minimal folder proliferation
6. Easy filing without having to think too hard

## Anti-granularity rules

Be strongly biased toward FEWER folders.

Do not create a folder merely because:

* an Area exists with that name
* multiple notes mention a topic
* a project exists
* a specific technology, vendor, product, methodology, or tool appears
* something could theoretically be separated

Prefer one broad domain over several adjacent categories.

For example, prefer:

`AI/`

over:

`Agentic AI/`
`LLMs/`
`RAG/`
`Machine Learning/`
`AI Agents/`

Those subjects can live as notes, MOCs, links, or substructure inside `AI`.

Prefer:

`Engineering/`

over:

`Well Engineering/`
`Mechanical Engineering/`
`Aerospace Engineering/`
`Reliability Engineering/`

unless the underlying corpus is large enough that the broader category would become genuinely difficult to navigate.

## Threshold for creating a top-level folder

A proposed top-level Knowledge folder should normally satisfy at least THREE of these conditions:

* It contains knowledge relevant to multiple Areas or Projects.
* It represents a durable field or discipline.
* It is likely to remain relevant for several years.
* It could reasonably contain at least 10–20 substantive knowledge notes over time.
* It has a clear conceptual boundary from the other proposed folders.
* A user could reliably decide whether a new note belongs there without hesitation.

If it does not meet this threshold, keep it as:

* a note,
* an MOC,
* a tag,
* a property,
* or a subtopic inside a broader Knowledge folder.

## Folder-count constraint

Target **5–9 top-level folders** in `04 Knowledge`.

Use fewer if possible.

Exceed 9 only if there is unusually strong evidence that the domains are genuinely distinct and durable.

## Analysis method

1. Read all notes and folder names in the provided `03 Areas` contents.
2. Ignore purely administrative or operational language.
3. Extract the underlying reusable knowledge domains.
4. Merge overlapping or closely related domains aggressively.
5. Separate:

   * responsibilities
   * active work
   * durable knowledge
6. Identify knowledge that appears across multiple Areas.
7. Propose a compact taxonomy.

## Required output

### 1. Recommended `04 Knowledge` structure

Show only the proposed top-level folders:

```text
04 Knowledge/
  AI/
  Engineering/
  Leadership/
  ...
```

### 2. Rationale

For each folder, explain in one or two sentences:

* what belongs there
* what explicitly does NOT need its own top-level folder

### 3. Area-to-Knowledge mapping

Create a table:

| 03 Area          | Relevant 04 Knowledge domains      |
| ---------------- | ---------------------------------- |
| Career           | AI, Leadership, Program Management |
| Finance          | Finance                            |
| Personal Systems | AI, Productivity, Technology       |

This mapping is many-to-many.

### 4. Granularity check

List any categories you considered but deliberately rejected as top-level folders and explain what broader category should absorb them.

Example:

* `Agentic AI` → keep under `AI`
* `Vendor Strategy` → keep under `Digital Transformation` or `Management`
* `Obsidian` → keep under `Personal Knowledge Management` or `Technology`, depending on corpus

### 5. Taxonomy quality test

Assess the final taxonomy against these questions:

* Are any folders really Areas disguised as Knowledge?
* Are any folders named after a single project, vendor, application, or technology?
* Are any two folders likely to cause filing ambiguity?
* Could any two folders be merged?
* Would this structure still make sense five years from now?
* Is any folder unlikely ever to contain 10+ meaningful notes?

If yes, revise the taxonomy before presenting the final result.

## Important design principle

The purpose of folders is coarse structural separation.

Do not attempt to encode the full meaning of the vault into folders.

Use:

* links
* MOCs
* properties
* tags
* search

for finer-grained organization.

The final result should feel deliberately broad and slightly under-specified rather than exhaustively categorized.

## Variables

- `{areas}` - Folder names, note titles, and/or excerpts from `03 Areas` that imply durable knowledge domains

## Example Usage

**Areas:** "Career (AI, interviews, leadership MOCs); Finance (budgeting, investing notes); Personal Systems (Obsidian workflows, productivity)"

Expected output: 5–9 top-level `04 Knowledge` folders, rationale, Area-to-Knowledge mapping, rejected categories, and a taxonomy quality check.

## Tips

- Paste folder trees plus key MOC/note titles for better domain extraction
- Prefer breadth over completeness when describing Areas
- Remind the model if your corpus is unusually large in one specialty (e.g., engineering subtypes)
