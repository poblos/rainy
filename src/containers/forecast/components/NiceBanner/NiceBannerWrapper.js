import styled from 'styled-components';
import { theme } from 'styled-tools';

export const NiceBannerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background: ${theme('colors.first_background')};
    color: ${theme('colors.highlight2')};
`;