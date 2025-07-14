import { ApiClientError } from '@shopware/api-client';
import {toast} from '../components/ui/toast';

export function usePondHandleError() {
    const { $i18n } = useNuxtApp();
    const t = $i18n.t;
    const handleError = (error: unknown | string, showAsError: boolean = true, toastMessage:
        { show?: boolean, title?: string, description?: string } = {show: false, description: undefined, title: ''}) => {

        if (error instanceof ApiClientError) {
            showToastError(toastMessage, error.details.errors[0]?.code);
            showError(error.details, showAsError);
            return;
        }

        showToastError(toastMessage);
        showError(error, showAsError);
    };

    const showError = (errorMessage: unknown | string, showAsError: boolean = true) => {
        if (process.env.NODE_ENV !== 'development') return;
        if (showAsError) {
            console.error(errorMessage);
            return;
        }

        console.warn(errorMessage);
    };

    const showToastError = (toastMessage: {
        show?: boolean, title?: string, description?: string } = {},
    code: string = '') => {

        const mergedToastMessage = {
            show: false,
            title: 'error.generalHeadline',
            description: undefined,
            ...toastMessage,
        };

        if(!mergedToastMessage.show) {
            return;
        }

        const description = mergedToastMessage.description ?? code ?? 'DEFAULT';

        toast({
            title: t(mergedToastMessage.title || ''),
            description: t(`error.${description}`),
            variant: 'destructive',
        });
    };

    return { handleError };
}
