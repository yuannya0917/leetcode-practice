/*给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

 

示例 1：

输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。
示例 2：

输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
 

提示：

1 <= nums.length <= 200
1 <= nums[i] <= 100 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    let sum=0;
    for(let i=0;i<nums.length;i++){
        sum+=nums[i];
    }
    //判断sum是不是偶数
    if(sum%2!=0){
        return false
    }

    
    sum/=2;
    let target=sum;
    //初始化背包
    let dp=new Array(nums.length).fill(0).map(()=>new Array(target+1).fill(false));
    for(let i=0;i<nums.length;i++){
        dp[i][0]=true;
    }
    dp[0][nums[0]]=true;
    for(let i=1;i<nums.length;i++){
        const num=nums[i]
        for(let j=1;j<=target;j++){
            if(j>=num){
                dp[i][j]=dp[i-1][j]|dp[i-1][j-num];
            }else{
                dp[i][j]=dp[i-1][j]
            }
        }
    }
    return dp[nums.length-1][target]
};

console.log(canPartition([[3,3,6,8,16,16,16,18,20]]))