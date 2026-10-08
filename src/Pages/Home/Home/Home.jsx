import React from 'react';
import HeroBanner from '../HeroBanner/HeroBanner';
import AvailableProducts from '../AvailableProducts/AvailableProducts';
import HowItWorks from '../HowItWorks/HowItWorks';
import CustomerFeedback from '../CustomerFeedback/CustomerFeedback';
import AboutAura from '../AboutAura/AboutAura';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <AvailableProducts></AvailableProducts>
            <HowItWorks></HowItWorks>
            <CustomerFeedback></CustomerFeedback>
            <AboutAura></AboutAura>
        </div>
    );
};

export default Home;