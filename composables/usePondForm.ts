import * as z from 'zod';
import type { Schemas } from '@shopware/api-client/api-types';
import { DependencyType, type Dependency } from '../components/ui/auto-form/interface';
import type { ZodObjectOrWrapped } from '~/components/ui/auto-form/utils';

export const usePondForm = () => {
    const configStore = useConfigStore();
    const { t } = useI18n();
    // Admin configurations
    const showAccountType = ref(configStore.get('core.loginRegistration.showAccountTypeSelection') as boolean);
    const showTitle = ref(configStore.get('core.loginRegistration.showTitleField') as boolean);
    const confirmEmail = ref(configStore.get('core.loginRegistration.requireEmailConfirmation') as boolean);
    const showBirthday = ref(configStore.get('core.loginRegistration.showBirthdayField') as boolean);
    const isBirthdayRequired = ref(configStore.get('core.loginRegistration.birthdayFieldRequired') as boolean);
    const confirmPassword = ref(configStore.get('core.loginRegistration.requirePasswordConfirmation') as boolean);
    const showAdditionalAddress1Field = ref(configStore.get('core.loginRegistration.showAdditionalAddressField1') as boolean);
    const isAdditionalAddress1FieldRequired = ref(configStore.get('core.loginRegistration.additionalAddressField1Required') as boolean);
    const showAdditionalAddress2Field = ref(configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean);
    const isAdditionalAddress2FieldRequired = ref(configStore.get('core.loginRegistration.additionalAddressField2Required') as boolean);
    const showPhoneNumber = ref(configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean);
    const isPhoneNumberRequired = ref(configStore.get('core.loginRegistration.additionalAddressField2Required') as boolean);

    const getPersonalDataForm = (customer: Schemas['Customer']): ZodObjectOrWrapped => {
        let personalDataForm = z.object({});

        // add selection of account type
        if (showAccountType.value) {
            personalDataForm = personalDataForm.extend({
                accountType: z.enum(['business', 'private']).optional().default(customer.accountType),
            });
        }

        personalDataForm = personalDataForm.extend({
            salutationId: z.string().optional(),
        });

        // add title (if set in the admin)
        if (showTitle.value) {
            personalDataForm = personalDataForm.extend({
                title: z.string().optional().default(customer.title ?? ''),
            });
        }

        // add fields we always have (first name, last name)
        personalDataForm = personalDataForm.extend({
            firstName: z.string().default(customer.firstName),
            lastName: z.string().default(customer.lastName),
        });

        // add company and vat number (if we can select the account type)
        if (showAccountType.value) {
            const companyName = customer.accountType === 'business' ? customer.company : '';
            const vatIds = customer.accountType === 'business' ? customer.vatIds?.join(', ') : '';
            personalDataForm = personalDataForm.extend({
                company: z.string().default(companyName),
                'vatIds[]': z.string().optional().default(vatIds),
            });
        }

        // add birthday (if set in the admin)
        if (showBirthday.value) {
            if (customer.birthday) {
                const birthday = new Date(customer.birthday);
                const day = birthday.getDate();
                const month = birthday.getMonth() + 1;
                const year = birthday.getFullYear();
                personalDataForm = personalDataForm.extend({
                    birthdayDay: z.number().optional().default(day),
                    birthdayMonth: z.number().optional().default(month),
                    birthdayYear: z.number().optional().default(year),
                });
            } else {
                personalDataForm = personalDataForm.extend({
                    birthdayDay: z.number().optional(),
                    birthdayMonth: z.number().optional(),
                    birthdayYear: z.number().optional(),
                });
            }
        }

        return personalDataForm;
    };

    // we exclude this one because the return type is defined by shadcn
    // @ts-nocheck
    /* eslint-disable */
    const getPersonalDataDependencies = (): Dependency<{ [x: string]: any; }>[] => [
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'vatIds[]',
            when: (accountType: string) => accountType !== 'business',
        },
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'company',
            when: (accountType: string) => accountType !== 'business',
        },
    ];

    const getRegisterForm = (): ZodObjectOrWrapped => {
        let registerForm = z.object({});

        // add selection of account type
        if (showAccountType.value) {
            registerForm = registerForm.extend({
                accountType: z.enum(['business', 'private']).default('private'),
            });
        }

        registerForm = registerForm.extend({
            salutationId: z.string(),
        });

        // add title (if set in the admin)
        if (showTitle.value) {
            registerForm = registerForm.extend({
                title: z.string().optional(),
            });
        }

        // add fields we always have (first name, last name, email)
        registerForm = registerForm.extend({
            firstName: z.string({
                required_error: t('account.customer.firstName.errorGeneral'),
            }),
            lastName: z.string({
                required_error: t('account.customer.lastName.errorGeneral'),
            }),
            email: z.string({
                        required_error: t('account.customer.mail.error'),
                    },
                )
                .email(),
        });

        // Confirm e-mail address
        if(confirmEmail.value) {
            registerForm = registerForm.extend({
                emailConfirmation: z
                    .string({
                        required_error: t('account.customer.mail.error'),
                    })
                    .email(),
            });
        }

        // add birthday (if set in the admin)
        if (showBirthday.value && !isBirthdayRequired.value) {
            registerForm = registerForm.extend({
                birthdayDay: z.number().optional(),
                birthdayMonth: z.number().optional(),
                birthdayYear: z.number().optional(),
            });
        }

        if (showBirthday.value && isBirthdayRequired.value) {
            registerForm = registerForm.extend({
                birthdayDay: z.number({
                    required_error: t('account.customer.birthday.errorGeneral'),
                }),
                birthdayMonth: z.number({
                    required_error: t('account.customer.birthday.errorGeneral'),
                }),
                birthdayYear: z.number({
                    required_error: t('account.customer.birthday.errorGeneral'),
                }),
            });
        }

        // add company and vat number (if we can select the account type)
        if (showAccountType.value) {
            // Refine ist notwendig, damit das requires-dependencies funktioniert
            registerForm = registerForm.extend({
                company: z.string().optional(),
                department: z.string().optional().default(''),
                vatId: z.string().optional().default(''),
            });
        }

        // password
        registerForm = registerForm.extend({
            password: z
                .string({
                    required_error: t('account.register.password.errorGeneral'),
                }),
        });

        // confirm password
        if(confirmPassword.value) {
            registerForm = registerForm.extend({
                confirmPassword: z
                    .string({
                        required_error: t('account.register.password.errorGeneral'),
                    }),
            });
        }

        registerForm = registerForm.extend({
            street: z
                .string({
                    required_error: t('account.register.password.errorGeneral'),
                }),
        });

        // Nest register form with address form fields

        //registerForm = registerForm.extend({addresses: getAddressFormFields()});

        return registerForm;
    };

    // we exclude this one because the return type is defined by shadcn
    // @ts-nocheck
    /* eslint-disable */
    const getRegisterDependencies = (): Dependency<{ [x: string]: any; }>[] => [
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'vatId',
            when: (accountType: string) => accountType !== 'business',
        },
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'company',
            when: (accountType: string) => accountType !== 'business',
        },
        {
            sourceField: 'accountType',
            type: DependencyType.REQUIRES,
            targetField: 'company',
            when: (accountType: string) => accountType === 'business',
        },
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'department',
            when: (accountType: string) => accountType !== 'business',
        },
    ];

    const getAddressFormFields = (): ZodObjectOrWrapped => {
        let addressFormFields = z.object({});

        addressFormFields = addressFormFields.extend({
            street: z
                .string({
                    required_error: t('account.register.street.errorGeneral'),
                }),
            zipCode: z
                .string({
                    required_error: t('account.register.zipCode.errorGeneral'),
                }),
            city: z
                .string({
                    required_error: t('account.register.city.errorGeneral'),
                }),
        });

        // Additional data, depending on admin config -> Additional address line 1 & 2
        if(showAdditionalAddress1Field.value && !isAdditionalAddress1FieldRequired.value) {
            addressFormFields = addressFormFields.extend({
                additionalAddress1: z
                    .string().optional(),
            });
        }

        if(showAdditionalAddress1Field.value && isAdditionalAddress1FieldRequired.value) {
            addressFormFields = addressFormFields.extend({
                additionalAddress1: z
                    .string({
                        required_error: t('account.register.password.errorGeneral'),
                    }),
            });
        }

        if(showAdditionalAddress2Field.value && !isAdditionalAddress2FieldRequired.value) {
            addressFormFields = addressFormFields.extend({
                additionalAddress2: z
                    .string().optional(),
            });
        }

        if(showAdditionalAddress2Field.value && isAdditionalAddress2FieldRequired.value) {
            addressFormFields = addressFormFields.extend({
                additionalAddress2: z
                    .string({
                        required_error: t('account.register.password.errorGeneral'),
                    }),
            });
        }

        // Always country
        addressFormFields = addressFormFields.extend({
            country: z
                .string({
                    required_error: t('account.register.password.errorGeneral'),
                }),
        });

        // Todo: Research how to solve states

        // Depending on admin config: Phone number
        if(showPhoneNumber.value && !isPhoneNumberRequired.value) {
            addressFormFields = addressFormFields.extend({
                phone: z
                    .string().optional(),
            });
        }

        if(showPhoneNumber.value && isPhoneNumberRequired.value) {
            addressFormFields = addressFormFields.extend({
                phone: z
                    .string({
                        required_error: t('account.register.password.errorGeneral'),
                    }),
            });
        }

        return addressFormFields;
    }

    return {
        getPersonalDataForm,
        getPersonalDataDependencies,
        getRegisterForm,
        getRegisterDependencies,
        getAddressFormFields
    };
};
