// extends the useNavigation composable from the '@shopware/composables' package

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
};

/**
 * Composable for navigation.
 * Provides state for navigation trees depending on navigation type.
 *
 * @public
 * @category Navigation & Routing
 */
export function useNavigation(params: {
    type: Schemas['NavigationType'] | string;
    depth: number;
}): UseNavigationReturn {
    const { type, depth: initialDepth } = params;
    const depthRef = ref(initialDepth);

    const sharedElements: Ref<Schemas['NavigationRouteResponse']> = inject(
        `swNavigation-${type}-${initialDepth}`,
        ref([]),
    );
    provide(`swNavigation-${type}-${initialDepth}`, sharedElements);

    const navigationElements = computed(() => sharedElements.value);

    // CUSTOM: instead of calling the apiClient directly, use the proxy route which can be cached when enabled in the nuxt.config.ts routeRules
    // useFetch needs to be at the top level, otherwise it breaks SSR/CSR payload data transfer and reactivity
    // an explicit key should be passed to ensure consistency between server and client, regardless of file structure or runtime context
    useFetch(`/api/proxy/navigation/${type}-${depthRef.value}`, {
        key: computed(() => `proxy-navigation-${type}-${depthRef.value}`),
        method: 'POST',
        body: computed(() => ({
            headers: { 'sw-include-seo-urls': true },
            endpoint: 'readNavigation post /navigation/{activeId}/{rootId}',
            pathParams: { activeId: type, rootId: type },
            depth: depthRef.value,
        })),
        onResponse: ({ response }) => {
            sharedElements.value = response._data || [];
        },
    });

    return {
        navigationElements,
    };
}
