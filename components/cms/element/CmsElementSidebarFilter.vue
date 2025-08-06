<script setup lang="ts">
import type { CmsElementSidebarFilter } from '@shopware/composables';

defineProps<{
  content: CmsElementSidebarFilter;
}>();

const injectedShowSorting: Ref<boolean>|undefined = inject('showSorting');
const showSorting = ref(false);

onMounted(() => {
    if (injectedShowSorting) {
        showSorting.value = injectedShowSorting.value;
    }
});
</script>
<template>
    <div class="grid sm:grid-cols-2">
        <SwProductListingFilters :content="content" />
        <ListingSorting v-if="showSorting" />
    </div>
</template>
