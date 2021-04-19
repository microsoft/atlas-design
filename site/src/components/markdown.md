---
title: Markdown
description: An element to render html generated from markdown.
template: standard
---

# Markdown

The markdown element provides bare element styling to lists, paragraphs and inline code.

## Elements

The the main title of this page provides an exampe of level one heading. The next five headers are examples of each subsequent heading size within Markdown.

```markdown
# Heading (level 1)

## Headings (level 2)

### Headings (level 3)

#### Headings (level 4)

##### Headings (level 5)

##### Headings (level 6)
```

## Unordered list

```markdown
- First list item
- Second list item
  - First level of nested list
    - Second level of nested list
    - third level of nested list
  - Second level again
- Last one
```

## Ordered list

```markdown
1. First list item
2. Second list item
   1. First level of nested list
      1. Second level of nested list
      1. third level of nested list
   1. Second level again
3. Last one
```

## Mixed list

```markdown
1. First list item
2. Second list item
   - First level of nested list
   1. Second level of nested list
   2. third level of nested list
      - And another one.
   - Second level again
3. Last one
```

## Inline elements

```markdown
Markdown allows for use to write inline code like this: `<br>`. It also allows use to easily write links to other pages [such as the code-block page](~/src/components/code-block.md).
```
