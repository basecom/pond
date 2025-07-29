export const useAdvancedNavigation = (type: string, depth: number) => {
    const navigationStore = useNavigationStore();
    const { sessionContext } = useSessionContext();
    const salesChannelId = computed(() => sessionContext.value?.salesChannel?.id);

    // create a reactive key that depends on the sales channel.
    const key = computed(() => `proxy-navigation-${salesChannelId.value}-${type}-${depth}`);

    const {
        data: navigation,
        pending,
        error,
        execute: loadNavigation,
    } = useAsyncData(
        key,
        async () => {
            // check pinia store for matching data
            const existingData = navigationStore.getNavigation(salesChannelId.value, type, depth);
            if (existingData) {
                return existingData;
            }

            // if not cached, fetch from the API using $fetch
            const fetchedData = await $fetch(`/api/proxy/navigation/${type}`, {
                method: 'POST',
                body: {
                    headers: { 'sw-include-seo-urls': true },
                    endpoint: 'readNavigation post /navigation/{activeId}/{rootId}',
                    pathParams: { activeId: type, rootId: type },
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
