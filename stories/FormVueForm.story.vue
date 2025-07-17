<script setup lang="ts">
// set onMounted flag, otherwise hydration mismatched may occur
const isMounted = ref(false);

onMounted(() => isMounted.value = true);
</script>

<template>
    <div class="grid gap-4">
        <h1> I'm a Vue form, which marks required fields with * </h1>
        <Vueform
            v-if="isMounted"
            id="story-form-required-fields"
            :show-required="['label']"
            :display-errors="false"
        >
            <UiTextElement
                id="required-text-element"
                label="I'm a required text element"
                name="text-element"
                placeholder="Enter Text ..."
                :messages="{ required: 'I am required' }"
                rules="required"
            />

            <UiSelectElement
                id="required-select-element"
                name="select-element"
                label="I'm a required select element"
                rules="required"
                :messages="{ required: 'I am required' }"
                :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
            />

            <UiCheckboxElement
                id="required-checkbox-element"
                name="checkbox-element"
                rules="required"
                :messages="{ required: 'I am required' }"
            >
                <template #checkbox-element-content>
                    <span>
                        I'm a required checkbox
                    </span>
                </template>
            </UiCheckboxElement>

            <UiFormButton
                id="form-submit-button"
                name="form-submit"
                label="Submit"
                type="submit"
            >
                Submit
            </UiFormButton>
        </Vueform>

        <h1> I'm a Vue form, which displays all errors </h1>
        <Vueform
            v-if="isMounted"
            id="story-form-display-errors"
            :show-required="['label']"
            :display-errors="true"
        >
            <UiTextElement
                id="fomr-2-required-text-element"
                label="I'm a required text element"
                name="text-element"
                placeholder="Enter Text ..."
                :messages="{ required: 'Text field is required' }"
                rules="required"
            />

            <UiSelectElement
                id="form-2-required-select-element"
                name="select-element"
                rules="required"
                :messages="{ required: 'Select field is required' }"
                :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
            />

            <UiCheckboxElement
                id="form-2-required-checkbox-element"
                name="checkbox-element"
                rules="required"
                :messages="{ required: 'Checkbox is required' }"
            >
                <template #checkbox-element-content>
                    <span>
                        I'm a required checkbox
                    </span>
                </template>
            </UiCheckboxElement>

            <UiFormButton
                id="form-2-submit-button"
                name="form-submit"
                label="Submit"
                type="submit"
            >
                Submit
            </UiFormButton>
        </Vueform>

        <h1> I'm a Vue form (Grid with 12 col span), which uses different cols for form field and uses group elements </h1>
        <Vueform v-if="isMounted" id="story-form-cols-and-group-elements">
            <UiTextElement
                id="text-element-col-6"
                label="I'm a text element with 6 cols"
                name="text-element"
                placeholder="Enter Text ..."
                :columns="{ md: 6 }"
            />

            <GroupElement name="select-element" label="I'm a group element with a singular form field, to force the first element to start at col-span-1">
                <UiSelectElement
                    id="select-element-col-3"
                    name="select-element"
                    label="I'm a select element with 3 cols"
                    :columns="{ md: 3 }"
                    :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
                />
            </GroupElement>

            <GroupElement name="checkboxes" label="I'm a group element with 2 checkboxes">
                <UiCheckboxElement
                    id="first-checkbox-element"
                    name="first-checkbox"
                    :columns="{ md: 6 }"
                >
                    <template #checkbox-element-content>
                        <span>
                            I'm a checkbox
                        </span>
                    </template>
                </UiCheckboxElement>
                <UiCheckboxElement
                    id="second-checkbox-element"
                    name="second-checkbox"
                    :columns="{ md: 6 }"
                >
                    <template #checkbox-element-content>
                        <span>
                            I'm another checkbox
                        </span>
                    </template>
                </UiCheckboxElement>
            </GroupElement>

            <UiFormButton
                id="form-3-submit-button"
                name="form-submit"
                label="Submit"
                type="submit"
            >
                Submit
            </UiFormButton>
        </Vueform>
    </div>
</template>
