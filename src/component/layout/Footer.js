import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar'

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import Container from "@mui/material/Container";

function Footer({t}) {
    return (

<footer>
        <Toolbar
            sx={{background: '#6C757D', height: 156,  display: 'flex', justifyContent: 'space-around'}}>
            <Box
                sx={{height: 156, alignItems: 'center', display: 'flex', alignText: 'center'}}>
                <Typography variant="h5" color="white" fontFamily="Sora">{t('company')}</Typography>
            </Box>
            <Box
                sx={{height: 156, alignItems: 'center', display: 'flex'}}>
                <LanguageIcon fontSize='large' sx={{color: "white"}}/>
                <Typography variant="h5" color="white" fontFamily="Sora">{t('language')}</Typography>
            </Box>
            <Box
                sx={{height: 156, alignItems: 'center', display: 'flex'}}>
                <FacebookIcon fontSize='large' sx={{color: "white"}}/>
                <InstagramIcon fontSize='large' sx={{color: "white"}}/>
                <TwitterIcon fontSize='large' sx={{color: "white"}}/>
            </Box>
            <Box
                sx={{height: 156, alignItems: 'center', display: 'flex'}}>
                <Typography variant="h5" color="white" fontFamily="Sora">{t('terms')}</Typography>
            </Box>
        </Toolbar>

</footer>
    );
};
export default Footer;