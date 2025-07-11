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

const { getStyle } = usePondStyle();
const triggerStyles = getStyle('header.actions.account.mobile.trigger');
const iconStyles = getStyle('header.actions.account.mobile.icon');
const descriptionStyles = getStyle('header.actions.account.mobile.description');
const logoutStyles = getStyle('header.actions.account.mobile.logoutWrapper');
const logoutButtonStyles = getStyle('header.actions.account.mobile.logout');
const loginTriggerStyles = getStyle('header.actions.account.mobile.loginTrigger');
</script>

<template>
    <UiSheet :open="open" @update:open="(value: boolean) => $emit('open', value)">
        <slot name="mobile-account-trigger">
            <UiSheetTrigger
                id="open-account-menu-mobile"
                :class="triggerStyles"
                aria-label="open-account-menu"
            >
                <slot name="account-icon">
                    <Icon name="mdi:account-outline" :class="iconStyles" />
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>{{ $t('account.myAccount') }}</UiSheetTitle>

                <LazyUiSheetDescription :class="descriptionStyles">
                    <!-- user view -->
                    <template v-if="signedIn">
                        <slot name="signed-in">
                            <AccountActionLink link="/account" :label="$t('account.account')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/profile" :label="$t('account.profile')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/address" :label="$t('account.address')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/payment" :label="$t('account.payment')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/order" :label="$t('account.order')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/wishlist" :label="$t('account.wishlist')" @click="() => $emit('click')" />

                            <div :class="logoutStyles" @click="$emit('logout')">
                                <slot name="logout">
                                    <div :class="logoutButtonStyles">
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
                                <UiDialogTrigger :class="loginTriggerStyles">
                                    <slot name="action-login">
                                        <slot name="login">
                                            <div :class="logoutButtonStyles">
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
