<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageTextCover.vue
import type { CmsBlockImageTextCover } from "@shopware/composables";
import { useCmsBlock } from "#imports";

const props = defineProps<{
  content: CmsBlockImageTextCover;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftContent = getSlotContent("left");
const rightContent = getSlotContent("right");
</script>
<template>
  <article class="md:grid md:grid-cols-2 gap-10 cms-block-image-text-cover">
    <CmsGenericElement
        :content="leftContent"
        class="cms-block-image-text-cover__image"
    />
    <!-- Added padding-top -->
    <CmsGenericElement
        :content="rightContent"
        class="cms-block-image-text-cover__text pt-8"
    />
  </article>
</template>

<style>
/* change styling */
.cms-block-image-text-cover .cms-element-image img {
  @apply object-contain;
}

.cms-block-image-text-cover p, .cms-block-image-text-cover h1, .cms-block-image-text-cover h2, .cms-block-image-text-cover h3 {
  margin-top: 0;
}
</style>