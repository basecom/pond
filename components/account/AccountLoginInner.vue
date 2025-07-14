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
            required_error: t('account.email.required'),
        })
        .email({
            message: t('account.email.invalid'),
        }),
    password: z
        .string({
            required_error: t('account.password.errorGeneral'),
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
                label: $t('account.email.label'),
                inputProps: {
                    type: 'email',
                    placeholder: $t('account.email.placeholder'),
                    autocomplete: 'username'
                },
            },
            password: {
                label: $t('account.password.label'),
                inputProps: {
                    type: 'password',
                    placeholder: $t('account.password.placeholder'),
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
                    {{ $t('account.password.forgotten') }}
                </NuxtLinkLocale>
            </slot>

            <slot name="alert">
                <UiAlert v-if="errorMessage" variant="destructive" :class="getStyle('account.login.alert.outer')">
                    <slot name="alert-icon">
                        <Icon name="mdi:alert-circle-outline" :class="getStyle('account.login.alert.icon')" />
                    </slot>

                    <div>
                        <UiAlertTitle>{{ $t('error.generalHeadline') }}</UiAlertTitle>
                        <UiAlertDescription>
                            {{ errorMessage }}
                        </UiAlertDescription>
                    </div>
                </UiAlert>
            </slot>

            <slot name="submit-button">
                <UiButton type="submit" :is-loading="isLoading">
                    {{ $t('account.auth.login') }}
                </UiButton>
            </slot>
        </div>
    </UiAutoForm>
</template>
