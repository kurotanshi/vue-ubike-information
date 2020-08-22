import { createStore } from 'vuex'

const COUNT_OF_PAGE = 10;

export default createStore({
  state: {
    ubikeStops: [],
    districtList: [],
    isNonZero: false,
    isSortDesc: false,
    isMapMode: false,
    currDistrict: '',
    currentSort: 'sno',
    searchText: '',
    currentPage: 1,
    countOfPage: COUNT_OF_PAGE
  },
  mutations: {
    // 通用型 mutations
    setStates (state, { key, value }) {
      state[key] = value;
    },
    // setIsMapMode (state, payload) {
    //   state.isMapMode = payload;
    // },
    // setUbikeStops (state, payload) {
    //   state.ubikeStops = payload;
    // },
    // setIsNonZero (state, payload) {
    //   state.isNonZero = payload;
    // },
    // setIsSortDesc (state, payload) {
    //   state.isSortDesc = payload;
    // },
    // setCurrDistrict (state, payload) {
    //   state.currDistrict = payload;
    // },
    // setCurrentSort (state, payload) {
    //   state.currentSort = payload;
    // },
    // setSearchText (state, payload) {
    //   state.searchText = payload;
    // },
    // setCurrentPage (state, payload) {
    //   state.currentPage = payload;
    // },
  },
  getters: {
    filtedUbikeStops (state) {
      // 過濾搜尋 (行政區、搜尋文字)
      const { ubikeStops, isNonZero, searchText, currDistrict } = state;
      
      // 先刷一輪行政區、搜尋文字
      const result = ubikeStops.filter(d => d.sarea.includes(currDistrict) && d.sna.includes(searchText));

      // 判斷是否限定可用站點
      return (isNonZero) 
        ? result.filter( d => d.sbi > 0 )
        : result;
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
      const start = (state.currentPage - 1) * COUNT_OF_PAGE;
      const end = start + COUNT_OF_PAGE <= getters.sortedUbikeStops.length
          ? start + COUNT_OF_PAGE
          : getters.sortedUbikeStops.length;

      // 地圖模式下無分頁設定
      return (state.isMapMode) ? getters.sortedUbikeStops : getters.sortedUbikeStops.slice(start, end);
    },
  },
  actions: {
    async fetchLocations({ commit }) {
    // 取得行政區資料
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
        .then((res) => res.json());

      // 透過 commit 來操作 mutations
      commit('setStates', {
        key: 'districtList',
        value: json.find( d => d.name === '臺北市' )['districts']
      });
      
    },
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
          // commit('setUbikeStops', ubikeStops);
          commit('setStates', { key: 'ubikeStops',  value: ubikeStops });
      });

    }
  },
  modules: {
  }
})
