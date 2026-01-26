import FilterInput from './FilterInput'

const TableHeader = ({
                       columns,
                       columnWidth,
                       handleSort,
                       renderSortIcon,
                       startResize,
                       onResize,
                       endResize,
                       activeFilters,
                       handleFilter,
                     }) => {
  return (
    <thead>
    <tr>
      {columns.map(({key, label, isSortable, isResizable}) => (
        <th
          key={key}
          style={columnWidth?.[key] ? {width: columnWidth[key]} : undefined}
        >
          <span
            className="userTable__sort-label"
            onClick={isSortable ? () => handleSort(key) : undefined}
          >
          {label}
            {isSortable && renderSortIcon(key)}
            </span>

          {isResizable && (
            <span
              className="userTable__resizer"
              onPointerDown={(e) => {
                e.stopPropagation();
                startResize(e, key);
              }}
              onPointerMove={(e) => {
                e.stopPropagation();
                onResize(e);
              }}
              onPointerUp={(e) => {
                e.stopPropagation();
                endResize(e);
              }}
            />
          )}

          {isSortable && (
            <div className="userTable__filter">
              <FilterInput
                field={key}
                value={activeFilters?.[key] || ''}
                onFilterChange={handleFilter}
                placeholder={`Filter ${label}`}
              />
            </div>
          )}
        </th>
      ))}
    </tr>
    </thead>
  )
}

export default TableHeader