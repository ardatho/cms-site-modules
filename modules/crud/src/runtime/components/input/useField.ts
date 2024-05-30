

const fieldComponentTypes = {
  custom: (fieldConfig) => {
    return {
      component: fieldConfig.component,
      props: fieldConfig.props
    }
  },
  text: () => ({ component: 'input-text' }),
  email: () => ({
    component: 'input-text',
    props: {
      type: 'email'
    }
  }),
  password: () => ({
    component: 'input-text',
    props: {
      type: 'password'
    }
  }),
  number: () => ({
    component: 'input-text',
    props: {
      type: 'number'
    }
  }),
  float: () => ({
    component: 'input-text',
    props: {
      type: 'number'
    }
  }),
  select: () => ({ component: 'input-select' }),
  status: () => ({ component: 'input-select' }),
  radio: () => ({ component: 'input-radio' }),
  textarea: () => ({ component: 'input-text-area' }),
  boolean: () => ({ component: 'input-boolean' }),
  date: () => ({ component: 'input-date' }),
  datetime: () => ({
    component: 'input-date',
    props: {
      mode: 'dateTime'
    }
  }),
  relations: () => ({ component: 'input-table' }),
  // htmltexteditor: ({ field }) => ({
  //   component: HtmlTextEditorField,
  //   props: {
  //     fieldKey: field.key
  //   }
  // }),
  // colorpicker: () => ({ component: ColorPickerField }),
  // combobox: () => ({ component: ComboBoxField }),
  // image: () => ({ component: ImageField }),
  // media: () => ({ component: MediaField }),
  // btngroup: () => ({ component: BtnGroupField }),
  // spacing: () => ({ component: SpacingField }),
  // children: ({ typeName, field }) => ({
  //   component: RelationsField,
  //   props: {
  //     // NOTE: The field itself shouldn't have access to its raw config.
  //     //   We're making an exception here because type relations requires
  //     //   API related information.
  //     typeName,
  //     field,
  //   },
  // }),
  // expandabletable: ({ field }) => ({
  //   component: ExpandableTableField,
  //   props: {
  //     field
  //   },
  // }),
  // price: () => ({
  //   component: TextField,
  //   props: {
  //     type: 'number',
  //     decimals: 2,
  //   }
  // }),
  // file: file,
  // display: ({ field }) => ({
  //   component: DisplayField,
  //   props: {
  //     field
  //   },
  // }),
};

export default (fieldConfig) => {

  const { t } = useI18n();

  const fieldOptions = computed(() => {
    const getFieldOptions = fieldComponentTypes[fieldConfig?.type] || null;

      // Find field type in map
      if (typeof getFieldOptions === 'function') {
        return {
          ...fieldConfig,
          ...getFieldOptions(fieldConfig)
        };
      }

      // Display error when type is not found
      return {
        component: h('div', { style: { color: 'red', fontSize: '14px' } }, `Field type "${fieldConfig.type}" is not supported.`),
      }
  });

  return {
    fieldOptions
  };
}
