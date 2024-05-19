// Import statements
import assert from "assert";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
const { SystemProgram } = anchor.web3;
// const anchor = require("@coral-xyz/anchor");

describe("gifsoldapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.Gifsoldapp;
  let baseAccount;

  it("Starts stuff off, confirms and gets the transaction", async () => {
    baseAccount = anchor.web3.Keypair.generate();
    const startStuffOffTx = await program.methods.startStuffOff().accounts({
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([baseAccount]).rpc();

    await program.provider.connection.confirmTransaction(startStuffOffTx);
    console.log("Confirmed start_stuff_off transaction.");
    console.log('txSignature:', startStuffOffTx.signature);

    try {
      const signatureStatuses = await program.provider.connection.getSignatureStatuses([startStuffOffTx.signature]);
      console.log("Signature Statuses:", signatureStatuses);
    } catch (error) {
      console.error("Failed to get signature statuses:", error);
    }
  });

  it("Fetches the total GIF count", async () => {
    // const baseAccount = anchor.web3.Keypair.generate();
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('GIF Count', account.totalGifs.toString());
  });
});