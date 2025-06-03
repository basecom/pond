<script setup lang="ts">

import type { Swiper } from 'swiper';

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

const swiperContainer: Ref<Swiper|null> = ref(null);
const prevSlide = ref(null);
const nextSlide = ref(null);
const { t } = useI18n();

// swiperContainer?.value has the type swiper but cant be found here
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const computedSwiperContainer = computed(() => swiperContainer?.value?.swiper ?? null);

watch([prevSlide, nextSlide, swiperContainer], ([prevSlideValue, nextSlideValue]) => {
  if (!swiperContainer?.value) {
    return;
  }

  const swiperParams = {
    navigation: {
      prevEl: prevSlideValue,
      nextEl: nextSlideValue,
    },
  };

  Object.assign(swiperContainer.value, swiperParams);
  // swiperContainer?.value has the method initialize
  // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
  // @ts-ignore
  swiperContainer.value?.initialize();
});
</script>

<template>
  <ClientOnly>
    <div
        class="relative"
        :class="[classes, {
                'cursor-grab': slidesCounter > 1
            }]"
    >
      <div
          v-if="isZoomEnabled"
          class="flex"
      >
        <!-- Zoom in button -->
        <button
            class="mr-2 flex"
            :title="t('icon.zoomIn')"
            @click="computedSwiperContainer.zoom.in()"
        >
          button zoom
        </button>

        <!-- Zoom out button -->
        <button
            class="flex"
            :title="t('icon.zoomOut')"
            @click="computedSwiperContainer.zoom.out()"
        >
          button zoom out
        </button>
      </div>

      <div
          ref="prevSlide"
          class="absolute z-10 bg-gray-light/50"
          :class="[!navigationArrows ? 'hidden' : '', verticalNavigation
                    ? 'left-1/2 top-0 flex w-full -translate-x-1/2 justify-center py-1 lg:py-2'
                    : 'left-5 top-1/2 -translate-y-1/2 px-1 py-6 sm:left-0 lg:px-2 lg:py-12']"
      >
        prev
      </div>

      <div
          ref="nextSlide"
          class="absolute z-10 bg-gray-light/50"
          :class="[!navigationArrows ? 'hidden' : '', verticalNavigation
                    ? 'bottom-0 left-1/2 flex w-full -translate-x-1/2 justify-center py-1 lg:py-2'
                    : 'right-5 top-1/2 -translate-y-1/2 px-1 py-6 sm:right-0 lg:px-2 lg:py-12']"
      >
        next
      </div>

      <swiper-container
          ref="swiperContainer"
          class="grid size-full"
          :class="thumbRef ? thumbRef : `min-h-[${minHeight}px]`"
          :autoplay="autoSlide"
          :speed="speed"
          :pagination="navigationDots"
          :navigation="false"
          :loop="loop"
          :direction="direction"
          :space-between="spaceBetween"
          :slides-per-view="slidesPerView"
          :thumbs-swiper="thumbsSwiper"
          :init="init"
          :initial-slide="initialSlide"
          :zoom="isZoomEnabled"
          @swiperslideslengthchange="$emit('slides-change')"
      >
        <slot />
      </swiper-container>
    </div>
  </ClientOnly>
</template>