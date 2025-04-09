/*215. 数组中的第K个最大元素
中等
相关标签
相关企业
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function HeapAdjust(H,start,end){
    let tmp=H[start];
    let i=2*start+1;//左子树
    while(i<=end){
        //右子树存在且大于左子节点
        if(i+1<=end&&H[i]>H[i+1]){
            i++;
        }

        //子节点大于当前父节点
        if(H[i]<tmp){
            H[start]=H[i];
            start=i;
            i=2*start+1; //更新左子节点
        }else{
            break;
        }
    }
    H[start]=tmp;
}

function HeapSort(H){
    //先构建最大堆
    for(let i=Math.floor((H.length-2)/2);i>=0;i--){
        HeapAdjust(H,i,H.length-1);
    }

  
    //堆排序
    for(let i=0;i<H.length-1;i++){
        let tmp=H[0];
        H[0]=H[H.length-1-i];//将最末尾移到最顶
        H[H.length-1-i]=tmp;//最顶移到末尾
        HeapAdjust(H,0,H.length-2-i);
    }
}

var findKthLargest = function(nums, k) {
    HeapSort(nums);
    console.log(nums);
    return nums[k-1];
};
console.log(findKthLargest([7,6,5,4,3,2,1],2))