import {
    Container,
    Box,
    Typography,
    Input,
    Select,
    MenuItem,
    FormControl
  } from "@material-ui/core";
  import * as React from 'react';
import Button from "@mui/material/Button";
import VerticalBar from '../component/VerticalBar';
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { makeStyles } from '@mui/styles';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const useStyles = makeStyles({
    select: {
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  });

function AddTask({t}) {
    const [value, setValue] = React.useState(null);
    const classes = useStyles();
    return (
        <Container maxWidth="x1">
            <VerticalBar t={t}/>
            <Box sx={{ width: '75%', height: 750, alignItems: 'center', float: 'left', marginTop: 20, marginLeft: 50}}>
                <Link to='/project/Project A'>
                    <ArrowBackIcon sx={{width: 40, height: 40, marginLeft: '-2%', color: 'black'}}/>
                </Link>
            
                <Box sx={{ width: '80%', height: 80, alignItems: 'center', marginLeft: '2%'}}>
                <Typography variant="h3" fontFamily="Sora">{t('addtask')}</Typography>
            </Box>
            <Box sx={{ width: '117%', marginLeft: '-3.75%', height: 2, borderBottom: '2px solid black'}}></Box>
            <Box sx={{margin: 20}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('taskName')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" placeholder={t('taskNameInput')} disableUnderline='true' sx={{ align: 'center' }} style={{paddingLeft: '5%', width: '95%'}}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('dueDate')}:</Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker value={value} onChange={(newValue) => { setValue(newValue); }} renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ width: '15%', height: 60, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input ref={inputRef} {...inputProps} disableUnderline='true' style={{paddingLeft: '10%', width: '70%'}}/>
                {InputProps?.endAdornment}
            </Box>
            )} />
            </LocalizationProvider>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('project')}:</Typography>
            </Box>
            <Box sx={{background: '#4786C6', borderRadius: 30, width: '20%',height: 60, alignItems: 'center', float: 'left', margin: 10, display: 'flex'}}>
            <FormControl style={{marginLeft: '5%', width: '90%', background: '#4786C6', borderRadius: 30, disableUnderline: 'true'}}>
            <Select disableUnderline={true} defaultValue={1} style={{color: 'white'}} className={classes.select} inputProps={{
                classes: {
                    icon: classes.icon,
                    root: classes.root,
                },
            }}>
                <MenuItem value={1}>Project A</MenuItem>
                <MenuItem value={2}>Project B</MenuItem>
                <MenuItem value={3}>Project C</MenuItem>
            </Select>
            </FormControl>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('description')}:</Typography>
            </Box>
            <Box sx={{ width: '40%', height: 120, alignItems: 'center', float: 'left', background: '#ABB5BE', borderRadius: '30px', margin: 10, display: 'flex' }}>
                <Input name="name" type="name" multiline placeholder={t('descriptionInput')} disableUnderline='true' sx={{ align: 'center'}} style={{paddingLeft: '5%', width: '95%'}} rows={4}></Input>
            </Box>
            <Box sx={{clear: 'both', height: 10}}></Box>
            <Box sx={{ width: '17%', height: 80, alignItems: 'center', display: 'flex', float: 'left'}}>
                <Typography variant="h5" fontFamily="Sora" style={{fontWeight: 600, textAlign: 'right', width: '80%'}}>{t('assigned')}:</Typography>
            </Box>
            <Button variant="contained" size="large" sx={{ width: 300, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none'}}>
                <AddCircleOutlineIcon sx={{width: 32, height: 32, marginRight: 2}}/>
                <Typography style={{ fontSize: 24, alignSelf: 'center'}}>
                {t('assignedAdd')}
                </Typography>
            </Button>
            <Box sx={{clear: 'both', height: 20}}></Box>
            <Button variant="contained" size="large" sx={{ width: 250, height: 65, alignSelf: 'center', borderRadius: 30, textTransform: 'none', float: 'right'}}>
                <Typography style={{ fontSize: 24, alignSelf: 'center', fontWeight: 'bold' }}>
                {t('submit')}
                </Typography>
            </Button>
            <Box sx={{margin: 30}}>
            </Box>
            </Box>  
            <Box sx={{clear:'both'}}></Box>
        </Container>
    );
  }
  export default AddTask;