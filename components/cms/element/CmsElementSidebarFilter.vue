<script setup lang="ts">
import type { CmsElementSidebarFilter } from "@shopware/composables";

const props = defineProps<{
  content: CmsElementSidebarFilter;
}>();

const config = useCmsElementConfig(props.content);
const showSorting = inject('showSorting');
console.log('sorting', showSorting);
</script>
<template>
  <div class="grid sm:grid-cols-2">
    <SwProductListingFilters :content="content" />
    <ListingSorting v-if="showSorting" />
  </div>
</template>
