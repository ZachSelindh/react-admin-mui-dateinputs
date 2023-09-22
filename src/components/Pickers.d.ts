import PropTypes from 'prop-types';
import { CommonInputProps } from 'react-admin';
import type { MobileDatePicker, MobileTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
export type PickerProps = CommonInputProps & {
    className?: string;
    format?: (val: string | Date) => string | Date | number;
    onClose?: (val: string) => void;
    onOpen?: (val: string) => void;
    options?: any;
    parse?: (val: string) => string | Date | number;
    PickerComponent: typeof MobileDatePicker | typeof MobileTimePicker | typeof MobileDateTimePicker;
    size?: string;
    stringFormat?: string;
    toolbarActions?: ('cancel' | 'clear' | 'today' | 'accept')[];
};
declare const Picker: {
    (props: PickerProps): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        onOpen: PropTypes.Requireable<(...args: any[]) => any>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        options: PropTypes.Requireable<object>;
        PickerComponent: PropTypes.Validator<object>;
        stringFormat: PropTypes.Requireable<string>;
        toolbarActions: PropTypes.Requireable<string[]>;
    };
    defaultProps: {
        className: string;
        format: (value: string | Date) => string;
        fullWidth: boolean;
        label: string;
        margin: string;
        options: {};
        parse: (value: string) => Date;
        resource: string;
        size: string;
        source: string;
        stringFormat: string;
        toolbarActions: string[];
        variant: string;
    };
};
export default Picker;
