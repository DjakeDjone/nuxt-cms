# Nuxt data manager ⚙️ (in development yet)

A nuxt module with easy to use components for creating editable content and storing them in a kv database using nitro.

## Features

- edit simple text in an input field

> ### Styling ✨
>
> All components are unstyled by default, except for some basic styles.
> You can easily add your own styles or use a CSS framework like Tailwind CSS to style the components.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-data-mngr
```

That's it! You can now use the nuxt data manager in your Nuxt app ✨

## Styled / Unstyled

You can use this module with or without styles.

If you want to also have styled html tags (e.g. `<h1>`, `<p>`, etc.) you can enable the `suiProse` option and add the class `sui-prose` to a parent element.
This will add styles to the html tags used in the editable content.

Just configure the module in your `nuxt.config.ts` file:

```ts
  editableContent: {
    storageKey: 'data',
    styled: true,
    suiProse: true,
    auth: {
      routeRules: [
        {
          // allow all get requests
          roles: ['*'],
          url: /^\/api\/editable\/.*/,
          method: 'GET',
        },
        {
          // editable route ('/api/editable/*')
          roles: ['admin'],
          url: /^\/api\/editable\/.*/,
          method: 'POST',
        },
      ],
      initUsers: [
        {
          id: '1',
          username: 'admin',
          pwd: 'admin123',
          role: 'admin',
          tokens: [],
        },
      ],
    },
  },
```

## Usage 💡


### Components

> Most components have an admin version that is used for editing content. The admin versions ends with `Admin`, e.g. `<EditableContentAdmin>`.

**Editable**
- `<EditableContentIndex>`
- `<EditableContentAdmin>`
- `<EditableContentAreaIndex>`
- `<EditableContentAreaAdmin>`
- `<EditableSaveBtn>`

**Notification**
- `<NotificationTime>`
- `<NotificationTest>`
- `<NotificationTypeIcon>`
- `<NotificationItem>`
- `<NotificationStack>`

**Tiptap**
- `<TiptapMyMenu>`
- `<TiptapNav>`
- `<TiptapEditorWrapper>`

**Ui**
- `<UiAnimatedMenuIcon>`
- `<UiList>`
- `<UiBtnGroup>`
- `<UiStyle>`
- `<UiBtn>`
- `<UiSmartHeader>`
- `<UiHeader>`
- `<UiThemeSwitch>`
- `<UiSwitch>`
- `<UiSwitchCrossed>`
- `<UiTooltip>`
- `<UiSeperator>`
- `<UiTest>`
- `<UiOptions>`

**Auth**
- `<AuthLogin>`

**Composables**
- `useSaveHandler`: A composable for handling save operations.


### Example

```vue
<script setup lang="ts">
const saveHandler = useSaveHandler();

const _save = async () => {
  console.log("Saving all changes...");
  await saveHandler.saveAll();
};
</script>

<template>
  <main>
    <EditableSaveBtn />
    <h1 class="text-2xl font-bold text-center my-4">
      <EditableContentAdmin
        content-id="heading-text"
        class="text-center w-fit"
      />
    </h1>
    <EditableContentAreaAdmin content-id="area-a" class="text-center w-fit" />
  </main>
</template>

<style scoped>
textarea:focus,
input:focus {
  outline: none;
}
</style>
```

## TODO

- [x] WYSIWYG editor Component
- [ ] **Notification Service**
- [ ] layout component
- [ ] file upload component
- [ ] styling *in progress*
  - [x] add basic styles
  - [x] dark mode
  - [ ] add support for custom themes
  - [ ] styling completed
  - [ ] advanced styling

- [ ] Layout component/solution
- [ ] image upload component
- [ ] List component (cards, grid, etc.)
- [ ] **auth** <in progress 😎>
- [ ] **auth**: add support for route based auth rules
  - [x] login
  - [ ] logout
  - [x] cookie based session management
  - [x] route based auth rules
  - [ ] extendable auth rules and type system
