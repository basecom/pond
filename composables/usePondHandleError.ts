import { ApiClientError } from '@shopware/api-client';

export function usePondHandleError() {
    const handleError = (error: unknown | string, showAsError: boolean = true) => {
        if (process.env.NODE_ENV !== 'development') return;

        const prefix = `[Pond][${extractFileNameFromStack()}]`;

        if (typeof error === 'string') {
            showError(`${prefix}: ${error}`, showAsError);
            return;
        }

        if (error instanceof ApiClientError) {
            showError(error.details, showAsError);
            return;
        }

        showError(showAsError);
    };

    const showError = (errorMessage: unknown | string, showAsError: boolean = true) => {
        if (showAsError) {
            console.error(errorMessage);
        } else {
            console.warn(errorMessage);
        }
    };

    const extractFileNameFromStack = (): string => {
        const stack = new Error().stack;
        if (!stack) return 'UnknownFile';

        const lines = stack.split('\n');

        // search for the first line which is not usePondHandleError
        const externalLine = lines.find(line =>
            !line.includes('usePondHandleError') && /\/([^/]+)\.(ts|js|vue)/.test(line),
        );

        const match = externalLine?.match(/\/([^/]+)\.(ts|js|vue)/);
        return match?.[1] ?? 'UnknownFile';
    };

    return { handleError };
}
