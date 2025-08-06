<script setup lang="ts">
import type { operations } from '@shopware/api-client/api-types';
import type { SortingForm } from '~/types/vueForm/Sorting';
import type { SelectItems } from '~/types/vueForm/Form';

const {
    changeCurrentSortingOrder,
    getCurrentSortingOrder,
    getSortingOrders,
} = useCategoryListing();
const route = useRoute();
const router = useRouter();
const { getStyle } = usePondStyle();

const selectSortingItems: Ref<undefined | SelectItems> = ref(undefined);
const isFormAvailable = ref(false);

onMounted(async () => {
    selectSortingItems.value = getSortingOrders.value?.map(item => ({
        value: item.key,
        label: item.translated.label,
    }));
});

const currentSortingOrder = computed({
    get: (): string => getCurrentSortingOrder.value || '',
    set: async (order: string): Promise<void> => {
        await router.push({
            query: {
                ...route.query,
                order,
            },
        });

        await changeCurrentSortingOrder(order, {
            ...(route.query as unknown as operations['searchPage post /search']['body']),
            limit: route.query.limit ? Number(route.query.limit) : 15,
        });
    },
});
</script>

<template>
    <ClientOnly>
        <Vueform
            :endpoint="false"
            @mounted="() => isFormAvailable = true"
            @change="(value: SortingForm) => currentSortingOrder = value.order"
        >
            <UiSelectElement
                id="listing-sorting"
                name="order"
                :placeholder="$t('account.customer.salutation.placeholder')"
                :items="selectSortingItems"
                :default-value="getCurrentSortingOrder"
            />
        </Vueform>
    </ClientOnly>
    <UiSkeleton v-if="!isFormAvailable" :class="getStyle('listing.sorting.skeleton')" />
</template>
