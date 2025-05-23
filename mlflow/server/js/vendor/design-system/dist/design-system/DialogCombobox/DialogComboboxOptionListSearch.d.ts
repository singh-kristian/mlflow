import React from 'react';
import type { InputProps } from '../Input';
export interface DialogComboboxOptionListSearchProps extends Omit<InputProps, 'componentId' | 'analyticsEvents'> {
    children: any;
    hasWrapper?: boolean;
    virtualized?: boolean;
    onSearch?: (value: string) => void;
    /** Set controlledValue and setControlledValue if search input is controlled, e.g. for custom filtering logic */
    controlledValue?: string;
    setControlledValue?: (value: string) => void;
    /** Optional controls component to be rendered on the right side of the search input */
    rightSearchControls?: React.ReactNode;
}
export declare const DialogComboboxOptionListSearch: React.ForwardRefExoticComponent<DialogComboboxOptionListSearchProps & React.RefAttributes<import("antd").Input>>;
//# sourceMappingURL=DialogComboboxOptionListSearch.d.ts.map