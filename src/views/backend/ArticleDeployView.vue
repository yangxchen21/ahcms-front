<template>
  <el-form :model="pageData" class="deploy-form">
    <el-form-item label="标题">
      <el-input v-model="pageData.title" placeholder="请输入标题"/>
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="pageData.type" placeholder="请选择类别" @change="switchLv1Type">
        <el-option v-for="item in pageData.l1types" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select
          v-model="pageData.type2"
          placeholder="请选择类别"
          v-if="pageData.l2types.length > 0"
      >
        <el-option v-for="item in pageData.l2types" :label="item.name" :value="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item label="附件">
      <div class="appendix-item">
        <el-upload
            v-model:file-list="pageData.fileList"
            class="upload-demo"
            action="#"
            multiple
            :auto-upload="false"
            :on-change="uploadChange"
        >
          <el-button type="success">选择文件</el-button>

        </el-upload>
        <!--        <el-button type="primary" @click="uploadFile">上传</el-button>-->
      </div>

    </el-form-item>
    <el-form-item>
      <tip-editor @change-content="updateEditorContent" ref="editor"></tip-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="clickDeployBtn">发布</el-button>
      <el-button type="" @click="clickCleanBtn">清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import {reactive, onMounted,ref} from 'vue'
import TipEditor from '@/components/common/TipEditor.vue'

import {getLv1List, getLv2ListById} from '@/api/article_types'
import {uploadFiles} from '@/api/appendix'
import {saveArticle} from "@/api/article";
import {ElMessage} from "element-plus";

const pageData = reactive({
  title: '',
  type: null,
  type2: null,
  l1types: [],
  l2types: [],
  fileList: [],
  content: "",
  appendixIds: []
})
const editor=ref(null)
onMounted(() => {
  getTypes()

})
const getTypes = () => {
  getLv1List().then((res) => {
    pageData.l1types = res.data
  })
}
const getTypesById = (id) => {
  getLv2ListById(id).then((res) => {
    pageData.l2types = res.data
  })
}
const switchLv1Type = (cur) => {
  pageData.type2 = null
  getTypesById(cur)
}

const uploadChange = (file, fileList) => {
  pageData.fileList = fileList;
}

const clickDeployBtn = async () => {
  const publisher = sessionStorage.getItem("username")
  const type = pageData.type2 ? pageData.type2 : pageData.type
  if (pageData.fileList.length > 0) {
    const formData = new FormData()
    pageData.fileList.forEach((item) => {
      formData.append('files', item.raw)
    })
    const appendixIds=await uploadFiles(formData).then(res => {
      pageData.appendixIds = res.data
      return res.data
    })
    await saveArticle(publisher, pageData.content, type, pageData.title, appendixIds).then(res => {
      ElMessage.success("发布成功！")
      clickCleanBtn()
    })
  }else{
    await saveArticle(publisher, pageData.content, type, pageData.title,[]).then(res => {
      ElMessage.success("发布成功！")
      clickCleanBtn()
    })
  }
}
const clickCleanBtn=()=>{
  pageData.title=''
  pageData.fileList=[]
  pageData.type=null
  pageData.type2=null
  pageData.l2types=[]
  pageData.content=''
  pageData.appendixIds=[]
}
const updateEditorContent = (content) => {

  pageData.content = content
}

</script>
<style scoped>

</style>
