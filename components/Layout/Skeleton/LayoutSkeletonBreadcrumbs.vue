<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <div class="inline-flex flex-wrap items-center gap-2">
        <div class="h-5 w-14 animate-pulse rounded bg-gray-medium" />

        <FormKitIcon
            class="block size-2.5"
            icon="chevron-right"
            :title="t('icon.rightArrow')"
        />

        <div class="h-5 w-16 animate-pulse rounded bg-gray-medium" />
    </div>
</template>
