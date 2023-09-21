import PropTypes from 'prop-types';
declare const Picker: {
    (props: any): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        className: PropTypes.Requireable<string>;
        format: PropTypes.Requireable<(...args: any[]) => any>;
        fullWidth: PropTypes.Requireable<boolean>;
        inputSize: PropTypes.Requireable<string>;
        inputVariant: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string>;
        margin: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onOpen: PropTypes.Requireable<(...args: any[]) => any>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        options: PropTypes.Requireable<object>;
        parse: PropTypes.Requireable<(...args: any[]) => any>;
        PickerComponent: PropTypes.Validator<object>;
        resource: PropTypes.Requireable<string>;
        stringFormat: PropTypes.Requireable<string>;
        source: PropTypes.Validator<string>;
        toolbarActions: PropTypes.Requireable<string[]>;
    };
    defaultProps: {
        className: string;
        format: (value: string | Date) => string;
        fullWidth: boolean;
        inputSize: string;
        inputVariant: string;
        label: string;
        margin: string;
        options: {};
        parse: (value: string) => Date;
        resource: string;
        source: string;
        stringFormat: string;
        toolbarActions: string[];
    };
};
export default Picker;
