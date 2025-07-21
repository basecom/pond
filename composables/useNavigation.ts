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

    // CUSTOM: instead of calling the apiClient directly, use the proxy route which can be cached when enabled in the nuxt.config.ts routeRules
    // initial placeholder - will be updated by loadNavigationElements
    const depthRef = ref(1);
    // useFetch needs to be at the top level, otherwise it breaks SSR/CSR payload data transfer and reactivity
    // an explicit key should be passed to ensure consistency between server and client, regardless of file structure or runtime context
    const { data, execute } = useFetch(`/api/proxy/navigation/${type}`, {
        // ideally, the key would also include the depth here, but no working way was found and the depthHandling of the navigationStore seems to work as expected
        // support for dynamic keys was added with nuxt v3.17.0 / v4.0.0
        key: `proxy-navigation-${type}`,
        method: 'POST',
        // the body needs to be wrapped in computed to detect changes to the depthRef
        body: computed(() => ({
            headers: {
                'sw-include-seo-urls': true,
            },
            endpoint: 'readNavigation post /navigation/{activeId}/{rootId}',
            pathParams: {
                activeId: type,
                rootId: type,
            },
            depth: depthRef.value,
        })),
        immediate: false,
    });

    async function loadNavigationElements({ depth }: { depth: number }) {
        depthRef.value = depth;

        try {
            await execute();

            sharedElements.value = data.value || [];
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
