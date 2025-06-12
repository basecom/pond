<script setup lang="ts">
import * as z from 'zod';
import { getTranslatedProperty } from '@shopware/helpers';

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
  register: [registerData: LoginData];
}>();

const { t } = useI18n();
const { getRegisterForm, getRegisterDependencies } = usePondForm();
const { getSalutations: salutations } = useSalutations();
const { getCountries: countries, getStatesForCountry} = useCountries();

const schema = getRegisterForm();
const dependencies = getRegisterDependencies();
export type LoginData = z.infer<typeof schema>;

const register = async (registerData: LoginData) => {
  console.log('klick', registerData);
  emits('register', registerData);
};

// TODO: Auslagern -> Wird auch in AccountPageProfileInner genutzt
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
  <slot name="headline" />
  <UiAutoForm
      class="gap-4 grid grid-cols-4"
      :dependencies="dependencies"
      :schema="schema"
      :field-config="{
        accountType: { label: $t('account.customer.accountType') },
        salutationId: { label: $t('account.customer.salutation')},
        title: { label: $t('account.customer.title.label'), inputProps: {
              type: 'text',
              placeholder: $t('account.customer.title.placeholder'),
          }, },
        firstName: {
          label: $t('account.customer.firstName.label'),
          inputProps: {
              type: 'text',
              placeholder: $t('account.customer.firstName.placeholder'),
          },
        },
        lastName: {
          label: $t('account.customer.lastName.label'),
          inputProps: {
              type: 'text',
              placeholder: $t('account.customer.lastName.placeholder'),
          },
        },
        email: {
            label: $t('account.customer.mail.label'),
            inputProps: {
                type: 'email',
                placeholder: $t('account.customer.mail.placeholder'),
                autocomplete: 'username'
            },
        },
        emailConfirmation: {
          label: $t('account.customer.mail.confirm.label'),
            inputProps: {
                type: 'email',
                placeholder: $t('account.customer.mail.confirm.placeholder'),
            },
        },
        company: {
          label: $t('account.customer.company.label'),
            inputProps: {
                type: 'string',
                placeholder: $t('account.customer.company.placeholder'),
            },
        },
        department: {
          label: $t('account.customer.department.label'),
            inputProps: {
                type: 'string',
                placeholder: $t('account.customer.department.placeholder'),
            },
        },
        vatId: {
          label: $t('account.customer.vatId.label'),
            inputProps: {
                type: 'string',
                placeholder: $t('account.customer.vatId.placeholder'),
            },
        },
        password: {
            label: $t('account.register.password.label'),
            inputProps: {
                type: 'password',
                placeholder: $t('account.register.password.placeholder'),
                autocomplete: 'current-password'
            },
        },
        confirmPassword: {
            label: $t('account.register.password.confirm'),
            inputProps: {
                type: 'password',
                placeholder: $t('account.register.password.placeholder'),
                autocomplete: 'current-password'
            },
        },
      }"
      @submit="register"
  >
    <!-- Account type -->
    <template #accountType="slotProps">
      <div class="col-span-1">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- Salutations -->
    <template #salutationId="slotProps">
      <div class="col-start-1 col-span-1">
        <FormField v-slot="{ componentField }" v-bind="slotProps" name="salutationId">
          <UiFormItem>
            <UiAutoFormLabel>{{ $t('account.customer.salutation') }}</UiAutoFormLabel>
            <UiSelect v-bind="componentField">
              <UiFormControl>
                <UiSelectTrigger>
                  <!-- TODO: Placeholder definieren -->
                  <UiSelectValue placeholder="Ihre Anrede" />
                </UiSelectTrigger>
              </UiFormControl>

              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem
                      v-for="salutation in salutations"
                      :key="salutation.id"
                      :value="salutation.id"
                  >
                    {{ getTranslatedProperty(salutation, 'displayName') }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
            <UiFormMessage />
          </UiFormItem>
        </FormField>
      </div>
    </template>

    <!-- Title -->
    <template #title="slotProps">
      <div class="col-span-1">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- First name -->
    <template #firstName="slotProps">
      <div class="col-start-1 col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- Last name -->
    <template #lastName="slotProps">
      <div class="col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- Email -->
    <template #email="slotProps">
      <div class="col-start-1 col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- Email confirm -->
    <template #emailConfirmation="slotProps">
      <div class="col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- Birthday -->
    <template #birthdayDay="slotProps">
      <div class="col-start-1 col-span-1">
        <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayDay">
          <UiFormItem>
            <UiAutoFormLabel>{{ $t('account.customer.birthday.label') }}</UiAutoFormLabel>
            <UiSelect v-bind="componentField">
              <UiFormControl>
                <UiSelectTrigger>
                  <UiSelectValue :placeholder="$t('account.customer.birthday.dayPlaceholder')" />
                </UiSelectTrigger>
              </UiFormControl>

              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem
                      v-for="day in 31"
                      :key="day"
                      :value="day"
                  >
                    {{ day }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
            <UiFormMessage />
          </UiFormItem>
        </FormField>
      </div>
    </template>

    <template #birthdayMonth="slotProps">
      <div class="col-span-1 grid items-end">
        <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayMonth">
          <UiFormItem>
            <UiAutoFormLabel class="sr-only">{{ $t('account.customer.birthdayMonth') }}</UiAutoFormLabel>
            <UiSelect v-bind="componentField">
              <UiFormControl>
                <UiSelectTrigger>
                  <UiSelectValue :placeholder="$t('account.customer.birthday.monthPlaceholder')" />
                </UiSelectTrigger>
              </UiFormControl>

              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem
                      v-for="month in 12"
                      :key="month"
                      :value="month"
                  >
                    {{ month }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </UiFormItem>
        </FormField>
      </div>
    </template>

    <template #birthdayYear="slotProps">
      <div class="col-span-1 grid items-end">
        <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayYear">
          <UiFormItem>
            <UiAutoFormLabel class="sr-only">{{ $t('account.customer.birthdayYear') }}</UiAutoFormLabel>
            <UiSelect v-bind="componentField">
              <UiFormControl>
                <UiSelectTrigger>
                  <UiSelectValue :placeholder="$t('account.customer.birthday.yearPlaceholder')" />
                </UiSelectTrigger>
              </UiFormControl>

              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem
                      v-for="year in possibleBirthdayYears"
                      :key="year"
                      :value="year"
                  >
                    {{ year }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </UiFormItem>
        </FormField>
      </div>
    </template>

    <!-- Company -->
    <template #company="slotProps">
      <!-- TODO: Wie kann ich diesen Div entfernen, wenn das Feld hidden ist? -->
      <div class="col-span-4">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- Department -->
    <template #department="slotProps">
      <div class="col-start-1 col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- VAT id -->
    <template #vatId="slotProps">
      <div class="col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- password -->
    <template #password="slotProps">
      <div class="col-start-1 col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <!-- confirm password -->
    <template #confirmPassword="slotProps">
      <div class="col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>


    <!-- TODO: Auslagern, aber wie?-->
    <AddressFormFields>
      <template #headline>
        Deine Adresse
      </template>
    </AddressFormFields>

    <template #street="slotProps">
      <div class="col-span-2">
        <UiAutoFormField v-bind="slotProps" />
      </div>
    </template>

    <slot name="submit-button">
      <UiButton type="submit" :is-loading="isLoading" class="col-span-4">
        {{ $t('account.auth.register') }}
      </UiButton>
    </slot>
  </UiAutoForm>
</template>
