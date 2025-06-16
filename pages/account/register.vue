<script setup lang="ts">

const { t } = useI18n();
const configStore = useConfigStore();
await configStore.loadConfig();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

useHead(() => ({
  title: `${t('account.profile')  } | ${shopName}`,
}));

const { rerouteIfLoggedIn } = usePondAuthentication();
await rerouteIfLoggedIn();

watch(() => signedIn.value, async (newValue) => {
  if (newValue) {
    await rerouteIfLoggedIn();
  }
});
</script>

<template>
    <div class="container flex justify-center py-4">
        <div class="w-full">
            <AccountRegister>
                <template #headline>
                    <h1 class="mb-4 text-center text-lg font-semibold">{{ $t('account.auth.register') }}</h1>
                </template>
            </AccountRegister>
        </div>
    </div>
</template>
