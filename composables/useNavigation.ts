// extends the useNavigation composable from the '@shopware-pwa/composables-next' package

import type { Schemas } from '@shopware/api-client/api-types';

/**
 *
 * Provides state for navigation trees depending on navigation type.
 */
export type UseNavigationReturn = {
    /**
     * List of navigation elements
     */
    navigationElements: ComputedRef<Schemas['NavigationRouteResponse'] | null>;
    /**
     * Load navigation elements
     */
    loadNavigationElements(params: {
        depth: number;
    }): Promise<Schemas['NavigationRouteResponse']>;
};

/**
 * Composable for navigation.
 * Provides state for navigation trees depending on navigation type.
 *
 * @example
 * ```
 * // get main navigation
 * useNavigation()
 * // get footer navigation
 * useNavigation({ type: "footer-navigation" } )
 * ```
 * @public
 * @category Navigation & Routing
 */
export function useNavigation(params?: {
    type?: Schemas['NavigationType'] | string;
}): UseNavigationReturn {
    const type = params?.type || 'main-navigation';

    const sharedElements: Ref<Schemas['NavigationRouteResponse']> = inject(
        `swNavigation-${type}`,
        ref([]),
    );
    provide(`swNavigation-${type}`, sharedElements);

    const navigationElements = computed(() => sharedElements.value);

    async function loadNavigationElements({ depth }: { depth: number }) {
        try {
            // CUSTOM: instead of calling the apiClient directly, use the proxy route which can be cached
            const navigationResponse = await useFetch(`/api/proxy/navigation/${type}`, {
                method: 'POST',
                body: {
                    headers: {
                        'sw-include-seo-urls': true,
                    },
                    endpoint: 'readNavigation post /navigation/{activeId}/{rootId}',
                    pathParams: {
                        activeId: type,
                        rootId: type,
                    },
                    depth,
                },
            });

            sharedElements.value = navigationResponse.data.value || [];
            return sharedElements.value;
        } catch (e) {
            sharedElements.value = [];
            console.error('[useNavigation][loadNavigationElements]', e);
            return [];
        }
    }

    return {
        navigationElements,
        loadNavigationElements,
    };
}
