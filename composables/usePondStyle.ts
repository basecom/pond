import config from '#pond-config';

export const usePondStyle = () => {
    const { handleError } = usePondHandleError();

    const getStyle = (path: string): string => {
        const keys = path.split('.');
        let currentStyle: any = config.styles;

        for (const key of keys) {
            if (currentStyle && key in currentStyle) {
                currentStyle = currentStyle[key];
                continue;
            }

            handleError(`[Pond][getStyle] '${path}' could not be loaded`, false);
            return '';
        }

        return currentStyle;
    };

    return {
        getStyle,
    };
};
