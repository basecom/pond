<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);
const video = getSlotContent('video') as Schemas['CmsSlot'];
</script>

<template>
    <CmsLoader :content="video" />
</template>
