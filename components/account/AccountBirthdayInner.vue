<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      cols?: Columns;
      prefix?: string;
    }>(),
    {
        cols: () => ({
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
    const years = [];
    const today = new Date();
    // we can not use a foreach here
    // eslint-disable-next-line no-restricted-syntax
    for (let i = (today.getFullYear() - 120); i <= today.getFullYear(); i++) years.push(i);
    return years;
});
</script>

<template>
    <slot name="birthday">
        <GroupElement name="birthday" :label="$t('account.customer.birthday.label')">
            <slot name="birthday-day">
                <FormSelectElement
                    :id="`${prefix}birthdayDay`"
                    :name="`${prefix}birthdayDay`"
                    :placeholder="$t('account.customer.birthday.day')"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :messages="{ required: $t('account.customer.birthday.errorRequired') }"
                    :native="false"
                    :can-clear="false"
                    :items="birthdayDays"
                    :columns="cols"
                />
            </slot>

            <slot name="birthday-month">
                <FormSelectElement
                    :id="`${prefix}birthdayMonth`"
                    :name="`${prefix}birthdayMonth`"
                    :placeholder="$t('account.customer.birthday.month')"
                    :messages="{ required: $t('account.customer.birthday.errorRequired') }"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :native="false"
                    :can-clear="false"
                    :items="birthdayMonths"
                    :columns="cols"
                />
            </slot>

            <slot name="birthday-year">
                <FormSelectElement
                    :id="`${prefix}birthdayYear`"
                    :name="`${prefix}birthdayYear`"
                    :placeholder="$t('account.customer.birthday.year')"
                    :messages="{ required: $t('account.customer.birthday.errorRequired') }"
                    :rules="isBirthdayRequired ? ['required'] : ''"
                    :native="false"
                    :can-clear="false"
                    :items="possibleBirthdayYears"
                    :columns="cols"
                />
            </slot>
        </GroupElement>
    </slot>
</template>
