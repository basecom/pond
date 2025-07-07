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
const wishlistProducts = ref(undefined)
const defaultLimit = ref(15);
const defaultPage = ref(1);

onMounted(async () => {
  // Define query so that limit is adjustable in the Pond component
    const query = {
        limit: defaultLimit.value,
        page: route.query.page ?? defaultPage.value,
    };
    await getWishlistProducts(query);

    // The function getWishlistProducts() updates items. Therefore, the products must be fetched from items using their IDs
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
