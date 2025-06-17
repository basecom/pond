<script setup lang="ts">
const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const isOpen: Ref<boolean> = ref(false);

const logout = async () => {
    await customerStore.logout();
    navigateTo(formatLink('/'));
};
</script>

<template>
    <div class="flex md:hidden">
        <LayoutHeaderAccountMobileInner
            :signed-in="signedIn"
            :open="isOpen"
            @logout="logout"
            @click="() => isOpen = false"
            @open="(value: boolean) => isOpen = value"
        />
    </div>
</template>
