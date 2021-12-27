<template>
  <div class="container">
    <img alt="Vue logo" src="./assets/abn-logo.png" />
    <NodesTree :nodes="treeNodes" />
  </div>
</template>

<script>
import axios from 'axios';
import NodesTree from './components/NodesTree.vue';

export default {
  name: 'App',
  components: {
    NodesTree,
  },
  data() {
    return {
      nodes: [],
    };
  },
  methods: {
    async fetchNodes() {
      const data = await axios.get('http://localhost:4000/api/data');

      return data['data'];
    },
  },
  async created() {
    this.nodes = await this.fetchNodes();
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
