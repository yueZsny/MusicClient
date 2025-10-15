import { request } from '../utils/request';

 // 获取所有热门音乐
export const getHotMusic = function () {
  return request.get('/api/hot-music').then(res => {
    console.log(res.data);
    return res.data;
  })
  .catch(error => {
    console.error('获取热门音乐失败:', error);
    throw error;
  });
}
