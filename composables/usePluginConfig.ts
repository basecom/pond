import type { PluginConfiguration } from '~/types/PluginConfiguration';

export function usePluginConfig() {
    const { sessionContext } = useSessionContext();
    const salesChannelId = computed(() => sessionContext.value?.salesChannel?.id);

    const key = computed(() => `proxy-config-${salesChannelId.value}`);

    const {
        data: config,
        pending,
        error,
        execute: fetchConfig,
    } = useAsyncData<PluginConfiguration | null>(
        key,
        async () => await $fetch<PluginConfiguration>('/api/proxy/config', {
            method: 'GET',
            query: {
                salesChannel: salesChannelId.value,
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
