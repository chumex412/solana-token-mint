import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import wallet from "../wallet.json";
import { convertAndUploadImage } from "./nft_image";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz" }));
umi.use(signerIdentity(signer));

export async function generateMetadataUri() {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
    const image = await convertAndUploadImage();

    if (!image) throw Error("No image was found");

    const metadata = {
      name: "Bart",
      symbol: "Chill",
      description: "Bart Simpson",
      image,
      attributes: [{ trait_type: "rarity", value: "legendary" }],
      properties: {
        files: [
          {
            type: "image/jpg",
            uri: image,
          },
        ],
      },
      creators: [],
    };

    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);

    return myUri;
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
}
