import { BigNumberish } from "starknet/utils/number";

export interface BlockState {
  timestamp: BigNumberish;
  blockHash: string;
  blockNumber: string;
  gasPrice: string;
}

export const BLOCK_STATE_INITIAL_STATE: BlockState = {
  timestamp: 0,
  blockHash: "",
  blockNumber: "",
  gasPrice: "",
};
