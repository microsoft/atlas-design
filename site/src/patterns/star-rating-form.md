---
title: Rating form
description: The Article Header pattern in the Atlas Design System
template: standard
---

# Rating form

```html
<div class="border border-radius-lg">
	<form class="padding-sm" id="star-rating-example-form">
		<star-rating id="star-rating-0" name="star-rating-0" value="3">
			<legend slot="legend">How are <strong>we doing</strong>?</legend>
		</star-rating>

		<star-rating id="star-rating-1" name="star-rating-1" value="0" class="margin-top-sm" required>
			<legend slot="legend">Did this web component make you <strong>smile</strong>?</legend>
			<span slot="label-1">Not in the slightest</span>
			<span slot="label-2">No</span>
			<span slot="label-3">Maybe</span>
			<span slot="label-4">A bit</span>
			<span slot="label-5">From ear to ear</span>
		</star-rating>

		<div id="display-on-star-rate" class="margin-top-sm" hidden>
			<p>We're sorry it didn't make you smile. If you'd like to, tell us why!</p>
			<textarea type="text" name="why-i-didnt-smile" class="textarea margin-top-xs"></textarea>
		</div>

		<div id="well-thats-good-news" class="margin-top-sm" hidden>
			<p>That's great! 😊</p>
		</div>

		<button type="submit" class="button margin-top-xs">Submit</button>
	</form>
</div>
```
