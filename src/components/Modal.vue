<template>
  <div class="modal" @click="clickCallback">
    <div class="modal__container">
      <modal-header />
      <modal-body />
    </div>
  </div>
</template>

<script>
  // libs
  import { useStore } from 'vuex';

  // components
  import ModalHeader from '@/components/ModalHeader'
  import ModalBody from '@/components/ModalBody'

  export default {
    name: 'Modal',
    components: {
      ModalHeader,
      ModalBody,
    },

    setup() {
      const store = useStore()
      const closeModal = () => store.dispatch('closeModal')

      return { closeModal }
    },

    methods: {
      clickCallback(event) {
         if (event.target.classList[0] === 'modal') this.closeModal();
      }
    },
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    overflow: hidden;
    outline: none;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0;

    &::after {
      content: '';
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      background-color: rgba(51,51,51,.85);
    }

    .modal__container {
      position: absolute;
      height: auto;
      margin: 0 auto;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      width: 55%;
      padding: 15px 0;
      border-radius: 0 0 10px 10px;
      background-color: #fff;
      box-shadow: 0 25px 60px 0 rgba(0, 0, 0, 0.07), 0 0 20px 0 rgba(0, 0, 0, 0.3);

      @media screen and (max-width: 768px) {
        width: 90%;
      }
    }
  }
</style>
