<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <div class="flex flex-col gap-1 lg:place-items-baseline">
        <span>
            {{ t('cookie.banner.message') }}
        </span>

        <LazySharedModal
            :with-close-button="true"
            size="md"
        >
            <template #trigger>
                <button class="text-brand-primary-dark hover:underline">
                    {{ t('cookie.banner.additionalInformationTriggerButton') }}
                </button>
            </template>

            <template #title>
                {{ t('cookie.banner.additionalInformationTitle') }}
            </template>

            <template #content>
                {{ t('cookie.banner.additionalInformationText') }}
            </template>
        </LazySharedModal>
    </div>
</template>
