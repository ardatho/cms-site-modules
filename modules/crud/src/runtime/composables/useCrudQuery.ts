import { createSharedComposable } from '@vueuse/core'

const _useCrudQuery = () => {

  const generateItemsQuery = () => {
    const currentModule = useState('currentModule');

    const fields = currentModule.value.fields.filter(field => field.display?.listing || field.fetch?.listing)
    return gql`
      query Query {
        items: ${currentModule.value.id} {
          ${fields.map(field => field.key).join(' ')}
        }
        nItems: n${currentModule.value.id} {
          count
        }
      }
    `
  }

  const generateItemQuery = () => {
    const currentModule = useState('currentModule');

    const fields = currentModule.value.fields.filter(field => field.display?.edit || field.fetch?.edit || false);

    return gql`
      query Query($id: Int!) {
        item: ${currentModule.value.idSingular}(id: $id) {
          ${fields.map(field => field.key).join(' ')}
        }
      }
    `
  }

  const generateItemPatch = () => {
    const currentModule = useState('currentModule');

    const fields = currentModule.value.fields.filter(field => field.display?.edit || field.fetch?.edit || false);
    const keyModule = currentModule.value.idSingular.charAt(0).toUpperCase() + currentModule.value.idSingular.slice(1);

    const operation = `
      mutation Mutation($id: Int!, $patch: ${keyModule}Patch! ) {
        item: patch${keyModule}(id: $id, patch: $patch) {
          ${fields.map(field => field.key).join(' ')}
        }
      }
    `
    return gql(operation)
  }

  const generateItemDelete = () => {
    const currentModule = useState('currentModule');

    const keyModule = currentModule.value.idSingular.charAt(0).toUpperCase() + currentModule.value.idSingular.slice(1);

    const operation = `
      mutation Mutation($id: Int!) {
        deleted: delete${keyModule}(id: $id)
      }
    `
    return gql(operation)
  }

  const generateItemAdd = () => {
    const currentModule = useState('currentModule');

    const fields = currentModule.value.fields.filter(field => field.display?.edit || field.fetch?.edit || false);
    const keyModule = currentModule.value.idSingular.charAt(0).toUpperCase() + currentModule.value.idSingular.slice(1);

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
