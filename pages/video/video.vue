<template>
	<view>
		<web-view :src="videoSrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc: ""
			}
		},
		onLoad(option) {
			if(option){
				this.videoSrc = option.videoUrl;
			}
		}
	}
</script>

<style>
</style>
