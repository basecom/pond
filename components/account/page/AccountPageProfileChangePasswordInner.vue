<script setup lang="ts">
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const props = withDefaults(
    defineProps<{
        isLoading?: boolean,
        resetForm?: boolean
    }>(),
    {
        isLoading: false,
        resetForm: false,
    },
);

const emits = defineEmits<{
  'update-password': [passwordForm: ChangePasswordForm];
}>();

const { t } = useI18n();
const { getStyle } = usePondStyle();

const schema = z.object({
    newPassword: z
        .string({
            required_error: t('account.password.errorGeneral'),
        }),

    newPasswordConfirm: z
        .string({
            required_error: t('account.password.errorGeneral'),
        }),

    password: z
        .string({
            required_error: t('account.password.errorGeneral'),
        }),
});
export type ChangePasswordForm = z.infer<typeof schema>;

const initialValues = {
    newPassword: '',
    newPasswordConfirm: '',
    password: '',
};

const form = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues,
});

const changePassword = async (passwordForm: ChangePasswordForm) => {
    emits('update-password', passwordForm);
};

// clear form
watch(() => props.resetForm, (newValue) => {
    if (newValue) {
        form.resetForm({
            values: initialValues,
            errors: {},
            touched: {},
        });

        // remove focus
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
});
</script>

<template>
    <slot name="headline">
        <h3 :class="getStyle('account.personalData.subHeadline')">
            {{ $t('account.personalProfile.changePassword.headline') }}
        </h3>
    </slot>

    <slot name="change-password">
        <UiAccordion type="single" :class="getStyle('account.personalData.accordion.outer')" collapsible>
            <UiAccordionItem value="mail" :class="getStyle('account.personalData.accordion.item')">
                <UiAccordionTrigger :class="getStyle('account.personalData.accordion.trigger')">
                    {{ $t('account.personalProfile.changePassword.headline') }}
                </UiAccordionTrigger>

                <UiAccordionContent :class="getStyle('account.personalData.accordion.content')">
                    <slot name="change-password-form">
                        <UiAutoForm
                            v-auto-animate
                            class="grid gap-4 md:grid-cols-2"
                            :form="form"
                            :schema="schema"
                            :field-config="{
                                newPassword: {
                                    label: $t('account.personalProfile.changePassword.newPassword'),
                                    inputProps: {
                                        type: 'password',
                                        placeholder: $t('account.password.placeholder'),
                                    },
                                },
                                newPasswordConfirm: {
                                    label: $t('account.personalProfile.changePassword.confirmation'),
                                    inputProps: {
                                        type: 'password',
                                        placeholder: $t('account.password.placeholder'),
                                    },
                                },
                                password: {
                                    label: $t('account.personalProfile.changePassword.oldPassword'),
                                    inputProps: {
                                        type: 'password',
                                        placeholder: $t('account.password.placeholder'),
                                    },
                                },
                            }"
                            @submit="changePassword"
                        >
                            <template #password="slotProps">
                                <div class="md:col-span-2">
                                    <UiAutoFormField v-bind="slotProps" />
                                </div>
                            </template>

                            <slot name="submit-button">
                                <UiButton type="submit" class="md:col-span-2" :is-loading="isLoading">
                                    {{ $t('general.save') }}
                                </UiButton>
                            </slot>
                        </UiAutoForm>
                    </slot>
                </UiAccordionContent>
            </UiAccordionItem>
        </UiAccordion>
    </slot>
</template>
