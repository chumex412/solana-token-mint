# Solana Token Mint

The Solana Token Mint Task was built with Rust and TypeScript. Designed to provide a practical understanding of how to mint, send and trade SPL Tokens on devnet. Although, I utilized an endpoint from quicknode.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Guidelines to get started:

- After cloning the project, navigate to `ts folder` by running `cd ts`.
- Install the dependencies by running `yarn install` in the CLI.
- Generate a wallet by running `yarn run keygen`.
- Copy the content from the CLI, create a `wallet.json` file in the `ts folder` directory and paste the content into the file.
- Run the command `yarn run spl_transfer` to create a mint, create an associated token account, move the minted token to the account and transfer the minted token to a provided recipient account.
- Finally, copy the mint address and provide it as an argument on line 19 of the file `cluster/spl_metadata.ts`, then run `yarn run spl_metadata` to change the metadata of the minted token.

### Screenshot

![A list of transactions executed](https://res.cloudinary.com/da8vqkdmt/image/upload/v1769905063/Screen_Shot_2026-02-01_at_12.33.26_AM_ziusyk.png)
![A preview of a minted token and it's transaction history](https://res.cloudinary.com/da8vqkdmt/image/upload/v1769905176/Screen_Shot_2026-02-01_at_1.11.18_AM_qysmza.png)

### Built with

- [Rust](https://doc.rust-lang.org/book/) - A book to learn about Rust
- [TypeScript](https://www.typescriptlang.org/) - A TypeScript documentation

### What I learned

I gained an understanding of how solana accounts operate. I also learned how to mint, send and trade tokens.

### Continued development

I'm more fired than ever to learn so much about the Solana Ecosystem and where Rust fits into the equation.

## Author

- Twitter - [@kode_navigator](https://www.twitter.com/kode_navigator)
