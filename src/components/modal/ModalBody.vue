<template>
  <div class="modal-body">
    <chart-bar />

    <div class="mb__info">
      <h4>Transferindo de</h4>
      <span></span>

      <div class="mb__info-texts">
        <template v-if="modalData">
          <p>{{ modalData.from }}</p>
          <p>{{ formatAmount(modalData.amount) }}</p>
        </template>
      </div>
    </div>

    <div class="mb__info">
      <h4>Para</h4>
      <span></span>

      <div class="mb__info-texts">
        <template v-if="modalData">
          <p>{{ modalData.to }}</p>
          <p>{{ formatAmount(modalData.amount) }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// libs
import { computed } from "vue";
import { useStore } from "vuex";

// helpers
import { formatNumber } from "@/helpers/numbers";

// components
import ChartBar from "@/components/modal/ChartBar";

export default {
  name: "ModalBody",
  components: {
    ChartBar,
  },
  setup() {
    const store = useStore();
    const modalData = computed(() => store.state.modalData);

    return { modalData };
  },
  methods: {
    formatAmount(amount) {
      return formatNumber(amount);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  padding: 35px 0;
  width: 100%;

  .mb__info {
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    h4 {
      font-size: 25px;
      font-weight: 600;
      text-align: left;
      margin-bottom: 10px;
    }

    span {
      background-color: #ccc;
      display: block;
      height: 2px;
      width: 100%;
    }

    p {
      text-align: left;
    }

    .mb__info-texts {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
