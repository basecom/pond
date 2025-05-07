<script setup lang="ts">
const cookieBannerStore = useCookieBannerStore();
const { isAcceptAllEnabled } = storeToRefs(cookieBannerStore);
</script>

<template>
    <div class="flex flex-wrap justify-center gap-2 [&>button]:w-full [&>button]:sm:w-fit">
        <FormKit
            type="button"
            :classes="{
                outer: 'w-full sm:w-fit',
                input: 'max-w-full sm:max-w-fit',
            }"
            @click="cookieBannerStore.denyAll()"
        >
            {{ $t('cookie.banner.denyAllButton') }}
        </FormKit>

        <CookieBannerModal>
            <template #trigger>
                <FormKit
                    type="button"
                    :classes="{
                        input: 'max-w-full sm:max-w-fit',
                    }"
                >
                    {{ $t('cookie.banner.configureButton') }}
                </FormKit>
            </template>
        </CookieBannerModal>

        <FormKit
            v-if="isAcceptAllEnabled"
            type="submit"
            :classes="{
                outer: 'w-full sm:w-fit',
                input: 'max-w-full sm:max-w-fit',
            }"
            @click="cookieBannerStore.acceptAll()"
        >
            {{ $t('cookie.banner.allowAllButton') }}
        </FormKit>
    </div>
</template>
