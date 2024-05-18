use anchor_lang::prelude::*;

declare_id!("5oVbMwkAJ8ffmkmwNhjckShxxPwDcRvdr2jWgrLZxK8F");

#[program]
pub mod gifsoldapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
