//  CSS Module 的形式引入
// index.css 文件中声明的样式不会对全局样式造成影响，只会对从 styles 变量中使用的样式生效。
// Umi 默认支持 LESS (推荐)
import { useEffect, useRef } from 'react';
import style from './index.less';
const Area = () => {
  const mapRef = useRef();
  console.log(mapRef);
  useEffect(() => {
    console.log(mapRef.current);
    
  }, []);
  return (
    <div>
      <div className={style.map} ref={mapRef}>
        即将渲染地图
      </div>
    </div>
  );
};

export default Area;
