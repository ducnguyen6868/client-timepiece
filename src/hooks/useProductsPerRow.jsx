import { useEffect, useState } from 'react';

export default function useProductsPerRow() {
  const getPerRow = (width) => {
    if (width >= 1200) return 4;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
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
