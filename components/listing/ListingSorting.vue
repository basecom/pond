<script setup lang="ts">

const {
  changeCurrentSortingOrder,
  getCurrentSortingOrder,
  getSortingOrders,
} = useCategoryListing();

// TODO: Outsource type and replace in the whole project -> e.g. salutations
const selectSortingItems: Ref<undefined | { value: string; label: string; }[]> = ref(undefined);
const isFormAvailable = ref(false);

onMounted(async () => {
  selectSortingItems.value = getSortingOrders.value?.map(item => ({
    value: item.key,
    label: item.translated.label,
  }));

  console.log('sele', selectSortingItems.value);
});
</script>
<template>
  <ClientOnly>
    <Vueform
        :endpoint="false"
        @mounted="() => isFormAvailable = true"
    >
      <UiSelectElement
          id="listing-sorting"
          name="listing-sorting"
          :placeholder="$t('account.customer.salutation.placeholder')"
          :items="selectSortingItems"
          :default-value="getCurrentSortingOrder"
      />
    </Vueform>
  </ClientOnly>
  <UiSkeleton v-if="!isFormAvailable" class="w-full h-10" />
</template>
