<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Summary</h2>

    <ul class="text-sm text-gray-700 space-y-1">
      <li><strong>Weight:</strong> {{ user.weight }} kg</li>
      <li><strong>Goal Weight:</strong> {{ user.goalWeight }} kg</li>
      <li><strong>Age:</strong> {{ user.age }}</li>
      <li><strong>Height:</strong> {{ user.height }} cm</li>
      <li><strong>Sex:</strong> {{ toTitleCase(user.sex) }}</li>
      <li><strong>Activity:</strong> {{ toTitleCase(user.activity) }}</li>
      <li><strong>Goal:</strong> {{ toTitleCase(user.goal) }}</li>
      <li>
        <strong>Fasting:</strong>
        {{ user.fasting ? user.fastingMethod : "No" }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const user = useUserStore();

onBeforeRouteLeave((to, from, next) => {
  next();

  setTimeout(() => {
    user.reset();
  }, 300);
});
</script>
