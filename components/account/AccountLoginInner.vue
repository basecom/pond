<script setup lang="ts">
import * as z from 'zod';

withDefaults(
    defineProps<{
        isLoading?: boolean;
        errorMessage?: string;
    }>(),
    {
        isLoading: false,
        errorMessage: undefined,
    },
);

const emits = defineEmits<{
    login: [loginData: LoginData];
}>();

const closeDialog = inject<() => void>('closeDialog');

const { t } = useI18n();
const { getStyle } = usePondStyle();

const schema = z.object({
    username: z
        .string({
            required_error: t('account.emailRequired'),
        })
        .email({
            message: t('account.emailInvalid'),
        }),
    password: z
        .string({
            required_error: t('account.personalPasswordRequired'),
        }),
});
export type LoginData = z.infer<typeof schema>;

const login = async (loginData: LoginData) => {
    emits('login', loginData);
};
</script>

<template>
    <slot name="headline" />
    <UiAutoForm
        :class="getStyle('account.login.form')"
        :schema="schema"
        :field-config="{
            username: {
                label: $t('account.loginMailLabel'),
                inputProps: {
                    type: 'email',
                    placeholder: $t('account.loginMailPlaceholder'),
                    autocomplete: 'username'
                },
            },
            password: {
                label: $t('account.loginPasswordLabel'),
                inputProps: {
                    type: 'password',
                    placeholder: $t('account.loginPasswordPlaceholder'),
                    autocomplete: 'current-password',
                },
            },
        }"
        @submit="login"
    >
        <div :class="getStyle('account.login.outer')">
            <slot name="password-forgotten">
                <NuxtLinkLocale
                    to="/account/recover"
                    :class="getStyle('account.login.passwordForgotten')"
                    @click="closeDialog?.()"
                >
                    {{ $t('account.loginPasswordRecover') }}
                </NuxtLinkLocale>
            </slot>

            <slot name="alert">
                <UiAlert v-if="errorMessage" variant="destructive" :class="getStyle('account.login.alert.outer')">
                    <slot name="alert-icon">
                        <Icon name="mdi:alert-circle-outline" :class="getStyle('account.login.alert.icon')" />
                    </slot>

                    <div>
                        <UiAlertTitle>{{ $t('error.message-default') }}</UiAlertTitle>
                        <UiAlertDescription>
                            {{ errorMessage }}
                        </UiAlertDescription>
                    </div>
                </UiAlert>
            </slot>

            <slot name="submit-button">
                <UiButton type="submit" :is-loading="isLoading">
                    {{ $t('account.login') }}
                </UiButton>
            </slot>
        </div>
    </UiAutoForm>
</template>
