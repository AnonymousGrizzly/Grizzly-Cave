import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [metadata, setMetadata] = useState();

  function toggle(metadata) {
    setIsShowing(!isShowing);
    setMetadata(metadata || {});
  }

  function close() {
    setIsShowing(false);
  }

  function open() {
    setIsShowing(true);
  }

  return {
    isShowing,
    metadata,
    toggle,
    close,
    open,
  };
};

export default useModal;
