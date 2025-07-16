<script setup lang="ts">
import * as z from 'zod';
const { t } = useI18n();

withDefaults(
    defineProps<{
        isLoading?: boolean;
        showSuccessMessage?: boolean;
    }>(),
    {
        isLoading: false,
        showSuccessMessage: false,
    },
);

const emits = defineEmits<{
    recover: [recoverData: RecoverData];
}>();

const schema = z.object({
    email: z
        .string({
            required_error: t('account.email.required'),
        })
        .email({
            message: t('account.email.invalid'),
        }),
});

const { getStyle } = usePondStyle();
export type RecoverData = z.infer<typeof schema>;

const recover = (recoverData: RecoverData) => {
    emits('recover', recoverData);
};
</script>

<template>
    <slot name="wrapper">
        <div v-auto-animate>
            <slot name="success-message">
                <template v-if="showSuccessMessage">
                    <UiAlert variant="successful" :class="getStyle('account.recover.alert.outer')">
                        <slot name="alert-icon">
                            <Icon name="mdi:check" :class="getStyle('account.recover.alert.icon')" />
                        </slot>

                        <div>
                            <UiAlertTitle>{{ $t('account.recover.successHeader') }}</UiAlertTitle>
                            <UiAlertDescription>
                                {{ $t('account.recover.successMessage') }}
                            </UiAlertDescription>
                        </div>
                    </UiAlert>
                </template>
            </slot>

            <slot name="header">
                <h1>{{ $t('account.recover.header') }}</h1>
            </slot>

            <slot name="info-text">
                <p :class="getStyle('account.recover.description')">{{ $t('account.recover.information') }}</p>
            </slot>

            <slot name="form">
                <UiAutoForm
                    :class="getStyle('account.recover.form.outer')"
                    :schema="schema"
                    :field-config="{
                        email: {
                            label: $t('account.email.label'),
                            inputProps: {
                                type: 'email',
                                placeholder: $t('account.email.placeholder'),
                            },
                        }
                    }"
                    @submit="recover"
                >
                    <slot name="buttons">
                        <div :class="getStyle('account.recover.form.buttons.outer')">
                            <slot name="back-button">
                                <UiButton variant="outline" :class="getStyle('account.recover.form.buttons.cancel')">
                                    <NuxtLinkLocale to="/account/login">{{ $t('account.recover.backButton') }}</NuxtLinkLocale>
                                </UiButton>
                            </slot>

                            <slot name="submit-button">
                                <UiButton type="submit" :is-loading="isLoading" :class="getStyle('account.recover.form.buttons.submit')">
                                    {{ $t('account.recover.submitButton') }}
                                </UiButton>
                            </slot>
                        </div>
                    </slot>
                </UiAutoForm>
            </slot>
        </div>
    </slot>
</template>
