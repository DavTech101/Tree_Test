<template>
  <div>
    <h3 @click="onCLick()">{{ nodes }}</h3>
  </div>
</template>

<script>
export default {
  name: 'NodesTree',
  props: {
    nodes: Array,
  },
  methods: {
    onCLick() {
      console.log('Clicked');
    },
  },
};
</script>

<style scoped>
div {
  margin: 2px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  text-decoration: none;
  background-color: #4caf50; /* Green */
}
</style>
