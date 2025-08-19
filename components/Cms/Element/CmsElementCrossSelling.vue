<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

type SliderConfigItem = {
    id: string;
    showNavigationArrows: ComputedRef<boolean>;
    shouldLoop: ComputedRef<boolean>;
};

const props = defineProps<{
    element: CmsElementCrossSelling;
}>();

const config = useCmsElementConfig(props.element);
const { getCmsElementData } = useCmsUtils();
const crossSellings = getCmsElementData(props.element, 'crossSellings') ?? [];
const filteredCrossSellings = computed(() =>
    // filter out crossSellings that are empty
    crossSellings.filter((cs: Schemas['CrossSellingElement']) => cs.products?.length),
);
const { trackSelectItem } = useAnalytics();

const boxLayout = config.getConfigValue('boxLayout');
const displayMode = config.getConfigValue('displayMode');
const minWidth = config.getConfigValue('elMinWidth');

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

const sliderConfigMap = computed(() =>
    filteredCrossSellings.value.map((crossSelling: Schemas['CrossSellingElement']) => {
        const crossSellingProducts = computed(() => crossSelling.products);

        const { showNavigationArrows, shouldLoop } = useComputeSliderConfig({
            slidesPerView,
            slides: crossSellingProducts,
            breakpoints,
            showNavigation: true,
            autoSlide: false,
        });

        return {
            id: crossSelling.crossSelling.id,
            showNavigationArrows,
            shouldLoop,
        };
    }),
);

const showNavigationArrowForCrossSelling = (crossSellingId: string) => {
    const item = sliderConfigMap.value.find((item: SliderConfigItem) => item.id === crossSellingId);
    return item ? item.showNavigationArrows.value : false;
};

const shouldLoopForCrossSelling = (crossSellingId: string) => {
    const item = sliderConfigMap.value.find((item: SliderConfigItem) => item.id === crossSellingId);
    return item ? item.shouldLoop.value : false;
};

const onSelectProduct = async (product: Schemas['Product']) => {
    trackSelectItem(product, { id: 'cross-selling', name: 'cross-selling' });
};

const { shouldPreloadElement } = useCmsElementPreload();
const shouldPreloadImage = shouldPreloadElement(props.element);

const sliderLoadedById = reactive<Record<string, boolean>>({});
</script>

<template>
    <template
        v-for="(crossSelling, index) in filteredCrossSellings"
        :key="crossSelling.crossSelling.id"
    >
        <h3 class="mt-8 font-bold">
            {{ crossSelling.crossSelling.translated.name }}
        </h3>

        <template v-if="!sliderLoadedById[crossSelling.crossSelling.id]">
            <div class="relative grid size-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div
                    v-for="slide in crossSelling.products.slice(0, 4)"
                    :key="slide.id"
                    class="py-2"
                >
                    <ProductCard
                        :product="slide"
                        :layout="boxLayout"
                        :display-mode="displayMode"
                        :should-preload-image="shouldPreloadImage && index === 0"
                        @select-product="onSelectProduct(slide)"
                    />
                </div>
            </div>
        </template>

        <ClientOnly>
            <LayoutSlider
                :slides-counter="crossSelling.products.length"
                :navigation-arrows="showNavigationArrowForCrossSelling(crossSelling.crossSelling.id)"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
                :breakpoints="breakpoints"
                :loop="shouldLoopForCrossSelling(crossSelling.crossSelling.id)"
                @slides-change="sliderLoadedById[crossSelling.crossSelling.id] = true"
            >
                <LayoutSliderSlide
                    v-for="slide in crossSelling.products"
                    :key="slide.id"
                    :class="`min-w-[${minWidth}] py-2`"
                >
                    <ProductCard
                        :product="slide"
                        :layout="boxLayout"
                        :display-mode="displayMode"
                        :should-preload-image="shouldPreloadImage && index === 0"
                        @select-product="onSelectProduct(slide)"
                    />
                </LayoutSliderSlide>
            </LayoutSlider>
        </ClientOnly>
    </template>
</template>
