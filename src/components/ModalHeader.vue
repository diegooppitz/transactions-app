<template>
  <div class="modal-header">
    <h3>Título</h3>
    <img src="../assets/close.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "ModalHeader",
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