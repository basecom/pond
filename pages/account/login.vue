<script setup lang="ts">
const { rerouteIfLoggedIn } = usePondAuthentication();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

// Logged-in users should not access the login page. The watcher is necessary, because a user can also log in via the modal
watch(() => signedIn.value, (newValue) => {
    if (newValue) {
        rerouteIfLoggedIn();
    }
}, { immediate: true });
</script>
<template>
    <div class="container relative flex justify-center py-4">
        <div class="w-full md:w-2/3 xl:w-1/2">
            <AccountLogin>
                <template #headline>
                    <h1 class="mb-4 text-lg font-semibold">{{ $t('account.auth.login') }}</h1>
                </template>
            </AccountLogin>
        </div>
    </div>
</template>
