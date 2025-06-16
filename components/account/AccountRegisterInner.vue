<script setup lang="ts">
import type * as z from 'zod';

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
//const { getCountries: countries, getStatesForCountry} = useCountries();
const { getRegisterFormFieldConfig } = usePondFieldConfig();
const configStore = useConfigStore();

const isBirthdayRequired = ref(configStore.get('core.loginRegistration.birthdayFieldRequired') as boolean);

const schema = getRegisterForm();
const dependencies = getRegisterDependencies();
export type LoginData = z.infer<typeof schema>;

const register = async (registerData: LoginData) => {
    emits('register', registerData);
};

// Create fieldConfig
const fieldConfig = getRegisterFormFieldConfig();
</script>

<template>
    <slot name="headline" />
    <UiAutoForm
        class="grid grid-cols-12 gap-4"
        :dependencies="dependencies"
        :schema="schema"
        :field-config="fieldConfig"
        @submit="register"
    >
        <!-- Account type -->
        <template #accountType="slotProps">
            <div class="col-span-3">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- Salutations -->
        <template #salutationId="slotProps">
            <div class="col-span-3 col-start-1">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="salutationId">
                  <SharedFormFieldsSalutation :componentField="componentField">
                    <template #label>
                      <UiAutoFormLabel :required="true">{{ $t('account.customer.salutation') }}</UiAutoFormLabel>
                    </template>
                  </SharedFormFieldsSalutation>
                </FormField>
            </div>
        </template>

        <!-- Title -->
        <template #title="slotProps">
            <div class="col-span-3">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- First name -->
        <template #firstName="slotProps">
            <div class="col-span-6 col-start-1">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- Last name -->
        <template #lastName="slotProps">
            <div class="col-span-6">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- Email -->
        <template #email="slotProps">
            <div class="col-span-6 col-start-1">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- Email confirm -->
        <template #emailConfirmation="slotProps">
            <div class="col-span-6">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- ToDo: Auslagern; Mit Nele Rücksprache halten: Wie macht man das required? -->
        <!-- Birthday -->
        <template #birthdayDay="slotProps">
            <div class="col-span-2 col-start-1">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayDay">
                  <SharedFormFieldsBirthdayDay :component-field="componentField">
                    <template #label>
                      <UiAutoFormLabel :required="isBirthdayRequired">{{ $t('account.customer.birthday.label') }}</UiAutoFormLabel>
                    </template>
                  </SharedFormFieldsBirthdayDay>
                </FormField>
            </div>
        </template>

        <template #birthdayMonth="slotProps">
            <div class="col-span-2 grid items-end">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayMonth">
                  <SharedFormFieldsBirthdayMonth :component-field="componentField">
                    <template #label>
                      <UiAutoFormLabel :required="isBirthdayRequired" class="sr-only">{{ $t('account.customer.birthdayMonth') }}</UiAutoFormLabel>
                    </template>
                  </SharedFormFieldsBirthdayMonth>
                </FormField>
            </div>
        </template>

        <template #birthdayYear="slotProps">
            <div class="col-span-2 grid items-end">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="birthdayYear">
                  <SharedFormFieldsBirthdayYear :component-field="componentField">
                    <template #label>
                      <UiAutoFormLabel :required="isBirthdayRequired" class="sr-only"> {{ $t('account.customer.birthdayYear') }} </UiAutoFormLabel>
                    </template>
                  </SharedFormFieldsBirthdayYear>
                </FormField>
            </div>
        </template>

        <!-- Company -->
        <template #company="slotProps">
            <div class="col-span-6">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- Department -->
        <template #department="slotProps">
            <div class="col-span-3 col-start-1">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- VAT id -->
        <template #vatId="slotProps">
            <div class="col-span-3">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- password -->
        <template #password="slotProps">
            <div class="col-span-6 col-start-1">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- confirm password -->
        <template #confirmPassword="slotProps">
            <div class="col-span-6">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- ToDo: Mit Nele Rücksprache halten: Wie passe ich das Design an? -->
        <!-- Address fields -->
        <template #billingAddress="slotProps">
            <div class="col-span-12 col-start-1">
                <UiAutoFormField v-bind="slotProps">
                  <template #test>
                    Hallo
                  </template>
                </UiAutoFormField>
            </div>
        </template>

        <!-- checkbox -->
        <template #differentShippingAddress="slotProps">
            <div class="col-span-12 col-start-1">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <!-- ToDo: Mit Nele Rücksprache halten: Wie passe ich das Design an? -->
        <!-- Different shipping address -->
        <template #shippingAddress="slotProps">
            <div class="col-span-12 col-start-1">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

      <template #acceptedDataProtection="slotProps">
        <div class="col-span-12 col-start-1">
          <UiAutoFormField v-bind="slotProps" />
        </div>
      </template>

        <slot name="submit-button">
            <UiButton type="submit" :is-loading="isLoading" class="col-span-12">
                {{ $t('account.auth.register') }}
            </UiButton>
        </slot>
    </UiAutoForm>
</template>
