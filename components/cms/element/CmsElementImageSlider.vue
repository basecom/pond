<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/element/CmsElementImageSlider.vue
// Change: add swiper js for slider functionality
import type {
    CmsElementImageSlider,
} from '@shopware/composables';
import type { SliderCmsImageSliderItem } from '~/types/cms/SliderCmsImageSliderItem';

const props = defineProps<{
  content: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.content);
const slides = computed(() => props.content.data.sliderItems);
const configStore = useConfigStore();
const navigationDots = config.getConfigValue('navigationDots');
const navigationArrows = config.getConfigValue('navigationArrows');
const displayMode = config.getConfigValue('displayMode');
const autoSlide = config.getConfigValue('autoSlide');
const autoplayTimeout = config.getConfigValue('autoplayTimeout');
const minHeight = config.getConfigValue('minHeight');
const speed = config.getConfigValue('speed');
const verticalAlign = config.getConfigValue('verticalAlign');
const isDecorative = config.getConfigValue('isDecorative');

const productFallBackCover = configStore.get('BasecomPondCompanionPlugin.config.productFallBackCover') as string;

const autoplayConfig = computed(() =>
    autoSlide
        ? {
            delay: autoplayTimeout,
            disableOnInteraction: false,
        }
        : false,
);

const speedConfig = computed(() => autoSlide ? speed : 300);

const slideStyle = computed(() =>
    displayMode === 'cover'
        ? { minHeight, height: minHeight }
        : { minHeight },
);

const imageClass = computed(() => [
    displayMode === 'cover' ? 'object-cover'
        : displayMode === 'contain' ? 'object-contain'
            : '',
    verticalAlign === 'flex-start' ? 'object-top'
        : verticalAlign === 'center' ? 'object-center'
            : verticalAlign === 'flex-end' ? 'object-bottom'
                : 'object-top',
    'w-full h-full',
]);

const anchorAttrs = (slide: SliderCmsImageSliderItem) =>
    slide.url
        ? { href: slide.url, target: slide.newTab ? '_blank' : '_self', rel: 'noopener', ariaLabel: slide.url }
        : {};
</script>

<template>
    <div v-if="slides?.length">
        <ClientOnly>
            <LayoutSlider
                :slides-counter="slides?.length"
                :display-mode="displayMode?.toLowerCase()"
                :navigation-dots="navigationDots"
                :navigation-arrows="navigationArrows"
                :autoplay="autoplayConfig"
                :speed="speedConfig"
                :loop="true"
            >
                <LayoutSliderSlide
                    v-for="(slide, index) in slides"
                    :key="slide.media.id"
                    :style="slideStyle"
                >
                    <component
                        :is="slide.url ? 'a' : 'span'"
                        v-bind="anchorAttrs(slide)"
                        class="w-full"
                    >
                        <img
                            :src="slide?.media?.url || productFallBackCover || ''"
                            :alt="isDecorative ? '' : $t('image.altSliderText', { 'currentSlide':  index, 'totalSlides': slides?.length })"
                            :title="$t('image.altSliderText', { 'currentSlide':  index, 'totalSlides': slides?.length })"
                            :class="imageClass"
                        >
                    </component>
                </LayoutSliderSlide>
            </LayoutSlider>
            <template #fallback>
                <div class="w-full bg-gray-light my-4">
                    <UiSkeleton class="h-64 w-full" />
                </div>
            </template>
        </ClientOnly>
    </div>
    <template v-else>
        <div class="w-full bg-gray-light h-64 flex justify-center items-center">
            <img
                :src="productFallBackCover ?? ''"
                alt="fallback"
                title="fallback"
                class="object-center h-16 aspect-square"
            >
        </div>
    </template>
</template>
