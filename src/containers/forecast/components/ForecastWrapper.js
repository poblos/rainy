import styled from 'styled-components';
import { theme } from 'styled-tools';

export const ForecastWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: ${theme('dims.forecast.width')};
`;
