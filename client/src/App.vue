<template>
  <div class="container">
    <img alt="Vue logo" src="./assets/abn-logo.png" />
    <Tree v-if="is_data_fetched" :nodes="nodes" />
  </div>
</template>

<script>
import axios from 'axios';
import Tree from './components/Tree.vue';

export default {
  name: 'App',
  components: {
    Tree,
  },
  data() {
    return {
      nodes: null,
      is_data_fetched: false,
    };
  },
  methods: {
    async fetchNodes() {
      const data = await axios.get('/api/data');

      return data['data'];
    },
  },
  async created() {
    this.nodes = await this.fetchNodes();
    this.is_data_fetched = true;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  width: 150px;
  height: 100px;
}
</style>
