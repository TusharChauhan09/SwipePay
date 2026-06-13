use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};

#[derive(Accounts)]
pub struct SplitPay<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,

    #[account(mut)]
    pub treasury: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn split_pay_handler(ctx: Context<SplitPay>, amounts: Vec<u64>) -> Result<()> {
    let total: u64 = amounts.iter().sum();
    let fee = total / 10000;

    // Transfer fee to treasury
    invoke(
        &system_instruction::transfer(
            ctx.accounts.sender.key,
            ctx.accounts.treasury.key,
            fee,
        ),
        &[
            ctx.accounts.sender.to_account_info(),
            ctx.accounts.treasury.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    Ok(())
}