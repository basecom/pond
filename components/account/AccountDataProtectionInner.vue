<script setup lang="ts">
const configStore = useConfigStore();
const { getCmsPageById } = usePondCms();
const { getStyle } = usePondStyle();

const privacyPage = configStore.get('core.basicInformation.privacyPage') as string | null;
const tosPage = configStore.get('core.basicInformation.tosPage') as string | null;
const privacyPageLayout = ref(undefined);
const tosPageLayout = ref(undefined);
const isPrivacyPageLayoutLoading = ref(true);
const isTosPageLayoutLoading = ref(true);

onMounted(async () => {
    // Fetch cms page for privacy page, if layout is set in admin
    if (privacyPage) {
        privacyPageLayout.value = await getCmsPageById(privacyPage);
        isPrivacyPageLayoutLoading.value = false;
    }

    // Fetch cms page for terms and conditions, if layout is set in admin
    if (tosPage) {
        tosPageLayout.value = await getCmsPageById(tosPage);
        isTosPageLayoutLoading.value = false;
    }
});
</script>

<template>
    <span>
        <slot name="data-protection-policy-label">
            {{ $t('account.dataProtection.policy.label') }}
        </slot>

        <slot name="data-protection-policy-dialog">
            <UiDialog>
                <slot name="data-protection-policy-trigger">
                    <UiDialogTrigger :class="getStyle('account.dataProtection.trigger')">
                        {{ $t('account.dataProtection.policy.trigger') }}
                    </UiDialogTrigger>
                </slot>

                <slot name="data-protection-policy-content">
                    <UiDialogContent :class="getStyle('account.dataProtection.content')">
                        <slot name="data-protection-policy-header">
                            <UiDialogHeader>
                                <UiDialogTitle />
                            </UiDialogHeader>
                        </slot>
                        <template v-if="isPrivacyPageLayoutLoading">
                            <UiSkeleton :class="getStyle('account.dataProtection.skeleton')" />
                        </template>
                        <template v-if="privacyPageLayout && !isPrivacyPageLayoutLoading">
                            <CmsPage :content="privacyPageLayout" />
                        </template>
                    </UiDialogContent>
                </slot>
            </UiDialog>
        </slot>

        <slot name="data-protection-terms-and-conditions-label">
            {{ $t('account.dataProtection.termsAndConditions.label') }}
        </slot>

        <slot name="data-protection-terms-and-conditions-dialog">
            <UiDialog>
                <slot name="data-protection-terms-and-conditions-trigger">
                    <UiDialogTrigger :class="getStyle('account.dataProtection.trigger')">
                        {{ $t('account.dataProtection.termsAndConditions.trigger') }}
                    </UiDialogTrigger>
                </slot>

                <slot name="data-protection-terms-and-conditions-content">
                    <UiDialogContent :class="getStyle('account.dataProtection.content')">
                        <slot name="data-protection-terms-and-conditions-header">
                            <UiDialogHeader>
                                <UiDialogTitle />
                            </UiDialogHeader>
                        </slot>
                        <template v-if="isTosPageLayoutLoading">
                            <UiSkeleton :class="getStyle('account.dataProtection.skeleton')" />
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
