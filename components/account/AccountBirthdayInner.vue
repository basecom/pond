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
        <GroupElement name="birthday" :label="$t('account.personalBirthdayLabel', { required: isBirthdayRequired ? '*' : '' })">
            <slot name="birthday-day">
                <UiSelectElement
                    :id="`${prefix}birthdayDay`"
                    :name="`${prefix}birthdayDay`"
                    :placeholder="$t('account.personalBirthdaySelectDay')"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :messages="{ required: $t('account.personalBirthdayRequired') }"
                    :items="birthdayDays"
                    :columns="columns"
                />
            </slot>

            <slot name="birthday-month">
                <UiSelectElement
                    :id="`${prefix}birthdayMonth`"
                    :name="`${prefix}birthdayMonth`"
                    :placeholder="$t('account.personalBirthdaySelectMonth')"
                    :messages="{ required: $t('account.personalBirthdayRequired') }"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :items="birthdayMonths"
                    :columns="columns"
                />
            </slot>

            <slot name="birthday-year">
                <UiSelectElement
                    :id="`${prefix}birthdayYear`"
                    :name="`${prefix}birthdayYear`"
                    :placeholder="$t('account.personalBirthdaySelectYear')"
                    :messages="{ required: $t('account.personalBirthdayRequired') }"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :items="possibleBirthdayYears"
                    :columns="columns"
                />
            </slot>
        </GroupElement>
    </slot>
</template>
