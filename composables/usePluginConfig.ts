export function usePluginConfig() {
    // useFetch needs to be at the top level, otherwise it breaks SSR/CSR payload data transfer and reactivity
    // an explicit key should be passed to ensure consistency between server and client, regardless of file structure or runtime context
    const { data, status, error, execute } = useFetch('/api/proxy/config', {
        key: 'proxy-pond-config',
        method: 'POST',
        body: {
            endpoint: 'loadConfig get /pond/config',
        },
        immediate: false,
    });

    return {
        data,
        status,
        error,
        execute,
    };
}
