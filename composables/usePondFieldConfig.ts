export const usePondFieldConfig = () => {
    const { t } = useI18n();

    const getPersonalDataFieldConfig = () => {
        const fieldConfig = ref({
            accountType: { label: t('account.customer.accountType') },
            salutationId: { label: t('account.customer.salutation')},
            title: { label: t('account.customer.title.label'), inputProps: {
                type: 'text',
                placeholder: t('account.customer.title.placeholder'),
            } },
            firstName: {
                label: t('account.customer.firstName.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('account.customer.firstName.placeholder'),
                },
            },
            lastName: {
                label: t('account.customer.lastName.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('account.customer.lastName.placeholder'),
                },
            },
            email: {
                label: t('account.customer.mail.label'),
                inputProps: {
                    type: 'email',
                    placeholder: t('account.customer.mail.placeholder'),
                    autocomplete: 'username',
                },
            },
            emailConfirmation: {
                label: t('account.customer.mail.confirm.label'),
                inputProps: {
                    type: 'email',
                    placeholder: t('account.customer.mail.confirm.placeholder'),
                },
            },
            company: {
                label: t('account.customer.company.label'),
                inputProps: {
                    type: 'string',
                    placeholder: t('account.customer.company.placeholder'),
                },
            },
            department: {
                label: t('account.customer.department.label'),
                inputProps: {
                    type: 'string',
                    placeholder: t('account.customer.department.placeholder'),
                },
            },
            vatId: {
                label: t('account.customer.vatId.label'),
                inputProps: {
                    type: 'string',
                    placeholder: t('account.customer.vatId.placeholder'),
                },
            },
            password: {
                label: t('account.register.password.label'),
                inputProps: {
                    type: 'password',
                    placeholder: t('account.register.password.placeholder'),
                    autocomplete: 'current-password',
                },
            },
            confirmPassword: {
                label: t('account.register.password.confirm'),
                inputProps: {
                    type: 'password',
                    placeholder: t('account.register.password.placeholder'),
                    autocomplete: 'current-password',
                },
            },
        });

        return fieldConfig.value;
    };

    const getAddressFieldConfig = (includePersonalFieldConfig: boolean) => {
        const fieldConfig = ref({
            street: {
                label: t('address.street.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('address.street.placeholder'),
                },
            },
            additionalAddress1: {
                label: t('address.additionalAddress1.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('address.additionalAddress1.placeholder'),
                },
            },
            additionalAddress2: {
                label: t('address.additionalAddress2.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('address.additionalAddress2.placeholder'),
                },
            },
            zipCode: {
                label: t('address.zipCode.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('address.zipCode.placeholder'),
                },
            },
            city: {
                label: t('address.city.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('address.city.placeholder'),
                },
            },
            countryId: {
                label: t('address.country.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('address.country.placeholder'),
                },
            },
            phone: {
                label: t('address.phone.label'),
                inputProps: {
                    type: 'text',
                    placeholder: t('address.phone.placeholder'),
                },
            },
        });

        if(includePersonalFieldConfig) {
            fieldConfig.value = {
                ...fieldConfig.value,
                ...getPersonalDataFieldConfig(),
            };
        }

        return fieldConfig.value;
    };

    return {
        getPersonalDataFieldConfig,
        getAddressFieldConfig,
    };
};
