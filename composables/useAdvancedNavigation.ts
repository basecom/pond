export const useAdvancedNavigation = (type: string, depth: number) => {
    const navigationStore = useNavigationStore();

    const loadNavigation = async () => {
        // context needs to be fetched and awaited before (e.g.: in app.vue) or else it will be undefined here
        const { sessionContext } = useSessionContext();
        const salesChannelId = sessionContext.value?.salesChannel?.id;

        const existingData = navigationStore.getNavigation(salesChannelId, type, depth);
        if (existingData) {
            return ref(existingData);
        }

        const { data, error } = useFetch(`/api/proxy/navigation/${type}`, {
            key: computed(() => `proxy-${salesChannelId}-${type}-${depth}`),
            method: 'POST',
            body: {
                headers: { 'sw-include-seo-urls': true },
                endpoint: 'readNavigation post /navigation/{activeId}/{rootId}',
                pathParams: { activeId: type, rootId: type },
                depth,
            },
        });

        if (error.value) {
            console.error('Failed to fetch navigation:', import.meta.dev ? error.value : '');
            return ref(null);
        }

        if (data.value) {
            navigationStore.setNavigation(salesChannelId, type, depth, data.value);
        }

        return data;
    };

    return {
        loadNavigation,
    };
};
