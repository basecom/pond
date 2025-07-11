<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

const props = withDefaults(
    defineProps<{
      headline?: string;
      address?: Schemas['CustomerAddress'],
      description?: string;
    }>(),
    {
      headline: undefined,
      address: undefined,
      description: undefined
    },
);
console.log('props', props.address);

const configStore = useConfigStore();
const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
const showAdditionalAddressField1 = configStore.get('core.loginRegistration.showAdditionalAddressField1') as boolean;
const showAdditionalAddressField2 = configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean;
const showPhoneNumberField = configStore.get('core.loginRegistration.showPhoneNumberField') as boolean;
</script>

<template>
  <div>
    <slot name="address-card-headline">
      <h3 v-if="headline" class="mb-2 border-b border-gray-100 pb-2 text-lg font-bold">
        {{ headline }}
      </h3>
    </slot>

    <slot name="description">
      <template v-if="description">
        {{ description }}
      </template>
    </slot>

    <slot name="address-card-fields">
      <!-- ToDo: Diese Komponente auch in AccountPageProfileInner nutzen -->
      <div v-if="address && !description" class="space-y-1">
        <p v-if="address.salutationId">
          {{ getTranslatedProperty(address.salutation, 'displayName') }}
        </p>
        <p>
          <template v-if="showTitle">
            {{ address.title }}
          </template>
          {{ address.firstName }} {{ address.lastName }}
        </p>
        <p>
          {{ address.street }}
        </p>
        <p v-if="address.additionalAddressLine1 && showAdditionalAddressField1">
          {{ address.additionalAddressLine1 }}
        </p>
        <p v-if="address.additionalAddressLine2 && showAdditionalAddressField2">
          {{ address.additionalAddressLine2 }}
        </p>
        <p>
          {{ address.zipcode }} {{ address.city }}
        </p>
        <p>
          <template v-if="address.countryStateId">
            {{ getTranslatedProperty(address.countryState, 'name') }},
          </template>
          {{ getTranslatedProperty(address.country, 'name') }}
        </p>
        <p v-if="showPhoneNumberField && address.phoneNumber">
          {{ address.phoneNumber }}
        </p>
      </div>
    </slot>
  </div>
</template>