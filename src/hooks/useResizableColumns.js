import {useState, useCallback} from "react";

const startWidth = {
  lastName: 150,
  firstName: 150,
  maidenName: 150,
  age: 70,
  gender: 90,
  phone: 150,
  email: 300,
  country: 110,
  city: 110
};

const useResizableColumns = () => {
  const [columnWidth, setColumnWidth] = useState(startWidth);

  const startResize = useCallback((e, columnKey) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = columnWidth[columnKey];

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);

      setColumnWidth((prev) => ({
        ...prev,
        [columnKey]: Math.max(newWidth, 50)
      }))
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [columnWidth]);

  return {
    columnWidth,
    startWidth,
  }
}

export default useResizableColumns;