import config from '#pond-config';

// helper types for type generation
type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}.${P}`
        : never
    : never;

type Paths<T> = T extends string
    ? never
    : {
        [K in keyof T]: T[K] extends string
            ? K
            : K | Join<K, Paths<T[K]>>;
    }[keyof T];

// all defined styles
type StylePaths = Paths<typeof config.styles> | (string & {});

export const usePondStyle = () => {
    const { handleError } = usePondHandleError();

    const getStyle = (path: StylePaths): string => {
        const keys = path.split('.');
        let current: unknown = config.styles;

        for (const key of keys) {
            if (typeof current === 'object' && current && key in current) {
                current = (current as Record<string, unknown>)[key];
            } else {
                handleError(`[Pond][getStyle] '${path}' could not be loaded`, false);
                return '';
            }
        }

        return typeof current === 'string' ? current : '';
    };

    return {
        getStyle,
    };
};
