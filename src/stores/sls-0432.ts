import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";

enum COL {
  date = "Date",
  dealID = "Reference#",
  empID = "Salesperson#",
  emp = "Salesperson Name",
  vehID = "Stock#",
  vehDesc = "Description",
  vehType = "Sale Type",
  commGross = "COMMBL GROSS",
  units = "Units",
  commAmount = "Commission Amount",
}

interface Salesman {
  id: number;
  name: string;
}

interface Deal {
  id: string;
  date: number;
  vehicle: Vehicle;
  unitCount: number;
  commission: Commission;
}

interface Commission {
  gross: number;
  amount: number;
}

class Vehicle {
  public year: string;
  public make: string;
  public model: string;
  public desc: string;
  constructor(
    public id: string,
    private description: string,
    public saleType: string,
  ) {
    [this.year, this.make, this.model, this.desc] = description.split(",");
  }
}

function convertDate(dateNumber: number) {
  const date = new Date((dateNumber - 25569) * 86400 * 1000).toDateString();
  const splitDate = date.split(" ");
  const combi = [splitDate[1], splitDate[2]];
  return combi.join(" ");
}

export const useSls0432Store = defineStore("sls-0432", () => {
  const reportHeader: Ref<string[]> = ref([]);
  const report: Ref<string[] | number[]> = ref([]);
  const currentSalesman: Ref<number | null> = ref(null);

  const cols = computed(() => {
    const colVals = Object.values(COL);
    const obj = {};
    colVals.forEach((val) => {
      obj[val] = reportHeader.value.indexOf(val);
    });
    return obj;
  });

  const salesmen = computed(() => {
    const idCol = cols.value[COL.empID];
    const nameCol = cols.value[COL.emp];
    const arr: Salesman[] = [];
    report.value.map((row) => {
      const id = row[idCol];
      const name = row[nameCol];
      if (arr.filter((salesman) => salesman.id === id).length === 0) {
        arr.push({ id, name });
      }
    });
    return arr;
  });

  const deals = computed(() => {
    const idCol = cols.value[COL.empID];
    const unitCol = cols.value[COL.units];
    const deals = report.value.filter(
      (row) => Number(row[idCol]) === currentSalesman.value && row[unitCol] > 0,
    );
    return deals.map((deal) => {
      const id = deal[cols.value[COL.dealID]];
      const date = deal[cols.value[COL.date]];
      const vehicle = new Vehicle(
        deal[cols.value[COL.vehID]],
        deal[cols.value[COL.vehDesc]],
        deal[cols.value[COL.vehType]],
      );
      const unitCount = deal[unitCol];
      const commission = {
        gross: deal[cols.value[COL.commGross]],
        amount: deal[cols.value[COL.commAmount]],
      };
      return { id, date, vehicle, unitCount, commission };
    });
  });

  const allDeals = computed(() => {
    const unitCol = cols.value["units"];
    const idCol = cols.value["salesperson"];
    const obj = {};
    report.value.forEach((row) => {
      const id = row[idCol];
      const dealId = row[cols.value["reference"]];
      const date = convertDate(row[cols.value["date"]]);
      const vehicle = new Vehicle(
        row[cols.value["stock"]],
        row[cols.value["description"]],
        row[cols.value["saletype"]],
      );
      const unitCount = row[cols.value["units"]];
      const commission = {
        gross: row[cols.value["commblgross"]],
        amount: row[cols.value["commissionamount"]],
      };
      if (row[unitCol] > 0) {
        if (obj[id]) {
          obj[id].push({ id: dealId, date, vehicle, unitCount, commission });
        } else {
          obj[id] = [{ id: dealId, date, vehicle, unitCount, commission }];
        }
      }
    });
    return obj;
  });

  const getUnitCount = computed(() => {
    const obj = {};
    const keys = Object.keys(allDeals.value);

    keys.forEach((key) => {
      obj[key] = allDeals.value[key].reduce((acc, curr) => {
        return acc + curr.unitCount;
      }, 0);
    });
    return obj;
  });

  return {
    reportHeader,
    report,
    cols,
    salesmen,
    currentSalesman,
    deals,
    allDeals,
    getUnitCount,
  };
});
