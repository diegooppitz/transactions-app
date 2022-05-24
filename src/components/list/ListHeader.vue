<template>
  <div class="list-header">
    <h1 class="lh__title">Últimas transações</h1>
    <div class="lh__content">
      <input v-model="term" type="text" placeholder="Pesquise pelo título" @input="changeTerm" />
      <v-select
        v-model="status"
        class="lh__select"
        :clearable="false"
        :searchable="false"
        :options="selectOptions"
        label="name"
        @option:selected="changeStatus"
      >
        <template #option="{ name }">
          {{ name }}
        </template>
        <template #selected-option="{ name }">
          {{ name }}
        </template>
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes" class="arrow-down"></span>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>
// libs
import vSelect from "vue-select";
import { useStore } from "vuex";

export default {
  name: "ListHeader",
  components: {
    vSelect,
  },
  data() {
    return {
      status: {
        id: "status",
        name: "Todos os status",
      },
      selectOptions: [
        {
          id: "status",
          name: "Todos os status",
        },
        {
          id: "created",
          name: "Solicitada",
        },
        {
          id: "processing",
          name: "Processando",
        },
        {
          id: "processed",
          name: "Concluída",
        },
      ],
    };
  },
  setup() {
    const store = useStore();
    const changeStatus = value => store.dispatch("changeStatus", value);
    const changeTerm = value => store.dispatch("changeTerm", value);

    return { changeStatus, changeTerm };
  },
};
</script>

<style lang="scss" scoped>
.list-header {
  .lh__title {
    margin: 50px 0 30px 0;
    font-size: 24px;
  }
  .lh__content {
    display: flex;
    justify-content: center;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  .lh__select {
    margin-left: 25px;
  }

  input {
    width: 250px;
    padding: 5px 10px;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
    border: solid 1px #ccc;
  }

  input,
  .lh__select {
    height: 35px;
    width: 230px;

    @media screen and (max-width: 768px) {
      width: 85%;
      margin: 7px auto;
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/_v-select";

.lh__select {
  width: 250px;
}
</style>
