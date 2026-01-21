const TableHeader = ({
                       columns,
                       columnWidth,
                       handleSort,
                       renderSortIcon,
                       startResize,
                     }) => {
  return (
    <thead>
    <tr>
      {columns.map(({key, label, isSortable, isResizable}) => (
        <th
          key={key}
          onClick={isSortable ? () => handleSort(key) : undefined}
          style={columnWidth?.[key] ? {width: columnWidth[key]} : undefined}
        >
          {label}
          {isSortable && renderSortIcon(key)}
          {isResizable && (
            <span
              className="userTable__resizer"
              onMouseDown={(e) => startResize(e, key)}
            />
          )}

          {isSortable && (
            <div className="userTable__filter">


            </div>
          )}
        </th>
      ))}
    </tr>
    </thead>
  )
}

export default TableHeader