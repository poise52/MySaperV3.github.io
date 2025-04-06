import { createRouter, createWebHistory } from 'vue-router';
import SettingsScreen from '../components/SettingsScreen.vue';
import GameScreen from '../components/GameScreen.vue';
import LeaderboardScreen from '../components/LeaderboardScreen.vue';

const routes = [
    { path: '/', component: SettingsScreen },
    { path: '/game', component: GameScreen },
    { path: '/leaderboard', component: LeaderboardScreen }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;