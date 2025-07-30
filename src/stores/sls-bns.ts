import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Salesman } from "@/utils";
import { COL0432, Deal } from "@/utils";

export const useSlsBnsStore = defineStore("sls-bns", () => {
  const report0432Header: Ref<string[]> = ref([]);
  const report0432: Ref<string[] | number[]> = ref([]);

  const salesmen = computed(() => {
    const idCol = Number(report0432Header.value.indexOf(COL0432.empID));
    const nameCol = Number(report0432Header.value.indexOf(COL0432.emp));
    const arr: Salesman[] = [];
    report0432.value.forEach((row) => {
      const id = Number(row[idCol]);
      const name = row[nameCol];
      const empExists = arr.some((emp) => {
        return emp.id === id;
      });
      if (!empExists) {
        arr.push({ id, name });
      }
    });
    return arr;
  });

  const deals = computed(() => {
    const empIdCol = Number(report0432Header.value.indexOf(COL0432.empID));
    const dealIdCol = Number(report0432Header.value.indexOf(COL0432.dealID));
    const dateCol = Number(report0432Header.value.indexOf(COL0432.date));
    const vehIdCol = Number(report0432Header.value.indexOf(COL0432.vehID));
    const vehDescCol = Number(report0432Header.value.indexOf(COL0432.vehDesc));
    const vehTypeCol = Number(report0432Header.value.indexOf(COL0432.vehType));
    const unitCol = Number(report0432Header.value.indexOf(COL0432.units));
    const commGrossCol = Number(
      report0432Header.value.indexOf(COL0432.commGross),
    );
    const commAmountCol = Number(
      report0432Header.value.indexOf(COL0432.commAmount),
    );
    const obj = {};
    report0432.value.forEach((row) => {
      const empID = row[empIdCol];
      if (row[unitCol] > 0) {
        const deal = new Deal({
          dealID: row[dealIdCol],
          excelDate: Number(row[dateCol]),
          vehID: row[vehIdCol],
          vehDesc: row[vehDescCol],
          vehType: row[vehTypeCol],
          unitCount: Number(row[unitCol]),
          commGross: Number(row[commGrossCol]),
          commAmount: Number(row[commAmountCol]),
        });
        if (obj[empID]) {
          obj[empID].push(deal);
        } else {
          obj[empID] = [deal];
        }
      }
    });
    return obj;
  });

  const totalGross = computed(() => {
    let total = 0;
    salesmen.value.forEach((salesman) => {
      total += getGross(salesman.id);
    });
    return Number(total.toFixed(2));
  });

  const totalAmount = computed(() => {
    let total = 0;
    salesmen.value.forEach((salesman) => {
      total += getAmount(salesman.id);
    });
    return Number(total.toFixed(2));
  });

  const totalUnits = computed(() => {
    let total = 0;
    salesmen.value.forEach((salesman) => {
      total += getUnitCount(salesman.id);
    });
    return Number(total.toFixed(2));
  });

  const getDeals = (salesmanID: number) => {
    return deals.value[salesmanID];
  };

  const getUnitCount = (salesmanID: number) => {
    return Number(
      deals.value[salesmanID]
        .reduce((acc, curr) => {
          return acc + curr.unitCount;
        }, 0)
        .toFixed(2),
    );
  };

  const getGross = (salesmanID: number) => {
    return Number(
      deals.value[salesmanID]
        .reduce((acc, curr) => {
          return acc + curr.commission.gross;
        }, 0)
        .toFixed(2),
    );
  };

  const getAmount = (salesmanID: number) => {
    return Number(
      deals.value[salesmanID]
        .reduce((acc, curr) => {
          return acc + curr.commission.amount;
        }, 0)
        .toFixed(2),
    );
  };

  return {
    report0432Header,
    report0432,
    salesmen,
    getDeals,
    deals,
    getUnitCount,
    getGross,
    getAmount,
    totalGross,
    totalAmount,
    totalUnits,
  };
});
