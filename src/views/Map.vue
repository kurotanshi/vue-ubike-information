<template>
  <div id="ubike-map"></div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'Map',
  computed: {
    ubikeStops () {
      return this.$store.getters.slicedUbikeStops;
    },
    districtList () {
      return this.$store.state.districtList;
    },
    currDistrict () {
      return this.$store.state.currDistrict;
    }
  },
  data () {
    return {
      map: null
    }
  },
  watch: {

  },
  methods: {
    mapInit () {
      // 預設以台北車站經緯度為中心
      const center = [25.046273, 121.517498]

      // 對應 id="ubike-map"
      this.map = L.map('ubike-map', { center: center, zoom: 14 });

      // 版權宣告
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
        maxZoom: 18,
      }).addTo(this.map);
    }
  },
  created() {
    this.$store.commit('setIsMapMode', true);
  },
  mounted () {
    this.mapInit();
  },
}
</script>
