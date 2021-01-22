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
import { computed, inject } from "vue";
import Pagination from '../components/Pagination.vue';

export default {
  name: 'List',  
  components: {
    Pagination
  },
  setup() {
    const store = inject('store');
    const { setIsMapMode, state } = store;
    const slicedUbikeStops = computed(() => state.slicedUbikeStops)
    setIsMapMode(false);

    const isSortDesc = computed({
      get () {
        return store.state.isSortDesc;
      },
      set (value) {
        store.setIsSortDesc(value);
      }
    });

    const currentSort = computed({
      get () {
        return store.state.currentSort;
      },
      set (value) {
        store.setCurrentSort(value);
      }
    });

    const searchText = computed({
      get () {
        return store.state.searchText;
      },
      set (value) {
        store.setSearchText(value);
      }
    });

    const setSort = sortType => {
      // 切換排序
      if (sortType === currentSort.value) {
        isSortDesc.value = !isSortDesc.value;
      } else {
        currentSort.value = sortType;
        isSortDesc.value = false;
      }
    }

    return {
      slicedUbikeStops,
      isSortDesc,
      currentSort,
      searchText,
      setSort
    }

  }
}
</script>