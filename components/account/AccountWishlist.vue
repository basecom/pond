<script setup lang="ts">
const { apiClient } = useShopwareContext();
const { handleError } = usePondHandleError();
const { getWishlistProducts: refreshWishlistItemIds, items: wishlistItemIds } = useWishlist();

const loading = ref(true);
const wishlistProducts = ref([]);

loading.value = true;
await refreshWishlistItemIds();
const cacheKey = ref(`wishlistProducts:${wishlistItemIds.value.sort().join(',')}`);
try {
    const { data } = await usePondCacheAsyncData(
        cacheKey.value,
        async () => await apiClient.invoke('readProduct post /product', {
            body: {
                ids: wishlistItemIds.value,
            },
        }),
        {
            validTimeSeconds: 300,
            debug: true,
        },
    );
    wishlistProducts.value = data.value.data?.elements;
} catch (error) {
    handleError(error);
    wishlistProducts.value = [];
}

loading.value = false;

</script>

<template>
    <AccountWishlistInner :wishlist-items="wishlistProducts" :is-loading="loading" />
</template>
