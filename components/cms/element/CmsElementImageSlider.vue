<script setup lang="ts">
import type {
    CmsElementImage,
    CmsElementImageSlider,
} from '@shopware/composables';
import { computed, ref } from 'vue';
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { useSwiper } from 'swiper/vue';
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
const firstSlide = slides?.value.at(0);

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

if (slides.value?.length) {
    useSwiper(sliderRef, {});
}

const autoplayConfig = computed(() =>
    autoSlide
        ? {
            delay: autoplayTimeout,
            disableOnInteraction: false,
        }
        : false,
);

const speedConfig = computed(() => autoSlide ? speed : 300);
const slidesRef = ref([]);
</script>
<template>
    <div
        v-if="slides?.length"
        :style="{ minHeight: minHeight }"
    >
        {{ isDecorative }}
        <ClientOnly>
            <LayoutSlider
                :ref="sliderRef"
                :slides-counter="slides.length"
                :display-mode="displayMode.toLowerCase()"
                class="w-full"
                :style="{ minHeight: minHeight }"
                :autoplay="autoplayConfig"
                :speed="speedConfig"
                :pagination="navigationDots.toLowerCase() !== 'none'"
                :navigation="navigationArrows.toLowerCase() !== 'none'"
                :is-outside-pagination="navigationDots.toLowerCase() === 'outside'"
                :is-outside-navigation="navigationArrows.toLowerCase() === 'outside'"
                :loop="true"
            >
                <LayoutSliderSlide
                    v-for="slide in slides"
                    :key="slide.media.id"
                    :style="displayMode === 'cover' ? { minHeight: minHeight, height: minHeight } : { minHeight: minHeight }"
                >
                    <component
                        :is="slide.url ? 'a' : 'span'"
                        v-bind="slide.url ? { href: slide.url, target: slide.newTab ? '_blank' : '_self', rel: 'noopener' } : {}"
                    >
                        <img
                            ref="slidesRef"
                            :src="slide?.media?.url"
                            :alt="isDecorative ? '': undefined"
                            :title="getTranslatedProperty(slide.media, 'title') || $t('cms.element.imageAlt')"
                            :class="[
                                displayMode === 'cover' ? 'object-cover' :
                                displayMode === 'contain' ? 'object-contain':'',
                                verticalAlign === 'flex-start' ? 'object-top' :
                                verticalAlign === 'center' ? 'object-center' :
                                verticalAlign === 'flex-end' ? 'object-bottom' : 'object-top',
                            ]"
                            class="w-full h-auto max-w-full"
                        >
                    </component>
                </LayoutSliderSlide>
            </LayoutSlider>

            <template #fallback>
                fallback
            </template>
        </ClientOnly>
    </div>

    <template v-else>
        <div class="w-full bg-gray-light">
            fall back in v-else
        </div>
    </template>
</template>
