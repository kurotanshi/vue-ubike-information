<template>
  <nav v-if="pagerEnd > 0">
    <ul class="pagination">
      <li @click.prevent="setPage(currentPage - 1)" class="page-item">
        <a class="page-link" href>Previous</a>
      </li>

      <li class="page-item"
          v-for="i in pagerEnd" :key="i"
          :class="{ active: i + pagerAddAmount === currentPage }"
          @click.prevent="setPage(i + pagerAddAmount)">
        <a class="page-link" href>{{ i + pagerAddAmount }}</a>
      </li>

      <li @click.prevent="setPage(currentPage + 1)" class="page-item">
        <a class="page-link" href>Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

}
</script>

<style scoped>
nav {
  display: block;
  margin-top: 2rem;
}

.pagination {
  justify-content: center;
}
</style>