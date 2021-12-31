<template>
  <div class="container">
    <div class="control-tile">
      <h3><strong>Controls:</strong></h3>
      <ul>
        <li>Click on node to show the description and name</li>
        <li>Double click on node to reveal or hide the children nodes</li>
        <li>Green circles depict nodes containing children nodes</li>
      </ul>
    </div>
    <div class="nodetile">
      <h2>{{ nodeName }}</h2>
      <p>{{ nodeDescription }}</p>
    </div>
    <button class="clear" @click="clearTile()">&#10005;</button>
  </div>
  <span id="tree" />
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Tree',
  props: {
    nodes: Array,
  },
  data() {
    return {
      nodeName: this.nodeName,
      nodeDescription: this.nodeDescription,
    };
  },
  methods: {
    clearTile() {
      this.nodeName = '';
      this.nodeDescription = '';
    },
    createTree(treenodes) {
      const dx = 100;
      const width = 500;
      const dy = width / 6;
      const root = d3.hierarchy(treenodes);

      const margin = { top: 50, right: 120, bottom: 10, left: 200 };

      root.y0 = 0;
      root.x0 = dy / 2;
      root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
      });

      const svg = d3
        .select('#tree')
        .append('svg')
        .attr('viewBox', [-margin.left, -margin.top, width, dx])
        .style('font', '12px sans-serif')
        .style('user-select', 'none');

      const gLink = svg
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.8)
        .attr('stroke-width', 2.5);

      const gNode = svg
        .append('g')
        .attr('cursor', 'pointer')
        .attr('pointer-events', 'all');

      const tree = d3.tree().nodeSize([dx, dy]);

      const diagonal = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);

      const setProps = (name, decription) => {
        this.nodeName = name;
        this.nodeDescription = decription;
      };

      const update = (source) => {
        const duration = 400;
        const nodes = root.descendants().reverse();
        const links = root.links();

        tree(root);

        let left = root;
        let right = root;
        root.eachBefore((node) => {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
        });

        const height = right.x - left.x + margin.top + margin.bottom;

        const transition = svg
          .transition()
          .duration(duration)
          .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
          .tween(
            'resize',
            window.ResizeObserver ? null : () => () => svg.dispatch('toggle')
          );

        // Update the nodes…
        const node = gNode.selectAll('g').data(nodes, (d) => d.id);

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node
          .enter()
          .append('g')
          .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
          .attr('fill-opacity', 10)
          .attr('stroke-opacity', 10)
          .on('click', (event, d) => {
            setProps(d.data.name, d.data.description);
          })
          .on('dblclick', (event, d) => {
            d.children = d.children ? null : d._children;
            update(d);
          });

        nodeEnter
          .append('circle')
          .attr('r', 4.5)
          .attr('fill', (d) => (d._children ? '#146356' : '#999'))
          .attr('stroke-width', 10);

        nodeEnter
          .append('text')
          .attr('dy', '0.31em')
          .attr('x', (d) => (d._children ? -6 : 6))
          .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
          .text((d) => d.data.name)
          .clone(true)
          .lower()
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 3)
          .attr('stroke', 'white');

        // Transition nodes to their new position.
        const nodeUpdate = node
          .merge(nodeEnter)
          .transition(transition)
          .attr('transform', (d) => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node
          .exit()
          .transition(transition)
          .remove()
          .attr('transform', (d) => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0);

        // Update the links…
        const link = gLink.selectAll('path').data(links, (d) => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link
          .enter()
          .append('path')
          .attr('d', (d) => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
          });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition).attr('d', diagonal);

        // Transition exiting nodes to the parent's new position.
        link
          .exit()
          .transition(transition)
          .remove()
          .attr('d', (d) => {
            const o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
          });

        // Stash the old positions for transition.
        root.eachBefore((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      };

      update(root);

      return svg.node();
    },
  },
  mounted() {
    this.createTree(this.nodes[0]);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-evenly;
}

.control-tile {
  text-align: left;
}

ul {
  padding: 0;
  margin-right: 5rem;
}

li:nth-child(n + 2) {
  padding-top: 1em;
}

.nodetile {
  margin-right: 10px;
  width: 200px;
  height: 130px;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  background-color: #146356;
}

.clear {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff5959;
  color: inherit;
  border: none;
  padding: 1px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 50%;
  width: 2rem;
  aspect-ratio: 1;
}

.clear:hover {
  background: orangered;
}
</style>
