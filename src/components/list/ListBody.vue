<template>
  <div class="transactions-list">
    <div class="tl__wrapper">
      <div class="tl__titles">
        <p class="tl__item-title col-lg">Título</p>
        <p class="tl__item-title tl__item-desc col-lg">Descrição</p>
        <p class="tl__item-title col-sm">Status</p>
        <p class="tl__item-title col-sm">Valor</p>
      </div>
      <div v-for="(element, index) in data" :key="index" class="tl__line" @click="openModal(element)">
        <p class="tl__item col-lg">{{ element.title }}</p>
        <p class="tl__item tl__item-desc col-lg">{{ element.description }}</p>
        <p class="tl__item col-sm">{{ formatStatus(element.status) }}</p>
        <p class="tl__item col-sm">{{ formatAmount(element.amount) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// libs
import { useStore } from "vuex";
import { computed } from "vue";

// services
import { getTransactions } from "@/services";

// helpers
import { formatNumber } from "@/helpers/numbers";

export default {
  name: "ListBody",
  data() {
    return {
      transactionsData: [],
      data: [],
    };
  },
  setup() {
    const store = useStore();
    const status = computed(() => store.state.status);
    const term = computed(() => store.state.term);
    const openModal = data => store.dispatch("openModal", data);

    return { openModal, status, term };
  },
  watch: {
    status() {
      this.filterStatus();
    },
    term() {
      this.filterTerm(this.term);
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getTransactions().then(res => {
        if (!res || res.status != 200) return;
        this.transactionsData = res?.data;
        this.data = res?.data;
      });
    },

    filterStatus() {
      // reset data
      this.data = this.transactionsData;

      // search filter
      this.data = this.filterTerm(this.term);

      if (this.status.id === "status" || !this.data) return;
      this.data = this.data.filter(item => item.status === this.status.id);
    },

    filterTerm(term) {
      // reset data
      this.data = this.transactionsData;

      if (term) {
        this.data = this.data.filter(item => {
          return term
            .toLowerCase()
            .split(" ")
            .every(el => item.title.toLowerCase().includes(el));
        });
      } else return this.data;
    },

    // Here, i preferred to use a helper, because in the case of a large product it becomes scalable
    formatAmount(amount) {
      return formatNumber(amount);
    },

    formatStatus(status) {
      switch (status) {
        case "created":
          return "Solicitada";

        case "processing":
          return "Processando";

        case "processed":
          return "Concluída";

        default:
          return "-";
      }
    },

    clickModal(transaction) {
      this.openModal(transaction);
    },
  },
};
</script>

<style lang="scss" scoped>
.transactions-list {
  position: relative;
  border-radius: 20px;
  padding: 50px 0;
  width: 100%;
  min-height: 100vh;
  height: auto;

  @media screen and (max-width: 768px) {
    padding: 5px 0;
    margin: 0;
  }
  .tl__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      width: 95%;
    }

    .tl__line,
    .tl__titles {
      display: flex;
      justify-content: center;
    }

    .tl__line {
      cursor: pointer;
      margin: 18px 0;
    }

    .tl__titles {
      margin: 30px 0 5px 0;

      p {
        font-weight: 600;
      }
    }

    .tl__item-title {
      font-size: 20px;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }

    .tl__item {
      font-size: 18px;
      margin: 0;

      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }

    .tl__item-desc {
      @media screen and (max-width: 768px) {
        display: none;
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
}
</style>
