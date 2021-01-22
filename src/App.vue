<template>
  <div id="app">

  <!-- navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#"><h1>YouBike 臺北市公共自行車即時資訊</h1></a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">      
        <li class="nav-item" :class="{ 'active': !isMapMode }">
          <router-link class="nav-link" to="./">列表版</router-link>
        </li>
        <li class="nav-item" :class="{ 'active': isMapMode }">
          <router-link class="nav-link" to="./map">地圖版</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <!-- 搜尋控制項 -->
  <searchBar />

  <!-- 主視覺 -->
  <div class="content">
    <router-view/>
  </div>

  </div>
</template>

<script>
import { computed, provide } from 'vue';
import { ubikeStore } from './composition/store';
import searchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    searchBar
  },
  setup() {
    const store = ubikeStore();
    const { state, fetchUbikeStops } = store;
    const isMapMode = computed(() => state.isMapMode)

    provide('store', store);
    fetchUbikeStops();

    return {
      state,
      isMapMode
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>


