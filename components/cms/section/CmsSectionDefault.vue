<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/section/CmsSectionDefault.vue
import type { CmsSectionDefault } from '@shopware/composables';
import { getCmsLayoutConfiguration } from '@shopware/helpers';

const props = defineProps<{
    content: CmsSectionDefault;
}>();

const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(props.content);
</script>

<template>
    <!-- change: add prose class for tailwind typography formatting -->
    <div class="cms-section-default" :class="cssClasses" :styles="layoutStyles">
        <CmsGenericBlock
            v-for="cmsBlock in content.blocks"
            :key="cmsBlock.id"
            class="prose"
            :content="cmsBlock"
        />
    </div>
</template>
