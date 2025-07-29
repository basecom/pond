<script setup lang="ts">

withDefaults(
    defineProps<{
      isVideo?: boolean;
      isPromotion?: boolean;
      srcPath?: string;
      altText?: string;
      title?: string;
      label?: string;
    }>(),
    {
        isVideo: false,
        isPromotion: false,
        srcPath: undefined,
        altText: undefined,
        title: undefined,
        label: undefined,
    },
);
</script>
<template>
    <ProductCoverInner v-bind="$props" />
</template>
