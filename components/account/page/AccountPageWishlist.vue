<script setup lang="ts">

const {
    items,
    getWishlistProducts,
} = useWishlist();
const { getCustomerWishlistProducts } = usePondWishlist();

const isLoading = ref(true);
const wishlistProducts = ref(undefined);

onMounted(async () => {
    await getWishlistProducts();
    isLoading.value = false;

    const result = await getCustomerWishlistProducts(items.value);
    if(result) {
      wishlistProducts.value = result;
    }
});

</script>


<template>
    <AccountPageWishlistInner :is-loading="isLoading" :products="wishlistProducts" />
</template>
