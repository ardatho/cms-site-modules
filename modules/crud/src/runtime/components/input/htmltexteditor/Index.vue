<script setup lang="ts">
const props = defineProps(['config'])

const inputValue = defineModel()

import * as editor from './editor';

const heading = () => {
  const element = document.createElement('h1');
  element.innerText = 'TinyMCE Vite demo';
  return element;
};

const editorArea = () => {
  const element = document.createElement('textarea');
  element.id = 'editor';
  return element;
};


// const parent = ref(null)

onMounted(() => {

  // const parent = document.createElement('p');
  // parent.value.appendChild(editorArea());
  // document.body.appendChild(heading());
  // document.body.appendChild(parent);
  editor.render();
})

</script>

<template>
  <div ref="parent">
    <textarea id="editor" />
  </div>
</template>
