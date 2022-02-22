<template>
  <div class="chart-bar">
    <div class="chart-bar-content" :class="checkStatus()">
    </div>

    <div class="chart-bar-texts">
      <p>Solicitada</p>
      <p>Processando</p>
      <p>Concluída</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: "ChartBar",
    computed: {
      ...mapState(['modalData']),
    },
    methods: {
      checkStatus() {
        switch(this.modalData.status) {
          case 'created':
            return 'twenty-five';

          case 'processing':
            return 'half';

          case 'processed':
            return 'full';

          default:
            return '';
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .chart-bar {
    width: 70%;
    margin: 0 auto 20px auto;

    .chart-bar-content {
      height: 30px;
      background-color: #ccc;
      position: relative;

      &.twenty-five {
        width: 25%;
      }

      &.half {
        width: 50%;
      }

      &.full {
        width: 100%;
      }
    }

    .chart-bar-texts {
      display: flex;
      justify-content: space-between;
    }
  }
</style>