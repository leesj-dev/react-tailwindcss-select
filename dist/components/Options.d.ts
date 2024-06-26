import React from "react";
import { Option, Options as ListOption } from "../types";
interface OptionsProps {
    list: ListOption;
    noOptionsMessage: string;
    text: string;
    isMultiple: boolean;
    value: Option | Option[] | null;
}
declare const Options: React.FC<OptionsProps>;
export declare const containsKChar: (list: ListOption) => boolean;
export default Options;
