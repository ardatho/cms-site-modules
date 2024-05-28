import { createSharedComposable } from '@vueuse/core'

const queryField = (field) => {
  console.log({field})
  if (field.type === 'custom' && field.static === true) {
    return '';
  }
  if (field.select_id !== undefined) {
    return field.select_id;
  }
  // Handle field to fetch one or more attributes in listing
  if (
    (['combobox', 'select', 'media'].includes(field.type)) &&
    field.related !== undefined
  ) {
    // Attributes listed in config
    if (
      field.listing_attribute !== undefined &&
      field.listing_attributes !== undefined
    ) {
      return `${field.key} { ${field.listing_attributes} }`;
    }

    // No attributes listed in config
    const selection = [];

    if (field.itemValue) {
      selection.push(field.itemValue);
    }

    if (field.itemText && field.itemText !== field.itemValue) {
      selection.push(field.itemText);
    }

    if (selection.length) {
      return `${field.key} { ${selection.join(',')} }`;
    }
  }

  return field.key;
}

const _useCrudQuery = () => {
  const upperKeyName = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);

  const generateItemsQuery = (currentModule) => {
    const fields = currentModule.fields.filter(field => field.display?.listing || field.fetch?.listing)
    return gql`
      query ${upperKeyName(currentModule.id)}($queryInput: QueryInput) {
        items: ${currentModule.id}(queryInput: $queryInput) {
          ${fields.map(field => queryField(field)).join(' ')}
        }
        nItems: n${currentModule.id}(queryInput: $queryInput) {
          count
        }
      }
    `
  }

  const generateItemQuery = (currentModule) => {

    const fields = currentModule.fields.filter(field => field.display?.edit || field.fetch?.edit || false);

    return gql`
      query ${upperKeyName(currentModule.idSingular)}($id: Int!) {
        item: ${currentModule.idSingular}(id: $id) {
          ${fields.map(field => field.related ?? field.key).join(' ')}
        }
      }
    `
  }

  const generateItemPatch = (currentModule) => {
    const fields = currentModule.fields.filter(field => field.display?.edit || field.fetch?.edit || false);
    const keyModule = upperKeyName(currentModule.idSingular);

    const operation = `
      mutation Patch${keyModule}($id: Int!, $patch: ${keyModule}Patch! ) {
        item: patch${keyModule}(id: $id, patch: $patch) {
          ${fields.map(field => field.key).join(' ')}
        }
      }
    `
    return gql(operation)
  }

  const generateItemDelete = (currentModule) => {
    const keyModule = upperKeyName(currentModule.idSingular);

    const operation = `
      mutation Delete${keyModule}($id: Int!) {
        deleted: delete${keyModule}(id: $id)
      }
    `
    return gql(operation)
  }

  const generateItemAdd = (currentModule) => {
    const fields = currentModule.fields.filter(field => field.display?.edit || field.fetch?.edit || false);
    const keyModule = currentModule.idSingular.charAt(0).toUpperCase() + currentModule.idSingular.slice(1);

    const operation = `
      mutation Mutation($item: ${keyModule}Add! ) {
        item: add${keyModule}(item: $item) {
          ${fields.map(field => field.key).join(' ')}
        }
      }
    `
    return gql(operation)
  }

  return {
    generateItemsQuery,
    generateItemQuery,
    generateItemPatch,
    generateItemAdd,
    generateItemDelete,
  }
}

export const useCrudQuery = createSharedComposable(_useCrudQuery)
