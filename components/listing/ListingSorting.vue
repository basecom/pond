<script setup lang="ts">
import type { operations } from '@shopware/api-client/api-types';
import type { SelectItems } from '~/types/vueForm/Form';

const {
    changeCurrentSortingOrder,
    getCurrentSortingOrder,
    getSortingOrders,
} = useCategoryListing();
const route = useRoute();
const router = useRouter();

const selectSortingItems: Ref<undefined | SelectItems> = ref(undefined);

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
    <ListingSortingInner
        :sorting-items="selectSortingItems"
        :initial-value="getCurrentSortingOrder"
        @on-change="(value: string) => currentSortingOrder = value"
    />
</template>
