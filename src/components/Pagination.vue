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
import { computed, inject } from "vue";

export default {
  name: 'Pagination',
  setup() {
    const store = inject('store');
    const paginationMax = 10;   
    const { state, setCurrentPage } = store;
    const listLength = computed(() => state.filtedUbikeStops.length);
    const countOfPage = computed(() => state.countOfPage);

    const currentPage = computed({
      get () {
        return state.currentPage;
      },
      set (value) {
        setCurrentPage(value);
      }
    });

    const totalPageCount = computed(() => {
      return Math.ceil(listLength.value / countOfPage.value );
    });

    const pagerEnd = computed(() => {
      // 頁碼尾端
      return totalPageCount.value <= paginationMax
        ? totalPageCount.value
        : paginationMax;
    });

    const pagerAddAmount = computed(() =>{
      // 頁碼位移
      const tmp =
        totalPageCount.value <= paginationMax
          ? 0
          : currentPage.value + 4 - pagerEnd.value;

      return tmp <= 0
        ? 0
        : totalPageCount.value - (paginationMax + tmp) < 0
          ? totalPageCount.value - paginationMax
          : tmp;
    })

    const setPage = page => {
      if( page < 1 || page > totalPageCount.value ) return;
      currentPage.value = page;
    };

    return {
      countOfPage,
      listLength,
      currentPage,
      totalPageCount,
      pagerEnd,
      pagerAddAmount,
      setPage
    }
  }
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