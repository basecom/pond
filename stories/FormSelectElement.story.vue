<script setup lang="ts">
import {onMounted} from 'vue';

// set onMounted flag, otherwise hydration mismatched may occur
const isMounted = ref(false);

onMounted(() => isMounted.value = true);
</script>

<template>
    <div class="grid gap-4">
        <Vueform v-if="isMounted" id="story-text-form">
            <FormSelectElement
                id="form-select-element-default"
                name="form-select-element-default"
                label="I'm a default select element"
                :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
            />

            <FormSelectElement
                id="form-select-element-with-default-value"
                name="form-select-element-with-default-value"
                label="I'm a select element with a default value"
                :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
                default-value="private"
            />

            <FormSelectElement
                id="form-select-element-native"
                name="form-select-element-native"
                label="I'm a native select element"
                :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
                :is-native="true"
            />

            <FormSelectElement
                id="form-select-element-can-de-select"
                name="form-select-element-can-de-select"
                label="I'm a select element, which can be de-selected"
                :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
                default-value="private"
                :can-deselect="true"
            />

            <FormSelectElement
                id="form-select-element-can-clear"
                name="form-select-element-can-clear"
                label="I'm a select element, which can be cleared"
                :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
                default-value="private"
                :can-clear="true"
            />
        </Vueform>
    </div>
</template>
