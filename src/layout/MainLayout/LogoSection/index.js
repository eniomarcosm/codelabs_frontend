/* eslint-disable react/function-component-definition */
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Box } from '@mui/material';
import Logotipo from 'assets/images/cornelder.jpg';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        {/* <Logo /> */}
        <Box
            component="img"
            sx={{
                height: 42,
                width: 120,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 }
            }}
            alt="Universidade Jean Piaget de Moçambique"
            src={Logotipo}
        />
    </ButtonBase>
);

export default LogoSection;
