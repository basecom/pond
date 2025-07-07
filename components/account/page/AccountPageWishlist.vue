<script setup lang="ts">

const {
    items,
    getWishlistProducts,
    currentPage,
    totalPagesCount,
} = useWishlist();
const { getCustomerWishlistProducts } = usePondWishlist();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const wishlistProducts = ref(undefined);
// Default limit is 15 -> useWishlist
const defaultLimit = ref(3);
const defaultPage = ref(1);

onMounted(async () => {
    const query = {
        limit: 3,
        page: route.query.page ?? defaultPage.value,
    };
    await getWishlistProducts(query);

    const result = await getCustomerWishlistProducts(items.value);
    if (result) {
        wishlistProducts.value = result;
    }
    isLoading.value = false;
});

const changePage = async (page: number) => {
    isLoading.value = true;
    await router.push({
        query: {
            page,
            limit: defaultLimit.value,
        },
    });
    await getWishlistProducts(route.query);

    const result = await getCustomerWishlistProducts(items.value);
    if (result) {
        wishlistProducts.value = result;
    }
    isLoading.value = false;
};
</script>


<template>
    <AccountPageWishlistInner
        :is-loading="isLoading"
        :products="wishlistProducts"
        :total-pages="totalPagesCount"
        :current-page="currentPage"
        @change-page="(page: number) => changePage(page)"
    />
</template>
