<template>
  <section class="left-section">

    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="通知公告" name="notice">
        <el-card v-for="article in viewData.list" shadow="hover" class="list-item">
          <div class="list-item-title">{{ article.title }}</div>

          <div class="list-item-time">{{ article.createTime }}</div>
          <div class="list-item-content">{{ article.content }}</div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <div class="pa-container"><el-pagination
      background
      layout="prev, pager, next"
      :total="pageInfo.total"
      :pageSize="pageInfo.pageSize"
      v-model:current-page="pageInfo.pageIndex"
      class="pagination"
    /></div>
    
  </section>
  <section class="right-section">right</section>
</template>
<script setup>
import { ref, onMounted, reactive, watch, computed } from 'vue'
import { pageQuery } from '@/api/article'
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
  console.log('cur', cur)
  const index = cur
  const size = pageInfo.pageSize
  const title = viewData.title
  pageQuery(index, size, title).then((res) => {
    console.log(res.data.total)
    pageInfo.total = res.data.total
    console.log('pt', pageInfo.total)
    pageInfo.pageSize = res.data.size
    pageInfo.pageIndex = res.data.current
    viewData.list = res.data.records.map((i) => {
      if (!i.content) i.content = ''
      if (i.content.length > 35) i.content = i.content.slice(0, 100) + '……'
      return i
    })
  })
  console.log('pageInfo', pageInfo)
}
</script>
<style>
.left-section {
  float: left;
  width: 70vw;
  padding-left: 100px;
}
.right-section {
  float: right;
  width: 25vw;
}
.list-item{
    margin-top:20px
}
.list-item-title{
    font-size: large;
    font-weight: bold;
    margin-bottom: 5px;
}
.list-item-time{
    font-size: small;
    color: darkgray;
    margin-bottom: 10px;
 
}
.pa-container{
    padding-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
