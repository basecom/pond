import * as z from 'zod';
import type {Schemas} from '@shopware/api-client/api-types';
import type {ZodObjectOrWrapped} from "~/components/ui/auto-form/utils";
import {DependencyType, type Dependency} from "~/components/ui/auto-form/interface";

export const usePondRegisterForm = () => {
    const configStore = useConfigStore();
    const {getSalutations} = useSalutations();
    const {t} = useI18n();

    const salutations = computed(() => getSalutations.value.map((salutation: Schemas['Salutation']) => salutation.displayName));
    const passwordMinLength = computed<number>(() => {
        return configStore.get('core.loginRegistration.passwordMinLength')
            ? Number(configStore.get('core.loginRegistration.passwordMinLength'))
            : 0
    });

    // Custom properties and refs
    const accountTypes = {
        'private': {label: t('account.register.accountTypes.private'), value: 'private'},
        'business': {label: t('account.register.accountTypes.business'), value: 'business'},
    };

    const getGeneralFieldSchema = (): z.ZodObject<any, any> => {
        let registerForm = z.object({});

        // Placeholder for the generalField header. Will be overridden in autoForm template.
        registerForm = registerForm.extend({
            headerGeneral: z.void(),
        });

        if (configStore.get('core.loginRegistration.showAccountTypeSelection')) {
            registerForm = registerForm.extend({
                accountType: z.string({
                    required_error: t('account.register.accountTypes.errorGeneral')
                })
            })
        }
        // TODO: salutation looks not right
        if (salutations.value) {
            registerForm = registerForm.extend({
                // salutation: z.enum(salutations.value).optional().default('Herr'),
                salutation: z.string({
                    required_error: t('account.register.salutations.errorGeneral'),
                }),
            });
        }
        if (configStore.get('core.loginRegistration.showTitleField')) {
            registerForm = registerForm.extend({
                title: z.string().optional(),
            })
        }
        registerForm = registerForm.extend({
            firstName: z.string({
                required_error: t('account.register.firstName.errorGeneral'),
            }),
            lastName: z.string({
                required_error: t('account.register.lastName.errorGeneral'),
            }),
            email: z
                .string({
                    required_error: t('account.register.email.errorGeneral'),
                })
                .email(t('account.register.email.errorGeneral')),
        })
        if (configStore.get('core.loginRegistration.requireEmailConfirmation')) {
            registerForm = registerForm.extend({
                confirmMail: z
                    .string({
                        required_error: t('account.register.email.errorGeneral'),
                    })
                    .email(t('account.register.email.errorGeneral'))
            })
        }
        if (configStore.get('core.loginRegistration.showBirthdayField')) {
            if (configStore.get('core.loginRegistration.birthdayFieldRequired')) {
                registerForm = registerForm.extend({
                    birthdateDay: z.number({
                        required_error: t('account.register.birthdate.errorGeneral'),
                    }),
                    birthdateMonth: z.number({
                        required_error: t('account.register.birthdate.errorGeneral'),
                    }),
                    birthdateYear: z.number({
                        required_error: t('account.register.birthdate.errorGeneral'),
                    }),
                })
            } else {
                registerForm = registerForm.extend({
                    birthdateDay: z.number().optional(),
                    birthdateMonth: z.number().optional(),
                    birthdateYear: z.number().optional(),
                })
            }
        }
        if (configStore.get('core.loginRegistration.showAccountTypeSelection')) {
            registerForm = registerForm.extend({
                company: z.string({
                    required_error: t('account.register.company.errorGeneral'),
                }),
                department: z.string({
                    required_error: t('account.register.department.errorGeneral'),
                }),
                vatNumber: z.string()
            })
        }
        registerForm = registerForm.extend({
            password: z
                .string({
                    required_error: t('account.register.password.error.general'),
                })
                .min(
                    passwordMinLength.value,
                    t('account.register.password.error.minLength', {length: passwordMinLength.value})
                ),
        })
        if (configStore.get('core.loginRegistration.requirePasswordConfirmation')) {
            registerForm = registerForm.extend({
                confirmPassword: z.string({
                    required_error: t('account.register.password.confirm.errorGeneral'),
                })
            })
        }
        registerForm = registerForm.extend({
            headerAddress: z.void()
        });
        registerForm = registerForm.extend({
            street: z
                .string({
                    required_error: t('account.register.address.error.required')
                })
                .min(3, t('account.register.address.error.general'))
                .regex(
                    /^(\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\s[A-Za-zÄÖÜäöüß\s-]+|\b[A-Za-zÄÖÜäöüß\s-]+\s\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\b)$/,
                    t('account.register.address.error.general')
                ),
            zipcode: z
                .string({
                    required_error: t('account.register.postalCode.error.required'),
                })
                .regex(/^\d{5}$/, t('account.register.postalCode.error.general')),
            city: z
                .string({
                    required_error: t('account.register.city.error.required'),
                })
                .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, t('account.register.city.error.general')),
        });
        if (configStore.get('core.loginRegistration.showAdditionalAddressField1')) {
            if (configStore.get('core.loginRegistration.additionalAddressField1Required')) {
                registerForm = registerForm.extend({
                    additionalAddressLine1: z.string({
                        required_error: t('account.register.additionalAddressLine1.error.required'),
                    })
                })
            } else {
                registerForm = registerForm.extend({
                    additionalAddressLine1: z.string().optional()
                })
            }
        }
        if (configStore.get('core.loginRegistration.showAdditionalAddressField2')) {
            if (configStore.get('core.loginRegistration.additionalAddressField2Required')) {
                registerForm = registerForm.extend({
                    additionalAddressLine2: z.string({
                        required_error: t('account.register.additionalAddressLine2.error.required'),
                    })
                })
            } else {
                registerForm = registerForm.extend({
                    additionalAddressLine2: z.string().optional()
                })
            }
        }
        registerForm = registerForm.extend({
            countryId: z.string({
                required_error: t('account.register.country.error.required'),
            }),
            countryState: z.string().optional(),
        })
        if (configStore.get('core.loginRegistration.showPhoneNumberField')) {
            if (configStore.get('core.loginRegistration.phoneNumberFieldRequired')) {
                registerForm = registerForm.extend({
                    phoneNumber: z.string({
                        required_error: t('account.register.phone.error.required')
                    })
                        .regex(
                            /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                            t('account.register.phone.error.general')
                        )
                })
            } else {
                registerForm = registerForm.extend({
                    phoneNumber: z.string()
                        .regex(
                            /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                            t('account.register.phone.error.general')
                        )
                        .optional()
                })
            }
        }

        registerForm = registerForm.extend({
            shippingAddressVaries: z.boolean().optional(),
        })

        return registerForm;
    }

    // TODO: Duplicated Schemas due non customization of nested zod fields in autoForm. Is there a better way?
    const getAddressSchema = () => {
        let addressForm = z.object({});

        addressForm = addressForm.extend({
            addressHeader: z.string()
        })

        if (configStore.get('core.loginRegistration.showAccountTypeSelection')) {
            addressForm = addressForm.extend({
                addressAccountType: z.string({
                    required_error: t('account.register.accountTypes.errorGeneral')
                })
            })
        }
        if (salutations.value) {
            addressForm = addressForm.extend({
                addressSalutationId: z.string({
                    required_error: t('account.register.salutations.errorGeneral'),
                }),
            })
        }
        if (configStore.get('core.loginRegistration.showTitleField')) {
            addressForm = addressForm.extend({
                addressTitle: z.string().optional()
            })
        }
        addressForm = addressForm.extend({
            addressFirstName: z.string({
                required_error: t('account.register.firstName.errorGeneral'),
            }),
            addressLastName: z.string({
                required_error: t('account.register.lastName.errorGeneral'),
            })
        })
        if (configStore.get('core.loginRegistration.showAccountTypeSelection')) {
            addressForm = addressForm.extend({
                addressCompany: z.string({
                    required_error: t('account.register.company.errorGeneral'),
                }),
                addressDepartment: z.string({
                    required_error: t('account.register.department.errorGeneral'),
                })
            })
        }
        addressForm = addressForm.extend({
            addressStreet: z
                .string({
                    required_error: t('account.register.address.error.required')
                })
                .min(3, t('account.register.address.error.general'))
                .regex(
                    /^(\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\s[A-Za-zÄÖÜäöüß\s-]+|\b[A-Za-zÄÖÜäöüß\s-]+\s\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\b)$/,
                    t('account.register.address.error.general')
                ),
            addressZipcode: z
                .string({
                    required_error: t('account.register.postalCode.error.required'),
                })
                .regex(/^\d{5}$/, t('account.register.postalCode.error.general')),
            addressCity: z
                .string({
                    required_error: t('account.register.city.error.required'),
                })
                .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, t('account.register.city.error.general')),
        })
        if (configStore.get('core.loginRegistration.showAdditionalAddressField1')) {
            if (configStore.get('core.loginRegistration.additionalAddressField1Required')) {
                addressForm = addressForm.extend({
                    addressAdditionalAddressLine1: z.string({
                        required_error: t('account.register.additionalAddressLine1.error.required'),
                    })
                })
            } else {
                addressForm = addressForm.extend({
                    addressAdditionalAddressLine1: z.string().optional()
                })
            }
        }
        if (configStore.get('core.loginRegistration.showAdditionalAddressField2')) {
            if (configStore.get('core.loginRegistration.additionalAddressField2Required')) {
                addressForm = addressForm.extend({
                    addressAdditionalAddressLine2: z.string({
                        required_error: t('account.register.additionalAddressLine2.error.required'),
                    })
                })
            } else {
                addressForm = addressForm.extend({
                    addressAdditionalAddressLine2: z.string().optional()
                })
            }
        }
        addressForm = addressForm.extend({
            addressCountryId: z.string({
                required_error: t('account.register.country.error.required'),
            }),
            addressCountryState: z.string().optional(),
        })
        if (configStore.get('core.loginRegistration.showPhoneNumberField')) {
            if (configStore.get('core.loginRegistration.phoneNumberFieldRequired')) {
                addressForm = addressForm.extend({
                    addressPhoneNumber: z.string({
                        required_error: t('account.register.phone.error.required')
                    })
                        .regex(
                            /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                            t('account.register.phone.error.general')
                        )
                })
            } else {
                addressForm = addressForm.extend({
                    addressPhoneNumber: z.string()
                        .regex(
                            /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                            t('account.register.phone.error.general')
                        )
                        .optional()
                })
            }
        }

        return addressForm;
    }

    const getRegisterSchema = (): ZodObjectOrWrapped => {
        const schema = getGeneralFieldSchema()
            .merge(getAddressSchema())
            .merge(z.object({
                acceptedDataProtection: z.boolean({
                    required_error: t('account.register.tos.errorGeneral')
                })
            }))

        // TODO: SuperRefine wont work, refine wasn't tested yet
        return schema.superRefine((data, context) => {
            if (configStore.get('core.loginRegistration.requirePasswordConfirmation')) {
                if (!data.confirmPassword || data.confirmPassword === '' || data.password !== data.confirmPassword) {
                    console.log(data.password, data.confirmPassword);
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t('account.register.password.confirm.errorGeneral'),
                        path: ['confirmPassword']
                    })
                }
            }
            if (configStore.get('core.loginRegistration.requireEmailConfirmation')) {
                if (data.email !== data.confirmMail) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t('account.register.email.confirm.errorGeneral'),
                        path: ['confirmMail']
                    })
                }
            }
        });
    }

    // we exclude this one because the return type is defined by shadcn
    // @ts-nocheck
    /* eslint-disable */
    const getRegisterDependencies = (): Dependency<{ [x: string]: any; }>[] => [
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'company',
            when: (accountType: string) =>
                accountType !== accountTypes.business.value
        },
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'department',
            when: (accountType: string) =>
                accountType !== accountTypes.business.value
        },
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'vatNumber',
            when: (accountType: string) =>
                accountType !== accountTypes.business.value
        },
        {
            sourceField: 'addressAccountType',
            type: DependencyType.HIDES,
            targetField: 'addressCompany',
            when: (accountType: string) =>
                accountType !== accountTypes.business.value
        },
        {
            sourceField: 'addressAccountType',
            type: DependencyType.HIDES,
            targetField: 'addressDepartment',
            when: (accountType: string) =>
                accountType !== accountTypes.business.value
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressHeader',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressAccountType',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressSalutationId',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressTitle',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressFirstName',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressLastName',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressCompany',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressDepartment',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressStreet',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressZipcode',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressCity',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressAdditionalAddressLine1',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressAdditionalAddressLine2',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressCountryId',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressCountryState',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        },
        {
            sourceField: 'shippingAddressVaries',
            type: DependencyType.HIDES,
            targetField: 'addressPhoneNumber',
            when: (shippingAddressVaries: boolean) =>
                !shippingAddressVaries
        }
    ];

    const getRegisterFieldConfig = {
        title: {
            label: t('account.register.title.label'),
            inputProps: {
                placeholder: t('account.register.title.placeholder'),
            }
        },
        firstName: {
            label: t('account.register.firstName.label'),
            inputProps: {
                placeholder: t('account.register.firstName.placeholder'),
            }
        },
        lastName: {
            label: t('account.register.lastName.label'),
            inputProps: {
                placeholder: t('account.register.lastName.placeholder'),
            }
        },
        email: {
            label: t('account.register.email.label'),
            inputProps: {
                placeholder: t('account.register.email.placeholder'),
            }
        },
        confirmMail: {
            label: t('account.register.email.confirm.label'),
            inputProps: {
                placeholder: t('account.register.email.confirm.placeholder'),
            }
        },
        birthdateDay: {
            label: t('account.register.birthdate.label'),
        },
        company: {
            label: t('account.register.company.label'),
            inputProps: {
                placeholder: t('account.register.company.placeholder'),
            }
        },
        department: {
            label: t('account.register.department.label'),
            inputProps: {
                placeholder: t('account.register.department.placeholder'),
            }
        },
        vatNumber: {
            label: t('account.register.vatNumber.label'),
            inputProps: {
                placeholder: t('account.register.vatNumber.placeholder'),
            }
        },
        password: {
            label: t('account.register.password.label'),
            inputProps: {
                placeholder: t('account.register.password.placeholder'),
            }
        },
        confirmPassword: {
            label: t('account.register.password.confirm.label'),
            inputProps: {
                placeholder: t('account.register.password.confirm.placeholder'),
            }
        },
        street: {
            label: t('account.register.address.label'),
            inputProps: {
                placeholder: t('account.register.address.placeholder'),
            }
        },
        zipcode: {
            label: t('account.register.postalCode.label'),
            inputProps: {
                placeholder: t('account.register.postalCode.placeholder'),
            }
        },
        city: {
            label: t('account.register.city.label'),
            inputProps: {
                placeholder: t('account.register.city.placeholder'),
            }
        },
        additionalAddressLine1: {
            label: t('account.register.additionalAddressLine1.label'),
            inputProps: {
                placeholder: t('account.register.additionalAddressLine1.placeholder'),
            }
        },
        additionalAddressLine2: {
            label: t('account.register.additionalAddressLine2.label'),
            inputProps: {
                placeholder: t('account.register.additionalAddressLine2.placeholder'),
            }
        },
        phoneNumber: {
            label: t('account.register.phone.label'),
            inputProps: {
                placeholder: t('account.register.phone.placeholder'),
            }
        },
        shippingAddressVaries: {
            label: t('account.register.differentShippingAddress')
        },
        addressHeader: {
            hideLabel: true
        },
        addressAccountType: {
            label: t('account.register.accountTypes.label'),
            inputProps: {
                placeholder: t('account.register.accountTypes.placeholder'),
            }
        },
        addressSalutationId: {
            label: t('account.register.salutations.label'),
            inputProps: {
                placeholder: t('account.register.salutations.placeholder'),
            }
        },
        addressTitle: {
            label: t('account.register.title.label'),
            inputProps: {
                placeholder: t('account.register.title.placeholder'),
            }
        },
        addressFirstName: {
            label: t('account.register.firstName.label'),
            inputProps: {
                placeholder: t('account.register.firstName.placeholder'),
            }
        },
        addressLastName: {
            label: t('account.register.lastName.label'),
            inputProps: {
                placeholder: t('account.register.lastName.placeholder'),
            }
        },
        addressCompany: {
            label: t('account.register.company.label'),
            inputProps: {
                placeholder: t('account.register.company.placeholder'),
            }
        },
        addressDepartment: {
            label: t('account.register.department.label'),
            inputProps: {
                placeholder: t('account.register.department.placeholder'),
            }
        },
        addressStreet: {
            label: t('account.register.address.label'),
            inputProps: {
                placeholder: t('account.register.address.placeholder'),
            }
        },
        addressZipcode: {
            label: t('account.register.postalCode.label'),
            inputProps: {
                placeholder: t('account.register.postalCode.placeholder'),
            }
        },
        addressCity: {
            label: t('account.register.city.label'),
            inputProps: {
                placeholder: t('account.register.city.placeholder'),
            }
        },
        addressAdditionalAddressLine1: {
            label: t('account.register.additionalAddressLine1.label'),
            inputProps: {
                placeholder: t('account.register.additionalAddressLine1.placeholder'),
            }
        },
        addressAdditionalAddressLine2: {
            label: t('account.register.additionalAddressLine2.label'),
            inputProps: {
                placeholder: t('account.register.additionalAddressLine2.placeholder'),
            }
        },
        addressCountryId: {
            label: t('account.register.country.label'),
            inputProps: {
                placeholder: t('account.register.country.placeholder'),
            }
        },
        addressCountryState: {
            hideLabel: true
        },
        addressPhoneNumber: {
            label: t('account.register.phone.label'),
            inputProps: {
                placeholder: t('account.register.phone.placeholder'),
            }
        },
        acceptedDataProtection: {
            label: t('account.register.tos.label'),
        }
    }

    return {
        accountTypes,
        getRegisterSchema,
        getRegisterDependencies,
        getRegisterFieldConfig
    }
}