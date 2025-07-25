export function usePluginConfig() {
    // context needs to be fetched and awaited before (e.g.: in app.vue) or else it will be undefined here
    const { sessionContext } = useSessionContext();

    const fetchConfig = async () => {
        const salesChannelId = sessionContext.value?.salesChannel?.id;

        if (!salesChannelId) {
            console.error('[usePluginConfig] Cannot fetch config: salesChannelId is missing.');
            return { data: ref(null), error: ref('Missing salesChannelId') };
        }

        return useFetch('/api/proxy/config', {
            key: `proxy-${salesChannelId}-config`,
            method: 'POST',
            body: {
                endpoint: 'loadConfig get /pond/config',
            },
        });
    };

    return {
        fetchConfig,
    };
}
