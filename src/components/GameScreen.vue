<template>
  <div class="game-screen">
    <h2>Сапёр</h2>
    <div class="game-board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :class="['cell', { open: cell.open, mine: cell.mine && cell.open }]"
            @click="openCell(cell)"
            @contextmenu.prevent="flagCell(cell)"
        >
          <span v-if="cell.open">{{ cell.mine ? '💣' : cell.count }}</span>
          <span v-else>{{ cell.flag }}</span>
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="restartGame">Перезапуск</button>
      <button @click="goToSettings">Настройки</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: [],
      mines: 0,
      flags: 0,
      timer: null,
      time: 0,
      gameOver: false
    };
  },
  created() {
    this.initGame();
  },
  methods: {
    initGame() {
      const difficulty = this.$store.state.difficulty;
      let rows, cols, mines;
      if (difficulty === 'easy') {
        rows = 8;
        cols = 8;
        mines = 10;
      } else if (difficulty === 'medium') {
        rows = 16;
        cols = 16;
        mines = 40;
      } else if (difficulty === 'hard') {
        rows = 32;
        cols = 16;
        mines = 100;
      }
      this.board = this.createBoard(rows, cols, mines);
      this.mines = mines;
      this.flags = 0;
      this.time = 0;
      this.gameOver = false;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    createBoard(rows, cols, mines) {
      const board = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          row.push({
            id: `${i}-${j}`,
            mine: false,
            open: false,
            flag: '',
            count: 0
          });
        }
        board.push(row);
      }

      for (let i = 0; i < mines; i++) {
        let placed = false;
        while (!placed) {
          const row = Math.floor(Math.random() * rows);
          const col = Math.floor(Math.random() * cols);
          if (!board[row][col].mine) {
            board[row][col].mine = true;
            placed = true;
          }
        }
      }

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (!board[i][j].mine) {
            board[i][j].count = this.countMines(board, i, j);
          }
        }
      }
      return board;
    },
    countMines(board, row, col) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      let count = 0;
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
          if (board[newRow][newCol].mine) {
            count++;
          }
        }
      }
      return count;
    },
    openCell(cell) {
      if (cell.open || cell.flag || this.gameOver) return;
      cell.open = true;
      if (cell.mine) {
        this.gameOver = true;
        clearInterval(this.timer);
        alert('Game Over');
      } else if (cell.count === 0) {
        this.openAdjacentCells(cell);
      }
      this.checkWin();
    },
    openAdjacentCells(cell) {
      const [row, col] = cell.id.split('-').map(Number);
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < this.board.length && newCol >= 0 && newCol < this.board[0].length) {
          const adjacentCell = this.board[newRow][newCol];
          if (!adjacentCell.open && !adjacentCell.flag) {
            this.openCell(adjacentCell);
          }
        }
      }
    },
    flagCell(cell) {
      if (cell.open || this.gameOver) return;
      if (cell.flag === '') {
        cell.flag = '🚩';
        this.flags++;
      } else if (cell.flag === '🚩') {
        cell.flag = '?';
        this.flags--;
      } else {
        cell.flag = '';
      }
      this.checkWin();
    },
    checkWin() {
      let openedCells = 0;
      for (const row of this.board) {
        for (const cell of row) {
          if (cell.open) {
            openedCells++;
          }
        }
      }
      if (openedCells === this.board.length * this.board[0].length - this.mines && this.flags === this.mines) {
        this.gameOver = true;
        clearInterval(this.timer);
        const playerName = prompt('You win! Enter your name:');
        if (playerName) {
          this.$store.commit('updateLeaderboard', { name: playerName, time: this.time });
        }
      }
    },
    restartGame() {
      this.initGame();
    },
    goToSettings() {
      this.$router.push('/');
    }
  }
};
</script>

<style src="../assets/styles.css" scoped>
/*.game-screen {
  text-align: center;
}

.game-board {
  display: grid;
  gap: 2px;
}

.row {
  display: flex;
}

.cell {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  border: 1px solid #999;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cell.open {
  background-color: #bbb;
}

.cell.mine {
  background-color: #f44336;
}

.cell span {
  font-size: 18px;
}

.controls {
  margin-top: 20px;
}

.controls button {
  margin: 5px;
}

 */
</style>