<script setup lang="ts">
withDefaults(
    defineProps<{
      autoSlide?: boolean;
      autoplayTimeout?: number;
      speed?: number;
      navigationDots?: 'none' | 'inside' | 'outside';
      navigationArrows?: 'none' | 'inside' | 'outside';
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
      thumbRef?: string;
      initialSlide?: number;
      isZoomEnabled?: boolean;
    }>(),
    {
        autoSlide: false,
        autoplayTimeout: 3000,
        speed: 300,
        navigationDots: 'none',
        navigationArrows: 'none',
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
