<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const { logout } = usePondAuthentication();
</script>

<template>
    <div class="hidden md:flex">
        <LayoutHeaderAccountInner :signed-in="signedIn" @logout="logout" />
    </div>
</template>
