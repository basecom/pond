export type AddressVueFormSubmitValue = {
    data: AddressData;
}

export type AddressData = {
    accountType?: string,
    additionalAddressLine1?: string | null,
    additionalAddressLine2?: string | null
    city: string,
    company?: string | null
    countryId: string,
    department?: string | null
    firstName: string,
    lastName: string,
    phoneNumber?: string | null,
    salutationId: string,
    countryStateId?: string | null,
    street: string,
    title?: string | null
    zipcode: string
}
