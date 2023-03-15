<template>
  <el-form :inline="true" :model="formInline" class="deploy-form">
    <el-form-item label="标题">
      <el-input v-model="formInline.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="发布者">
      <el-input v-model="formInline.publisher" placeholder="请输入发布人" />
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="formInline.type" placeholder="请选择类别" @change="switchLv1Type">
        <el-option v-for="item in pageData.l1types" :label="item.name" :value="item.id" />
      </el-select>
      <el-select
        v-model="formInline.type2"
        placeholder="请选择类别"
        v-if="pageData.l2types.length > 0"
        @change="switchLv2Type"
      >
        <el-option v-for="item in pageData.l2types" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="clickQueryBtn">查询</el-button>
      <el-button type="" @click="clickCancelBtn">清空</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="pageData.list" border>
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="publisher" label="发布者" width="180" />
    <el-table-column prop="updateTime" label="更新日期" width="180" />
    <el-table-column prop="type" label="类别" width="180" :formatter="typeColumnFormate" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="info" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
      
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="pa-container">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageInfo.total"
      :pageSize="pageInfo.pageSize"
      v-model:current-page="pageInfo.pageIndex"
      class="pagination"
    />
  </div>
</template>
<script setup>
import { reactive, onMounted, watch } from 'vue'
import { pageQueryBasic, ARTICLE_TYPES } from '@/api/article'
import { getLv1List, getLv2ListById } from '@/api/article_types'
import { useRouter } from 'vue-router';
const router=useRouter()
const pageInfo = reactive({
  total: 0,
  pageSize: 8,
  pageIndex: 1
})
const formInline = reactive({
  title: '',
  publisher: '',
  type: null,
  type2: null
})

const pageData = reactive({
  list: [],
  l1types: [],
  l2types: []
})
onMounted(() => {
  list(1)
  getTypes()
})
watch(
  () => pageInfo.pageIndex,
  (newPage) => list(newPage)
)
const list = (cur) => {
  const title = formInline.title
  const type = formInline.type2 == null ? formInline.type : formInline.type2
  const publisher = formInline.publisher
  pageQueryBasic(cur, pageInfo.pageSize, title, type, publisher).then((res) => {
    pageData.list = res.data.records
    pageInfo.total = Number(res.data.total)
    pageInfo.pageIndex = Number(res.data.current)
    pageInfo.pageSize = Number(res.data.size)
  })
}
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
  formInline.type2 = null
  getTypesById(cur)
  clickQueryBtn()
}
const switchLv2Type = () => {
  clickQueryBtn()
}
const clickQueryBtn = () => {
  const index = 1
  const size = 8
  const title = formInline.title
  const type = formInline.type2 == null ? formInline.type : formInline.type2
  const publisher = formInline.publisher
  pageQueryBasic(index, size, title, type, publisher).then((res) => {
    pageData.list = res.data.records
    pageInfo.total = Number(res.data.total)
    pageInfo.pageIndex = Number(res.data.current)
    pageInfo.pageSize = Number(res.data.size)
  })
}
const typeColumnFormate = (row, column, cellValue, index) => {
  switch (cellValue) {
    case ARTICLE_TYPES.NOTICE:
      return '通知告示'
    case ARTICLE_TYPES.ROLL_NEWS:
      return '滚动新闻'
    case ARTICLE_TYPES.DYN_NEWS:
      return '新闻动态'
    case ARTICLE_TYPES.CONTEST_NEWS:
      return '竞赛新闻'
    case ARTICLE_TYPES.TRAIN_NEWS:
      return '师资培训'
    case ARTICLE_TYPES.WORK_GUIDE:
      return '工作指南'
    case ARTICLE_TYPES.ORGANIZATION:
      return '组织机构'
    case ARTICLE_TYPES.COMPETITION_NOTICE:
      return '竞赛通知'
    case ARTICLE_TYPES.COMPETITION_DETAIL:
      return '竞赛概况'
    case ARTICLE_TYPES.CMS_OVERVIEW:
      return '研究会概况'
  }
  return cellValue
}
const clickCancelBtn = () => {
  formInline.title = ''
  formInline.publisher = ''
  formInline.type = null
  formInline.type2 = null
  clickQueryBtn()
}
const handleCheck=(index,row)=>{

  router.push('/admin/article/'+row.id)
}
const handleDelete=(index,row)=>{
  
}
</script>
<style scoped>
.pa-container {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
.deploy-form {
  margin-top: 20px;
}
</style>
