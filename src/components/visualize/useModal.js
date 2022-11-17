import {useState} from 'react';

const useModal= ()=>{
  const [visible, setVisible] = useState([false, {type:'',data:[[],[]]}]);
  function toggle(data, off) {
    if (!data) {
      data = {type:'', data:[[],[]]};
    }
    if (off) {
      setVisible([visible[0], data]);
    } else {
      setVisible([!visible[0], data]);
    }

  }
  return {toggle, visible};
}

export default useModal;