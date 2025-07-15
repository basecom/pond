# Pond Style

To avoid overwriting components just to change the styling of individual elements, we load styling configurations from `pond.config.ts`.

## Developing with Pond Style

Instead of applying styles directly within components, follow the steps below:

### 1. Find or create a suitable styling file

Add your styles to an existing file (e.g., header-related styles go in `styles/header.ts`) or create a new one if no suitable file exists. Try to use broad and reusable names for your style files to group related styles together.

### 2. Add your styles

Assume your `styles/header.ts` currently looks like this:

```ts
export default {
    logo: 'size-4',
};
```

To style the account icon, for example, you could extend it as follows:

```ts
export default {
    logo: 'size-4',
    account: 'bg-red-700',
};
```

### 3. Use the composable

To use the styling in a component, use the `usePondStyle` component with the key to your styling

```ts
const { getStyle } = usePondStyle();
const actionLinkStyle = getStyle('yourStyle.key');
</script>
```

## Using Your Styles in Projects
To apply your custom styles, create your own `pond.config.ts` file (if it doesn’t already exist). Assuming you want to customize the header, import the style file in your `pond.config.ts`:

```ts
import baseConfig from '@basecom-gmbh/pond/pond.config';
import header from './styles/header';

export default {
    styles: {
        ...baseConfig.styles,
        header,
    },
};
```

To ensure Nuxt loads your custom `pond.config.ts`, make sure the following alias is set in your `nuxt.config.ts`:

```ts
alias: {
    '#pond-config': fileURLToPath(new URL('./pond.config.ts', import.meta.url)),
}
```