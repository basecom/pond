<script setup lang="ts">
withDefaults(
    defineProps<{
      signedIn?: boolean;
      open?: boolean;
    }>(),
    {
        signedIn: false,
        open: false,
    },
);

defineEmits<{
  logout: [];
  open: [value: boolean];
  click: [];
}>();

const dialogOpen = ref(false);

provide('closeDialog', () => {
    dialogOpen.value = false;
});
</script>

<template>
    <UiSheet :open="open" @update:open="(value: boolean) => $emit('open', value)">
        <slot name="mobile-account-trigger">
            <UiSheetTrigger id="open-account-menu-mobile" class="size-5" aria-label="open-account-menu">
                <slot name="account-icon">
                    <Icon name="mdi:account-outline" class="size-5" />
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>{{ $t('account.myAccount') }}</UiSheetTitle>
                <LazyUiSheetDescription class="text-initial text-base text-start grid gap-2">
                    <!-- user view -->
                    <template v-if="signedIn">
                        <slot name="signed-in">
                            <AccountActionLink link="/account" :label="$t('account.account')" @click="() => $emit('click')" />

                            <AccountActionLink link="/account/profile" :label="$t('account.profile')" @click="() => $emit('click')" />

                            <AccountActionLink link="/account/address" :label="$t('account.address')" @click="() => $emit('click')" />

                            <AccountActionLink link="/account/payment" :label="$t('account.payment')" @click="() => $emit('click')" />

                            <AccountActionLink link="/account/order" :label="$t('account.order')" @click="() => $emit('click')" />

                            <AccountActionLink link="/account/wishlist" :label="$t('account.wishlist')" @click="() => $emit('click')" />

                            <div class="cursor-pointer" @click="$emit('logout')">
                                <slot name="logout">
                                    <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                        {{ $t('account.auth.logout') }}
                                    </div>
                                </slot>
                            </div>
                        </slot>
                    </template>

                    <!-- guest view -->
                    <template v-else>
                        <slot name="guest">
                            <UiDialog v-model:open="dialogOpen">
                                <UiDialogTrigger class="w-full text-start">
                                    <slot name="action-login">
                                        <slot name="login">
                                            <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                                {{ $t('account.auth.login') }}
                                            </div>
                                        </slot>
                                    </slot>
                                </UiDialogTrigger>

                                <UiDialogContent>
                                    <UiDialogHeader>
                                        <UiDialogTitle>
                                            {{ $t('account.auth.login') }}
                                        </UiDialogTitle>
                                    </UiDialogHeader>

                                    <AccountLogin :redirect-to="null" />
                                </UiDialogContent>
                            </UiDialog>

                            <slot name="action-register">
                                <AccountActionLink link="/account/register" :label="$t('account.auth.register')" @click="() => $emit('click')" />
                            </slot>
                        </slot>
                    </template>
                </LazyUiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
