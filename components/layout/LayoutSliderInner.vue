<script setup lang="ts">
import type { Swiper } from 'swiper';
import type { SliderNavigationOptions } from '~/types/cms/SliderNavigationOptions';
import type { SliderBreakpointOptions } from '~/types/cms/SliderBreakpointOptions';

const props = withDefaults(
    defineProps<{
      autoSlide?: boolean;
      autoplayTimeout?: number;
      speed?: number;
      navigationDots?: SliderNavigationOptions;
      navigationArrows?: SliderNavigationOptions;
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
const { getStyle } = usePondStyle();

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
                :class="[getStyle('slider.container.base'), classes, { [getStyle('slider.container.cursorGrab')]: slidesCounter > 1, [getStyle('slider.container.padding')]: isOutsideNavigation }]"
            >
                <slot name="navigation-buttons">
                    <template v-if="hasNavigation">
                        <slot name="previous-slide">
                            <button
                                ref="prevSlide"
                                :class="[getStyle('slider.navigation.base'), getStyle('slider.navigation.prev.base'), isOutsideNavigation ? getStyle('slider.navigation.prev.outside') : getStyle('slider.navigation.prev.inside')]"
                            >
                                <Icon name="custom-icons:chevron-left" :class="getStyle('slider.navigation.icon')" />
                            </button>
                        </slot>

                        <slot name="next-slide">
                            <button
                                ref="nextSlide"
                                :class="[getStyle('slider.navigation.base'), getStyle('slider.navigation.next.base'), isOutsideNavigation ? getStyle('slider.navigation.next.outside') : getStyle('slider.navigation.next.inside')]"
                            >
                                <Icon name="custom-icons:chevron-right" :class="getStyle('slider.navigation.icon')" />
                            </button>
                        </slot>
                    </template>
                </slot>

                <slot name="swiper-container">
                    <swiper-container
                        ref="swiperContainer"
                        class="grid size-full"
                        :autoplay="autoSlide"
                        :auto-height="displayMode === 'standard'"
                        :speed="speed"
                        :loop="loop"
                        :direction="direction"
                        :space-between="spaceBetween"
                        :slides-per-view="slidesPerView"
                        :thumbs-swiper="thumbsSwiper"
                        :init="init"
                        :initial-slide="initialSlide"
                        :navigation="hasNavigation ? { prevEl: prevSlide, nextEl: nextSlide } : false"
                        :pagination="hasPagination ? {
                            el: paginationEl,
                            clickable: true,
                            bulletClass: getStyle('slider.pagination.bullet'),
                            bulletActiveClass: getStyle('slider.pagination.bulletActive')
                        } : false"
                        @swiperslideslengthchange="$emit('slides-change')"
                    >
                        <slot />
                    </swiper-container>
                </slot>

                <slot name="pagination">
                    <div
                        v-if="hasPagination"
                        :class="[getStyle('slider.pagination.wrapper'), { [getStyle('slider.pagination.inside')]: !isOutsidePagination }]"
                    >
                        <div ref="paginationEl" :class="getStyle('slider.pagination.container')" />
                    </div>
                </slot>
            </div>
        </slot>
    </ClientOnly>
</template>
