<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      showConfirm?: boolean;
      passwordId?: string;
      passwordLabel?: string;
      passwordName?: string;
      passwordPlaceholder?: string;
      passwordConfirmId?: string;
      passwordConfirmLabel?: string;
      passwordConfirmName?: string;
      passwordConfirmPlaceholder?: string;
      columns?: Columns;
    }>(),
    {
        showConfirm: false,
        passwordId: undefined,
        passwordLabel: undefined,
        passwordName: undefined,
        passwordPlaceholder: undefined,
        passwordConfirmId: undefined,
        passwordConfirmLabel: undefined,
        passwordConfirmName: undefined,
        passwordConfirmPlaceholder: undefined,
        columns: () => ({
            sm: 12,
            md: 12,
        }),
    },
);

const configStore = useConfigStore();

const passwordMinLength = configStore.get('core.loginRegistration.passwordMinLength') as number;
const passwordMinRule = ref(`min:${passwordMinLength}`);
</script>

<template>
    <slot name="password">
        <UiTextElement
            :id="passwordId"
            :label="passwordLabel"
            autocomplete="password"
            :name="passwordName"
            input-type="password"
            :placeholder="passwordPlaceholder"
            :rules="showConfirm ? [
                'required',
                'confirmed',
                passwordMinRule
            ] : [
                'required',
                passwordMinRule
            ]"
            :debounce="300"
            :messages="{ required: $t('account.customer.password.errorRequired'), confirmed: $t('account.customer.password.errorConfirmed'), min: $t('account.customer.password.errorMin', { number: passwordMinLength }) }"
            :columns="columns"
        />
    </slot>

    <template v-if="showConfirm">
        <slot name="password-confirm">
            <UiTextElement
                :id="passwordConfirmId"
                autocomplete="new-password"
                :name="passwordConfirmName"
                :label="passwordConfirmLabel"
                input-type="password"
                :placeholder="passwordConfirmPlaceholder"
                :messages="{ required: $t('account.customer.password.errorRequired') }"
                rules="required"
                :columns="columns"
            />
        </slot>
    </template>
</template>
