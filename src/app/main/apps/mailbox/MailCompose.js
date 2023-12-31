import * as yup from 'yup';
import _ from '../../../../@lodash';
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";
import classNames from "classnames";
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import MailAttachment from "./MailAttachment";
import WYSIWYGEditor from "../../../shared-components/WYSIWYGEditor";



/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    to: yup.string().required('You must enter an e-mail').email('You must enter a valid e-mail.'),
});

function MailCompose(props) {
    const { className } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const { handleSubmit, formState, control } = useForm({
        mode: 'onChange',
        defaultValues: {
            from: 'johndoe@creapond.com',
            to: '',
            cc: '',
            bcc: '',
            subject: '',
            message: '',
        },
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const { t } = useTranslation('mailboxApp');

    function handleOpenDialog() {
        setOpenDialog(true);
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleDiscard() {
        setOpenDialog(false);
    }

    function onSubmit(data) {
        console.info(data);
        setOpenDialog(false);
    }

    return (
        <div className={classNames('', className)}>
            <Button
                variant="contained"
                color="secondary"
                className="w-full"
                onClick={handleOpenDialog}
                startIcon={<EnvelopeSvgIcon>heroicons-outline:plus</EnvelopeSvgIcon>}
            >
                {t('COMPOSE')}
            </Button>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-title"
                scroll="body"
            >
                <AppBar position="static" color="secondary" elevation={0}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            New Message
                        </Typography>
                    </Toolbar>
                </AppBar>

                <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <DialogContent classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0' }}>
                        <Controller
                            name="from"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="From"
                                    id="from"
                                    variant="outlined"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                />
                            )}
                        />

                        <Controller
                            name="to"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="To"
                                    autoFocus
                                    id="to"
                                    error={!!errors.to}
                                    helperText={errors?.to?.message}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            )}
                        />

                        <Controller
                            name="cc"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Cc"
                                    id="cc"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="bcc"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Bcc"
                                    id="bcc"
                                    name="bcc"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="subject"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Subject"
                                    id="subject"
                                    name="subject"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            className="mt-8 mb-16"
                            render={({ field }) => <WYSIWYGEditor {...field} />}
                            name="message"
                            control={control}
                        />

                        <div className="pt-8">
                            <MailAttachment fileName="attachment-2.doc" size="12 kb" />
                            <MailAttachment fileName="attachment-1.jpg" size="350 kb" />
                        </div>
                    </DialogContent>

                    <DialogActions className="flex flex-col sm:flex-row sm:items-center justify-between py-16 sm:py-24 px-24">
                        <div className="-mx-8">
                            <IconButton>
                                <EnvelopeSvgIcon size={20}>heroicons-solid:paper-clip</EnvelopeSvgIcon>
                            </IconButton>

                            <IconButton>
                                <EnvelopeSvgIcon size={20}>heroicons-solid:link</EnvelopeSvgIcon>
                            </IconButton>

                            <IconButton>
                                <EnvelopeSvgIcon size={20}>heroicons-solid:emoji-happy</EnvelopeSvgIcon>
                            </IconButton>

                            <IconButton>
                                <EnvelopeSvgIcon size={20}>heroicons-solid:photograph</EnvelopeSvgIcon>
                            </IconButton>
                        </div>

                        <div className="flex items-center space-x-8 mt-16 sm:mt-0">
                            <Button className="" variant="outlined" color="secondary" onClick={handleDiscard}>
                                Discard
                            </Button>
                            <Button className="" variant="outlined" color="secondary">
                                Save as draft
                            </Button>

                            <Button
                                className=""
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                            >
                                Send
                            </Button>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default MailCompose;