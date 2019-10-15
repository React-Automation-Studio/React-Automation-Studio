The grid system is implemented with the `Grid` component:

* It uses CSS’s Flexible Box module for high flexibility.
* There are two types of layout: `containers` and `items`.
* Item widths are set in percentages, so they’re always fluid and sized relative to their parent element.
* Items have padding to create the spacing between individual items.
* There are five grid breakpoints: xs, sm, md, lg, and xl.
* If you are new to or unfamiliar with flexbox, we encourage you to read this CSS-Tricks flexbox guide.

## Spacing

The responsive grid focuses on consistent spacing widths, rather than column width. Material Design margins and columns follow an 8px square baseline grid. The spacing property is an integer between 0 and 10 inclusive. By default, the spacing between two grid items follows a linear function: output(spacing) = spacing * 8px, e.g. spacing={2} creates a 16px wide gap.

The complete Grid React component API documentation can be found at: https://material-ui.com/api/grid/ .
