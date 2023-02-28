<template>
 
 <router-view/>
    
</template>

<script setup>

import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
.el-menu-demo{
  width: 100%;
  display: flex;
  align-items: center;
}
.login-button-group{
  position: absolute;
  right: 0;
}


</style>
