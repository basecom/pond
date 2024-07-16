import type { ResolvedApiError } from '~/types/errors';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { FormKitNode } from '@formkit/core';

export function useFormkitHelper() {
    /**
     *  This function formats EntityArrays to the structure of Array<{label: '', value: ''}>
     *  This is necessary/helpfully since this way we don't have to create select options manually and allows us to use
     *  the placeholder function from formkit
     */
    const entityArrayToOptions = <T extends { id: string }>(
        arr: T[],
        displayName: keyof T,
        sorted: boolean = false,
    ): { label: string; value: string }[] => {
        const mapped = arr.map(element => {
            return {
                label: getTranslatedProperty(element, displayName),
                value: element.id,
            };
        });

        if (!sorted) {
            return mapped;
        }

        return mapped.sort((a, b) => (a.label > b.label ? 1 : -1));
    };

    /**
     * Returns an array with alls error Codes for the given key. Combined with the key it can be used as a snippet key.
     */
    const errorOfField = (name: string, apiErrors: ResolvedApiError[]): string[] => {
        return apiErrors?.filter(err => err.key === name).map(err => `${err.key}_${err.code}`) ?? [];
    };

    const togglePasswordVisibility = (node: FormKitNode) => {
        node.props.suffixIcon = node.props.suffixIcon === 'lock' ? 'lock-open' : 'lock';
        node.props.type = node.props.type === 'password' ? 'text' : 'password';
    };

    return {
        entityArrayToOptions,
        errorOfField,
        togglePasswordVisibility,
    };
}
