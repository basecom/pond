import { rootClasses } from './formkit.theme';
import { de } from '@formkit/i18n';
import { createAutoAnimatePlugin, createFloatingLabelsPlugin } from '@formkit/addons';
import '@formkit/addons/css/floatingLabels';

export const defaultPlugins = {
    autoAnimate: createAutoAnimatePlugin(
        {
            duration: 250,
            easing: 'ease-in-out',
        },
        {
            global: ['outer', 'inner'],
            form: ['form'],
            repeater: ['items'],
        },
    ),
    floatingLabels: createFloatingLabelsPlugin({
        useAsDefault: true,
    }),
};

// Dynamically load SVG icons from /assets/icons as raw strings
const iconsImport = import.meta.glob('/assets/icons/**/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
});

// Map the icons to a new object with correctly formatted icon names as keys
const iconsFormatted = Object.keys(iconsImport).reduce((icons, key) => {
    const iconName = key.replace('/assets/icons/', '').replace('.svg', '');

    icons[iconName] = iconsImport[key];

    return icons;
}, {} as Record<string, unknown>);

export default {
    icons: iconsFormatted,
    iconLoaderUrl: (iconName: string) =>
        `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/${iconName}.svg`,
    locales: { de },
    config: {
        rootClasses,
    },
    plugins: Object.values(defaultPlugins),
    props: {
        decoratorIcon: 'check',
    },
};
