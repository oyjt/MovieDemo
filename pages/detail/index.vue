<template>
	<view class="detail-page">
		<!-- 详情页背景图 -->
		<view class="bg-detail-wrap">
			<view class="bg-detail" :style="{ backgroundImage: 'url(' + imgUrl + ')' }">></view>
		</view>
		<scroll-view class="scroll-wrap">
			<!-- 电影大图 -->
			<view class="poster-wrap">
				<image :src="imgUrl" class="poster-img"></image>
			</view>
			<!-- 影片标题及信息 -->
			<view class="movie-title-wrap">
				<view>{{ viewTitle }}</view>
				<view>{{ years }} / {{ area }}</view>
				<view>{{ director }}/{{ actor }}</view>
			</view>
			<!-- 剧情介绍 -->
			<view class="summary-wrap">
				<view class="summary-title">剧情简介:</view>
				<view class="summary-content">
					<template v-if="showText">
						{{ desc }}
						<text
							v-if="desc !== null && desc.length > 85"
							class="toggle-text"
							@click="toggle"
						>
							收起
						</text>
					</template>
					<template v-else>
						<text>{{ desc.substr(0, 85) + '... ' }}</text>
						<text
							v-if="desc !== null && desc.length > 85"
							class="toggle-text"
							@click="toggle"
						>
							全文
						</text>
					</template>
				</view>
			</view>
			<!-- 影片播放资源 -->
			<view class="source-wrap">
				<view class="source-title">播放源:</view>
				<u-cell-group class="source-content" v-for="(item, index) in sources" :key="index">
					<u-cell-item
						class="source-item"
						:title="item.Name"
						@click="toSource(item)"
					></u-cell-item>
				</u-cell-group>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import { getDetail } from '@/common/mock/index.js';
export default {
	data() {
		return {
			area: '', // 上映国家
			years: '', // 上映时间
			score: '', // 分数
			viewTitle: '', // 电影title
			imgUrl: '', //电影封面
			desc: '', // 剧情简介
			actor: '', // 演员
			director: '', // 导演
			sources: [], // 电影资源
			showText: false // 展开收起
		};
	},
	onLoad(option) {
		if (option.id) {
			this.getData(option.id);
		}
	},
	methods: {
		getData(id) {
			getDetail(id).then((res) => {
				console.log(res);
				this.viewTitle = res.title;
				this.imgUrl = res.imgUrl;
				this.area = res.area;
				this.years = res.years;
				this.desc = res.desc || '';
				this.actor = res.actor;
				this.director = res.director;
				// this.score = res.rate;
				this.sources = res.sources;
			});
		},
		toggle() {
			this.showText = !this.showText;
		},
		toSource(item) {
			const params = {
				videoUrl: item.Url
			};
			this.$u.route('/pages/video/video', params);
		}
	}
};
</script>

<style scoped lang="scss">
.detail-page {
	width: 100%;
	height: 100vh;
	position: relative;
}
.bg-detail-wrap {
	position: fixed;
	overflow: hidden;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 0;
}
.bg-detail {
	width: 100%;
	height: 100vh;
	background-size: 100% 100%;
	filter: blur(60rpx);
	transform: scale(1.2);
	transition: 0.3s;
}
.scroll-wrap {
	padding-bottom: 40rpx;
}
/* 大图 */
.poster-wrap {
	height: 700rpx;
	text-align: center;
}
.poster-img {
	width: 440rpx;
	height: 600rpx;
	margin-top: 50px;
	border-radius: 10rpx;
}
.movie-title-wrap {
	width: 90%;
	margin: 0 auto;
	text-align: center;
	line-height: 1.5;
	font-weight: 700;
	color: #f7f7f7;
}
/* 剧情简介 */
.summary-wrap,
.source-wrap {
	width: 90%;
	margin: 40rpx auto 0;
	line-height: 60rpx;
}
.summary-title,
.source-title {
	font-size: 40rpx;
	color: #ede1d9;
	font-weight: 700;
}
.summary-content {
	color: #fff;
	font-weight: 600;
	font-size: 30rpx;
	line-height: 1.5;
	margin-top: 20rpx;
}
.source-content {
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.source-content .u-cell-item-box {
	background-color: transparent;
}
.toggle-text {
	color: #2979ff;
}
</style>
