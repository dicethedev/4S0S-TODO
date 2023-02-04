import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from "react";
import { Flex, Text, Input, InputGroup, Spacer, Center } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from 'ethers';
import { useContractWrite, useContractRead, useAccount, useWaitForTransaction } from 'wagmi';
// import contractABI from './utils/abi.json'

const contractAddress = "0xc1e32b5756d159c51F01b97B6f6E935888FeE5eA";

function App() {

 const { address, isConnected } = useAccount();
 const [todo, setTodo] = useState([]);
 const [title, setTitle] = useState('');
 const [desc, setDesc] = useState('');

//  const { data, isError, isLoading: isLoadingData } = useContractRead({
//   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
//   abi: wagmigotchiABI,
//   functionName: 'getHunger',
// })

 const { write: addTodoWrite, isLoading: addTodoLoading } = useContractWrite({
   mode: "recklesslyUnprepared",
   address: contractAddress,
   abi: "",
   functionName: "addTodo",
   args: [title, desc],
  onSuccess(data) {
    data.wait().then(() => {
     alert("Run Successful")
    })
  },
  onError() {
    //pass a react-toast here or javascript alert on the console.error
    console.error(alert("something went wrong"));
  }
 })

 const handleAddTodo = () => {
  if(!isConnected) {
    addTodoWrite()
    alert("Your wallet is not connected. 'Please connect wallet' ")
  } 
 }

 const { isLoading: waitForAddTodoLoading } = useWaitForTransaction({
   hash: addTodoWrite?.hash,
   onSuccess() {
    //use react-toast or use javascript input function like the alert
    alert("Todo Added Successful")
   },
   onError() {
     //use react-toast or use javascript input function like the alert
     console.error(alert("Something went wrong"))
   }
 })

  return (
    <Flex flexDir="column" justify="center" alignItems="center">
      <Text>Todo Dapp</Text>

      {/* Connect wallet button */}
      <ConnectButton />
      
      <Flex align={"center"} my={"3%"} px={"2%"}>
        <Text>Title</Text>
        <Spacer />
        <InputGroup
          _focus={{ boxShadow: "none" }}
          as="button"
          w={"70%"}
        >
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter title"
            borderRadius="0"
            borderWidth="0"
            _placeholder={{
              color: "#999999",
              justifySelf: "flex-end",
            }}
             />
           </InputGroup>
     </Flex>

     <Flex align={"center"} my={"3%"} px={"2%"}>
        <Text>Description</Text>
        <Spacer />
        <InputGroup
          _focus={{ boxShadow: "none" }}
          as="button"
          w={"70%"}
        >
          <Input
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="Enter Descritption"
            borderRadius="0"
            borderWidth="0"
            _placeholder={{
              color: "#999999",
              justifySelf: "flex-end",
            }}
             />
           </InputGroup>
         </Flex>


         <Center
          as={"button"}
          type="submit"
          bg={"black"}
          color={"white"}
          onClick={handleAddTodo}
          h={"50px"}
          disabled={
            waitForAddTodoLoading || addTodoLoading
          }
        >
       <Text>
         {waitForAddTodoLoading || addTodoLoading
           ? "adding..."
           : "Add Todo"}
       </Text>
       </Center>
</Flex>
  );
}

export default App;
