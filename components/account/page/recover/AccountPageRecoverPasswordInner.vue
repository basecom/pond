<script setup lang="ts">
import type { RecoverPasswordFormData, RecoverPasswordFormSubmitData } from '~/types/vueForm/RecoverPassword';

withDefaults(
    defineProps<{
      displayErrors?: boolean;
      isLoading?: boolean;
      showRequired?: string[];
      errorMessage?: string;
      floatPlaceholders?: boolean;
    }>(),
    {
        displayErrors: false,
        isLoading: false,
        showRequired: () => ['label'],
        errorMessage: undefined,
        floatPlaceholders: false,
    },
);

const emits = defineEmits<{
  recoverPassword: [formData: RecoverPasswordFormData];
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <div :class="getStyle('account.recover.password.outer')">
        <slot name="headline">
            <h1> {{ $t('account.profileRecoverPasswordTitle') }} </h1>
        </slot>

        <slot name="form">
            <Vueform
                :display-errors="displayErrors"
                :loading="isLoading"
                :endpoint="false"
                :show-required="showRequired"
                :float-placeholders="floatPlaceholders"
                @submit="(value: RecoverPasswordFormSubmitData) => emits('recoverPassword', value.data)"
            >
                <AccountPassword
                    :show-confirm="true"
                    password-id="newPassword"
                    password-name="newPassword"
                    :password-label="$t('account.profilePasswordCreateNew')"
                    :password-placeholder="$t('account.profilePasswordCreateNewPlaceholder')"
                    password-confirm-id="newPassword_confirmation"
                    password-confirm-name="newPassword_confirmation"
                    :password-confirm-label="$t('account.personalPasswordConfirmationLabel')"
                    :password-confirm-placeholder="$t('account.personalPasswordConfirmationPlaceholder')"
                />

                <slot name="recover-submit-button">
                    <UiFormButton
                        id="recover-submit"
                        type="submit"
                        name="recover-submit"
                        :class="getStyle('account.recover.password.button')"
                        :is-loading="isLoading"
                    >
                        {{ $t('account.profileChangePassword') }}
                    </UiFormButton>
                </slot>
            </Vueform>
        </slot>
    </div>
</template>
