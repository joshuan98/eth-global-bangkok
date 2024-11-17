// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

// [x] Have a way to link to the existing on-chain SP instance and schema
// [x] Ensure both parties (individual and hospital) confirm the attestation

contract HospitalAttestation is Ownable {
    ISP public spInstance;
    uint64 public schemaId;
    mapping(address patient => address hospital) public visitMapping;

    error ConfirmationAddressMismatch();

    event HospitalVisit(address patient, address hospital, uint64 attestationId);

    constructor() Ownable(_msgSender()) { }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function claimVisit(address hospital) external {
        visitMapping[_msgSender()] = hospital;
    }

    function confirmVisit(address patient, bytes memory data) external returns (uint64) {
        address hospital = _msgSender();
        if (visitMapping[patient] == hospital) {
            // Hospital confirms the patient's claim of having visited
            // Create an attestation of the hospital visit
            bytes;
            recipients[0] = abi.encode(patient);
            recipients[1] = abi.encode(hospital);
            Attestation memory a = Attestation({
                schemaId: schemaId,
                linkedAttestationId: 0,
                attestTimestamp: 0,
                revokeTimestamp: 0,
                attester: address(this),
                validUntil: 0,
                dataLocation: DataLocation.ONCHAIN,
                revoked: false,
                recipients: recipients,
                data: data // Assume data is provided via `abi.encode(...)`
             });
            uint64 attestationId = spInstance.attest(a, "", "", "");
            emit HospitalVisit(patient, hospital, attestationId);
            return attestationId;
        } else {
            revert ConfirmationAddressMismatch();
        }
    }
}
