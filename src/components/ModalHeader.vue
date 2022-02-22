<template>
  <div class="modal-header">
    <template v-if="modalData">
      <h3>{{ modalData.title }}</h3>
      <img src="../assets/close.svg" @click="closeModal()">
    </template>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "ModalHeader",
    computed: {
      ...mapState(['modalData']),
    },
    methods: {
      ...mapActions(['closeModal']),
    },
  }
</script>

<style lang="scss" scoped>
  .modal-header {
    width: 100%;
    padding: 15px 0;

    h3 {
      font-size: 32px;
      margin: 0;
      padding: 0;
      text-align: center;
    }

    img {
      position: absolute;
      cursor: pointer;
      right: 15px;
      top: 10px;
      height: 25px;
      padding: 3px;
    }
  }
</style>