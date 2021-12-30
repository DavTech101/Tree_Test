<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="4" class="d-flex justify-center align-center">
          <div class="pa-2">
            <h3 class="pb-2">Countries in 2018 with the highest GDP</h3>
            <p>
              Gross domestic product by country allows you to compare the
              economies of the nations. It measures everything produced by
              everyone in the country whether they are citizens or foreigners.
              The data has been taken from
              <a
                href="https://www.thebalance.com/gdp-by-country-3-ways-to-compare-3306012"
                >The Balance</a
              >.
            </p>
          </div>
        </v-col>
        <v-col id="arc" />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Tree',
  props: {
    nodes: Array,
  },
  methods: {
    onCLick() {
      console.log('Clicked');
    },
    createTree(treenodes) {
      const dx = 4000;
      const dy = 4000;
      const width = 11520;
      const root = d3.hierarchy(treenodes);
      const tree = d3.tree().nodeSize([dx, dy]);
      const diagonal = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);
      const margin = { top: 10, right: 120, bottom: 10, left: 40 };

      root.y0 = 0;
      root.x0 = dy / 2;

      root.descendants().forEach((d, i) => {
        d.name = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
      });

      const svg = d3
        .select('#Tree')
        .append('svg')
        .attr('viewBox', [-margin.left, -margin.top, width, dx])
        .style('font', '10px sans-serif')
        .style('user-select', 'none');

      const gLink = svg
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5);

      const gNode = svg
        .append('g')
        .attr('cursor', 'pointer')
        .attr('pointer-events', 'all');

      return svg.node();
    },
  },
  mounted() {
    this.createTree(this.nodes[0]);
  },
};
</script>

<style scoped>
img {
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
