import styled from 'styled-components';
import { theme } from 'styled-tools';

export const ForecastItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    spacing: ${theme('dims.basicSpacing')};
    margin: ${theme('dims.basicMargin')};
    background: ${theme('colors.second_background')};

`;