---
title: Markdown
description: An element to render html generated from markdown.
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FfiMDOM9S3wiWTy9YiA3988%2FDesign-System-IA-Artifacts%3Fnode-id%3D23%253A435%26scaling%3Dmin-zoom
---

# Markdown

The markdown element provides bare element styling to lists, paragraphs and inline code. This element is most often used to render the content section of a page.

```html
<div class="markdown">
	<p>Inner elements will be styled.</p>
</div>
```

## Headings

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
    - Second item
  - Second level again
- Last one
```

## Ordered list

```markdown
1. First list item
2. Second list item
   1. First level of nested list
      1. Second level of nested list
   1. Second item
   1. Second level again
3. Last one
```

## Mixed list

```markdown
1. First list item
2. Second list item
   - First level of nested list
     1. Second level of nested list
     2. Second item
        - And another one.
   - Second level again
3. Last one
```

## Inline elements

```markdown
Markdown allows for use to write inline code like this: `<br>`. It also allows use to easily write links to other pages [like this one](~/src/index.md).
```
