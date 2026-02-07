import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wallet.json";
import base58 from "bs58";
import { generateMetadataUri } from "./nft_metadata";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

export const mintNft = async () => {
  try {
    const metadataUri = await generateMetadataUri();

    if (!metadataUri)
      throw Error("Something went wrong while generating metadata uri");

    let tx = createNft(umi, {
      mint,
      name: "Smug-Emoji",
      symbol: "EMOJI",
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(5),
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    // console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);

    return mint.publicKey;
  } catch (error) {
    console.error(error);

    return null;
  }
};
