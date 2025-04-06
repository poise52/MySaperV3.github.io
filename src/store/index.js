import { createStore } from 'vuex';

export default createStore({
    state: {
        difficulty: 'easy',
        leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || []
    },
    mutations: {
        setDifficulty(state, difficulty) {
            state.difficulty = difficulty;
        },
        updateLeaderboard(state, player) {
            state.leaderboard.push(player);
            state.leaderboard.sort((a, b) => a.time - b.time);
            state.leaderboard = state.leaderboard.slice(0, 10);
            localStorage.setItem('leaderboard', JSON.stringify(state.leaderboard));
        },
        clearLeaderboard(state) {
            state.leaderboard = [];
            localStorage.removeItem('leaderboard');
        }
    },
    actions: {
        restartGame({ commit }) {
            commit('clearLeaderboard');
            commit('setDifficulty', 'easy');


        }
    }
});