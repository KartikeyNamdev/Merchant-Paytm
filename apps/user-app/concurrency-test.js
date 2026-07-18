/**
 * Concurrency & Lock Verification Test for P2P Transfers
 * 
 * This script simulates a high-concurrency race condition:
 * A user with a starting balance of 15 attempts to perform two concurrent transfers of 10 each
 * at the exact same time.
 * 
 * - Without locks (unsafe): Both reads happen concurrently, see 15, and approve BOTH transfers,
 *   causing a negative balance overdraft (-5).
 * - With locks (safe): The first transfer acquires a write-lock (FOR UPDATE), blocks the second
 *   read until it completes, and then the second transfer correctly rejects due to insufficient funds.
 */

// In-Memory Database representing Prisma State
const db = {
  balances: {
    1: { userId: 1, amount: 15 }, // Sender (starts with 15)
    2: { userId: 2, amount: 0  }  // Recipient
  },
  p2pTransfers: [],
  // Simulate active lock flag on row 1
  isLocked: false
};

// Simulated Delay helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock Transaction Context implementing row-level locking behavior
 */
class MockTxnContext {
  async queryRow(userId) {
    // Simulate Row Lock Acquisition (FOR UPDATE)
    if (db.isLocked) {
      console.log(`[Txn] Row ${userId} is currently locked. Waiting for lock release...`);
      while (db.isLocked) {
        await sleep(5); // Poll until lock is released
      }
      console.log(`[Txn] Lock released. Row ${userId} acquired by queued transaction.`);
    }
    
    db.isLocked = true; // Acquire lock
    console.log(`[Txn] SELECT FOR UPDATE: Locked Balance row for user ${userId}.`);
    return [{ ...db.balances[userId] }];
  }

  async updateBalance(userId, newAmount) {
    await sleep(20); // Simulate database I/O latency
    db.balances[userId].amount = newAmount;
    console.log(`[Txn] Updated Balance user ${userId} to ${newAmount}`);
  }

  async logTransfer(from, to, amount) {
    db.p2pTransfers.push({ from, to, amount, timestamp: new Date() });
  }

  commit() {
    db.isLocked = false; // Release lock on commit
    console.log(`[Txn] Transaction committed. Lock released.`);
  }

  rollback(error) {
    db.isLocked = false; // Release lock on rollback
    console.log(`[Txn] Transaction rolled back. Lock released. Reason: ${error.message}`);
  }
}

/**
 * P2P Transfer logic matching p2pTransfer.ts transaction implementation
 */
async function mockP2pTransfer(from, to, amount) {
  const transferAmount = Number(amount);
  const txn = new MockTxnContext();

  console.log(`[P2P] Starting transfer of ${transferAmount} from User ${from} to User ${to}...`);
  try {
    // 1. SELECT FOR UPDATE (Locks the row)
    const senderBalances = await txn.queryRow(from);
    const senderBalance = senderBalances[0];

    // Simulate some work/latency before processing
    await sleep(50);

    // 2. Verification check
    if (!senderBalance || senderBalance.amount < transferAmount) {
      throw new Error("Insufficient Balance !");
    }

    // 3. Perform balance updates
    await txn.updateBalance(to, db.balances[to].amount + transferAmount);
    await txn.updateBalance(from, senderBalance.amount - transferAmount);
    await txn.logTransfer(from, to, transferAmount);

    txn.commit();
    return { success: true, message: "Money Sent" };
  } catch (e) {
    txn.rollback(e);
    return { success: false, msg: e.message };
  }
}

async function runTest() {
  console.log("=== RUNNING P2P TRANSFER CONCURRENCY SIMULATION ===");
  console.log(`Initial States:`);
  console.log(`- User 1 Balance: ${db.balances[1].amount}`);
  console.log(`- User 2 Balance: ${db.balances[2].amount}\n`);

  console.log("Firing 2 concurrent transfers of 10 units simultaneously...");
  
  // Run both transfers concurrently
  const [res1, res2] = await Promise.all([
    mockP2pTransfer(1, 2, "10"),
    mockP2pTransfer(1, 2, "10")
  ]);

  console.log("\n=== CONCURRENCY TEST RESULTS ===");
  console.log(`Transfer 1 Outcome:`, res1);
  console.log(`Transfer 2 Outcome:`, res2);
  console.log(`Final Database State:`);
  console.log(`- User 1 Balance: ${db.balances[1].amount} (Expected: 5, NO OVERDRAFTS!)`);
  console.log(`- User 2 Balance: ${db.balances[2].amount} (Expected: 10)`);
  console.log(`- Logged Transfers:`, db.p2pTransfers.length);
}

runTest();
