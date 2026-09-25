---
title: API link button
description: The API link button component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - api-link-button
---

# API link button

The API link button presents an HTTP method and flexible API path as a full-width link. It uses standard control sizing with a clear hover treatment.

Place API link buttons inside an `.api-link-button-container`. The container establishes the inline-size context used to stack the method above the path when the container is 300px wide or narrower.

## Default layout

```html
<div class="api-link-button-container">
	<a class="api-link-button" href="#default-layout" aria-label="Get a response">
		<span class="api-link-button-method" data-method="get">get</span>
		<span class="api-link-button-text">/openai/v1/responses/{response_id}</span>
	</a>
</div>
```

## Narrow layout

The narrow layout reduces the vertical gap between the method and path to keep the stacked link compact.

```html
<div class="api-link-button-container width-300">
	<a class="api-link-button" href="#narrow-layout" aria-label="Delete a response">
		<span class="api-link-button-method" data-method="delete">delete</span>
		<span class="api-link-button-text">/openai/v1/responses/{response_id}</span>
	</a>
</div>
```

## Method colors

Set `data-method` on `.api-link-button-method` to apply the method color for `get`, `post`, `put`, `patch`, or `delete`. Other methods inherit the surrounding text color.

```html
<div class="api-link-button-container">
	<a class="api-link-button" href="#method-colors" aria-label="Replace a response">
		<span class="api-link-button-method" data-method="put">put</span>
		<span class="api-link-button-text">/openai/v1/responses/{response_id}</span>
	</a>
	<a class="api-link-button" href="#method-colors" aria-label="Update a response">
		<span class="api-link-button-method" data-method="patch">patch</span>
		<span class="api-link-button-text">/openai/v1/responses/{response_id}</span>
	</a>
</div>
```
