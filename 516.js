/*给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。

子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。

 

示例 1：

输入：s = "bbbab"
输出：4
解释：一个可能的最长回文子序列为 "bbbb" 。
示例 2：

输入：s = "cbbd"
输出：2
解释：一个可能的最长回文子序列为 "bb" 。
  */

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    let reverS=s.split("").reverse().join("");
    let n=s.length
    //console.log(reverS)
    if(n===1){
        return 1;
    }
    let dp=new Array(n+1).fill(0).map(()=>new Array(n+1).fill(0));

    for(let i=1;i<=n;i++){
        for(let j=1;j<=n;j++){
            if(s[i-1]===reverS[j-1]){
                dp[i][j]=dp[i-1][j-1]+1;
            }else if(s[i-1]!==reverS[j-1]){
                dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
            }
        }
    }
    return dp[n][n];
}

console.log(longestPalindromeSubseq("cbbd"))