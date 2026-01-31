import {
  Keypair,
  Connection,
  Commitment,
  clusterApiUrl,
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

import wallet from "../wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";

const connection = new Connection(
  "https://spring-wiser-isle.solana-devnet.quiknode.pro/79a6121b11b51c0bac5a7f561d44e2fc930fa7f0/",
  "confirmed",
);

export const getMintAddress = async () => {
  console.log(keypair.publicKey);

  try {
    // Start here
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      null,
      6,
    );

    console.log("Successfully created a mint", mint);

    return mint;
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
    return null;
  }
};
