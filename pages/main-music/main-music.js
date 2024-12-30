import { getMusicBanner, getPlaylist } from "../../services/music"
import {throttle} from 'underscore'
import querySelect from "../../utils/query-select"
import recommendStore from '../../store/recommendStore'

const querySelectThrottle = throttle(querySelect,100)
const app = getApp()


// pages/main-music/main-music.js
Page({
  data: {
    searchValue:'', //搜索框内容
    banners:[],    //存储轮播图
    bannerHeight:'',  //获取轮播图高度（不然指示器样式会上移，很难看）
    recommendSongs:[], //推荐歌曲部分

    hotMenuList:[],  //热门歌单
    recMenuList:[],  //推荐歌单
    
    //屏幕的宽度
    screenWidth:'',

    
  },

  onLoad(options) {
    this.fetchMusicBanner()
    // this.fetchRecommandSongs()
    this.fetchPlaylist()

    // 发起action
    recommendStore.onState("recommendSongInfo",this.handleRecommendSongs)
    recommendStore.dispatch("fetchRecommandSongsAction")



    // 获取屏幕的尺寸
    this.setData({screenWidth:app.globalData.screenWidth})
  },

  // 从接口获取轮播图数据
  async fetchMusicBanner(){
    const res = await getMusicBanner()
    // console.log(res)
    this.setData({banners:res.banners})
  },

  // 获取轮播图的高度（适配不同屏幕来展示下方的指示器）
  onBannerImageLoad(){
      querySelectThrottle(".banner-image").then(res=>{
        // console.log(res)
        this.setData({bannerHeight:res[0].height})
      })
  },
  // 不通过store , 获取 推荐歌单 里的数据
  // async fetchRecommandSongs(){
  //   const res = await getPlayListDetail(3778678)
  //   const playlist = res.playlist
  //   const recommendSongs = playlist.tracks.slice(0,6)
  //   this.setData({recommendSongs})
  // }

  // 获取 热门歌单 里的数据
  // async fetchPlaylist(){
  //   const res = await getPlaylist()
  //   // console.log(res);
  //   const hotMenuList =res.playlists
  //   this.setData({hotMenuList})
  // },
  async fetchPlaylist(){
    getPlaylist().then(res =>{
      this.setData({hotMenuList:res.playlists})
    }),
    // 歌单部分 cat可选为 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
    getPlaylist("古风").then(res=>{
      this.setData({recMenuList:res.playlists})
    })
  },


  //  ============== 从store中获取数据的部分 ==================
  handleRecommendSongs(value){
    // 如果为空没数据，则直接返回，不然没法从undefined里进行slice的操作
    if(!value.tracks) return 
    this.setData({recommendSongs:value.tracks.slice(0,6)})
  }
})