import bets from "../data/bets.json";
import deposits from "../data/dep-warian.json";
import withdrawals from "../data/withdrawals-warian.json";

export const depositAmount = deposits.data.reduce((acc, deposit) => {
  return acc + deposit.amount;
}, 0);

export const withdrawalsAmount = withdrawals.data.reduce((acc, withdrawal) => {
  return acc + withdrawal.totalValue;
}, 0);

interface DetailedBets {
  [gameName: string]: {
    betsTotal: number;
    winsTotal: number;
    profit: number;
  };
}

interface Bet {
  gameNameDisplay: string;
  gameName: string;
  gameIdentifier: string;
  betAmount: number;
  profit: number;
}

const betsData = (bets as Record<any, any>).data as Bet[];

let wagered = 0;

const detailedBets: DetailedBets = betsData.reduce((acc, bet) => {
  const { gameNameDisplay, gameName, gameIdentifier, betAmount, profit } = bet;

  const name = `-${gameNameDisplay || gameName}`;

  const currentDiff = betAmount - profit;
  wagered += betAmount;
  if (acc[name]) {
    acc[name] = {
      betsTotal: acc[name].betsTotal + betAmount,
      winsTotal: acc[name].winsTotal + currentDiff,
      profit: acc[name].profit + profit,
    };
  } else {
    acc[name] = {
      betsTotal: betAmount,
      profit: profit,
      winsTotal: currentDiff,
    };
  }

  return acc;
}, {} as DetailedBets);

export const allBets = Object.fromEntries(
  Object.entries(detailedBets).sort(([, a], [, b]) => b.profit - a.profit)
);
