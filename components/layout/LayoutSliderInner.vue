<script setup lang="ts">
import { ChevronRight, ChevronLeft  } from 'lucide-vue-next';
import type { Swiper } from 'swiper';
import type { PaginationOptions } from 'swiper/types';

const props = withDefaults(
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
const prevSlide = ref(null);
const nextSlide = ref(null);
const paginationEl = ref(null);

const isOutsidePagination = computed(() => props.navigationDots === 'outside');
const isOutsideNavigation = computed(() => props.navigationArrows === 'outside');
const hasPagination = computed(() => props.navigationDots !== 'none');
const hasNavigation = computed(() => props.navigationArrows !== 'none');

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
    
    const paginationParams = {
        pagination:
        {el: paginationEl.value, clickable: true,
            bulletClass:'swiper-pagination-bullet bg-gray-400 block w-4 h-4 rounded-full mx-2 opacity-100 transition-all', 
            bulletActiveClass: 'swiper-pagination-bullet-active bg-brand-primary! shadow-brand-primary shadow-sm',
        } as PaginationOptions,
    };

    Object.assign(swiperContainer.value, paginationParams);

    // swiperContainer?.value has the method initialize
    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swiperContainer.value?.initialize();
});

</script>

<template>
    <ClientOnly>
        <div
            class="relative w-full"
            s
            :class="[classes, {
                'cursor-grab': slidesCounter > 1
            }, isOutsideNavigation ? 'px-20 max-sm:px-8' :'']"
        >
            <template v-if="hasNavigation">
                <div
                    ref="prevSlide"
                    class="absolute z-10 bg-gray-light/50"
                    :class="[!navigationArrows ? 'hidden' : '', 'top-1/2 -translate-y-1/2 py-4 lg:py-8',
                             isOutsideNavigation ? 'left-5 max-sm:-left-1' : 'left-0 bg-gray-300 opacity-30 hover:opacity-70 hover:mouse-cursor-pointer']"
                >
                    <ChevronLeft class="size-8 shrink-0 opacity-50" />
                </div>

                <div
                    ref="nextSlide"
                    class="absolute z-10 bg-gray-light/50"
                    :class="[!navigationArrows ? 'hidden' : '', 'top-1/2 -translate-y-1/2 py-4 lg:py-8',
                             isOutsideNavigation ? 'right-5 max-sm:right-0' : 'right-0 bg-gray-300 opacity-30 hover:opacity-70 hover:mouse-cursor-pointer']"
                >
                    <ChevronRight class="size-8 shrink-0 opacity-50" />
                </div>

            </template>


            <swiper-container
                ref="swiperContainer"
                class="grid size-full"
                :autoplay="autoSlide"
                :auto-height="displayMode ==='standard'"
                :speed="speed"
                :pagination="navigationDots"
                :navigation="true"
                :loop="loop"
                :direction="direction"
                :space-between="spaceBetween"
                :slides-per-view="slidesPerView"
                :thumbs-swiper="thumbsSwiper"
                :init="init"
                :initial-slide="initialSlide"
                @swiperslideslengthchange="$emit('slides-change')"
            >
                <slot />
    
            </swiper-container>
            <div
                v-if="hasPagination"
                class="swiper swiper-horizontal flex w-full justify-center mt-4"
                :class="isOutsidePagination ? '': 'absolute left-0 bottom-0 z-20 mb-2'"
            >
                <div ref="paginationEl" class="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal flex" />
            </div>

        </div>
    </ClientOnly>
</template>
