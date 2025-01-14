<!-- components/Omnibar.vue -->
<template>
    <div class="omnibar">
      <FollowUp />
      <QueryBox />
    </div>
  </template>
  
  <script setup>
  import FollowUp from '@/components/FollowUp.vue'
  import QueryBox from '@/components/QueryBox.vue'
  </script>
  
  <style scoped>
  .omnibar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #333;
    color: white;
  }
  </style>
  