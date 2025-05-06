<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/CmsPage.vue
// we remove the useCategory composable and all the logic related to it
// reason: the cms section can also be used on a landing page where no category is provided
import { useCmsSection } from '@shopware/composables';
import type { CmsSectionSidebar } from '@shopware/composables';
import { computed } from 'vue';

const props = defineProps<{
    content: CmsSectionSidebar;
}>();
const { getPositionContent } = useCmsSection(props.content);

const sidebarBlocks = getPositionContent('sidebar');
const mainBlocks = getPositionContent('main');
const mobileBehavior = computed(() => props.content.mobileBehavior);
</script>

<template>
    <div class="cms-section-sidebar grid grid-cols-12 md:grid">
        <div class="order-1 col-span-12 md:order-2 md:col-span-7 lg:col-span-9">
            <CmsGenericBlock
                v-for="cmsBlock in mainBlocks"
                :key="cmsBlock.id"
                class="overflow-auto"
                :content="cmsBlock"
            />
        </div>
        <div
            :class="{
                'order-2 col-span-12 align-top md:order-1 md:col-span-5 lg:col-span-3':
                    mobileBehavior !== 'hidden',
                'hidden md:block': mobileBehavior === 'hidden',
            }"
        >
            <CmsGenericBlock
                v-for="cmsBlock in sidebarBlocks"
                :key="cmsBlock.id"
                class="overflow-auto"
                :content="cmsBlock"
            />
        </div>
    </div>
</template>
