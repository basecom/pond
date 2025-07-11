<script setup lang="ts">
import { ChevronRight, ChevronLeft  } from 'lucide-vue-next';
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

const { getStyle } = usePondStyle();

const containerBaseStyle = getStyle('slider.container.base');
const cursorGrabStyle = getStyle('slider.container.cursorGrab');
const paddingStyle = getStyle('slider.container.padding');

const navBaseStyle = getStyle('slider.navigation.base');
const prevButtonStyle = getStyle('slider.navigation.prev.base');
const prevButtonOutside = getStyle('slider.navigation.prev.outside');
const prevButtonInside = getStyle('slider.navigation.prev.inside');

const nextButtonStyle = getStyle('slider.navigation.next.base');
const nextButtonOutside = getStyle('slider.navigation.next.outside');
const nextButtonInside = getStyle('slider.navigation.next.inside');

const iconStyle = getStyle('slider.navigation.icon');

const paginationWrapperStyle = getStyle('slider.pagination.wrapper');
const paginationInsideStyle = getStyle('slider.pagination.inside');
const paginationContainerStyle = getStyle('slider.pagination.container');
const paginationBulletStyle = getStyle('slider.pagination.bullet');
const paginationBulletActiveStyle = getStyle('slider.pagination.bulletActive');
</script>

<template>
    <ClientOnly>
        <slot name="swiper-container">
            <div
                :class="[containerBaseStyle, classes, { [cursorGrabStyle]: slidesCounter > 1, [paddingStyle]: isOutsideNavigation }]"
            >
                <slot name="navigation-buttons">
                    <template v-if="hasNavigation">
                        <slot name="previous-slide">
                            <button
                                ref="prevSlide"
                                :class="[navBaseStyle, prevButtonStyle, isOutsideNavigation ? prevButtonOutside : prevButtonInside]"
                            >
                                <ChevronLeft :class="iconStyle" />
                            </button>
                        </slot>

                        <slot name="next-slide">
                            <button
                                ref="nextSlide"
                                :class="[navBaseStyle, nextButtonStyle, isOutsideNavigation ? nextButtonOutside : nextButtonInside]"
                            >
                                <ChevronRight :class="iconStyle" />
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
                            bulletClass: paginationBulletStyle,
                            bulletActiveClass: paginationBulletActiveStyle
                        } : false"
                        @swiperslideslengthchange="$emit('slides-change')"
                    >
                        <slot />
                    </swiper-container>
                </slot>

                <slot name="pagination">
                    <div
                        v-if="hasPagination"
                        :class="[paginationWrapperStyle, { [paginationInsideStyle]: !isOutsidePagination }]"
                    >
                        <div ref="paginationEl" :class="paginationContainerStyle" />
                    </div>
                </slot>
            </div>
        </slot>
    </ClientOnly>
</template>
