function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactTable = require('react-table');
var reactWindow = require('react-window');
var AutoSizer = _interopDefault(require('react-virtualized-auto-sizer'));
var InfiniteLoader = _interopDefault(require('react-window-infinite-loader'));
var ClickAwayListener = _interopDefault(require('react-click-away-listener'));
var reactDnd = require('react-dnd');
var reactDndHtml5Backend = require('react-dnd-html5-backend');
var reactDndTouchBackend = require('react-dnd-touch-backend');
var MultiBackend = require('react-dnd-multi-backend');
var MultiBackend__default = _interopDefault(MultiBackend);
var update = _interopDefault(require('immutability-helper'));
var jsPDF = _interopDefault(require('jspdf'));
require('jspdf-autotable');
var FileSaver = require('file-saver');
var XLSX = require('xlsx');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var RowSelector = React.memo(React.forwardRef(function (_ref, ref) {
  var indeterminate = _ref.indeterminate,
      rest = _objectWithoutPropertiesLoose(_ref, ["indeterminate"]);

  var _useState = React.useState(indeterminate),
      checkValue = _useState[0],
      setCheckValue = _useState[1];

  var defaultRef = React.useRef();
  var resolvedRef = ref || defaultRef;

  var onChange = function onChange() {
    setCheckValue(!indeterminate);
  };

  React.useEffect(function () {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "check-wrap"
  }, /*#__PURE__*/React__default.createElement("input", _extends({
    type: "checkbox",
    checked: checkValue,
    onChange: onChange,
    ref: resolvedRef
  }, rest)));
}));

var DefaultColumnFilter = React.memo(function (_ref) {
  var _ref$column = _ref.column,
      filterValue = _ref$column.filterValue,
      setFilter = _ref$column.setFilter;
  return /*#__PURE__*/React__default.createElement("input", {
    className: "txt",
    value: filterValue || "",
    onChange: function onChange(e) {
      setFilter(e.target.value || undefined);
    },
    placeholder: "Search"
  });
});

var GlobalFilter = React.memo(function (_ref) {
  var globalFilter = _ref.globalFilter,
      setGlobalFilter = _ref.setGlobalFilter;

  var _useState = React.useState(globalFilter),
      value = _useState[0],
      setValue = _useState[1];

  var _onChange = reactTable.useAsyncDebounce(function (value) {
    setGlobalFilter(value || undefined);
  }, 200);

  return /*#__PURE__*/React__default.createElement("div", {
    className: "txt-wrap"
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    value: value || "",
    onChange: function onChange(e) {
      setValue(e.target.value);

      _onChange(e.target.value);
    },
    className: "txt",
    placeholder: "Search"
  }), /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-search fa-6",
    "aria-hidden": "true"
  }));
});

var RowDelete = require("./RowDelete~RKolkpAF.svg");

var RowEdit = require("./RowEdit~BuKwAcSl.svg");

var RowPin = require("./RowPin~qQRdvcXq.png");

var RowOptions = React.memo(function (props) {
  var row = props.row,
      DeletePopUpOverLay = props.DeletePopUpOverLay,
      deleteRowFromGrid = props.deleteRowFromGrid,
      RowEditOverlay = props.RowEditOverlay,
      rowEditData = props.rowEditData,
      updateRowInGrid = props.updateRowInGrid;
  var original = row.original;

  var _useState = React.useState(false),
      isRowOptionsOpen = _useState[0],
      setRowOptionsOpen = _useState[1];

  var _useState2 = React.useState(false),
      isRowEditOverlayOpen = _useState2[0],
      setRowEditOverlayOpen = _useState2[1];

  var _useState3 = React.useState(false),
      isDeleteOverlayOpen = _useState3[0],
      setDeleteOverlayOpen = _useState3[1];

  var openRowOptionsOverlay = function openRowOptionsOverlay() {
    setRowOptionsOpen(true);
  };

  var closeRowOptionsOverlay = function closeRowOptionsOverlay() {
    setRowOptionsOpen(false);
  };

  var openRowEditOverlay = function openRowEditOverlay() {
    setRowOptionsOpen(false);
    setRowEditOverlayOpen(true);
  };

  var closeRowEditOverlay = function closeRowEditOverlay() {
    setRowEditOverlayOpen(false);
  };

  var updateRow = function updateRow(updatedrow) {
    updateRowInGrid(original, updatedrow);
  };

  var openDeleteOverlay = function openDeleteOverlay() {
    setRowOptionsOpen(false);
    setDeleteOverlayOpen(true);
  };

  var closeDeleteOverlay = function closeDeleteOverlay() {
    setDeleteOverlayOpen(false);
  };

  var deleteRow = function deleteRow() {
    deleteRowFromGrid(original);
  };

  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "row-options-wrap"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "icon-row-options",
    onClick: openRowOptionsOverlay
  }, /*#__PURE__*/React__default.createElement("i", null), /*#__PURE__*/React__default.createElement("i", null), /*#__PURE__*/React__default.createElement("i", null)), isRowOptionsOpen ? /*#__PURE__*/React__default.createElement(ClickAwayListener, {
    onClickAway: closeRowOptionsOverlay
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "row-options-overlay"
  }, /*#__PURE__*/React__default.createElement("ul", null, /*#__PURE__*/React__default.createElement("li", null, /*#__PURE__*/React__default.createElement("span", {
    onClick: openRowEditOverlay
  }, /*#__PURE__*/React__default.createElement("i", null, /*#__PURE__*/React__default.createElement("img", {
    src: RowEdit,
    alt: "cargo"
  })), /*#__PURE__*/React__default.createElement("span", null, "Edit"))), /*#__PURE__*/React__default.createElement("li", null, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement("i", null, /*#__PURE__*/React__default.createElement("img", {
    src: RowPin,
    alt: "cargo",
    width: "15",
    height: "15"
  })), /*#__PURE__*/React__default.createElement("span", null, "Pin This row"))), /*#__PURE__*/React__default.createElement("li", null, /*#__PURE__*/React__default.createElement("span", {
    onClick: openDeleteOverlay
  }, /*#__PURE__*/React__default.createElement("i", null, /*#__PURE__*/React__default.createElement("img", {
    src: RowDelete,
    alt: "cargo"
  })), /*#__PURE__*/React__default.createElement("span", null, "Delete")))), /*#__PURE__*/React__default.createElement("span", {
    className: "close",
    onClick: closeRowOptionsOverlay
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-close"
  })))) : null), isRowEditOverlayOpen ? /*#__PURE__*/React__default.createElement(RowEditOverlay, {
    row: original,
    rowEditData: rowEditData,
    closeRowEditOverlay: closeRowEditOverlay,
    updateRow: updateRow
  }) : null, isDeleteOverlayOpen ? /*#__PURE__*/React__default.createElement(DeletePopUpOverLay, {
    closeDeleteOverlay: closeDeleteOverlay,
    deleteRow: deleteRow
  }) : null);
});

var ItemTypes = {
  COLUMN: "column"
};

var ColumnItem = function ColumnItem(_ref) {
  var id = _ref.id,
      Header = _ref.Header,
      moveColumn = _ref.moveColumn,
      findColumn = _ref.findColumn,
      originalInnerCells = _ref.originalInnerCells,
      isInnerCellSelected = _ref.isInnerCellSelected,
      selectInnerCells = _ref.selectInnerCells;
  var originalIndex = findColumn(id).index;

  var _useDrag = reactDnd.useDrag({
    item: {
      type: ItemTypes.COLUMN,
      id: id,
      originalIndex: originalIndex
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    },
    end: function end(dropResult, monitor) {
      var _monitor$getItem = monitor.getItem(),
          droppedId = _monitor$getItem.id,
          originalIndex = _monitor$getItem.originalIndex;

      var didDrop = monitor.didDrop();

      if (!didDrop) {
        moveColumn(droppedId, originalIndex);
      }
    }
  }),
      isDragging = _useDrag[0].isDragging,
      drag = _useDrag[1];

  var _useDrop = reactDnd.useDrop({
    accept: ItemTypes.COLUMN,
    canDrop: function canDrop() {
      return false;
    },
    hover: function hover(_ref2) {
      var draggedId = _ref2.id;

      if (draggedId !== id) {
        var _findColumn = findColumn(id),
            overIndex = _findColumn.index;

        moveColumn(draggedId, overIndex);
      }
    }
  }),
      drop = _useDrop[1];

  var opacity = isDragging ? 0.1 : 1;
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      opacity: opacity
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "column__reorder"
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: function ref(node) {
      return drag(drop(node));
    },
    style: {
      cursor: "move"
    },
    className: ""
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-align-justify",
    "aria-hidden": "true"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: ""
  }, Header), /*#__PURE__*/React__default.createElement("div", {
    className: "column__innerCells__wrap"
  }, originalInnerCells && originalInnerCells.length > 0 ? originalInnerCells.map(function (cell, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "column__wrap",
      key: index
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__checkbox"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      "data-columnheader": Header,
      value: cell.Header,
      checked: isInnerCellSelected(Header, cell.Header),
      onChange: selectInnerCells
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "column__txt"
    }, cell.Header));
  }) : null)));
};

var ColumnsList = function ColumnsList(props) {
  var updateColumnsInState = props.updateColumnsInState,
      columnsToManage = props.columnsToManage,
      isInnerCellSelected = props.isInnerCellSelected,
      selectInnerCells = props.selectInnerCells;

  var moveColumn = function moveColumn(columnId, atIndex) {
    var _findColumn = findColumn(columnId),
        column = _findColumn.column,
        index = _findColumn.index;

    updateColumnsInState(update(columnsToManage, {
      $splice: [[index, 1], [atIndex, 0, column]]
    }));
  };

  var findColumn = function findColumn(columnId) {
    var column = columnsToManage.filter(function (c) {
      return "" + c.columnId === columnId;
    })[0];
    return {
      column: column,
      index: columnsToManage.indexOf(column)
    };
  };

  var _useDrop = reactDnd.useDrop({
    accept: ItemTypes.COLUMN
  }),
      drop = _useDrop[1];

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    ref: drop,
    style: {
      display: "flex",
      flexWrap: "wrap"
    }
  }, columnsToManage.map(function (column, index) {
    return /*#__PURE__*/React__default.createElement(ColumnItem, {
      key: index,
      id: "" + column.columnId,
      Header: "" + column.Header,
      moveColumn: moveColumn,
      findColumn: findColumn,
      originalInnerCells: column.originalInnerCells,
      isInnerCellSelected: isInnerCellSelected,
      selectInnerCells: selectInnerCells
    });
  })));
};

var ColumnReordering = React.memo(function (props) {
  var isManageColumnOpen = props.isManageColumnOpen,
      toggleManageColumns = props.toggleManageColumns,
      originalColumns = props.originalColumns,
      isExpandContentAvailable = props.isExpandContentAvailable,
      additionalColumn = props.additionalColumn;
  var additionalColumnHeader = additionalColumn && additionalColumn.length ? additionalColumn[0].Header : "";

  var getRemarksColumnIfAvailable = function getRemarksColumnIfAvailable() {
    return isExpandContentAvailable ? additionalColumn : [];
  };

  var concatedOriginalColumns = originalColumns.concat(getRemarksColumnIfAvailable());

  var _useState = React.useState(originalColumns),
      managedColumns = _useState[0],
      setManagedColumns = _useState[1];

  var _useState2 = React.useState(concatedOriginalColumns),
      searchedColumns = _useState2[0],
      setSearchedColumns = _useState2[1];

  var _useState3 = React.useState(getRemarksColumnIfAvailable),
      remarksColumnToManage = _useState3[0],
      setRemarksColumnToManage = _useState3[1];

  var _useState4 = React.useState(false),
      isErrorDisplayed = _useState4[0],
      setIsErrorDisplayed = _useState4[1];

  var HTML5toTouch = {
    backends: [{
      backend: reactDndHtml5Backend.HTML5Backend
    }, {
      backend: reactDndTouchBackend.TouchBackend,
      options: {
        enableMouseEvents: true
      },
      preview: true,
      transition: MultiBackend.TouchTransition
    }]
  };

  var filterColumnsList = function filterColumnsList(event) {
    var _ref = event ? event.target : "",
        value = _ref.value;

    value = value ? value.toLowerCase() : "";

    if (value != "") {
      setSearchedColumns(originalColumns.filter(function (column) {
        return column.Header.toLowerCase().includes(value);
      }).concat(getRemarksColumnIfAvailable().filter(function (column) {
        return column.Header.toLowerCase().includes(value);
      })));
    } else {
      setSearchedColumns(concatedOriginalColumns);
    }
  };

  var updateColumnsInState = function updateColumnsInState(columns) {
    setManagedColumns(columns);
  };

  var findColumn = function findColumn(columnList, columnHeader) {
    return columnList.find(function (column) {
      return column.Header === columnHeader;
    });
  };

  var isItemPresentInList = function isItemPresentInList(list, headerValue) {
    var filteredList = list.filter(function (item) {
      return item.Header === headerValue;
    });
    return filteredList && filteredList.length > 0;
  };

  var isCheckboxSelected = function isCheckboxSelected(header) {
    if (header === additionalColumnHeader) {
      return remarksColumnToManage.length > 0;
    } else if (header === "Select All") {
      return searchedColumns.length === managedColumns.length + remarksColumnToManage.length;
    } else {
      return isItemPresentInList(managedColumns, header);
    }
  };

  var isInnerCellSelected = function isInnerCellSelected(columnHeader, header) {
    var columnListToSearch = columnHeader === additionalColumnHeader ? remarksColumnToManage : managedColumns;
    var selectedColumn = findColumn(columnListToSearch, columnHeader);
    return isItemPresentInList(selectedColumn.innerCells, header);
  };

  var findIndexOfItem = function findIndexOfItem(type, columnsList, indexOfColumnToAdd, columnHeader, originalInnerCells) {
    if (type === "column") {
      return columnsList.findIndex(function (column) {
        return column.Header === originalColumns[indexOfColumnToAdd].Header;
      });
    } else {
      return findColumn(columnsList, columnHeader).innerCells.findIndex(function (cell) {
        return cell.Header === originalInnerCells[indexOfColumnToAdd].Header;
      });
    }
  };

  var selectAllColumns = function selectAllColumns(event) {
    if (event.currentTarget.checked) {
      setManagedColumns(originalColumns);
      setRemarksColumnToManage(getRemarksColumnIfAvailable());
    } else {
      setManagedColumns([]);
      setRemarksColumnToManage([]);
    }
  };

  var selectSingleColumn = function selectSingleColumn(event) {
    var currentTarget = event.currentTarget;
    var checked = currentTarget.checked,
        value = currentTarget.value;

    if (value === additionalColumnHeader) {
      if (checked) {
        setRemarksColumnToManage(additionalColumn);
      } else {
        setRemarksColumnToManage([]);
      }
    } else {
      if (checked) {
        var indexOfColumnToAdd = originalColumns.findIndex(function (column) {
          return column.Header === value;
        });
        var itemToAdd = originalColumns[indexOfColumnToAdd];
        var prevItemIndex = -1;

        while (indexOfColumnToAdd > 0 && prevItemIndex === -1) {
          indexOfColumnToAdd = indexOfColumnToAdd - 1;
          prevItemIndex = findIndexOfItem("column", managedColumns, indexOfColumnToAdd);
        }

        var newColumnsList = [].concat(managedColumns);
        newColumnsList.splice(prevItemIndex + 1, 0, itemToAdd);
        setManagedColumns(newColumnsList);
      } else {
        setManagedColumns(managedColumns.filter(function (column) {
          return column.Header !== value;
        }));
      }
    }
  };

  var findAndSelectInnerCells = function findAndSelectInnerCells(stateColumnList, setStateColumnList, event) {
    var currentTarget = event.currentTarget;
    var checked = currentTarget.checked,
        dataset = currentTarget.dataset,
        value = currentTarget.value;
    var columnheader = dataset.columnheader;
    var selectedColumn = findColumn(stateColumnList, columnheader);
    var originalInnerCells = selectedColumn.originalInnerCells;

    if (originalInnerCells && originalInnerCells.length > 0) {
      if (checked) {
        var indexOfColumnToAdd = originalInnerCells.findIndex(function (column) {
          return column.Header === value;
        });
        var itemToAdd = originalInnerCells[indexOfColumnToAdd];
        var prevItemIndex = -1;

        while (indexOfColumnToAdd > 0 && prevItemIndex === -1) {
          indexOfColumnToAdd = indexOfColumnToAdd - 1;
          prevItemIndex = findIndexOfItem("innercell", stateColumnList, indexOfColumnToAdd, columnheader, originalInnerCells);
        }

        var newColumnsList = [].concat(stateColumnList);
        findColumn(newColumnsList, columnheader).innerCells.splice(prevItemIndex + 1, 0, itemToAdd);
        setStateColumnList(newColumnsList);
      } else {
        setStateColumnList(stateColumnList.map(function (column) {
          if (column.Header === columnheader) {
            column.innerCells = column.innerCells.filter(function (cell) {
              return cell.Header !== value;
            });
          }

          return column;
        }));
      }
    }
  };

  var selectInnerCells = function selectInnerCells(event) {
    findAndSelectInnerCells(managedColumns, setManagedColumns, event);
  };

  var selectRemarksInnerCells = function selectRemarksInnerCells(event) {
    findAndSelectInnerCells(remarksColumnToManage, setRemarksColumnToManage, event);
  };

  var doColumnUpdate = function doColumnUpdate() {
    setIsErrorDisplayed(false);

    if (managedColumns && managedColumns.length > 0) {
      setSearchedColumns(concatedOriginalColumns);
      props.updateColumnStructure(managedColumns, remarksColumnToManage);
    } else {
      setIsErrorDisplayed(true);
    }

    toggleManageColumns();
  };

  var resetInnerCells = function resetInnerCells(columnList) {
    if (columnList && columnList.length) {
      return columnList.map(function (column) {
        column.innerCells = column.originalInnerCells;
        return column;
      });
    }

    return columnList;
  };

  var resetColumnUpdate = function resetColumnUpdate() {
    setManagedColumns(resetInnerCells(originalColumns));
    setSearchedColumns(originalColumns.concat(getRemarksColumnIfAvailable()));
    setRemarksColumnToManage(resetInnerCells(getRemarksColumnIfAvailable()));
    props.updateColumnStructure(originalColumns, getRemarksColumnIfAvailable());
  };

  if (isManageColumnOpen) {
    return /*#__PURE__*/React__default.createElement(ClickAwayListener, {
      onClickAway: toggleManageColumns
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "columns--grid"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__grid"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__chooser"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__header"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: ""
    }, /*#__PURE__*/React__default.createElement("strong", null, "Column Chooser"))), /*#__PURE__*/React__default.createElement("div", {
      className: "column__body"
    }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("input", {
      type: "text",
      placeholder: "Search column",
      className: "custom__ctrl",
      onChange: filterColumnsList
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "column__selectAll"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__checkbox"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      value: "Select All",
      checked: isCheckboxSelected("Select All"),
      onChange: selectAllColumns
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "column__selectTxt"
    }, "Select All")), searchedColumns.map(function (column, index) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "column__wrap",
        key: index
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "column__checkbox"
      }, /*#__PURE__*/React__default.createElement("input", {
        type: "checkbox",
        value: column.Header,
        checked: isCheckboxSelected(column.Header),
        onChange: selectSingleColumn
      })), /*#__PURE__*/React__default.createElement("div", {
        className: "column__txt"
      }, column.Header));
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "column__settings"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__header"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__headerTxt"
    }, /*#__PURE__*/React__default.createElement("strong", null, "Column Settings"), isErrorDisplayed ? /*#__PURE__*/React__default.createElement("strong", {
      style: {
        marginLeft: "10px",
        color: "red"
      }
    }, "Select at least one column (other than ", additionalColumnHeader, ")") : null), /*#__PURE__*/React__default.createElement("div", {
      className: "column__close",
      onClick: toggleManageColumns
    }, /*#__PURE__*/React__default.createElement("i", {
      className: "fa fa-times",
      "aria-hidden": "true"
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "column__body"
    }, /*#__PURE__*/React__default.createElement(reactDnd.DndProvider, {
      backend: MultiBackend__default,
      options: HTML5toTouch
    }, /*#__PURE__*/React__default.createElement(ColumnsList, {
      columnsToManage: managedColumns,
      updateColumnsInState: updateColumnsInState,
      isInnerCellSelected: isInnerCellSelected,
      selectInnerCells: selectInnerCells
    })), remarksColumnToManage && remarksColumnToManage.length > 0 ? /*#__PURE__*/React__default.createElement("div", {
      className: "column__reorder full-width"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: ""
    }, remarksColumnToManage[0].Header), /*#__PURE__*/React__default.createElement("div", {
      className: "column__innerCells__wrap"
    }, remarksColumnToManage[0].originalInnerCells && remarksColumnToManage[0].originalInnerCells.length > 0 ? remarksColumnToManage[0].originalInnerCells.map(function (cell, index) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "column__wrap",
        key: index
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "column__checkbox"
      }, /*#__PURE__*/React__default.createElement("input", {
        type: "checkbox",
        "data-columnheader": remarksColumnToManage[0].Header,
        value: cell.Header,
        checked: isInnerCellSelected(remarksColumnToManage[0].Header, cell.Header),
        onChange: selectRemarksInnerCells
      })), /*#__PURE__*/React__default.createElement("div", {
        className: "column__txt"
      }, cell.Header));
    }) : null)) : null), /*#__PURE__*/React__default.createElement("div", {
      className: "column__footer"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "column__btns"
    }, /*#__PURE__*/React__default.createElement("button", {
      className: "btns",
      onClick: resetColumnUpdate
    }, "Reset"), /*#__PURE__*/React__default.createElement("button", {
      className: "btns",
      onClick: toggleManageColumns
    }, "Cancel"), /*#__PURE__*/React__default.createElement("button", {
      className: "btns btns__save",
      onClick: doColumnUpdate
    }, "Save")))))));
  } else {
    return /*#__PURE__*/React__default.createElement("div", null);
  }
});

var ItemTypes$1 = {
  SORT_ITEM: "SORT_ITEM"
};

var SortCopy = require("./SortCopy~IGKyJbDR.svg");

var SortDelete = require("./SortDelete~MFpZtzWS.svg");

var SortItem = function SortItem(_ref) {
  var id = _ref.id,
      sortOption = _ref.sortOption,
      originalColumns = _ref.originalColumns,
      moveSort = _ref.moveSort,
      findSort = _ref.findSort,
      updateSingleSortingOption = _ref.updateSingleSortingOption,
      copySortOption = _ref.copySortOption,
      deleteSortOption = _ref.deleteSortOption;
  var originalIndex = findSort(id).index;

  var _useDrag = reactDnd.useDrag({
    item: {
      type: ItemTypes$1.SORT_ITEM,
      id: id,
      originalIndex: originalIndex
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    },
    end: function end(dropResult, monitor) {
      var _monitor$getItem = monitor.getItem(),
          droppedId = _monitor$getItem.id,
          originalIndex = _monitor$getItem.originalIndex;

      var didDrop = monitor.didDrop();

      if (!didDrop) {
        moveSort(droppedId, originalIndex);
      }
    }
  }),
      isDragging = _useDrag[0].isDragging,
      drag = _useDrag[1];

  var _useDrop = reactDnd.useDrop({
    accept: ItemTypes$1.SORT_ITEM,
    canDrop: function canDrop() {
      return false;
    },
    hover: function hover(_ref2) {
      var draggedId = _ref2.id;

      if (draggedId !== id) {
        var _findSort = findSort(id),
            overIndex = _findSort.index;

        moveSort(draggedId, overIndex);
      }
    }
  }),
      drop = _useDrop[1];

  var getInncerCellsOfColumn = function getInncerCellsOfColumn(columnAccessor) {
    return originalColumns.find(function (column) {
      return column.accessor === columnAccessor;
    }).innerCells;
  };

  var changeSortByOptions = function changeSortByOptions(event) {
    var newSortByValue = event.target.value;
    var innerCellsList = getInncerCellsOfColumn(newSortByValue);
    updateSingleSortingOption(id, newSortByValue, innerCellsList && innerCellsList.length > 0 ? innerCellsList[0].accessor : "value", sortOption.order);
  };

  var changeSortOnOptions = function changeSortOnOptions(event) {
    var newSortOnValue = event.target.value;
    updateSingleSortingOption(id, sortOption.sortBy, newSortOnValue, sortOption.order);
  };

  var changeSortOrderOptions = function changeSortOrderOptions(event) {
    var newSortOrderValue = event.target.value;
    updateSingleSortingOption(id, sortOption.sortBy, sortOption.sortOn, newSortOrderValue);
  };

  var copySort = function copySort() {
    copySortOption(id);
  };

  var deleteSort = function deleteSort() {
    deleteSortOption(id);
  };

  var opacity = isDragging ? 0.5 : 1;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sort__bodyContent",
    style: {
      opacity: opacity
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: function ref(node) {
      return drag(drop(node));
    },
    style: {
      cursor: "move"
    },
    className: ""
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-navicon"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sort__file"
  }, /*#__PURE__*/React__default.createElement("select", {
    className: "custom__ctrl",
    onChange: changeSortByOptions,
    value: sortOption.sortBy
  }, originalColumns.map(function (orgItem, index) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: index,
      value: orgItem.accessor
    }, orgItem.Header);
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sort__file"
  }, /*#__PURE__*/React__default.createElement("select", {
    className: "custom__ctrl",
    onChange: changeSortOnOptions,
    value: sortOption.sortOn
  }, getInncerCellsOfColumn(sortOption.sortBy) && getInncerCellsOfColumn(sortOption.sortBy).length > 0 ? getInncerCellsOfColumn(sortOption.sortBy).map(function (innerCellItem, innerCellIndex) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: innerCellIndex,
      value: innerCellItem.accessor
    }, innerCellItem.Header);
  }) : /*#__PURE__*/React__default.createElement("option", {
    key: 0,
    value: "value"
  }, "Value")))), /*#__PURE__*/React__default.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sort__file"
  }, /*#__PURE__*/React__default.createElement("select", {
    className: "custom__ctrl",
    value: sortOption.order,
    onChange: changeSortOrderOptions
  }, /*#__PURE__*/React__default.createElement("option", null, "Ascending"), /*#__PURE__*/React__default.createElement("option", null, "Descending")))), /*#__PURE__*/React__default.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sort__icon",
    type: "button",
    onClick: copySort
  }, /*#__PURE__*/React__default.createElement("i", null, /*#__PURE__*/React__default.createElement("img", {
    src: SortCopy,
    alt: "copy sort"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "sort__reorder"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sort__icon",
    type: "button",
    onClick: deleteSort
  }, /*#__PURE__*/React__default.createElement("i", null, /*#__PURE__*/React__default.createElement("img", {
    src: SortDelete,
    alt: "copy sort"
  })))));
};

var SortingList = function SortingList(props) {
  var updateSortingOptions = props.updateSortingOptions,
      sortOptions = props.sortOptions;

  var moveSort = function moveSort(sortId, atIndex) {
    var _findSort = findSort(sortId),
        sort = _findSort.sort,
        index = _findSort.index;

    updateSortingOptions(update(sortOptions, {
      $splice: [[index, 1], [atIndex, 0, sort]]
    }));
  };

  var findSort = function findSort(sortId) {
    var sort = sortOptions.filter(function (c, index) {
      return index === sortId;
    })[0];
    return {
      sort: sort,
      index: sortOptions.indexOf(sort)
    };
  };

  var _useDrop = reactDnd.useDrop({
    accept: ItemTypes$1.SORT_ITEM
  }),
      drop = _useDrop[1];

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    ref: drop,
    style: {
      display: "flex",
      flexWrap: "wrap"
    }
  }, sortOptions && sortOptions.length > 0 ? /*#__PURE__*/React__default.createElement("ul", null, /*#__PURE__*/React__default.createElement("li", null, "Sort By"), /*#__PURE__*/React__default.createElement("li", null, "Sort On"), /*#__PURE__*/React__default.createElement("li", null, "Order")) : null, sortOptions.map(function (sortOption, index) {
    return /*#__PURE__*/React__default.createElement(SortItem, {
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

var GroupSort = React.memo(function (props) {
  var isGroupSortOverLayOpen = props.isGroupSortOverLayOpen,
      toggleGroupSortOverLay = props.toggleGroupSortOverLay,
      applyGroupSort = props.applyGroupSort,
      originalColumns = props.originalColumns;
  var sortingOrders = ["Ascending", "Descending"];
  var defaultSortingOption = [{
    sortBy: originalColumns[0].accessor,
    sortOn: originalColumns[0].innerCells ? originalColumns[0].innerCells[0].accessor : "value",
    order: sortingOrders[0]
  }];

  var _useState = React.useState([]),
      sortOptions = _useState[0],
      setSortOptions = _useState[1];

  var _useState2 = React.useState(false),
      isErrorDisplayed = _useState2[0],
      setIsErrorDisplayed = _useState2[1];

  var HTML5toTouch = {
    backends: [{
      backend: reactDndHtml5Backend.HTML5Backend
    }, {
      backend: reactDndTouchBackend.TouchBackend,
      options: {
        enableMouseEvents: true
      },
      preview: true,
      transition: MultiBackend.TouchTransition
    }]
  };

  var updateSortingOptions = function updateSortingOptions(sortingOptions) {
    setSortOptions(sortingOptions);
  };

  var addSortingOptions = function addSortingOptions() {
    setSortOptions([].concat(sortOptions, defaultSortingOption));
  };

  var clearSortingOptions = function clearSortingOptions() {
    setSortOptions([]);
    applyGroupSort([]);
  };

  var updateSingleSortingOption = function updateSingleSortingOption(sortIndex, sortByValue, sortOnValue, sortOrder) {
    var newOptionsList = sortOptions.slice(0);
    var newSortingOption = {
      sortBy: sortByValue,
      sortOn: sortOnValue,
      order: sortOrder
    };
    var updatedSortOptions = newOptionsList.map(function (option, index) {
      return index === sortIndex ? newSortingOption : option;
    });
    updateSortingOptions(updatedSortOptions);
  };

  var copySortOption = function copySortOption(sortIndex) {
    var newOption = sortOptions.slice(0)[sortIndex];
    setSortOptions(sortOptions.concat(newOption));
  };

  var deleteSortOption = function deleteSortOption(sortIndex) {
    setSortOptions(sortOptions.filter(function (option, index) {
      return index !== sortIndex;
    }));
  };

  var applySort = function applySort() {
    var isError = false;
    sortOptions.map(function (option, index) {
      var sortBy = option.sortBy,
          sortOn = option.sortOn;
      var optionIndex = index;
      var duplicateSort = sortOptions.find(function (opt, optIndex) {
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
    return /*#__PURE__*/React__default.createElement(ClickAwayListener, {
      onClickAway: toggleGroupSortOverLay
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sorts--grid"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sort__grid"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sort__settings"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sort__header"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sort__headerTxt"
    }, "Sort"), /*#__PURE__*/React__default.createElement("div", {
      className: "sort__close"
    }, /*#__PURE__*/React__default.createElement("i", {
      className: "fa fa-times",
      "aria-hidden": "true",
      onClick: toggleGroupSortOverLay
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "sort__body"
    }, /*#__PURE__*/React__default.createElement(reactDnd.DndProvider, {
      backend: MultiBackend__default,
      options: HTML5toTouch
    }, /*#__PURE__*/React__default.createElement(SortingList, {
      sortOptions: sortOptions,
      originalColumns: originalColumns,
      updateSortingOptions: updateSortingOptions,
      updateSingleSortingOption: updateSingleSortingOption,
      copySortOption: copySortOption,
      deleteSortOption: deleteSortOption
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "sort-warning"
    }, isErrorDisplayed ? /*#__PURE__*/React__default.createElement("span", null, "Duplicate sort options found.") : null), /*#__PURE__*/React__default.createElement("div", {
      className: "sort__new"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sort__section",
      type: "button",
      onClick: addSortingOptions
    }, /*#__PURE__*/React__default.createElement("span", null, "+"), /*#__PURE__*/React__default.createElement("div", {
      className: "sort__txt"
    }, "New Sort"))), /*#__PURE__*/React__default.createElement("div", {
      className: "sort__footer"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sort__btns"
    }, /*#__PURE__*/React__default.createElement("button", {
      className: "btns",
      onClick: clearSortingOptions
    }, "Clear All"), /*#__PURE__*/React__default.createElement("button", {
      className: "btns btns__save",
      onClick: applySort
    }, "Ok")))))));
  } else {
    return /*#__PURE__*/React__default.createElement("div", null);
  }
});

var ExportData = React.memo(function (props) {
  var isExportOverlayOpen = props.isExportOverlayOpen,
      toggleExportDataOverlay = props.toggleExportDataOverlay,
      rows = props.rows,
      originalColumns = props.originalColumns,
      isExpandContentAvailable = props.isExpandContentAvailable,
      additionalColumn = props.additionalColumn;

  var getRemarksColumnIfAvailable = function getRemarksColumnIfAvailable() {
    return isExpandContentAvailable ? additionalColumn : [];
  };

  var updatedColumns = [].concat(originalColumns).concat(getRemarksColumnIfAvailable());

  var _useState = React.useState(updatedColumns),
      managedColumns = _useState[0],
      setManagedColumns = _useState[1];

  var _useState2 = React.useState(updatedColumns),
      searchedColumns = _useState2[0],
      setSearchedColumns = _useState2[1];

  var _useState3 = React.useState([]),
      downloadTypes = _useState3[0],
      setDownloadTypes = _useState3[1];

  var _useState4 = React.useState(""),
      warning = _useState4[0],
      setWarning = _useState4[1];

  var isDownload = false;

  var exportRowData = function exportRowData() {
    isDownload = true;
    var filteredRow = [];
    var filteredRowValues = [];
    setWarning("");

    if (managedColumns.length > 0 && downloadTypes.length > 0) {
      rows.forEach(function (rowDetails) {
        var row = rowDetails.original;
        var keys = Object.getOwnPropertyNames(row);
        var filteredColumnVal = {};
        var rowFilteredValues = [];
        keys.forEach(function (key) {
          managedColumns.forEach(function (columnName) {
            if (columnName.accessor === key || columnName.innerCells && columnName.innerCells.length && columnName.innerCells.includes(key)) {
              var columnValue = "";

              if (typeof row[key] === "object") {
                if (row[key].length === undefined) columnValue = Object.values(row[key]).toString().replace(",", " | ");

                if (row[key].length > 0) {
                  var arrObj = "";
                  row[key].forEach(function (item, index) {
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
      downloadTypes.map(function (item) {
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

  var downloadPDF = function downloadPDF(rowFilteredValues) {
    var unit = "pt";
    var size = "A4";
    var orientation = "landscape";
    var marginLeft = 300;
    var doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    var title = "iCargo Neo Report";
    var headers = [managedColumns.map(function (column) {
      return column.Header;
    })];
    var content = {
      startY: 50,
      head: headers,
      body: rowFilteredValues
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("iCargo Neo Report.pdf");
    isDownload = false;
  };

  var downloadCSVFile = function downloadCSVFile(filteredRowValue) {
    var fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    var fileExtension = ".csv";
    var fileName = "iCargo Neo Report";
    var ws = XLSX.utils.json_to_sheet(filteredRowValue);
    var wb = {
      Sheets: {
        data: ws
      },
      SheetNames: ["data"]
    };
    var excelBuffer = XLSX.write(wb, {
      bookType: "csv",
      type: "array"
    });
    var data = new Blob([excelBuffer], {
      type: fileType
    });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  var downloadXLSFile = function downloadXLSFile(filteredRowValue) {
    var fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    var fileExtension = ".xlsx";
    var fileName = "iCargo Neo Report";
    var ws = XLSX.utils.json_to_sheet(filteredRowValue);
    var wb = {
      Sheets: {
        data: ws
      },
      SheetNames: ["data"]
    };
    var excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array"
    });
    var data = new Blob([excelBuffer], {
      type: fileType
    });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  var filterColumnsList = function filterColumnsList(event) {
    var _ref = event ? event.target : "",
        value = _ref.value;

    value = value ? value.toLowerCase() : "";

    if (value != "") {
      setSearchedColumns(originalColumns.filter(function (column) {
        return column.Header.toLowerCase().includes(value);
      }).concat(getRemarksColumnIfAvailable().filter(function (column) {
        return column.Header.toLowerCase().includes(value);
      })));
    } else {
      setSearchedColumns(updatedColumns);
    }
  };

  var isCheckboxSelected = function isCheckboxSelected(header) {
    if (header === "Select All") {
      return managedColumns.length === searchedColumns.length;
    } else {
      var selectedColumn = managedColumns.filter(function (column) {
        return column.Header === header;
      });
      return selectedColumn && selectedColumn.length > 0;
    }
  };

  var selectAllColumns = function selectAllColumns(event) {
    if (event.target.checked) {
      setManagedColumns(updatedColumns);
    } else {
      setManagedColumns([]);
    }
  };

  var selectSingleColumn = function selectSingleColumn(event) {
    var currentTarget = event.currentTarget;
    var checked = currentTarget.checked,
        value = currentTarget.value;

    if (checked) {
      (function () {
        var indexOfColumnToAdd = updatedColumns.findIndex(function (column) {
          return column.Header === value;
        });
        var itemToAdd = updatedColumns[indexOfColumnToAdd];
        var prevItemIndex = -1;

        while (indexOfColumnToAdd > 0 && prevItemIndex === -1) {
          prevItemIndex = managedColumns.findIndex(function (column) {
            return column.Header === updatedColumns[indexOfColumnToAdd - 1].Header;
          });
          indexOfColumnToAdd = indexOfColumnToAdd - 1;
        }

        var newColumnsList = managedColumns.slice(0);
        newColumnsList.splice(prevItemIndex + 1, 0, itemToAdd);
        setManagedColumns(newColumnsList);
      })();
    } else {
      setManagedColumns(managedColumns.filter(function (column) {
        return column.Header !== value;
      }));
    }
  };

  var changeDownloadType = function changeDownloadType(event) {
    var _ref2 = event ? event.currentTarget : "",
        value = _ref2.value,
        checked = _ref2.checked;

    if (checked) {
      setDownloadTypes(downloadTypes.concat([value]));
    } else {
      setDownloadTypes(downloadTypes.filter(function (type) {
        return type !== value;
      }));
    }
  };

  if (isExportOverlayOpen) {
    return /*#__PURE__*/React__default.createElement(ClickAwayListener, {
      onClickAway: toggleExportDataOverlay
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "exports--grid"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__grid"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__chooser"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__header"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: ""
    }, /*#__PURE__*/React__default.createElement("strong", null, "Export Data"))), /*#__PURE__*/React__default.createElement("div", {
      className: "export__body"
    }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("input", {
      type: "text",
      placeholder: "Search column",
      className: "custom__ctrl",
      onChange: filterColumnsList
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "export__wrap export__headertxt"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__checkbox"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      value: "Select All",
      checked: isCheckboxSelected("Select All"),
      onChange: selectAllColumns
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "export__txt"
    }, "Select All")), searchedColumns.map(function (column, index) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "export__wrap",
        key: index
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "export__checkbox"
      }, /*#__PURE__*/React__default.createElement("input", {
        type: "checkbox",
        value: column.Header,
        checked: isCheckboxSelected(column.Header),
        onChange: selectSingleColumn
      })), /*#__PURE__*/React__default.createElement("div", {
        className: "export__txt"
      }, column.Header));
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "export__settings"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__header"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__headerTxt"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "export__close"
    }, /*#__PURE__*/React__default.createElement("i", {
      className: "fa fa-times",
      "aria-hidden": "true",
      onClick: toggleExportDataOverlay
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "export__as"
    }, "Export As"), /*#__PURE__*/React__default.createElement("div", {
      className: "export__body"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__reorder"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "check-wrap"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      id: "chk_pdf",
      value: "pdf",
      checked: downloadTypes.includes("pdf"),
      onChange: changeDownloadType
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "export__file"
    }, /*#__PURE__*/React__default.createElement("i", {
      className: "fa fa-file-pdf-o",
      "aria-hidden": "true"
    }), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement("strong", null, "PDF"))), /*#__PURE__*/React__default.createElement("div", {
      className: "export__reorder"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "check-wrap"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      id: "chk_excel",
      value: "excel",
      checked: downloadTypes.includes("excel"),
      onChange: changeDownloadType
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "export__file"
    }, /*#__PURE__*/React__default.createElement("i", {
      className: "fa fa-file-excel-o",
      "aria-hidden": "true"
    }), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement("strong", null, "Excel"))), /*#__PURE__*/React__default.createElement("div", {
      className: "export__reorder"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "check-wrap"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      id: "chk_csv",
      value: "csv",
      checked: downloadTypes.includes("csv"),
      onChange: changeDownloadType
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "export__file"
    }, /*#__PURE__*/React__default.createElement("i", {
      className: "fa fa-file-text-o",
      "aria-hidden": "true"
    }), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement("strong", null, "CSV"))), /*#__PURE__*/React__default.createElement("div", {
      className: "exportWarning"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "alert alert-danger"
    }, /*#__PURE__*/React__default.createElement("strong", null, warning))), /*#__PURE__*/React__default.createElement("div", null, isDownload ? /*#__PURE__*/React__default.createElement("h2", {
      style: {
        textAlign: "center"
      }
    }, "Loading...") : null)), /*#__PURE__*/React__default.createElement("div", {
      className: "export__footer"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "export__btns"
    }, /*#__PURE__*/React__default.createElement("button", {
      className: "btns",
      onClick: toggleExportDataOverlay
    }, "Cancel"), /*#__PURE__*/React__default.createElement("button", {
      className: "btns btns__save",
      onClick: exportRowData
    }, "Export")))))));
  } else {
    return /*#__PURE__*/React__default.createElement("div", null);
  }
});

var listRef = React.createRef(null);
var Customgrid = React.memo(function (props) {
  var title = props.title,
      gridHeight = props.gridHeight,
      gridWidth = props.gridWidth,
      managableColumns = props.managableColumns,
      originalColumns = props.originalColumns,
      additionalColumn = props.additionalColumn,
      data = props.data,
      rowEditOverlay = props.rowEditOverlay,
      rowEditData = props.rowEditData,
      updateRowInGrid = props.updateRowInGrid,
      deletePopUpOverLay = props.deletePopUpOverLay,
      deleteRowFromGrid = props.deleteRowFromGrid,
      globalSearchLogic = props.globalSearchLogic,
      selectBulkData = props.selectBulkData,
      calculateRowHeight = props.calculateRowHeight,
      isExpandContentAvailable = props.isExpandContentAvailable,
      renderExpandedContent = props.renderExpandedContent,
      hasNextPage = props.hasNextPage,
      isNextPageLoading = props.isNextPageLoading,
      loadNextPage = props.loadNextPage,
      doGroupSort = props.doGroupSort;

  var _useState = React.useState(managableColumns),
      columns = _useState[0],
      setColumns = _useState[1];

  var _useState2 = React.useState(isExpandContentAvailable),
      isRowExpandEnabled = _useState2[0],
      setIsRowExpandEnabled = _useState2[1];

  if (!(data && data.length > 0) || !(columns && columns.length > 0)) {
    return /*#__PURE__*/React__default.createElement("h2", {
      style: {
        marginTop: "50px",
        textAlign: "center"
      }
    }, "Invalid Data or Columns Configuration");
  }

  var itemCount = hasNextPage ? data.length + 1 : data.length;
  var loadMoreItems = isNextPageLoading ? function () {} : loadNextPage ? loadNextPage : function () {};

  var isItemLoaded = function isItemLoaded(index) {
    return !hasNextPage || index < data.length;
  };

  var _useState3 = React.useState(false),
      isFilterOpen = _useState3[0],
      setFilterOpen = _useState3[1];

  var toggleColumnFilter = function toggleColumnFilter() {
    setFilterOpen(!isFilterOpen);
  };

  var _useState4 = React.useState(false),
      isGroupSortOverLayOpen = _useState4[0],
      setGroupSortOverLay = _useState4[1];

  var toggleGroupSortOverLay = function toggleGroupSortOverLay() {
    setGroupSortOverLay(!isGroupSortOverLayOpen);
  };

  var applyGroupSort = function applyGroupSort(sortOptions) {
    doGroupSort(sortOptions);
  };

  var _useState5 = React.useState(false),
      isManageColumnOpen = _useState5[0],
      setManageColumnOpen = _useState5[1];

  var toggleManageColumns = function toggleManageColumns() {
    setManageColumnOpen(!isManageColumnOpen);
  };

  var updateColumnStructure = function updateColumnStructure(newColumnStructure, remarksColumn) {
    setColumns([].concat(newColumnStructure));
    setIsRowExpandEnabled(remarksColumn && remarksColumn.length > 0 ? true : false);
  };

  var _useState6 = React.useState(false),
      isExportOverlayOpen = _useState6[0],
      setIsExportOverlayOpen = _useState6[1];

  var toggleExportDataOverlay = function toggleExportDataOverlay() {
    setIsExportOverlayOpen(!isExportOverlayOpen);
  };

  var defaultColumn = React.useMemo(function () {
    return {
      Filter: DefaultColumnFilter
    };
  }, []);

  var _useTable = reactTable.useTable({
    columns: columns,
    data: data,
    defaultColumn: defaultColumn,
    globalFilter: function globalFilter(rows, columns, filterValue) {
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
  }, reactTable.useFilters, reactTable.useGlobalFilter, reactTable.useSortBy, reactTable.useExpanded, reactTable.useRowSelect, reactTable.useFlexLayout, reactTable.useResizeColumns, function (hooks) {
    hooks.allColumns.push(function (columns) {
      return [{
        id: "selection",
        columnId: "column_custom_0",
        disableResizing: true,
        disableFilters: true,
        disableSortBy: true,
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        Header: function Header(_ref) {
          var getToggleAllRowsSelectedProps = _ref.getToggleAllRowsSelectedProps;
          return /*#__PURE__*/React__default.createElement(RowSelector, getToggleAllRowsSelectedProps());
        },
        Cell: function Cell(_ref2) {
          var row = _ref2.row;
          return /*#__PURE__*/React__default.createElement(RowSelector, row.getToggleRowSelectedProps());
        }
      }].concat(columns, [{
        id: "custom",
        columnId: "column_custom_1",
        disableResizing: true,
        disableFilters: true,
        disableSortBy: true,
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        Cell: function Cell(_ref3) {
          var row = _ref3.row;
          return /*#__PURE__*/React__default.createElement("div", {
            className: "action"
          }, /*#__PURE__*/React__default.createElement(RowOptions, {
            row: row,
            DeletePopUpOverLay: deletePopUpOverLay,
            deleteRowFromGrid: deleteRowFromGrid,
            RowEditOverlay: rowEditOverlay,
            rowEditData: rowEditData,
            updateRowInGrid: updateRowInGrid
          }), isRowExpandEnabled ? /*#__PURE__*/React__default.createElement("span", _extends({
            className: "expander"
          }, row.getToggleRowExpandedProps()), row.isExpanded ? /*#__PURE__*/React__default.createElement("i", {
            className: "fa fa-angle-up",
            "aria-hidden": "true"
          }) : /*#__PURE__*/React__default.createElement("i", {
            className: "fa fa-angle-down",
            "aria-hidden": "true"
          })) : null);
        }
      }]);
    });
  }),
      getTableProps = _useTable.getTableProps,
      getTableBodyProps = _useTable.getTableBodyProps,
      headerGroups = _useTable.headerGroups,
      rows = _useTable.rows,
      prepareRow = _useTable.prepareRow,
      selectedFlatRows = _useTable.selectedFlatRows,
      state = _useTable.state,
      setGlobalFilter = _useTable.setGlobalFilter;

  var bulkSelector = function bulkSelector() {
    if (selectBulkData) {
      selectBulkData(selectedFlatRows);
    }
  };

  React.useEffect(function () {
    if (listRef && listRef.current) {
      listRef.current.resetAfterIndex(0, true);
    }
  });
  var RenderRow = React.useCallback(function (_ref4) {
    var index = _ref4.index,
        style = _ref4.style;

    if (isItemLoaded(index)) {
      var row = rows[index];
      prepareRow(row);
      return /*#__PURE__*/React__default.createElement("div", _extends({}, row.getRowProps({
        style: style
      }), {
        className: "table-row tr"
      }), /*#__PURE__*/React__default.createElement("div", {
        className: "table-row-wrap"
      }, row.cells.map(function (cell) {
        return /*#__PURE__*/React__default.createElement("div", _extends({}, cell.getCellProps(), {
          className: "table-cell td"
        }), cell.render("Cell"));
      })), isRowExpandEnabled && row.isExpanded ? /*#__PURE__*/React__default.createElement("div", {
        className: "expand"
      }, renderExpandedContent ? renderExpandedContent(row, additionalColumn) : null) : null);
    }
  }, [prepareRow, rows, renderExpandedContent]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "wrapper",
    style: {
      width: gridWidth ? gridWidth : "100%"
    }
  }, /*#__PURE__*/React__default.createElement("link", {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "table-filter"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "results"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "name"
  }, /*#__PURE__*/React__default.createElement("strong", null, rows.length), /*#__PURE__*/React__default.createElement("span", null, " ", title ? title : "Rows"))), /*#__PURE__*/React__default.createElement("div", {
    className: "filter-utilities"
  }, /*#__PURE__*/React__default.createElement(ColumnReordering, {
    isManageColumnOpen: isManageColumnOpen,
    toggleManageColumns: toggleManageColumns,
    originalColumns: originalColumns,
    isExpandContentAvailable: isExpandContentAvailable,
    additionalColumn: [additionalColumn],
    updateColumnStructure: updateColumnStructure
  }), /*#__PURE__*/React__default.createElement(GlobalFilter, {
    globalFilter: state.globalFilter,
    setGlobalFilter: setGlobalFilter
  }), /*#__PURE__*/React__default.createElement(GroupSort, {
    isGroupSortOverLayOpen: isGroupSortOverLayOpen,
    toggleGroupSortOverLay: toggleGroupSortOverLay,
    originalColumns: originalColumns,
    applyGroupSort: applyGroupSort
  }), /*#__PURE__*/React__default.createElement(ExportData, {
    isExportOverlayOpen: isExportOverlayOpen,
    toggleExportDataOverlay: toggleExportDataOverlay,
    rows: rows,
    originalColumns: originalColumns,
    isExpandContentAvailable: isExpandContentAvailable,
    additionalColumn: [additionalColumn]
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "filter-icon keyword-search",
    onClick: toggleColumnFilter
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-filter",
    "aria-hidden": "true"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filter-icon bulk-select",
    onClick: bulkSelector
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-pencil-square-o",
    "aria-hidden": "true"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filter-icon bulk-select",
    onClick: toggleGroupSortOverLay
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-sort-amount-desc",
    "aria-hidden": "true"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filter-icon manage-columns",
    onClick: toggleManageColumns
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-columns",
    "aria-hidden": "true"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filter-icon manage-columns",
    onClick: toggleExportDataOverlay
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "fa fa-share-alt",
    "aria-hidden": "true"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "tableContainer table-outer",
    style: {
      height: gridHeight ? gridHeight : "50vh",
      overflowX: "auto",
      overflowY: "hidden"
    }
  }, /*#__PURE__*/React__default.createElement(AutoSizer, {
    disableWidth: true,
    disableResizing: true
  }, function (_ref5) {
    var height = _ref5.height;
    return /*#__PURE__*/React__default.createElement("div", _extends({}, getTableProps(), {
      className: "table"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "thead table-row table-row--head"
    }, headerGroups.map(function (headerGroup) {
      return /*#__PURE__*/React__default.createElement("div", _extends({}, headerGroup.getHeaderGroupProps(), {
        className: "tr"
      }), headerGroup.headers.map(function (column) {
        return /*#__PURE__*/React__default.createElement("div", _extends({}, column.getHeaderProps(), {
          className: "table-cell column-heading th"
        }), /*#__PURE__*/React__default.createElement("div", column.getSortByToggleProps(), column.render("Header"), /*#__PURE__*/React__default.createElement("span", null, column.isSorted ? column.isSortedDesc ? /*#__PURE__*/React__default.createElement("i", {
          className: "fa fa-sort-desc",
          "aria-hidden": "true"
        }) : /*#__PURE__*/React__default.createElement("i", {
          className: "fa fa-sort-asc",
          "aria-hidden": "true"
        }) : "")), /*#__PURE__*/React__default.createElement("div", {
          className: "txt-wrap column-filter " + (isFilterOpen ? "open" : "")
        }, !column.disableFilters ? column.render("Filter") : null), column.canResize && /*#__PURE__*/React__default.createElement("div", _extends({}, column.getResizerProps(), {
          className: "resizer"
        })));
      }));
    })), /*#__PURE__*/React__default.createElement("div", _extends({}, getTableBodyProps(), {
      className: "tbody"
    }), /*#__PURE__*/React__default.createElement(InfiniteLoader, {
      isItemLoaded: isItemLoaded,
      itemCount: itemCount,
      loadMoreItems: loadMoreItems
    }, function (_ref6) {
      var onItemsRendered = _ref6.onItemsRendered,
          _ref7 = _ref6.ref;
      return /*#__PURE__*/React__default.createElement(reactWindow.VariableSizeList, {
        ref: function ref(list) {
          _ref7(list);

          listRef.current = list;
        },
        style: {
          overflowX: "hidden"
        },
        height: height - 60,
        itemCount: rows.length,
        itemSize: function itemSize(index) {
          if (calculateRowHeight && typeof calculateRowHeight === "function") {
            return calculateRowHeight(rows, index, headerGroups);
          } else {
            return 70;
          }
        },
        onItemsRendered: onItemsRendered,
        overscanCount: 20
      }, RenderRow);
    })));
  })));
});

var Grid = React.forwardRef(function (props, ref) {
  var title = props.title,
      gridHeight = props.gridHeight,
      gridWidth = props.gridWidth,
      columns = props.columns,
      additionalColumn = props.additionalColumn,
      fetchData = props.fetchData,
      rowEditOverlay = props.rowEditOverlay,
      rowEditData = props.rowEditData,
      updateRowData = props.updateRowData,
      deletePopUpOverLay = props.deletePopUpOverLay,
      deleteRowData = props.deleteRowData,
      selectBulkData = props.selectBulkData,
      calculateRowHeight = props.calculateRowHeight;

  var _useState = React.useState(true),
      hasNextPage = _useState[0],
      setHasNextPage = _useState[1];

  var _useState2 = React.useState(false),
      isNextPageLoading = _useState2[0],
      setIsNextPageLoading = _useState2[1];

  var _useState3 = React.useState(false),
      isLoading = _useState3[0],
      setIsLoading = _useState3[1];

  var _useState4 = React.useState([]),
      items = _useState4[0],
      setItems = _useState4[1];

  var _useState5 = React.useState([]),
      groupSortOptions = _useState5[0],
      setGroupSortOptions = _useState5[1];

  var processedColumns = [];
  columns.forEach(function (column, index) {
    var innerCells = column.innerCells,
        accessor = column.accessor,
        sortValue = column.sortValue;
    var isInnerCellsPresent = innerCells && innerCells.length > 0;
    column.columnId = "column_" + index;

    if (!column.disableSortBy) {
      if (isInnerCellsPresent) {
        if (sortValue) {
          column.sortType = function (rowA, rowB) {
            return rowA.original[accessor][sortValue] > rowB.original[accessor][sortValue] ? -1 : 1;
          };
        } else {
          column.disableSortBy = true;
        }
      } else if (!innerCells) {
        column.sortType = function (rowA, rowB) {
          return rowA.original[accessor] > rowB.original[accessor] ? -1 : 1;
        };
      }
    }

    if (!column.disableFilters) {
      column.filter = function (rows, id, filterValue) {
        var searchText = filterValue ? filterValue.toLowerCase() : "";
        return rows.filter(function (row) {
          var original = row.original;
          return searchColumn(column, original, searchText);
        });
      };
    }

    processedColumns.push(column);
  });
  var renderExpandedContent = additionalColumn ? additionalColumn.Cell : null;
  var gridColumns = React.useMemo(function () {
    return processedColumns;
  }, []);

  var searchColumn = function searchColumn(column, original, searchText) {
    var isValuePresent = false;
    var accessor = column.accessor,
        innerCells = column.innerCells;
    var rowAccessorValue = original[accessor];
    var isInnerCellsPresent = innerCells && innerCells.length > 0;

    if (typeof rowAccessorValue === "object" && isInnerCellsPresent) {
      if (rowAccessorValue.length > 0) {
        rowAccessorValue.map(function (value) {
          innerCells.map(function (cell) {
            var dataAccessor = value[cell.accessor];

            if (dataAccessor && dataAccessor.toString().toLowerCase().includes(searchText)) {
              isValuePresent = true;
            }
          });
        });
      } else {
        innerCells.map(function (cell) {
          var dataAccessor = original[accessor][cell.accessor];

          if (dataAccessor && dataAccessor.toString().toLowerCase().includes(searchText)) {
            isValuePresent = true;
          }
        });
      }
    } else {
      var dataAccessor = original[accessor];

      if (dataAccessor && dataAccessor.toString().toLowerCase().includes(searchText)) {
        isValuePresent = true;
      }
    }

    return isValuePresent;
  };

  var globalSearchLogic = function globalSearchLogic(rows, columns, filterValue) {
    if (filterValue && processedColumns.length > 0) {
      var searchText = filterValue.toLowerCase();
      return rows.filter(function (row) {
        var original = row.original;
        var returnValue = false;
        processedColumns.map(function (column) {
          returnValue = returnValue || searchColumn(column, original, searchText);
        });
        return returnValue;
      });
    }

    return rows;
  };

  var compareValues = function compareValues(compareOrder, v1, v2) {
    if (compareOrder === "Ascending") {
      return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
    } else {
      return v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
    }
  };

  var getSortedData = function getSortedData(originalData) {
    return originalData.sort(function (x, y) {
      var compareResult = 0;
      groupSortOptions.forEach(function (option) {
        var sortBy = option.sortBy,
            sortOn = option.sortOn,
            order = option.order;
        var newResult = sortOn === "value" ? compareValues(order, x[sortBy], y[sortBy]) : compareValues(order, x[sortBy][sortOn], y[sortBy][sortOn]);
        compareResult = compareResult || newResult;
      });
      return compareResult;
    });
  };

  var getOriginalDataIndex = function getOriginalDataIndex(sortedDataIndex) {
    var updatedData = getSortedData([].concat(items)).find(function (item, index) {
      return index === sortedDataIndex;
    });
    var originalDataIndex = -1;
    originalDataIndex = items.findIndex(function (item, index) {
      return item === updatedData;
    });
    return originalDataIndex;
  };

  React.useImperativeHandle(ref, function () {
    return {
      updateCellInGrid: function updateCellInGrid(rowIndex, columnId, value) {
        var originalDataIndex = getOriginalDataIndex(rowIndex);

        if (originalDataIndex >= 0) {
          setItems(function (old) {
            return old.map(function (row, index) {
              if (index === originalDataIndex) {
                var _extends2;

                return _extends({}, old[originalDataIndex], (_extends2 = {}, _extends2[columnId] = value, _extends2));
              }

              return row;
            });
          });
        }
      }
    };
  });

  var updateRowInGrid = function updateRowInGrid(original, updatedRow) {
    setItems(function (old) {
      return old.map(function (row) {
        if (row === original) {
          row = updatedRow;
        }

        return row;
      });
    });
    updateRowData(updatedRow);
  };

  var deleteRowFromGrid = function deleteRowFromGrid(original) {
    setItems(function (old) {
      return old.filter(function (row) {
        return row !== original;
      });
    });
    deleteRowData(original);
  };

  var doGroupSort = function doGroupSort(sortOptions) {
    setGroupSortOptions(sortOptions);
  };

  var loadNextPage = function loadNextPage() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var newIndex = args && args.length > 0 ? args[0] : -1;

    if (newIndex >= 0 && hasNextPage) {
      setIsLoading(true);
      setIsNextPageLoading(true);
      fetchData(newIndex).then(function (data) {
        setIsLoading(false);
        setHasNextPage(data && data.length > 0);
        setIsNextPageLoading(false);
        setItems(items.concat(data));
      });
    }
  };

  React.useEffect(function () {
    processedColumns.map(function (column) {
      if (column.innerCells) {
        column.originalInnerCells = column.innerCells;
      }

      return column;
    });

    if (additionalColumn) {
      var innerCells = additionalColumn.innerCells;

      if (innerCells) {
        additionalColumn.originalInnerCells = innerCells;
      }
    }

    setIsLoading(true);
    fetchData(0).then(function (data) {
      setIsLoading(false);
      setItems(data);
    });
  }, []);
  var data = getSortedData([].concat(items));

  if (data && data.length > 0) {
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Customgrid, {
      title: title,
      gridHeight: gridHeight,
      gridWidth: gridWidth,
      managableColumns: gridColumns,
      originalColumns: gridColumns,
      additionalColumn: additionalColumn,
      data: data,
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
    }), isNextPageLoading ? /*#__PURE__*/React__default.createElement("div", {
      id: "loader",
      className: "background"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "dots container"
    }, /*#__PURE__*/React__default.createElement("span", null), /*#__PURE__*/React__default.createElement("span", null), /*#__PURE__*/React__default.createElement("span", null))) : null);
  } else if (isLoading) {
    return /*#__PURE__*/React__default.createElement("h2", {
      style: {
        textAlign: "center",
        marginTop: "70px"
      }
    }, "Initializing Grid...");
  } else {
    return /*#__PURE__*/React__default.createElement("h2", {
      style: {
        textAlign: "center",
        marginTop: "70px"
      }
    }, "Invalid Data or Column Configurations");
  }
});

module.exports = Grid;
//# sourceMappingURL=index.js.map
