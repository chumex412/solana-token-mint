import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { transfer } from "@metaplex-foundation/mpl-core";
import { publicKey } from "@metaplex-foundation/umi";
import { mintNft } from "./nft_mint";

// Initialize UMI
const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

(async () => {
  const mintedNft = await mintNft();

  if (!mintedNft) return;

  // Transfer an existing NFT asset to a new owner
  const result = await transfer(umi, {
    asset: publicKey(mintedNft),
    newOwner: publicKey("RecipientAddressHere..."),
  }).sendAndConfirm(umi);

  console.log("Asset transferred:", result.signature);
})();
