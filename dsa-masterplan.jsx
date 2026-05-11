import { useState, useMemo } from "react";

const PATTERNS = [
  "Arrays & Hashing","Two Pointers","Sliding Window","Binary Search",
  "Stack","Linked List","Trees","Tries","Heap / Priority Queue",
  "Backtracking","Graphs","Advanced Graphs","1D Dynamic Programming",
  "2D Dynamic Programming","Greedy","Intervals","Math & Bit Manipulation",
  "Monotonic Stack","String Manipulation","Divide & Conquer"
];

const ALL_QUESTIONS = [
  // ─── ARRAYS & HASHING (35) ───
  {id:1,title:"Two Sum",lc:1,diff:"Easy",pat:"Arrays & Hashing"},
  {id:2,title:"Contains Duplicate",lc:217,diff:"Easy",pat:"Arrays & Hashing"},
  {id:3,title:"Valid Anagram",lc:242,diff:"Easy",pat:"Arrays & Hashing"},
  {id:4,title:"Group Anagrams",lc:49,diff:"Medium",pat:"Arrays & Hashing"},
  {id:5,title:"Top K Frequent Elements",lc:347,diff:"Medium",pat:"Arrays & Hashing"},
  {id:6,title:"Product of Array Except Self",lc:238,diff:"Medium",pat:"Arrays & Hashing"},
  {id:7,title:"Encode and Decode Strings",lc:271,diff:"Medium",pat:"Arrays & Hashing"},
  {id:8,title:"Longest Consecutive Sequence",lc:128,diff:"Medium",pat:"Arrays & Hashing"},
  {id:9,title:"Sort Colors",lc:75,diff:"Medium",pat:"Arrays & Hashing"},
  {id:10,title:"Majority Element",lc:169,diff:"Easy",pat:"Arrays & Hashing"},
  {id:11,title:"Pascal's Triangle",lc:118,diff:"Easy",pat:"Arrays & Hashing"},
  {id:12,title:"Find All Duplicates in an Array",lc:442,diff:"Medium",pat:"Arrays & Hashing"},
  {id:13,title:"Set Matrix Zeroes",lc:73,diff:"Medium",pat:"Arrays & Hashing"},
  {id:14,title:"Spiral Matrix",lc:54,diff:"Medium",pat:"Arrays & Hashing"},
  {id:15,title:"Rotate Image",lc:48,diff:"Medium",pat:"Arrays & Hashing"},
  {id:16,title:"Subarray Sum Equals K",lc:560,diff:"Medium",pat:"Arrays & Hashing"},
  {id:17,title:"Longest Subarray with Sum K",lc:325,diff:"Medium",pat:"Arrays & Hashing"},
  {id:18,title:"Find Pivot Index",lc:724,diff:"Easy",pat:"Arrays & Hashing"},
  {id:19,title:"Running Sum of 1D Array",lc:1480,diff:"Easy",pat:"Arrays & Hashing"},
  {id:20,title:"Count Subarrays With Score Less Than K",lc:2302,diff:"Hard",pat:"Arrays & Hashing"},
  {id:21,title:"Number of Good Pairs",lc:1512,diff:"Easy",pat:"Arrays & Hashing"},
  {id:22,title:"Intersection of Two Arrays II",lc:350,diff:"Easy",pat:"Arrays & Hashing"},
  {id:23,title:"First Missing Positive",lc:41,diff:"Hard",pat:"Arrays & Hashing"},
  {id:24,title:"Range Sum Query – Immutable",lc:303,diff:"Easy",pat:"Arrays & Hashing"},
  {id:25,title:"Insert Delete GetRandom O(1)",lc:380,diff:"Medium",pat:"Arrays & Hashing"},
  {id:26,title:"4Sum",lc:18,diff:"Medium",pat:"Arrays & Hashing"},
  {id:27,title:"Find the Duplicate Number",lc:287,diff:"Medium",pat:"Arrays & Hashing"},
  {id:28,title:"Rearrange Array Elements by Sign",lc:2149,diff:"Medium",pat:"Arrays & Hashing"},
  {id:29,title:"Maximum Subarray",lc:53,diff:"Medium",pat:"Arrays & Hashing"},
  {id:30,title:"Best Time to Buy and Sell Stock",lc:121,diff:"Easy",pat:"Arrays & Hashing"},
  {id:31,title:"Next Permutation",lc:31,diff:"Medium",pat:"Arrays & Hashing"},
  {id:32,title:"Find All Numbers Disappeared",lc:448,diff:"Easy",pat:"Arrays & Hashing"},
  {id:33,title:"Max Points on a Line",lc:149,diff:"Hard",pat:"Arrays & Hashing"},
  {id:34,title:"Minimum Window Substring (Hash)",lc:76,diff:"Hard",pat:"Arrays & Hashing"},
  {id:35,title:"Number of Subarrays with Bounded Max",lc:795,diff:"Medium",pat:"Arrays & Hashing"},

  // ─── TWO POINTERS (25) ───
  {id:36,title:"Valid Palindrome",lc:125,diff:"Easy",pat:"Two Pointers"},
  {id:37,title:"Two Sum II – Input Array Is Sorted",lc:167,diff:"Medium",pat:"Two Pointers"},
  {id:38,title:"3Sum",lc:15,diff:"Medium",pat:"Two Pointers"},
  {id:39,title:"Container With Most Water",lc:11,diff:"Medium",pat:"Two Pointers"},
  {id:40,title:"Trapping Rain Water",lc:42,diff:"Hard",pat:"Two Pointers"},
  {id:41,title:"Remove Duplicates from Sorted Array",lc:26,diff:"Easy",pat:"Two Pointers"},
  {id:42,title:"Move Zeroes",lc:283,diff:"Easy",pat:"Two Pointers"},
  {id:43,title:"Squares of a Sorted Array",lc:977,diff:"Easy",pat:"Two Pointers"},
  {id:44,title:"Boats to Save People",lc:881,diff:"Medium",pat:"Two Pointers"},
  {id:45,title:"3Sum Closest",lc:16,diff:"Medium",pat:"Two Pointers"},
  {id:46,title:"Backspace String Compare",lc:844,diff:"Easy",pat:"Two Pointers"},
  {id:47,title:"Sort Array By Parity",lc:905,diff:"Easy",pat:"Two Pointers"},
  {id:48,title:"Longest Mountain in Array",lc:845,diff:"Medium",pat:"Two Pointers"},
  {id:49,title:"Minimum Size Subarray Sum",lc:209,diff:"Medium",pat:"Two Pointers"},
  {id:50,title:"4Sum",lc:18,diff:"Medium",pat:"Two Pointers"},
  {id:51,title:"Partition Labels",lc:763,diff:"Medium",pat:"Two Pointers"},
  {id:52,title:"Merge Sorted Array",lc:88,diff:"Easy",pat:"Two Pointers"},
  {id:53,title:"Remove Element",lc:27,diff:"Easy",pat:"Two Pointers"},
  {id:54,title:"Dutch National Flag",lc:75,diff:"Medium",pat:"Two Pointers"},
  {id:55,title:"Is Subsequence",lc:392,diff:"Easy",pat:"Two Pointers"},
  {id:56,title:"Longest Palindromic Substring",lc:5,diff:"Medium",pat:"Two Pointers"},
  {id:57,title:"Palindromic Substrings",lc:647,diff:"Medium",pat:"Two Pointers"},
  {id:58,title:"Reverse Words in a String",lc:151,diff:"Medium",pat:"Two Pointers"},
  {id:59,title:"Remove Nth Node From End of List",lc:19,diff:"Medium",pat:"Two Pointers"},
  {id:60,title:"Subarrays with K Different Integers",lc:992,diff:"Hard",pat:"Two Pointers"},

  // ─── SLIDING WINDOW (25) ───
  {id:61,title:"Best Time to Buy and Sell Stock",lc:121,diff:"Easy",pat:"Sliding Window"},
  {id:62,title:"Longest Substring Without Repeating Characters",lc:3,diff:"Medium",pat:"Sliding Window"},
  {id:63,title:"Longest Repeating Character Replacement",lc:424,diff:"Medium",pat:"Sliding Window"},
  {id:64,title:"Permutation in String",lc:567,diff:"Medium",pat:"Sliding Window"},
  {id:65,title:"Minimum Window Substring",lc:76,diff:"Hard",pat:"Sliding Window"},
  {id:66,title:"Sliding Window Maximum",lc:239,diff:"Hard",pat:"Sliding Window"},
  {id:67,title:"Find All Anagrams in a String",lc:438,diff:"Medium",pat:"Sliding Window"},
  {id:68,title:"Fruit Into Baskets",lc:904,diff:"Medium",pat:"Sliding Window"},
  {id:69,title:"Max Consecutive Ones III",lc:1004,diff:"Medium",pat:"Sliding Window"},
  {id:70,title:"Number of Substrings Containing All Three Characters",lc:1358,diff:"Medium",pat:"Sliding Window"},
  {id:71,title:"Count Number of Nice Subarrays",lc:1248,diff:"Medium",pat:"Sliding Window"},
  {id:72,title:"Replace the Substring for Balanced String",lc:1234,diff:"Medium",pat:"Sliding Window"},
  {id:73,title:"Max Points You Can Obtain from Cards",lc:1423,diff:"Medium",pat:"Sliding Window"},
  {id:74,title:"Subarray Product Less Than K",lc:713,diff:"Medium",pat:"Sliding Window"},
  {id:75,title:"Longest Subarray of 1's After Deleting One Element",lc:1493,diff:"Medium",pat:"Sliding Window"},
  {id:76,title:"Grumpy Bookstore Owner",lc:1052,diff:"Medium",pat:"Sliding Window"},
  {id:77,title:"Frequency of the Most Frequent Element",lc:1838,diff:"Medium",pat:"Sliding Window"},
  {id:78,title:"Longest Nice Subarray",lc:2401,diff:"Medium",pat:"Sliding Window"},
  {id:79,title:"Maximum Average Subarray I",lc:643,diff:"Easy",pat:"Sliding Window"},
  {id:80,title:"Diet Plan Performance",lc:1176,diff:"Easy",pat:"Sliding Window"},
  {id:81,title:"K Radius Subarray Averages",lc:2090,diff:"Medium",pat:"Sliding Window"},
  {id:82,title:"Minimum Swaps to Group All 1's Together II",lc:2134,diff:"Medium",pat:"Sliding Window"},
  {id:83,title:"Maximum Sum of Almost Unique Subarray",lc:2841,diff:"Medium",pat:"Sliding Window"},
  {id:84,title:"Minimum Number of Flips to Make Binary Grid Palindrome",lc:2781,diff:"Hard",pat:"Sliding Window"},
  {id:85,title:"Longest Continuous Subarray With Absolute Diff ≤ Limit",lc:1438,diff:"Medium",pat:"Sliding Window"},

  // ─── BINARY SEARCH (25) ───
  {id:86,title:"Binary Search",lc:704,diff:"Easy",pat:"Binary Search"},
  {id:87,title:"Search a 2D Matrix",lc:74,diff:"Medium",pat:"Binary Search"},
  {id:88,title:"Koko Eating Bananas",lc:875,diff:"Medium",pat:"Binary Search"},
  {id:89,title:"Find Minimum in Rotated Sorted Array",lc:153,diff:"Medium",pat:"Binary Search"},
  {id:90,title:"Search in Rotated Sorted Array",lc:33,diff:"Medium",pat:"Binary Search"},
  {id:91,title:"Time Based Key-Value Store",lc:981,diff:"Medium",pat:"Binary Search"},
  {id:92,title:"Median of Two Sorted Arrays",lc:4,diff:"Hard",pat:"Binary Search"},
  {id:93,title:"Find Peak Element",lc:162,diff:"Medium",pat:"Binary Search"},
  {id:94,title:"First Bad Version",lc:278,diff:"Easy",pat:"Binary Search"},
  {id:95,title:"Sqrt(x)",lc:69,diff:"Easy",pat:"Binary Search"},
  {id:96,title:"Count of Smaller Numbers After Self",lc:315,diff:"Hard",pat:"Binary Search"},
  {id:97,title:"Guess Number Higher or Lower",lc:374,diff:"Easy",pat:"Binary Search"},
  {id:98,title:"Find Right Interval",lc:436,diff:"Medium",pat:"Binary Search"},
  {id:99,title:"Aggressive Cows (GFG / Custom)",lc:0,diff:"Medium",pat:"Binary Search"},
  {id:100,title:"Capacity to Ship Packages within D Days",lc:1011,diff:"Medium",pat:"Binary Search"},
  {id:101,title:"Split Array Largest Sum",lc:410,diff:"Hard",pat:"Binary Search"},
  {id:102,title:"Minimize Maximum of Array",lc:2439,diff:"Medium",pat:"Binary Search"},
  {id:103,title:"Single Element in a Sorted Array",lc:540,diff:"Medium",pat:"Binary Search"},
  {id:104,title:"Find K Closest Elements",lc:658,diff:"Medium",pat:"Binary Search"},
  {id:105,title:"Successful Pairs of Spells and Potions",lc:2300,diff:"Medium",pat:"Binary Search"},
  {id:106,title:"Count Fair Pairs",lc:2563,diff:"Medium",pat:"Binary Search"},
  {id:107,title:"H-Index II",lc:275,diff:"Medium",pat:"Binary Search"},
  {id:108,title:"Minimum Absolute Sum Difference",lc:1818,diff:"Medium",pat:"Binary Search"},
  {id:109,title:"Cutting Ribbons",lc:1891,diff:"Medium",pat:"Binary Search"},
  {id:110,title:"Kth Smallest in Multiplication Table",lc:668,diff:"Hard",pat:"Binary Search"},

  // ─── STACK (20) ───
  {id:111,title:"Valid Parentheses",lc:20,diff:"Easy",pat:"Stack"},
  {id:112,title:"Min Stack",lc:155,diff:"Medium",pat:"Stack"},
  {id:113,title:"Evaluate Reverse Polish Notation",lc:150,diff:"Medium",pat:"Stack"},
  {id:114,title:"Generate Parentheses",lc:22,diff:"Medium",pat:"Stack"},
  {id:115,title:"Daily Temperatures",lc:739,diff:"Medium",pat:"Stack"},
  {id:116,title:"Car Fleet",lc:853,diff:"Medium",pat:"Stack"},
  {id:117,title:"Largest Rectangle in Histogram",lc:84,diff:"Hard",pat:"Stack"},
  {id:118,title:"Next Greater Element I",lc:496,diff:"Easy",pat:"Stack"},
  {id:119,title:"Asteroid Collision",lc:735,diff:"Medium",pat:"Stack"},
  {id:120,title:"Remove K Digits",lc:402,diff:"Medium",pat:"Stack"},
  {id:121,title:"Score of Parentheses",lc:856,diff:"Medium",pat:"Stack"},
  {id:122,title:"Basic Calculator II",lc:227,diff:"Medium",pat:"Stack"},
  {id:123,title:"Simplify Path",lc:71,diff:"Medium",pat:"Stack"},
  {id:124,title:"Decode String",lc:394,diff:"Medium",pat:"Stack"},
  {id:125,title:"Remove All Adjacent Duplicates in String",lc:1047,diff:"Easy",pat:"Stack"},
  {id:126,title:"Number of Visible People in a Queue",lc:1944,diff:"Hard",pat:"Stack"},
  {id:127,title:"Sum of Subarray Minimums",lc:907,diff:"Medium",pat:"Stack"},
  {id:128,title:"Online Stock Span",lc:901,diff:"Medium",pat:"Stack"},
  {id:129,title:"132 Pattern",lc:456,diff:"Medium",pat:"Stack"},
  {id:130,title:"Longest Valid Parentheses",lc:32,diff:"Hard",pat:"Stack"},

  // ─── LINKED LIST (25) ───
  {id:131,title:"Reverse Linked List",lc:206,diff:"Easy",pat:"Linked List"},
  {id:132,title:"Merge Two Sorted Lists",lc:21,diff:"Easy",pat:"Linked List"},
  {id:133,title:"Reorder List",lc:143,diff:"Medium",pat:"Linked List"},
  {id:134,title:"Remove Nth Node From End of List",lc:19,diff:"Medium",pat:"Linked List"},
  {id:135,title:"Copy List with Random Pointer",lc:138,diff:"Medium",pat:"Linked List"},
  {id:136,title:"Add Two Numbers",lc:2,diff:"Medium",pat:"Linked List"},
  {id:137,title:"Linked List Cycle",lc:141,diff:"Easy",pat:"Linked List"},
  {id:138,title:"Find the Duplicate Number",lc:287,diff:"Medium",pat:"Linked List"},
  {id:139,title:"LRU Cache",lc:146,diff:"Medium",pat:"Linked List"},
  {id:140,title:"Merge K Sorted Lists",lc:23,diff:"Hard",pat:"Linked List"},
  {id:141,title:"Reverse Nodes in k-Group",lc:25,diff:"Hard",pat:"Linked List"},
  {id:142,title:"Middle of the Linked List",lc:876,diff:"Easy",pat:"Linked List"},
  {id:143,title:"Palindrome Linked List",lc:234,diff:"Easy",pat:"Linked List"},
  {id:144,title:"Swap Nodes in Pairs",lc:24,diff:"Medium",pat:"Linked List"},
  {id:145,title:"Rotate List",lc:61,diff:"Medium",pat:"Linked List"},
  {id:146,title:"Odd Even Linked List",lc:328,diff:"Medium",pat:"Linked List"},
  {id:147,title:"Flatten a Multilevel Doubly Linked List",lc:430,diff:"Medium",pat:"Linked List"},
  {id:148,title:"Sort List",lc:148,diff:"Medium",pat:"Linked List"},
  {id:149,title:"Intersection of Two Linked Lists",lc:160,diff:"Easy",pat:"Linked List"},
  {id:150,title:"Delete Node in a Linked List",lc:237,diff:"Medium",pat:"Linked List"},
  {id:151,title:"Partition List",lc:86,diff:"Medium",pat:"Linked List"},
  {id:152,title:"Remove Duplicates from Sorted List II",lc:82,diff:"Medium",pat:"Linked List"},
  {id:153,title:"Split Linked List in Parts",lc:725,diff:"Medium",pat:"Linked List"},
  {id:154,title:"Maximum Twin Sum of a Linked List",lc:2130,diff:"Medium",pat:"Linked List"},
  {id:155,title:"Design Linked List",lc:707,diff:"Medium",pat:"Linked List"},

  // ─── TREES (35) ───
  {id:156,title:"Invert Binary Tree",lc:226,diff:"Easy",pat:"Trees"},
  {id:157,title:"Maximum Depth of Binary Tree",lc:104,diff:"Easy",pat:"Trees"},
  {id:158,title:"Diameter of Binary Tree",lc:543,diff:"Easy",pat:"Trees"},
  {id:159,title:"Balanced Binary Tree",lc:110,diff:"Easy",pat:"Trees"},
  {id:160,title:"Same Tree",lc:100,diff:"Easy",pat:"Trees"},
  {id:161,title:"Subtree of Another Tree",lc:572,diff:"Easy",pat:"Trees"},
  {id:162,title:"Lowest Common Ancestor of a Binary Search Tree",lc:235,diff:"Medium",pat:"Trees"},
  {id:163,title:"Binary Tree Level Order Traversal",lc:102,diff:"Medium",pat:"Trees"},
  {id:164,title:"Binary Tree Right Side View",lc:199,diff:"Medium",pat:"Trees"},
  {id:165,title:"Count Good Nodes in Binary Tree",lc:1448,diff:"Medium",pat:"Trees"},
  {id:166,title:"Validate Binary Search Tree",lc:98,diff:"Medium",pat:"Trees"},
  {id:167,title:"Kth Smallest Element in a BST",lc:230,diff:"Medium",pat:"Trees"},
  {id:168,title:"Construct Binary Tree from Preorder and Inorder Traversal",lc:105,diff:"Medium",pat:"Trees"},
  {id:169,title:"Binary Tree Maximum Path Sum",lc:124,diff:"Hard",pat:"Trees"},
  {id:170,title:"Serialize and Deserialize Binary Tree",lc:297,diff:"Hard",pat:"Trees"},
  {id:171,title:"Maximum Width of Binary Tree",lc:662,diff:"Medium",pat:"Trees"},
  {id:172,title:"Path Sum II",lc:113,diff:"Medium",pat:"Trees"},
  {id:173,title:"Symmetric Tree",lc:101,diff:"Easy",pat:"Trees"},
  {id:174,title:"Binary Tree Zigzag Level Order Traversal",lc:103,diff:"Medium",pat:"Trees"},
  {id:175,title:"Flatten Binary Tree to Linked List",lc:114,diff:"Medium",pat:"Trees"},
  {id:176,title:"Populating Next Right Pointers in Each Node",lc:116,diff:"Medium",pat:"Trees"},
  {id:177,title:"Sum Root to Leaf Numbers",lc:129,diff:"Medium",pat:"Trees"},
  {id:178,title:"Delete Node in a BST",lc:450,diff:"Medium",pat:"Trees"},
  {id:179,title:"Recover Binary Search Tree",lc:99,diff:"Medium",pat:"Trees"},
  {id:180,title:"Convert Sorted Array to Binary Search Tree",lc:108,diff:"Easy",pat:"Trees"},
  {id:181,title:"Boundary of Binary Tree",lc:545,diff:"Medium",pat:"Trees"},
  {id:182,title:"Vertical Order Traversal of a Binary Tree",lc:987,diff:"Hard",pat:"Trees"},
  {id:183,title:"All Nodes Distance K in Binary Tree",lc:863,diff:"Medium",pat:"Trees"},
  {id:184,title:"Maximum Level Sum of a Binary Tree",lc:1161,diff:"Medium",pat:"Trees"},
  {id:185,title:"Find Duplicate Subtrees",lc:652,diff:"Medium",pat:"Trees"},
  {id:186,title:"Minimum Distance Between BST Nodes",lc:783,diff:"Easy",pat:"Trees"},
  {id:187,title:"Path Sum III",lc:437,diff:"Medium",pat:"Trees"},
  {id:188,title:"Lowest Common Ancestor of a Binary Tree",lc:236,diff:"Medium",pat:"Trees"},
  {id:189,title:"Cousins in Binary Tree",lc:993,diff:"Easy",pat:"Trees"},
  {id:190,title:"Check Completeness of a Binary Tree",lc:958,diff:"Medium",pat:"Trees"},

  // ─── TRIES (8) ───
  {id:191,title:"Implement Trie (Prefix Tree)",lc:208,diff:"Medium",pat:"Tries"},
  {id:192,title:"Design Add and Search Words Data Structure",lc:211,diff:"Medium",pat:"Tries"},
  {id:193,title:"Word Search II",lc:212,diff:"Hard",pat:"Tries"},
  {id:194,title:"Longest Word in Dictionary",lc:720,diff:"Medium",pat:"Tries"},
  {id:195,title:"Replace Words",lc:648,diff:"Medium",pat:"Tries"},
  {id:196,title:"Map Sum Pairs",lc:677,diff:"Medium",pat:"Tries"},
  {id:197,title:"Maximum XOR of Two Numbers in an Array",lc:421,diff:"Medium",pat:"Tries"},
  {id:198,title:"Concatenated Words",lc:472,diff:"Hard",pat:"Tries"},

  // ─── HEAP / PRIORITY QUEUE (20) ───
  {id:199,title:"Kth Largest Element in a Stream",lc:703,diff:"Easy",pat:"Heap / Priority Queue"},
  {id:200,title:"Last Stone Weight",lc:1046,diff:"Easy",pat:"Heap / Priority Queue"},
  {id:201,title:"K Closest Points to Origin",lc:973,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:202,title:"Kth Largest Element in an Array",lc:215,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:203,title:"Task Scheduler",lc:621,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:204,title:"Design Twitter",lc:355,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:205,title:"Find Median from Data Stream",lc:295,diff:"Hard",pat:"Heap / Priority Queue"},
  {id:206,title:"Ugly Number II",lc:264,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:207,title:"Top K Frequent Words",lc:692,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:208,title:"Reorganize String",lc:767,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:209,title:"Furthest Building You Can Reach",lc:1642,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:210,title:"Maximum Subsequence Score",lc:2542,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:211,title:"Seat Reservation Manager",lc:1845,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:212,title:"IPO",lc:502,diff:"Hard",pat:"Heap / Priority Queue"},
  {id:213,title:"Merge K Sorted Lists",lc:23,diff:"Hard",pat:"Heap / Priority Queue"},
  {id:214,title:"Smallest Range Covering Elements from K Lists",lc:632,diff:"Hard",pat:"Heap / Priority Queue"},
  {id:215,title:"Minimum Cost to Connect Sticks",lc:1167,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:216,title:"Single-Threaded CPU",lc:1834,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:217,title:"Process Tasks Using Servers",lc:1882,diff:"Medium",pat:"Heap / Priority Queue"},
  {id:218,title:"Maximum Performance of a Team",lc:1383,diff:"Hard",pat:"Heap / Priority Queue"},

  // ─── BACKTRACKING (20) ───
  {id:219,title:"Subsets",lc:78,diff:"Medium",pat:"Backtracking"},
  {id:220,title:"Combination Sum",lc:39,diff:"Medium",pat:"Backtracking"},
  {id:221,title:"Combination Sum II",lc:40,diff:"Medium",pat:"Backtracking"},
  {id:222,title:"Permutations",lc:46,diff:"Medium",pat:"Backtracking"},
  {id:223,title:"Subsets II",lc:90,diff:"Medium",pat:"Backtracking"},
  {id:224,title:"Word Search",lc:79,diff:"Medium",pat:"Backtracking"},
  {id:225,title:"Palindrome Partitioning",lc:131,diff:"Medium",pat:"Backtracking"},
  {id:226,title:"Letter Combinations of a Phone Number",lc:17,diff:"Medium",pat:"Backtracking"},
  {id:227,title:"N-Queens",lc:51,diff:"Hard",pat:"Backtracking"},
  {id:228,title:"Sudoku Solver",lc:37,diff:"Hard",pat:"Backtracking"},
  {id:229,title:"Restore IP Addresses",lc:93,diff:"Medium",pat:"Backtracking"},
  {id:230,title:"Gray Code",lc:89,diff:"Medium",pat:"Backtracking"},
  {id:231,title:"Combinations",lc:77,diff:"Medium",pat:"Backtracking"},
  {id:232,title:"Permutations II",lc:47,diff:"Medium",pat:"Backtracking"},
  {id:233,title:"Generate Parentheses",lc:22,diff:"Medium",pat:"Backtracking"},
  {id:234,title:"Path Sum II",lc:113,diff:"Medium",pat:"Backtracking"},
  {id:235,title:"All Paths From Source to Target",lc:797,diff:"Medium",pat:"Backtracking"},
  {id:236,title:"Matchsticks to Square",lc:473,diff:"Medium",pat:"Backtracking"},
  {id:237,title:"Expression Add Operators",lc:282,diff:"Hard",pat:"Backtracking"},
  {id:238,title:"Remove Invalid Parentheses",lc:301,diff:"Hard",pat:"Backtracking"},

  // ─── GRAPHS (35) ───
  {id:239,title:"Number of Islands",lc:200,diff:"Medium",pat:"Graphs"},
  {id:240,title:"Clone Graph",lc:133,diff:"Medium",pat:"Graphs"},
  {id:241,title:"Max Area of Island",lc:695,diff:"Medium",pat:"Graphs"},
  {id:242,title:"Pacific Atlantic Water Flow",lc:417,diff:"Medium",pat:"Graphs"},
  {id:243,title:"Surrounded Regions",lc:130,diff:"Medium",pat:"Graphs"},
  {id:244,title:"Rotting Oranges",lc:994,diff:"Medium",pat:"Graphs"},
  {id:245,title:"Walls and Gates",lc:286,diff:"Medium",pat:"Graphs"},
  {id:246,title:"Course Schedule",lc:207,diff:"Medium",pat:"Graphs"},
  {id:247,title:"Course Schedule II",lc:210,diff:"Medium",pat:"Graphs"},
  {id:248,title:"Redundant Connection",lc:684,diff:"Medium",pat:"Graphs"},
  {id:249,title:"Number of Connected Components in Undirected Graph",lc:323,diff:"Medium",pat:"Graphs"},
  {id:250,title:"Graph Valid Tree",lc:261,diff:"Medium",pat:"Graphs"},
  {id:251,title:"Word Ladder",lc:127,diff:"Hard",pat:"Graphs"},
  {id:252,title:"Minimum Height Trees",lc:310,diff:"Medium",pat:"Graphs"},
  {id:253,title:"Accounts Merge",lc:721,diff:"Medium",pat:"Graphs"},
  {id:254,title:"Shortest Path in Binary Matrix",lc:1091,diff:"Medium",pat:"Graphs"},
  {id:255,title:"Snakes and Ladders",lc:909,diff:"Medium",pat:"Graphs"},
  {id:256,title:"Open the Lock",lc:752,diff:"Medium",pat:"Graphs"},
  {id:257,title:"Flood Fill",lc:733,diff:"Easy",pat:"Graphs"},
  {id:258,title:"01 Matrix",lc:542,diff:"Medium",pat:"Graphs"},
  {id:259,title:"Number of Provinces",lc:547,diff:"Medium",pat:"Graphs"},
  {id:260,title:"Is Graph Bipartite?",lc:785,diff:"Medium",pat:"Graphs"},
  {id:261,title:"Detect Cycle in Directed Graph (GFG)",lc:0,diff:"Medium",pat:"Graphs"},
  {id:262,title:"Topological Sort (GFG)",lc:0,diff:"Medium",pat:"Graphs"},
  {id:263,title:"Alien Dictionary",lc:269,diff:"Hard",pat:"Graphs"},
  {id:264,title:"Network Delay Time",lc:743,diff:"Medium",pat:"Graphs"},
  {id:265,title:"Cheapest Flights Within K Stops",lc:787,diff:"Medium",pat:"Graphs"},
  {id:266,title:"Path With Minimum Effort",lc:1631,diff:"Medium",pat:"Graphs"},
  {id:267,title:"Find the City With the Smallest Number of Neighbors",lc:1334,diff:"Medium",pat:"Graphs"},
  {id:268,title:"Swim in Rising Water",lc:778,diff:"Hard",pat:"Graphs"},
  {id:269,title:"Number of Ways to Arrive at Destination",lc:1976,diff:"Medium",pat:"Graphs"},
  {id:270,title:"Making a Large Island",lc:827,diff:"Hard",pat:"Graphs"},
  {id:271,title:"Jump Game IV",lc:1345,diff:"Hard",pat:"Graphs"},
  {id:272,title:"Minimum Genetic Mutation",lc:433,diff:"Medium",pat:"Graphs"},
  {id:273,title:"Bus Routes",lc:815,diff:"Hard",pat:"Graphs"},

  // ─── ADVANCED GRAPHS (10) ───
  {id:274,title:"Reconstruct Itinerary",lc:332,diff:"Hard",pat:"Advanced Graphs"},
  {id:275,title:"Min Cost to Connect All Points",lc:1584,diff:"Medium",pat:"Advanced Graphs"},
  {id:276,title:"Bellman-Ford: Cheapest Flights Within K Stops",lc:787,diff:"Medium",pat:"Advanced Graphs"},
  {id:277,title:"Floyd-Warshall: Find the City",lc:1334,diff:"Medium",pat:"Advanced Graphs"},
  {id:278,title:"Strongly Connected Components (Kosaraju) – GFG",lc:0,diff:"Hard",pat:"Advanced Graphs"},
  {id:279,title:"Critical Connections in a Network",lc:1192,diff:"Hard",pat:"Advanced Graphs"},
  {id:280,title:"Minimum Spanning Tree – Prim's (GFG)",lc:0,diff:"Medium",pat:"Advanced Graphs"},
  {id:281,title:"Articulation Points (GFG)",lc:0,diff:"Hard",pat:"Advanced Graphs"},
  {id:282,title:"Swim in Rising Water",lc:778,diff:"Hard",pat:"Advanced Graphs"},
  {id:283,title:"Minimum Cost to Make at Least One Valid Path in a Grid",lc:1368,diff:"Hard",pat:"Advanced Graphs"},

  // ─── 1D DYNAMIC PROGRAMMING (35) ───
  {id:284,title:"Climbing Stairs",lc:70,diff:"Easy",pat:"1D Dynamic Programming"},
  {id:285,title:"Min Cost Climbing Stairs",lc:746,diff:"Easy",pat:"1D Dynamic Programming"},
  {id:286,title:"House Robber",lc:198,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:287,title:"House Robber II",lc:213,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:288,title:"Longest Palindromic Substring",lc:5,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:289,title:"Palindromic Substrings",lc:647,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:290,title:"Decode Ways",lc:91,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:291,title:"Coin Change",lc:322,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:292,title:"Maximum Product Subarray",lc:152,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:293,title:"Word Break",lc:139,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:294,title:"Longest Increasing Subsequence",lc:300,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:295,title:"Partition Equal Subset Sum",lc:416,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:296,title:"Jump Game",lc:55,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:297,title:"Jump Game II",lc:45,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:298,title:"Coin Change II",lc:518,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:299,title:"Target Sum",lc:494,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:300,title:"Interleaving String",lc:97,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:301,title:"Maximum Sum Circular Subarray",lc:918,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:302,title:"Number of Longest Increasing Subsequence",lc:673,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:303,title:"Russian Doll Envelopes",lc:354,diff:"Hard",pat:"1D Dynamic Programming"},
  {id:304,title:"Largest Sum of Averages",lc:813,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:305,title:"Maximum Alternating Subsequence Length",lc:1911,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:306,title:"Minimum Cost For Tickets",lc:983,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:307,title:"Solving Questions With Brainpower",lc:2140,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:308,title:"Count Ways to Build Good Strings",lc:2466,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:309,title:"Delete and Earn",lc:740,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:310,title:"Best Time to Buy and Sell Stock with Cooldown",lc:309,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:311,title:"Best Time to Buy and Sell Stock with Transaction Fee",lc:714,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:312,title:"Unique Paths",lc:62,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:313,title:"Unique Paths II",lc:63,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:314,title:"Minimum Path Sum",lc:64,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:315,title:"Triangle",lc:120,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:316,title:"Perfect Squares",lc:279,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:317,title:"Arithmetic Slices",lc:413,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:318,title:"Minimum Number of Perfect Squares",lc:279,diff:"Medium",pat:"1D Dynamic Programming"},

  // ─── 2D DYNAMIC PROGRAMMING (20) ───
  {id:319,title:"Unique Paths",lc:62,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:320,title:"Longest Common Subsequence",lc:1143,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:321,title:"Best Time to Buy and Sell Stock with Cooldown",lc:309,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:322,title:"Coin Change II",lc:518,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:323,title:"Target Sum",lc:494,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:324,title:"Interleaving String",lc:97,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:325,title:"Longest Increasing Path in a Matrix",lc:329,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:326,title:"Distinct Subsequences",lc:115,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:327,title:"Edit Distance",lc:72,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:328,title:"Burst Balloons",lc:312,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:329,title:"Regular Expression Matching",lc:10,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:330,title:"Wildcard Matching",lc:44,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:331,title:"Maximal Square",lc:221,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:332,title:"Cherry Pickup",lc:741,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:333,title:"Minimum Falling Path Sum",lc:931,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:334,title:"Maximum Rectangle",lc:85,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:335,title:"Scramble String",lc:87,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:336,title:"Number of Ways to Stay in the Same Place After Some Steps",lc:1269,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:337,title:"Stone Game",lc:877,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:338,title:"Palindrome Partitioning II",lc:132,diff:"Hard",pat:"2D Dynamic Programming"},

  // ─── GREEDY (20) ───
  {id:339,title:"Maximum Subarray",lc:53,diff:"Medium",pat:"Greedy"},
  {id:340,title:"Jump Game",lc:55,diff:"Medium",pat:"Greedy"},
  {id:341,title:"Jump Game II",lc:45,diff:"Medium",pat:"Greedy"},
  {id:342,title:"Gas Station",lc:134,diff:"Medium",pat:"Greedy"},
  {id:343,title:"Hand of Straights",lc:846,diff:"Medium",pat:"Greedy"},
  {id:344,title:"Merge Triplets to Form Target Triplet",lc:1899,diff:"Medium",pat:"Greedy"},
  {id:345,title:"Partition Labels",lc:763,diff:"Medium",pat:"Greedy"},
  {id:346,title:"Valid Parenthesis String",lc:678,diff:"Medium",pat:"Greedy"},
  {id:347,title:"Minimum Number of Arrows to Burst Balloons",lc:452,diff:"Medium",pat:"Greedy"},
  {id:348,title:"Non-overlapping Intervals",lc:435,diff:"Medium",pat:"Greedy"},
  {id:349,title:"Candy",lc:135,diff:"Hard",pat:"Greedy"},
  {id:350,title:"Task Scheduler",lc:621,diff:"Medium",pat:"Greedy"},
  {id:351,title:"Largest Number",lc:179,diff:"Medium",pat:"Greedy"},
  {id:352,title:"Remove Duplicate Letters",lc:316,diff:"Medium",pat:"Greedy"},
  {id:353,title:"Minimum Add to Make Parentheses Valid",lc:921,diff:"Medium",pat:"Greedy"},
  {id:354,title:"Two City Scheduling",lc:1029,diff:"Medium",pat:"Greedy"},
  {id:355,title:"Minimize Maximum Pair Sum in Array",lc:1877,diff:"Medium",pat:"Greedy"},
  {id:356,title:"Broken Calculator",lc:991,diff:"Medium",pat:"Greedy"},
  {id:357,title:"Minimum Deletions to Make Character Frequencies Unique",lc:1647,diff:"Medium",pat:"Greedy"},
  {id:358,title:"Wiggle Subsequence",lc:376,diff:"Medium",pat:"Greedy"},

  // ─── INTERVALS (10) ───
  {id:359,title:"Insert Interval",lc:57,diff:"Medium",pat:"Intervals"},
  {id:360,title:"Merge Intervals",lc:56,diff:"Medium",pat:"Intervals"},
  {id:361,title:"Non-overlapping Intervals",lc:435,diff:"Medium",pat:"Intervals"},
  {id:362,title:"Meeting Rooms",lc:252,diff:"Easy",pat:"Intervals"},
  {id:363,title:"Meeting Rooms II",lc:253,diff:"Medium",pat:"Intervals"},
  {id:364,title:"Minimum Interval to Include Each Query",lc:1851,diff:"Hard",pat:"Intervals"},
  {id:365,title:"Employee Free Time",lc:759,diff:"Hard",pat:"Intervals"},
  {id:366,title:"Data Stream as Disjoint Intervals",lc:352,diff:"Hard",pat:"Intervals"},
  {id:367,title:"Remove Covered Intervals",lc:1288,diff:"Medium",pat:"Intervals"},
  {id:368,title:"Interval List Intersections",lc:986,diff:"Medium",pat:"Intervals"},

  // ─── MATH & BIT MANIPULATION (25) ───
  {id:369,title:"Single Number",lc:136,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:370,title:"Number of 1 Bits",lc:191,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:371,title:"Counting Bits",lc:338,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:372,title:"Reverse Bits",lc:190,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:373,title:"Missing Number",lc:268,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:374,title:"Sum of Two Integers",lc:371,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:375,title:"Reverse Integer",lc:7,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:376,title:"Happy Number",lc:202,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:377,title:"Plus One",lc:66,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:378,title:"Pow(x, n)",lc:50,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:379,title:"Multiply Strings",lc:43,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:380,title:"Detect Squares",lc:2013,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:381,title:"Excel Sheet Column Number",lc:171,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:382,title:"Roman to Integer",lc:13,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:383,title:"Count Primes",lc:204,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:384,title:"Single Number II",lc:137,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:385,title:"Bitwise AND of Numbers Range",lc:201,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:386,title:"Maximum XOR of Two Numbers in an Array",lc:421,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:387,title:"Find the Difference",lc:389,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:388,title:"Subsets using Bitmask",lc:78,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:389,title:"Majority Element",lc:169,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:390,title:"Largest Power of 2",lc:0,diff:"Easy",pat:"Math & Bit Manipulation"},
  {id:391,title:"Minimum Flips to Make a OR b Equal to c",lc:1318,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:392,title:"Total Hamming Distance",lc:477,diff:"Medium",pat:"Math & Bit Manipulation"},
  {id:393,title:"Divide Two Integers",lc:29,diff:"Medium",pat:"Math & Bit Manipulation"},

  // ─── MONOTONIC STACK (12) ───
  {id:394,title:"Daily Temperatures",lc:739,diff:"Medium",pat:"Monotonic Stack"},
  {id:395,title:"Online Stock Span",lc:901,diff:"Medium",pat:"Monotonic Stack"},
  {id:396,title:"Next Greater Element I",lc:496,diff:"Easy",pat:"Monotonic Stack"},
  {id:397,title:"Next Greater Element II",lc:503,diff:"Medium",pat:"Monotonic Stack"},
  {id:398,title:"Largest Rectangle in Histogram",lc:84,diff:"Hard",pat:"Monotonic Stack"},
  {id:399,title:"Maximal Rectangle",lc:85,diff:"Hard",pat:"Monotonic Stack"},
  {id:400,title:"Trapping Rain Water",lc:42,diff:"Hard",pat:"Monotonic Stack"},
  {id:401,title:"Sum of Subarray Minimums",lc:907,diff:"Medium",pat:"Monotonic Stack"},
  {id:402,title:"Maximum Width Ramp",lc:962,diff:"Medium",pat:"Monotonic Stack"},
  {id:403,title:"Remove K Digits",lc:402,diff:"Medium",pat:"Monotonic Stack"},
  {id:404,title:"132 Pattern",lc:456,diff:"Medium",pat:"Monotonic Stack"},
  {id:405,title:"Buildings With an Ocean View",lc:1762,diff:"Medium",pat:"Monotonic Stack"},

  // ─── STRING MANIPULATION (25) ───
  {id:406,title:"Valid Anagram",lc:242,diff:"Easy",pat:"String Manipulation"},
  {id:407,title:"Valid Palindrome",lc:125,diff:"Easy",pat:"String Manipulation"},
  {id:408,title:"Longest Common Prefix",lc:14,diff:"Easy",pat:"String Manipulation"},
  {id:409,title:"Reverse Words in a String",lc:151,diff:"Medium",pat:"String Manipulation"},
  {id:410,title:"String to Integer (atoi)",lc:8,diff:"Medium",pat:"String Manipulation"},
  {id:411,title:"Longest Palindromic Substring",lc:5,diff:"Medium",pat:"String Manipulation"},
  {id:412,title:"Zigzag Conversion",lc:6,diff:"Medium",pat:"String Manipulation"},
  {id:413,title:"Count and Say",lc:38,diff:"Medium",pat:"String Manipulation"},
  {id:414,title:"Multiply Strings",lc:43,diff:"Medium",pat:"String Manipulation"},
  {id:415,title:"Decode Ways",lc:91,diff:"Medium",pat:"String Manipulation"},
  {id:416,title:"Minimum Window Substring",lc:76,diff:"Hard",pat:"String Manipulation"},
  {id:417,title:"Valid Parentheses",lc:20,diff:"Easy",pat:"String Manipulation"},
  {id:418,title:"Generate Parentheses",lc:22,diff:"Medium",pat:"String Manipulation"},
  {id:419,title:"Word Break",lc:139,diff:"Medium",pat:"String Manipulation"},
  {id:420,title:"Longest Substring Without Repeating Characters",lc:3,diff:"Medium",pat:"String Manipulation"},
  {id:421,title:"Implement strStr()",lc:28,diff:"Easy",pat:"String Manipulation"},
  {id:422,title:"Regular Expression Matching",lc:10,diff:"Hard",pat:"String Manipulation"},
  {id:423,title:"Wildcard Matching",lc:44,diff:"Hard",pat:"String Manipulation"},
  {id:424,title:"Text Justification",lc:68,diff:"Hard",pat:"String Manipulation"},
  {id:425,title:"Scramble String",lc:87,diff:"Hard",pat:"String Manipulation"},
  {id:426,title:"Shortest Palindrome",lc:214,diff:"Hard",pat:"String Manipulation"},
  {id:427,title:"Repeated Substring Pattern",lc:459,diff:"Easy",pat:"String Manipulation"},
  {id:428,title:"Find and Replace Pattern",lc:890,diff:"Medium",pat:"String Manipulation"},
  {id:429,title:"Expressive Words",lc:809,diff:"Medium",pat:"String Manipulation"},
  {id:430,title:"Find All Anagrams in a String",lc:438,diff:"Medium",pat:"String Manipulation"},

  // ─── DIVIDE & CONQUER (10) ───
  {id:431,title:"Merge Sort (implement)",lc:0,diff:"Medium",pat:"Divide & Conquer"},
  {id:432,title:"Sort an Array",lc:912,diff:"Medium",pat:"Divide & Conquer"},
  {id:433,title:"Kth Largest Element in an Array",lc:215,diff:"Medium",pat:"Divide & Conquer"},
  {id:434,title:"Count of Smaller Numbers After Self",lc:315,diff:"Hard",pat:"Divide & Conquer"},
  {id:435,title:"Reverse Pairs",lc:493,diff:"Hard",pat:"Divide & Conquer"},
  {id:436,title:"Maximum Subarray (D&C approach)",lc:53,diff:"Medium",pat:"Divide & Conquer"},
  {id:437,title:"Beautiful Array",lc:932,diff:"Medium",pat:"Divide & Conquer"},
  {id:438,title:"Different Ways to Add Parentheses",lc:241,diff:"Medium",pat:"Divide & Conquer"},
  {id:439,title:"Median of Two Sorted Arrays",lc:4,diff:"Hard",pat:"Divide & Conquer"},
  {id:440,title:"The Skyline Problem",lc:218,diff:"Hard",pat:"Divide & Conquer"},

  // ─── EXTRA HARD/MIXED (60 — spread across patterns to round up to 500) ───
  {id:441,title:"Word Ladder II",lc:126,diff:"Hard",pat:"Graphs"},
  {id:442,title:"Minimum Cost to Reach City With Discounts",lc:2093,diff:"Medium",pat:"Advanced Graphs"},
  {id:443,title:"Number of Increasing Paths in a Grid",lc:2328,diff:"Hard",pat:"Graphs"},
  {id:444,title:"Escape the Spreading Fire",lc:2258,diff:"Hard",pat:"Graphs"},
  {id:445,title:"Maximum Employees to Be Invited to a Meeting",lc:2127,diff:"Hard",pat:"Advanced Graphs"},
  {id:446,title:"Shortest Path Visiting All Nodes",lc:847,diff:"Hard",pat:"Graphs"},
  {id:447,title:"Parallel Courses III",lc:2050,diff:"Hard",pat:"Advanced Graphs"},
  {id:448,title:"Minimum Score of a Path Between Two Cities",lc:2492,diff:"Medium",pat:"Graphs"},
  {id:449,title:"Find Eventual Safe States",lc:802,diff:"Medium",pat:"Graphs"},
  {id:450,title:"Longest Cycle in a Graph",lc:2360,diff:"Hard",pat:"Advanced Graphs"},
  {id:451,title:"K-th Largest Perfect Subtree Size in Binary Tree",lc:3285,diff:"Medium",pat:"Trees"},
  {id:452,title:"Maximum Depth of N-ary Tree",lc:559,diff:"Easy",pat:"Trees"},
  {id:453,title:"Serialize and Deserialize N-ary Tree",lc:428,diff:"Hard",pat:"Trees"},
  {id:454,title:"Maximum Binary Tree",lc:654,diff:"Medium",pat:"Trees"},
  {id:455,title:"Construct Binary Tree from Inorder and Postorder Traversal",lc:106,diff:"Medium",pat:"Trees"},
  {id:456,title:"House Robber III",lc:337,diff:"Medium",pat:"Trees"},
  {id:457,title:"Binary Tree Cameras",lc:968,diff:"Hard",pat:"Trees"},
  {id:458,title:"Distribute Coins in Binary Tree",lc:979,diff:"Medium",pat:"Trees"},
  {id:459,title:"Amount of Time for Binary Tree to Be Infected",lc:2385,diff:"Medium",pat:"Trees"},
  {id:460,title:"Minimum Time to Collect All Apples in a Tree",lc:1443,diff:"Medium",pat:"Trees"},
  {id:461,title:"Maximum Product Subarray",lc:152,diff:"Medium",pat:"1D Dynamic Programming"},
  {id:462,title:"Minimum Path Sum",lc:64,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:463,title:"Maximal Square",lc:221,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:464,title:"Count Square Submatrices with All Ones",lc:1277,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:465,title:"Maximum Profit in Job Scheduling",lc:1235,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:466,title:"Number of Ways to Form a Target String Given a Dictionary",lc:1639,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:467,title:"Minimum ASCII Delete Sum for Two Strings",lc:712,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:468,title:"Shortest Common Supersequence",lc:1092,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:469,title:"Buying and Selling Stock IV",lc:188,diff:"Hard",pat:"2D Dynamic Programming"},
  {id:470,title:"Stone Game VII",lc:1690,diff:"Medium",pat:"2D Dynamic Programming"},
  {id:471,title:"Jump Game VII",lc:1871,diff:"Medium",pat:"Greedy"},
  {id:472,title:"Minimum Number of Refueling Stops",lc:871,diff:"Hard",pat:"Greedy"},
  {id:473,title:"Find Minimum Number of Merge Operations to Make Array Palindrome",lc:0,diff:"Medium",pat:"Greedy"},
  {id:474,title:"Shortest Job First Scheduling",lc:0,diff:"Medium",pat:"Greedy"},
  {id:475,title:"Minimum Domino Rotations For Equal Row",lc:1007,diff:"Medium",pat:"Greedy"},
  {id:476,title:"Reorganize String",lc:767,diff:"Medium",pat:"Greedy"},
  {id:477,title:"Maximum Swap",lc:670,diff:"Medium",pat:"Greedy"},
  {id:478,title:"Course Schedule III",lc:630,diff:"Hard",pat:"Greedy"},
  {id:479,title:"Advantage Shuffle",lc:870,diff:"Medium",pat:"Greedy"},
  {id:480,title:"Dota2 Senate",lc:649,diff:"Medium",pat:"Greedy"},
  {id:481,title:"Design Browser History",lc:1472,diff:"Medium",pat:"Stack"},
  {id:482,title:"Maximum Frequency Stack",lc:895,diff:"Hard",pat:"Stack"},
  {id:483,title:"Robot Collisions",lc:2751,diff:"Hard",pat:"Stack"},
  {id:484,title:"Stamping The Sequence",lc:936,diff:"Hard",pat:"Stack"},
  {id:485,title:"Find the Most Competitive Subsequence",lc:1673,diff:"Medium",pat:"Monotonic Stack"},
  {id:486,title:"Minimum Stack",lc:0,diff:"Easy",pat:"Stack"},
  {id:487,title:"Maximum Subarray Min-Product",lc:1856,diff:"Medium",pat:"Monotonic Stack"},
  {id:488,title:"Largest Rectangle in Histogram",lc:84,diff:"Hard",pat:"Monotonic Stack"},
  {id:489,title:"Count of Range Sum",lc:327,diff:"Hard",pat:"Divide & Conquer"},
  {id:490,title:"Expression Add Operators",lc:282,diff:"Hard",pat:"Backtracking"},
  {id:491,title:"Stickers to Spell Word",lc:691,diff:"Hard",pat:"Backtracking"},
  {id:492,title:"Zuma Game",lc:488,diff:"Hard",pat:"Backtracking"},
  {id:493,title:"Minimum Unique Word Abbreviation",lc:411,diff:"Hard",pat:"Tries"},
  {id:494,title:"Stream of Characters",lc:1032,diff:"Hard",pat:"Tries"},
  {id:495,title:"Palindrome Pairs",lc:336,diff:"Hard",pat:"Tries"},
  {id:496,title:"Search Suggestions System",lc:1268,diff:"Medium",pat:"Tries"},
  {id:497,title:"Design Search Autocomplete System",lc:642,diff:"Hard",pat:"Tries"},
  {id:498,title:"Maximal XOR of 2 Numbers",lc:421,diff:"Medium",pat:"Tries"},
  {id:499,title:"Minimum XOR Sum of Two Arrays",lc:1879,diff:"Hard",pat:"Math & Bit Manipulation"},
  {id:500,title:"Kth Smallest Instructions",lc:1643,diff:"Hard",pat:"Math & Bit Manipulation"},
];

// Build 90-day schedule: 500 qs over 90 days ≈ 5-6/day
function buildSchedule() {
  const days = [];
  let qIndex = 0;
  for (let d = 1; d <= 90; d++) {
    const count = d <= 30 ? 5 : d <= 60 ? 6 : 6;
    const dayQs = [];
    for (let i = 0; i < count && qIndex < ALL_QUESTIONS.length; i++) {
      dayQs.push(ALL_QUESTIONS[qIndex++]);
    }
    days.push({ day: d, questions: dayQs });
  }
  return days;
}

const SCHEDULE = buildSchedule();

const DIFF_COLOR = {
  Easy: "#00b8a3",
  Medium: "#ffc01e",
  Hard: "#ff375f",
};

const PAT_COLORS = [
  "#6366f1","#8b5cf6","#ec4899","#f97316","#eab308",
  "#22c55e","#06b6d4","#3b82f6","#a855f7","#14b8a6",
  "#f43f5e","#84cc16","#fb923c","#0ea5e9","#d946ef",
  "#10b981","#f59e0b","#64748b","#ef4444","#7c3aed",
];

const patColor = (p) => PAT_COLORS[PATTERNS.indexOf(p) % PAT_COLORS.length];

export default function DSAMasterPlan() {
  const [view, setView] = useState("schedule"); // schedule | patterns | all
  const [selectedPat, setSelectedPat] = useState(null);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState({});
  const [diffFilter, setDiffFilter] = useState("All");
  const [expandedDay, setExpandedDay] = useState(1);

  const toggleChecked = (id) => setChecked(c => ({ ...c, [id]: !c[id] }));

  const totalDone = Object.values(checked).filter(Boolean).length;

  const filteredAll = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      const matchPat = selectedPat ? q.pat === selectedPat : true;
      const matchDiff = diffFilter === "All" ? true : q.diff === diffFilter;
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
      return matchPat && matchDiff && matchSearch;
    });
  }, [selectedPat, diffFilter, search]);

  const weekOf = (day) => `Week ${Math.ceil(day / 7)} · Month ${Math.ceil(day / 30)}`;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#e8e8e8",
      fontFamily: "'DM Mono', 'Fira Mono', monospace",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #111 0%, #1a1a2e 50%, #0f0f1a 100%)",
        borderBottom: "1px solid #222",
        padding: "28px 32px 0",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 4, color: "#6366f1", textTransform: "uppercase", marginBottom: 4 }}>
                DSA · 3-Month Master Plan
              </div>
              <h1 style={{
                fontSize: "clamp(22px, 4vw, 38px)",
                fontWeight: 700,
                margin: 0,
                background: "linear-gradient(90deg, #fff 0%, #a78bfa 60%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: -1,
              }}>
                500 Questions · 90 Days · 20 Patterns
              </h1>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right", paddingBottom: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#6366f1" }}>{totalDone}<span style={{ fontSize: 14, color: "#555", fontWeight: 400 }}>/500</span></div>
              <div style={{ fontSize: 11, color: "#555" }}>solved</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: "#1e1e1e", borderRadius: 2, margin: "12px 0 0" }}>
            <div style={{
              height: 3, borderRadius: 2,
              width: `${(totalDone / 500) * 100}%`,
              background: "linear-gradient(90deg, #6366f1, #a78bfa)",
              transition: "width 0.3s",
            }} />
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: 0, marginTop: 16 }}>
            {[["schedule","📅 Day Schedule"],["patterns","🗂 By Pattern"],["all","📋 All Questions"]].map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "10px 22px",
                background: "none",
                border: "none",
                borderBottom: view === v ? "2px solid #6366f1" : "2px solid transparent",
                color: view === v ? "#a78bfa" : "#555",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {/* SCHEDULE VIEW */}
        {view === "schedule" && (
          <div>
            <div style={{ color: "#444", fontSize: 12, marginBottom: 20 }}>
              Click a day to expand · Tick ✓ to mark solved
            </div>
            {SCHEDULE.map(({ day, questions }) => {
              const isOpen = expandedDay === day;
              const dayDone = questions.filter(q => checked[q.id]).length;
              const allDayDone = dayDone === questions.length;
              return (
                <div key={day} style={{
                  marginBottom: 8,
                  borderRadius: 10,
                  border: `1px solid ${isOpen ? "#6366f1" : "#1e1e1e"}`,
                  background: isOpen ? "#111" : "#0f0f0f",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}>
                  <div
                    onClick={() => setExpandedDay(isOpen ? null : day)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "13px 18px", cursor: "pointer",
                    }}
                  >
                    <span style={{
                      fontSize: 11, fontWeight: 700, minWidth: 50,
                      color: allDayDone ? "#22c55e" : isOpen ? "#a78bfa" : "#444",
                    }}>
                      DAY {day}
                    </span>
                    <span style={{ fontSize: 11, color: "#333" }}>{weekOf(day)}</span>
                    <div style={{ display: "flex", gap: 6, flex: 1, flexWrap: "wrap" }}>
                      {questions.map(q => (
                        <span key={q.id} style={{
                          fontSize: 10, padding: "2px 7px", borderRadius: 4,
                          background: checked[q.id] ? "#1a2e1a" : "#1a1a1a",
                          color: checked[q.id] ? "#22c55e" : patColor(q.pat),
                          border: `1px solid ${checked[q.id] ? "#22c55e44" : patColor(q.pat) + "33"}`,
                        }}>
                          {checked[q.id] ? "✓ " : ""}{q.pat.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: 12, color: allDayDone ? "#22c55e" : "#333", marginLeft: "auto", minWidth: 40, textAlign: "right" }}>
                      {dayDone}/{questions.length}
                    </span>
                    <span style={{ color: "#333", fontSize: 12 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 18px 16px", display: "flex", flexDirection: "column", gap: 7 }}>
                      {questions.map((q, i) => (
                        <QuestionRow key={q.id} q={q} checked={!!checked[q.id]} onToggle={() => toggleChecked(q.id)} index={i + 1} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* PATTERN VIEW */}
        {view === "patterns" && (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
              {PATTERNS.map(p => {
                const count = ALL_QUESTIONS.filter(q => q.pat === p).length;
                const done = ALL_QUESTIONS.filter(q => q.pat === p && checked[q.id]).length;
                return (
                  <button key={p} onClick={() => setSelectedPat(selectedPat === p ? null : p)} style={{
                    padding: "9px 16px", borderRadius: 8,
                    background: selectedPat === p ? patColor(p) + "22" : "#111",
                    border: `1px solid ${selectedPat === p ? patColor(p) : "#222"}`,
                    color: selectedPat === p ? patColor(p) : "#666",
                    fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span>{p}</span>
                    <span style={{ fontSize: 10, opacity: 0.7 }}>{done}/{count}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {(selectedPat ? ALL_QUESTIONS.filter(q => q.pat === selectedPat) : ALL_QUESTIONS).map((q, i) => (
                <QuestionRow key={q.id} q={q} checked={!!checked[q.id]} onToggle={() => toggleChecked(q.id)} index={i + 1} showPat />
              ))}
            </div>
          </div>
        )}

        {/* ALL QUESTIONS VIEW */}
        {view === "all" && (
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search questions…"
                style={{
                  flex: 1, minWidth: 200, padding: "10px 16px",
                  background: "#111", border: "1px solid #222", borderRadius: 8,
                  color: "#e8e8e8", fontSize: 13, fontFamily: "inherit", outline: "none",
                }}
              />
              {["All","Easy","Medium","Hard"].map(d => (
                <button key={d} onClick={() => setDiffFilter(d)} style={{
                  padding: "10px 16px", borderRadius: 8,
                  background: diffFilter === d ? (DIFF_COLOR[d] || "#6366f1") + "22" : "#111",
                  border: `1px solid ${diffFilter === d ? (DIFF_COLOR[d] || "#6366f1") : "#222"}`,
                  color: diffFilter === d ? (DIFF_COLOR[d] || "#a78bfa") : "#555",
                  fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                }}>{d}</button>
              ))}
            </div>
            <div style={{ color: "#333", fontSize: 11, marginBottom: 12 }}>{filteredAll.length} questions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {filteredAll.map((q, i) => (
                <QuestionRow key={q.id} q={q} checked={!!checked[q.id]} onToggle={() => toggleChecked(q.id)} index={i + 1} showPat />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionRow({ q, checked, onToggle, index, showPat }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 14px", borderRadius: 8,
      background: checked ? "#0e1f0e" : "#111",
      border: `1px solid ${checked ? "#22c55e22" : "#1a1a1a"}`,
      transition: "all 0.15s",
    }}>
      <button onClick={onToggle} style={{
        width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${checked ? "#22c55e" : "#333"}`,
        background: checked ? "#22c55e" : "transparent",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, color: "#000", flexShrink: 0,
      }}>{checked ? "✓" : ""}</button>

      <span style={{ fontSize: 11, color: "#333", minWidth: 28 }}>#{q.id}</span>

      <span style={{
        fontSize: 13, flex: 1,
        textDecoration: checked ? "line-through" : "none",
        color: checked ? "#444" : "#ddd",
      }}>
        {q.title}
        {q.lc > 0 && (
          <a href={`https://leetcode.com/problems/${q.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}/`}
            target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: 8, fontSize: 10, color: "#6366f155", textDecoration: "none" }}
            onClick={e => e.stopPropagation()}>
            LC#{q.lc} ↗
          </a>
        )}
      </span>

      {showPat && (
        <span style={{
          fontSize: 10, padding: "3px 8px", borderRadius: 4,
          color: patColor(q.pat),
          background: patColor(q.pat) + "18",
          border: `1px solid ${patColor(q.pat)}30`,
          whiteSpace: "nowrap",
        }}>{q.pat}</span>
      )}

      <span style={{
        fontSize: 11, fontWeight: 600, minWidth: 48, textAlign: "right",
        color: DIFF_COLOR[q.diff],
      }}>{q.diff}</span>
    </div>
  );
}
