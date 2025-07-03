# Vue forms

Vue Forms is used for forms in Pond. The documentation can be found here:
https://vueform.com/docs/installation

## Create new form

Go to the component, that should contain the form and create the Vue Form as described in this [documentation](https://vueform.com/reference/vueform).
The documentation contains many configuration options, that can be used as needed. For example, [showRequired](https://vueform.com/reference/vueform#option-show-required)
allows you to configure the display of required fields.

## Vue form config

If necessary, the configuration can be expanded. Check out the documentation:
https://vueform.com/docs/configuration

## Styling and grid layout

In general, additional classes can be added to each element to change the styling:
https://vueform.com/docs/styles-and-layout

Additionally, columns can be configured for each form element. By default, a VueForm has a 
12-column grid layout. If you don't want a text element to be the full width, you can use columns 
to specify that it should only be 6 columns wide.

[Columns documentation is available for every form element](https://vueform.com/reference/button-element#option-columns)

For forms with fields of different lengths, it may be necessary to list them not all one 
after the other. For example, there is a text element with 3 columns and a text element with 6 columns. 
Normally, these would be displayed right next to each other, since it's a 12-column grid.
Using group elements, form fields can be easily grouped. In this example, the second text element would 
start in the next row. This eliminates the need to define additional styling, as those stylings usually only applies 
to a specific form and not to a general form field. 
[Group element documentation](https://vueform.com/reference/group-element)

## Use/Adjust existing form field components

After the form is created, various field types can be added to the form. Currently, the following 
field types are available:

- Text element (components/Form/FormTextElementInner.vue)
  - [Vue forms documentation](https://vueform.com/reference/text-element)
- Select element (components/Form/FormSelectElementInner.vue)
  - [Vue forms documentation](https://vueform.com/reference/select-element)
- Checkbox (components/Form/FormCheckboxElementInner.vue)
  - [Vue forms documentation](https://vueform.com/reference/checkbox-element)
- Button element (components/Form/FormButtonElementInner.vue)
  - [Vue forms documentation](https://vueform.com/reference/button-element)

Check out the style guide (/styleguide) to see, which configurations are already available. Currently, 
not all existing VueForms configurations are implemented in the individual components. These can be added, if necessary 
(in the above-mentioned vue component and in the style guide).


General/cross-project configurations should only be adjusted in the above-mentioned Vue components. 
However, if a configuration should only apply to a specific element, then this configuration is done via the props.
Therefore, all configuration options should be customizable via props. Keep this in mind when adding new configurations.

## Create new form field components

When a new form field type is created, a new component is created under /form. Each form field type has a wrapper and 
inner component. These behave exactly as they do in the entire project, so they won't be discussed further here.


### Naming

For example, if a new component for the [DateElement](https://vueform.com/reference/date-element) is to be created,
the components are called:
- FormDateElement.vue
- FormDateElementInner.vue

`Form`: Because of the folder structure

`DateElement`: Name of the element in the Vue Forms documentation

`Inner`: Indicates the inner component

