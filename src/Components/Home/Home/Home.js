import React from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import FeatureProduct from '../FeatureProduct/FeatureProduct';
import GetReview from '../GetReview/GetReview'
const Home = () => {
    return (
        <div>
            <Navigation />
            <Banner/>
            <FeatureProduct/>
            <GetReview/>
        </div>
    );
};

export default Home;