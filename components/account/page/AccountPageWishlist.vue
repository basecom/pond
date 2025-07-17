<script setup lang="ts">
const {
    items,
    getWishlistProducts,
    currentPage,
    totalPagesCount,
} = useWishlist();
const { getProductsById } = usePondProduct();
const route = useRoute();
const router = useRouter();
const { handleError } = usePondHandleError();

const isLoading = ref(true);
const wishlistProducts = ref(undefined);
const defaultLimit = ref(15);
const defaultPage = ref(1);

onMounted(async () => {
    // Define query so that limit is adjustable in the Pond component
    const page = (route.query.page ?? defaultPage.value) as number;
    await fetchWishlistData(page);
});

const changePage = async (page: number) => {
    await fetchWishlistData(page);
};

const fetchWishlistData = async (page: number) => {
    isLoading.value = true;

    try {
        await router.push({
            query: {
                page,
                limit: defaultLimit.value,
            },
        });
        await getWishlistProducts(route.query);

        const { data } = await getProductsById(items.value);

        if (data.value) {
            wishlistProducts.value = data.value.elements;
        }
    } catch (error) {
        handleError(error);
    } finally {
        isLoading.value = false;
    }
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
