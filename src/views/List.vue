<template>
  <div v-if="ubikeStops.length === 0">
    <div>
      <h2>目前未有符合您設定條件的站點，請更新搜尋條件再試一次。</h2>
    </div>
  </div>
  <table v-else class="table table-striped">
    <thead>
      <tr>
        <th @click="setSort('sno')">
          #
          <span v-show="currentSort === 'sno'">
            <i
              class="fa"
              :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"
              aria-hidden="true"
            ></i>
          </span>
        </th>
        <th>場站名稱</th>
        <th>場站區域</th>
        <th @click="setSort('sbi')" class="pointer">
          目前可用車輛
          <span v-show="currentSort === 'sbi'">
            <i
              class="fa"
              :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"
              aria-hidden="true"
            ></i>
          </span>
        </th>
        <th @click="setSort('tot')" class="pointer">
          總停車格
          <span v-show="currentSort === 'tot'">
            <i class="fa"
              :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"
            ></i>
          </span>
        </th>
        <th>資料更新時間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in ubikeStops" :key="s.sno">
        <td>{{ s.sno }}</td>
        <!-- <td>{{ s.sna }}</td> -->
        <td><span v-html="keywordHighlight(s.sna)"></span></td>
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
  name: 'Home',
  components: {
    Pagination
  },
  computed: {
    ubikeStops () {
      return this.$store.getters.slicedUbikeStops;
    },
    isSortDesc: {
      get () {
        return this.$store.state.isSortDesc;
      },
      set (value) {
        // this.$store.commit('setIsSortDesc', value);
        this.$store.commit('setStates', { key: 'isSortDesc', value: value });
      }
    },
    currentSort: {
      get () {
        return this.$store.state.currentSort;
      },
      set (value) {
        // this.$store.commit('setCurrentSort', value);
        this.$store.commit('setStates', { key: 'currentSort', value: value });
      }
    },
    searchText () {
      return this.$store.state.searchText;
    }
  },
  methods: {
    keywordHighlight(val) {
      return val.replace(new RegExp(this.searchText, 'g'), `<span class="highlight">${this.searchText}</span>`);
    },
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
  created () {
    // this.$store.commit('setIsMapMode', false);
    this.$store.commit('setStates',  { key: 'isMapMode',  value: false });
  }
}
</script>