import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { faTimes, faCheck, faStar, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';

function AutoComplete(props) {
  const [autoCompleteArr, setAutoAcompleteArr] = useState([]);
  useEffect(() => {
    setAutoAcompleteArr(props.autoCompleteArray);
  }, [props.autoCompleteArray]);

  const handleClose = item => {
    props.deleteAutoCompleteElement(item);
  };

  const onSelect = (selectedList, selectedItem, item) => {
    props.createAutoCompleteArray(item, selectedList);
  };

  let autoCompleteDiv = autoCompleteArr.map((item, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "filter__input",
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__input-title"
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__label"
    }, /*#__PURE__*/React.createElement("span", null, item.name), /*#__PURE__*/React.createElement("span", null, "\xA0>\xA0"), /*#__PURE__*/React.createElement("span", null, item.type)), /*#__PURE__*/React.createElement("div", {
      className: "filter__control"
    }, /*#__PURE__*/React.createElement(Form.Check, {
      type: "switch",
      label: "",
      className: item.type.concat(item.name),
      id: item.name.concat(item.type),
      checked: item.enabled,
      onChange: e => {
        props.handleAutoCompleteEnabled(item);
      }
    }), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faTimes,
      type: "button",
      onClick: e => {
        handleClose(item);
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "displayFlex"
    }, /*#__PURE__*/React.createElement(Multiselect, {
      id: item.type.concat(item.name),
      disable: !item.enabled,
      options: item.objectArray,
      closeIcon: "close",
      displayValue: "key",
      className: "form-control",
      selectedValues: item.value,
      onSelect: e => {
        onSelect(e, e[e.length - 1], item);
      }
    })));
  });
  return /*#__PURE__*/React.createElement("div", null, autoCompleteDiv);
}

function FieldComponent(props) {
  const [fieldComponentArr, setFieldComponentArr] = useState([]);
  useEffect(() => {
    setFieldComponentArr(props.dateTimesArray);
  }, [props.dateTimesArray]);

  const handleClose = item => {
    props.deleteDateTimeElement(item);
  };

  let fieldComponentDiv = fieldComponentArr.map((item, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "filter__input",
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__input-title",
      key: 1
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__label"
    }, /*#__PURE__*/React.createElement(Form.Label, null, /*#__PURE__*/React.createElement("strong", null, item.name))), /*#__PURE__*/React.createElement("div", {
      className: "filter__control"
    }, /*#__PURE__*/React.createElement(Form.Check, {
      type: "switch",
      id: item.name,
      label: "",
      defaultChecked: item.enabled,
      onChange: e => {
        props.handleDateTimeEnabled(item);
      }
    }), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      className: "fontIcons",
      icon: faTimes,
      onClick: e => {
        handleClose(item);
      }
    }))), item.field.map((field, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: `${index}-${field.name}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "displayFlex",
        key: `${index},${field.name}`
      }, /*#__PURE__*/React.createElement(Form.Text, null, field.column)), /*#__PURE__*/React.createElement("div", {
        className: "filter__split",
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: "date-wrap"
      }, /*#__PURE__*/React.createElement(Form.Control, {
        disabled: !item.enabled,
        type: "date",
        value: field.value,
        className: field.name,
        onChange: e => {
          props.createDateTimeArray(item, field.column, e.target.value);
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "date-button"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "time-wrap"
      }, /*#__PURE__*/React.createElement("input", {
        className: "time",
        type: "time",
        disabled: !item.enabled
      }))));
    }), /*#__PURE__*/React.createElement("button", {
      disabled: !item.enabled,
      type: "button",
      onClick: e => {
        props.addToday();
      }
    }, "Today"), /*#__PURE__*/React.createElement("button", {
      disabled: !item.enabled,
      type: "button",
      onClick: e => {
        props.addTomorrow();
      }
    }, "Tomorrow"), /*#__PURE__*/React.createElement("button", {
      disabled: !item.enabled,
      type: "button",
      onClick: e => {
        props.addThisWeek();
      }
    }, "This Week"), /*#__PURE__*/React.createElement("button", {
      disabled: !item.enabled,
      type: "button",
      onClick: e => {
        props.addSevenDays();
      }
    }, "Next 7 days"), /*#__PURE__*/React.createElement("button", {
      disabled: !item.enabled,
      type: "button",
      onClick: e => {
        props.addForteenDays();
      }
    }, "Next 14 days"), /*#__PURE__*/React.createElement("button", {
      disabled: !item.enabled,
      type: "button",
      onClick: e => {
        props.addThisMonth();
      }
    }, "This Month"), /*#__PURE__*/React.createElement("button", {
      disabled: !item.enabled,
      type: "button",
      onClick: e => {
        props.addThirtyDays();
      }
    }, "Next 30 days"), /*#__PURE__*/React.createElement("br", null), "Next", " ", /*#__PURE__*/React.createElement("input", {
      disabled: !item.enabled,
      type: "text",
      onChange: e => {
        props.nextDayChange(e.target.value);
      }
    }), " ", "Days", /*#__PURE__*/React.createElement("br", null), "Last", " ", /*#__PURE__*/React.createElement("input", {
      disabled: !item.enabled,
      type: "text",
      onChange: e => {
        props.lastDayChange(e.target.value);
      }
    }), " ", "Days");
  });
  return /*#__PURE__*/React.createElement("div", null, fieldComponentDiv);
}

function Condition(props) {
  const [conditionArr, setConditionArr] = useState([]);
  useEffect(() => {
    setConditionArr(props.conditionsArray);
  }, [props.conditionsArray]);
  let conditionalDiv = conditionArr.map((item, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "filter__input",
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__input-title"
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__label"
    }, /*#__PURE__*/React.createElement(Form.Label, null, /*#__PURE__*/React.createElement("strong", null, item.name))), /*#__PURE__*/React.createElement("div", {
      className: "filter__control"
    }, /*#__PURE__*/React.createElement(Form.Check, {
      type: "switch",
      id: item.name,
      label: "",
      checked: item.enabled,
      onChange: e => {
        props.handleCondionalEnabled(item);
      }
    }), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      className: "fontIcons",
      icon: faTimes,
      onClick: e => {
        props.deleteConditionalElement(item);
      }
    }))), /*#__PURE__*/React.createElement("div", {
      onChange: e => {
        props.createConditionalArray(item, e.target.value);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "displayFlex"
    }, /*#__PURE__*/React.createElement(Form.Group, {
      controlId: "exampleForm.ControlSelect1"
    }, /*#__PURE__*/React.createElement(Form.Text, {
      className: "text-muted"
    }, Object.keys(item)[3]), /*#__PURE__*/React.createElement(Form.Control, {
      disabled: !item.enabled,
      as: "select",
      defaultValue: item.value
    }, item.condition.map((condition, index) => {
      return /*#__PURE__*/React.createElement("option", {
        key: index
      }, condition.value);
    })))), /*#__PURE__*/React.createElement("div", {
      className: "displayFlex"
    }, /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Form.Text, {
      className: "text-muted"
    }, Object.keys(item)[4]), /*#__PURE__*/React.createElement(Form.Control, {
      disabled: !item.enabled,
      defaultValue: item.amount,
      required: true,
      type: "number"
    })))));
  });
  return /*#__PURE__*/React.createElement("div", null, conditionalDiv);
}

function TextComponents(props) {
  const [textComponentArr, setTextComponentArr] = useState([]);
  useEffect(() => {
    setTextComponentArr(props.textComponentsArray);
  }, [props.textComponentsArray]);
  let textComponentDiv = textComponentArr.map((item, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__input"
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__input-title"
    }, /*#__PURE__*/React.createElement("div", {
      className: "filter__label"
    }, /*#__PURE__*/React.createElement("span", null, item.name)), /*#__PURE__*/React.createElement("div", {
      className: "filter__control"
    }, /*#__PURE__*/React.createElement(Form.Check, {
      type: "switch",
      label: "",
      id: item.name,
      checked: item.enabled,
      onChange: e => {
        props.handleTextComponentEnabled(item);
      }
    }), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faTimes,
      type: "button",
      onClick: e => {
        props.deleteTextComponentElement(item);
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "displayFlex"
    }, /*#__PURE__*/React.createElement("input", {
      id: item.name.concat(item.dataType),
      disabled: !item.enabled,
      type: "text",
      defaultValue: item.value,
      className: "form-control",
      onChange: e => {
        props.createTextComponentsArray(item, e.target.value);
      }
    }))));
  });
  return /*#__PURE__*/React.createElement("div", null, textComponentDiv);
}

const RightDrawer = forwardRef((props, ref) => {
  const [showSavePopup, setShowSavePopup] = useState("none");
  const [saveFilterName, setSaveFilterName] = useState("");
  const [saveFilterWarning, setSaveFilterWarning] = useState("");
  const [warningLabel, setWarningLabel] = useState("");

  const registersaveFilterName = e => {
    setSaveFilterWarning("");
    setWarningLabel("");
    setSaveFilterName(e.target.value);
  };

  const showPopUp = () => {
    setShowSavePopup("");
  };

  const cancelSavePopup = () => {
    setShowSavePopup("none");
    setSaveFilterWarning("");
    setWarningLabel("");
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "filter__title"
  }, "Searched Filters", /*#__PURE__*/React.createElement("span", {
    className: "filter-count"
  }, props.filterCount)), /*#__PURE__*/React.createElement("div", {
    className: "filter__content"
  }, /*#__PURE__*/React.createElement(AutoComplete, {
    name: props.name,
    type: props.type,
    enabled: props.enabled,
    dataType: props.dataType,
    options: props.options,
    autoCompleteArray: props.autoCompleteArray,
    deleteAutoCompleteElement: props.deleteAutoCompleteElement,
    handleAutoCompleteEnabled: props.handleAutoCompleteEnabled,
    createAutoCompleteArray: props.createAutoCompleteArray
  }), /*#__PURE__*/React.createElement(FieldComponent, {
    dateTimesArray: props.dateTimesArray,
    deleteDateTimeElement: props.deleteDateTimeElement,
    handleDateTimeEnabled: props.handleDateTimeEnabled,
    createDateTimeArray: props.createDateTimeArray,
    addToday: props.addToday,
    addTomorrow: props.addTomorrow,
    addThisMonth: props.addThisMonth,
    addForteenDays: props.addForteenDays,
    addSevenDays: props.addSevenDays,
    addThisWeek: props.addThisWeek,
    addThirtyDays: props.addThirtyDays,
    lastDayChange: props.lastDayChange,
    nextDayChange: props.nextDayChange
  }), /*#__PURE__*/React.createElement(Condition, {
    conditionsArray: props.conditionsArray,
    handleCondionalEnabled: props.handleCondionalEnabled,
    createConditionalArray: props.createConditionalArray,
    deleteConditionalElement: props.deleteConditionalElement
  }), /*#__PURE__*/React.createElement(TextComponents, {
    textComponentsArray: props.textComponentsArray,
    deleteTextComponentElement: props.deleteTextComponentElement,
    createTextComponentsArray: props.createTextComponentsArray,
    handleTextComponentEnabled: props.handleTextComponentEnabled
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter__btn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter__save"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "button-save",
    variant: ""
  }, /*#__PURE__*/React.createElement("img", {
    src: "../images/icon-save.svg",
    onClick: showPopUp,
    alt: "save icon"
  }), /*#__PURE__*/React.createElement("span", null, "SAVE"))), /*#__PURE__*/React.createElement("div", {
    className: "btn-wrap"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "",
    className: "reset",
    onClick: props.resetDrawer
  }, "Reset"), /*#__PURE__*/React.createElement(Button, {
    variant: "",
    className: "applyFilter",
    onClick: e => {
      props.applyFilter();
      props.deleteAutoCompleteElement({});
      props.deleteConditionalElement({});
      props.deleteDateTimeElement({});
      props.deleteTextComponentElement({});
      props.closeDrawer();
    }
  }, "Apply Filter")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: showSavePopup
    },
    className: "popup--save"
  }, /*#__PURE__*/React.createElement("h5", null, "Save the Filter"), /*#__PURE__*/React.createElement("span", {
    className: warningLabel
  }, saveFilterWarning), /*#__PURE__*/React.createElement("label", null, "Saved Filter Name"), /*#__PURE__*/React.createElement("input", {
    className: "txt",
    value: saveFilterName,
    onChange: e => registersaveFilterName(e)
  }), /*#__PURE__*/React.createElement("div", {
    className: "btn-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button",
    onClick: e => {
      cancelSavePopup();
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "button",
    onClick: e => {
      props.saveFilter(saveFilterName);
      setSaveFilterName("");
      setShowSavePopup("none");
    }
  }, "Save")))));
});

let accordianArray = [];
function LeftDrawer(props) {
  const [leftDrawData, setLeftDrawData] = useState([]);
  const [leftDrawTemp, setLeftDrawTemp] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterTypeTemp, setFilterTypeTemp] = useState([]);
  const [activeState, setActiveState] = useState("1");
  const [accordianArr, setAccordianArr] = useState([]);
  useEffect(() => {
    let typeArray = [];
    setLeftDrawData(props.filterData.filter);
    setLeftDrawTemp(props.filterData.filter);
    props.filterData.filter.forEach(item => {
      if (item.types) {
        item.types.forEach(type => {
          typeArray.push(type.name);
        });
      }
    });
    setFilterType(typeArray);
    setFilterTypeTemp(typeArray);
  }, [props.filterData.filter]);

  const searchFilterHandler = e => {
    let filteredList = [];
    let filteredTypeList = [];
    const searchKey = e.target.value;

    if (leftDrawData) {
      filteredList = leftDrawTemp.filter(item => {
        if (item.types) {
          filteredTypeList = item.types.filter(type => {
            return type.name && type.name.toLowerCase().includes(searchKey.toLowerCase());
          });

          if (filteredTypeList.length > 0 && searchKey !== "") {
            setActiveState("2");
            return true;
          } else {
            setActiveState("1");
          }

          return item.name && item.name.toLowerCase().includes(searchKey.toLowerCase());
        } else {
          return item.name && item.name.toLowerCase().includes(searchKey.toLowerCase());
        }
      });
    }

    setLeftDrawData(filteredList);
    setFilterType(filteredTypeList);
  };

  leftDrawData.forEach(item => {
    if (item.types) {
      accordianArray.push({
        name: item.name,
        accordianShow: ""
      });
    }
  });

  const handleAccordianArrow = (name, className) => {
    accordianArray.forEach(item => {
      let index = accordianArray.indexOf(item);

      if (item.name === name) {
        if (className === "show card-header") {
          accordianArray[index] = {
            name: item.name,
            accordianShow: ""
          };
        } else {
          accordianArray[index] = {
            name: item.name,
            accordianShow: "show"
          };
        }
      }
    });
    setAccordianArr(accordianArray);
    accordianArray = [];
  };

  let accordianHeads = leftDrawData.map((item, index) => {
    if (item.types.length) {
      let show = "";
      accordianArr.forEach(accord => {
        if (accord.name === item.name) {
          show = accord.accordianShow;
        }
      });
      return /*#__PURE__*/React.createElement("div", {
        key: index
      }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Accordion.Toggle, {
        className: show,
        as: Card.Header,
        eventKey: "1",
        onClick: e => {
          handleAccordianArrow(item.name, e.target.className);
        }
      }, item.name), /*#__PURE__*/React.createElement(Accordion.Collapse, {
        eventKey: "1"
      }, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement("ul", {
        className: "firstAccordion",
        key: index
      }, item.types && item.types.map((type, index) => {
        return /*#__PURE__*/React.createElement("li", {
          onClick: e => {
            props.fromLeftToRight(item.name, type.dataType, type.enabled, type.name, item.field, item.condition, type.options);
          },
          key: index
        }, type.name);
      })))))));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      });
    }
  });
  let fieldHeads = leftDrawData.map((item, index) => {
    if (item.field.length) {
      return /*#__PURE__*/React.createElement("div", {
        className: "fieldHeads",
        key: index
      }, /*#__PURE__*/React.createElement("li", {
        onClick: e => {
          props.fromLeftToRight(item.name, item.dataType, item.enabled, item.types, item.field, item.condition);
        }
      }, item.name));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      });
    }
  });
  let conditionHeads = leftDrawData.map((item, index) => {
    if (item.condition.length) {
      return /*#__PURE__*/React.createElement("div", {
        className: "conditionHeads",
        key: index
      }, /*#__PURE__*/React.createElement("li", {
        onClick: e => {
          props.fromLeftToRight(item.name, item.dataType, item.enabled, item.types, item.field, item.condition);
        }
      }, item.name));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      });
    }
  });
  let normalHeads = leftDrawData.map((item, index) => {
    if (!(item.condition.length || item.types.length || item.field.length)) {
      return /*#__PURE__*/React.createElement("div", {
        className: "normalHeads",
        key: index
      }, /*#__PURE__*/React.createElement("li", {
        onClick: e => {
          props.fromLeftToRight(item.name, item.dataType, item.enabled, item.types, item.field, item.condition);
        }
      }, item.name));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      });
    }
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Form.Row, null, /*#__PURE__*/React.createElement(Form.Control, {
    required: true,
    type: "text",
    placeholder: "Search a Filter",
    defaultValue: "",
    className: "customControl",
    onChange: searchFilterHandler
  })), /*#__PURE__*/React.createElement("div", {
    className: "leftDrawer"
  }, /*#__PURE__*/React.createElement("div", null, accordianHeads), /*#__PURE__*/React.createElement("div", null, fieldHeads), /*#__PURE__*/React.createElement("div", null, conditionHeads), /*#__PURE__*/React.createElement("div", null, normalHeads)));
}

const SavedFilters = props => {
  const [showFilter, setShowFilter] = useState(false);
  let listRef = useRef();
  useEffect(() => {
    let listHandler = event => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setShowFilter(false);
        props.handleListFilter();
      }
    };

    setShowFilter(props.showFilter);
    document.addEventListener("mousedown", listHandler);
    return () => {
      document.removeEventListener("mousedown", listHandler);
    };
  }, [props]);
  let keyValue = "";
  let savedFilters = localStorage.getItem("savedFilters");
  savedFilters = savedFilters ? JSON.parse(savedFilters) : [];

  if (savedFilters.length > 5) {
    savedFilters = savedFilters.slice(savedFilters.length - 5, savedFilters.length);
  }

  const savedFilter = savedFilters.map((filterArray, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: {
        marginLeft: "-54px"
      },
      icon: faCheck
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "15px"
      },
      onClick: e => {
        setShowFilter(false);
        props.handleListFilter();
        props.addSavedFilters(filterArray);
      }
    }, Object.keys(filterArray)[0]), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    })));
  });

  if (showFilter) {
    return /*#__PURE__*/React.createElement("div", {
      className: "lists",
      ref: listRef
    }, /*#__PURE__*/React.createElement("div", {
      className: "listsView"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-muted"
    }, "list view"), /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck,
      className: "selected"
    }), /*#__PURE__*/React.createElement("div", {
      className: "leftSpace selected"
    }, "Recently Viewed(10)"), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    })), /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck
    }), /*#__PURE__*/React.createElement("div", {
      className: "leftSpace"
    }, "To be called cancelled flights(12)"), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    })), /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck
    }), /*#__PURE__*/React.createElement("div", {
      className: "leftSpace"
    }, " Delayed Flights(10)"), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    })), /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck
    }), /*#__PURE__*/React.createElement("div", {
      className: "leftSpace"
    }, " Flights in next 7 days(10) "), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    })), /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck
    }), /*#__PURE__*/React.createElement("div", {
      className: "leftSpace"
    }, " Flights in next 10 days(10) "), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    })), /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck
    }), /*#__PURE__*/React.createElement("div", {
      className: "leftSpace"
    }, " Flights in next 20 days(10) "), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    })), /*#__PURE__*/React.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck
    }), /*#__PURE__*/React.createElement("div", {
      className: "leftSpace"
    }, " Flights in next 30 days(10) "), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faStar,
      className: "marginLeft"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "savedFilters"
    }, /*#__PURE__*/React.createElement("ul", {
      key: keyValue,
      className: "leftSpace"
    }, savedFilter)));
  } else {
    return /*#__PURE__*/React.createElement("div", null);
  }
};

let chips;

const MainFilterPanel = props => {
  const [listFilter, setListFilter] = useState(false);
  const [chipArray, setChipArray] = useState([]);
  useEffect(() => {
    setChipArray(props.applyFilterChip.applyFilter);
  }, [props.applyFilterChip]);

  const handleListFilter = () => {
    setListFilter(!listFilter);
  };

  if (chipArray) {
    chips = chipArray.map((item, index) => {
      if (item.type) {
        return /*#__PURE__*/React.createElement("div", {
          className: "listContent",
          key: index,
          onClick: e => {
            props.addAppliedFilters(item);
          }
        }, /*#__PURE__*/React.createElement("span", null, item.name, ":", item.type), item.value.map((value, index) => {
          return /*#__PURE__*/React.createElement("div", {
            key: index
          }, value.value);
        }));
      } else if (item.condition) {
        return /*#__PURE__*/React.createElement("div", {
          className: "listContent",
          key: index,
          onClick: e => {
            props.addAppliedFilters(item);
          }
        }, /*#__PURE__*/React.createElement("span", null, item.name), ":", item.condition, item.amount);
      } else if (item.fieldValue) {
        return /*#__PURE__*/React.createElement("div", {
          className: "listContent",
          key: index,
          onClick: e => {
            props.addAppliedFilters(item);
          }
        }, /*#__PURE__*/React.createElement("span", null, item.fieldValue), item.value);
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "listContent",
          key: index,
          onClick: e => {
            props.addAppliedFilters(item);
          }
        }, /*#__PURE__*/React.createElement("span", null, item.name), ":", item.value);
      }
    });
  } else {
    chips = /*#__PURE__*/React.createElement("div", null);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "displayFlex"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alignLeft"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faAlignLeft,
    onClick: handleListFilter
  }), /*#__PURE__*/React.createElement(SavedFilters, {
    onSelectSavedFilter: props.onSelectSavedFilter,
    showFilter: listFilter,
    handleListFilter: handleListFilter,
    addSavedFilters: props.addSavedFilters
  }), /*#__PURE__*/React.createElement("div", {
    className: "leftSpace"
  }, "All flights"))), /*#__PURE__*/React.createElement("div", {
    className: "secondList"
  }, /*#__PURE__*/React.createElement("div", {
    className: "displayFlex"
  }, chips, /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      props.showDrawer();
    }
  }, "+ Add Filter"))));
};

let dateFormat = require("dateformat");

function useComponentVisible() {
  const [showApplyFilter, setApplyFilter] = useState(false);
  const ref = useRef(null);

  const handleHideDropdown = event => {
    if (event.key === "Escape") {
      setApplyFilter(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setApplyFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return {
    ref,
    showApplyFilter,
    setApplyFilter
  };
}

function filter(props) {
  const [autoCompletesValueArray, setAutoCompletesValueArray] = useState([]);
  const [autoCompletesArray, setAutoCompletesArray] = useState([]);
  const [dateTimesArray, setDateTimesArray] = useState([]);
  const [dateTimesValueArray, setDateTimesValueArray] = useState([]);
  const [conditionsArray, setConditionsArray] = useState([]);
  const [conditionsValueArray, setConditionsValueArray] = useState([]);
  const [textComponentsArray, setTextComponentsArray] = useState([]);
  const [textComponentsValueArray, setTextComponentsValueArray] = useState([]);
  const [applyFilterChip, setApplyFilterChip] = useState({});
  const [filterCount, setFilterCount] = useState(0);
  const [filterData, setFilterData] = useState({});
  useEffect(() => {
    setFilterData(props.filterData);
  }, [props.filterData]);
  useEffect(() => {
    let count = 0;
    count = autoCompletesArray.length + dateTimesArray.length + conditionsArray.length + textComponentsArray.length;
    setFilterCount(count);
  }, [autoCompletesArray, dateTimesArray, conditionsArray, textComponentsArray]);

  const showDrawer = () => {
    setApplyFilter(true);
  };

  const closeDrawer = () => {
    setApplyFilter(false);
  };

  const applyFilter = () => {
    let applyFilter = {
      applyFilterArray: []
    };
    let tempObj = {
      applyFilter: []
    };

    if (autoCompletesValueArray.length > 0) {
      autoCompletesValueArray.forEach(item => {
        tempObj.applyFilter.push(item);
      });
      applyFilter.applyFilterArray.push({
        autoComplete: autoCompletesValueArray
      });
    }

    if (dateTimesValueArray.length > 0) {
      dateTimesValueArray.forEach(item => {
        tempObj.applyFilter.push(item);
      });
      applyFilter.applyFilterArray.push({
        dateTime: dateTimesValueArray
      });
    }

    if (conditionsValueArray.length > 0) {
      conditionsValueArray.forEach(item => {
        tempObj.applyFilter.push(item);
      });
      applyFilter.applyFilterArray.push({
        conditional: conditionsValueArray
      });
    }

    if (textComponentsValueArray.length > 0) {
      textComponentsValueArray.forEach(item => {
        tempObj.applyFilter.push(item);
      });
      applyFilter.applyFilterArray.push({
        textComponent: textComponentsValueArray
      });
    }

    console.log(applyFilter);
    setApplyFilterChip(tempObj);
    tempObj = {};
  };

  const saveFilter = value => {
    let savedFilter = {
      filter: []
    };

    if (autoCompletesValueArray.length > 0) {
      savedFilter.filter.push({
        autoComplete: autoCompletesValueArray
      });
    }

    if (dateTimesValueArray.length > 0) {
      savedFilter.filter.push({
        dateTime: dateTimesValueArray
      });
    }

    if (conditionsValueArray.length > 0) {
      savedFilter.filter.push({
        conditional: conditionsValueArray
      });
    }

    if (textComponentsValueArray.length > 0) {
      savedFilter.filter.push({
        textComponent: textComponentsValueArray
      });
    }

    savedFilter[value] = savedFilter["filter"];
    delete savedFilter.filter;
    let savedFilters = localStorage.getItem("savedFilters");
    savedFilters = savedFilters ? JSON.parse(savedFilters) : [];
    savedFilters.push(savedFilter);
    localStorage.setItem("savedFilters", JSON.stringify(savedFilters));
    console.log(savedFilters);
  };

  const fromLeftToRight = (name, dataType, enabled, type, field, condition, options) => {
    if (dataType === "AutoComplete") {
      let value = {
        name: name,
        type: type,
        dataType: dataType,
        enabled: enabled,
        objectArray: options
      };
      let autoCompleteArray = [...autoCompletesArray];

      if (autoCompleteArray.length > 0) {
        let index = autoCompleteArray.findIndex(x => x.name === value.name && x.type === value.type);

        if (index === -1) {
          autoCompleteArray.push({
            name: name,
            type: type,
            dataType: dataType,
            enabled: enabled,
            objectArray: options
          });
        }
      } else {
        autoCompleteArray.push({
          name: name,
          type: type,
          dataType: dataType,
          enabled: enabled,
          objectArray: options
        });
      }

      setAutoCompletesArray(autoCompleteArray);
      autoCompleteArray = [];
    }

    if (dataType === "DateTime") {
      let value = {
        name: name,
        dataType: dataType,
        enabled: enabled,
        field: field
      };
      let dateTimeArray = [...dateTimesArray];

      if (dateTimeArray.length > 0) {
        let index = dateTimeArray.findIndex(x => x.name === value.name && x.field === value.field);

        if (index === -1) {
          dateTimeArray.push({
            name: name,
            dataType: dataType,
            enabled: enabled,
            field: field
          });
        }
      } else {
        dateTimeArray.push({
          name: name,
          dataType: dataType,
          enabled: enabled,
          field: field
        });
      }

      setDateTimesArray(dateTimeArray);
      dateTimeArray = [];
    }

    if (dataType === "Numeric") {
      let value = {
        name: name,
        dataType: dataType,
        enabled: enabled,
        condition: condition,
        amount: ""
      };
      let conditionArray = [...conditionsArray];

      if (conditionArray.length > 0) {
        let index = conditionArray.findIndex(x => x.name === value.name && x.condition === value.condition);

        if (index === -1) {
          conditionArray.push({
            name: name,
            dataType: dataType,
            enabled: enabled,
            condition: condition,
            amount: ""
          });
        }
      } else {
        conditionArray.push({
          name: name,
          dataType: dataType,
          enabled: enabled,
          condition: condition,
          amount: ""
        });
      }

      setConditionsArray(conditionArray);
      conditionArray = [];
    }

    if (dataType === "Text") {
      let value = {
        name: name,
        dataType: dataType,
        enabled: enabled
      };
      let textComponentArray = [...textComponentsArray];

      if (textComponentArray.length > 0) {
        let index = textComponentArray.findIndex(x => x.name === value.name && x.dataType === value.dataType);

        if (index === -1) {
          textComponentArray.push({
            name: name,
            dataType: dataType,
            enabled: enabled
          });
        }
      } else {
        textComponentArray.push({
          name: name,
          dataType: dataType,
          enabled: enabled
        });
      }

      setTextComponentsArray(textComponentArray);
      textComponentArray = [];
    }
  };

  const createAutoCompleteArray = (item, valueArray) => {
    let tempObj = JSON.parse(JSON.stringify(item));
    tempObj.value = valueArray;
    let autoCompleteValueArray = [...autoCompletesValueArray];

    if (autoCompleteValueArray.length > 0) {
      let index = autoCompleteValueArray.findIndex(x => x.name === tempObj.name && x.type === tempObj.type);

      if (index === -1) {
        autoCompleteValueArray.push({
          name: tempObj.name,
          type: tempObj.type,
          dataType: tempObj.dataType,
          enabled: tempObj.enabled,
          value: tempObj.value
        });
      } else {
        autoCompleteValueArray[index].value = tempObj.value;
      }
    } else {
      autoCompleteValueArray.push({
        name: tempObj.name,
        type: tempObj.type,
        dataType: tempObj.dataType,
        enabled: tempObj.enabled,
        value: tempObj.value
      });
    }

    setAutoCompletesValueArray(autoCompleteValueArray);
    autoCompleteValueArray = [];
  };

  const deleteAutoCompleteElement = item => {
    let autoCompleteArray = [...autoCompletesArray];
    let index = autoCompleteArray.findIndex(x => x.name === item.name && x.type === item.type);

    if (index !== -1) {
      autoCompleteArray.splice(index, 1);
    } else {
      autoCompleteArray = [];
    }

    setAutoCompletesArray(autoCompleteArray);
  };

  const handleAutoCompleteEnabled = item => {
    let autoCompleteArray = [...autoCompletesArray];
    let index = autoCompleteArray.findIndex(x => x.name === item.name && x.type === item.type);

    if (index !== -1) {
      autoCompleteArray[index].enabled = !autoCompleteArray[index].enabled;
    }

    setAutoCompletesArray(autoCompleteArray);

    if (autoCompletesValueArray.length > 0) {
      let autoCompleteValueArray = [...autoCompletesValueArray];

      let _index = autoCompleteValueArray.findIndex(x => x.name === item.name && x.type === item.type);

      autoCompleteValueArray[_index].enabled = !autoCompleteValueArray[_index].enabled;
      setAutoCompletesValueArray(autoCompleteValueArray);
      autoCompleteValueArray = [];
    }
  };

  const deleteDateTimeElement = item => {
    let dateTimeArray = [...dateTimesArray];
    let index = dateTimeArray.findIndex(x => x.name === item.name);
    dateTimeArray.splice(index, 1);
    dateTimeArray.forEach(item => {
      item.field.forEach(fieldArray => {
        fieldArray.value = "";
      });
    });
    setDateTimesArray(dateTimeArray);
    dateTimeArray = [];
    filterData.filter.forEach(filters => {
      if (filters.name === item.name) {
        item.field.forEach(fieldArray => {
          fieldArray.value = "";
        });
      }
    });

    if (item === {}) {
      setDateTimesValueArray([]);
    }
  };

  const handleDateTimeEnabled = item => {
    let dateTimeArray = [...dateTimesArray];
    let index = dateTimeArray.findIndex(x => x.name === item.name && x.field === item.field);

    if (index !== -1) {
      dateTimeArray[index].enabled = !dateTimeArray[index].enabled;
    }

    setDateTimesArray(dateTimeArray);
    dateTimeArray = [];

    if (dateTimesValueArray.length > 0) {
      let dateTimeValueArray = [...dateTimesValueArray];
      let tempArray = [];
      item.field.forEach(item => {
        tempArray.push(item.column);
      });

      let _index2 = dateTimeValueArray.findIndex(x => x.name === item.name && tempArray.includes(x.fieldValue));

      if (_index2 !== -1) {
        dateTimeValueArray.forEach(item => {
          item.enabled = !item.enabled;
        });
      }

      setDateTimesValueArray(dateTimeValueArray);
      dateTimeValueArray = [];
    }
  };

  const createDateTimeArray = (item, fieldName, value) => {
    let tempObj = JSON.parse(JSON.stringify(item));
    tempObj.fieldValue = fieldName;
    tempObj.value = value;
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeValueArray.length > 0) {
      let index = dateTimeValueArray.findIndex(x => x.fieldValue === tempObj.fieldValue && x.name === tempObj.name);

      if (index === -1) {
        dateTimeValueArray.push({
          name: tempObj.name,
          dataType: tempObj.dataType,
          enabled: tempObj.enabled,
          fieldValue: tempObj.fieldValue,
          value: tempObj.value
        });
      } else {
        dateTimeValueArray[index].value = tempObj.value;
      }
    } else {
      dateTimeValueArray.push({
        name: tempObj.name,
        dataType: tempObj.dataType,
        enabled: tempObj.enabled,
        fieldValue: tempObj.fieldValue,
        value: tempObj.value
      });
    }

    setDateTimesValueArray(dateTimeValueArray);
    dateTimeValueArray = [];
    let dateTimeArray = [...dateTimesArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field.forEach(fieldArray => {
          if (fieldArray.column === fieldName) {
            fieldArray.value = value;
          }
        });
      });
      setDateTimesArray(dateTimeArray);
    }

    dateTimeArray = [];
  };

  const addToday = () => {
    let todayDate = new Date();
    let dated = dateFormat(todayDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field.forEach(fieldArray => {
          fieldArray.value = dated;

          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(item => {
              if (item.fieldValue === fieldArray.column) {
                item.value = dated;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: dated
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const addTomorrow = () => {
    let fromDate = new Date();
    let toDate = new Date();
    fromDate.setDate(fromDate.getDate() + 1);
    toDate.setDate(toDate.getDate() + 1);
    fromDate = dateFormat(fromDate, "yyyy-mm-dd");
    toDate = dateFormat(toDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const addThisMonth = () => {
    let today = new Date();
    let fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    fromDate = dateFormat(fromDate, "yyyy-mm-dd");
    toDate = dateFormat(toDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const addForteenDays = () => {
    let fromDate = new Date();
    let toDate = new Date();
    fromDate.setDate(fromDate.getDate() + 1);
    toDate.setDate(toDate.getDate() + 14);
    fromDate = dateFormat(fromDate, "yyyy-mm-dd");
    toDate = dateFormat(toDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const addSevenDays = () => {
    let fromDate = new Date();
    let toDate = new Date();
    fromDate.setDate(fromDate.getDate() + 1);
    toDate.setDate(toDate.getDate() + 7);
    fromDate = dateFormat(fromDate, "yyyy-mm-dd");
    toDate = dateFormat(toDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const addThisWeek = () => {
    let today = new Date();
    let from = today.getDate() - today.getDay();
    let to = from + 6;
    let fromDate = new Date(today.setDate(from)).toUTCString();
    let toDate = new Date(today.setDate(to)).toUTCString();
    fromDate = dateFormat(fromDate, "yyyy-mm-dd");
    toDate = dateFormat(toDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const addThirtyDays = () => {
    let from = new Date();
    let to = new Date();
    from.setDate(from.getDate() + 1);
    to.setDate(to.getDate() + 30);
    let fromDate = dateFormat(from, "yyyy-mm-dd");
    let toDate = dateFormat(to, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const nextDayChange = value => {
    if (value === "") {
      value = 1;
    }

    let fromDate = new Date();
    let toDate = new Date();

    if (value !== "0") {
      fromDate.setDate(fromDate.getDate() + 1);
      toDate.setDate(toDate.getDate() + parseInt(value));
    }

    fromDate = dateFormat(fromDate, "yyyy-mm-dd");
    toDate = dateFormat(toDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const lastDayChange = value => {
    if (value === "") {
      value = 1;
    }

    let fromDate = new Date();
    let toDate = new Date();

    if (value !== "0") {
      fromDate.setDate(fromDate.getDate() - parseInt(value));
      toDate.setDate(toDate.getDate() - 1);
    }

    fromDate = dateFormat(fromDate, "yyyy-mm-dd");
    toDate = dateFormat(toDate, "yyyy-mm-dd");
    let dateTimeArray = [...dateTimesArray];
    let dateTimeValueArray = [...dateTimesValueArray];

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(item => {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(fieldArray => {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(arr => {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  const handleCondionalEnabled = item => {
    let conditionArray = [...conditionsArray];
    let index = conditionArray.findIndex(x => x.name === item.name && x.condition === item.condition);

    if (index !== -1) {
      conditionArray[index].enabled = !conditionArray[index].enabled;
    }

    setConditionsArray(conditionArray);
    let conditionValueArray = [];
    conditionValueArray = [...conditionsValueArray];

    if (conditionValueArray.length > 0) {
      let _index3 = conditionValueArray.findIndex(x => x.name === item.name && x.dataType === item.dataType);

      conditionValueArray[_index3].enabled = !conditionValueArray[_index3].enabled;
    }

    setConditionsValueArray(conditionValueArray);
    conditionValueArray = [];
  };

  const createConditionalArray = (item, value) => {
    let valueArray = [];
    item.condition.forEach(it => {
      valueArray.push(it.value);
    });
    let conditionValueArray = [...conditionsValueArray];

    if (conditionValueArray.length > 0) {
      let index = conditionValueArray.findIndex(x => x.name === item.name && x.dataType === item.dataType);

      if (index !== -1) {
        if (valueArray.includes(value)) {
          conditionValueArray[index].condition = value;
        } else {
          conditionValueArray[index].amount = value;
        }
      }
    } else {
      if (valueArray.includes(value)) {
        conditionValueArray.push({
          name: item.name,
          dataType: item.dataType,
          enabled: item.enabled,
          condition: value
        });
      } else {
        conditionValueArray.push({
          name: item.name,
          dataType: item.dataType,
          enabled: item.enabled,
          condition: item.condition[0].value,
          amount: value
        });
      }
    }

    setConditionsValueArray(conditionValueArray);
    conditionValueArray = [];
  };

  const deleteConditionalElement = item => {
    let conditionArray = [...conditionsArray];
    let index = conditionArray.findIndex(x => x.name === item.name && x.dataType === item.dataType);

    if (index !== -1) {
      conditionArray.splice(index, 1);
    } else {
      conditionArray = [];
    }

    setConditionsArray(conditionArray);
  };

  const createTextComponentsArray = (item, value) => {
    let textComponentValueArray = [...textComponentsValueArray];

    if (textComponentValueArray.length > 0) {
      let index = textComponentValueArray.findIndex(x => x.name === item.name && x.dataType === item.dataType);

      if (index === -1) {
        textComponentValueArray.push({
          name: item.name,
          dataType: item.dataType,
          enabled: item.enabled,
          value: value
        });
      } else {
        textComponentValueArray[index].value = value;
      }
    } else {
      textComponentValueArray.push({
        name: item.name,
        dataType: item.dataType,
        enabled: item.enabled,
        value: value
      });
    }

    setTextComponentsValueArray(textComponentValueArray);
    textComponentValueArray = [];
  };

  const handleTextComponentEnabled = item => {
    let textComponentArray = [...textComponentsArray];
    let index = textComponentArray.findIndex(x => x.name === item.name && x.dataType === item.dataType);

    if (index !== -1) {
      textComponentArray[index].enabled = !textComponentArray[index].enabled;
    }

    setTextComponentsArray(textComponentArray);
    textComponentArray = [];
    let textComponentValueArray = [...textComponentsValueArray];

    if (textComponentValueArray.length > 0) {
      let _index4 = textComponentValueArray.findIndex(x => x.name === item.name && x.dataType === item.dataType);

      if (_index4 !== -1) {
        textComponentValueArray[_index4].enabled = !textComponentValueArray[_index4].enabled;
      }
    }

    setTextComponentsValueArray(textComponentValueArray);
    textComponentValueArray = [];
  };

  const deleteTextComponentElement = item => {
    let textComponentArray = [...textComponentsArray];
    let index = textComponentArray.findIndex(x => x.name === item.name && x.dataType === item.dataType);

    if (index !== -1) {
      textComponentArray.splice(index, 1);
    } else {
      textComponentArray = [];
    }

    setTextComponentsArray(textComponentArray);
  };

  const addAppliedFilters = item => {
    let arr = [];
    filterData.filter.forEach(fil => {
      if (fil.types.length) {
        let index = fil.types.findIndex(x => x.name === item.type && fil.name === item.name);

        if (index !== -1) {
          arr = fil.types[index].options;
        }
      }
    });

    if (item.dataType === "AutoComplete") {
      let autoCompleteArray = [...autoCompletesArray];

      if (autoCompleteArray.length > 0) {
        let index = autoCompleteArray.findIndex(x => x.name === item.name && item.type === x.type);

        if (index === -1) {
          autoCompleteArray.push({
            name: item.name,
            dataType: item.dataType,
            type: item.type,
            enabled: item.enabled,
            value: item.value,
            objectArray: arr
          });
        }
      } else {
        autoCompleteArray.push({
          name: item.name,
          dataType: item.dataType,
          type: item.type,
          enabled: item.enabled,
          value: item.value,
          objectArray: arr
        });
      }

      setAutoCompletesArray(autoCompleteArray);
    } else if (item.dataType === "DateTime") {
      let dateTimeArray = [...dateTimesArray];

      if (dateTimeArray.length === 0) {
        dateTimeArray.push({
          name: item.name,
          dataType: item.dataType,
          enabled: item.enabled,
          field: []
        });
        dateTimesValueArray.forEach(item => {
          if (item.fieldValue) {
            dateTimeArray.forEach(dt => {
              dt.field.push({
                column: item.fieldValue,
                value: item.value
              });
            });
          }
        });
      }

      setDateTimesArray(dateTimeArray);
    } else if (item.dataType === "Numeric") {
      let conditionArray = [...conditionsArray];

      if (conditionArray.length === 0) {
        conditionArray.push({
          name: item.name,
          dataType: item.dataType,
          enabled: item.enabled,
          condition: [],
          amount: item.amount,
          value: item.condition
        });
        filterData.filter.forEach(data => {
          if (data.dataType === "Numeric") {
            data.condition.forEach(values => {
              conditionArray.forEach(item => {
                item.condition.push({
                  value: values.value
                });
              });
            });
          }
        });
      }

      setConditionsArray(conditionArray);
    } else {
      let textComponentArray = [...textComponentsArray];

      if (textComponentArray.length > 0) {
        let index = textComponentArray.findIndex(x => x.name === item.name);

        if (index === -1) {
          textComponentArray.push({
            name: item.name,
            dataType: item.dataType,
            enabled: item.enabled,
            value: item.value
          });
        }
      } else {
        textComponentArray.push({
          name: item.name,
          dataType: item.dataType,
          enabled: item.enabled,
          value: item.value
        });
      }

      setTextComponentsArray(textComponentArray);
    }

    setApplyFilter(true);
  };

  const addSavedFilters = item => {
    let autoComplete = [];
    let condition = [];
    let text = [];
    let tempArr = [];
    let savedFilters = [];

    for (let objects in item) {
      item[objects].forEach(arrays => {
        for (let array in arrays) {
          tempArr.push(arrays[array]);
        }
      });
    }

    let arr = [];
    tempArr.forEach(arrays => {
      arrays.forEach(array => {
        savedFilters.push(array);
      });
    });
    savedFilters.forEach(items => {
      filterData.filter.forEach(fil => {
        if (fil.types.length) {
          let index = fil.types.findIndex(x => x.name === items.type && fil.name === items.name);

          if (index !== -1) {
            arr = fil.types[index].options;
          }
        }
      });

      if (items.dataType === "AutoComplete") {
        let autoCompleteArray = [...autoComplete];

        if (autoCompleteArray.length > 0) {
          let index = autoCompleteArray.findIndex(x => x.name === items.name && items.type === x.type);

          if (index === -1) {
            autoCompleteArray.push({
              name: items.name,
              dataType: items.dataType,
              type: items.type,
              enabled: items.enabled,
              value: items.value,
              objectArray: arr
            });
          }
        } else {
          autoCompleteArray.push({
            name: items.name,
            dataType: items.dataType,
            type: items.type,
            enabled: items.enabled,
            value: items.value,
            objectArray: arr
          });
        }

        autoComplete = autoCompleteArray;
      }
    });
    setAutoCompletesArray(autoComplete);
    let saveTempDateTimeArray = [];
    savedFilters.forEach(items => {
      if (items.dataType === "DateTime") {
        if (saveTempDateTimeArray.length === 0) {
          saveTempDateTimeArray.push({
            name: items.name,
            dataType: items.dataType,
            enabled: items.enabled,
            field: []
          });
        }
      }
    });
    savedFilters.forEach(saved => {
      if (saved.dataType === "DateTime") {
        if (saveTempDateTimeArray.length > 0) {
          saveTempDateTimeArray.forEach(filter => {
            filter.field.push({
              column: saved.fieldValue,
              value: saved.value
            });
          });
        }
      }
    });
    setDateTimesArray(saveTempDateTimeArray);
    savedFilters.forEach(items => {
      if (items.dataType === "Numeric") {
        let conditionArray = [...condition];

        if (conditionArray.length === 0) {
          conditionArray.push({
            name: items.name,
            dataType: items.dataType,
            enabled: items.enabled,
            condition: [],
            amount: items.amount,
            value: items.condition
          });
          filterData.filter.forEach(data => {
            if (data.dataType === "Numeric") {
              data.condition.forEach(values => {
                conditionArray.forEach(items => {
                  items.condition.push({
                    value: values.value
                  });
                });
              });
            }
          });
        }

        condition = conditionArray;
      }
    });
    setConditionsArray(condition);
    savedFilters.forEach(items => {
      if (items.dataType === "Text") {
        let textComponentArray = [...text];

        if (textComponentArray.length > 0) {
          let index = textComponentArray.findIndex(x => x.name === items.name);

          if (index === -1) {
            textComponentArray.push({
              name: items.name,
              dataType: items.dataType,
              enabled: items.enabled,
              value: items.value
            });
          }
        } else {
          textComponentArray.push({
            name: items.name,
            dataType: items.dataType,
            enabled: items.enabled,
            value: items.value
          });
        }

        text = textComponentArray;
      }
    });
    setTextComponentsArray(text);
    setApplyFilter(true);
  };

  const resetDrawer = () => {
    deleteAutoCompleteElement({});
    deleteConditionalElement({});
    deleteDateTimeElement({});
    deleteTextComponentElement({});
    setApplyFilterChip({});
  };

  const {
    ref,
    showApplyFilter,
    setApplyFilter
  } = useComponentVisible();
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, showApplyFilter && /*#__PURE__*/React.createElement("div", {
    className: "filter--grid",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter__wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter__list"
  }, /*#__PURE__*/React.createElement(LeftDrawer, {
    filterData: filterData,
    fromLeftToRight: fromLeftToRight
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter__inputwrap"
  }, /*#__PURE__*/React.createElement(RightDrawer, {
    applyFilter: applyFilter,
    saveFilter: saveFilter,
    createAutoCompleteArray: createAutoCompleteArray,
    handleAutoCompleteEnabled: handleAutoCompleteEnabled,
    deleteAutoCompleteElement: deleteAutoCompleteElement,
    autoCompleteArray: autoCompletesArray,
    dateTimesArray: dateTimesArray,
    deleteDateTimeElement: deleteDateTimeElement,
    handleDateTimeEnabled: handleDateTimeEnabled,
    createDateTimeArray: createDateTimeArray,
    addToday: addToday,
    addTomorrow: addTomorrow,
    addThisMonth: addThisMonth,
    addForteenDays: addForteenDays,
    addSevenDays: addSevenDays,
    addThisWeek: addThisWeek,
    addThirtyDays: addThirtyDays,
    lastDayChange: lastDayChange,
    nextDayChange: nextDayChange,
    conditionsArray: conditionsArray,
    handleCondionalEnabled: handleCondionalEnabled,
    createConditionalArray: createConditionalArray,
    deleteConditionalElement: deleteConditionalElement,
    textComponentsArray: textComponentsArray,
    deleteTextComponentElement: deleteTextComponentElement,
    createTextComponentsArray: createTextComponentsArray,
    handleTextComponentEnabled: handleTextComponentEnabled,
    closeDrawer: closeDrawer,
    resetDrawer: resetDrawer,
    filterCount: filterCount
  })))), /*#__PURE__*/React.createElement(MainFilterPanel, {
    showDrawer: showDrawer,
    applyFilterChip: applyFilterChip,
    addAppliedFilters: addAppliedFilters,
    addSavedFilters: addSavedFilters
  }));
}

export default filter;
//# sourceMappingURL=index.modern.js.map
