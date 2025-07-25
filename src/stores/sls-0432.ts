import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";

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

export const useSls0432Store = defineStore("sls-0432", () => {
  const reportHeader: Ref<string[]> = ref([]);
  const report: Ref<string[] | number[]> = ref([]);
  const currentSalesman: Ref<number | null> = ref(null);

  const colNames = [
    "Date",
    "Reference#",
    "Salesperson#",
    "Salesperson Name",
    "Stock#",
    "Description",
    "Sale Type",
    "COMMBL GROSS",
    "Units",
    "Commission Amount",
  ];
  const cols = computed(() => {
    const obj = {};
    colNames.forEach((col) => {
      obj[
        col
          .toLowerCase()
          .trim()
          .replace(/[' '#%]/g, "")
      ] = reportHeader.value.indexOf(col);
    });
    return obj;
  });

  const salesmen = computed(() => {
    const idCol = cols.value["salesperson"];
    const nameCol = cols.value["salespersonname"];
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
    const idCol = cols.value["salesperson"];
    const unitCol = cols.value["units"];
    const deals = report.value.filter(
      (row) => Number(row[idCol]) === currentSalesman.value && row[unitCol] > 0,
    );
    return deals.map((deal) => {
      const id = deal[cols.value["reference"]];
      const date = deal[cols.value["date"]];
      const vehicle = new Vehicle(
        deal[cols.value["stock"]],
        deal[cols.value["description"]],
        deal[cols.value["saletype"]],
      );
      const unitCount = deal[cols.value["units"]];
      const commission = {
        gross: deal[cols.value["commblgross"]],
        amount: deal[cols.value["commissionamount"]],
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
      const date = row[cols.value["date"]];
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

  return {
    reportHeader,
    report,
    cols,
    salesmen,
    currentSalesman,
    deals,
    allDeals,
  };
});
