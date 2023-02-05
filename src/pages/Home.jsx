import { useState } from "react";
import { Flex, Text, Input, InputGroup, Spacer, Center } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import contractAbi from "../utils/abi.json";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const contractAddress = "0xDf884d362E6EB5A6A26576AD5ad4677faC5A0364";

function Home() {
  
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  
  const { write: addTodoWrite, data: addTodoData, isLoading: addTodoLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: contractAddress,
    abi: contractAbi,
    functionName: 'addTodo',
    args: [title, desc],
    onSuccess(data) {
      data.wait().then(() => {
        toast.success(`Transaction successfully!`);
      })
    },
    onError() {
      toast.error(`Something went wrong..`);
    }
  })

  const { isLoading: addTodoWaitLoading } = useWaitForTransaction({
    hash: addTodoData?.hash,
    onSuccess() {
      toast.success(`Todo is added successfully!`);
      setTitle("");
      setDesc("");
    },
    onError() {
      toast.error(`Transaction Failed! Try again...`);
    }

  })

const handleAddTodo = () => {
  addTodoWrite();
}
  
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
        onClick={handleAddTodo}
        color={"white"}
        h={"50px"}
        cursor={"pointer"}
        disabled={
          addTodoWaitLoading || addTodoLoading
        }
      >
     <Text>
       { addTodoWaitLoading || addTodoLoading ? "adding...." : "Add Todo" }
     </Text>
     </Center>

     <Flex mt='40px'>
     <Center 
      bg="black" 
      color="white" 
      cursor="pointer"  
      h={"50px"} p="4"
      // onClick={() => {
      //   token ? navigate("/dashboard") : navigate("/");
      // }}
      onClick={() => {
        navigate("/getTodos")
      }}
      >
      <Text>View list of Todo</Text> 
     </Center>
     </Flex>
     
</Flex>
  );
}

export default Home;