use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};

#[derive(Accounts)]
pub struct Pay<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,

    #[account(mut)]
    pub recipient: SystemAccount<'info>,

    #[account(mut)]
    pub treasury: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn pay_handler(ctx: Context<Pay>, amount: u64) -> Result<()> {
    let fee = amount / 10000;
    let recipient_amount = amount - fee;

    // Transfer to recipientents
    invoke(
        &system_instruction::transfer(
            ctx.accounts.sender.key,
            ctx.accounts.recipient.key,
            recipient_amount,
        ),
        &[
            ctx.accounts.sender.to_account_info(),
            ctx.accounts.recipient.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

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