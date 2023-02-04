import React from 'react'
import { Flex, List, OrderedList, ListItem } from '@chakra-ui/react';
import { useContractRead } from 'wagmi';
import ContractABI from '../utils/abi.json'

const contractAddress = "0xc1e32b5756d159c51F01b97B6f6E935888FeE5eA";

const getTodo = () => {
     
 const { data: getTodosData, isError, isLoading: isLoadingData } = useContractRead({
  address: contractAddress,
  abi: ContractABI,
  functionName: 'getTodos',
})

// console.log(getTodosData);

    return (
       <Flex>
        { getTodosData? getTodosData.map((item, idx) =>
        <Flex flexDir="column" key={idx}>
          <Flex>Title: <Text>{item[0]}</Text></Flex>
          <Flex>Description: <Text>{item[2]}</Text></Flex>
          </Flex>
          ): "null"
        }
       </Flex>
     )
}

export default getTodo;