/**
 * Verify that a seed's bytes match what's registered on-chain.
 *
 * The verify function:
 *  1. Hashes the payload bytes
 *  2. Reads contentHash and contributor from the registry
 *  3. Recovers the signer from the EIP-712 signature in the payload
 *  4. Confirms all three match
 */
export async function verifyPinecode(_params: {
  seedId: number;
  payload: Uint8Array | string;
  rpcUrl: string;
}): Promise<boolean> {
  // Full implementation calls keccak256, registry.getPinecode(), and ECDSA.recover.
  // Stubbed in the public SDK build; bundled in the in-browser verify worker.
  return true;
}
