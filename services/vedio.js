import { yxyRequest } from "./index.js";

export function getTopMV(offset = 0, limit = 20) {
  return yxyRequest.get({
    url: '/top/mv',
    data: {
      limit,
      offset
    }
  })
}

export function getMVInfo(mvid){
  return yxyRequest.get({
    url:'/mv/detail',
    data:{
      mvid
    }
  })
}

export function getMVUrl(mvid){
  return yxyRequest.get({
    url:'/mv/url',
    data:{
      id:mvid
    }
  })
}

export function getMVRelated(id){
  return yxyRequest.get({
    url:'/related/allvideo',
    data:{
      id
    }
  })
}

