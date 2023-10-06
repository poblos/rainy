import { NiceBannerWrapper } from "./NiceBannerWrapper";

export let NiceBanner = ({ nice }) => (
    <NiceBannerWrapper>
        <div>Weather will be {`${nice}`}</div>
    </NiceBannerWrapper>
)