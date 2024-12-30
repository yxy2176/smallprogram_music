import { HYEventStore } from "hy-event-store"
import { getPlayListDetail } from '../services/music'

const recommendStore = new HYEventStore({
  state: {
    recommendSongInfo: {}
  },
  actions: {
    fetchRecommandSongsAction(ctx) {
      // 3778678是获取热歌的 id  【接口文档有写】
      getPlayListDetail(3778678).then(res => {
        ctx.recommendSongInfo = res.playlist
      })
    }
  }
})

export default recommendStore