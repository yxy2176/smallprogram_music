import { getPlayListDetail } from "../../services/music"
import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"

// pages/detail-song/detail-song.js
Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    id: '',

    songInfo: {}

  },
  onLoad(options) {
    // 1、确定获取数据的类型
    // —————— type:ranking  -> 榜单的数据
    // —————— type:recomment -> 推荐歌曲的数据
    const type = options.type
    this.setData({ type })
    // 若是 榜单
    if (type === "ranking") {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === "recommend") {
      recommendStore.onState("recommendSongInfo", this.handleRanking)
    } else if (type === "menu") {
      const id = options.id
      this.data.id = id
      this.fetchMenuSongInfo()

    }
  },

  async fetchMenuSongInfo() {
    const res = await getPlayListDetail(this.data.id)
    this.setData({ songInfo: res.playlist })
  },

  handleRanking(value) {
    // console.log(value)
    this.setData({ songInfo: value })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  }
})