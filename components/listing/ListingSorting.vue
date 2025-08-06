<script setup lang="ts">
import type { operations } from '@shopware/api-client/api-types';
import type { SelectItems } from '~/types/vueForm/Form';

const {
    changeCurrentSortingOrder,
    getCurrentSortingOrder,
    getSortingOrders,
    loading,
} = useCategoryListing();
const route = useRoute();
const router = useRouter();
const { handleError } = usePondHandleError();
const { t } = useI18n();
const { toast } = usePondToast();

const selectSortingItems: Ref<undefined | SelectItems> = ref(undefined);

onMounted(async () => {
    if(getSortingOrders.value && getSortingOrders.value.length > 0) {
        selectSortingItems.value = getSortingOrders.value?.map(item => ({
            value: item.key,
            label: item.translated.label,
        }));
    }
});

const currentSortingOrder = computed({
    get: (): string => getCurrentSortingOrder.value || '',
    set: async (order: string): Promise<void> => {
        try {
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
        } catch(error) {
            toast({
                title: t('general.errorHeadline'),
                description: t('general.errorMessage'),
                variant: 'destructive',
            });
            handleError(error);
        }
    },
});
</script>

<template>
    <ListingSortingInner
        :is-loading="loading"
        :sorting-items="selectSortingItems"
        :initial-value="getCurrentSortingOrder"
        @on-change="(value: string) => currentSortingOrder = value"
    />
</template>
