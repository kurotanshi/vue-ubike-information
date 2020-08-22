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
      關鍵字搜尋: <input type="text">
    </label>

    <label>
      <input type="checkbox"> 僅顯示可用車輛站點
    </label>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  computed: {
    districtList() {
      return this.$store.state.districtList;
    },
    currDistrict: {
      get () {
        return this.$store.state.currDistrict;
      },
      set (value) {
        // 更換行政區回到第一頁
        this.$store.commit('setCurrentPage', 1);
        this.$store.commit('setCurrDistrict', value);
      }
    }
  },
  created() {
    this.$store.dispatch('fetchLocations');
  },
}
</script>