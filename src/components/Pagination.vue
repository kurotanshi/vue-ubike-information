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
  data () {
    return {
      paginationMax: 10
    }
  },
  computed: {
    countOfPage () {
      // 單頁筆數
      return this.$store.state.countOfPage;
    },
    listLength () {
      // 總長度
      return this.$store.getters.filtedUbikeStops.length;
    },
    currentPage: {
      get () {
        return this.$store.state.currentPage;
      },
      set (value) {
        this.$store.commit('setCurrentPage', value);
      }
    },   
    totalPageCount() {
      // 計算總頁數
      return Math.ceil(this.listLength / this.countOfPage);
    },
    pagerEnd() {
      // 頁碼尾端
      return this.totalPageCount <= this.paginationMax
        ? this.totalPageCount
        : this.paginationMax;
    },
    pagerAddAmount() {
      // 頁碼位移
      const tmp =
        this.totalPageCount <= this.paginationMax
          ? 0
          : this.currentPage + 4 - this.pagerEnd;

      return tmp <= 0
        ? 0
        : this.totalPageCount - (this.paginationMax + tmp) < 0
          ? this.totalPageCount - this.paginationMax
          : tmp;
    }
  },
  methods: {
    setPage (page) {
      if( page < 1 || page > this.totalPageCount ) return;
      this.currentPage = page;
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