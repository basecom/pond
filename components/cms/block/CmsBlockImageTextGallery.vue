<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/cms/block/CmsBlockImageTextGallery.vue
import type {
    CmsBlockImageTextGallery,
    CmsElementImage,
    CmsElementText,
} from '@shopware/composables';
import { useCmsBlock } from '#imports';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  content: CmsBlockImageTextGallery;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftTextContent = getSlotContent('left-text') as CmsElementText;
const rightTextContent = getSlotContent('right-text') as CmsElementText;
const centerTextContent = getSlotContent('center-text') as CmsElementText;

const leftImageContent = getSlotContent('left-image') as CmsElementImage;
const rightImageContent = getSlotContent('right-image') as CmsElementImage;
const centerImageContent = getSlotContent('center-image') as CmsElementImage;

// TODO: useRouter
function onImageClick(
    slotContent: Schemas['CmsSlot'] & {
      data: {
        url?: string;
        newTab?: boolean;
      };
    },
) {
    if (slotContent.data?.url) {
        if (slotContent.data?.newTab) {
            window.open(slotContent.data.url);
        } else {
            window.location.href = slotContent.data.url;
        }
    }
}
</script>
<template>
    <!-- Change styling -->
    <article
        class="cms-block-image-text-gallery"
        :style="{ backgroundColor: content.backgroundColor || '' }"
    >
        <div class="cms-block-image-text-gallery__container grid md:grid-cols-3 gap-10">
            <div class="cms-block-image-text-gallery__container__column border border-gray-200">
                <CmsElementImage
                    :content="leftImageContent"
                    class="!h-fit"
                    :style="{ cursor: leftImageContent.data?.url && 'pointer' }"
                    @click="onImageClick(leftImageContent)"
                />
                <CmsElementText
                    :content="leftTextContent"
                    class="cms-block-image-text-gallery__container__column--text p-5"
                />
            </div>
            <div class="cms-block-image-text-gallery__container__column border border-gray-200">
                <CmsElementImage
                    :content="centerImageContent"
                    class="!h-fit"
                    :style="{
                        cursor: centerImageContent.data?.url && 'pointer',
                    }"
                    @click="onImageClick(centerImageContent)"
                />
                <CmsElementText
                    :content="centerTextContent"
                    class="cms-block-image-text-gallery__container__column--text p-5"
                />
            </div>
            <div class="cms-block-image-text-gallery__container__column border border-gray-200">
                <CmsElementImage
                    :content="rightImageContent"
                    class="!h-fit"
                    :style="{ cursor: rightImageContent.data?.url && 'pointer' }"
                    @click="onImageClick(rightImageContent)"
                />
                <CmsElementText
                    :content="rightTextContent"
                    class="cms-block-image-text-gallery__container__column--text p-5"
                />
            </div>
        </div>
    </article>
</template>

<style>
.cms-block-image-text-gallery__container__column .cms-element-image img{
  @apply object-contain h-fit;
}
</style>
