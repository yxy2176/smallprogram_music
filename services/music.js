import { yxyRequest } from "./index";


// 获取轮播图数据
export function getMusicBanner(type=0){
  return yxyRequest.get({
    url:'/banner',
    data:{
      type
    }
  })
}

export function getPlayListDetail(id){
  return yxyRequest.get({
    url:'/playlist/detail',
    data:{
      id
    }
  })
}

// 调用此接口，可获取网友精选的歌单
export function getPlaylist(cat="全部", limit=6,offset=0){
  return yxyRequest.get({
    url:'/top/playlist',
    data:{
      cat,
      limit,
      offset
    }
  })
}
//获取 热门歌单的歌单分类
export function getSongMenuCatory(){
  return yxyRequest.get({
    url:'/playlist/hot'
  })
}

