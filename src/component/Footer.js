import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar'

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

function Footer({t}) {
return(
    <Toolbar sx={{background: '#6C757D', height: 156 }}>
        <Stack direction="row">
        <Box sx={{width: 100, height: 156}}></Box>
            <Box sx={{width: 400, height: 156, alignItems: 'center', display: 'flex', alignText: 'center'}}>
                <Typography variant="h5" color="white" fontFamily="Sora">{t('company')}</Typography>
            </Box>
            <Box sx={{width: 100, height: 156}}></Box>
            <Box sx={{width: 400, height: 156, alignItems: 'center', display: 'flex'}}>
                <LanguageIcon fontSize='large' sx={{ color: "white"}}/>
                <Typography variant="h5" color="white" fontFamily="Sora">English</Typography>
            </Box>
            <Box sx={{width: 350, height: 156, alignItems: 'center', display: 'flex'}}>
                <FacebookIcon fontSize='large' sx={{ color: "white" }}/>
                <InstagramIcon fontSize='large' sx={{ color: "white" }}/>
                <TwitterIcon fontSize='large' sx={{ color: "white" }}/>
            </Box>
            <Box sx={{width: 400, height: 156, alignItems: 'center', display: 'flex'}}>
                <Typography variant="h5" color="white" fontFamily="Sora">{t('terms')}</Typography>
            </Box>
        </Stack>
    </Toolbar>
);
};
export default Footer;