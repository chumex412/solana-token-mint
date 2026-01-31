import {
  Keypair,
  PublicKey,
  Connection,
  Commitment,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { publicKey } from "@metaplex-foundation/umi";

import wallet from "../wallet.json";
import { getMintAddress } from "./spl_init";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection(
  "https://spring-wiser-isle.solana-devnet.quiknode.pro/79a6121b11b51c0bac5a7f561d44e2fc930fa7f0/",
  commitment,
);

const token_decimals = 1_000_000;

// Mint address

export const createAccountAndstoreMinitedToken = async () => {
  try {
    const mintAddress = await getMintAddress();

    if (mintAddress === null) throw Error("No mint address was created");

    const mint = new PublicKey(mintAddress);

    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
      false,
      "confirmed",
    );
    console.log(`Your ata is: ${ata}`);
    const metaMint = publicKey(mint.toBase58());

    // Mint to ATA

    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      token_decimals,
      [],
      {
        commitment: "confirmed",
      },
    );

    console.log(`Your mint txid: ${mintTx}`);

    return { mint, sourceTokenAccount: ata.address };
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
    return null;
  }
};
