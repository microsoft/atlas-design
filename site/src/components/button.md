---
title: Temp tabs test
description: Buttons the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMCSf9XuplN2zG0sCcqJJyq%2F%25F0%259F%259A%25A7-Buttons%3Fpage-id%3D205%253A610%26node-id%3D364%253A852%26viewport%3D1342%252C2000%252C0.5%26scaling%3Dmin-zoom
classType: Component
classPrefixes:
  - button
---

<tab-container>
  <div role="tablist">
    <button type="button" id="tab-one" role="tab" aria-selected="true">Tab one</button>
    <button type="button" id="tab-two" role="tab" tabindex="-1">Tab two</button>
    <button type="button" id="tab-three" role="tab" tabindex="-1">Tab three</button>
  </div>
  <div role="tabpanel" aria-labelledby="tab-one">
    Panel 1
  </div>
  <div role="tabpanel" aria-labelledby="tab-two" hidden>
    Panel 2
  </div>
  <div role="tabpanel" aria-labelledby="tab-three" hidden>
    Panel 3
  </div>
</tab-container>
