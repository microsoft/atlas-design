# Full Ramp
| new name | new variable | new value | old name                | old variable | old value |
|----------|--------------|-----------|-------------------------|--------------|-----------|
|          |   spacer-0	  | 0		  | has-margin-none         | spacing-0	   | 0		   | //0px
|          |   spacer-1   | 0.125rem  | 		                | 			   |		   | //2px
|          |   spacer-2   | 0.25rem   | has-margin-extra-small  | spacing-1    | 0.25rem   | //4px
|          |   spacer-3   | 0.5rem    | has-margin-small        | spacing-2    | 0.5rem    | //8px
|          |   spacer-4   | 0.75rem   |                         |              |           | //12px
|          |   spacer-5   | 1rem      | has-margin-medium       | spacing-3    | 1rem      | //16px
|          |   spacer-6   | 1.25rem   |                         |              |           | //20px
|          |   spacer-7   | 1.5rem    | has-margin-large        | spacing-4    | 1.5rem    | //24px
|          |   spacer-8   | 2rem      | 				        |              |           | //32px
|          |   spacer-9   | 2.5rem    | 				        |              |           | //40px
|          |   spacer-10  | 3rem      | has-margin-extra-large  | spacing-5    | 3rem      | //48px
|          |   spacer-11  | 4rem      |                         |              |           | //64px
|          |   spacer-12  | 6rem      | has-margin-super-large  | spacing-6    | 6rem      | //96px
|          |   spacer-13  | 8rem      |                         |              |           | //128px
|          |   spacer-13  | 10rem     |                         |              |           | //160px

# Spacing Ramp
| new name (margin/padding)| new variable | new value | old name                | old variable | old value |
|--------------------------|--------------|-----------|-------------------------|--------------|-----------|
| has-margin-none          |   spacer-0	  | 0		  | has-margin-none         | spacing-0	   | 0		   | //0px
| has-margin-3x-small      |   spacer-1   | 0.125rem  | 		                | 			   |		   | //2px
| has-margin-2x-small      |   spacer-2   | 0.25rem   | has-margin-extra-small  | spacing-1    | 0.25rem   | //4px
| has-margin-extra-small   |   spacer-3   | 0.5rem    | has-margin-small        | spacing-2    | 0.5rem    | //8px
| has-margin-small         |   spacer-4   | 0.75rem   |                         |              |           | //12px
| has-margin-medium        |   spacer-5   | 1rem      | has-margin-medium       | spacing-3    | 1rem      | //16px
| has-margin-large         |   spacer-6   | 1.25rem   |                         |              |           | //20px
| has-margin-extra-large   |   spacer-7   | 1.5rem    | has-margin-large 		| spacing-4    | 1.5rem    | //24px
| has-margin-2x-large      |   spacer-8   | 2rem      | 				        |              |           | //32px
| has-margin-3x-large      |   spacer-9   | 2.5rem    |                         |              |           | //40px
| has-margin-4x-large      |   spacer-10  | 3rem      | has-margin-extra-large  | spacing-5    | 3rem      | //48px

# Layout Ramp
| new name (margin/padding)     | new variable | new value | old name                  | old variable | old value |
|-------------------------------|--------------|-----------|---------------------------|--------------|-----------|
| has-layout-margin-none    	|   layout-0   | 0		   | has-margin-none           | spacing-0	  | 0		  | //0px
| has-layout-margin-extra-small |   layout-1   | 1rem      | has-margin-medium		   | spacing-3    |	1rem      | //16px
| has-layout-margin-small       |   layout-2   | 1.5rem    | has-margin-large          | spacing-4    | 1.5rem    | //24px
| has-layout-margin-medium      |   layout-3   | 2rem      |                           |              |           | //32px
| has-layout-margin-large       |   layout-4   | 3rem      | has-margin-extra-large    | spacing-5    | 3rem      | //48px
| has-layout-margin-extra-large |   layout-5   | 4rem      |                           |              |           | //64px
| has-layout-margin-2x-large    |   layout-6   | 6rem      | has-margin-super-large    | spacing-6    | 6rem      | //96px
| has-layout-margin-3x-large    |   layout-7   | 8rem      | 				           |              |           | //128px

# Migration Proposal

- After adding spacing tokens to atlas-css, test the new tokens in docs-ui with low impact classes/components:
  - style-guide .hr margin
  - .hr margin
  - .details-summary padding
  - marketing .details-summary padding

- Test higher impact classes/classes with arithmetic:
  - .is-overlayed-large margin
  - .footerContainer margin
  - .footer-layout padding
  - .footer-layout .links margin
  - $nav-bar-horizontal-spacing
  - $nav-bar-hover-bottom-thickness
  - $nav-bar-submenu-button-padding
  - $nav-bar-item-user-menu-box-padding
  - $nav-bar-item-user-menu-profile-link-padding
  - $nav-bar-item-user-menu-section-thickness
  - $nav-bar-item-user-menu-bottom-thickness

- Once verified that the new tokens causes no adverse effects, migrate by each current value in docs-ui.
- Once migrated, depreciate current values in docs-ui.

# Atomic Class Implementation

- Migrate current spacing helpers to atlas-css.
- Update $spacing-sizes with new key/value pairs.
- In the loops that create `has-margin-size`, `has-padding-size`, etc, add new classes for layout:
  - `has-layout-margin-size`, `has-layout-padding-size`, `has-layout-margin-size-tablet`, `has-layout-margin-size-mobile`, etc.
  - `has-layout-margin-top-size`, etc
  - `has-content-layout-margin-*`, etc 
- Verify that there are no visual changes.
- Replace current class usage with new layout classes where applicable.
- Depreciate current _spacing.scss_ in docs-ui.