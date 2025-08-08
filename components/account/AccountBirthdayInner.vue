<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Form';

withDefaults(
    defineProps<{
      columns?: Columns;
      prefix?: string;
    }>(),
    {
        columns: () => ({
            xs: 1,
            md: 2,
        }),
        prefix: '',
    },
);
const configStore = useConfigStore();

const isBirthdayRequired = ref(configStore.get('core.loginRegistration.birthdayFieldRequired') as boolean);

const birthdayDays = ref(Array.from({ length: 31 }, (_, i) => i + 1));
const birthdayMonths = ref(Array.from({ length: 12 }, (_, i) => i + 1));
const possibleBirthdayYears = computed(() => {
    const today = new Date();
    return Array.from({ length: 121 }, (_, i) => today.getFullYear() - 120 + i);
});
</script>

<template>
    <slot name="birthday">
        <GroupElement name="birthday" :label="$t('account.customer.birthday.label', { required: isBirthdayRequired ? '*' : '' })">
            <slot name="birthday-day">
                <UiSelectElement
                    :id="`${prefix}birthdayDay`"
                    :name="`${prefix}birthdayDay`"
                    :placeholder="$t('account.customer.birthday.day')"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :messages="{ required: $t('account.customer.birthday.errorRequired') }"
                    :items="birthdayDays"
                    :columns="columns"
                />
            </slot>

            <slot name="birthday-month">
                <UiSelectElement
                    :id="`${prefix}birthdayMonth`"
                    :name="`${prefix}birthdayMonth`"
                    :placeholder="$t('account.customer.birthday.month')"
                    :messages="{ required: $t('account.customer.birthday.errorRequired') }"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :items="birthdayMonths"
                    :columns="columns"
                />
            </slot>

            <slot name="birthday-year">
                <UiSelectElement
                    :id="`${prefix}birthdayYear`"
                    :name="`${prefix}birthdayYear`"
                    :placeholder="$t('account.customer.birthday.year')"
                    :messages="{ required: $t('account.customer.birthday.errorRequired') }"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :items="possibleBirthdayYears"
                    :columns="columns"
                />
            </slot>
        </GroupElement>
    </slot>
</template>
