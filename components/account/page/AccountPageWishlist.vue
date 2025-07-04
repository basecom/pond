<script setup lang="ts">

const {
    items,
    getWishlistProducts,
} = useWishlist();

const isLoading = ref(true);

onMounted(async () => {
    await getWishlistProducts();
    isLoading.value = false;

    // ToDo: Load products by id from items: string[]
});

</script>


<template>
    <AccountPageWishlistInner :is-loading="isLoading" />
</template>
