<template>
  <div class="leaderboard-screen">
    <h2>Таблица лидеров</h2>
    <ul>
      <li v-for="player in topPlayers" :key="player.name">
        {{ player.name }} - {{ player.time }}s
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    topPlayers() {
      return this.$store.state.leaderboard;
    }
  }
};
</script>

<style>
.leaderboard-screen {
  text-align: center;
}

.leaderboard-screen ul {
  list-style-type: none;
  padding: 0;
}

.leaderboard-screen li {
  background-color: #fff;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>