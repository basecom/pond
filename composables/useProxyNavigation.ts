import type { Schemas } from '@shopware/api-client/api-types';

const pendingRequests = new Map<string, Promise<Schemas['NavigationRouteResponse']>>();

export const useProxyNavigation = (type: string, depth: number) => {
    const navigationStore = useNavigationStore();
    const { sessionContext } = useSessionContext();
    const salesChannelId = computed(() => sessionContext.value?.salesChannel?.id);

    const key = computed(() => `proxy-navigation-${salesChannelId.value}-${type}-${depth}`);

    const {
        data: navigation,
        pending,
        error,
        execute: loadNavigation,
    } = useAsyncData(
        key,
        async () => {
            // check if a request for this exact key is already in-flight.
            if (pendingRequests.has(key.value)) {
                return pendingRequests.get(key.value);
            }

            const navigationPromise = (async () => {
                // check pinia store for matching data
                const existingData = navigationStore.getNavigation(salesChannelId.value, type, depth);
                if (existingData) {
                    return existingData;
                }

                // if not cached, fetch from the API
                const fetchedData = await $fetch<Schemas['NavigationRouteResponse']>(`/api/proxy/navigation/${type}`, {
                    method: 'GET',
                    query: {
                        salesChannel: salesChannelId.value,
                        endpoint: 'readNavigation post /navigation/{activeId}/{rootId}',
                        'pathParams[activeId]': type,
                        'pathParams[rootId]': type,
                        'headers[sw-include-seo-urls]': true,
                        depth,
                    },
                }).catch((error) => {
                    console.error('Failed to fetch navigation:', import.meta.dev ? error : '');

                    throw error;
                });

                // if data was fetched successfully, update the Pinia store
                if (fetchedData) {
                    navigationStore.setNavigation(salesChannelId.value, type, depth, fetchedData);
                }

                return fetchedData;
            })();

            // store the promise in a map to de-duplicate subsequent identical requests
            pendingRequests.set(key.value, navigationPromise);

            try {
                return await navigationPromise;
            } finally {
                // always remove request from the map so future calls can trigger a new fetch if needed
                pendingRequests.delete(key.value);
            }
        },
        {
            immediate: false,
            watch: [salesChannelId],
        },
    );

    return {
        navigation,
        pending,
        error,
        loadNavigation,
    };
};
