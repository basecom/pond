import type { FormKitNode } from '@formkit/core';

/**
 * @privateRemarks
 * This file was generated by the FormKit CLI and should not be manually
 * edited unless you’d like to "eject" from the CLI’s ability to update it.
 *
 * @checksum - f3ff32fcda0a82c09dbc6c7cf793d8bcdc83fff69d9310fcc7772cd6f4d5a773
 * @variables -
 * @theme - regenesis
 **/

/**
 * This is the theme function itself, it should be imported and used as the
 * config.rootClasses function. For example:
 *
 * ```js
 * import { theme } from './formkit.theme'
 * import { defineFormKitConfig } from '@formkit/vue'
 *
 * export default defineFormKitConfig({
 *   config: {
 *     rootClasses: theme
 *   }
 * })
 * ```
 **/
export function rootClasses(sectionName: string, node: FormKitNode): Record<string, boolean> {
    const key = `${node.props.type}__${sectionName}`;
    const semanticKey = `formkit-${sectionName}`;
    const familyKey = node.props.family ? `family:${node.props.family}__${sectionName}` : '';
    const memoKey = `${key}__${familyKey}`;
    if (!(memoKey in classes)) {
        const sectionClasses = classes[key] ?? globals[sectionName] ?? {};
        sectionClasses[semanticKey] = true;
        if (familyKey in classes) {
            classes[memoKey] = { ...classes[familyKey], ...sectionClasses };
        } else {
            classes[memoKey] = sectionClasses;
        }
    }
    return classes[memoKey] ?? { [semanticKey]: true };
}

/**
 * These classes have already been merged with globals using tailwind-merge
 * and are ready to be used directly in the theme.
 **/
const classes: Record<string, Record<string, boolean>> = {
    'family:button__wrapper': {},
    'family:button__input': {
        'w-full': true,
        flex: true,
        relative: true,
        'justify-center': true,
        'gap-2': true,
        'py-2': true,
        'px-4': true,
        rounded: true,
        border: true,
        'border-brand-primary': true,
        'text-brand-primary': true,
        'text-bold': true,
        'hover:border-brand-primary-dark': true,
        'hover:text-brand-primary-dark': true,
        'disabled:!cursor-not-allowed': true,
        'disabled:bg-gray-light': true,
        'disabled:border-gray': true,
        'disabled:text-gray': true,
    },
    'family:box__wrapper': {
        'inline-flex': true,
        'items-center': true,
        'mb-1': true,
        'group-data-[multiple]:mb-0': true,
    },
    'family:box__legend': {},
    'family:box__input': {
        'appearance-none': true,
        // peer is needed to access styling attributes like peer-checked or peer-disabled
        peer: true,
        'pointer-events-none': true,
        absolute: true,
    },
    'family:box__decorator': {
        'mr-1.5': true,
        'bg-white': true,
        relative: true,
        block: true,
        'w-4': true,
        'aspect-square': true,
        border: true,
        'border-black': true,
        'text-transparent': true,
        'select-none': true,
        'group-data-[disabled]:!cursor-not-allowed': true,
        'peer-checked:border-brand-primary': true,
        'peer-checked:bg-brand-primary': true,
        'peer-checked:text-white': true,
        'peer-focus-visible:ring-2': true,
        'peer-focus-visible:ring-offset-1': true,
        'peer-disabled:bg-gray-light': true,
        'peer-disabled:border-gray': true,
        'peer-disabled:peer-checked:border-gray': true,
        'peer-disabled:text-gray-light': true,
        'peer-disabled:peer-checked:text-gray': true,
        'peer-disabled:cursor-not-allowed': true,
    },
    'family:box__decoratorIcon': {
        absolute: true,
        'left-1/2': true,
        'top-1/2': true,
        flex: true,
        'h-full': true,
        'w-full': true,
        '-translate-x-1/2': true,
        '-translate-y-1/2': true,
    },
    'family:box__option': {},
    'family:box__label': {},
    'family:box__optionHelp': {},
    'family:box__help': {},
    'family:text__wrapper': {},
    'family:text__label': {
        '!bg-transparent': true,
        'before:absolute': true,
        'before:h-1/2': true,
        'before:bg-white': true,
        'before:w-full': true,
        'before:bottom-0': true,
        'before:left-0': true,
        'before:z-[-1]': true,
    },
    'family:text__inner': {
        border: true,
        'border-gray-dark': true,
        'bg-white': true,
        rounded: true,
        'p-2': true,
        'gap-2': true,
        flex: true,
        'focus-within:ring-1': true,
        'focus-within:ring-brand-primary': true,
        'focus-within:border-brand-primary': true,
        'items-inner': true,
        'group-data-[invalid]:border-status-danger': true,
        'group-data-[disabled]:border-gray': true,
        'group-data-[disabled]:text-gray': true,
        'group-data-[disabled]:bg-gray-light': true,
    },
    'family:text__input': {
        'group-data-[disabled]:bg-gray-light': true,
        peer: true,
    },
    'family:text__prefixIcon': {},
    'family:text__suffixIcon': {},
    'family:dropdown__wrapper': {},
    'family:dropdown__inner': {},
    'family:dropdown__input': {},
    'family:dropdown__listboxButton': {},
    'family:dropdown__removeSelection': {},
    'family:dropdown__controlLabel': {},
    'family:dropdown__selectIcon': {},
    'family:dropdown__closeIcon': {},
    'family:dropdown__prefixIcon': {},
    'family:dropdown__suffixIcon': {},
    'family:dropdown__dropdownWrapper': {},
    'family:dropdown__listitemGroup': {},
    'family:dropdown__groupLabel': {},
    'family:dropdown__listbox': {},
    'family:dropdown__listitem': {},
    'family:dropdown__selectedIcon': {},
    'family:dropdown__option': {},
    'family:dropdown__loadMore': {},
    'family:dropdown__loadMoreInner': {},
    'family:dropdown__selectionWrapper': {},
    'family:dropdown__selection': {},
    'family:dropdown__tagsWrapper': {},
    'family:dropdown__tagWrapper': {},
    'family:dropdown__tags': {},
    'family:dropdown__tag': {},
    'family:dropdown__tagLabel': {},
    'family:dropdown__emptyMessage': {},
    button__input: {},
    checkbox__decorator: {
        rounded: true,
    },
    checkbox__decoratorIcon: {
        'max-w-[66.66%]': true,
    },
    color__inner: {},
    color__input: {},
    color__prefixIcon: {},
    color__suffixIcon: {},
    date__input: {},
    'datetime-local__input': {},
    file__fileList: {},
    file__fileItemIcon: {},
    file__fileItem: {},
    file__fileName: {},
    file__fileRemove: {},
    file__fileRemoveIcon: {},
    file__inner: {},
    file__input: {},
    file__noFiles: {},
    file__noFilesIcon: {},
    form__form: {},
    form__actions: {},
    form__summaryInner: {},
    form__summaryHeader: {},
    form__messages: {
        'col-span-2': true,
    },
    form__message: {},
    form__messageLink: {},
    month__input: {},
    radio__decorator: {},
    radio__decoratorIcon: {},
    range__inner: {},
    range__input: {},
    select__wrapper: {},
    select__inner: {
        border: true,
        'border-gray-dark': true,
        'bg-white': true,
        rounded: true,
        'p-2': true,
        'gap-2': true,
        flex: true,
        'focus-within:ring-1': true,
        'focus-within:ring-brand-primary': true,
        'focus-within:border-brand-primary': true,
        'group-data-[invalid]:border-status-danger': true,
        'group-data-[disabled]:border-gray': true,
        'group-data-[disabled]:text-gray': true,
        'group-data-[disabled]:bg-gray-light': true,
    },
    select__input: {
        'w-full': true,
        'outline-none': true,
        'group-data-[disabled]:bg-gray-light': true,
        'group-data-[empty]:opacity-45': true,
        'bg-white': true,
    },
    select__selectIcon: {},
    select__optGroup: {},
    select__option: {},
    select__prefixIcon: {},
    select__suffixIcon: {},
    submit__outer: {},
    submit__input: {
        'bg-brand-primary': true,
        'text-white': true,
        'hover:bg-brand-primary-dark': true,
        'hover:!text-white': true,
        'disabled:!bg-gray': true,
        'disabled:text-gray-light': true,
    },
    submit__prefixIcon: {},
    submit__suffixIcon: {},
    textarea__inner: {},
    textarea__input: {},
    textarea__prefixIcon: {},
    textarea__suffixIcon: {},
    time__input: {},
    week__input: {},
    autocomplete__selections: {},
    autocomplete__selectionWrapper: {},
    autocomplete__selection: {},
    colorpicker__outer: {},
    colorpicker__help: {},
    colorpicker__inner: {},
    colorpicker__swatchPreview: {},
    colorpicker__canvasSwatchPreviewWrapper: {},
    colorpicker__canvasSwatchPreview: {},
    colorpicker__valueString: {},
    colorpicker__panel: {},
    colorpicker__panelClose: {},
    colorpicker__closeIcon: {},
    colorpicker__controlGroup: {},
    colorpicker__LS: {},
    colorpicker__canvas: {},
    colorpicker__canvasLS: {},
    colorpicker__canvasHue: {},
    colorpicker__canvasAlpha: {},
    colorpicker__preview: {},
    colorpicker__hue: {},
    colorpicker__alpha: {},
    colorpicker__eyeDropper: {},
    colorpicker__eyeDropperIcon: {},
    colorpicker__control: {},
    colorpicker__controlLS: {},
    colorpicker__controlHue: {},
    colorpicker__controlAlpha: {},
    colorpicker__formatField: {},
    colorpicker__colorField: {},
    colorpicker__colorInputGroup: {},
    colorpicker__fieldGroup: {},
    colorpicker__fieldLabel: {},
    colorpicker__formatSwitcher: {},
    colorpicker__switchIcon: {},
    colorpicker__swatches: {},
    colorpicker__swatchGroup: {},
    colorpicker__swatchGroupLabel: {},
    colorpicker__swatch: {},
    datepicker__inner: {},
    datepicker__removeSelection: {},
    datepicker__clearIcon: {},
    datepicker__panelWrapper: {},
    datepicker__panelHeader: {},
    datepicker__panelClose: {},
    datepicker__panel: {},
    datepicker__input: {},
    datepicker__monthsHeader: {},
    datepicker__timeHeader: {},
    datepicker__months: {},
    datepicker__month: {},
    datepicker__yearsHeader: {},
    datepicker__years: {},
    datepicker__year: {},
    datepicker__weekDays: {},
    datepicker__weekDay: {},
    datepicker__calendarWeeks: {},
    datepicker__week: {},
    datepicker__dayCell: {},
    datepicker__timeInput: {},
    datepicker__daysHeader: {},
    datepicker__prev: {},
    datepicker__prevLabel: {},
    datepicker__prevIcon: {},
    datepicker__dayButton: {},
    datepicker__monthButton: {},
    datepicker__yearButton: {},
    datepicker__next: {},
    datepicker__nextLabel: {},
    datepicker__nextIcon: {},
    datepicker__openButton: {},
    datepicker__calendarIcon: {},
    dropdown__placeholder: {},
    dropdown__selector: {},
    dropdown__selectIcon: {},
    dropdown__selectionsWrapper: {},
    dropdown__selection: {},
    dropdown__selections: {},
    dropdown__selectionsItem: {},
    dropdown__tagWrapper: {},
    dropdown__truncationCount: {},
    mask__inner: {},
    mask__input: {},
    rating__inner: {},
    rating__itemsWrapper: {},
    rating__onItemRow: {},
    rating__offItemRow: {},
    rating__onItemWrapper: {},
    rating__offItemWrapper: {},
    rating__ratingItem: {},
    rating__itemLabelInner: {},
    rating__itemLabel: {},
    rating__ratingIcon: {},
    rating__input: {},
    rating__messages: {},
    repeater__outer: {},
    repeater__fieldset: {},
    repeater__legend: {},
    repeater__content: {},
    repeater__addButton: {},
    repeater__controlLabel: {},
    repeater__controls: {},
    repeater__downControl: {},
    repeater__upControl: {},
    repeater__removeControl: {},
    repeater__insertControl: {},
    repeater__help: {},
    repeater__item: {},
    repeater__dragHandleWrapper: {},
    repeater__dragHandle: {},
    repeater__dragHandleIcon: {},
    repeater__moveDownIcon: {},
    repeater__moveUpIcon: {},
    repeater__removeIcon: {},
    repeater__addIcon: {},
    slider__outer: {},
    slider__help: {},
    slider__sliderInner: {},
    slider__track: {},
    slider__trackWrapper: {},
    slider__trackInner: {},
    slider__prefixIcon: {},
    slider__suffixIcon: {},
    slider__fill: {},
    slider__marks: {},
    slider__mark: {},
    slider__markLabel: {},
    slider__handles: {},
    slider__handle: {},
    slider__tooltip: {},
    slider__linkedValues: {},
    slider__minValue: {},
    slider__maxValue: {},
    slider__chart: {},
    slider__chartBar: {},
    taglist__inner: {},
    taglist__tags: {},
    taglist__tagWrapper: {},
    taglist__input: {},
    taglist__listboxButton: {},
    toggle__outer: {},
    toggle__altLabel: {},
    toggle__inner: {},
    toggle__input: {},
    toggle__label: {},
    toggle__innerLabel: {},
    toggle__thumb: {},
    toggle__track: {},
    toggle__valueLabel: {},
    toggle__wrapper: {},
    togglebuttons__wrapper: {},
    togglebuttons__options: {},
    togglebuttons__option: {},
    togglebuttons__input: {},
    transferlist__outer: {},
    transferlist__wrapper: {},
    transferlist__help: {},
    transferlist__transferlist: {},
    transferlist__transferlistHeader: {},
    transferlist__transferlistHeaderItemCount: {},
    transferlist__transferlistListItems: {},
    transferlist__transferlistListItem: {},
    transferlist__transferlistOption: {},
    transferlist__transferControls: {},
    transferlist__sourceEmptyMessage: {},
    transferlist__sourceListItems: {},
    transferlist__targetEmptyMessage: {},
    transferlist__emptyMessageInner: {},
    transferlist__transferlistControls: {},
    transferlist__transferlistSearch: {},
    transferlist__transferlistSearchInput: {},
    transferlist__transferlistSearchClear: {},
    transferlist__controlLabel: {},
    transferlist__selectedIcon: {},
    transferlist__transferlistButton: {},
    transferlist__fastForwardIcon: {},
    transferlist__moveRightIcon: {},
    transferlist__moveLeftIcon: {},
    transferlist__rewindIcon: {},
    transferlist__messages: {},
    barcode__barcodeIcon: {},
    barcode__dialog: {},
    barcode__video: {},
    barcode__closeIcon: {},
    barcode__overlay: {},
    barcode__overlayDecorators: {},
    barcode__overlayDecoratorTopLeft: {},
    barcode__overlayDecoratorTopRight: {},
    barcode__overlayDecoratorBottomRight: {},
    barcode__overlayDecoratorBottomLeft: {},
    'multi-step__outer': {},
    'multi-step__wrapper': {},
    'multi-step__tabs': {},
    'multi-step__tab': {},
    'multi-step__tabLabel': {},
    'multi-step__badge': {},
    'multi-step__validStepIcon': {},
    'multi-step__steps': {},
    step__stepActions: {},
    step__stepPrevious: {},
    step__stepNext: {},
};

/**
 * Globals are merged prior to generating this file — these are included for
 * any other non-matching inputs.
 **/
const globals: Record<string, Record<string, boolean>> = {
    outer: {
        // group is needed to access styling attributes like group-data-[invalid] or group-data-[disabled]
        group: true,
    },
    label: {},
    legend: {},
    input: {
        'w-full': true,
        'outline-none': true,
    },
    icon: {
        block: true,
        'w-5': true,
        'h-auto': true,
        'my-auto': true,
    },
    prefixIcon: {},
    suffixIcon: {},
    loaderIcon: {},
    loadMoreInner: {},
    help: {
        'text-sm': true,
        'text-gray': true,
    },
    message: {
        'text-sm': true,
        'text-status-danger': true,
    },
    overlay: {},
    overlayPlaceholder: {},
    overlayLiteral: {},
    overlayChar: {},
    overlayEnum: {},
};
