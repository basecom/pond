<script setup lang="ts">
withDefaults(
    defineProps<{
      signedIn?: boolean;
      open: boolean;
    }>(),
    {
        signedIn: false,
    },
);

defineEmits<{
  logout: [];
  open: [value: boolean];
  click: [];
}>();

const { formatLink } = useInternationalization();

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
                            <slot name="action-overview">
                                <NuxtLinkLocale :to="formatLink('/account')" @click="() => $emit('click')">
                                    <slot name="overview">
                                        <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                            {{ $t('account.account') }}
                                        </div>
                                    </slot>
                                </NuxtLinkLocale>
                            </slot>
                            <slot name="action-personal-profile">
                                <NuxtLinkLocale :to="formatLink('/account/profile')" @click="() => $emit('click')">
                                    <slot name="personal-profile">
                                        <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                            {{ $t('account.profile') }}
                                        </div>
                                    </slot>
                                </NuxtLinkLocale>
                            </slot>

                            <slot name="action-addresses">
                                <NuxtLinkLocale :to="formatLink('/account/address')" @click="() => $emit('click')">
                                    <slot name="personal-addresses">
                                        <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                            {{ $t('account.address') }}
                                        </div>
                                    </slot>
                                </NuxtLinkLocale>
                            </slot>

                            <slot name="action-payment-methods">
                                <NuxtLinkLocale :to="formatLink('/account/payment')" @click="() => $emit('click')">
                                    <slot name="personal-payment-methods">
                                        <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                            {{ $t('account.payment') }}
                                        </div>
                                    </slot>
                                </NuxtLinkLocale>
                            </slot>

                            <slot name="action-orders">
                                <NuxtLinkLocale :to="formatLink('/account/order')" @click="() => $emit('click')">
                                    <slot name="personal-orders">
                                        <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                            {{ $t('account.order') }}
                                        </div>
                                    </slot>
                                </NuxtLinkLocale>
                            </slot>

                            <slot name="action-wishlist">
                                <NuxtLinkLocale :to="formatLink('/account/wishlist')" @click="() => $emit('click')">
                                    <slot name="wishlist">
                                        <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                            {{ $t('account.wishlist') }}
                                        </div>
                                    </slot>
                                </NuxtLinkLocale>
                            </slot>

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
                                <NuxtLinkLocale :to="formatLink('/account/register')" @click="() => $emit('click')">
                                    <slot name="register">
                                        <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                                            {{ $t('account.auth.register') }}
                                        </div>
                                    </slot>
                                </NuxtLinkLocale>
                            </slot>
                        </slot>
                    </template>
                </LazyUiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
