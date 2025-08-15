<script setup lang="ts">
withDefaults(
    defineProps<{
      signedIn?: boolean;
    }>(),
    {
        signedIn: false,
    },
);

defineEmits<{
  logout: [];
}>();

const { getStyle } = usePondStyle();
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;
const dialogOpen = ref<boolean>(false);

provide('closeDialog', () => {
    dialogOpen.value = false;
});
</script>

<template>
    <UiDropdownMenu>
        <slot name="action-login-menu">
            <UiDropdownMenuTrigger
                id="header-account-action"
                :class="getStyle('header.actions.account.trigger')"
                aria-label="header-account-action"
            >
                <slot name="icon">
                    <Icon
                        name="mdi:account-outline"
                        :class="getStyle('header.actions.account.icon')"
                    />
                </slot>
            </UiDropdownMenuTrigger>
        </slot>

        <UiDropdownMenuContent>
            <UiDropdownMenuLabel>
                <slot name="account-headline">
                    {{ $t('account.myAccount') }}
                </slot>
            </UiDropdownMenuLabel>

            <UiDropdownMenuSeparator />

            <!-- user view -->
            <template v-if="signedIn">
                <slot name="signed-in">
                    <UiDropdownMenuItem>
                        <slot name="action-overview">
                            <NuxtLinkLocale to="/account">
                                <slot name="overview">
                                    {{ $t('account.overviewLink') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-personal-profile">
                            <NuxtLinkLocale to="/account/profile">
                                <slot name="personal-profile">
                                    {{ $t('account.profileLink') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-addresses">
                            <NuxtLinkLocale to="/account/address">
                                <slot name="personal-addresses">
                                    {{ $t('account.addressLink') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-payment-methods">
                            <NuxtLinkLocale to="/account/payment">
                                <slot name="personal-payment-methods">
                                    {{ $t('account.paymentLink') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-orders">
                            <NuxtLinkLocale to="/account/order">
                                <slot name="personal-orders">
                                    {{ $t('account.ordersLink') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem v-if="wishlistEnabled">
                        <slot name="action-wishlist">
                            <NuxtLinkLocale to="/account/wishlist">
                                <slot name="wishlist">
                                    {{ $t('account.wishlistLink') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>

                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem
                        :class="getStyle('header.actions.account.logoutItem')"
                        @click="$emit('logout')"
                    >
                        <slot name="logout">
                            {{ $t('account.logout') }}
                        </slot>
                    </UiDropdownMenuItem>
                </slot>
            </template>

            <!-- guest view -->
            <template v-else>
                <slot name="guest">
                    <UiDialog v-model:open="dialogOpen">
                        <UiDialogTrigger :class="getStyle('header.actions.account.loginTrigger')">
                            <slot name="action-login">
                                <UiDropdownMenuItem @select.prevent="">
                                    <slot name="login">
                                        {{ $t('account.login') }}
                                    </slot>
                                </UiDropdownMenuItem>
                            </slot>
                        </UiDialogTrigger>

                        <UiDialogContent>
                            <UiDialogHeader>
                                <UiDialogTitle>
                                    {{ $t('account.login') }}
                                </UiDialogTitle>
                            </UiDialogHeader>

                            <AccountLogin :redirect-to="null" />
                        </UiDialogContent>
                    </UiDialog>

                    <UiDropdownMenuItem>
                        <slot name="action-register">
                            <NuxtLinkLocale to="/account/register">
                                <slot name="register">
                                    {{ $t('account.register') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                </slot>
            </template>
        </UiDropdownMenuContent>
    </UiDropdownMenu>
</template>
