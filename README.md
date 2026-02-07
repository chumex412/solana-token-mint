# NFT Creation and Mint

A simple task to create and mint an NFT asset with Metaplex. It implements basic features where users can do the following:

- Upload an image file via `umi` to generate an image `uri`.

- Create the image metadata `uri`.

- Create and mint the NFT.

## Table of contents

- [Overview](#overview)
  - [Guideline](#guidelines)
  - [Prerequisite](#prerequisite)
  - [The challenge](#the-challenge)
  - [Solution](#solution)
  - [Screenshot](#screenshot)
  - [Micellaneous](#miscellanous)

## Overview

### Guidelines to get started

- After cloning the project, navigate to `ts folder` by running `cd ts`.
- Install the dependencies by running `yarn install` in the CLI.
- Generate a wallet by running `yarn run keygen`.
- Copy the content from the CLI, create a `wallet.json` file in the `ts folder` directory and paste the content into the file.
- Run the command `yarn run nft-mint` to generate image uri, generate metadata uri, create and mint an NFT.

### Prerequisite

- NodeJS/Yarn
- Solana CLI
- TypeScript

### Challenge

The approach used to trade the minted NFT presented a few challenges and limitations, primarily centered around trust and efficiency. Since the trade was conducted directly between two parties, there was no reliable mechanism to verify the authenticity or enforce the agreed terms of the exchange. Either party could choose not to honor the agreement, potentially resulting in losses for the other.

Additionally, this method does not scale efficiently. Coordinating trades with multiple parties or trading multiple assets becomes cumbersome, as there is no structured system in place to facilitate secure and seamless transactions.

### Solution

- A solution to the trade challenges would be to implement an Excrow program that handles the peer-to-peer transactions.

- As for the limitation, this can be potentially resolved by implementing a program that for a Marketplace model. This contract achieves the following:
  - Ensures sellers can list their minted assets.

  - Buyers can browse and purchase.

### Screenshot

![A screenshot of the smg-emoji Minted NFT](https://res.cloudinary.com/da8vqkdmt/image/upload/v1770498098/Screen_Shot_2026-02-07_at_9.57.54_PM_iuttpj.png)

### Miscellanous

- A hash of the minted NFT: EvxduWGbSiUVJV9mNCsWBQ1Emv3bdwugFky3UrzWN6GH
- A Hash of the transaction: 2TJFvi4aBwsoPTH9V939Xw129TAufRtCUHMnyFPw24cFsk7kX11wjBp3rKEyggBgkzJcgePN1d7S8bw6ehwoxTtX
