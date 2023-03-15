<template>
  <section>
    <el-tabs v-model="activeIndex1" class="demo-tabs">
      <el-tab-pane label="新闻中心" name="news">
        <el-card
          v-for="article in viewData.newsList"
          shadow="hover"
          class="l-item"
          @click="clickItem(article.id)"
        >
          <div class="l-item-title">{{ article.title }}</div>
          <div class="l-item-time">{{ article.createTime }}</div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </section>
  <section>
    <el-tabs v-model="activeIndex2" class="demo-tabs">
      <el-tab-pane label="通知公告" name="notice">
        <el-card
          v-for="article in viewData.noticeList"
          shadow="hover"
          class="l-item"
          @click="clickItem(article.id)"
        >
          <div class="l-item-title">{{ article.title }}</div>
          <div class="l-item-time">{{ article.createTime }}</div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script setup>
import { ref ,reactive,onMounted,defineEmits,defineProps} from 'vue'
import { pageQuery, ARTICLE_TYPES } from '@/api/article'
import { useRouter } from 'vue-router';
const activeIndex1 = ref('news')
const activeIndex2 = ref('notice')
const viewData = reactive({
  noticeList: [],
  newsList:[]
})

onMounted(() => {
  getNoticeList()
  getNewsList()
})
const emits=defineEmits(['selectArticle'])
const getNoticeList = () => {
  const index = 1
  const size = 3
  pageQuery(index, size, "", ARTICLE_TYPES.NOTICE).then((res) => {
    viewData.noticeList = res.data.records
  })
}
const getNewsList = () => {
  const index = 1
  const size = 3
  pageQuery(index, size, "", ARTICLE_TYPES.ROLL_NEWS).then((res) => {
    viewData.newsList = res.data.records
  })
}
const clickItem = (id) => {
  
    emits('selectArticle',id)
}
</script>
<style scoped>
.l-item{
    height: 80px;
    margin-bottom: 5px;
    padding: 5px 0 0 5px;
}
/deep/ .el-card__body{
    padding: 0;
}
.l-item-title{
    margin:0
}
</style>
