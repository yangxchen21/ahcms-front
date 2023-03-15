<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="通知公告" name="notice">
      <el-card
        v-for="article in viewData.list"
        shadow="hover"
        class="list-item"
        @click="clickCardItem(article.id)"
      >
        <div class="list-item-title">{{ article.title }}</div>

        <div class="list-item-time">{{ article.createTime }}</div>
        <div class="list-item-content">{{ article.content }}</div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
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
import { ref, onMounted, reactive, watch, computed } from 'vue'
import { pageQuery, ARTICLE_TYPES } from '@/api/article'
import { useRouter } from 'vue-router'
import {convert} from "html-to-text";

const router = useRouter()
const activeName = ref('notice')
const viewData = reactive({
  title: '',
  list: []
})

const pageInfo = reactive({
  total: 0,
  pageSize: 5,
  pageIndex: 1
})
onMounted(() => {
  getList(1)
})
watch(
  () => pageInfo.pageIndex,
  (newPage) => getList(newPage)
)
const getList = (cur) => {

  const index = cur
  const size = pageInfo.pageSize
  const title = viewData.title
  pageQuery(index, size, title, ARTICLE_TYPES.NOTICE).then((res) => {
  
    pageInfo.total = Number(res.data.total)
  
    pageInfo.pageSize = Number(res.data.size)
    pageInfo.pageIndex = Number(res.data.current)
    viewData.list = res.data.records.map((i) => {
      if (!i.content) i.content = ''
      i.content=convert(i.content)
      if (i.content.length > 35) i.content = i.content.slice(0, 100) + '……'

      return i
    })
  })
}
const clickCardItem = (id) => {
  router.push('/article/' + id)
}
</script>
<style scoped>
.left-section {
  float: left;
  width: 70vw;
  padding-left: 100px;
}
.right-section {
  float: right;
  width: 25vw;
}
.list-item {
  margin-top: 20px;
}
.list-item:hover {
  cursor: pointer;
}
.list-item-title {
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
}
.list-item-title:hover {
  color: blue;
}
.list-item-time {
  font-size: small;
  color: darkgray;
  margin-bottom: 10px;
}
.pa-container {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
