// Creates tree structure from nodes array
const createTree = (nodes) => {
    let map = {},
        roots = [];

    for (let i = 0; i < nodes.length; i += 1) {
        map[nodes[i].name] = i; // initialize the map of names
        nodes[i].children = []; // initialize the children in original list of nodes
    }

    for (let i = 0; i < nodes.length; i += 1) {
        let node = nodes[i];

        if (node.parent !== '') {
            // if you have dangling branches check that map[node.parent] exists
            nodes[map[node.parent]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
};

export default createTree;