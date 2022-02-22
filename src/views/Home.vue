<template>
  <div class="transactions">
    <h1>Transações</h1>

    <div class="transactions-header">
      <input v-model="term" type="text" placeholder="Pesquise pelo título" @input="filterStatus()">
      <select v-model="status">
        <option value="status">Todos os status</option>
        <option value="created">Solicitada</option>
        <option value="processing">Processando</option>
        <option value="processed">Concluída</option>
      </select>
    </div>

    <div class="transaction-wrapper">
      <div class="transaction-subtitles">
          <p class="item-subtitle col-lg">Título</p>
          <p class="item-subtitle col-lg">Descrição</p>
          <p class="item-subtitle col-sm">Status</p>
          <p class="item-subtitle col-sm">Valor</p>
      </div>
      <div v-for="(element, index) in data" :key="index" class="transaction-line" @click="clickModal(element)">
          <p class="item col-lg">{{ element.title }}</p>
          <p class="item col-lg">{{ element.description }}</p>
          <p class="item col-sm">{{ formatStatus(element.status) }}</p>
          <p class="item col-sm">{{ formatAmount(element.amount) }}</p>
      </div>
    </div>

    <modal v-if="modalActive" />
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

import { getTransactions } from '@/services';
import { formatNumber } from '@/helpers/numbers';

import Modal from '@/components/Modal';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  data() {
    return {
      transactionsData: [],
      data: [],
      searchTerm: null,
      status: 'status',
    }
  },
  mounted() {
    this.fetchData();
  },

  watch: {
    status() {
      this.filterStatus();
    }
  },

  computed: {
    ...mapState(['modalActive']),
  },

  methods: {
    ...mapActions(['openModal']),

    fetchData() {
      getTransactions().then(res => {
        if (!res || res.status != 200) return;
        this.transactionsData = res?.data;
        this.data = res?.data;
      });
    },

    // Here, i preferred to use a helper, because in the case of a large product it becomes scalable
    formatAmount(amount) {
      return formatNumber(amount);
    },

    formatStatus(status) {
      switch(status) {
        case 'created':
          return 'Solicitada';

        case 'processing':
          return 'Processando';

        case 'processed':
          return 'Concluída';

        default:
          return '-';
      }
    },


    filterTerm(term) {
      if (term) {
        return this.data.filter(item => {
          return term.toLowerCase().split(" ").every(el => item.title.toLowerCase().includes(el));
        });
      } else return this.data;
    },

    filterStatus() {
      // reset data
      this.data = this.transactionsData;

      // search filter
      this.data = this.filterTerm(this.term);

      if (this.status === 'status' || !this.data) return;
      this.data = this.data.filter(item => item.status === this.status);
    },

    clickModal(transaction) {
      this.openModal(transaction);
    },
  }
}
</script>

<style lang="scss" scoped>
.transactions {
    position: relative;
    border-radius: 20px;
    padding: 50px;
    margin: 15px;
    min-height: 100vh;
    height: auto;

    h1 {
      text-align: center;
    }
}

.transaction-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    margin: 0 auto;

    .transaction-line {
      cursor: pointer;
      margin: 18px 0;
    }

    .transaction-line,
    .transaction-subtitles {
      display: flex;
      justify-content: center;
    }

    .transaction-subtitles {
      margin: 30px 0 5px 0;

      p {
        font-weight: 600;
      }
    }
}

.item {
  font-size: 18px;
  margin: 0;
}

.item a,
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
    width: 30%;
}

.col-md {
    width: 25%;
}

.col-sm {
    width: 20%;
}
</style>
