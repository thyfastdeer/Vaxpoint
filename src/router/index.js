import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TestPage from '../views/TestPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUp from '@/views/SignUp.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import ContactUs from '@/views/ContactUs.vue'
import MythDebunker from '@/views/MythDebunker.vue'
import ClinicsPage from '@/views/ClinicsPage.vue'
import NewsPage from '@/views/NewsPage.vue'
import VaccinesPage from '@/views/VaccinesPage.vue'
import Dashboard from '@/views/Dash_board.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about-us',
      name: 'about',      
      component: AboutView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage,
    },
    
    {
      path: '/contact-us',
      name: 'contact',
      component: ContactUs,
    },
    {
      path:  '/debunk',
      name: 'debunker',
      component: MythDebunker,
    },
    {
      path: '/clinics',
      name: 'clinics',
      component: ClinicsPage,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsPage,
    },
    {
      path: '/vaccines',
      name: 'vaccines',
      component: VaccinesPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ],
})

export default router
