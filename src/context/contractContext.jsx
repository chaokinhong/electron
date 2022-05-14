import React from "react";
import ElectronToken from "../abis/ElectronToken.json";
import ElectricGenerator from "../abis/ElectricGenerator.json";
import { ethers } from "ethers";
import { info } from "autoprefixer";

export const ContractContext = React.createContext();
const { ethereum } = window;

/*-----------Provider function--------------------------------------------------- */
export const ContractProvider = ({ children }) => {
  /* -------------------------properties---------------------------------------------------------- */
  const [currentAccounts, setCurrentAccount] = React.useState()
  const [generatorValidateInfo, setGeneratorValidateInfo] = React.useState([])







  /* -------------------------functions---------------------------------------------------------- */
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
    const contractJsonData = ElectricGenerator.networks[5777];
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractJsonData.address,
      ElectricGenerator.abi,
      signer
    );


    //const myAddress = await signer.getAddress()
    //const price = ethers.utils.parseUnits(money.toString(),'ether')
    // const transaction = await contract.donate(charities[0].id,{value:price})
    return contract;
  };

  const createTokenObject = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contractJsonData = ElectronToken.networks[5777];
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractJsonData.address,
      ElectronToken.abi,
      signer
    );
    return contract;
  };


  const generatorLoginValidateInfo = async () => {
    const contract = await createContractObject();
    const info = await contract.getLoginInfo()
    info.map((item) => {
      console.log(item)
      setGeneratorValidateInfo((prevState) => [...prevState, {
        id: item.GeneratorId.toNumber(),
        email: item.Email,
        password: item.Password,
      }])
    })
  }

  const generatorLoginValidate = (email, password) => {
    generatorValidateInfo.map((item) => {
      if (item.email == email && item.password == password) {
        window.sessionStorage.setItem('generatorId', item.id)
        alert('Login Successful')
        return
      } else {
        alert('Wrong Email or Password')
        return
      }

    })
  }

  /*-------------------------Test function------------------------------------------------------ */
  const test = async () => {
    const contract = await createTokenObject();
    const tx = await contract.totalSupply()
    console.log(tx.toNumber())
  }




  React.useEffect(() => {
    checkIfWalletIsConnected();
    generatorLoginValidateInfo();
    createContractObject();
    test();
  }, []);

  return (
    <ContractContext.Provider value={{ createContractObject, generatorLoginValidate, createTokenObject }}>
      {children}
    </ContractContext.Provider>
  );
};
