import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Features() {
    return (
        <Container maxWidth='xl'>
            <Box xs={{width: 1476, height: 1476, border: '1px dashed grey'}}>
                <Typography variant="h1" fontFamily="Sora">FEATURES</Typography>
            </Box>
        </Container>
    );
  }
  export default Features;