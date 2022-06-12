const UsdtToken = artifacts.require('UsdtToken')
const OronneToken = artifacts.require('OronneToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
  let usdtToken, oronneToken, tokenFarm

  before(async () => {
    // Load Contracts
    usdtToken = await UsdtToken.new()
    oronneToken = await OronneToken.new()
    tokenFarm = await TokenFarm.new(oronneToken.address, usdtToken.address)

    // Transfer all OronneToken tokens to farm (1 million)
    await oronneToken.transfer(tokenFarm.address, tokens('1000000'))

    // Send tokens to investor
    await usdtToken.transfer(investor, tokens('100'), { from: owner })
  })

  describe('Mock USDT deployment', async () => {
    it('has a name', async () => {
      const name = await usdtToken.name()
      assert.equal(name, 'Mock USDT Token')
    })
  })

  describe('Oronne Token deployment', async () => {
    it('has a name', async () => {
      const name = await oronneToken.name()
      assert.equal(name, 'Oronne Token')
    })
  })

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'Token Farm')
    })

    it('contract has tokens', async () => {
      let balance = await oronneToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming tokens', async () => {

    it('rewards investor for staking mUsdt tokens', async () => {
      let result

      // Check investor balance before staking
      result = await usdtToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock USDT wallet balance correct before staking')

      // Stake Mock USDT Tokens
      await usdtToken.approve(tokenFarm.address, tokens('100'), { from: investor })
      await tokenFarm.stakeTokens(tokens('100'), { from: investor })

      // Check staking result
      result = await usdtToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor USDT  wallet balance correct after staking')

      result = await usdtToken.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('100'), 'Token Farm Mock USDT balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

      // Issue Tokens
      await tokenFarm.issueTokens({ from: owner })

      // Check balances after issuance
      result = await oronneToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct affter issuance')

      // Ensure that only onwer can issue tokens
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

      // Unstake tokens
      await tokenFarm.unstakeTokens({ from: investor })

      // Check results after unstaking
      result = await usdtToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after staking')

      result = await usdtToken.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
    })
  })

})
