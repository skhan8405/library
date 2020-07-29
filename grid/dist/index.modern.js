import React, { memo, forwardRef, useState, useRef, useEffect, createRef, useMemo, useCallback, useImperativeHandle } from 'react';
import { useAsyncDebounce, useTable, useFilters, useGlobalFilter, useSortBy, useExpanded, useRowSelect, useFlexLayout, useResizeColumns } from 'react-table';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import ClickAwayListener from 'react-click-away-listener';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import update from 'immutability-helper';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';

const RowSelector = memo(forwardRef(({
  indeterminate,
  ...rest
}, ref) => {
  const [checkValue, setCheckValue] = useState(indeterminate);
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  const onChange = () => {
    setCheckValue(!indeterminate);
  };

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return /*#__PURE__*/React.createElement("div", {
    className: "check-wrap"
  }, /*#__PURE__*/React.createElement("input", Object.assign({
    type: "checkbox",
    checked: checkValue,
    onChange: onChange,
    ref: resolvedRef
  }, rest)));
}));

const DefaultColumnFilter = memo(({
  column: {
    filterValue,
    setFilter
  }
}) => {
  return /*#__PURE__*/React.createElement("input", {
    className: "txt",
    value: filterValue || "",
    onChange: e => {
      setFilter(e.target.value || undefined);
    },
    placeholder: "Search"
  });
});

const GlobalFilter = memo(({
  globalFilter,
  setGlobalFilter
}) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);
  return /*#__PURE__*/React.createElement("div", {
    className: "txt-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: value || "",
    onChange: e => {
      setValue(e.target.value);
      onChange(e.target.value);
    },
    className: "txt",
    placeholder: "Search"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-search fa-6",
    "aria-hidden": "true"
  }));
});

var RowDelete = require("./RowDelete~RKolkpAF.svg");

var RowEdit = require("./RowEdit~BuKwAcSl.svg");

var RowPin = require("./RowPin~qQRdvcXq.png");

const RowOptions = memo(props => {
  const {
    row,
    originalData,
    DeletePopUpOverLay,
    deleteRowFromGrid,
    RowEditOverlay,
    rowEditData,
    updateRowInGrid
  } = props;
  const {
    index,
    original
  } = row;
  const [isRowOptionsOpen, setRowOptionsOpen] = useState(false);
  const [isRowEditOverlayOpen, setRowEditOverlayOpen] = useState(false);
  const [isDeleteOverlayOpen, setDeleteOverlayOpen] = useState(false);

  const openRowOptionsOverlay = () => {
    setRowOptionsOpen(true);
  };

  const closeRowOptionsOverlay = () => {
    setRowOptionsOpen(false);
  };

  const openRowEditOverlay = () => {
    setRowOptionsOpen(false);
    setRowEditOverlayOpen(true);
  };

  const closeRowEditOverlay = () => {
    setRowEditOverlayOpen(false);
  };

  const updateRow = updatedrow => {
    const originalDataIndex = originalData.findIndex(data => {
      return data === original;
    });
    updateRowInGrid(originalDataIndex, updatedrow);
  };

  const openDeleteOverlay = () => {
    setRowOptionsOpen(false);
    setDeleteOverlayOpen(true);
  };

  const closeDeleteOverlay = () => {
    setDeleteOverlayOpen(false);
  };

  const deleteRow = () => {
    const originalDataIndex = originalData.findIndex(data => {
      return data === original;
    });
    deleteRowFromGrid(originalDataIndex, original);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "row-options-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-row-options",
    onClick: openRowOptionsOverlay
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), isRowOptionsOpen ? /*#__PURE__*/React.createElement(ClickAwayListener, {
    onClickAway: closeRowOptionsOverlay
  }, /*#__PURE__*/React.createElement("div", {
    className: "row-options-overlay"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    onClick: openRowEditOverlay
  }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement("img", {
    src: RowEdit,
    alt: "cargo"
  })), /*#__PURE__*/React.createElement("span", null, "Edit"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement("img", {
    src: RowPin,
    alt: "cargo",
    width: "15",
    height: "15"
  })), /*#__PURE__*/React.createElement("span", null, "Pin This row"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    onClick: openDeleteOverlay
  }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement("img", {
    src: RowDelete,
    alt: "cargo"
  })), /*#__PURE__*/React.createElement("span", null, "Delete")))), /*#__PURE__*/React.createElement("span", {
    className: "close",
    onClick: closeRowOptionsOverlay
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-close"
  })))) : null), isRowEditOverlayOpen ? /*#__PURE__*/React.createElement(RowEditOverlay, {
    row: original,
    rowEditData: rowEditData,
    closeRowEditOverlay: closeRowEditOverlay,
    updateRow: updateRow
  }) : null, isDeleteOverlayOpen ? /*#__PURE__*/React.createElement(DeletePopUpOverLay, {
    closeDeleteOverlay: closeDeleteOverlay,
    deleteRow: deleteRow
  }) : null);
});

const ItemTypes = {
  COLUMN: "column"
};

const ColumnItem = ({
  id,
  name,
  moveColumn,
  findColumn,
  innerCells
}) => {
  const originalIndex = findColumn(id).index;
  const [{
    isDragging
  }, drag] = useDrag({
    item: {
      type: ItemTypes.COLUMN,
      id,
      originalIndex
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const {
        id: droppedId,
        originalIndex
      } = monitor.getItem();
      const didDrop = monitor.didDrop();

      if (!didDrop) {
        moveColumn(droppedId, originalIndex);
      }
    }
  });
  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    canDrop: () => false,

    hover({
      id: draggedId
    }) {
      if (draggedId !== id) {
        const {
          index: overIndex
        } = findColumn(id);
        moveColumn(draggedId, overIndex);
      }
    }

  });
  const opacity = isDragging ? 0.1 : 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      opacity
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "column__reorder"
  }, /*#__PURE__*/React.createElement("div", {
    ref: node => drag(drop(node)),
    style: {
      cursor: "move"
    },
    className: ""
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-align-justify",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, name)));
};

const ColumnsList = props => {
  const {
    updateColumnsInState,
    columnsToManage
  } = props;

  const moveColumn = (columnId, atIndex) => {
    const {
      column,
      index
    } = findColumn(columnId);
    updateColumnsInState(update(columnsToManage, {
      $splice: [[index, 1], [atIndex, 0, column]]
    }));
  };

  const findColumn = columnId => {
    const column = columnsToManage.filter(c => `${c.columnId}` === columnId)[0];
    return {
      column,
      index: columnsToManage.indexOf(column)
    };
  };

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: drop,
    style: {
      display: "flex",
      flexWrap: "wrap"
    }
  }, columnsToManage.map((column, index) => {
    return /*#__PURE__*/React.createElement(ColumnItem, {
      key: index,
      id: `${column.columnId}`,
      name: `${column.Header}`,
      moveColumn: moveColumn,
      findColumn: findColumn,
      innerCells: column.innerCells
    });
  })));
};

const ColumnReordering = memo(props => {
  const {
    isManageColumnOpen,
    toggleManageColumns,
    originalColumns,
    isExpandContentAvailable,
    additionalColumn
  } = props;
  const additionalColumnHeader = additionalColumn && additionalColumn.length ? additionalColumn[0].Header : "";

  const getRemarksColumnIfAvailable = () => {
    return isExpandContentAvailable ? additionalColumn : [];
  };

  const [managedColumns, setManagedColumns] = useState(originalColumns);
  const [searchedColumns, setSearchedColumns] = useState([...originalColumns].concat(getRemarksColumnIfAvailable()));
  const [remarksColumnToManage, setRemarksColumnToManage] = useState(getRemarksColumnIfAvailable);
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
  const HTML5toTouch = {
    backends: [{
      backend: HTML5Backend
    }, {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true
      },
      preview: true,
      transition: TouchTransition
    }]
  };

  const filterColumnsList = event => {
    let {
      value
    } = event ? event.target : "";
    value = value ? value.toLowerCase() : "";

    if (value != "") {
      setSearchedColumns(originalColumns.filter(column => {
        return column.Header.toLowerCase().includes(value);
      }).concat(getRemarksColumnIfAvailable().filter(column => {
        return column.Header.toLowerCase().includes(value);
      })));
    } else {
      setSearchedColumns(originalColumns.concat(getRemarksColumnIfAvailable()));
    }
  };

  const updateColumnsInState = columns => {
    setManagedColumns(columns);
  };

  const isCheckboxSelected = header => {
    if (header === additionalColumnHeader) {
      return remarksColumnToManage.length > 0;
    } else if (header === "Select All") {
      return searchedColumns.length === managedColumns.length + remarksColumnToManage.length;
    } else {
      const selectedColumn = managedColumns.filter(column => {
        return column.Header === header;
      });
      return selectedColumn && selectedColumn.length > 0;
    }
  };

  const selectAllColumns = event => {
    if (event.currentTarget.checked) {
      setManagedColumns(originalColumns);
      setRemarksColumnToManage(getRemarksColumnIfAvailable());
    } else {
      setManagedColumns([]);
      setRemarksColumnToManage([]);
    }
  };

  const selectSingleColumn = event => {
    const {
      currentTarget
    } = event;
    const {
      checked,
      value
    } = currentTarget;

    if (value === additionalColumnHeader) {
      if (checked) {
        setRemarksColumnToManage(additionalColumn);
      } else {
        setRemarksColumnToManage([]);
      }
    } else {
      if (checked) {
        let indexOfColumnToAdd = originalColumns.findIndex(column => {
          return column.Header == value;
        });
        const itemToAdd = originalColumns[indexOfColumnToAdd];
        let prevItemIndex = -1;

        while (indexOfColumnToAdd > 0 && prevItemIndex === -1) {
          prevItemIndex = managedColumns.findIndex(column => {
            return column.Header == originalColumns[indexOfColumnToAdd - 1].Header;
          });
          indexOfColumnToAdd = indexOfColumnToAdd - 1;
        }

        const newColumnsList = managedColumns.slice(0);
        newColumnsList.splice(prevItemIndex + 1, 0, itemToAdd);
        setManagedColumns(newColumnsList);
      } else {
        setManagedColumns(managedColumns.filter(column => {
          return column.Header !== value;
        }));
      }
    }
  };

  const doColumnUpdate = () => {
    setIsErrorDisplayed(false);

    if (managedColumns && managedColumns.length > 0) {
      setSearchedColumns(originalColumns.concat(getRemarksColumnIfAvailable()));
      props.updateColumnStructure(managedColumns, remarksColumnToManage);
    } else {
      setIsErrorDisplayed(true);
    }
  };

  const resetColumnUpdate = () => {
    setManagedColumns(originalColumns);
    setSearchedColumns(originalColumns.concat(getRemarksColumnIfAvailable()));
    setRemarksColumnToManage(getRemarksColumnIfAvailable());
    props.updateColumnStructure(originalColumns, getRemarksColumnIfAvailable());
  };

  if (isManageColumnOpen) {
    return /*#__PURE__*/React.createElement(ClickAwayListener, {
      onClickAway: toggleManageColumns
    }, /*#__PURE__*/React.createElement("div", {
      className: "columns--grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column__grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column__chooser"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: ""
    }, /*#__PURE__*/React.createElement("strong", null, "Column Chooser"))), /*#__PURE__*/React.createElement("div", {
      className: "column__body"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "Search column",
      className: "custom__ctrl",
      onChange: filterColumnsList
    })), /*#__PURE__*/React.createElement("div", {
      className: "column__selectAll"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column__checkbox"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      value: "Select All",
      checked: isCheckboxSelected("Select All"),
      onChange: selectAllColumns
    })), /*#__PURE__*/React.createElement("div", {
      className: "column__selectTxt"
    }, "Select All")), searchedColumns.map((column, index) => {
      return /*#__PURE__*/React.createElement("div", {
        className: "column__wrap",
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: "column__checkbox"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        value: column.Header,
        checked: isCheckboxSelected(column.Header),
        onChange: selectSingleColumn
      })), /*#__PURE__*/React.createElement("div", {
        className: "column__txt"
      }, column.Header));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "column__settings"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column__headerTxt"
    }, /*#__PURE__*/React.createElement("strong", null, "Column Settings"), isErrorDisplayed ? /*#__PURE__*/React.createElement("strong", {
      style: {
        marginLeft: "10px",
        color: "red"
      }
    }, "Select at least one column (other than ", additionalColumnHeader, ")") : null), /*#__PURE__*/React.createElement("div", {
      className: "column__close",
      onClick: toggleManageColumns
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-times",
      "aria-hidden": "true"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "column__body"
    }, /*#__PURE__*/React.createElement(DndProvider, {
      backend: MultiBackend,
      options: HTML5toTouch
    }, /*#__PURE__*/React.createElement(ColumnsList, {
      columnsToManage: managedColumns,
      updateColumnsInState: updateColumnsInState
    })), remarksColumnToManage && remarksColumnToManage.length > 0 ? /*#__PURE__*/React.createElement("div", {
      className: "column__reorder full-width"
    }, /*#__PURE__*/React.createElement("div", {
      className: ""
    }, remarksColumnToManage[0].Header)) : null), /*#__PURE__*/React.createElement("div", {
      className: "column__footer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column__btns"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btns",
      onClick: resetColumnUpdate
    }, "Reset"), /*#__PURE__*/React.createElement("button", {
      className: "btns",
      onClick: toggleManageColumns
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "btns btns__save",
      onClick: doColumnUpdate
    }, "Save")))))));
  } else {
    return /*#__PURE__*/React.createElement("div", null);
  }
});

const ItemTypes$1 = {
  SORT_ITEM: "SORT_ITEM"
};

var SortCopy = require("./SortCopy~IGKyJbDR.svg");

var SortDelete = require("./SortDelete~MFpZtzWS.svg");

const SortItem = ({
  id,
  sortOption,
  originalColumns,
  moveSort,
  findSort,
  updateSingleSortingOption,
  copySortOption,
  deleteSortOption
}) => {
  const originalIndex = findSort(id).index;
  const [{
    isDragging
  }, drag] = useDrag({
    item: {
      type: ItemTypes$1.SORT_ITEM,
      id,
      originalIndex
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const {
        id: droppedId,
        originalIndex
      } = monitor.getItem();
      const didDrop = monitor.didDrop();

      if (!didDrop) {
        moveSort(droppedId, originalIndex);
      }
    }
  });
  const [, drop] = useDrop({
    accept: ItemTypes$1.SORT_ITEM,
    canDrop: () => false,

    hover({
      id: draggedId
    }) {
      if (draggedId !== id) {
        const {
          index: overIndex
        } = findSort(id);
        moveSort(draggedId, overIndex);
      }
    }

  });

  const getInncerCellsOfColumn = columnAccessor => {
    return originalColumns.find(column => {
      return column.accessor === columnAccessor;
    }).innerCells;
  };

  const changeSortByOptions = event => {
    const newSortByValue = event.target.value;
    const innerCellsList = getInncerCellsOfColumn(newSortByValue);
    updateSingleSortingOption(id, newSortByValue, innerCellsList && innerCellsList.length > 0 ? innerCellsList[0].accessor : "value", sortOption.order);
  };

  const changeSortOnOptions = event => {
    const newSortOnValue = event.target.value;
    updateSingleSortingOption(id, sortOption.sortBy, newSortOnValue, sortOption.order);
  };

  const changeSortOrderOptions = event => {
    const newSortOrderValue = event.target.value;
    updateSingleSortingOption(id, sortOption.sortBy, sortOption.sortOn, newSortOrderValue);
  };

  const copySort = () => {
    copySortOption(id);
  };

  const deleteSort = () => {
    deleteSortOption(id);
  };

  const opacity = isDragging ? 0.5 : 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "sort__bodyContent",
    style: {
      opacity
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React.createElement("div", {
    ref: node => drag(drop(node)),
    style: {
      cursor: "move"
    },
    className: ""
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-navicon"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sort__file"
  }, /*#__PURE__*/React.createElement("select", {
    className: "custom__ctrl",
    onChange: changeSortByOptions,
    value: sortOption.sortBy
  }, originalColumns.map((orgItem, index) => /*#__PURE__*/React.createElement("option", {
    key: index,
    value: orgItem.accessor
  }, orgItem.Header))))), /*#__PURE__*/React.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sort__file"
  }, /*#__PURE__*/React.createElement("select", {
    className: "custom__ctrl",
    onChange: changeSortOnOptions,
    value: sortOption.sortOn
  }, getInncerCellsOfColumn(sortOption.sortBy) && getInncerCellsOfColumn(sortOption.sortBy).length > 0 ? getInncerCellsOfColumn(sortOption.sortBy).map((innerCellItem, innerCellIndex) => /*#__PURE__*/React.createElement("option", {
    key: innerCellIndex,
    value: innerCellItem.accessor
  }, innerCellItem.Header)) : /*#__PURE__*/React.createElement("option", {
    key: 0,
    value: "value"
  }, "Value")))), /*#__PURE__*/React.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sort__file"
  }, /*#__PURE__*/React.createElement("select", {
    className: "custom__ctrl",
    value: sortOption.order,
    onChange: changeSortOrderOptions
  }, /*#__PURE__*/React.createElement("option", null, "Ascending"), /*#__PURE__*/React.createElement("option", null, "Descending")))), /*#__PURE__*/React.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sort__icon",
    type: "button",
    onClick: copySort
  }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement("img", {
    src: SortCopy,
    alt: "copy sort"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sort__icon",
    type: "button",
    onClick: deleteSort
  }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement("img", {
    src: SortDelete,
    alt: "copy sort"
  })))));
};

const SortingList = props => {
  const {
    updateSortingOptions,
    sortOptions
  } = props;

  const moveSort = (sortId, atIndex) => {
    const {
      sort,
      index
    } = findSort(sortId);
    updateSortingOptions(update(sortOptions, {
      $splice: [[index, 1], [atIndex, 0, sort]]
    }));
  };

  const findSort = sortId => {
    const sort = sortOptions.filter((c, index) => index === sortId)[0];
    return {
      sort,
      index: sortOptions.indexOf(sort)
    };
  };

  const [, drop] = useDrop({
    accept: ItemTypes$1.SORT_ITEM
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: drop,
    style: {
      display: "flex",
      flexWrap: "wrap"
    }
  }, sortOptions && sortOptions.length > 0 ? /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Sort By"), /*#__PURE__*/React.createElement("li", null, "Sort On"), /*#__PURE__*/React.createElement("li", null, "Order")) : null, sortOptions.map((sortOption, index) => {
    return /*#__PURE__*/React.createElement(SortItem, {
      id: index,
      key: index,
      sortOption: sortOption,
      originalColumns: props.originalColumns,
      moveSort: moveSort,
      findSort: findSort,
      updateSingleSortingOption: props.updateSingleSortingOption,
      copySortOption: props.copySortOption,
      deleteSortOption: props.deleteSortOption
    });
  })));
};

const GroupSort = memo(props => {
  const {
    isGroupSortOverLayOpen,
    toggleGroupSortOverLay,
    applyGroupSort,
    originalColumns
  } = props;
  const sortingOrders = ["Ascending", "Descending"];
  const defaultSortingOption = [{
    sortBy: originalColumns[0].accessor,
    sortOn: originalColumns[0].innerCells ? originalColumns[0].innerCells[0].accessor : "value",
    order: sortingOrders[0]
  }];
  const [sortOptions, setSortOptions] = useState([]);
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
  const HTML5toTouch = {
    backends: [{
      backend: HTML5Backend
    }, {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true
      },
      preview: true,
      transition: TouchTransition
    }]
  };

  const updateSortingOptions = sortingOptions => {
    setSortOptions(sortingOptions);
  };

  const addSortingOptions = () => {
    setSortOptions([...sortOptions, ...defaultSortingOption]);
  };

  const clearSortingOptions = () => {
    setSortOptions([]);
    applyGroupSort([]);
    toggleGroupSortOverLay();
  };

  const updateSingleSortingOption = (sortIndex, sortByValue, sortOnValue, sortOrder) => {
    const newOptionsList = sortOptions.slice(0);
    const newSortingOption = {
      sortBy: sortByValue,
      sortOn: sortOnValue,
      order: sortOrder
    };
    const updatedSortOptions = newOptionsList.map((option, index) => index === sortIndex ? newSortingOption : option);
    updateSortingOptions(updatedSortOptions);
  };

  const copySortOption = sortIndex => {
    const newOption = sortOptions.slice(0)[sortIndex];
    setSortOptions(sortOptions.concat(newOption));
  };

  const deleteSortOption = sortIndex => {
    setSortOptions(sortOptions.filter((option, index) => {
      return index !== sortIndex;
    }));
  };

  const applySort = () => {
    let isError = false;
    sortOptions.map((option, index) => {
      const {
        sortBy,
        sortOn
      } = option;
      const optionIndex = index;
      const duplicateSort = sortOptions.find((opt, optIndex) => {
        return sortBy === opt.sortBy && sortOn === opt.sortOn && optionIndex !== optIndex;
      });

      if (duplicateSort) {
        isError = true;
      }
    });

    if (!isError) {
      applyGroupSort(sortOptions);
      toggleGroupSortOverLay();
    }

    setIsErrorDisplayed(isError);
  };

  if (isGroupSortOverLayOpen) {
    return /*#__PURE__*/React.createElement(ClickAwayListener, {
      onClickAway: toggleGroupSortOverLay
    }, /*#__PURE__*/React.createElement("div", {
      className: "sorts--grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sort__grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sort__settings"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sort__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sort__headerTxt"
    }, "Sort"), /*#__PURE__*/React.createElement("div", {
      className: "sort__close"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-times",
      "aria-hidden": "true",
      onClick: toggleGroupSortOverLay
    }))), /*#__PURE__*/React.createElement("div", {
      className: "sort__body"
    }, /*#__PURE__*/React.createElement(DndProvider, {
      backend: MultiBackend,
      options: HTML5toTouch
    }, /*#__PURE__*/React.createElement(SortingList, {
      sortOptions: sortOptions,
      originalColumns: originalColumns,
      updateSortingOptions: updateSortingOptions,
      updateSingleSortingOption: updateSingleSortingOption,
      copySortOption: copySortOption,
      deleteSortOption: deleteSortOption
    }))), /*#__PURE__*/React.createElement("div", {
      className: "sort-warning"
    }, isErrorDisplayed ? /*#__PURE__*/React.createElement("span", null, "Duplicate sort options found.") : null), /*#__PURE__*/React.createElement("div", {
      className: "sort__new"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sort__section",
      type: "button",
      onClick: addSortingOptions
    }, /*#__PURE__*/React.createElement("span", null, "+"), /*#__PURE__*/React.createElement("div", {
      className: "sort__txt"
    }, "New Sort"))), /*#__PURE__*/React.createElement("div", {
      className: "sort__footer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sort__btns"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btns",
      onClick: clearSortingOptions
    }, "Clear All"), /*#__PURE__*/React.createElement("button", {
      className: "btns btns__save",
      onClick: applySort
    }, "Ok")))))));
  } else {
    return /*#__PURE__*/React.createElement("div", null);
  }
});

const ExportData = memo(props => {
  const {
    isExportOverlayOpen,
    toggleExportDataOverlay,
    rows,
    originalColumns,
    isExpandContentAvailable,
    additionalColumn
  } = props;

  const getRemarksColumnIfAvailable = () => {
    return isExpandContentAvailable ? additionalColumn : [];
  };

  const updatedColumns = [...originalColumns].concat(getRemarksColumnIfAvailable());
  const [managedColumns, setManagedColumns] = useState(updatedColumns);
  const [searchedColumns, setSearchedColumns] = useState(updatedColumns);
  const [downloadTypes, setDownloadTypes] = useState([]);
  const [warning, setWarning] = useState("");
  let isDownload = false;

  const exportRowData = () => {
    isDownload = true;
    let filteredRow = [];
    let filteredRowValues = [];
    setWarning("");

    if (managedColumns.length > 0 && downloadTypes.length > 0) {
      rows.forEach(rowDetails => {
        let row = rowDetails.original;
        const keys = Object.getOwnPropertyNames(row);
        let filteredColumnVal = {};
        let rowFilteredValues = [];
        keys.forEach(function (key) {
          managedColumns.forEach(columnName => {
            if (columnName.accessor === key || columnName.innerCells && columnName.innerCells.length && columnName.innerCells.includes(key)) {
              let columnValue = "";

              if (typeof row[key] === "object") {
                if (row[key].length === undefined) columnValue = Object.values(row[key]).toString().replace(",", " | ");

                if (row[key].length > 0) {
                  let arrObj = "";
                  row[key].forEach((item, index) => {
                    arrObj = index != 0 ? arrObj + " | " + Object.values(item) : Object.values(item);
                  });
                  columnValue = arrObj;
                }
              } else {
                columnValue = row[key];
              }

              filteredColumnVal[key] = columnValue;
              rowFilteredValues.push(columnValue);
            }
          });
        });
        filteredRow.push(filteredColumnVal);
        filteredRowValues.push(rowFilteredValues);
      });
      downloadTypes.map(item => {
        if (item === "pdf") {
          downloadPDF(filteredRowValues);
        } else if (item === "excel") {
          downloadXLSFile(filteredRow);
        } else {
          downloadCSVFile(filteredRow);
        }
      });
    } else {
      if (managedColumns.length === 0 && downloadTypes.length === 0) {
        setWarning("Select at least one column and a file type");
      } else if (managedColumns.length === 0) {
        setWarning("Select at least one column");
      } else if (downloadTypes.length === 0) {
        setWarning("Select at least one file type");
      }
    }
  };

  const downloadPDF = rowFilteredValues => {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 300;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "iCargo Neo Report";
    const headers = [managedColumns.map(column => {
      return column.Header;
    })];
    let content = {
      startY: 50,
      head: headers,
      body: rowFilteredValues
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("iCargo Neo Report.pdf");
    isDownload = false;
  };

  const downloadCSVFile = filteredRowValue => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".csv";
    const fileName = "iCargo Neo Report";
    const ws = utils.json_to_sheet(filteredRowValue);
    const wb = {
      Sheets: {
        data: ws
      },
      SheetNames: ["data"]
    };
    const excelBuffer = write(wb, {
      bookType: "csv",
      type: "array"
    });
    const data = new Blob([excelBuffer], {
      type: fileType
    });
    saveAs(data, fileName + fileExtension);
  };

  const downloadXLSFile = filteredRowValue => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "iCargo Neo Report";
    const ws = utils.json_to_sheet(filteredRowValue);
    const wb = {
      Sheets: {
        data: ws
      },
      SheetNames: ["data"]
    };
    const excelBuffer = write(wb, {
      bookType: "xlsx",
      type: "array"
    });
    const data = new Blob([excelBuffer], {
      type: fileType
    });
    saveAs(data, fileName + fileExtension);
  };

  const filterColumnsList = event => {
    let {
      value
    } = event ? event.target : "";
    value = value ? value.toLowerCase() : "";

    if (value != "") {
      setSearchedColumns(originalColumns.filter(column => {
        return column.Header.toLowerCase().includes(value);
      }).concat(getRemarksColumnIfAvailable().filter(column => {
        return column.Header.toLowerCase().includes(value);
      })));
    } else {
      setSearchedColumns(updatedColumns);
    }
  };

  const isCheckboxSelected = header => {
    if (header === "Select All") {
      return managedColumns.length === searchedColumns.length;
    } else {
      const selectedColumn = managedColumns.filter(column => {
        return column.Header === header;
      });
      return selectedColumn && selectedColumn.length > 0;
    }
  };

  const selectAllColumns = event => {
    if (event.target.checked) {
      setManagedColumns(updatedColumns);
    } else {
      setManagedColumns([]);
    }
  };

  const selectSingleColumn = event => {
    const {
      currentTarget
    } = event;
    const {
      checked,
      value
    } = currentTarget;

    if (checked) {
      let indexOfColumnToAdd = updatedColumns.findIndex(column => {
        return column.Header == value;
      });
      const itemToAdd = updatedColumns[indexOfColumnToAdd];
      let prevItemIndex = -1;

      while (indexOfColumnToAdd > 0 && prevItemIndex === -1) {
        prevItemIndex = managedColumns.findIndex(column => {
          return column.Header == updatedColumns[indexOfColumnToAdd - 1].Header;
        });
        indexOfColumnToAdd = indexOfColumnToAdd - 1;
      }

      const newColumnsList = managedColumns.slice(0);
      newColumnsList.splice(prevItemIndex + 1, 0, itemToAdd);
      setManagedColumns(newColumnsList);
    } else {
      setManagedColumns(managedColumns.filter(column => {
        return column.Header !== value;
      }));
    }
  };

  const changeDownloadType = event => {
    const {
      value,
      checked
    } = event ? event.currentTarget : "";

    if (checked) {
      setDownloadTypes(downloadTypes.concat([value]));
    } else {
      setDownloadTypes(downloadTypes.filter(type => {
        return type !== value;
      }));
    }
  };

  if (isExportOverlayOpen) {
    return /*#__PURE__*/React.createElement(ClickAwayListener, {
      onClickAway: toggleExportDataOverlay
    }, /*#__PURE__*/React.createElement("div", {
      className: "exports--grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__chooser"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: ""
    }, /*#__PURE__*/React.createElement("strong", null, "Export Data"))), /*#__PURE__*/React.createElement("div", {
      className: "export__body"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "Search column",
      className: "custom__ctrl",
      onChange: filterColumnsList
    })), /*#__PURE__*/React.createElement("div", {
      className: "export__wrap export__headertxt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__checkbox"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      value: "Select All",
      checked: isCheckboxSelected("Select All"),
      onChange: selectAllColumns
    })), /*#__PURE__*/React.createElement("div", {
      className: "export__txt"
    }, "Select All")), searchedColumns.map((column, index) => {
      return /*#__PURE__*/React.createElement("div", {
        className: "export__wrap",
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: "export__checkbox"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        value: column.Header,
        checked: isCheckboxSelected(column.Header),
        onChange: selectSingleColumn
      })), /*#__PURE__*/React.createElement("div", {
        className: "export__txt"
      }, column.Header));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "export__settings"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__headerTxt"
    }), /*#__PURE__*/React.createElement("div", {
      className: "export__close"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-times",
      "aria-hidden": "true",
      onClick: toggleExportDataOverlay
    }))), /*#__PURE__*/React.createElement("div", {
      className: "export__as"
    }, "Export As"), /*#__PURE__*/React.createElement("div", {
      className: "export__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__reorder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "check-wrap"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: "chk_pdf",
      value: "pdf",
      checked: downloadTypes.includes("pdf"),
      onChange: changeDownloadType
    })), /*#__PURE__*/React.createElement("div", {
      className: "export__file"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-file-pdf-o",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "PDF"))), /*#__PURE__*/React.createElement("div", {
      className: "export__reorder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "check-wrap"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: "chk_excel",
      value: "excel",
      checked: downloadTypes.includes("excel"),
      onChange: changeDownloadType
    })), /*#__PURE__*/React.createElement("div", {
      className: "export__file"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-file-excel-o",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Excel"))), /*#__PURE__*/React.createElement("div", {
      className: "export__reorder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "check-wrap"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: "chk_csv",
      value: "csv",
      checked: downloadTypes.includes("csv"),
      onChange: changeDownloadType
    })), /*#__PURE__*/React.createElement("div", {
      className: "export__file"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-file-text-o",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "CSV"))), /*#__PURE__*/React.createElement("div", {
      className: "exportWarning"
    }, /*#__PURE__*/React.createElement("span", {
      className: "alert alert-danger"
    }, /*#__PURE__*/React.createElement("strong", null, warning))), /*#__PURE__*/React.createElement("div", null, isDownload ? /*#__PURE__*/React.createElement("h2", {
      style: {
        textAlign: "center"
      }
    }, "Loading...") : null)), /*#__PURE__*/React.createElement("div", {
      className: "export__footer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "export__btns"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btns",
      onClick: toggleExportDataOverlay
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "btns btns__save",
      onClick: exportRowData
    }, "Export")))))));
  } else {
    return /*#__PURE__*/React.createElement("div", null);
  }
});

const listRef = createRef(null);
const Customgrid = memo(props => {
  const {
    title,
    gridHeight,
    gridWidth,
    managableColumns,
    originalColumns,
    additionalColumn,
    data,
    originalData,
    rowEditOverlay,
    rowEditData,
    updateRowInGrid,
    deletePopUpOverLay,
    deleteRowFromGrid,
    globalSearchLogic,
    selectBulkData,
    calculateRowHeight,
    isExpandContentAvailable,
    renderExpandedContent,
    hasNextPage,
    isNextPageLoading,
    loadNextPage,
    doGroupSort
  } = props;
  const [columns, setColumns] = useState(managableColumns);
  const [isRowExpandEnabled, setIsRowExpandEnabled] = useState(isExpandContentAvailable);

  if (!(data && data.length > 0) || !(columns && columns.length > 0)) {
    return /*#__PURE__*/React.createElement("h2", {
      style: {
        marginTop: "50px",
        textAlign: "center"
      }
    }, "Invalid Data or Columns Configuration");
  }

  const itemCount = hasNextPage ? data.length + 1 : data.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage ? loadNextPage : () => {};

  const isItemLoaded = index => !hasNextPage || index < data.length;

  const [isFilterOpen, setFilterOpen] = useState(false);

  const toggleColumnFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  const [isGroupSortOverLayOpen, setGroupSortOverLay] = useState(false);

  const toggleGroupSortOverLay = () => {
    setGroupSortOverLay(!isGroupSortOverLayOpen);
  };

  const applyGroupSort = sortOptions => {
    doGroupSort(sortOptions);
  };

  const [isManageColumnOpen, setManageColumnOpen] = useState(false);

  const toggleManageColumns = () => {
    setManageColumnOpen(!isManageColumnOpen);
  };

  const updateColumnStructure = (newColumnStructure, remarksColumn) => {
    setColumns([...newColumnStructure]);
    setIsRowExpandEnabled(remarksColumn && remarksColumn.length > 0 ? true : false);
    toggleManageColumns();
  };

  const [isExportOverlayOpen, setIsExportOverlayOpen] = useState(false);

  const toggleExportDataOverlay = () => {
    setIsExportOverlayOpen(!isExportOverlayOpen);
  };

  const defaultColumn = useMemo(() => ({
    Filter: DefaultColumnFilter
  }), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
    defaultColumn,
    globalFilter: (rows, columns, filterValue) => {
      if (globalSearchLogic && typeof globalSearchLogic === "function") {
        return globalSearchLogic(rows, columns, filterValue);
      } else {
        return rows;
      }
    },
    autoResetFilters: false,
    autoResetGlobalFilter: false,
    autoResetSortBy: false,
    autoResetExpanded: false,
    autoResetSelectedRows: false
  }, useFilters, useGlobalFilter, useSortBy, useExpanded, useRowSelect, useFlexLayout, useResizeColumns, hooks => {
    hooks.allColumns.push(columns => [{
      id: "selection",
      columnId: "column_custom_0",
      disableResizing: true,
      disableFilters: true,
      disableSortBy: true,
      minWidth: 35,
      width: 35,
      maxWidth: 35,
      Header: ({
        getToggleAllRowsSelectedProps
      }) => /*#__PURE__*/React.createElement(RowSelector, getToggleAllRowsSelectedProps()),
      Cell: ({
        row
      }) => /*#__PURE__*/React.createElement(RowSelector, row.getToggleRowSelectedProps())
    }, ...columns, {
      id: "custom",
      columnId: "column_custom_1",
      disableResizing: true,
      disableFilters: true,
      disableSortBy: true,
      minWidth: 35,
      width: 35,
      maxWidth: 35,
      Cell: ({
        row
      }) => {
        return /*#__PURE__*/React.createElement("div", {
          className: "action"
        }, /*#__PURE__*/React.createElement(RowOptions, {
          row: row,
          originalData: originalData,
          DeletePopUpOverLay: deletePopUpOverLay,
          deleteRowFromGrid: deleteRowFromGrid,
          RowEditOverlay: rowEditOverlay,
          rowEditData: rowEditData,
          updateRowInGrid: updateRowInGrid
        }), isRowExpandEnabled ? /*#__PURE__*/React.createElement("span", Object.assign({
          className: "expander"
        }, row.getToggleRowExpandedProps()), row.isExpanded ? /*#__PURE__*/React.createElement("i", {
          className: "fa fa-angle-up",
          "aria-hidden": "true"
        }) : /*#__PURE__*/React.createElement("i", {
          className: "fa fa-angle-down",
          "aria-hidden": "true"
        })) : null);
      }
    }]);
  });

  const bulkSelector = () => {
    if (selectBulkData) {
      selectBulkData(selectedFlatRows);
    }
  };

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.resetAfterIndex(0, true);
    }
  });
  const RenderRow = useCallback(({
    index,
    style
  }) => {
    if (isItemLoaded(index)) {
      const row = rows[index];
      prepareRow(row);
      return /*#__PURE__*/React.createElement("div", Object.assign({}, row.getRowProps({
        style
      }), {
        className: "table-row tr"
      }), /*#__PURE__*/React.createElement("div", {
        className: "table-row-wrap"
      }, row.cells.map(cell => {
        return /*#__PURE__*/React.createElement("div", Object.assign({}, cell.getCellProps(), {
          className: "table-cell td"
        }), cell.render("Cell"));
      })), isRowExpandEnabled && row.isExpanded ? /*#__PURE__*/React.createElement("div", {
        className: "expand"
      }, renderExpandedContent ? renderExpandedContent(row) : null) : null);
    }
  }, [prepareRow, rows, renderExpandedContent]);
  return /*#__PURE__*/React.createElement("div", {
    className: "wrapper",
    style: {
      width: gridWidth ? gridWidth : "100%"
    }
  }, /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  }), /*#__PURE__*/React.createElement("div", {
    className: "table-filter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "results"
  }, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, /*#__PURE__*/React.createElement("strong", null, rows.length), /*#__PURE__*/React.createElement("span", null, " ", title ? title : "Rows"))), /*#__PURE__*/React.createElement("div", {
    className: "filter-utilities"
  }, /*#__PURE__*/React.createElement(ColumnReordering, {
    isManageColumnOpen: isManageColumnOpen,
    toggleManageColumns: toggleManageColumns,
    originalColumns: originalColumns,
    isExpandContentAvailable: isExpandContentAvailable,
    additionalColumn: [additionalColumn],
    updateColumnStructure: updateColumnStructure
  }), /*#__PURE__*/React.createElement(GlobalFilter, {
    globalFilter: state.globalFilter,
    setGlobalFilter: setGlobalFilter
  }), /*#__PURE__*/React.createElement(GroupSort, {
    isGroupSortOverLayOpen: isGroupSortOverLayOpen,
    toggleGroupSortOverLay: toggleGroupSortOverLay,
    originalColumns: originalColumns,
    applyGroupSort: applyGroupSort
  }), /*#__PURE__*/React.createElement(ExportData, {
    isExportOverlayOpen: isExportOverlayOpen,
    toggleExportDataOverlay: toggleExportDataOverlay,
    rows: rows,
    originalColumns: originalColumns,
    isExpandContentAvailable: isExpandContentAvailable,
    additionalColumn: [additionalColumn]
  }), /*#__PURE__*/React.createElement("div", {
    className: "filter-icon keyword-search",
    onClick: toggleColumnFilter
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-filter",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-icon bulk-select",
    onClick: bulkSelector
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-pencil-square-o",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-icon bulk-select",
    onClick: toggleGroupSortOverLay
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-sort-amount-desc",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-icon manage-columns",
    onClick: toggleManageColumns
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-columns",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-icon manage-columns",
    onClick: toggleExportDataOverlay
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-share-alt",
    "aria-hidden": "true"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "tableContainer table-outer",
    style: {
      height: gridHeight ? gridHeight : "50vh",
      overflowX: "auto",
      overflowY: "hidden"
    }
  }, /*#__PURE__*/React.createElement(AutoSizer, {
    disableWidth: true,
    disableResizing: true
  }, ({
    height
  }) => /*#__PURE__*/React.createElement("div", Object.assign({}, getTableProps(), {
    className: "table"
  }), /*#__PURE__*/React.createElement("div", {
    className: "thead table-row table-row--head"
  }, headerGroups.map(headerGroup => /*#__PURE__*/React.createElement("div", Object.assign({}, headerGroup.getHeaderGroupProps(), {
    className: "tr"
  }), headerGroup.headers.map(column => /*#__PURE__*/React.createElement("div", Object.assign({}, column.getHeaderProps(), {
    className: "table-cell column-heading th"
  }), /*#__PURE__*/React.createElement("div", column.getSortByToggleProps(), column.render("Header"), /*#__PURE__*/React.createElement("span", null, column.isSorted ? column.isSortedDesc ? /*#__PURE__*/React.createElement("i", {
    className: "fa fa-sort-desc",
    "aria-hidden": "true"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa fa-sort-asc",
    "aria-hidden": "true"
  }) : "")), /*#__PURE__*/React.createElement("div", {
    className: `txt-wrap column-filter ${isFilterOpen ? "open" : ""}`
  }, !column.disableFilters ? column.render("Filter") : null), column.canResize && /*#__PURE__*/React.createElement("div", Object.assign({}, column.getResizerProps(), {
    className: "resizer"
  }))))))), /*#__PURE__*/React.createElement("div", Object.assign({}, getTableBodyProps(), {
    className: "tbody"
  }), /*#__PURE__*/React.createElement(InfiniteLoader, {
    isItemLoaded: isItemLoaded,
    itemCount: itemCount,
    loadMoreItems: loadMoreItems
  }, ({
    onItemsRendered,
    ref
  }) => /*#__PURE__*/React.createElement(VariableSizeList, {
    ref: list => {
      ref(list);
      listRef.current = list;
    },
    style: {
      overflowX: "hidden"
    },
    height: height - 60,
    itemCount: rows.length,
    itemSize: index => {
      if (calculateRowHeight && typeof calculateRowHeight === "function") {
        return calculateRowHeight(rows, index, headerGroups);
      } else {
        return 70;
      }
    },
    onItemsRendered: onItemsRendered,
    overscanCount: 20
  }, RenderRow)))))));
});

const Grid = forwardRef((props, ref) => {
  const {
    title,
    gridHeight,
    gridWidth,
    columns,
    additionalColumn,
    fetchData,
    rowEditOverlay,
    rowEditData,
    updateRowData,
    deletePopUpOverLay,
    deleteRowData,
    globalSearchLogic,
    selectBulkData,
    calculateRowHeight
  } = props;
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [groupSortOptions, setGroupSortOptions] = useState([]);
  let processedColumns = [];
  columns.forEach((column, index) => {
    const {
      innerCells,
      accessor,
      sortValue
    } = column;
    const isInnerCellsPresent = innerCells && innerCells.length > 0;
    column.columnId = `column_${index}`;

    if (!column.disableSortBy) {
      if (isInnerCellsPresent) {
        if (sortValue) {
          column.sortType = (rowA, rowB) => {
            return rowA.original[accessor][sortValue] > rowB.original[accessor][sortValue] ? -1 : 1;
          };
        } else {
          column.disableSortBy = true;
        }
      } else if (!innerCells) {
        column.sortType = (rowA, rowB) => {
          return rowA.original[accessor] > rowB.original[accessor] ? -1 : 1;
        };
      }
    }

    if (!column.disableFilters) {
      if (isInnerCellsPresent) {
        column.filter = (rows, id, filterValue) => {
          const filterText = filterValue ? filterValue.toLowerCase() : "";
          return rows.filter(row => {
            const rowValue = row.values[id];
            const filterCols = innerCells.filter(cell => {
              const cellValue = rowValue[cell.accessor] ? rowValue[cell.accessor].toString().toLowerCase() : "";
              return cellValue.includes(filterText);
            });
            return filterCols && filterCols.length > 0;
          });
        };
      }
    }

    processedColumns.push(column);
  });
  const renderExpandedContent = additionalColumn ? additionalColumn.Cell : null;
  const gridColumns = useMemo(() => processedColumns, []);

  const compareValues = (compareOrder, v1, v2) => {
    if (compareOrder === "Ascending") {
      return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
    } else {
      return v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
    }
  };

  const getSortedData = originalData => {
    return originalData.sort(function (x, y) {
      let compareResult = 0;
      groupSortOptions.forEach(option => {
        const {
          sortBy,
          sortOn,
          order
        } = option;
        const newResult = sortOn === "value" ? compareValues(order, x[sortBy], y[sortBy]) : compareValues(order, x[sortBy][sortOn], y[sortBy][sortOn]);
        compareResult = compareResult || newResult;
      });
      return compareResult;
    });
  };

  const getOriginalDataIndex = sortedDataIndex => {
    const updatedData = getSortedData([...items]).find((item, index) => {
      return index === sortedDataIndex;
    });
    let originalDataIndex = -1;
    originalDataIndex = items.findIndex((item, index) => {
      return item === updatedData;
    });
    return originalDataIndex;
  };

  useImperativeHandle(ref, () => ({
    updateCellInGrid(rowIndex, columnId, value) {
      const originalDataIndex = getOriginalDataIndex(rowIndex);

      if (originalDataIndex >= 0) {
        setItems(old => old.map((row, index) => {
          if (index === originalDataIndex) {
            return { ...old[originalDataIndex],
              [columnId]: value
            };
          }

          return row;
        }));
      }
    }

  }));

  const updateRowInGrid = (rowIndex, updatedRow) => {
    setItems(old => old.map((row, index) => {
      if (index === rowIndex) {
        row = updatedRow;
      }

      return row;
    }));
    updateRowData(updatedRow);
  };

  const deleteRowFromGrid = (rowIndexToBeDeleted, deletedRow) => {
    setItems(old => old.filter((row, index) => {
      return index !== rowIndexToBeDeleted;
    }));
    deleteRowData(deletedRow);
  };

  const doGroupSort = sortOptions => {
    setGroupSortOptions(sortOptions);
  };

  const loadNextPage = (...args) => {
    const newIndex = args && args.length > 0 ? args[0] : -1;

    if (newIndex >= 0 && hasNextPage) {
      setIsLoading(true);
      setIsNextPageLoading(true);
      fetchData(newIndex).then(data => {
        setIsLoading(false);
        setHasNextPage(data && data.length > 0);
        setIsNextPageLoading(false);
        setItems(items.concat(data));
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(0).then(data => {
      setIsLoading(false);
      setItems(data);
    });
  }, []);
  const data = getSortedData([...items]);

  if (data && data.length > 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Customgrid, {
      title: title,
      gridHeight: gridHeight,
      gridWidth: gridWidth,
      managableColumns: gridColumns,
      originalColumns: gridColumns,
      additionalColumn: additionalColumn,
      data: data,
      originalData: items,
      rowEditOverlay: rowEditOverlay,
      rowEditData: rowEditData,
      updateRowInGrid: updateRowInGrid,
      deletePopUpOverLay: deletePopUpOverLay,
      deleteRowFromGrid: deleteRowFromGrid,
      globalSearchLogic: globalSearchLogic,
      selectBulkData: selectBulkData,
      calculateRowHeight: calculateRowHeight,
      isExpandContentAvailable: typeof renderExpandedContent === "function",
      renderExpandedContent: renderExpandedContent,
      hasNextPage: hasNextPage,
      isNextPageLoading: isNextPageLoading,
      loadNextPage: loadNextPage,
      doGroupSort: doGroupSort
    }), isNextPageLoading ? /*#__PURE__*/React.createElement("h2", {
      style: {
        textAlign: "center"
      }
    }, "Loading...") : null);
  } else if (isLoading) {
    return /*#__PURE__*/React.createElement("h2", {
      style: {
        textAlign: "center",
        marginTop: "70px"
      }
    }, "Initializing Grid...");
  } else {
    return /*#__PURE__*/React.createElement("h2", {
      style: {
        textAlign: "center",
        marginTop: "70px"
      }
    }, "Invalid Data or Column Configurations");
  }
});

export default Grid;
//# sourceMappingURL=index.modern.js.map
