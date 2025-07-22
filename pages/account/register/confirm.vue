<script setup lang="ts">
import type { NotificationType } from '~/types/NotificationType';

await useAuthentication().rerouteIfLoggedIn();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({ type: 'register' }));

const { t } = useI18n();
const isLoading = ref(true);
const notification = ref({
    type: 'info' as NotificationType,
    message: '',
    id: Math.floor((Math.random() * 100) + 1),
});

const { query } = useRoute();
const { apiClient } = useShopwareContext();

const em = query.em as string | null;
const hash = query.hash as string | null;

onMounted(async () => {
    if (!em || !hash) {
        return;
    }

    try {
        await apiClient.invoke(
            'registerConfirm post /account/register-confirm',
            {
                body: {
                    em,
                    hash,
                },
            },
        );

        notification.value.message = t('account.register.confirm.success');
        notification.value.type = 'success';
    } catch (error) {
        notification.value.message = t('account.register.confirm.error');
        notification.value.type = 'danger';

        if (import.meta.dev) {
            console.error(error);
        }
    }

    isLoading.value = false;
});
</script>

<template>
    <LayoutBreadcrumbs />

    <UtilityLoadingSpinner v-if="isLoading" />

    <div
        v-else
        class="container"
    >
        <UtilityStaticNotification
            :type="notification.type"
            :message="notification.message"
        />
    </div>
</template>
