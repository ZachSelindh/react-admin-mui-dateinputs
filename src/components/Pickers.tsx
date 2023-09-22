import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useInput, FieldTitle, sanitizeInputRestProps, InputHelperText, CommonInputProps } from 'react-admin';
import InputAdornment from '@mui/material/InputAdornment';
import Event from '@mui/icons-material/Event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { MobileDatePicker, MobileTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import CustomActionBar from './CustomActionBar';
import { formatDateTime, parseDateTime } from '../utils';

export type PickerProps = CommonInputProps & {
    className?: string;
    format?: (val: string | Date) => string | Date | number;
    onClose?: (val: string) => void;
    onOpen?: (val: string) => void;
    parse?: (val: string) => string | Date | number;
    pickerOptions?: { [x: string]: any };
    PickerComponent: typeof MobileDatePicker | typeof MobileTimePicker | typeof MobileDateTimePicker;
    size?: string;
    stringFormat?: string;
    toolbarActions?: ('cancel' | 'clear' | 'today' | 'accept')[];
};

const Picker = (props: PickerProps) => {
    const {
        className,
        fullWidth,
        helperText,
        label,
        margin,
        pickerOptions,
        onClose,
        onOpen,
        PickerComponent,
        resource,
        size,
        source,
        stringFormat,
        toolbarActions,
        variant,
        ...rest
    } = props;

    const {
        field,
        fieldState: { error, invalid, isTouched },
        formState: { isSubmitted },
        id,
        isRequired,
    } = useInput({
        resource,
        source,
        ...rest,
    });

    const [fragileValue, setFragileValue] = React.useState(field.value ? new Date(field.value) : null);

    const handleChange = React.useCallback(
        value =>
            Date.parse(value)
                ? field.onChange('ISO' === stringFormat ? value.toISOString() : value.toString())
                : field.onChange(null),
        [field, stringFormat]
    );

    const hasError = (isTouched || isSubmitted) && invalid;

    const renderHelperText = false !== helperText || ((isTouched || isSubmitted) && invalid);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <PickerComponent
                {...sanitizeInputRestProps(rest)}
                {...field}
                {...pickerOptions}
                id={id}
                label={<FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />}
                slots={{
                    actionBar: CustomActionBar,
                }}
                slotProps={{
                    textField: {
                        variant,
                        size,
                        margin,
                        fullWidth,
                        onBlur: field.onBlur,
                        error: hasError,
                        helperText: renderHelperText ? (
                            <InputHelperText
                                touched={isTouched || isSubmitted}
                                error={error?.message}
                                helperText={helperText}
                            />
                        ) : null,
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Event />
                                </InputAdornment>
                            ),
                        },
                    },
                    actionBar: {
                        actions: toolbarActions,
                        handleChange,
                        setFragileValue,
                    },
                }}
                className={clsx('ra-input', `ra-input-${source}`, className)}
                value={field.value ? new Date(field.value) : null}
                onChange={(value, context) => setFragileValue(value)}
                onOpen={value => (onOpen && 'function' === typeof onOpen ? onOpen(value) : null)}
                onClose={value => (onClose && 'function' === typeof onClose ? onClose(value) : null)}
                onAccept={value => handleChange(fragileValue)}
            />
        </LocalizationProvider>
    );
};

Picker.propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    pickerOptions: PropTypes.object,
    PickerComponent: PropTypes.object.isRequired,
    stringFormat: PropTypes.string,
    toolbarActions: PropTypes.arrayOf(PropTypes.string),
};

Picker.defaultProps = {
    className: '',
    format: formatDateTime,
    fullWidth: false,
    label: '',
    margin: 'dense',
    pickerOptions: {},
    parse: parseDateTime,
    resource: '',
    size: 'small',
    source: '',
    stringFormat: 'ISO',
    toolbarActions: ['cancel', 'clear', 'today', 'accept'],
    variant: 'filled',
};

export default Picker;
