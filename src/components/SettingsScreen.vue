<template>
  <div class="settings-screen">
    <h2>Select Difficulty</h2>
    <button @click="setDifficulty('easy')">Easy 8x8, 10 mines</button>
    <button @click="setDifficulty('medium')">Medium 16x16, 40 mines</button>
    <button @click="setDifficulty('hard')">Hard 32x16, 100 mines</button>
  </div>
</template>

<script>
export default {
  methods: {
    setDifficulty(level) {
      this.$store.commit('setDifficulty', level);
      this.$router.push('/game');
    }
  }
};
</script>

<style>
.settings-screen {
  text-align: center;
}

.settings-screen button {
  margin: 10px;
}
</style>