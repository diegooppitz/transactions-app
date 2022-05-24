<template>
  <div class="transactions-list">
    <div class="tl__wrapper">
      <div v-for="(element, index) in data" :key="index" class="tl__line" @click="openModal(element)">
        <div class="tl__transaction">
          <p class="tl__item tl__item-title">{{ element.title }}</p>
          <p class="tl__item tl__item-desc">{{ element.description }}</p>
        </div>
        <div class="tl__item tl__infos">
          <p class="tl__item tl__value">{{ formatAmount(element.amount) }}</p>
          <span class="tl__status">{{ formatStatus(element.status) }}</span>
        </div>
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
import { checkStatus } from "@/helpers/checkStatus";

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
    // when status state change, call the filterStatus() after of filterTerm()
    status() {
      this.organizeFilter("status");
    },
    // when term state change, call the filterTerm() after of filterStatus()
    term() {
      this.organizeFilter("term");
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

    // reset data and organize the filters calls
    async organizeFilter(filterType) {
      // reset data
      this.data = this.transactionsData;

      if (filterType === "term") {
        await this.filterStatus();
        this.filterTerm();
      } else {
        await this.filterTerm();
        this.filterStatus();
      }
    },

    // return results for status id, using a simples filter validation
    filterStatus() {
      if (this.status.id === "status" || !this.data) return;
      this.data = this.data.filter(item => item.status === this.status.id);
    },

    // return results for user search by checking the formatted term and formatted titles of API objects
    filterTerm() {
      if (this.term && this.data) {
        const formatTerm = this.formatString(this.term);
        this.data = this.data.filter(item => {
          return formatTerm.split(" ").every(el => this.formatString(item.title).includes(el));
        });
      } else return this.data;
    },

    // remove accents with regex and format string to lower case
    formatString(string) {
      return string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },

    // Here, i preferred to use a helper, because in the case of a large product it becomes scalable
    formatAmount(amount) {
      return formatNumber(amount);
    },

    // call the checkStatus helper and return the formatted status
    formatStatus(status) {
      const isChartBar = false;

      return checkStatus(status, isChartBar);
    },

    // on click, open modal
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
    width: 60%;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      width: 90%;
    }

    .tl__line {
      display: flex;
      justify-content: center;
      cursor: pointer;
      margin: 5px 0;

      @media screen and (max-width: 768px) {
        justify-content: space-around;
      }
    }

    .tl__item {
      color: #757680;
    }

    .tl__item-title {
      font-weight: 700;
    }

    .tl__transaction {
      width: 40%;
      text-align: left;

      @media screen and (max-width: 768px) {
        width: 60%;
      }
    }

    .tl__title-value {
      width: 30%;
      text-align: right;
    }
    .tl__title-status {
      width: 25%;
      text-align: right;
    }

    .tl__infos {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      width: 55%;

      @media screen and (max-width: 768px) {
        width: 40%;
        margin: 16px 0;
        justify-content: flex-end;
        flex-direction: column;
      }
    }

    .tl__value {
      text-align: right;
      width: 54%;
    }

    .tl__status {
      width: 45%;
      text-align: right;
    }

    .tl__value,
    .tl__status {
      margin: 16px 0;
      font-size: 14px;

      @media screen and (max-width: 768px) {
        font-size: 14px;
        margin: 5px 0;
        width: 100%;
      }
    }

    .tl__desc {
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
  }
}
</style>
