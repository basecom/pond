<script setup lang="ts">
import type { CmsElementSidebarFilter } from "@shopware/composables";

const props = defineProps<{
  content: CmsElementSidebarFilter;
}>();

console.log('props', props);
</script>
<template>
  <div class="">
    <ListingSorting />
  </div>
</template>
