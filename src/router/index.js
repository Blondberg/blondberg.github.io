import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import ProjectsView from '../views/ProjectsView.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", name: "home", component: HomeView },
        { path: "/project/:title", name: "project", component: ProjectDetailView },
        { path: "/projects/", name: "projects", component: ProjectsView },
    ],
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        }
    }
});

export default router;