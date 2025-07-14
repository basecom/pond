# Shadcn

At Pond, we use components from [shadcn](https://www.shadcn-vue.com/docs/introduction.html). To maintain consistent code across the project, we customize new Shadcn components.

## 1. Variable Customization

After installing the component, we remove all `dark:` variables and replace `zinc` with `gray`.

## 2. File Naming Customization

To enable auto-import, all components are prefixed with `Ui`.

## 3. Style Extraction

All styles within the components (including those in `index.ts`, if present) are extracted into `styles/ui`. Make sure the styles in the file are ordered alphabetically and use descriptive names. You can use the defined styles with [usePondStyle](pond-style).
