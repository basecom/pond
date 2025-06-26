<script setup lang="ts">
withDefaults(
    defineProps<{
      autoSlide?: boolean;
      autoplayTimeout?: number;
      speed?: number;
      navigationDots?: boolean;
      navigationArrows?: boolean;
      displayMode?: string;
      minHeight?: string;
      classes?: { [key: string]: boolean };
      loop?: boolean;
      direction?: 'vertical' | 'horizontal' | undefined;
      spaceBetween?: number;
      slidesPerView?: number;
      slidesCounter?: number;
      thumbsSwiper?: string;
      breakpoints?: unknown;
      init?: boolean;
      verticalNavigation?: boolean;
      thumbRef?: string;
      initialSlide?: number;
      isZoomEnabled?: boolean;
      isOutsidePagination?: boolean;
      isOutsideNavigation?: boolean;
      navigation?: boolean;
      pagination?: boolean;
      displayStandard?: boolean;
    }>(),
    {
        autoSlide: false,
        autoplayTimeout: 3000,
        speed: 300,
        navigationDots: true,
        navigationArrows: true,
        displayMode: 'cover',
        minHeight: '300',
        classes: undefined,
        loop: true,
        direction: 'horizontal',
        spaceBetween: 0,
        slidesPerView: 1,
        slidesCounter: 1,
        thumbsSwiper: undefined,
        breakpoints: undefined,
        init: false,
        verticalNavigation: false,
        thumbRef: undefined,
        initialSlide: 0,
        isZoomEnabled: false,
    },
);
defineEmits(['slides-change']);
</script>

<template>
    <LayoutSliderInner
        v-bind="$props"
        v-on="$attrs"
    >
        <slot />
    </LayoutSliderInner>
</template>
