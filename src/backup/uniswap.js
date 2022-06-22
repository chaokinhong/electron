//import { ChainId,Fetcher, ETHER, Route } from "@uniswap/sdk";

const {
  ChainId,
  Fetcher,
  ETHER,
  WETH,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  Percent,
} = require("@uniswap/sdk");

const ethers = require("ethers");

const chainId = ChainId.RINKEBY;
const usdtTokenAddress = "0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD"; // usdt rinkeby address

const init = async () => {
  const usdt = await Fetcher.fetchTokenData(chainId, usdtTokenAddress);
  const eth = WETH[chainId];
  const pair = await Fetcher.fetchPairData(usdt, eth);
  const route = new Route([pair], eth);
  const trade = new Trade(
    route,
    new TokenAmount(eth, "100000000000000000"),
    TradeType.EXACT_INPUT
  ); //100eth + 15 zero
  console.log(route.midPrice.toSignificant(6)); // 6 d.p get usdt price
  console.log(route.midPrice.invert().toSignificant(6)); // 6 d.p eth price
  console.log(trade.executionPrice.toSignificant(6));
  console.log(trade.nextMidPrice.toSignificant(6));

  const slippageTolerance = new Percent("50", "10000");
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
  const path = [eth.address, usdt.address];
  const to = "";
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const value = trade.inputAmount.raw;

  const provider = ethers.getDefaultProvider("mainnet", {
    infura: "https://mainnet.infura.io/v3/44096091314c4325854f2bfdbac703da",
  });

  const signer = ''
  const account = signer.connect(provider)
  const uniswap = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);'],account)
  const tx = await uniswap.swapExactETHForTokens(
    amountOutMin,
    path,
    to,
    deadline,
    {
        value,gasPrice: 20e9
    }
  )

  const receipt = await tx.wait();
  console.log(`Transaction was mined in block ${receipt.blockNumber}`)

};

init();
