import './hot1.css'
import { getHotMusic } from '../../../api/musicInfo';
import { useState, useEffect } from 'react';

export default function Hot1() {
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHotMusic();
        console.log('API响应:', response);
        if (response && response.data && Array.isArray(response.data)) {
          const filteredList = response.data.filter(item => item.type === 0);
          setMusicList(filteredList);
          console.log('过滤后的音乐列表:', filteredList);
        } else {
          setMusicList([]);
        }
      } catch (error) {
        console.error('获取音乐失败:', error);
        setMusicList([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {musicList.map((music, index) => (
        <div key={index} className="songContain">
          <div className="songImg">
            <div className="songMask">12</div>
          </div>
          <span className='songTitle'>{music.hotInfo}</span>
        </div>
      ))
      }
    </>
  )
}
