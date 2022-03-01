<template>
  <div class="modal-header">
    <template v-if="modalData">
      <h3>{{ modalData.title }}</h3>
      <img src="../assets/close.svg" @click="closeModal()">
    </template>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: "ModalHeader",

    setup() {
      const store = useStore()
      const modalData = computed(() => store.state.modalData);
      const closeModal = () => store.dispatch('closeModal')

      return { closeModal, modalData }
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