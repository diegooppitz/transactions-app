<template>
  <div class="transactions">
    <h1>Transações</h1>
    <div class="transactions-wrapper">
      <div class="transactions-subtitles">
          <p class="item-subtitle col-lg">Título</p>
          <p class="item-subtitle col-lg">Descrição</p>
          <p class="item-subtitle col-sm">Status</p>
          <p class="item-subtitle col-sm">Valor</p>
      </div>
      <div v-for="(element, index) in transactionsData" :key="index" class="line">
          <p class="item col-lg">{{element.title}}</p>
          <p class="item col-lg">{{ element.description }}</p>
          <p class="item col-sm">{{ element.status }}</p>
          <p class="item col-sm">{{ element.amount }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import { getTransactions } from '@/services'

export default {
  name: 'Home',
  data() {
    return {
      transactionsData: [],
    }
  },
  mounted() {
    getTransactions().then(res => {
      if (res.status != 200) return;
      console.log(res.data);
      this.transactionsData = res?.data
    })
  }
}
</script>

<style lang="scss" scoped>
.transactions {
    border-radius: 20px;
    padding: 50px;
    margin: 15px;
    min-height: 100vh;
    height: auto;

    h1 {
      text-align: center;
    }
}

.transactions-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    margin: 0 auto;

    .line,
    .transactions-subtitles {
      display: flex;
      justify-content: center;
    }

    .transactions-subtitles {
      margin: 30px 0 5px 0;

      p {
        font-weight: 600;
      }
    }
}

.item {
    font-size: 18px;
    margin: 18px 0;
}

.item a,
.create-vaccine,
.back-btn {
    margin: 0 8px;
    border-radius: 25px;
    border: none;
    width: 65px;
    height: 30px;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    color: #0000FF;
}

.item a:hover,
.back-btn:hover {
    opacity: 0.8;
}

.item-subtitle {
    font-size: 20px;
}

.col-lg {
    width: 25%;
}

.col-md {
    width: 20%;
}

.col-sm {
    width: 15%;
}
</style>
