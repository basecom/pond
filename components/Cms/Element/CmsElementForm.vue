<script setup lang="ts">
const props = defineProps<{
    element: CmsElementForm;
}>();

const config = useCmsElementConfig(props.element);
const type = config.getConfigValue('type');
</script>

<template>
    <template v-if="type === 'newsletter'">
        <ClientOnly>
            <CmsElementFormNewsletter :element="element" />

            <template #fallback>
                <LayoutSkeletonCmsElementFormNewsletter />
            </template>
        </ClientOnly>
    </template>

    <template v-else>
        <!-- TODO: BUS-950 -->
    </template>
</template>
