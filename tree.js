//Create data (children are arrays of a parent object)
let treeData = [{children:[{children:[{},{},{}]},{children:[{children:[{}]}]},{},{children:[{},{children:[{},{}]}]}]}];
let root = treeData[0];
let i = 0;
let treeRoot;

//Define bfs function
function breadthFirstSearch(){
    let queue = [];
    let anim = 0;
    queue.push(treeRoot); //Add root of tree
    while(queue.length != 0) { //While there are still nodes to traverse
        let element = queue.shift();
        //Change element to new color
        d3.select("#node-"+element.id)
            .style("fill", "blue")
            .style("stroke", "steelblue")
            .transition().duration(1000).delay(500*anim)
            .style("fill", "coral")
            .style("stroke", "pink")
        anim++;    
        if (element.children != undefined) { 
            for(var i=0; i<element.children.length; i++) {
                queue.push(element.children[i]) //Add any children to the queue
            }
        }
    }
}

//Define dfs function
function depthFirstSearch(){
    let queue = [];
    let anim = 0;
    queue.push(treeRoot);
    while(queue.length != 0) {
        let element = queue.pop();
        //Change element to new color
        d3.select("#node-"+element.id)
            .style("fill", "blue")
            .style("stroke", "steelblue")
            .transition().duration(1000).delay(500*anim)
            .style("fill", "lavender")
            .style("stroke", "purple")
        anim++;
        if(element.children != undefined) {
            for(var i=0; i<element.children.length; i++) {
                queue.push(element.children[element.children.length-i-1]);
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

    //Get d3 objects for root, nodes and links
    treeRoot = d3.hierarchy(root);
    tree(treeRoot);
    let nodes = treeRoot.descendants();
    let links = treeRoot.links();

    let node = finalTree.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); })
        .attr("cx",function(d){return d.x;})
        .attr("cy",function(d){return d.y;})
        .attr("r", 20)

    let nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {return "translate(" + d.y + "," + d.x + ")"; });

    nodeEnter.append("circle")
        .attr("id",function(d){return "node-"+d.id})
        .attr("r", 20)
        .style("fill", "blue");

    let link = finalTree.selectAll("path.link")
        .data(links, function(d) { return d.target.id; })
        .enter()
        .insert("path", "g.node")
        .attr("class", "link")
        .attr("d", connection);

    d3.select("#nodes").raise();
}