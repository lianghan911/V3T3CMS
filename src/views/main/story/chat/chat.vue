<template>
  <div class="chat">
    <lh-editor v-model:value="htmlString"></lh-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LhEditor from '@/base-ui/editor'
export default defineComponent({
  name: 'chat',
  components: {
    LhEditor
  },
  setup() {
    const htmlString = ref<string>('lh')
    return {
      htmlString
    }
  }
})
</script>

<style scoped></style>
