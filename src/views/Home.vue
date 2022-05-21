<template>
  <div class="home">
    <list-header />
    <list-body />
    <modal v-show="modalActive" />
  </div>
</template>

<script>
// libs
import { useStore } from "vuex";
import { computed } from "vue";

// components
import ListHeader from "@/components/list/ListHeader.vue";
import ListBody from "@/components/list/ListBody.vue";
import Modal from "@/components/modal/ModalComponent";

export default {
  name: "Home",
  components: {
    ListHeader,
    ListBody,
    Modal,
  },

  setup() {
    const store = useStore();
    const modalActive = computed(() => store.state.modalActive);
    const openModal = data => store.dispatch("openModal", data);

    return { openModal, modalActive };
  },
};
</script>
