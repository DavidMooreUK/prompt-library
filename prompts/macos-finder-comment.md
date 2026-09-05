# macOS Finder Comment Generator

**ID:** `macos-finder-comment`  
**Category:** Productivity  
**Tags:** macos, finder, metadata, search, files

## Description

Creates a compact Finder Comment for identifying, searching, and distinguishing a file later. Optimized for human recognition and long-term retrieval—not a conventional summary or tag list.

## Prompt

Generate a macOS Finder Comment for this file.

File contents or description:
{file}

PURPOSE
The Finder Comment is a compact semantic description used to identify,
rediscover, search, and distinguish the file later. It is NOT a conventional
summary, filename, note, or list of tags.

OPTIMIZE FOR
1. Human recognition — someone should understand what the file is without
   opening it.
2. Search retrieval — include the specific words someone would reasonably
   search for months or years later.
3. Disambiguation — distinguish this file from similar documents.
4. Factual accuracy — include only information supported by the file.

CONTENT PRIORITY
Include, when materially useful:

1. Document type
   Examples: award letter, invoice, contract, research paper, meeting notes,
   medical result, receipt, proposal, manual, certificate.

2. Primary subject
   The person, organization, project, product, property, account, event,
   topic, or matter the document concerns.

3. Purpose or significance
   Explain what the document actually does or establishes:
   confirms, approves, rejects, requests, records, authorizes, summarizes,
   evidences, proposes, instructs, etc.

4. Important outcome or status
   Examples: approved, executed, final, submitted, rejected, paid,
   superseded, accepted.

5. Important date or time period
   Include dates when they help distinguish or retrieve the document.

6. Identifiers
   Include meaningful reference numbers, case numbers, invoice numbers,
   application numbers, agreement numbers, version numbers, etc.

7. Search terminology
   Preserve important canonical names, acronyms, technical terms, and
   commonly used alternative terms when useful.
   Example: Institute of Materials, Minerals and Mining (IOM3);
   Fellow (FIMMM).

STYLE
- Write 1–2 compact sentences.
- Target approximately 150–300 characters when sufficient.
- Exceed that only when additional information materially improves retrieval.
- Use information-dense language.
- Prefer concrete nouns and verbs.
- Preserve official names and terminology.
- Use dates in a consistent human-readable format: 20 Oct 2025.
- Do not use headings, bullets, Markdown, or labels.
- Do not write "This document..."
- Do not include filler such as "contains information about".
- Do not simply repeat the filename.
- Do not stuff unrelated keywords.
- Do not speculate or infer unsupported facts.
- Do not describe trivial formatting or file properties.
- If a fact is uncertain, omit it rather than guess.

SELECTION RULE
Ask:
"If the owner remembers almost nothing about this file two years from now,
what few facts would best help them find it and immediately know why they
kept it?"

Return ONLY the Finder Comment.

## Variables

- `{file}` - The file contents, excerpt, or a factual description of the document

## Example Usage

**File:** "PDF award letter confirming Fellowship of the Institute of Materials, Minerals and Mining (IOM3 / FIMMM), dated 20 Oct 2025"

Expected style of output: a short, information-dense Finder Comment naming the document type, organization, status, and date—usable for Spotlight search later.

## Tips

- Paste the full text when possible; otherwise include type, subject, outcome, dates, and any identifiers
- Prefer official names and acronyms the way you would search for them later
- Omit uncertain details rather than guessing
