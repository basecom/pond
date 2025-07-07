<script setup lang="ts">
import { ChevronRight, ChevronLeft  } from 'lucide-vue-next';
import type { Swiper } from 'swiper';
import type { NavigationOptions } from '~/types/cms/CmsImageSlider/NavigationOptions';
import type { SliderBreakpointOptions } from '~/types/cms/CmsImageSlider/SwiperBreakpointOptions';

const props = withDefaults(
    defineProps<{
      autoSlide?: boolean;
      autoplayTimeout?: number;
      speed?: number;
      navigationDots?: NavigationOptions;
      navigationArrows?: NavigationOptions;
      displayMode?: string; 
      minHeight?: string;
      classes?: { [key: string]: boolean };
      loop?: boolean;
      direction?: 'vertical' | 'horizontal' | undefined;
      spaceBetween?: number;
      slidesPerView?: number;
      slidesCounter?: number;
      thumbsSwiper?: string;
      breakpoints?: SliderBreakpointOptions;
      init?: boolean;
      thumbRef?: string;
      initialSlide?: number;
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
    },
);

defineEmits(['slides-change']);

const swiperContainer: Ref<Swiper|null> = ref(null);
const prevSlide = ref<HTMLElement | null>(null);
const nextSlide = ref<HTMLElement | null>(null);
const paginationEl = ref<HTMLElement | null>(null);

const hasPagination = computed(() => props.navigationDots !== 'none');
const hasNavigation = computed(() => props.navigationArrows !== 'none');
const isOutsidePagination = computed(() => props.navigationDots === 'outside');
const isOutsideNavigation = computed(() => props.navigationArrows === 'outside');

onMounted(async () => {
    await nextTick();
    if (swiperContainer.value) {
        if ('initialize' in swiperContainer.value && typeof swiperContainer.value.initialize === 'function') {
            swiperContainer.value.initialize();
        }
    }
});
</script>

<template>
    <ClientOnly>
        <slot name="swiper-container">
            <div
                class="relative w-full"
                :class="{
                    ...classes,
                    'cursor-grab': slidesCounter > 1, 
                    'px-20 max-sm:px-8': isOutsideNavigation 
                }"
            >
                <slot name="navigation-buttons">
                    <template v-if="hasNavigation">
                        <slot name="previous-slide">
                            <button
                                ref="prevSlide"
                                class="absolute z-10 bg-gray-light/50 top-1/2 -translate-y-1/2 py-4 lg:py-8"
                                :class="{ 'left-5 max-sm:-left-1' : isOutsideNavigation, 
                                          'left-0 bg-gray-300 opacity-30 hover:opacity-70 hover:mouse-cursor-pointer': !isOutsideNavigation
                                }"
                            >
                                <ChevronLeft class="size-8 shrink-0 opacity-50" />
                            </button>
                        </slot>
                        <slot name="next-slide">
                            <button
                                ref="nextSlide"
                                class="absolute z-10 bg-gray-light/50 top-1/2 -translate-y-1/2 py-4 lg:py-8"
                                :class="{ 'right-5 max-sm:right-0': isOutsideNavigation, 
                                          'right-0 bg-gray-300 opacity-30 hover:opacity-70 hover:mouse-cursor-pointer' : !isOutsideNavigation 
                                }"
                            >
                                <ChevronRight class="size-8 shrink-0 opacity-50" />
                            </button>
                        </slot>
                    </template>
                </slot>
                <slot name="swiper-container">
                    <swiper-container
                        ref="swiperContainer"
                        class="grid size-full"
                        :autoplay="autoSlide"
                        :auto-height="displayMode ==='standard'"
                        :speed="speed"
                        :loop="loop"
                        :direction="direction"
                        :space-between="spaceBetween"
                        :slides-per-view="slidesPerView"
                        :thumbs-swiper="thumbsSwiper"
                        :init="init"
                        :initial-slide="initialSlide"
                        :navigation="hasNavigation ? { prevEl: prevSlide, nextEl: nextSlide } : false"
                        :pagination="hasPagination ? { el: paginationEl, clickable: true, 
                                                       bulletClass: 'swiper-pagination-bullet bg-gray-400 block w-4 h-4 rounded-full mx-2 opacity-100 transition-all', 
                                                       bulletActiveClass: 'swiper-pagination-bullet-active bg-brand-primary! shadow-brand-primary shadow-sm' } : false"
                        @swiperslideslengthchange="$emit('slides-change')"
                    >
                        <slot />
                    </swiper-container>
                </slot>
                <slot name="pagination">
                    <div
                        v-if="hasPagination"
                        class="swiper swiper-horizontal flex w-full justify-center mt-4"
                        :class="{ 'absolute left-0 bottom-0 z-20 mb-2' :!isOutsidePagination }"
                    >
                        <div ref="paginationEl" class="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal flex" />
                    </div>
                </slot>
            </div>
        </slot>
    </ClientOnly>
</template>
