use anchor_lang::prelude::*;

declare_id!("3asCFDw9WnibFZCi6W5J3hZpUQVADnKZsc2kh2EBwzvS");

pub mod instructions;
use instructions::*;

#[program]
pub mod swipe {
    use super::*;

    pub fn pay(ctx: Context<Pay>, amount: u64) -> Result<()> {
        pay_handler(ctx, amount)
    }

    pub fn split_pay(ctx: Context<SplitPay>, amounts: Vec<u64>) -> Result<()> {
        split_pay_handler(ctx, amounts)
    }
}