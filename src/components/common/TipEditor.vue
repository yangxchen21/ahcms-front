<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {debounce} from "lodash";
import {uploadImg} from "@/api/img";


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const emit = defineEmits(['changeContent'])
// 内容 HTML
const valueHtml = ref('')
const mode = "default"
// 模拟 ajax 异步获取内容
onMounted(() => {

})

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage:{

      async customUpload(file, insertFn) {
        console.log("img file:",file)
        const uploadRes = await uploadImg(file)
        await insertFn(uploadRes.data.url,uploadRes.data.alt,uploadRes.data.href)
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = debounce((editor) => {
  emit('changeContent', editor.getHtml())
}, 1500)


</script>
<style scoped>
strong {
  font-weight: bolder;
}
</style>
