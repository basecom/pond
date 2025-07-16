import * as z from 'zod';
import type { Schemas } from '@shopware/api-client/api-types';
import { DependencyType  } from '../components/ui/auto-form/interface';
import type {Dependency} from '../components/ui/auto-form/interface';
import type { ZodObjectOrWrapped } from '~/components/ui/auto-form/utils';

export const usePondForm = () => {
    const configStore = useConfigStore();

    const getPersonalDataForm = (customer: Schemas['Customer']): ZodObjectOrWrapped => {
        let personalDataForm = z.object({});

        // add selection of account type
        const showAccountType = configStore.get('core.loginRegistration.showAccountTypeSelection') as boolean;
        if (showAccountType) {
            personalDataForm = personalDataForm.extend({
                accountType: z.enum(['business', 'private']).optional().default(customer.accountType),
            });
        }

        personalDataForm = personalDataForm.extend({
            salutationId: z.string().optional(),
        });

        // add title (if set in the admin)
        const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
        if (showTitle) {
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
        if (showAccountType) {
            const companyName = customer.accountType === 'business' ? customer.company : '';
            const vatIds = customer.accountType === 'business' ? customer.vatIds?.join(', ') : '';
            personalDataForm = personalDataForm.extend({
                company: z.string().default(companyName),
                vatIds: z.string().optional().default(vatIds),
            });
        }

        // add birthday (if set in the admin)
        const showBirthday = configStore.get('core.loginRegistration.showBirthdayField') as boolean;
        if (showBirthday) {
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
            targetField: 'vatIds',
            when: (accountType: string) => accountType !== 'business',
        },
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'company',
            when: (accountType: string) => accountType !== 'business',
        },
    ];

    return {
        getPersonalDataForm,
        getPersonalDataDependencies,
    };
};