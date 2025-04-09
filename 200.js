/*给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

 

示例 1：

输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
示例 2：

输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
 

提示：

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] 的值为 '0' 或 '1'
*/
/**
 * @param {character[][]} grid
 * @return {number}
 */
function initUnionFind(unionFind){
    for(let i=0;i<unionFind.length;i++){
        unionFind[i]=i;
    }
}

function find(unionFind,x){
    if(unionFind[x]!==x){
        unionFind[x]=find(unionFind,unionFind[x]);
    }
    return unionFind[x];
}

//路径压缩
function Union(unionFind,x,y){
    let rootX=find(unionFind,x);
    let rootY=find(unionFind,y);
    if(rootX!==rootY){
        unionFind[rootY]=rootX;
    }
}
var numIslands = function(grid) {
    let m=grid.length;
    let n=grid[0].length;
    //注意大小要包含所有的格子
    let unionFind=new Array(m*n);
    let count=0;
    const dirs=[[0,1],[1,0]];
    const dummy=-1
    //初始化并查集
    initUnionFind(unionFind);
    //将矩阵内容存入并查集
    for(let x=0;x<m;x++){
        for(let y=0;y<n;y++){
            //将非岛屿部分和-1union
            if(grid[x][y]==="0"){
                Union(unionFind,n*x+y,dummy)
            }
            //将岛屿和右侧下侧的岛屿进行union
            if(grid[x][y]==="1"){
                for(d of dirs){
                    let r=x+d[0];
                    let c=y+d[1];
                    if(r>=m||c>=n)continue
                    if(grid[r][c]==="1"){
                        Union(unionFind,n*x+y,n*r+c);
                    }
                }
            }
        }
    }

    //计算岛屿个数
    let tmp=new Set();
    //要把-1的父亲给排除掉
    let rootnull=find(unionFind,dummy);
    for(let i=0;i<unionFind.length;i++){
        let root=find(unionFind,i);
        if(root!==rootnull){
            tmp.add(root);
        }
    }
    count=tmp.size;
    console.log(unionFind)
    console.log(tmp)
    return count;
    
};

console.log(numIslands([
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]))