<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="changeTab">
    <el-tab-pane label="竞赛通知" name="conNotice">
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
    <el-tab-pane label="竞赛概况" name="conDetail">
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
import {ref, onMounted, reactive, watch, computed} from 'vue'
import {pageQuery, ARTICLE_TYPES} from '@/api/article'
import {useRouter} from 'vue-router'
import {convert} from "html-to-text";

const router = useRouter()
const activeName = ref('conNotice')
const viewData = reactive({
  currentType: ARTICLE_TYPES.COMPETITION_NOTICE,
  title: '',
  list: [],

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
const changeTab = (tabName) => {

  switch (tabName) {
    case "conNotice":
      viewData.currentType = ARTICLE_TYPES.COMPETITION_NOTICE
      break
    case "conDetail":
      viewData.currentType = ARTICLE_TYPES.COMPETITION_DETAIL
      break

  }
  getList(1)
}
const getList = (curIndex) => {

  pageQuery(curIndex, pageInfo.pageSize, viewData.title, viewData.currentType).then((res) => {

    pageInfo.total = Number(res.data.total)

    pageInfo.pageSize = Number(res.data.size)
    pageInfo.pageIndex = Number(res.data.current)
    viewData.list = res.data.records.map((i) => {
      if (!i.content) i.content = ''
      i.content = convert(i.content)
      if (i.content.length > 35) i.content = i.content.slice(0, 100) + '……'
      return i
    })
  })
}

const clickCardItem = (id) => {
  router.push('/article/' + id)
}
</script>
<style>


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
