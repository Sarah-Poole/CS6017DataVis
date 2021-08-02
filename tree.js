//Create data (children are arrays of a parent object)
let treeData = [{children:[{children:[{},{},{}]},{children:[{children:[{}]}]},{},{children:[{},{children:[{},{}]}]}]}];
let root = treeData[0];
let i = 0;

//Define bfs function
function breadthFirstSearch(){
    let queue = new Queue(root);
    queue.push(root); //Add root of tree
    while(!queue.isEmpty()) { //While there are still nodes to traverse
        let element = queue.dequeue();
        //Change element to new color
        if (element.children != undefined) { 
            for(var i=0; i<element.children.length; i++) {
                queue.enqueue(element.children[i]) //Add any children to the queue
            }
        }
    }
}


window.onload = async function(){
    let margin = {top: 20, right: 120, bottom: 20, left: 120};
    let width = 960 - margin.right - margin.left;
    let height = 500 - margin.top - margin.bottom;

    //Create a d3 tree
    let tree = d3.tree().size([height, width]);

    //This will be the shape of what connects nodes
    var connection = function link(d) {
        return "M" + d.source.y + "," + d.source.x
        + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
        + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
        + " " + d.target.y + "," + d.target.x;
    }

    let finalTree = d3.select("#canvas")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let treeRoot = d3.hierarchy(root);
    tree(treeRoot);
    let nodes = treeRoot.descendants();
    let links = treeRoot.links();

    let node = finalTree.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    let nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {return "translate(" + d.y + "," + d.x + ")"; });

    nodeEnter.append("circle")
        .attr("r", 40)
        .style("fill", "blue");
    
    let link = finalTree.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
     
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", connection);
     
}
        

    // let margin = {top: 20, right: 0, bottom: 20, left: 0}
    // let width = document.getElementById("canvas").offsetWidth - margin.right - margin.left;
    // let height = document.getElementById("canvas").offsetHeight - margin.top - margin.bottom;

    //Create a d3 tree
    // let tree = d3.tree().size([height, width]);
    //Give the data relationshipes
    // let nodes = d3.hierarchy(treeData, d => d.children);
    //Map node data to the tree layout
    // nodes = tree(nodes);

    // let node = d3.select("#canvas")
    //     .selectAll(".node")
    //     .data(nodes.descendants())
    //     .join(
    //         enter => {
    //             enter.append("node")
    //             .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
    //         }
    //     )

    // let link = d3.select("#canvas")
    //         .selectAll(".link")
    //         .data(nodes.descendants().slice(1))
    //         .join(
    //             enter => {
    //                 enter.append("path")
    //                 .attr("class", "link")
    //                 .style("stroke", d => d.treeData)
    //             }
    //         )
    // d3.select("#canvas")
    //     .join(
    //         enter => {
    //             node.append("circle")
    //             .attr("r", 40)
    //             .attr("cx", 50)
    //             .attr("cy", 20)
    //             .style("fill", "blue");
    //         }
    //     )
//}