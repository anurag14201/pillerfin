import React from 'react';
import HeroBanner from '../HeroBanner/HeroBanner';
import AvailableLoans from '../AvailableLoans/AvailableLoans';
import HowItWorks from '../HowItWorks/HowItWorks';
import CustomerFeedback from '../CustomerFeedback/CustomerFeedback';
import AboutLoanLink from '../AboutLoanLink/AboutLoanLink';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <AvailableLoans></AvailableLoans>
            <HowItWorks></HowItWorks>
            <CustomerFeedback></CustomerFeedback>
            <AboutLoanLink></AboutLoanLink>
        </div>
    );
};

export default Home;