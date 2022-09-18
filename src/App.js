import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/pages/home/home.js';
import Tokenomic from './components/pages/tokenomic/Tokenomic.js';
import Explore from './components/pages/explore/Explore.js';
import Product from './components/pages/product/Product.js';
import Farm from './components/pages/home2/Farm.js';
import Pools from './components/pages/home2/Pools.js';
import Choose from './components/pages/newhome/Choose.js';
import Stake from './components/pages/newhome/Stake.js';
import NFTBuy from './components/pages/newhome/NFTBuy.js';
import Multiple from './components/pages/multiple/multiple.js';
import Single from './components/pages/single/single.js';
import Create from './components/pages/create/create.js';
import Marketplace from './components/pages/marketplace/marketplace.js';
import Header from './components/pages/header';
import Footer from './components/pages/footer';
import Wizgame from './components/pages/wizgame/wizgame';
import WizardWar from './components/pages/wizgame/WizardWar';
import Faq from './components/pages/faq';
import Partners from './components/pages/partners';
import Games from './components/pages/games';
import ViewProfile from './components/pages/profile/viewProfile';
import Profile from './components/pages/profile/profile';
import Product2 from './components/pages/product/Product2';
import ExploreNew from './components/pages/explore/ExploreNew';
import Collection from './components/pages/explore/Collection';
import Stakew from './components/pages/ido/Stakew';
import Wizardinfo from './components/pages/ido/Wizardinfo';
import Tires from './components/pages/ido/Tires';
import Pools2 from './components/pages/ido/Pools2';
import MultiStake from './components/pages/newhome/MultiStake';
import Privateroute from './components/services/Privateroute.js';
import Loginroute from './components/services/Loginroute.js';

import Createpresale from './components/pages/createpresale/Createpresale';
import Padchain from './components/pages/padchain/Padchain';
import Paddetails from './components/pages/padchain/Paddetails';
import Oldpaddetails from './components/pages/padchain/Oldpaddetails';
import Login1 from './components/pages/gameDashboard/Login';
import Dashboard from './components/pages/gameDashboard/Dashboard';
import MultiSingleStake from './components/pages/newhome/MultiSingleStake';
import MultiSingleNFTStake from './components/pages/newhome/MultiSingleNFTStake'
import Fogot from './components/pages/gameDashboard/Fogot';
import NFTMarketplace from './components/pages/NFTMarketplace/NFTMarketplace';
import Buy from './components/pages/ino/Buy';
import NftCollection from './components/pages/explore/NftCollection';
import { Stonepaper1 } from "./components/pages/Stonepaper1/Stonepaper1";
import Event from './components/pages/event/Event';



const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		localStorage.getItem('ACCESS_ID') != null ? <Navigate to='/' /> : <Component {...props} />
	)} />
)
class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<Header />
				<Routes>

					<Route exact path="/" name="Home Page" element={<Home />} />
					<Route exact path="/tokenomic" name="Tokenomic Page" element={<Tokenomic />} />
					<Route exact path="/profile" name="Profile Page" element={<Profile />} />
					<Route exact path="/profile/view/:account" name="View Profile Page" element={<ViewProfile />} />
					<Route exact path="/product/:tradeid" name="Product Page" element={<Product />} />
					<Route exact path="/product2/:tradeid" name="Product2 Page" element={<Product2 />} />
					<Route exact path="/farm" name="Farm Page" element={<Farm />} />
					<Route exact path="/pools" name="Pools Page" element={<Pools />} />
					<Route exact path="/choose" name="Choose Page" element={<Choose />} />
					<Route exact path="/stake" name="Stake Page" element={<Stake />} />
					<Route exact path="/buy" name="Newpage2 Page" element={<NFTBuy />} />
					<Route exact path="/multiple" name="multiple Page" element={<Multiple />} />
					<Route exact path="/single" name="single Page" element={<Single />} />
					<Route exact path="/create" name="create Page" element={<Create />} />
					<Route exact path="/marketplace" name="marketplace Page" element={<Marketplace />} />
					<Route exact path="/collection" element={<Navigate to="/marketplace" />} />
					<Route exact path="/nft/collection" element={<Navigate to="/marketplace" />} />

					<Route exact path="/collection/:address" name="collection Page" element={<Collection />} />
					<Route exact path="/nft/collection/:address" name="collection Page" element={<NftCollection />} />

					<Route exact path="/wizgame" name="wizgame Page" element={<Wizgame />} />
					<Route exact path="/wizard-wars" name="wizardwar Page" element={<WizardWar />} />
					<Route exact path="/faq" name="faq Page" element={<Faq />} />
					<Route exact path="/partners" name="partners Page" element={<Partners />} />
					{/* <Route exact path="/games" name="games Page" element = {<Games/>} /> */}
					<Route exact path="/iwo/stake/:index" name="stake Page" element={<Stakew />} />
					<Route exact path="/iwo/participate/:index" name="participate Page" element={<Wizardinfo />} />
					<Route exact path="/tiers" name="tiers Page" element={<Tires />} />
					<Route exact path="/iwo/test" name="iwo Page" element={<Pools2 />} />
					<Route exact path="/games" name="games Page" element={<Wizgame />} />
					<Route exact path="/game/wizardwar" name="games Page" element={<WizardWar />} />
					<Route exact path="/multistake" name="games Page" element={<MultiStake />} />
					<Route exact path="/multistake/single" name="multi stake Page" element={<MultiSingleStake />} />
					<Route exact path="/nftpool" name="multi stake Page" element={<MultiSingleNFTStake />} />

					<Route exact path="/createpresale" name="Createpresale Page" element={<Createpresale />} />
					<Route exact path="/iwo/list" name="Padchain Page" element={<Padchain />} />
					<Route exact path="/iwo/details/:slug" element={<Paddetails />} />
					<Route exact path="/paddetails/:slug" element={<Oldpaddetails />} />
					<Route exact path="/choose/ino" element={<NFTMarketplace />} />

					<Route exact path="/ino/:address" name="ino Page" element = {<Buy />} />

					<Route path="/event/details/:index" element={<Stonepaper1 />} />
					<Route path="/events" element={<Event />} />



					<Route path="" element={<Privateroute />}>
						<Route exact path="/game/dashboard" element={<Dashboard />} />
					</Route>
					<Route exact path="/forgot/:token" element={<Fogot />} />

					<Route path="" element={<Loginroute />}>
						<Route exact path="/game/login" element={<Login1 />} />
					</Route>


				</Routes>
				<Footer />

			</BrowserRouter>
		);
	}
}

export default App;
