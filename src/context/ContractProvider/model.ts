import { Contract, json } from "starknet";

import accessControllerAbi from "contracts/abis/ERC20Mintable-openZeppelin-0_5_1_abi.json";
import ERC20Abi from "contracts/abis/ERC20Mintable-openZeppelin-0_5_1_abi.json";
import { addrETH } from "../../contracts/addresses";

const compiledERC20 = json.parse(JSON.stringify(ERC20Abi));
const compiledAccessController = json.parse(
    JSON.stringify(accessControllerAbi)
);

export interface ContractState {
    erc20Contract: Contract;
    accessControllerContract: Contract;
}

export const CONTRACT_INITIAL_STATE: ContractState = {
    erc20Contract: new Contract(compiledERC20, ""),
    accessControllerContract: new Contract(
        compiledAccessController,
        addrETH
    ),
};
