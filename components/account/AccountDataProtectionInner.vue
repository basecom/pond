<script setup lang="ts">
const configStore = useConfigStore();
const { getCmsPageById } = usePondCms();

const privacyPage = configStore.get('core.basicInformation.privacyPage') as string | null;
const tosPage = configStore.get('core.basicInformation.tosPage') as string | null;
const privacyPageLayout = ref(undefined);
const tosPageLayout = ref(undefined);
const isPrivacyPageLayoutLoading = ref(true);
const isTosPageLayoutLoading = ref(true);

onMounted(async () => {
    // Fetch cms page for privacy page, if layout is set in admin
    if (privacyPage) {
        const privacyPageResponse = await getCmsPageById(privacyPage);
        if(privacyPageResponse) {
            privacyPageLayout.value = privacyPageResponse.data?.value;
        }
        isPrivacyPageLayoutLoading.value = false;
    }

    // Fetch cms page for terms and conditions, if layout is set in admin
    if (tosPage) {
        const tosPageResponse = await getCmsPageById(tosPage);
        if(tosPageResponse) {
            tosPageLayout.value = tosPageResponse.data?.value;
        }
        isTosPageLayoutLoading.value = false;
    }
});
</script>

<template>
    <span>
        <slot name="data-protection-policy-label">
            {{ $t('account.register.dataProtection.policy.label') }}
        </slot>

        <slot name="data-protection-policy-dialog">
            <UiDialog>
                <slot name="data-protection-policy-trigger">
                    <UiDialogTrigger class="underline underline-offset-2 cursor-pointer mx-1">
                        {{ $t('account.register.dataProtection.policy.trigger') }}
                    </UiDialogTrigger>
                </slot>

                <slot name="data-protection-policy-content">
                    <UiDialogContent class="max-h-3/4 overflow-scroll">
                        <template v-if="isPrivacyPageLayoutLoading">
                            <UiSkeleton class="w-full h-50 mt-2.5" />
                        </template>
                        <template v-if="privacyPageLayout && !isPrivacyPageLayoutLoading">
                            <CmsPage :content="privacyPageLayout" />
                        </template>
                    </UiDialogContent>
                </slot>
            </UiDialog>
        </slot>

        <slot name="data-protection-terms-and-conditions-label">
            {{ $t('account.register.dataProtection.termsAndConditions.label') }}
        </slot>

        <slot name="data-protection-terms-and-conditions-dialog">
            <UiDialog>
                <slot name="data-protection-terms-and-conditions-trigger">
                    <UiDialogTrigger class="underline underline-offset-2 cursor-pointer mx-1">
                        {{ $t('account.register.dataProtection.termsAndConditions.trigger') }}
                    </UiDialogTrigger>
                </slot>

                <slot name="data-protection-terms-and-conditions-content">
                    <UiDialogContent class="max-h-3/4 overflow-scroll">
                        <template v-if="isTosPageLayoutLoading">
                            <UiSkeleton class="w-full h-50 mt-2.5" />
                        </template>
                        <template v-if="tosPageLayout && !isTosPageLayoutLoading">
                            <CmsPage :content="tosPageLayout" />
                        </template>
                    </UiDialogContent>
                </slot>
            </UiDialog>
        </slot>
    </span>
</template>
