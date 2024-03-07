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
}