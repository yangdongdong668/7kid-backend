<template>
  <div class="r-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div style="height: 2000px;">121</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters([
			'name'
		])
	}
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
