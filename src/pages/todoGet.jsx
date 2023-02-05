import React from 'react'
import { Flex, List, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { useContractRead, useAccount } from 'wagmi';
import ContractABI from '../utils/abi.json'
import { toast } from 'react-toastify';

const contractAddress = "0xDf884d362E6EB5A6A26576AD5ad4677faC5A0364";

function todoGet() {

 const { data: getTodoData } = useContractRead({
  address: contractAddress,
  abi: ContractABI,
  functionName: 'getTodos',
  onError() {
     toast.error("Something went wrong")
  }
})

console.log(getTodosData);

    return (
       <Flex flexDir="column">
        { getTodoData? getTodoData.map((item, idx) =>
        <Flex flexDir="column" key={idx}>
          <Text>Title: {item[0]}</Text>
          <Text>Description: {item[1]}</Text>
          </Flex>
          ): "null"
        }
       </Flex>
     )
}

export default todoGet;