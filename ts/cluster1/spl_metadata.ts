import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  PublicKey,
  publicKey,
} from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

import wallet from "../wallet.json";

const mint = publicKey("FaAXac4mStXvDNZ14eeJZbAptQBQYEHuZ5Wzc8Y8aQjb");

// Create a UMI connection
const umi = createUmi(
  "https://spring-wiser-isle.solana-devnet.quiknode.pro/79a6121b11b51c0bac5a7f561d44e2fc930fa7f0/",
);
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

let count = 1;

(async () => {
  try {
    // Start here
    const metadata = findMetadataPda(umi, { mint });
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      metadata,
      mintAuthority: signer,
      payer: signer,
    };

    let data: DataV2Args = {
      name: `TCM Token ${count}`,
      symbol: "TCM",
      uri: "",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    console.log({ tx });

    let result = await tx.sendAndConfirm(umi);
    console.log(bs58.encode(result.signature));
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
