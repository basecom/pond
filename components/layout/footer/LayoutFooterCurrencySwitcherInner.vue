<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AcceptableValue } from 'reka-ui';

const { currency, setCurrency } = useSessionContext();
const { getAvailableCurrencies } = usePondSalesChannel();
const { getStyle } = usePondStyle();
const { handleError } = usePondHandleError();

const availableCurrencies: Ref<undefined | Schemas['Currency'][]> = ref(undefined);
const selectedCurrencyId: Ref<undefined | AcceptableValue> = ref(undefined);

const showLayoutPageLoader: Ref<boolean> | undefined = inject('showLayoutPageLoader');

onMounted(() => {
    selectedCurrencyId.value = currency.value.id;
});

const { data } = await getAvailableCurrencies();
if (data.value) {
    // Remove fetchedAt & server, which is returned due to async fetch
    const { fetchedAt, server, ...currencies } = data.value;
    availableCurrencies.value = currencies;
}

const onUpdate = async (selectedId: AcceptableValue) => {
    const arrayOfAvailableCurrencies = availableCurrencies.value ? Object.values(availableCurrencies.value) : [];
    const currency = arrayOfAvailableCurrencies.find(availableCurrency => availableCurrency.id === selectedId);
    if (currency) {
        try {
            if(showLayoutPageLoader) {
                showLayoutPageLoader.value = true;
            }
            await setCurrency(currency);
            selectedCurrencyId.value = selectedId;
            // Reload is necessary, so all price values are correct
            window.location.reload();
        } catch {
            handleError('Currency switch failed');
        }
    }
};
</script>

<template>
    <UiSelect :model-value="selectedCurrencyId" @update:model-value="onUpdate">
        <slot name="currency-switcher-trigger">
            <UiSelectTrigger
                id="currency-switch"
                :class="getStyle('footer.currencySwitcherComponent.trigger')"
                aria-label="currency-switch"
            >
                <UiSelectValue />
            </UiSelectTrigger>
        </slot>

        <slot name="currency-switcher-content">
            <template v-if="availableCurrencies">
                <UiSelectContent>
                    <UiSelectGroup>
                        <UiSelectItem
                            v-for="availableCurrency in availableCurrencies"
                            :key="availableCurrency.id"
                            :value="availableCurrency.id"
                            :class="getStyle('footer.currencySwitcherComponent.item')"
                        >
                            {{ availableCurrency.symbol }}
                            {{ availableCurrency.shortName }}
                        </UiSelectItem>
                    </UiSelectGroup>
                </UiSelectContent>
            </template>
        </slot>
    </UiSelect>
</template>
