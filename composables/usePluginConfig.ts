export function usePluginConfig() {
    const fetchConfig = async () => await useFetch('/api/proxy/config', {
        method: 'POST',
        body: {
            endpoint: 'loadConfig get /pond/config',
        },
    });

    return {
        fetchConfig,
    };
}
