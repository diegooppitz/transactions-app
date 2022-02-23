<template>
  <div class="transactions-table">
    <h1>Transações</h1>

    <div class="tt__header">
      <input v-model="term" type="text" placeholder="Pesquise pelo título" @input="filterStatus()">
      <select v-model="status">
        <option value="status">Todos os status</option>
        <option value="created">Solicitada</option>
        <option value="processing">Processando</option>
        <option value="processed">Concluída</option>
      </select>
    </div>

    <div class="tt__wrapper">
      <div class="tt__titles">
        <p class="tt__item-title col-lg">Título</p>
        <p class="tt__item-title tt__item-desc col-lg">Descrição</p>
        <p class="tt__item-title col-sm">Status</p>
        <p class="tt__item-title col-sm">Valor</p>
      </div>
      <div v-for="(element, index) in data" :key="index" class="tt__line" @click="clickModal(element)">
        <p class="tt__item col-lg">{{ element.title }}</p>
        <p class="tt__item tt__item-desc col-lg">{{ element.description }}</p>
        <p class="tt__item col-sm">{{ formatStatus(element.status) }}</p>
        <p class="tt__item col-sm">{{ formatAmount(element.amount) }}</p>
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
.transactions-table {
  position: relative;
  border-radius: 20px;
  padding: 50px;
  margin: 15px;
  width: 100%;
  min-height: 100vh;
  height: auto;

  @media screen and (max-width: 768px) {
    padding: 5px 0;
    margin: 0;
  }

  h1 {
    text-align: center;
  }

  .tt__header {
    input {
      width: 250px;
    }

    select {
      background-color: #fff;
      margin-left: 25px;
      width: 200px;
    }

    input,
    select {
      height: 35px;
      padding: 5px 10px;
      border-radius: 5px;
      outline: none;
      box-sizing: border-box;
      border: solid 1px #ccc;

      @media screen and (max-width: 768px) {
        width: 80%;
        margin: 7px auto;
      }
    }
  }

  .tt__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      width: 95%;
    }

    .tt__line,
    .tt__titles {
      display: flex;
      justify-content: center;
    }

    .tt__line {
      cursor: pointer;
      margin: 18px 0;
    }

    .tt__titles {
      margin: 30px 0 5px 0;

      p {
        font-weight: 600;
      }
    }

    .tt__item-title {
      font-size: 20px;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }

    }

    .tt__item {
      font-size: 18px;
      margin: 0;

      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }

    .tt__item-desc {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
}

.col-lg {
  width: 30%;

  @media screen and (max-width: 768px) {
    width: 32%;
  }
}

.col-sm {
  width: 20%;

  @media screen and (max-width: 768px) {
    width: 32%;
  }
}
</style>
