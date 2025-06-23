<script setup lang="ts">
import * as z from 'zod';
import type { Schemas } from '@shopware/api-client/api-types';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const props = withDefaults(
    defineProps<{
        customer: Schemas['Customer'];
        isLoading?: boolean,
        resetForm?: boolean
    }>(),
    {
        isLoading: false,
        resetForm: false,
    },
);

const emits = defineEmits<{
  'update-mail': [mailForm: ChangeMailForm];
}>();

const { t } = useI18n();

const schema = z.object({
    email: z
        .string({
            required_error: t('account.email.required'),
        })
        .email({
            message: t('account.email.invalid'),
        }),

    emailConfirmation: z
        .string({
            required_error: t('account.email.required'),
        })
        .email({
            message: t('account.email.invalid'),
        }),

    password: z
        .string({
            required_error: t('account.password.errorGeneral'),
        }),
});
export type ChangeMailForm = z.infer<typeof schema>;

const initialValues = {
    email: '',
    emailConfirmation: '',
    password: '',
};

const form = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues,
});

const changeMail = async (mailData: ChangeMailForm) => {
    emits('update-mail', mailData);
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
        <h3 class="mb-2 mt-6 border-b border-gray-100 pb-2 text-lg font-bold md:mb-4 md:mt-8">
            {{ $t('account.personalProfile.changeMailAddress.headline') }}
        </h3>
    </slot>

    <slot name="current-mail">
        <p>{{ $t('account.personalProfile.currentMailAddress') }}: {{ customer.email }}</p>
    </slot>

    <slot name="change-mail">
        <UiAccordion type="single" class="w-full" collapsible>
            <UiAccordionItem value="mail" class="border-gray-100">
                <UiAccordionTrigger class="text-base">
                    {{ $t('account.personalProfile.changeMailAddress.headline') }}
                </UiAccordionTrigger>

                <UiAccordionContent class="px-px text-base">
                    <slot name="change-mail-form">
                        <UiAutoForm
                            v-auto-animate
                            class="grid gap-4 md:grid-cols-2"
                            :form="form"
                            :schema="schema"
                            :field-config="{
                                email: {
                                    label: $t('account.email.label'),
                                    inputProps: {
                                        type: 'email',
                                        placeholder: $t('account.email.placeholder'),
                                    },
                                },
                                emailConfirmation: {
                                    label: $t('account.personalProfile.changeMailAddress.confirmation'),
                                    inputProps: {
                                        type: 'email',
                                        placeholder: $t('account.email.placeholder'),
                                    },
                                },
                                password: {
                                    label: $t('account.password.label'),
                                    inputProps: {
                                        type: 'password',
                                        placeholder: $t('account.password.placeholder'),
                                    },
                                },
                            }"
                            @submit="changeMail"
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
