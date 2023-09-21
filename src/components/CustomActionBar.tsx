import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import { useLocaleText } from '@mui/x-date-pickers/internals';

interface CustomPickersActionBarProps extends PickersActionBarProps {
    handleChange: (value: any) => void;
    setFragileValue: React.Dispatch<React.SetStateAction<Date>>;
}

const CustomActionBar = (props: CustomPickersActionBarProps) => {
    const { onAccept, onClear, onCancel, actions, handleChange, setFragileValue } = props;
    const localeText = useLocaleText();

    if (null == actions || 0 === actions.length) {
        return null;
    }

    const actionButtons = actions?.map(actionType => {
        switch (actionType) {
            case 'clear':
                return (
                    <Button
                        data-mui-test="clear-action-button"
                        onClick={() => {
                            onClear();
                        }}
                        key={actionType}
                    >
                        {localeText.clearButtonLabel}
                    </Button>
                );
            case 'cancel':
                return (
                    <Button
                        onClick={() => {
                            onCancel();
                        }}
                        key={actionType}
                    >
                        {localeText.cancelButtonLabel}
                    </Button>
                );
            case 'accept':
                return (
                    <Button
                        onClick={() => {
                            onAccept();
                        }}
                        key={actionType}
                    >
                        {localeText.okButtonLabel}
                    </Button>
                );
            case 'today':
                return (
                    <Button
                        data-mui-test="today-action-button"
                        onClick={() => {
                            const now = new Date();
                            handleChange(now);
                            setFragileValue(now);
                            onAccept();
                        }}
                        key={actionType}
                    >
                        {localeText.todayButtonLabel}
                    </Button>
                );
            default:
                return null;
        }
    });

    return <DialogActions {...props}>{actionButtons}</DialogActions>;
};

export default CustomActionBar;
