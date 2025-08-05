<script setup lang="ts">
import type { CmsBlockProductListing } from "@shopware/composables";
import { useCmsBlock } from "#imports";

const props = defineProps<{
  content: CmsBlockProductListing;
}>();

const { getSlotContent } = useCmsBlock(props.content);
const slotContent = getSlotContent("content");

const showSorting = ref(slotContent.config.showSorting?.value);
console.log('SHOW', showSorting.value);
provide('showSorting', showSorting.value === undefined ? 'UN' : showSorting);
// cmsBlockVersionId

</script>

<template>
  <div>
    <CmsGenericElement v-if="slotContent" :content="slotContent" />
  </div>
</template>
