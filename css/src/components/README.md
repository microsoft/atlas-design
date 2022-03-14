# Atlas CSS Components

Each of the files in the `/components` folder (or subfolders) contain one Atlas component. Create new component when you have a complex layout that requires many helper classes to recreate.

## Guidance

There are a few things to think about when adding a new component, though none of them are strict rules.

- File name should match the class of the component.
- There should only be one top level class per file.
- Subclasses (classes that to go inside the main class) are fine.
- Modifier classes on the main class are also fine.
- Seek to nest only two levels deep, three at most.

## Direction

When horizontal (inline) direction is important to a component, the user's text direction should be interpolated into the appropriate place(s). This guidance will be updated after Atlas moves to logical properties for direction related styles. See below for an example of how that is

```scss
.thing-with-side-border {
	border-#{$user-left}: 1px solid magenta;
}
```

## Class nomenclature within components

The component name itself should be a noun or noun-phrase. Endeavor to choose the shortest applicable word or series of words that best describes the component. Modifiers on a particular component should contain the top level component within the class name. State based class modifiers will follow a different convention, and be prefixed with `is-`.

Examples of state-targeting classes are:

- `is-disabled`
- `is-hovered`
- `is-focused`

## Sizes within class names

Although we favor unabbreviated names in our design system, we've made one exception. This exception applies to both components and atomics, and it is in the use of sizes. We abbreviate size with at-least-two-letter t-shirt sizes. If it weren't for the terrible ergonomics of writing `extra-extra-large` then we'd likely have stuck to standard operating procudure here, but as George Orwell said in his final rule for clear writing, "Break any of these rules sooner than say anything outright barbarous."

- extra extra small - xs
- extra small - xs
- small -> sm
- large -> lg
- extra large - xl
- extra extra large - xl

## Example

```scss
// main class
.component {
	[...]

	&.component-sm {
		[...]
	}

	&.component-lg {
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
