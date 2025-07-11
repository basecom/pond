<script setup lang="ts">
import type { RecoverPasswordFormData, RecoverPasswordFormSubmitData } from '~/types/vueForm/RecoverPassword';

withDefaults(
    defineProps<{
      displayErrors?: boolean;
      isLoading?: boolean;
      showRequired?: string[];
      errorMessage?: string;
      wrapperClasses?: string;
      submitButtonClasses?: string;
      floatPlaceholders?: boolean;
    }>(),
    {
        displayErrors: false,
        isLoading: false,
        showRequired: () => ['label'],
        errorMessage: undefined,
        wrapperClasses: 'grid gap-5',
        submitButtonClasses: 'col-span-12',
        floatPlaceholders: false,
    },
);

const emits = defineEmits<{
  recoverPassword: [formData: RecoverPasswordFormData];
}>();
</script>

<template>
    <div :class="wrapperClasses">
        <slot name="headline">
            <h1> {{ $t('account.recover.header') }} </h1>
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
                    :password-label="$t('account.recover.password.new.label')"
                    :password-placeholder="$t('account.recover.password.new.placeholder')"
                    password-confirm-id="newPassword_confirmation"
                    password-confirm-name="newPassword_confirmation"
                    :password-confirm-label="$t('account.recover.password.newConfirm.label')"
                    :password-confirm-placeholder="$t('account.recover.password.newConfirm.placeholder')"
                />

                <slot name="recover-submit-button">
                    <UiButton
                        id="recover-submit"
                        type="submit"
                        name="recover-submit"
                        :class="submitButtonClasses"
                        :is-loading="isLoading"
                    >
                        {{ $t('account.recover.submitRecoverButton') }}
                    </UiButton>
                </slot>
            </Vueform>
        </slot>
    </div>
</template>
