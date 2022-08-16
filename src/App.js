import logo from './logo.svg';
import Caver from 'caver-js'
import './App.css';

const COUNT_CONTRACT_ADDRESS = '0xF1e739BF8029396621FcEEED5fd662442cafd4fB';
const ACCESS_KEY_ID = 'KASKT5I74FJOYN4J6LBJQUAR';
const SECRET_ACCESS_KEY = 'MlmGP2l9XauOBCUNDP_BYax2sAN51bqSOs-bkHoX';
const CHAIN_ID = '1001'; // MAINNET 8217 TESTNET 1001
const COUNT_ABI = [ { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ];

const option = {
  headers: [
    {
      name: "Authorization",
      value:"Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name:"x-chain-id", value: CHAIN_ID}
  ]
}

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`Balance: ${balance}`)
    return balance;
  })
}
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContract = new caver.contract(COUNT_ABI, COUNT_CONTRACT_ADDRESS);
const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}
// 1 Smart contract 배포 주소 파악(가져오기)
// 2 caver.js 이용해서 스마트 컨트랙트 연동하기
// 3 가져온 스마트 컨트렉트 실행 결과(데이터) 웹에 표현하기

function App() {
  readCount();
  getBalance('0x5C22b984cB7D5bFbece85185ad02037f164C9c93');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
