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
    const isDataProtectionCheckboxRequired = ref(configStore.get('core.loginRegistration.requireDataProtectionCheckbox') as boolean);

    const getPersonalDataForm = (customer: Schemas['Customer']): ZodObjectOrWrapped => {
        let personalDataForm = z.object({});

        // add selection of account type
        if (showAccountType.value) {
            // TODO: Rücksprache mit Nele: Kann man die Enums auch translatable machen? Evtl. Kann man Geburtstag, Country, State, Salutation auch mit Enums umsetzen?
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
            const birthday = ref(undefined);
            if(customer.birthday) {
                birthday.value = new Date(customer.birthday);
            } else {
                birthday.value = new Date(); // current date as fallback or use another default
            }

            const day = birthday.value.getDate();
            const month = birthday.value.getMonth() + 1;
            const year = birthday.value.getFullYear();
            personalDataForm = personalDataForm.extend({
                birthdayDay: z.number().optional().default(day),
                birthdayMonth: z.number().optional().default(month),
                birthdayYear: z.number().optional().default(year),
            });
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

        registerForm = getPersonalFormFields(registerForm);

        // General data
        registerForm = registerForm.extend({
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

        // Address data
        const billingAddressFields = getAddressFormFields(false, t('address.headline'));
        registerForm = registerForm.extend({
            billingAddress: billingAddressFields
        });

        // Checkbox für alternative Lieferadresse
        registerForm = registerForm.extend({
            differentShippingAddress: z.boolean().optional().default(false)
        });

        // Shipping address data
        const shippingAddressFields = getAddressFormFields(true, t('address.differentShippingAddress.headline'));
        registerForm = registerForm.extend({
            shippingAddress: shippingAddressFields
        });

        if (isDataProtectionCheckboxRequired.value) {
            registerForm = registerForm.extend({
                acceptedDataProtection: z.boolean().optional().default(false)
            });
        }

        return registerForm;
    };

    const getAddressFormFields = (includeGeneralFields: boolean, label?: string | null) => {
        let addressForm = z.object({}).describe(label);

        if(includeGeneralFields) {
            addressForm = getPersonalFormFields(addressForm);
        }

        // Address fields
        addressForm = addressForm.extend({
            street: z
                .string().optional(),
            zipcode: z
                .string().optional(),
            city: z
                .string().optional(),
        });

        // Additional data, depending on admin config -> Additional address line 1 & 2
        if(showAdditionalAddress1Field.value) {
            addressForm = addressForm.extend({
                additionalAddressLine1: z
                    .string().optional(),
            });
        }

        if(showAdditionalAddress2Field.value) {
            addressForm = addressForm.extend({
                additionalAddressLine2: z
                    .string().optional(),
            });
        }

        // Always country
        addressForm = addressForm.extend({
            countryId: z
                .string().optional(),
        });

        // Todo: Research how to solve states

        // Depending on admin config: Phone number
        if(showPhoneNumber.value) {
            addressForm = addressForm.extend({
                phoneNumber: z
                    .string().optional(),
            });
        }

        return addressForm;
    }

    const getPersonalFormFields = (form) => {
        // add selection of account type
        if (showAccountType.value) {
            form = form.extend({
                accountType: z.enum(['business', 'private']).default('private'),
            });
        }

        form = form.extend({
            salutationId: z.string().optional(),
        });

        // add title (if set in the admin)
        if (showTitle.value) {
            form = form.extend({
                title: z.string().optional(),
            });
        }

        // add fields we always have (first name, last name, email)
        form = form.extend({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
        });

        // add company and vat number (if we can select the account type)
        if (showAccountType.value) {
            form = form.extend({
                company: z.string().optional(),
                department: z.string().optional(),
                vatId: z.string().optional(),
            });
        }

        return form;
    }

    // we exclude this one because the return type is defined by shadcn
    // @ts-nocheck
    /* eslint-disable */
    const getRegisterDependencies = (): Dependency<{ [x: string]: any; }>[] => [
        // Ich require alle Felder, welche initial angezeigt werden -> Von gerneral personal data und billing adresse
        // TODO: Rücksprache mit Nele halten: Das required-* wid damit zwar angezeigt, aber das Formular kann auch so abgeschickt werden + das Error Label wird nicht angezeigt
        {
            sourceField: 'firstName',
            type: DependencyType.REQUIRES,
            targetField: 'firstName',
            when: () => true,
        },
        {
            sourceField: 'lastName',
            type: DependencyType.REQUIRES,
            targetField: 'lastName',
            when: () => true,
        },
        {
            sourceField: 'salutationId',
            type: DependencyType.REQUIRES,
            targetField: 'salutationId',
            when: () => true,
        },
        {
            sourceField: 'accountType',
            type: DependencyType.REQUIRES,
            targetField: 'company',
            when: (accountType: string) => accountType === 'business',
        },
        {
            sourceField: 'billingAddress.street',
            type: DependencyType.REQUIRES,
            targetField: 'billingAddress.street',
            when: () => true,
        },
        {
            sourceField: 'billingAddress.zipcode',
            type: DependencyType.REQUIRES,
            targetField: 'billingAddress.zipcode',
            when: () => true,
        },
        {
            sourceField: 'billingAddress.city',
            type: DependencyType.REQUIRES,
            targetField: 'billingAddress.city',
            when: () => true,
        },
        {
            sourceField: 'billingAddress.additionalAddressLine1',
            type: DependencyType.REQUIRES,
            targetField: 'billingAddress.additionalAddressLine1',
            when: () => isAdditionalAddress1FieldRequired.value,
        },
        {
            sourceField: 'billingAddress.additionalAddressLine2',
            type: DependencyType.REQUIRES,
            targetField: 'billingAddress.additionalAddressLine2',
            when: () => isAdditionalAddress2FieldRequired.value,
        },
        {
            sourceField: 'billingAddress.countryId',
            type: DependencyType.REQUIRES,
            targetField: 'billingAddress.country',
            when: () => true,
        },
        {
            sourceField: 'billingAddress.phoneNumber',
            type: DependencyType.REQUIRES,
            targetField: 'billingAddress.phoneNumber',
            when: () => isPhoneNumberRequired.value,
        },

        // Verstecke Unternehmen etc., wenn account type business ist
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
            type: DependencyType.HIDES,
            targetField: 'department',
            when: (accountType: string) => accountType !== 'business',
        },
        // Wenn die Adresse gleich bleibt, wird das Formular für abweichende Lieferadresse nicht angezeiegt TODO Naming andersrum
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.HIDES,
            targetField: 'shippingAddress',
            when: (differentShippingAddress: boolean) => !differentShippingAddress,
        },
        // Abweichende Lieferadresse: Zeige company etc nur an, wenn account type = business ist
        {
            sourceField: 'shippingAddress.accountType',
            type: DependencyType.HIDES,
            targetField: 'shippingAddress.vatId',
            when: (value) => value !== 'business',
        },
        {
            sourceField: 'shippingAddress.accountType',
            type: DependencyType.HIDES,
            targetField: 'shippingAddress.company',
            when: (value) => value !== 'business',
        },
        {
            sourceField: 'shippingAddress.accountType',
            type: DependencyType.HIDES,
            targetField: 'shippingAddress.department',
            when: (value) => value !== 'business',
        },
        // ToDo: Require alle Felder, welche required sein müssen, WENN checkbox aktiv ist (wenn man die direkt auf required & die Felder nur nicht sichtbar sinnd, setzt, wird das Formular nicht abgeschickt)
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.firstName',
            when: (differentShippingAddress: boolean) => differentShippingAddress,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.lastName',
            when: (differentShippingAddress: boolean) => differentShippingAddress,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.street',
            when: (differentShippingAddress: boolean) => differentShippingAddress,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.zipcode',
            when: (differentShippingAddress: boolean) => differentShippingAddress,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.city',
            when: (differentShippingAddress: boolean) => differentShippingAddress,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.countryId',
            when: (differentShippingAddress: boolean) => differentShippingAddress,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.additionalAddressLine1',
            when: (differentShippingAddress: boolean) => differentShippingAddress && isAdditionalAddress1FieldRequired.value,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.additionalAddressLine2',
            when: (differentShippingAddress: boolean) => differentShippingAddress && isAdditionalAddress2FieldRequired.value,
        },
        {
            sourceField: 'differentShippingAddress',
            type: DependencyType.REQUIRES,
            targetField: 'shippingAddress.phoneNumber',
            when: (differentShippingAddress: boolean) => differentShippingAddress && isPhoneNumberRequired.value,
        },
    ];

    return {
        getPersonalDataForm,
        getPersonalDataDependencies,
        getRegisterForm,
        getRegisterDependencies,
    };
};
