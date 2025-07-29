export function usePluginConfig() {
    const { sessionContext } = useSessionContext();
    const salesChannelId = computed(() => sessionContext.value?.salesChannel?.id);

    // create a reactive key that depends on the sales channel.
    const key = computed(() => `proxy-config-${salesChannelId.value}`);

    const {
        data: config,
        pending,
        error,
        execute: fetchConfig,
    } = useAsyncData(
        key,
        async () => await $fetch('/api/proxy/config', {
            method: 'POST',
            body: {
                endpoint: 'loadConfig get /pond/config',
            },
        }).catch((error) => {
            console.error('Failed to fetch plugin config:', import.meta.dev ? error : '');

            throw error;
        }),
        {
            immediate: false,
            watch: [salesChannelId],
        },
    );

    return {
        config,
        pending,
        error,
        fetchConfig,
    };
}
