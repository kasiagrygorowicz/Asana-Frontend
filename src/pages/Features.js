import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";

function Features(props) {

    return (
        <Container maxWidth='xl'>
            <Box xs={{width: 1476, height: 1476, border: '1px dashed grey'}}>
                <Typography variant="h1" fontFamily="Sora">{props.t('features')}</Typography>
             </Box>
        </Container>
    );
  }
  export default Features;