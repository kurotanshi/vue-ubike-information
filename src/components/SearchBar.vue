<template>
  <div class="seaarch-wraps">
    <label>
      行政區篩選:
      <select v-model="currDistrict">
        <option value="">不限區域</option>
        <option v-for="d in districtList" :value="d.name" :key="d.name">{{ d.name }}</option>
      </select>
    </label>

    <label>
      關鍵字搜尋: <input type="text" v-model="searchText">
    </label>

    <label>
      <input type="checkbox" v-model="isNonZero"> 僅顯示可用車輛站點
    </label>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  computed: {
    districtList() {
      return this.$store.state.districtList;
    },
    currDistrict: {
      get () {
        return this.$store.state.currDistrict;
      },
      set (value) {
        // this.$store.commit('setCurrentPage', 1);
        // this.$store.commit('setCurrDistrict', value);
        this.$store.commit('setStates', { key: 'currentPage', value: 1 });
        this.$store.commit('setStates', { key: 'currDistrict', value: value});
      }
    },
    isNonZero: {
      get () {
        return this.$store.state.isNonZero;
      },
      set (value) {
        // this.$store.commit('setCurrentPage', 1);
        // this.$store.commit('setIsNonZero', value);
        this.$store.commit('setStates', { key: 'currentPage', value: 1 });
        this.$store.commit('setStates', { key: 'isNonZero', value: value });
      }
    },
    searchText: {
      get () {
        return this.$store.state.searchText;
      },
      set (value) {
        // this.$store.commit('setCurrentPage', 1);
        // this.$store.commit('setSearchText', value);
        this.$store.commit('setStates', { key: 'currentPage', value: 1 });
        this.$store.commit('setStates', { key: 'searchText', value: value });
      }
    }
  },
}
</script>