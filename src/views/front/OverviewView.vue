<template>
    <h2>{{ pageData.title }}</h2>
    <div v-html="pageData.content"></div>
</template>
<script setup>
import {getOverview} from '@/api/article'
import { onMounted ,reactive} from 'vue';
const pageData=reactive({
    title:"",
    content:""
})
onMounted(()=>{
    getOverview().then(res=>{
        pageData.title=res.data.records[0].title
        pageData.content=res.data.records[0].content
    })
})
</script>
<style></style>