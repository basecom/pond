<script setup lang="ts">
import type {
    CmsElementImageSlider,
} from '@shopware/composables';

import { computed, ref } from 'vue';
import type { Schemas } from '@shopware/api-client/api-types';
export type CmsImageSliderItem = {
  url: string;
  newTab: boolean;
  media: Schemas['Media'];
  mediaId: string;
  apiAlias: 'cms_image_slider_item';
};


const props = defineProps<{
  content: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.content);
const slides = computed(() => props.content.data.sliderItems);

const navigationDots = config.getConfigValue('navigationDots');
const navigationArrows = config.getConfigValue('navigationArrows');
const displayMode = config.getConfigValue('displayMode');
const autoSlide = config.getConfigValue('autoSlide');
const autoplayTimeout = config.getConfigValue('autoplayTimeout');
const minHeight = config.getConfigValue('minHeight');
const speed = config.getConfigValue('speed');
const verticalAlign = config.getConfigValue('verticalAlign');
const isDecorative = config.getConfigValue('isDecorative');

const sliderRef = ref(null);

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
    displayMode === 'cover' ? 'object-cover' :
        displayMode === 'contain' ? 'object-contain' : '',
    verticalAlign === 'flex-start' ? 'object-top' :
        verticalAlign === 'center' ? 'object-center' :
            verticalAlign === 'flex-end' ? 'object-bottom' : 'object-top',
    'w-full h-full',
]);

const anchorAttrs = (slide: CmsImageSliderItem) =>
    slide.url
        ? { href: slide.url, target: slide.newTab ? '_blank' : '_self', rel: 'noopener', class: 'w-full' }
        : { class: 'w-full' };
</script>

<template>
    <div
        v-if="slides?.length"
    >
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
                    v-for="slide in slides"
                    :key="slide.media.id"
                    :style="slideStyle"
                >
                    <component
                        :is="slide.url ? 'a' : 'span'"
                        v-bind="anchorAttrs(slide)"
                    >
                        <img
                            ref="slidesRef"
                            :src="slide?.media?.url"
                            :alt="isDecorative ? '' : undefined"
                            :class="imageClass"
                        >
                    </component>
                </LayoutSliderSlide>         
            </LayoutSlider>

            <template #fallback>
                <div class="w-full bg-gray-light">
                    <LayoutImagePlaceholder size="lg" />
                </div>
            </template>
        </ClientOnly>
    </div>

    <template v-else>
        <div class="w-full bg-gray-light">
            <LayoutImagePlaceholder size="lg" />
        </div>
    </template>
</template>
