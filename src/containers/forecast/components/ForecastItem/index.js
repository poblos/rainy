import { ForecastItemWrapper } from "./ForecastItemWrapper";

export let ForecastItem = ({ label, temperature, rain, icon }) => (
    <ForecastItemWrapper>
        <div style={{ marginLeft: '.5rem', display: 'flex', alignItems: 'center' }}>{`${label}`}</div>
        <img style={{ marginLeft: '.5rem', display: 'flex', alignItems: 'center'}} src={`${icon}` } alt=''></img>
        <div style={{ marginLeft: '.5rem', display: 'flex', alignItems: 'center' }}>{`${temperature}°C`}</div>
        <div style={{ marginLeft: '.5rem', display: 'flex', alignItems: 'center' }}>{`${rain}mm`}</div>
    </ForecastItemWrapper>
)