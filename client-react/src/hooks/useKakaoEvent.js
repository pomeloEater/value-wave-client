import { useEffect } from 'react';
import { isNull } from 'lodash-es';
const { kakao } = window;

const useKakaoEvent = (target, type, callback) => {
  useEffect(() => {
    if (isNull(target) || isNull(type) || isNull(callback)) return;
    const callbackWrapper = (...args) => {
      return callback(target, ...args);
    };

    kakao.maps.event.addListener(target, type, callbackWrapper);
    return () => {
      kakao.maps.event.removeListener(target, type, callbackWrapper);
    };
  }, [target, type, callback]);
};

export default useKakaoEvent;
