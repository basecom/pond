<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '~/types/analytics/Promotion';

const props = defineProps<{
    element: CmsElementProductSlider;
}>();

const config = useCmsElementConfig(props.element);
const { getCmsElementData } = useCmsUtils();
const products = getCmsElementData(props.element, 'products') ?? [];
const { trackPromotionView, trackSelectPromotion, trackSelectItem } = useAnalytics();
const { isHomePage } = useHomePage();
const border = config.getConfigValue('border');
const boxLayout = config.getConfigValue('boxLayout');
const displayMode = config.getConfigValue('displayMode');
const minWidth = config.getConfigValue('elMinWidth');
const navigation = config.getConfigValue('navigation');
const title = config.getConfigValue('title');
const autoSlide = config.getConfigValue('rotate');

const slidesPerView = 1;
const spaceBetween = 24;
const breakpoints = {
    540: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 3,
    },
    1024: {
        slidesPerView: 4,
    },
};

const slides = computed(() => products);
const { showNavigationArrows, shouldAutoSlide } = useComputeSliderConfig({
    slidesPerView,
    slides,
    breakpoints,
    showNavigation: navigation,
    autoSlide,
});

const isSliderLoaded = ref(false);

const getPromotion = (product: Schemas['Product']): PromotionInfo => ({
    creative_name: product.cover?.media.fileName ?? '',
    creative_slot: props.element?.type ?? '',
    promotion_id: props.element?.blockId ?? '',
    promotion_name: props.element?.type ?? '',
});

const onProductView = (product: Schemas['Product'], index: string | number) => {
    if (isHomePage.value) {
        trackPromotionView(getPromotion(product), product, Number(index));
    } else {
        trackSelectItem(product, { id: props.element?.blockId ?? '', name: props.element?.type ?? '' });
    }
};
const onProductSelect = (product: Schemas['Product'], index: string | number) => {
    if (isHomePage.value) {
        trackSelectPromotion(getPromotion(product), product, Number(index));
    }
};
</script>

<template>
    <div
        v-if="slides?.length"
        :class="{ 'border border-gray px-4 py-2': border }"
    >
        <h3
            v-if="title"
            class="font-bold"
        >
            {{ title }}
        </h3>

        <LayoutSlider
            :slides-counter="slides.length"
            class="w-full"
            :auto-slide="shouldAutoSlide"
            :navigation-arrows="showNavigationArrows"
            :navigation-dots="false"
            :slides-per-view="slidesPerView"
            :space-between="spaceBetween"
            :breakpoints="breakpoints"
            @slides-change="isSliderLoaded = true"
        >
            <LayoutSliderSlide
                v-for="(slide, index) in slides"
                :key="slide.id"
                class="py-2"
                :style="minWidth ? { minWidth } : undefined"
            >
                <ProductCard
                    :product="slide"
                    :layout="boxLayout"
                    :display-mode="displayMode"
                    @view-product="onProductView(slide, index)"
                    @select-product="onProductSelect(slide, index)"
                />
            </LayoutSliderSlide>
        </LayoutSlider>
    </div>
</template>
