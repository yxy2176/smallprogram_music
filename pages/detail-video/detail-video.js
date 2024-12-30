import { getMVInfo, getMVRelated, getMVUrl } from "../../services/vedio"

// pages/detail-video/detail-video.js
Page({
  data: {
    id: 0,
    mvUrl: "",
    mvInfo: {},
    relatedVideo: [],
    danmuList: [
      { text: "哈哈哈, 真好听", color: "#ff0000", time: 3 },
      { text: "呵呵呵, 不错哦", color: "#ffff00", time: 10 },
      { text: "嘿嘿嘿, 好喜欢", color: "#0000ff", time: 15 },
    ]
  },
  onLoad(options) {
    const id = options.id
    this.setData({ id })

    this.fetchMVInfo()
    this.fetchMVUrl()
    this.fetchMVRelated()
  },

  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    // console.log(res.data);
    this.setData({ mvInfo: res.data })
  },

  async fetchMVUrl() {
    const res = await getMVUrl(this.data.id)
    // console.log(res.data);
    this.setData({ mvUrl: res.data.url })
  },

  async fetchMVRelated() {
    const res = await getMVRelated(this.data.id)
    console.log(res.data);
    this.setData({ relatedVideo: res.data })
  }
})



