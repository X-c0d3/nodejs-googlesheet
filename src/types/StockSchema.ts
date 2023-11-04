export type Miner = {
  accepted: number;
  algorithm: string;
  diff: number;
  hashrate: number;
  identifier: string;
  pool: string;
  rejected: number;
  sharetime: number;
  software: string;
  threadid: string;
  username: string;
  wd: any;
};

interface Duinocoin {
  result: {
    balance: {
      balance: number;
      created: string;
      username: string;
      verified: string;
    };
    miners: [Miner];
    transactions: any;
  };
  success: boolean;
}

export { Duinocoin };
