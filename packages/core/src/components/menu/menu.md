@# Menu

Menus display lists of interactive items.

@reactExample MenuExample

The Menu API includes three React components:

* [Menu](#core/components/menu.menu)
* [MenuItem](#core/components/menu.menu-item)
* [MenuDivider](#core/components/menu.menu-divider)

```tsx
<Menu>
    <MenuItem icon="new-text-box" onClick={handleClick} text="New text box" />
    <MenuItem icon="new-object" onClick={handleClick} text="New object" />
    <MenuItem icon="new-link" onClick={handleClick} text="New link" />
    <MenuDivider />
    <MenuItem text="Settings..." icon="cog" intent="primary">
        <MenuItem icon="tick" text="Save on edit" />
        <MenuItem icon="blank" text="Compile on edit" />
    </MenuItem>
</Menu>
```

@## Props

A `Menu` is a `<ul>` container for menu items and dividers.

@interface MenuProps

@## Menu item

A `MenuItem` is a single interactive item in a `Menu`.

This component renders an `<li>` containing an `<a>`. Make the `MenuItem`
interactive by providing the `href`, `target`, and `onClick` props as necessary.

Create submenus by nesting `MenuItem`s inside each other as `children`. Use the
required `text` prop for `MenuItem` content.

@reactExample MenuItemExample

@interface MenuItemProps

@## Menu divider

Use `MenuDivider` to separate menu sections. Optionally, add a title to the divider.

@interface MenuDividerProps

@## Dropdowns

The `Menu` component by itself simply renders a list of items. To make a
dropdown menu, compose a `Menu` as the `content` property of a `Popover`:

```tsx
<Popover content={<Menu>...</Menu>} placement="bottom">
    <Button alignText="left" icon="applications" rightIcon="caret-down" text="Open with..." />
</Popover>
```

Some tips for designing dropdown menus:

* __Appearance__: it's often useful to style the target Button with `fill={true}`,
  `alignText="left"`, and `rightIcon="caret-down"`. This makes it appear more like an
  [HTML `<select>`](#core/components/html-select) dropdown.

* __Interactions__: by default, the popover is automatically dismissed when the user clicks a menu
  item ([Popover docs](#core/components/popover.closing-on-click) have more
  details). If you want to opt out of this behavior, set
  `shouldDismissPopover={false}` on a `MenuItem`. For example, clicking the "Table"
  item in this dropdown menu will not dismiss the `Popover`:

@reactExample DropdownMenuExample

@## Submenus

To add a submenu to a `Menu`, simply nest `MenuItem`s within another `MenuItem`.
The submenu opens to the right of its parent by default, but will adjust and flip to the left if
there is not enough room to the right.

```tsx
<Menu>
    <MenuItem text="Submenu">
        <MenuItem text="Child one" />
        <MenuItem text="Child two" />
        <MenuItem text="Child three" />
    </MenuItem>
</Menu>
```

@## CSS

Menus can be constructed manually using the HTML markup and `@ns-menu-*` classes below. However, you
should use the menu [React components](#core/components/menu.javscript-api) instead wherever possible,
as they abstract away the tedious parts of implementing a menu.

* Begin with a `ul.@ns-menu`. Each `li` child denotes a single entry in the menu.

* Put a `.@ns-menu-item` element inside an `li` to create a clickable entry. Use either `<button>` or
  `<a>` tags for menu items to denote interactivity.

* Add icons to menu items the same way you would to buttons: simply add the appropriate
  `@ns-icon-<name>` class\*.

* Make menu items active with the class `@ns-active` (along with `@ns-intent-*` if suitable).

* Make menu items non-interactive with the class `@ns-disabled`.

* Wrap menu item text in a `<span>` element for proper alignment. (Note that React automatically
  does this.)

* Add a right-aligned label to a menu item by adding a `span.@ns-menu-item-label` inside the
  `.@ns-menu-item`, after the content. Add an icon to the label by adding icon classes to the label
  element (`@ns-icon-standard` size is recommended).

* Add a divider between items with `li.@ns-menu-divider`.

* If you want the popover to close when the user clicks a menu item, add the class
  `@ns-popover-dismiss` to any relevant menu items.

<small>\* You do not need to add a `@ns-icon-<sizing>` class to menu items—icon sizing is
defined as part of `.@ns-menu-item`.</small>

<div class="@ns-callout @ns-intent-primary @ns-icon-info-sign">

Note that the following examples are `display: inline-block`; you may need to adjust
menu width in your own usage.

</div>

@css menu

@### Section headers

Add an `li.@ns-menu-header`. Wrap the text in an `<h6>` tag for proper typography and borders.

@css menu-header
