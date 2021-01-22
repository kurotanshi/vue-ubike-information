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
      <input type="checkbox" v-model="isNonZero"> 
      僅顯示可用車輛站點
    </label>
  </div>
</template>

<script>
import { computed, inject } from "vue";

export default {
  name: 'SearchBar',
  setup () {
    const store = inject('store');
    const { fetchLocations, state, setCurrentPage, setCurrDistrict, setIsNonZero, setSearchText } = store;
    fetchLocations();

    const districtList = computed(() => state.districtList);

    const currDistrict = computed({
      get () {
        return store.state.currDistrict;
      },
      set (value) {
        // 更換行政區回到第一頁
        setCurrentPage(1);
        setCurrDistrict(value);
      }
    });

    const isNonZero = computed({
      get () {
        return store.state.isNonZero;
      },
      set (value) {
        setCurrentPage(1);
        setIsNonZero(value);
      }
    });

    const searchText = computed({
      get () {
        return store.state.searchText;
      },
      set (value) {
        setCurrentPage(1);
        setSearchText(value);
      }
    });


    return {
      districtList,
      currDistrict,
      isNonZero,
      searchText
    }
  }
}
</script>