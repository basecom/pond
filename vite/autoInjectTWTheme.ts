import type { Plugin } from 'vite';

/**
 * This plugin is used to inject the Tailwind theme import at the beginning of the CSS
 * scoped slots in Vue. Since Tailwind V4 it is required to reference the theme in the CSS.
 * @see https://tailwindcss.com/docs/functions-and-directives#reference-directive
 */
export function autoInjectTWTheme() {
    return {
        name: 'auto-inject-tw-theme',
        transform(src, id) {
            // Check if this is a Vue style block being processed separately
            if (id.includes('.vue') && id.includes('?vue&type=style')) {
                // Inject the Tailwind theme import at the beginning of the CSS
                const injectedImport = '@reference \'~/assets/css/main.css\';\n';

                return { 
                    code: injectedImport + src, 
                    map: null, 
                };
            }
        },
        // Make sure this plugin runs before the tailwindcss plugin
        enforce: 'pre',
    } satisfies Plugin;
}
