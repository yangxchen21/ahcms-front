import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/front/MainView.vue'
import RegisterView from '../views/front/RegisterView.vue'
import LoginView from '../views/front/LoginView.vue'
import HomeView from '../views/front/HomeView.vue'
import NoticeView from '../views/front/NoticeView.vue'
import OverviewView from '../views/front/OverviewView.vue'
import NewsView from '../views/front/NewsView.vue'
import GuideView from '../views/front/GuideView.vue'
import DownloadCenterView from '../views/front/DownloadCenterView.vue'
import ContestView from '../views/front/ContestView.vue'
import MememberView from '../views/front/MemberView.vue'
import OrganizationView from '../views/front/OrganizationView.vue'
import ArticleView from '../views/front/ArticleView.vue'
import AdminView from '../views/backend/AdminView.vue'
import ContentView from '../views/backend/ContentView.vue'
import UserAdminView from '../views/backend/UserAdminView.vue'
import ArticleDetailView from '../views/backend/ArticleDetailView.vue'
import ArticleDeployView from '../views/backend/ArticleDeployView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      children: [
        { path: '/home', component: HomeView },
        { path: '/notice', component: NoticeView },
        { path: '/overview', component: OverviewView },
        { path: '/news', component: NewsView },
        {path:'/guide',component:GuideView},
        {path:'/download',component:DownloadCenterView},
        {path:'/organization',component:OrganizationView},
        {path:'/member',component:MememberView},
        {path:'/contest',component:ContestView},
        {path:'/article/:id',component:ArticleView,props:true},
        
      ],
      redirect:"/home"
    },
    { path: '/register', component: RegisterView },

    { path: '/login', component: LoginView },
    {path:'/admin',component:AdminView,children:[
      {path:'/admin/user',component:UserAdminView},
      {path:'/admin/article',component:ContentView},
      {path:'/admin/deploy',component:ArticleDeployView},
      {path:'/admin/article/:id',component:ArticleDetailView,props:true}
    ],redirect:"/admin/article"}
  ]
})

export default router
