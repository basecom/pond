<script setup lang="ts">
import type { CmsElementText } from '@shopware/composables';
import { decodeHTML } from 'entities';

const props = defineProps<{
    element: CmsElementText;
}>();

const config = useCmsElementConfig(props.element);
const content = config.getConfigValue('content');
const verticalAlign = config.getConfigValue('verticalAlign');

// get data for 'mapped' config values
const { getCmsElementData } = useCmsUtils();
const elementData : string = getCmsElementData(props.element, 'content');
</script>

<template>
    <!-- v-html is necessary because the text contains inline stylings -->
    <!-- eslint-disable vue/no-v-html -->
    <div
        :class="{
            'flex h-full': !!verticalAlign,
            'items-start': verticalAlign === 'flex-start',
            'items-center': verticalAlign === 'center',
            'items-end': verticalAlign === 'flex-end',
        }"
    >
        <div
            v-if="content || elementData"
            class="cms_html"
            v-html="decodeHTML(`${content ? content : elementData}`)"
        />
    </div>
</template>
