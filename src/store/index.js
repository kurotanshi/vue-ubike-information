import { createStore } from 'vuex'

export default createStore({
  state: {
    ubikeStops: [],         // 存放所有 ubike 站點
    isSortDesc: false,      // 判斷目前升降冪
    currentSort: 'sno',     // 目前排序選項、預設為編號
    searchText: '',         // 搜尋文字
    currentPage: 1,         // 目前頁數
    countOfPage: 10         // 單頁筆數
  },
  mutations: {
    setUbikeStops (state, payload) {
      state.ubikeStops = payload;
    },
    setIsSortDesc (state, payload) {
      state.isSortDesc = payload;
    },
    setCurrentSort (state, payload) {
      state.currentSort = payload;
    },
    setSearchText (state, payload) {
      state.searchText = payload;
    },
    setCurrentPage (state, payload) {
      state.currentPage = payload;
    },
  },
  getters: {
    filtedUbikeStops (state) {
      // 過濾搜尋
      return state.ubikeStops.length === 0
        ? []
        : state.ubikeStops.filter(d => d.sna.includes(state.searchText));
    },
    sortedUbikeStops (state, getters) {
      // 拿過濾的結果做排序
      const filtedStops = [...getters.filtedUbikeStops];

      return state.isSortDesc
        ? filtedStops.sort((a, b) => b[state.currentSort] - a[state.currentSort])
        : filtedStops.sort((a, b) => a[state.currentSort] - b[state.currentSort]);
    },
    slicedUbikeStops(state, getters) {      
      // 將排序的結果做分頁切割
      const start = (state.currentPage - 1) * state.countOfPage;
      const end = start + state.countOfPage <= getters.sortedUbikeStops.length
          ? start + state.countOfPage
          : getters.sortedUbikeStops.length;

      return getters.sortedUbikeStops.slice(start, end);
    },
  },
  actions: {
    async fetchUbikeStops({ commit }) {
      // 欄位說明請參照:
      // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48
      // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
      // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
      // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
      // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
  
      const timeFormat = (val) => {
        // 時間格式
        const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
        return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
      };
  
      await fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then(res => res.json())
        .then(res => {
            // 將 json 轉陣列後存入 this.ubikeStops
            const ubikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
            ubikeStops.forEach( d => d.mday = timeFormat(d.mday) );
            commit('setUbikeStops', ubikeStops);
        });
  
      }
  },
  modules: {
  }
})
