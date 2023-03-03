import { defineStore } from "pinia";
import { ref } from "vue";

export const mainStore=defineStore('main',()=>{
    const currentIndex=ref('/home')
    function changeMenu(index){
        currentIndex.value=index
    }
    return {currentIndex,changeMenu}
})