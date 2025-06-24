<script setup lang="ts">
const { loadOrders, orders, changeCurrentPage, totalPages,
    currentPage } = useCustomerOrders();
const route = useRoute();
const router = useRouter();
const isLoading = ref(true);

onMounted(async () => {
    await loadOrders({
        associations: {
            stateMachineState: {},
        },
        sort: [
            {
                field: 'createdAt',
                order: 'DESC',
            },
        ],
    });
    isLoading.value = false;
});

const changePage = async (page: number) => {
    await router.push({
        query: {
            ...route.query,
            p: page,
        },
    });
    await changeCurrentPage(page);
};
</script>

<template>
    <AccountPageOrderInner
        v-if="orders"
        :total-pages="totalPages"
        :current-page="currentPage"
        :orders="orders"
        :is-loading="isLoading"
        @change-page="(page: number) => changePage(page)"
    />
</template>
