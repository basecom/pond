export function usePondPrice() {
    const { currency } = useSessionContext();
    const { locale } = useI18n();

    const getFormattedPrice = (value: number) => new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: currency.value?.isoCode,
    }).format(+value);

    return { getFormattedPrice };
}
