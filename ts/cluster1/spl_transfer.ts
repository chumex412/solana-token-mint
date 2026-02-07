import {
  Commitment,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import wallet from "../wallet.json";
import {
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
  transfer,
} from "@solana/spl-token";

import { createAccountAndstoreMinitedToken } from "./spl_mint";

const token_decimals = 1_000_000;

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("EvxduWGbSiUVJV9mNCsWBQ1Emv3bdwugFky3UrzWN6GH");

// Recipient address
const to = new PublicKey("J44Ypy9d5WNEDWaH5DWi7zFF9C2cVUvw4mjgzdjzYSZ5");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it

    const senderAcct = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
      false,
      "confirmed",
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair, // payer
      mint,
      to, // token account owner
      false,
      "confirmed",
    );

    // Transfer the new token to the "toTokenAccount" we just created

    const transaction = await transfer(
      connection,
      keypair,
      senderAcct.address, // transfer from
      recipientTokenAccount.address, // transfer to
      keypair.publicKey, // source token account owner
      1,
    );

    console.log("Transfer txnid:", transaction);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
