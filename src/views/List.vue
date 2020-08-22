<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th @click="setSort('sno')">
          #
          <span v-show="currentSort === 'sno'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"></i>
          </span>
        </th>
        <th>
          場站名稱
        </th>
        <th>
          場站區域
        </th>
        <th @click="setSort('sbi')" class="pointer">
          目前可用車輛
          <span v-show="currentSort === 'sbi'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"></i>
          </span>
        </th>
        <th @click="setSort('tot')" class="pointer">
          總停車格
          <span v-show="currentSort === 'tot'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"></i>
          </span>
        </th>
        <th>
          資料更新時間
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in slicedUbikeStops" :key="s.sno">
        <td>{{ s.sno }}</td>
        <td>{{ s.sna }}</td>
        <td>{{ s.sarea }}</td>
        <td>{{ s.sbi }}</td>
        <td>{{ s.tot }}</td>
        <td>{{ s.mday }}</td>
      </tr>
    </tbody>
  </table>

  <Pagination />

</template>

<script>
import Pagination from '../components/Pagination.vue';

export default {
  name: 'List',  
  components: {
    Pagination
  },
  computed: {
    slicedUbikeStops () {
      return this.$store.getters.slicedUbikeStops;
    },
    isSortDesc: {
      get () {
        return this.$store.state.isSortDesc;
      },
      set (value) {
        this.$store.commit('setIsSortDesc', value);
      }
    },
    currentSort: {
      get () {
        return this.$store.state.currentSort;
      },
      set (value) {
        this.$store.commit('setCurrentSort', value);
      }
    },
    searchText: {
      get () {
        return this.$store.state.searchText;
      },
      set (value) {
        this.$store.commit('setSearchText', value);
      }
    }
  },
  methods: {
    setSort(sortType) {
      // 切換排序
      if (sortType === this.currentSort) {
        this.isSortDesc = !this.isSortDesc;
      } else {
        this.currentSort = sortType;
        this.isSortDesc = false;
      }
    }
  },
  created() {
    this.$store.commit('setIsMapMode', false);
    this.$store.dispatch('fetchUbikeStops');
  },
}
</script>