<script setup lang="ts">

// Admin configs
const configStore = useConfigStore();
const isDataProtectionCheckboxRequired = ref(configStore.get('core.loginRegistration.requireDataProtectionCheckbox') as boolean);

</script>

<template>
    <div class="flex md:flex-col justify-center container gap-5">
        <slot name="headline">
            <h1 class="text-center">
                {{ $t('account.register.headline') }}
            </h1>
        </slot>

        <slot name="register-form">
            <Vueform>
                <slot name="register-customer-info-and-billing-address">
                    <GroupElement name="billingAddress">
                        <AddressFormFields
                            :is-detail="true"
                            :account-type-conditions="() => ['billingAddress.accountType', 'business']"
                        />
                    </GroupElement>
                </slot>

                <slot name="different-shipping-address">
                    <CheckboxElement name="differentShippingAddress">
                        {{ $t('address.differentShippingAddress') }}
                    </CheckboxElement>
                </slot>

                <slot name="shipping-address">
                    <GroupElement
                        name="shippingAddress"
                        :conditions="[['differentShippingAddress', true]]"
                    >
                        <AddressFormFields :account-type-conditions="() => ['shippingAddress.accountType', 'business']" />
                    </GroupElement>
                </slot>

                <slot name="data-protection">
                    <CheckboxElement name="dataProtection" :rules="isDataProtectionCheckboxRequired ? 'required' : ''">
                        {{ $t('account.register.acceptedDataProtection') }}
                    </CheckboxElement>
                </slot>

                <slot name="register-submit-button">
                    <ButtonElement
                        name="submit"
                        full
                        submits
                    >
                        {{ $t('account.auth.register') }}
                    </ButtonElement>
                </slot>
            </Vueform>
        </slot>
    </div>
</template>
