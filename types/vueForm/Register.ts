export type VueFormSubmitData = {
    data: VueFormRequestData;
}

export type VueFormRequestData = {
    acceptedDataProtection: boolean;
    accountType: string;
    additionalAddressLine1?: string;
    additionalAddressLine2?: string;
    birthdayDay?: number;
    birthdayMonth?: number;
    birthdayYear?: number;
    company?: string;
    city: string;
    countryId: string
    differentShippingAddress: boolean;
    email: string;
    email_confirmation?: string;
    firstName: string
    lastName: string
    password: string;
    password_confirmation?: string;
    phoneNumber: string;
    salutation: string;
    'shipping-accountType': string;
    'shipping-additionalAddressLine1'?: string;
    'shipping-additionalAddressLine2'?: string;
    'shipping-city': string;
    'shipping-countryId': string;
    'shipping-firstName': string;
    'shipping-lastName': string;
    'shipping-phoneNumber': string;
    'shipping-salutation': string;
    'shipping-state': string;
    'shipping-street': string;
    'shipping-title'?: string;
    'shipping-zipcode': string;
    'shipping-company'?: string;
    'shipping-department'?: string;
    department?: string;
    state: string;
    street: string;
    title?: string;
    zipcode: string;
    vatIds?: string;
}

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    title?: string | null;
    accountType: string;
    birthdayDay?: number;
    birthdayMonth?: number;
    birthdayYear?: number;
    email: string;
    password: string;
    company?: string | null;
    acceptedDataProtection: boolean;
    differentShippingAddress: boolean;
    salutationId: string;
    vatIds?: string[];
    billingAddress: {
        title?: string,
        firstName: string
        lastName: string,
        street: string,
        zipcode: string,
        countryId: string,
        city: string,
        countryStateId: string,
        additionalAddressLine1?: string | null,
        additionalAddressLine2?: string | null,
        phoneNumber?: string | null,
        company?: string | null,
        department?: string | null,
        salutationId: string,
    },
    shippingAddress?: {
        accountType: string;
        title?: string,
        firstName: string
        lastName: string,
        street: string,
        zipcode: string,
        countryId: string,
        city: string,
        countryStateId: string,
        additionalAddressLine1?: string | null,
        additionalAddressLine2?: string | null,
        phoneNumber?: string | null,
        company?: string | null,
        department?: string | null,
        salutationId: string,
    }
}
