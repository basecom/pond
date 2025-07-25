import type { PluginConfiguration } from '~/types/PluginConfiguration';

interface ConfigState {
    [salesChannelId: string]: PluginConfiguration | null;
}

export const useConfigStore = defineStore('config', () => {
    const { fetchConfig } = usePluginConfig();
    const { handleError } = useHandleError();
    const { sessionContext } = useSessionContext();

    const currentSalesChannelId = computed(() => sessionContext.value?.salesChannel?.id);
    const configState = ref<ConfigState>({});

    const loadConfig = async () => {
        if (!currentSalesChannelId.value) {
            console.warn('[ConfigStore] Attempted to load config before session context was available.');
            return;
        }

        if (configState.value[currentSalesChannelId.value]) {
            return;
        }

        const { data, error } = await fetchConfig();

        if (error.value && !data.value) {
            handleError('[Pond]: Failed to load config values', false);
        }

        if (data.value && currentSalesChannelId.value) {
            configState.value[currentSalesChannelId.value] = data.value as PluginConfiguration | null;
        }
    };

    const configValues = computed(() => {
        if (!currentSalesChannelId.value) return null;
        return configState.value[currentSalesChannelId.value] ?? null;
    });

    const get = (key: string) => {
        const currentConfig = configValues.value;

        if (!currentConfig) {
            handleError('[Pond]: config values not loaded for the current sales channel', false);
            return undefined;
        }

        if (!(key in currentConfig)) {
            handleError(`[Pond]: The configuration for '${key}' was not found`, false);
            return undefined;
        }

        return currentConfig[key];
    };

    return {
        configState,
        configValues,
        get,
        loadConfig,
    };
});
