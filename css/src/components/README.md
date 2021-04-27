# Atlas CSS Components

You want to add a new component to Atlas. Each of the files in this folder contain one such component.

## Guidance

There are a few things to think about when adding a new component, though none of them are strict rules.

- include only one top-level class per file.
- subclasses (classes mean to go inside the main class) are fine.
- modifier classes on the main class are also fine.
- seek to nest only two levels deep, three at most.

```scss
// main class
.component {
	[...]

	.is-large {
		[...]
	}

	.component-sub {
		[...]
	}

	.component-sub-component {
		[...]
	}
}
```

## Direction

When horizontal (inline) direction is important to a component, the user's direction should be interpolated into the appropriate place(s).

```scss
.thing-with-side-border {
	border-#{$user-left}: 1px solid magenta;
}
```
