import type { DataType } from '@/types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';
import BannerForm from './cpns/form';

const Edit: React.FC = () => {
  const location = useLocation();
  const [editFormValue, setEditFormValue] = useState<DataType>();
  // 为什么这里要使用useEffect
  useEffect(() => {
    setEditFormValue(location.state as DataType); 
  }, [location]);

  // useEffect(() => {

  // }, [])
  
  return (
    <div>
      <BannerForm
        initialValue={editFormValue}
        type="edit"
        // setEditFormValue={setEditFormValue}
      />
    </div>
  );
};

export default Edit;
