<template>
  <div id="ubike-map"></div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'Map',
  computed: {
    ubikeStops () {
      return this.$store.getters.filtedUbikeStops;
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
    currDistrict(value) {
      if( value !== '' ) {
        const currDist = this.districtList.find( d => d.name === value);
        this.map.flyTo(new L.LatLng(currDist.latitude, currDist.longitude), 15);
      }
    },
    ubikeStops (stops) {
      this.markerRepaint(stops);
    }
  },
  methods: {
    addMarker(stop) {
      const map = this.map;

      let iconColor;
      if (stop.sbi > 20) {
        iconColor = 'green';
      } else if (stop.sbi > 10) {
        iconColor = 'yellow';
      } else if (stop.sbi > 0) {
        iconColor = 'red';
      } else {
        iconColor = 'grey';
      }

      const ICON = L.icon({
        iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const popupHTML = `<div class="popup-box">
          <h3>${stop.sna}</h3>
          <p>站點位置 : ${stop.ar}</p>
          <p>總車輛 : ${stop.tot} 輛</p>
          <p>目前車輛 : ${stop.sbi} 輛</p>
          <p>更新時間 : ${stop.mday}</p>
        </div>`;

      L.marker([stop.lat, stop.lng], {icon: ICON})
        .addTo(map)
        .bindPopup(popupHTML);
    },
    clearMarkers() {
      if( this.map === null ) return;

      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    },
    markerRepaint(stops = this.ubikeStops) {
      if( this.map !== null ) {
        this.clearMarkers();
        stops.forEach((element) => this.addMarker(element) );
      }
    },
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
    this.markerRepaint();
  },
}
</script>
