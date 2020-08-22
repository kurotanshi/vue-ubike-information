<template>
  <div class="seaarch-wraps">
    <label>
      行政區篩選:
      <select>
        <option value="">不限區域</option>
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
  name: 'SearchBar'
}
</script>