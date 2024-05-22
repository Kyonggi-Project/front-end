import { useEffect } from "react";
import './Toast.css';

function Toast({ setToast, value }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="toast">
      {value ? (<p>watchlist 추가!!</p>):(<p>watchlist 삭제...</p>)}
    </div>
  );
}

export default Toast;