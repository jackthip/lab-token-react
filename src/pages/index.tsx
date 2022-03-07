import { Header } from "components";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAccount } from "redux/slices/account";
import { IToken } from "redux/slices/token";
import { useAppDispatch } from "redux/store";
import Lab01TokenABI from "../abi/Lab01Token.json";
import { RootState } from "../redux/reducers";

const Home: React.FC = () => {

  const [tokenContract, setTokenContract] = useState({});
  const [nftName, setNFTName] = useState('');
  const [initAmount, setInitAmount] = useState(0);
  const dispatch = useAppDispatch();
  const accountAddress = useSelector<RootState, IAccount>((state: RootState) => state.account);
  const myTokens = useSelector<RootState, IToken[]>((state: RootState) => state.token);

  useEffect(() => {
    
    showTokens();
  },[accountAddress, myTokens])
  
  var [tokens, setTokens] = useState([]);
  var provider;
  var contract ;
  const address = "0xe0CFeb46D684c5c5e16763C4A2288Bb04dc30f34";
    
  async function connectToken(){
    provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
      const signer = provider.getSigner();
    contract = new ethers.Contract(address, Lab01TokenABI.abi, provider);
    console.log(signer, Lab01TokenABI.abi);
    setTokenContract(contract) ;
  }

  async function addToken(){
    provider = new ethers.providers.JsonRpcProvider('http://localhost:7545')
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(address, Lab01TokenABI.abi, signer)
    
    await marketContract.addNewToken(nftName, 1);
    //console.log('address'+accountAddress.address, 1, 'initAmount: '+initAmount, '0x00')
    await marketContract.mint(accountAddress.address, 1, initAmount, '0x00');
    showTokens();
  }

  async function showTokens(){
    provider = new ethers.providers.JsonRpcProvider('http://localhost:7545')
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(address, Lab01TokenABI.abi, signer);
    const totalToken = await marketContract.getTotalToken().then((val) => {
      return val.toString();
    });//
    //const total = parseInt(totalToken['_hex'], 16);
    const allTokens = await marketContract.getTokens().then((val) => {
      return val;
    });
    setTokens(allTokens);
    console.log('All tokens: ',totalToken, allTokens);
  }
  return (
    // <Container>
    //   <Header />
    //   <button classNameName="btn btn-primary">Button</button>
    //   <Main />
    //   <Cards />
    //   <Footer />
    // </Container>
    <>
      <Header />
      <section className="flex flex-col justify-center px-4 pt-24 text-center md:mt-0 md:h-screen md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 bg-secondary">
        <div className="md:flex-1 md:mr-10">
          <h1 className="text-5xl font-bold font-pt-serif mb-7">
            A headline for your
            <span className="bg-underline1 bg-left-bottom bg-no-repeat pb-2 bg-100%">
              cool website
            </span>
          </h1>
          <p className="font-normal font-pt-serif mb-7">
            The Thailand's basic token create.
          </p>
          <div className="font-montserrat">
            <button className="px-6 py-4 mb-2 mr-2 text-white bg-black border-2 border-black border-solid rounded-lg"
            onClick={connectToken}>
              Connect Lab01 Token
            </button>
            <br/><br/>
            <input onChange={event => setNFTName(event.target.value)} />{nftName} <br/><br/>
            <input onChange={event => setInitAmount(parseInt(event.target.value))} />{initAmount}<br/><br/>
            <button className="px-6 py-4 border-2 border-black border-solid rounded-lg" onClick={addToken}>
              Add New NFT
            </button><br/>
            <button className="hidden px-6 py-4 border-2 border-black border-solid rounded-lg" onClick={showTokens}>
              Show Tokens
            </button>
          </div>
          <div className="max-h-72 font-montserrat">
            <h3 className = "text-lg font-bold">Tokens:</h3>
            <ul>
                {
                  tokens.map(function(name, index){
                    return <li key={ index }>{ (index +1 ) }. {name.name}</li>;
                  })
                }
            </ul>
          </div>
            
        </div>
        <div className="flex justify-around mt-8 md:block md:mt-0 md:flex-1">
          <div className="relative">
            <img
              src="dist/assets/Highlight1.svg"
              alt=""
              className="absolute -top-16 -left-10"
            />
          </div>

          <div className="relative">
            <img
              src="dist/assets/Highlight2.svg"
              alt=""
              className="absolute -bottom-10 -right-6"
            />
          </div>
        </div>
      </section>

      <section className="bg-black sectionSize">
        <div className="text-sm text-white font-montserrat">FOOTER</div>
      </section>
    </>
  );
};

export default Home;
