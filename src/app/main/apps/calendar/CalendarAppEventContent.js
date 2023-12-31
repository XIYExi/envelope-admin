import {useTheme, Typography} from "@mui/material";
import {selectLabels} from "./store/labelsSlice";
import {useSelector} from "react-redux";
import _ from '../../../../@lodash'
import {Box} from '@mui/system';
import classNames from "classnames";

function CalendarAppEventContent(props) {
    const {eventInfo} = props;
    const theme = useTheme();
    const labels = useSelector(selectLabels);

    const labelId = eventInfo.event.extendedProps.label;
    const label = _.find(labels, {id: labelId});

    return(
        <Box
            sx={{
                backgroundColor: label?.color,
                color: label && theme.palette.getContrastText(label?.color),
            }}
            className={classNames('flex items-center w-full rounded-4 px-8 py-2 h-22 text-white')}
        >
            <Typography className="text-12 font-semibold">{eventInfo.timeText}</Typography>
            <Typography className="text-12 px-4 truncate">{eventInfo.event.title}</Typography>
        </Box>
    )
}

export default CalendarAppEventContent;