<template>
  <div class="modal" @click="clickCallback">
    <div class="modal-container">
      <modal-header />
      <modal-body />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import ModalHeader from '@/components/ModalHeader'
  import ModalBody from '@/components/ModalBody'

  export default {
    name: 'Modal',
    components: {
      ModalHeader,
      ModalBody,
    },

    methods: {
      ...mapActions(['closeModal']),
      clickCallback(event) {
         if (event.target.classList[0] === 'modal') this.closeModal();
      }
    },
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 50px 0;
    overflow: none;
    outline: none;

    &::after {
      content: '';
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(51,51,51,.85);
      z-index: -1;
    }

    .modal-container {
      position: relative;
      margin: 10% auto 0 auto;
      background-color: #fff;
      padding: 15px 0;
      max-width: 55%;
      height: auto;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 25px 60px 0 rgba(0, 0, 0, 0.07), 0 0 20px 0 rgba(0, 0, 0, 0.3);
    }
  }
</style>
