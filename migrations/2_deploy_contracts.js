const TokenMold = artifacts.require('./TokenMold.sol');
const IconiqLabCompaniesPresale = artifacts.require(
    './IconiqLabCompaniesPresale.sol'
);
const StandardToken = artifacts.require('./StandardToken.sol');
const Whitelist = artifacts.require('./Whitelist.sol');
const ICNQStaking = artifacts.require('./ICNQStaking.sol');

const name = 'Example Token';
const symbol = 'ETK';
const decimals = 18;

const BigNumber = web3.BigNumber;
const dayInSecs = 86400;

const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 20; // twenty secs in the future
const firstPhaseEnds = startTime + dayInSecs * 20; // 20 days
const secondPhaseEnds = startTime + dayInSecs * 30; // 30 days
const thirdPhaseEnds = startTime + dayInSecs * 40; // 40 days
const endTime = startTime + dayInSecs * 60; // 60 days
const rate = new BigNumber(10);
const totalTokensForCrowdsale = new BigNumber(20000000); // 20M

module.exports = function(deployer, network, [_, wallet]) {
    return deployer
        .then(() => {
            return deployer.deploy(StandardToken);
        })
        .then(() => {
            return deployer.deploy(ICNQStaking, StandardToken.address);
        })
        .then(() => {
            return deployer.deploy(TokenMold, name, symbol, decimals);
        })
        .then(() => {
            return deployer.deploy(Whitelist);
        })
        .then(() => {
            return deployer.deploy(
                IconiqLabCompaniesPresale,
                startTime,
                firstPhaseEnds,
                secondPhaseEnds,
                thirdPhaseEnds,
                endTime,
                Whitelist.address,
                StandardToken.address,
                TokenMold.address,
                ICNQStaking.address,
                rate,
                wallet,
                totalTokensForCrowdsale
            );
        });
};
