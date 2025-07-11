<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const { logout } = usePondAuthentication();

const isOpen: Ref<boolean> = ref(false);
const isSignedIn = computed(() => signedIn.value);
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
