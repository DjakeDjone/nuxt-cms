# Changelog

## v0.1.6

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.1.5...v0.1.6)

### 🚀 Enhancements

- Opt. performance of kv of auth by using usernames as keys ([f290a04](https://github.com/DjakeDjone/nuxt-cms/commit/f290a04))
- Implement styled mode for editable content with theme toggle functionality ([b9d5fc1](https://github.com/DjakeDjone/nuxt-cms/commit/b9d5fc1))

### 💅 Refactors

- Unify main class styling across admin and index pages style: update dark mode colors and enhance page styling in CSS fix: remove background color from Tiptap Nav component for consistency style: use CSS variable for background color in Ui Options component ([6de2787](https://github.com/DjakeDjone/nuxt-cms/commit/6de2787))
- Add defineOptions for UiStyle component ([661e4b3](https://github.com/DjakeDjone/nuxt-cms/commit/661e4b3))

### 🏡 Chore

- **release:** V0.1.5 ([4aeea0f](https://github.com/DjakeDjone/nuxt-cms/commit/4aeea0f))

### ❤️ Contributors

- DjakeDjone ([@the-eater](https://github.com/the-eater))

## v0.1.5

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.1.4...v0.1.5)

### 🚀 Enhancements

- Refine authentication handling and improve user session management ([aa4f1c0](https://github.com/DjakeDjone/nuxt-cms/commit/aa4f1c0))
- Implement notification system with success and error handling ([1779341](https://github.com/DjakeDjone/nuxt-cms/commit/1779341))
- Update notification positioning and add success message on save ([6c76af9](https://github.com/DjakeDjone/nuxt-cms/commit/6c76af9))
- Hold time ([fb68c33](https://github.com/DjakeDjone/nuxt-cms/commit/fb68c33))
- Styled close btn ([6257122](https://github.com/DjakeDjone/nuxt-cms/commit/6257122))
- Enhance notification component with console logging and improved UI structure ([f055dde](https://github.com/DjakeDjone/nuxt-cms/commit/f055dde))

### 💅 Refactors

- Remove unused emit definition in Notification components ([cd9cbea](https://github.com/DjakeDjone/nuxt-cms/commit/cd9cbea))
- Clean up unused imports and improve notification component logic ([41ce44b](https://github.com/DjakeDjone/nuxt-cms/commit/41ce44b))
- Removed unused imports ([bb35ce4](https://github.com/DjakeDjone/nuxt-cms/commit/bb35ce4))

### 📖 Documentation

- Update README to indicate development status of Nuxt data manager ([a40481f](https://github.com/DjakeDjone/nuxt-cms/commit/a40481f))
- Notification service todo ([9d157aa](https://github.com/DjakeDjone/nuxt-cms/commit/9d157aa))

### 🏡 Chore

- **release:** V0.1.4 ([c07ce42](https://github.com/DjakeDjone/nuxt-cms/commit/c07ce42))

### ❤️ Contributors

- DjakeDjone <benjamin.friedl@htlstp.at>

## v0.1.4

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.1.3...v0.1.4)

### 🚀 Enhancements

- Implement authentication module with login endpoint and user session management ([95d58fe](https://github.com/DjakeDjone/nuxt-cms/commit/95d58fe))
- Add login functionality with user authentication and session management ([22eb520](https://github.com/DjakeDjone/nuxt-cms/commit/22eb520))
- Implement authentication module with user management and protected routes ([c93544b](https://github.com/DjakeDjone/nuxt-cms/commit/c93544b))
- Add user retrieval endpoint and improve initialization logic for auth users ([c91383e](https://github.com/DjakeDjone/nuxt-cms/commit/c91383e))
- Login ([1700fc0](https://github.com/DjakeDjone/nuxt-cms/commit/1700fc0))
- Login user + auth user/validate role on accessing pages ([36889e5](https://github.com/DjakeDjone/nuxt-cms/commit/36889e5))
- Enhance authentication rules with flexible route handling ([aff7e7f](https://github.com/DjakeDjone/nuxt-cms/commit/aff7e7f))

### 💅 Refactors

- Improve code formatting and consistency in authentication and storage modules ([2b4d583](https://github.com/DjakeDjone/nuxt-cms/commit/2b4d583))

### 📖 Documentation

- Updated todos ([08ac205](https://github.com/DjakeDjone/nuxt-cms/commit/08ac205))

### ❤️ Contributors

- DjakeDjone <benjamin.friedl@htlstp.at>

## v0.1.3

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.1.2...v0.1.3)

### 🚀 Enhancements

- Enhance Tiptap editor with navigation options and improved button components; add animations and structure for better usability ([5f945d7](https://github.com/DjakeDjone/nuxt-cms/commit/5f945d7))
- Add @nuxt/icon dependency; implement UiSwitch and UiTooltip components for enhanced UI interactions ([87a6f3e](https://github.com/DjakeDjone/nuxt-cms/commit/87a6f3e))
- Add text alignment support in Tiptap editor; implement UiSwitchCrossed component for enhanced UI interactions ([5f529e6](https://github.com/DjakeDjone/nuxt-cms/commit/5f529e6))

### 🩹 Fixes

- DefineOptions name of new components ([278c281](https://github.com/DjakeDjone/nuxt-cms/commit/278c281))

### 🏡 Chore

- Auto-format code before push ([b5cf51a](https://github.com/DjakeDjone/nuxt-cms/commit/b5cf51a))
- Auto-format code before push ([da2e2df](https://github.com/DjakeDjone/nuxt-cms/commit/da2e2df))
- Auto-format code before push ([2d32e4b](https://github.com/DjakeDjone/nuxt-cms/commit/2d32e4b))

### ❤️ Contributors

- DjakeDjone <benjamin.friedl@htlstp.at>

## v0.1.2

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- Remove unused login, auth, and session files ([b7de5e2](https://github.com/DjakeDjone/nuxt-cms/commit/b7de5e2))
- Add Tiptap extensions for underline and bubble menu; enhance editor functionality and UI components ([3e33c0c](https://github.com/DjakeDjone/nuxt-cms/commit/3e33c0c))
- Enhance pre-push hook to auto-commit formatting changes; ([2254817](https://github.com/DjakeDjone/nuxt-cms/commit/2254817))
- Add component names to TiptapNav and UiBtn; improve code clarity ([f61b81b](https://github.com/DjakeDjone/nuxt-cms/commit/f61b81b))

### 🩹 Fixes

- Update release script to correctly pass lint options; refactor MyMenu and SaveBtn components for improved readability ([0ca6952](https://github.com/DjakeDjone/nuxt-cms/commit/0ca6952))

### 🏡 Chore

- Auto-format code before push ([658d791](https://github.com/DjakeDjone/nuxt-cms/commit/658d791))

### ❤️ Contributors

- DjakeDjone <benjamin.friedl@htlstp.at>

## v0.1.1

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.0.20...v0.1.1)

### 🚀 Enhancements

- Titpat editor, unstyled without action buttons ([b3d81ad](https://github.com/DjakeDjone/nuxt-cms/commit/b3d81ad))
- Add TiptapEditorWrapper component ([41f1646](https://github.com/DjakeDjone/nuxt-cms/commit/41f1646))
- Update version to 0.1.0 and improve release script; refactor various components for consistency ([8f78117](https://github.com/DjakeDjone/nuxt-cms/commit/8f78117))
- Add pre-push hook for automatic code formatting; update package.json scripts and improve component structure ([229c170](https://github.com/DjakeDjone/nuxt-cms/commit/229c170))

### 💅 Refactors

- Update README for clarity and add TODO section; remove commented-out instructions from storage.ts ([8710331](https://github.com/DjakeDjone/nuxt-cms/commit/8710331))

### ❤️ Contributors

- DjakeDjone <benjamin.friedl@htlstp.at>

## v0.0.20

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v1.1.0...v0.0.20)

### 💅 Refactors

- Update README for clarity and module name change ([801e64e](https://github.com/DjakeDjone/nuxt-cms/commit/801e64e))

### 🏡 Chore

- **release:** V0.0.2 ([e8f97a9](https://github.com/DjakeDjone/nuxt-cms/commit/e8f97a9))
- **release:** V0.0.17 ([661a958](https://github.com/DjakeDjone/nuxt-cms/commit/661a958))
- **release:** V0.0.19 ([aeb894c](https://github.com/DjakeDjone/nuxt-cms/commit/aeb894c))
- Update version in CHANGELOG from v1.1.0 to v0.1.19 ([761f888](https://github.com/DjakeDjone/nuxt-cms/commit/761f888))

### ❤️ Contributors

- DjakeDjone <benjamin.friedl@htlstp.at>

## v0.0.19

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.0.17...v0.0.19)

## v0.0.17

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v0.0.2...v0.0.17)

## v0.0.2

[compare changes](https://github.com/DjakeDjone/nuxt-cms/compare/v1.1.0...v0.0.2)

## v0.1.19

### 🚀 Enhancements

- Init ([d6d6f50](https://github.com/your-org/my-module/commit/d6d6f50))
- Add editable content module with storage functionality ([cd82ad7](https://github.com/your-org/my-module/commit/cd82ad7))
- Content editing works! ([fec8225](https://github.com/your-org/my-module/commit/fec8225))
- Refactor editable content components and add admin page ([f174544](https://github.com/your-org/my-module/commit/f174544))
- Enhance editable content functionality with save handler and UI improvements ([71ad2d3](https://github.com/your-org/my-module/commit/71ad2d3))
- Refactor editable content components and add save button with event handling ([06e1f36](https://github.com/your-org/my-module/commit/06e1f36))
- Improve editable content components with code cleanup and formatting adjustments ([bb52866](https://github.com/your-org/my-module/commit/bb52866))

### ❤️ Contributors

- DjakeDjone <benjamin.friedl@htlstp.at>
