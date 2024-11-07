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

  removeNodes(head: ListNode | null): ListNode | null {
    const stack: ListNode[] = []
    while (head !== null) {
      while (stack.length > 0) {
          if (stack[stack.length - 1].val < head.val) 
              stack.pop();
          else
              break;
      }
      stack.push(head);
      head = head.next;
    }
    // Link ListNodes in Stack
    stack.reduce((p, c) => {
      p.next = c;
      return c;
    });
    return stack[0];
  };

  findRelativeRanks(score: number[]): string[] {
    const medals = ['Gold', 'Silver', 'Bronze']
    const ranking = [...score]
      .sort((a, b) => b - a) // Sort items by descending order
      .reduce((prev, current, index) => {
         prev[current] = index < 3 ? `${medals[index]} Medal` : `${index + 1}`
         return prev
      }, {})

    return score.map((position, index) => ranking[position])
  };

  appendCharacters(s: string, t: string): number {
    const n = t.length;
    let tPointer = 0;

    // Iterate through the characters of s using an index-based loop
    for (let sPointer = 0; sPointer < s.length; sPointer++) {
        // Check if the characters match
        if (tPointer < n && s[sPointer] === t[tPointer]) {
            tPointer++;
        }
    }

    // Return the number of characters that need to be appended to s
    return n - tPointer;
  };

  intersect(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    let x = 0;
    let y = 0;
    const result = [];

    while (x < nums1.length && y < nums2.length) {
        if (nums1[x] < nums2[y]) {
            x++;
        } else if (nums1[x] > nums2[y]) {
            y++;
        } else {
            result.push(nums1[x]);
            x++;
            y++;
        }
    }
    return result;
  };

  averageWaitingTime(customers: number[][]): number {
    var st=0;
    var waitTime=0;
    var sumWaitTime=0;
    for(var i=0 ; i<customers.length ; i++){
        if(st < customers[i][0]){
            waitTime=customers[i][1];
            st=(customers[i][0]+customers[i][1]);
            sumWaitTime+=waitTime;
            continue;
        }
        waitTime=st-customers[i][0]+customers[i][1];
        st=(st+customers[i][1]);
        sumWaitTime+=waitTime;
    }
    var result = ( sumWaitTime)/(customers.length);
    return result;
  };

  postorder(root: _Node | null): number[] {
    if (root === null) return []

    const stack: Node[] = [root]
    const result: number[] = []

    while (stack.length > 0) {
        const node = stack.pop()!
        result.push(node.val)
        for (const child of node.children) {
            stack.push(child)
        }
    }

    return result.reverse()
  };

  // TypeScript

  largestCombination(candidates: number[]): number {
  // Create array to store count of 1's at each bit position (32 bits for integers)
    const ans: number[] = new Array(32).fill(0);
    
    // Iterate through each number in candidates array
    for (const x of candidates) {
        // Count the number of 1's at each bit position for current number
        find(x, ans);
    }
    
    // Find the maximum count of 1's across all bit positions
    let res = 0;
    for (let i = 0; i < 32; i++) {
        res = Math.max(res, ans[i]);
    }
    
    // Return the largest possible combination
    return res;
  }

  // Helper function to count number of 1's at each bit position
  find(n: number, ans: number[]): void {
    // Start from rightmost bit (31st position)
    let j = 31;
    
    // Continue until all bits are processed
    while (n > 0) {
        // Get the rightmost bit using bitwise AND with 1
        const a = n & 1;
        
        // Add the bit count to corresponding position in ans array
        ans[j] += a;
        
        // Right shift n by 1 to process next bit
        n >>= 1;
        
        // Move to next bit position from right to left
        j--;
    }
  }
}