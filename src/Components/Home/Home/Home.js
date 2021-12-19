import React from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import FeatureProduct from '../FeatureProduct/FeatureProduct';

const Home = () => {
    return (
        <div>
            <Navigation />
            <Banner/>
            <FeatureProduct/>
        </div>
    );
};

export default Home;