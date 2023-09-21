import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useInput, FieldTitle, sanitizeInputRestProps, InputHelperText } from 'react-admin';
import InputAdornment from '@mui/material/InputAdornment';
import Event from '@mui/icons-material/Event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomActionBar from './CustomActionBar';
import { formatDateTime, parseDateTime } from '../utils';

const Picker = props => {
    const {
        className,
        format,
        fullWidth,
        helperText,
        inputSize,
        inputVariant,
        label,
        margin,
        options,
        onOpen,
        onClose,
        parse,
        PickerComponent,
        resource,
        source,
        stringFormat,
        toolbarActions,
        ...rest
    } = props;

    const {
        field,
        fieldState: { error, invalid, isTouched },
        formState: { isSubmitted },
        id,
        isRequired,
    } = useInput({
        format,
        parse,
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
                {...options}
                id={id}
                label={<FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />}
                slots={{
                    actionBar: CustomActionBar,
                }}
                slotProps={{
                    textField: {
                        variant: inputVariant,
                        size: inputSize,
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
    className: PropTypes.string,
    format: PropTypes.func,
    fullWidth: PropTypes.bool,
    inputSize: PropTypes.string,
    inputVariant: PropTypes.string,
    label: PropTypes.string,
    margin: PropTypes.string,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    options: PropTypes.object,
    parse: PropTypes.func,
    PickerComponent: PropTypes.object.isRequired,
    resource: PropTypes.string,
    stringFormat: PropTypes.string,
    source: PropTypes.string.isRequired,
    toolbarActions: PropTypes.arrayOf(PropTypes.string),
};

Picker.defaultProps = {
    className: '',
    format: formatDateTime,
    fullWidth: false,
    inputSize: 'small',
    inputVariant: 'filled',
    label: '',
    margin: 'dense',
    options: {},
    parse: parseDateTime,
    resource: '',
    source: '',
    stringFormat: 'ISO',
    toolbarActions: ['cancel', 'clear', 'today', 'accept'],
};

export default Picker;
