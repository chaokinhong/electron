import React from "react";
import ElectronToken from "../abis/ElectronToken.json";
import Generator from "../abis/Generator.json";
import { ethers } from "ethers";

export const ContractContext = React.createContext();
const { ethereum } = window;


/*-----------Provider function--------------------------------------------------- */
export const ContractProvider = ({ children }) => {
  /* -------------------------properties---------------------------------------------------------- */
  const [currentAccounts,setCurrentAccount] = React.useState()
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      throw new Error("No ethereum object found");
    }
  };

  const createContractObject = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contractJsonData = Generator.abi;
    console.log(contractJsonData);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractJsonData.address,
      Generator.abi,
      signer
    );
    //const myAddress = await signer.getAddress()
    //const price = ethers.utils.parseUnits(money.toString(),'ether')
    // const transaction = await contract.donate(charities[0].id,{value:price})
    return contract;
  };

  

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <ContractContext.Provider value={{ createContractObject }}>
      {children}
    </ContractContext.Provider>
  );
};
