import { getSongMenuCatory, getPlaylist } from "../../services/music"

// pages/detail-menu/detail-menu.js
Page({
  data: {
    songMenus: []
  },
  onLoad() {
    this.fetchAllMenuList()
  },

  async fetchAllMenuList() {
    const tagRes = await getSongMenuCatory()
    // console.log(tagRes);
    const tags = tagRes.tags

    const allPromises = []
    for (const tag of tags) {
      const promise = getPlaylist(tag.name)
      allPromises.push(promise)
    }
    Promise.all(allPromises).then(res => {
      this.setData({ songMenus: res })
    })
  }
})