import { Injectable } from "@nestjs/common";

@Injectable()
export class ExampleService {
  /**
   * Definition for singly-linked list.
   * class ListNode {
   *     val: number;
   *     next: ListNode | null;
   *     constructor(val?: number, next?: ListNode | null) {
   *         this.val = (val === undefined ? 0 : val);
   *         this.next = (next === undefined ? null : next);
   *     }
   * }
   */

  middleNode(head: ListNode | null): ListNode | null {
    if (!head || !head.next) {
        return head;
    }
    let fast = head;
    let slow = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
  }

  customSortString(order: string, s: string): string {
    // declare sorted string
    let sorted = "";
    // declare hash set
    const hash = new Set<string>()
    // iterate over order:
    for(let l = 0; l < order.length; l++) {
        // get currend order
        const currOrder = order[l];
        // iterate over s string
        for(let r = 0; r < s.length; r++) {
            // get current char
            const char = s[r];
            // if s char equals to current order:
            if(char === currOrder) {
                // put into hash set
                hash.add(char)
                // add to sorted string
                sorted += char;
            }
        }
    }
    // iterate over s string:
    for(let i = 0; i < s.length; i++) {
        // if char not in hash set then add it to sorted string
        if(!hash.has(s[i])) sorted += s[i]
    }
    // return result
    return sorted
  };

  leastInterval(tasks: string[], n: number): number {
    let freqMap:{[key:string]:number} = {};
    let maxFreq:number = 0;
    let totalCount:number =0;

    for (let task of tasks){
        if(freqMap.hasOwnProperty(task)){
            freqMap[task] +=1;
        }else{
             freqMap[task] =1;
        }
        maxFreq = Math.max(freqMap[task],maxFreq);
        totalCount++;
    }

    let ans:number = (n+1)* (maxFreq-1);
    for(let key in freqMap){
        if(freqMap[key] === maxFreq){
            ans++;
        }
    }

    return Math.max(ans,totalCount);
  };

  exist(board: string[][], word: string): boolean {
    let ans = false

    const m = board.length
    const n = board[0].length
    const total = word.length

    const track = (i, j, l) => {
      if (l === total) {
        ans = true
        return
      }

      if (i >= m || j >= n || i < 0 || j < 0) return
      if (board[i][j] !== word[l]) return

      const pre = board[i][j]
      board[i][j] = '*'

      track(i + 1, j, l + 1)
      track(i, j + 1, l + 1)
      track(i - 1, j, l + 1)
      track(i, j - 1, l + 1)

      board[i][j] = pre
    }

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        track(i, j, 0)
      }
    }

    return ans
  }

  timeRequiredToBuy(tickets: number[], k: number): number {
    const compVal: number = tickets[k];
    let seconds: number = 0, i: number=0;
    for (i;i<tickets.length;i++) {
        if (i===k) seconds+=compVal;
        else if (i<k) seconds += Math.min(tickets[i],compVal);
        else seconds += Math.min(tickets[i],compVal-1);
    }
    return seconds;
  };

  minFallingPathSum(grid: number[][]): number {
    const n = grid.length;
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(Infinity));
    dp[0] = grid[0];

    for (let i = 1; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            for (let k = 0; k < n; ++k) {
                if (k === j) continue;
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + grid[i][j]);
            }
        }
    }

    return Math.min(...dp[n - 1]);
};

}