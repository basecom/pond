<script setup lang="ts">

const {
  items,
  clearWishlist,
  getWishlistProducts,
  currentPage,
  totalPagesCount,
  canSyncWishlist,
} = useWishlist();

const isLoading = ref(true);

onMounted(async () => {
  await getWishlistProducts();
  isLoading.value = false;

  console.log('produ', items);
})

</script>


<template>
  <AccountPageWishlistInner :isLoading="isLoading" :items="items" />
</template>