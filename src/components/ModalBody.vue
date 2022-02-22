<template>
  <div class="modal-body">
    <div class="modal-bar-container">
      <div class="modal-bar-content"></div>

      <div class="modal-bar-texts">
        <p>Solicitada</p>
        <p>Processando</p>
        <p>Concluída</p>
      </div>
    </div>

    <div class="modal-info">
      <h4>Transferindo de</h4>
      <span></span>

      <div class="modal-info-texts">
        <template v-if="modalData">
          <p>{{ modalData.from }}</p>
          <p>{{ formatAmount(modalData.amount) }}</p>
        </template>
      </div>
    </div>

    <div class="modal-info">
      <h4>Para</h4>
      <span></span>

      <div class="modal-info-texts">
        <template v-if="modalData">
          <p>{{ modalData.to }}</p>
          <p>{{ formatAmount(modalData.amount) }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import { formatNumber } from '@/helpers/numbers';

  export default {
    name: "ModalBody",
    computed: {
      ...mapState(['modalData']),
    },
    methods: {
      formatAmount(amount) {
        return formatNumber(amount);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .modal-body {
    padding: 35px 0;
    width: 100%;

    .modal-bar-container {
      width: 70%;
      margin: 0 auto 20px auto;
    }

    .modal-bar-content {
      height: 30px;
      background-color: #ccc;
    }

    .modal-bar-texts {
      display: flex;
      justify-content: space-between;
    }

    .modal-info {
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

      .modal-info-texts {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>