import { reactive, computed, readonly } from 'vue';

export const ubikeStore = () => {

  // 原本的 state + getters
  const store = reactive({
    currDistrict: '',     // 目前所選行政區
    districtList: [],     // 行政區列表
    ubikeStops: [],       // 存放所有 ubike 站點
    isSortDesc: false,    // 判斷目前升降冪
    currentSort: 'sno',   // 目前排序選項、預設為編號
    isMapMode: false,     // 判斷目前是否為地圖模式
    isNonZero: false,     // 是否僅顯示可用站點
    searchText: '',       // 搜尋文字
    currentPage: 1,       // 目前頁數
    countOfPage: 10,      // 單頁筆數
    filtedUbikeStops: computed(() => {
      // 過濾搜尋 (行政區、搜尋文字)
      const { ubikeStops, isNonZero, searchText, currDistrict } = store;

      // 先刷一輪行政區、搜尋文字
      const result = ubikeStops.filter((d) => d.sarea.includes(currDistrict) && d.sna.includes(searchText));

      // 判斷是否限定可用站點
      return isNonZero ? result.filter((d) => d.sbi > 0) : result;
    }),
    sortedUbikeStops: computed(() => {
      // 拿過濾的結果做排序
      const filtedStops = [...store.filtedUbikeStops];

      return store.isSortDesc
        ? filtedStops.sort((a, b) => b[store.currentSort] - a[store.currentSort])
        : filtedStops.sort((a, b) => a[store.currentSort] - b[store.currentSort]);
    }),
    slicedUbikeStops: computed(() => {
      // 將排序的結果做分頁切割
      const start = (store.currentPage - 1) * store.countOfPage;
      const end =
        start + store.countOfPage <= store.sortedUbikeStops.length
          ? start + store.countOfPage
          : store.sortedUbikeStops.length;

      return store.sortedUbikeStops.slice(start, end);
    }),
  });

  // 原本的 mutations
  const setCurrDistrict = payload => store.currDistrict = payload;
  const setDistrictList = payload => store.districtList = payload;
  const setUbikeStops = payload => store.ubikeStops = payload;
  const setIsMapMode = payload => store.isMapMode = payload;
  const setIsSortDesc = payload => store.isSortDesc = payload;
  const setCurrentSort = payload => store.currentSort = payload; 
  const setSearchText = payload => store.searchText = payload;
  const setIsNonZero = payload => store.isNonZero = payload;
  const setCurrentPage = payload => store.currentPage = payload;

  // 原本的 actions
  const fetchLocations = async () => {
    // 取得行政區資料
    const json = await fetch(
      'https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json'
    ).then((res) => res.json());

    // 只需要台北市的資料
    // commit('setDistrictList', json.find((d) => d.name === '臺北市')['districts']);
    setDistrictList(json.find((d) => d.name === '臺北市')['districts']);
  };

  const fetchUbikeStops = async () => {
    // 欄位說明請參照:
    // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48
    // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
    // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
    // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
    // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

    const timeFormat = (val) => {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, '$1/$2/$3 $4:$5:$6');
    };

    await fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
      .then((res) => res.json())
      .then((res) => {
        // 將 json 轉陣列後存入 this.ubikeStops
        const ubikeStops = Object.keys(res.retVal).map((key) => res.retVal[key]);
        ubikeStops.forEach((d) => (d.mday = timeFormat(d.mday)));
        //commit('setUbikeStops', ubikeStops);
        setUbikeStops(ubikeStops);
      });
  };

  return {
    state: readonly(store),
    fetchLocations,
    fetchUbikeStops,
    setCurrDistrict,
    setDistrictList,
    setUbikeStops,
    setIsMapMode,
    setIsSortDesc,
    setCurrentSort,
    setSearchText,
    setIsNonZero,
    setCurrentPage
  };
};
