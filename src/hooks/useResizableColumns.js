import {useState, useCallback, useRef} from "react";

const initialColumnWidth = {
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
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth);

  const resizeState = useRef({
    startX: 0,
    startWidth: 0,
    columnKey: null,
  })

  const startResize = useCallback((e, columnKey) => {
    e.preventDefault();

    resizeState.current = {
      startX: e.clientX,
      startWidth: columnWidth[columnKey],
      columnKey,
    }

    e.currentTarget.setPointerCapture(e.pointerId);
  }, [columnWidth])

  const onResize = useCallback((e) => {
    const {startX, startWidth, columnKey} = resizeState.current;
    if (!columnKey) return;

    const newWidth = startWidth + (e.clientX - startX);

    setColumnWidth((prev) => ({
      ...prev,
      [columnKey]: Math.max(newWidth, 50)
    }))

  }, [])

  const endResize = useCallback((e) => {
    resizeState.current.columnKey = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, [])

  return {
    columnWidth,
    startResize,
    onResize,
    endResize,
  }
}

export default useResizableColumns;