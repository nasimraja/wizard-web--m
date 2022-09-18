import {  toast } from 'react-toastify';

export function toast_func(text,msg){
    if(text=== "success"){
        toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
  }