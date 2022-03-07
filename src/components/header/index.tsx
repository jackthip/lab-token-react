import { ethers } from "ethers";
import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IAccount, setAccount } from "redux/slices/account";
import { useAppDispatch } from "redux/store";
import { RootState } from "../../redux/reducers";


export const Header: React.FC = () => {

  
    const dispatch = useAppDispatch();
    const accountAddress = useSelector<RootState, IAccount>((state: RootState) => state.account);
  //const [account, setAccount] = useState({} as IAccount);
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('please install MetaMask');
      return;
    }

    try {
     await window.ethereum.request({ method: 'eth_requestAccounts' });

      //const provider =  new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      //const ens = await provider.lookupAddress(address);
      //const avatar = await provider.getAvatar(ens);

      dispatch(setAccount(address));
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <nav className="fixed z-10 flex content-center justify-between w-full px-4 py-6 lg:px-48 md:px-12 bg-secondary">
        <div className="flex items-center">
          <p>Logo</p>
        </div>
        <ul className="items-center hidden font-montserrat md:flex">
          <li className="mx-3 growing-underline">
            <a href ="/">Home</a>
          </li>
          <li className="mx-3 growing-underline">
            <a href="features">Features</a>
          </li>
          <li className="mx-3 growing-underline">
            <a href="pricing">Pricing</a>
          </li>
        </ul>
        <div className="hidden font-montserrat md:block">
          <button className="px-4 py-2 text-white bg-black rounded-3xl" onClick={ connectWallet }>
            Connect to wallet
          </button>
      <div>current account: {accountAddress.address}</div>
        </div>
        <div id="showMenu" className="md:hidden">
          <AiOutlineMenu />
        </div>
      </nav>
      <div
        id="mobileNav"
        className="fixed top-0 left-0 z-20 hidden w-full h-full px-4 py-6 bg-secondary animate-fade-in-down"
      >
        <div id="hideMenu" className="flex justify-end">
          <AiOutlineMenu />
        </div>
        <ul className="flex flex-col items-center mx-8 my-24 text-3xl font-montserrat">
          <li className="my-6">
            <a href="howitworks">How it works</a>
          </li>
          <li className="my-6">
            <a href="features">Features</a>
          </li>
          <li className="my-6">
            <a href="pricing">Pricing</a>
          </li>
        </ul>
      </div>
    </>
  );
};

