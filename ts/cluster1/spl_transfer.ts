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
} from "@solana/spl-token";

import { createAccountAndstoreMinitedToken } from "./spl_mint";

const token_decimals = 1_000_000;

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection(
  "https://spring-wiser-isle.solana-devnet.quiknode.pro/79a6121b11b51c0bac5a7f561d44e2fc930fa7f0/",
  commitment,
);

// Mint address
// const mint = new PublicKey("<mint address>");

// Recipient address
const to = new PublicKey("J44Ypy9d5WNEDWaH5DWi7zFF9C2cVUvw4mjgzdjzYSZ5");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const res = await createAccountAndstoreMinitedToken();

    if (res === null) throw Error("Failed to create a source token account");

    // Get the token account of the toWallet address, and if it does not exist, create it
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair, // payer
      res.mint,
      to, // token account owner
      false,
      "confirmed",
    );

    // Transfer the new token to the "toTokenAccount" we just created

    const instruction = createTransferInstruction(
      res.sourceTokenAccount, // transfer from
      recipientTokenAccount.address, // transfer to
      keypair.publicKey, // source token account owner
      token_decimals, // amount
      [],
    );

    // Create transaction
    const transaction = new Transaction().add(instruction);

    // Sign and send transaction
    const transactionSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [
        keypair, // payer, owner
      ],
    );

    console.log("Transfer txnid:", transactionSignature);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
