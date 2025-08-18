<script setup lang="ts">
withDefaults(
    defineProps<{
      isVideo?: boolean;
      isPromotion?: boolean;
      srcPath?: string;
      altText?: string;
      title?: string;
      label?: string;
      videoClasses?: string | (string | { [key: string]: boolean })[];
      productClasses?: string | (string | { [key: string]: boolean })[];
      fallbackClasses?: string;
      promotionClasses?: string;
      promotionIconClasses?: string;
      autoPlay?: boolean;
    }>(),
    {
        isVideo: false,
        isPromotion: false,
        srcPath: undefined,
        altText: undefined,
        title: undefined,
        label: undefined,
        videoClasses: undefined,
        productClasses: undefined,
        fallbackClasses: undefined,
        promotionClasses: undefined,
        promotionIconClasses: undefined,
        autoPlay: false,
    },
);
</script>

<template>
    <ProductCoverInner v-bind="$props" />
</template>
