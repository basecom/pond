<script setup lang="ts">
const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const logout = async () => {
    await customerStore.logout();
    navigateTo(formatLink('/'));
};
</script>

<template>
    <div class="hidden md:flex">
        <LayoutHeaderAccountInner :signed-in="signedIn" @logout="logout" />
    </div>
</template>
