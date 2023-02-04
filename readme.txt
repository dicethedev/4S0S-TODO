// const {
//   data: transferTokenData,
//   isLoading: transferTokenLoading,
//   write: transferToken,
// } = useContractWrite({
//   mode: "recklesslyUnprepared",
//   abi: contractAbi,
//   address: tokenAddress,
//   functionName: "transfer",
//   args: [toAddress, amount ? ethers.utils.parseEther(amount) : 0],
// });

// const { isLoading: transferTokenWaitLoading } = useWaitForTransaction({
//   hash: transferTokenData?.hash,
//   onSuccess() {
//     MeProtocolToast(toast, " Token sent successful!", 5000, "top-right");
//     setToAddress("");
//     setAmount("");
//   },
//   onError() {
//     MeProtocolToast(toast, "Failed!", 5000, "top-right");
//   },
// });

// const handleTransferToken = () => {
//   // console?.log({ toAddress, amount });
//   transferToken();
// };