<template>

  <el-card
      v-for="item in viewData.list"
      shadow="hover"
      class="list-item"
      @click="clickCardItem(item.id,item.name)"
  >
    <div class="list-item-title">{{ item.name}}</div>

    <div class="list-item-time">{{ item.createTime }}</div>
    <div class="list-item-content">{{ item.name }}</div>
  </el-card>
  <div class="pa-container">
    <el-pagination
        background
        layout="prev, pager, next"
        :total="pageInfo.total"
        :pageSize="pageInfo.size"
        v-model:current-page="pageInfo.index"
        class="pagination"
    />
  </div>
</template>
<script setup>
import {onMounted, reactive, watch} from "vue";
import {download, list} from "@/api/appendix";
import {handleExport} from "@/api/common";

const viewData=reactive({
  list:[],
  appendixName:""
})
const pageInfo=reactive({
  size:6,
  index:1,
  total:0
})
onMounted(()=>{
  getList(1)
})
watch(
    () => pageInfo.index,
    (newPage) => getList(newPage)
)
const getList=(cur)=>{
  list(cur,pageInfo.size,viewData.name).then(res=>{
    viewData.list=res.data.records
    pageInfo.total=Number(res.data.total)
    pageInfo.size=Number(res.data.size)
    pageInfo.index=Number(res.data.current)
  })
}
const clickCardItem=(id,name)=>{
  download(id).then(res=>handleExport(res,name))
}
</script>
<style scoped>
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