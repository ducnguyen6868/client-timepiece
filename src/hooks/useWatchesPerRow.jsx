import { useEffect, useState } from 'react';

export default function useWatchesPerRow() {
  const getPerRow = (width) => {
    if (width >= 1280) return 6;
    if (width >= 1024) return 5;
    if (width >= 768) return 4;
    if (width >= 480) return 3;
    return 2;
  };

  const [perRow, setPerRow] = useState(() => getPerRow(window.innerWidth));

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newPerRow = getPerRow(window.innerWidth);
        setPerRow((prev) => (prev !== newPerRow ? newPerRow : prev));
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return perRow;
}
