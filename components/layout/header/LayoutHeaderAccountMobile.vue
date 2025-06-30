<script setup lang="ts">
const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const isOpen: Ref<boolean> = ref(false);
const isSignedIn = computed(() => signedIn.value);

const logout = async () => {
    await customerStore.logout();
    navigateTo(formatLink('/'));
};
</script>

<template>
    <div class="flex md:hidden">
        <LayoutHeaderAccountMobileInner
            :signed-in="isSignedIn"
            :open="isOpen"
            @logout="logout"
            @click="() => isOpen = false"
            @open="(value: boolean) => isOpen = value"
        />
    </div>
</template>
