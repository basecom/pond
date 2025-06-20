

<template>

    <GroupElement
        name="adress_information"
        label="Address information"
    >
      <!-- Basic elements -->
      <TextElement
          label="Straße"
          name="street"
          placeholder="Straße"
          rules="required"
          :messages="{required: 'Hallo ich werde gebraucht'}"
          :columns="6"
      />
    </GroupElement>
</template>
