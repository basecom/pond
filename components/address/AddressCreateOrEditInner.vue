<script setup lang="ts">
import type { AddressData, AddressVueFormSubmitValue } from '~/types/vueForm/Address';
import type { Schemas } from '@shopware/api-client/api-types';
import type { Vueform } from '@vueform/vueform';

const props = withDefaults(
    defineProps<{
      address?: Schemas['CustomerAddress'];
      displayVueFormErrors?: boolean;
      showRequired?: string[];
      isLoading?: boolean;
      errorMessage?: string;
      floatPlaceholders?: boolean;
    }>(),
    {
        address: undefined,
        displayVueFormErrors: false,
        showRequired: () => ['label'],
        isLoading: false,
        errorMessage: undefined,
        floatPlaceholders: false,
    },
);

defineEmits<{
  onSubmit: [value: AddressData];
}>();

const { getStyle } = usePondStyle();
const form$: Ref<null | Vueform> = ref(null);

onMounted(() => {
    if (props.address) {
        form$.value?.update({
            accountType: props.address.company ? 'business' : 'private',
            salutationId: props.address.salutationId,
            title: props.address.title,
            firstName: props.address.firstName,
            lastName: props.address.lastName,
            street: props.address.street,
            zipcode: props.address.zipcode,
            city: props.address.city,
            additionalAddressLine1: props.address.additionalAddressLine1,
            additionalAddressLine2: props.address.additionalAddressLine2,
            countryId: props.address.countryId,
            countryStateId: props.address.countryStateId,
            phoneNumber: props.address.phoneNumber,
            company: props.address.company,
            department: props.address.department,
        });
    }
});
</script>

<template>
    <Vueform
        ref="form$"
        :display-errors="displayVueFormErrors"
        :show-required="showRequired"
        :loading="isLoading"
        :endpoint="false"
        :float-placeholders="floatPlaceholders"
        @submit="(value: AddressVueFormSubmitValue) => $emit('onSubmit', value.data)"
    >
        <AddressFields
            :account-type-conditions="[['account-type.accountType', 'business']]"
            :zip-columns="{
                sm: 12,
                md: 6,
            }"
            :city-columns="{
                sm: 12,
                md: 6,
            }"
            :account-type-columns="{
                sm: 12,
                md: 6,
            }"
            :salutation-columns="{
                sm: 12,
                md: 6,
            }"
            :title-columns="{
                sm: 12,
                md: 6,
            }"
            :in-modal="true"
        />

        <UiFormButton
            id="create-or-edit-address-submit"
            name="create-or-edit-address-submit"
            :is-loading="isLoading"
            :class="getStyle('account.address.editOrCreateAddressButton.submit')"
        >
            {{ $t('global.default.save') }}
        </UiFormButton>
    </Vueform>
</template>
