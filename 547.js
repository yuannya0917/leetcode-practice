/*
有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。

输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
输出：2

输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
输出：3
 */
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
function initUnionFind(UnionFind){
    for(let i=0;i<UnionFind.length;i++){
        UnionFind[i]=i;
    }
}

function find(UnionFind,x){
    if(UnionFind[x]!==x){
        UnionFind[x]=find(UnionFind,UnionFind[x]);
    }
    return UnionFind[x];
}

function Union(UnionFind,x,y){
    //路径压缩，直接进行合并
    let rootX=find(UnionFind,x);
    let rootY=find(UnionFind,y);
    if(rootX!=rootY){
        UnionFind[rootY]=rootX;
    }
}

var findCircleNum = function(isConnected) {
    //新建数组
    let UnionFind=new Array(isConnected.length);
    let count=0;
    //初始化并查集
    initUnionFind(UnionFind);
    //将矩阵内容存入并查集
    for(let i=0;i<isConnected.length;i++){
        for(let j=0;j<isConnected.length;j++){
            if(i!==j){
                if(isConnected[i][j]===1){
                    Union(UnionFind,i,j);
                }
            }
        }
    }

    let tmp=new Set();
    for(let i=0;i<UnionFind.length;i++){
        let root=find(UnionFind,i);
        tmp.add(root);
    }
    count=tmp.size;
    return count;
};
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]));

