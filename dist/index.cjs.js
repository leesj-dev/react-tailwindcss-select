'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function useOnClickOutside(ref, handler) {
    React.useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

const CloseIcon = ({ className = "" }) => {
    return (React__default["default"].createElement("svg", { className: className, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" })));
};
const ChevronIcon = ({ className = "" }) => {
    return (React__default["default"].createElement("svg", { className: className, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" })));
};
const SearchIcon = ({ className = "" }) => {
    return (React__default["default"].createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })));
};

const DisabledItem = ({ children }) => {
    return (React__default["default"].createElement("div", { className: "px-2 py-2 cursor-not-allowed truncate text-gray-400 select-none" }, children));
};

const SelectContext = React.createContext({
    value: null,
    handleValueChange: selected => {
        console.log("selected:", selected);
    }
});
const useSelectContext = () => {
    return React.useContext(SelectContext);
};
const SelectProvider = ({ value, handleValueChange, children }) => {
    const store = React.useMemo(() => {
        return {
            value,
            handleValueChange
        };
    }, [handleValueChange, value]);
    return React__default["default"].createElement(SelectContext.Provider, { value: store }, children);
};

const Item = ({ item }) => {
    const { value, handleValueChange } = useSelectContext();
    const isSelected = React.useMemo(() => {
        return value !== null && !Array.isArray(value) && value.value === item.value;
    }, [item.value, value]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null, item.disabled ? (React__default["default"].createElement(DisabledItem, null, item.label)) : (React__default["default"].createElement("li", { tabIndex: 0, onKeyDown: (e) => {
            if (e.key === " " || e.key === "Enter") {
                handleValueChange(item);
            }
        }, "aria-selected": isSelected, role: "option", onClick: () => handleValueChange(item), className: `block transition duration-200 px-2 py-2 cursor-pointer select-none whitespace-nowrap rounded-lg ${isSelected
            ? "text-white bg-blue-500"
            : "text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-white"}` }, item.label))));
};

const GroupItem = ({ item }) => {
    return (React__default["default"].createElement(React__default["default"].Fragment, null, item.options.length > 0 && (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("div", { className: "py-2 cursor-default select-none truncate font-bold text-gray-700 dark:text-gray-300" }, item.label),
        item.options.map((item, index) => (React__default["default"].createElement(Item, { key: index, item: item })))))));
};

const Options = ({ list, noOptionsMessage, text, isMultiple, value }) => {
    const filterByText = React.useCallback(() => {
        const normalizeText = (text) => {
            // 한글 자모 분리 함수
            const chosung = [
                "ㄱ",
                "ㄲ",
                "ㄴ",
                "ㄷ",
                "ㄸ",
                "ㄹ",
                "ㅁ",
                "ㅂ",
                "ㅃ",
                "ㅅ",
                "ㅆ",
                "ㅇ",
                "ㅈ",
                "ㅉ",
                "ㅊ",
                "ㅋ",
                "ㅌ",
                "ㅍ",
                "ㅎ"
            ];
            const jungsung = [
                "ㅏ",
                "ㅐ",
                "ㅑ",
                "ㅒ",
                "ㅓ",
                "ㅔ",
                "ㅕ",
                "ㅖ",
                "ㅗ",
                "ㅘ",
                "ㅙ",
                "ㅚ",
                "ㅛ",
                "ㅜ",
                "ㅝ",
                "ㅞ",
                "ㅟ",
                "ㅠ",
                "ㅡ",
                "ㅢ",
                "ㅣ"
            ];
            const jongsung = [
                "",
                "ㄱ",
                "ㄲ",
                "ㄳ",
                "ㄴ",
                "ㄵ",
                "ㄶ",
                "ㄷ",
                "ㄹ",
                "ㄺ",
                "ㄻ",
                "ㄼ",
                "ㄽ",
                "ㄾ",
                "ㄿ",
                "ㅀ",
                "ㅁ",
                "ㅂ",
                "ㅄ",
                "ㅅ",
                "ㅆ",
                "ㅇ",
                "ㅈ",
                "ㅊ",
                "ㅋ",
                "ㅌ",
                "ㅍ",
                "ㅎ"
            ];
            return text
                .split("")
                .map(char => {
                const code = char.charCodeAt(0) - 44032;
                if (code >= 0 && code <= 11171) {
                    const chosungIndex = Math.floor(code / 588);
                    const jungsungIndex = Math.floor((code - chosungIndex * 588) / 28);
                    const jongsungIndex = code % 28;
                    return (chosung[chosungIndex] +
                        jungsung[jungsungIndex] +
                        jongsung[jongsungIndex]);
                }
                return char;
            })
                .join("");
        };
        const normalizedText = normalizeText(text.toLowerCase());
        const filterItem = (item) => {
            const normalizedLabel = normalizeText(item.label.toLowerCase());
            return normalizedLabel.startsWith(normalizedText);
        };
        let result = list.map(item => {
            if ("options" in item) {
                return {
                    label: item.label,
                    options: item.options.filter(filterItem)
                };
            }
            return item;
        });
        result = result.filter(item => {
            if ("options" in item) {
                return item.options.length > 0;
            }
            return filterItem(item);
        });
        // 검색 결과를 정렬하여 '동'으로 시작하는 항목을 우선적으로 표시
        result = result.sort((a, b) => {
            const aLabel = "options" in a ? a.options[0].label : a.label;
            const bLabel = "options" in b ? b.options[0].label : b.label;
            const aStartsWith = normalizeText(aLabel.toLocaleLowerCase()).startsWith(normalizedText);
            const bStartsWith = normalizeText(bLabel.toLocaleLowerCase()).startsWith(normalizedText);
            if (aStartsWith && !bStartsWith)
                return -1;
            if (!aStartsWith && bStartsWith)
                return 1;
            return 0;
        });
        return result;
    }, [text, list]);
    const removeValues = React.useCallback((array) => {
        if (!isMultiple) {
            return array;
        }
        if (Array.isArray(value)) {
            const valueId = value.map(item => item.value);
            const filterItem = (item) => !valueId.includes(item.value);
            let newArray = array.map(item => {
                if ("options" in item) {
                    return {
                        label: item.label,
                        options: item.options.filter(filterItem)
                    };
                }
                return item;
            });
            newArray = newArray.filter(item => {
                if ("options" in item) {
                    return item.options.length > 0;
                }
                else {
                    return filterItem(item);
                }
            });
            return newArray;
        }
        return array;
    }, [isMultiple, value]);
    const filterResult = React.useMemo(() => {
        return removeValues(filterByText());
    }, [filterByText, removeValues]);
    return (React__default["default"].createElement("div", { role: "options", className: "max-h-80 overflow-y-auto no-scrollbar" },
        filterResult.map((item, index) => (React__default["default"].createElement(React__default["default"].Fragment, { key: index }, "options" in item ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement("div", { className: "px-2.5 py-0.5" },
                React__default["default"].createElement(GroupItem, { item: item })),
            index + 1 < filterResult.length && React__default["default"].createElement("hr", { className: "my-1" }))) : (React__default["default"].createElement("div", { className: "px-2.5 py-0.5" },
            React__default["default"].createElement(Item, { item: item })))))),
        filterResult.length === 0 && React__default["default"].createElement(DisabledItem, null, noOptionsMessage)));
};
const containsKChar = (list) => {
    return list.some(item => {
        if ("options" in item) {
            return item.options.some(subItem => subItem.label.includes("K"));
        }
        return item.label.includes("K");
    });
};

const SearchInput = React.forwardRef(function SearchInput({ placeholder = "", value = "", onChange, name = "", searchType = "text" }, ref) {
    return (React__default["default"].createElement("div", { className: "relative py-1 px-2.5" },
        React__default["default"].createElement(SearchIcon, { className: "absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500" }),
        React__default["default"].createElement("input", { ref: ref, className: "w-full py-2 pl-8 text-sm text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-gray-200 dark:focus:border-gray-500 focus:ring-0 focus:outline-none", type: "text", inputMode: searchType, placeholder: placeholder, value: value, onChange: onChange, name: name })));
});

const Select = ({ options = [], value = null, onChange, onSearchInputChange, placeholder = "선택...", searchInputPlaceholder = "검색", isMultiple = false, isClearable = false, isSearchable = false, searchType = "text", isDisabled = false, menuIsOpen = false, noOptionsMessage = "검색결과가 없습니다" }) => {
    const [open, setOpen] = React.useState(menuIsOpen);
    const [list, setList] = React.useState(options);
    const [inputValue, setInputValue] = React.useState("");
    const [isKDefault, setIsKDefault] = React.useState(false);
    const ref = React.useRef(null);
    const searchBoxRef = React.useRef(null);
    React.useEffect(() => {
        const containsK = containsKChar(list);
        if (containsK) {
            setInputValue("K");
            setIsKDefault(true);
        }
        else {
            setInputValue("");
            setIsKDefault(false);
        }
    }, [list]);
    React.useEffect(() => {
        const formatItem = (item) => {
            if ("disabled" in item)
                return item;
            return {
                ...item,
                disabled: false
            };
        };
        setList(options.map(item => {
            if ("options" in item) {
                return {
                    label: item.label,
                    options: item.options.map(formatItem)
                };
            }
            else {
                return formatItem(item);
            }
        }));
    }, [options]);
    React.useEffect(() => {
        if (isSearchable) {
            if (open) {
                searchBoxRef.current?.select();
            }
            else {
                setInputValue("");
            }
        }
    }, [open, isSearchable]);
    const toggle = React.useCallback(() => {
        if (!isDisabled) {
            setOpen(!open);
        }
    }, [isDisabled, open]);
    const closeDropDown = React.useCallback(() => {
        if (open)
            setOpen(false);
    }, [open]);
    useOnClickOutside(ref, () => {
        closeDropDown();
    });
    const onPressEnterOrSpace = React.useCallback((e) => {
        e.preventDefault();
        if ((e.code === "Enter" || e.code === "Space") && !isDisabled) {
            toggle();
        }
    }, [isDisabled, toggle]);
    const handleValueChange = React.useCallback((selected) => {
        function update() {
            if (!isMultiple && !Array.isArray(value)) {
                closeDropDown();
                onChange(selected);
            }
            if (isMultiple && (Array.isArray(value) || value === null)) {
                onChange(value === null ? [selected] : [...value, selected]);
            }
        }
        if (selected !== value) {
            update();
        }
    }, [closeDropDown, isMultiple, onChange, value]);
    const clearValue = React.useCallback((e) => {
        e.stopPropagation();
        onChange(null);
    }, [onChange]);
    const removeItem = React.useCallback((e, item) => {
        if (isMultiple && Array.isArray(value) && value.length) {
            e.stopPropagation();
            const result = value.filter(current => item.value !== current.value);
            onChange(result.length ? result : null);
        }
    }, [isMultiple, onChange, value]);
    const divRef = React.useRef(null);
    // 열고 닫을 때 자연스러운 전환
    const [shouldRender, setShouldRender] = React.useState(false);
    const [fade, setFade] = React.useState(false);
    React.useEffect(() => {
        if (open && !isDisabled) {
            setShouldRender(true);
            setTimeout(() => setFade(true), 10); // Small delay to ensure the element is rendered before fade in starts
        }
        else {
            setFade(false);
            setTimeout(() => setShouldRender(false), 300); // Match with the Tailwind transition duration
        }
    }, [open, isDisabled]);
    return (React__default["default"].createElement(SelectProvider, { value: value, handleValueChange: handleValueChange },
        React__default["default"].createElement("div", { className: "relative w-full", ref: ref },
            React__default["default"].createElement("div", { "aria-expanded": open, onKeyDown: onPressEnterOrSpace, onClick: toggle, tabIndex: 0, ref: divRef, className: `flex text-base text-gray-500 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-300 focus:outline-none ${isDisabled
                    ? "bg-gray-200 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-700 hover:border-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-500/20 dark:focus:ring-blue-400/20"}` },
                React__default["default"].createElement("div", { className: "absolute inset-0 left-0 right-0 justify-center items-center px-[1.35rem] flex flex-wrap gap-1" }, !isMultiple ? (React__default["default"].createElement("p", { className: "truncate cursor-default select-none" }, value && !Array.isArray(value) ? value.label : placeholder)) : (React__default["default"].createElement(React__default["default"].Fragment, null,
                    value === null && placeholder,
                    Array.isArray(value) &&
                        value.map((item, index) => (React__default["default"].createElement("div", { className: `bg-gray-200 border rounded-lg flex space-x-1 ${isDisabled ? "border-gray-500 px-1" : "pl-1"}`, key: index },
                            React__default["default"].createElement("p", { className: "text-gray-600 truncate cursor-default select-none" }, item.label),
                            !isDisabled && (React__default["default"].createElement("div", { role: "button", tabIndex: 0, onClick: e => removeItem(e, item), className: "flex items-center px-1 cursor-pointer rounded-lg hover:bg-red-200 hover:text-red-600" },
                                React__default["default"].createElement(CloseIcon, { className: "w-3 h-3 mt-0.5" }))))))))),
                React__default["default"].createElement("div", { className: "flex flex-none items-center ml-auto py-1.5" },
                    isClearable && !isDisabled && value !== null && (React__default["default"].createElement("div", { className: "px-1.5 cursor-pointer", onClick: clearValue },
                        React__default["default"].createElement(CloseIcon, { className: "w-5 h-5 p-0.5" }))),
                    React__default["default"].createElement("div", { className: "pr-1.5" },
                        React__default["default"].createElement(ChevronIcon, { className: `transition duration-300 w-6 h-6 p-0.5${open ? "transform rotate-90 text-gray-500" : "text-gray-300"}` })))),
            shouldRender && (React__default["default"].createElement("div", { className: `absolute z-10 w-full bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-600 rounded-lg py-1.5 mt-1.5 text-sm text-gray-700 dark:text-gray-300
                            transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}` },
                isSearchable && (React__default["default"].createElement(SearchInput, { ref: searchBoxRef, value: inputValue, searchType: searchType, placeholder: searchInputPlaceholder, onChange: e => {
                        if (onSearchInputChange &&
                            typeof onSearchInputChange === "function")
                            onSearchInputChange(e);
                        let newValue = e.target.value;
                        if (isKDefault && !newValue.startsWith("K")) {
                            newValue = "K" + newValue.replace(/^K/, ""); // Ensure K is not removed
                        }
                        setInputValue(newValue);
                    } })),
                React__default["default"].createElement(Options, { list: list, noOptionsMessage: noOptionsMessage, text: inputValue, isMultiple: isMultiple, value: value }))))));
};

module.exports = Select;
//# sourceMappingURL=index.cjs.js.map
